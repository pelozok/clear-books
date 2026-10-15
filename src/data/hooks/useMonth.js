// Mes en vivo. Si no existe y está permitido (≤ mes actual + 1, ≥ arranque), lo materializa.
import { useEffect, useRef, useState } from "react";
import { getDoc, onSnapshot } from "firebase/firestore";
import { monthRef, profileRef } from "../db.js";
import { docData, isOffline } from "../snap.js";
import { ensureMonth } from "../ensureMonth.js";
import { materializeGate } from "../pure/monthOps.js";
import { todayISO, monthKey } from "../../lib/periods.js";
import { useLive } from "./useLive.js";

// Devuelve { data, loading, error, tooFar, beforeStart }. data = { id: key, ...mes } | null.
export function useMonth(hid, key) {
  const k = hid && key ? `${hid}/${key}` : null;
  const live = useLive(k, (ok, fail) =>
    onSnapshot(monthRef(hid, key), (s) => ok({ doc: docData(s), fromCache: s.metadata.fromCache }), fail));
  const tooFar = !!key && materializeGate(key, monthKey(todayISO())) === "tooFar";
  const [mat, setMat] = useState({ key: null, beforeStart: false, error: null });
  const tried = useRef(new Set());

  const missing = !!live.data && !live.data.doc;
  // Un "no existe" desde la caché puede ser falso: esperamos al servidor salvo offline.
  const canDecide = missing && (!live.data.fromCache || isOffline());

  useEffect(() => {
    if (!k || !canDecide || tooFar || tried.current.has(k)) return;
    tried.current.add(k);
    (async () => {
      const profile = docData(await getDoc(profileRef(hid)));
      if (materializeGate(key, monthKey(todayISO()), profile?.startedAt) === "beforeStart") {
        setMat({ key: k, beforeStart: true, error: null });
        return;
      }
      const r = await ensureMonth(hid, key, { profile: profile || undefined });
      setMat({ key: k, beforeStart: false, error: r === "noProfile" ? new Error("El hogar no tiene perfil") : null });
    })().catch((error) => {
      tried.current.delete(k);
      setMat({ key: k, beforeStart: false, error });
    });
  }, [k, canDecide, tooFar, hid, key]);

  if (tooFar) return { data: live.data?.doc ?? null, loading: false, error: live.error, tooFar: !live.data?.doc, beforeStart: false };
  const own = mat.key === k ? mat : { beforeStart: false, error: null };
  const waiting = missing && !own.beforeStart && !own.error;
  return {
    data: live.data?.doc ?? null,
    loading: live.loading || waiting,
    error: live.error || own.error,
    tooFar: false,
    beforeStart: missing && own.beforeStart,
  };
}
