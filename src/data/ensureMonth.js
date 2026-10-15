// Materializa el doc de un mes si no existe (sin duplicar: runTransaction).
import { getDoc, getDocs, runTransaction, setDoc } from "firebase/firestore";
import { db, monthRef, profileRef, recurringCol, annualCol, ledgerCol } from "./db.js";
import { docData, colData, isOffline } from "./snap.js";
import { materializeMonth } from "../lib/materialize.js";
import { fetchExchangeRate, normalizeRate } from "../lib/exchange.js";
import { todayISO, shiftMonth } from "../lib/periods.js";

// TC del día; si falla, el default del perfil o DEFAULT_RATE.
export const resolveRate = async (today, profile) => {
  try {
    return await fetchExchangeRate(today);
  } catch {
    return { ...normalizeRate(profile?.exchangeRateDefault), date: today };
  }
};

// opts: { today, partial, startedAt, profile, recurring, annual, ledger } (los datos
// que no vengan se leen de Firestore). Devuelve 'exists' | 'created' | 'noProfile'.
export const ensureMonth = async (hid, key, opts = {}) => {
  const today = opts.today || todayISO();
  const ref = monthRef(hid, key);
  const profile = opts.profile ?? docData(await getDoc(profileRef(hid)));
  if (!profile) return "noProfile";

  const [rec, ann, led, prev] = await Promise.all([
    opts.recurring ?? getDocs(recurringCol(hid)).then(colData),
    opts.annual ?? getDocs(annualCol(hid)).then(colData),
    opts.ledger ?? getDocs(ledgerCol(hid)).then(colData),
    getDoc(monthRef(hid, shiftMonth(key, -1))).then(docData).catch(() => null),
  ]);
  const rate = await resolveRate(today, profile);
  const doc = materializeMonth({
    monthKey: key, profile, recurring: rec, annual: ann, ledger: led, rate, today,
    previousMonth: prev, partial: !!opts.partial, startedAt: opts.startedAt ?? null,
  });

  try {
    return await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (snap.exists()) return "exists";
      tx.set(ref, doc);
      return "created";
    });
  } catch (e) {
    // Las transacciones requieren red: sin conexión, escribimos sobre la caché.
    if (!isOffline()) throw e;
    const cached = await getDoc(ref).catch(() => null);
    if (cached?.exists()) return "exists";
    setDoc(ref, doc).catch((err) => console.error("Materialización offline falló", err));
    return "created";
  }
};
