// Resuelve el hogar del usuario: si su perfil tiene partnerOf, el hogar es ese uid;
// si no, el propio. Expone { hid, me, profile, loading, error }.
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig.js";
import { profileRef } from "./db.js";
import { docData } from "./snap.js";

const HouseholdCtx = createContext(null);
const openedThisSession = new Set(); // `${hid}|${email}` ya registrados

const EMPTY = { key: null, data: null, error: null };

// Suscripción a un perfil; `key` = uid cuyo perfil se lee (null = ninguno).
function useProfileDoc(uid) {
  const [state, setState] = useState(EMPTY);
  useEffect(() => {
    if (!uid) return undefined;
    return onSnapshot(
      profileRef(uid),
      (s) => setState({ key: uid, data: docData(s), error: null }),
      (error) => setState({ key: uid, data: null, error }),
    );
  }, [uid]);
  const mine = !!uid && state.key === uid;
  return { data: mine ? state.data : null, error: mine ? state.error : null, ready: !uid || mine };
}

export function HouseholdProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = resolviendo sesión
  const [authError, setAuthError] = useState(null);

  useEffect(
    () => onAuthStateChanged(auth, (u) => setUser(u || null), (e) => { setAuthError(e); setUser(null); }),
    [],
  );

  const own = useProfileDoc(user?.uid || null);
  const partnerOf = own.ready ? own.data?.partnerOf || null : null;
  const home = useProfileDoc(partnerOf);

  const hid = user && own.ready ? partnerOf || user.uid : null;
  const profile = partnerOf ? home.data : own.data;
  const loading = user === undefined || (!!user && (!own.ready || !home.ready));
  const error = authError || own.error || home.error || null;
  const email = user?.email || null;

  // lastOpenedBy[email] una vez por sesión, solo si el perfil ya existe.
  useEffect(() => {
    if (!hid || !email || !profile || loading) return;
    const k = `${hid}|${email}`;
    if (openedThisSession.has(k)) return;
    openedThisSession.add(k);
    setDoc(profileRef(hid), { lastOpenedBy: { [email]: serverTimestamp() } }, { merge: true })
      .catch((e) => console.warn("No se pudo registrar lastOpenedBy", e));
  }, [hid, email, profile, loading]);

  const value = useMemo(() => ({
    hid,
    me: user ? { uid: user.uid, email, displayName: user.displayName, photoURL: user.photoURL } : null,
    profile: profile || null,
    loading,
    error,
  }), [hid, user, email, profile, loading, error]);

  return <HouseholdCtx.Provider value={value}>{children}</HouseholdCtx.Provider>;
}

export function useHousehold() {
  const ctx = useContext(HouseholdCtx);
  if (!ctx) throw new Error("useHousehold debe usarse dentro de <HouseholdProvider>");
  return ctx;
}
