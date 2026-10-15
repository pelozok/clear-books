// Perfil del hogar: onboarding (createProfile) y edición (saveProfile).
import { setDoc } from "firebase/firestore";
import { profileRef, placeRef, recurringRef, annualRef, placesCol, recurringCol, annualCol, newId } from "../db.js";
import { ensureMonth } from "../ensureMonth.js";
import { commit, newBatch, created, touched, todayISO, monthOf, assertOpen, monthDoc } from "./_common.js";
import { profileToMonthPatch } from "../pure/monthOps.js";

// Onboarding. data = { profile, recurring: [], annual: [], places: [], today? }.
// Crea todo en un batch y materializa el mes actual (parcial si no arranca el día 1).
// Devuelve el hid (= uid del dueño).
export async function createProfile(hid, me, { profile, recurring = [], annual = [], places = [], today = todayISO() }) {
  const batch = newBatch();
  const prof = {
    schemaVersion: 3,
    mode: "solo",
    frequency: "mensual",
    people: [],
    partnerEmail: null,
    partnerOf: null,
    splitRule: "igual_sobrante",
    categories: [],
    exchangeRateDefault: 455,
    ...profile,
    onboardingComplete: true,
    startedAt: profile?.startedAt || today,
    lastOpenedBy: {},
    ...created(me),
    ...touched(),
  };
  batch.set(profileRef(hid), prof);

  const withIds = (list, col, ref, extra) =>
    list.map((item, i) => {
      const id = item.id || newId(col(hid));
      const doc = { order: i, active: true, ...extra(item), ...item, ...created(me) };
      delete doc.id;
      batch.set(ref(hid, id), doc);
      return { ...doc, id };
    });
  const rec = withIds(recurring, recurringCol, recurringRef, () => ({ half: 1, isDebt: false, cuotasRestantes: null, currency: "CRC" }));
  const ann = withIds(annual, annualCol, annualRef, () => ({ currency: "CRC", lastPaidYear: null, firstYear: null }));
  withIds(places, placesCol, placeRef, () => ({ currency: "CRC", kind: "cuenta", openingAmount: 0, openingAsOf: today }));
  await commit(batch);

  const startedAt = prof.startedAt;
  await ensureMonth(hid, monthOf(startedAt), {
    today, profile: prof, recurring: rec, annual: ann, ledger: [],
    partial: startedAt.slice(8, 10) !== "01", startedAt,
  });
  return hid;
}

// Cambios del perfil (merge). Solo afectan meses nuevos; el abierto se ajusta con
// updateMonthField / applyToCurrentMonth.
export const saveProfile = (hid, me, patch) =>
  setDoc(profileRef(hid), { ...patch, ...touched() }, { merge: true });

// Aplica ingreso y ahorro del perfil al mes abierto.
export async function applyProfileToMonth(hid, me, month, people, frequency) {
  assertOpen(month);
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { ...profileToMonthPatch(month, people, frequency), ...touched() });
  await commit(batch);
}
