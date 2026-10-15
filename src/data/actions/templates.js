// CRUD de plantilla de fijos (recurring), reservas anuales (annual) y lugares de ahorro.
// Borrar = active:false (el libro y los meses guardan referencias a estos ids).
import { setDoc, updateDoc } from "firebase/firestore";
import { recurringCol, recurringRef, annualCol, annualRef, placesCol, placeRef, newId } from "../db.js";
import { applyTemplateToFixed } from "../pure/monthOps.js";
import { commit, newBatch, created, touched, assertOpen, monthDoc, todayISO } from "./_common.js";

const add = async (col, ref, hid, me, defaults, item) => {
  const id = newId(col(hid));
  const { id: _ignored, ...rest } = item || {};
  await setDoc(ref(hid, id), { active: true, ...defaults, ...rest, ...created(me) });
  return id;
};
const update = (ref, hid, id, patch) => {
  const { id: _ignored, ...rest } = patch || {};
  return updateDoc(ref(hid, id), { ...rest, ...touched() });
};

// Plantilla de fijos.
export const addRecurring = (hid, me, item) =>
  add(recurringCol, recurringRef, hid, me, { currency: "CRC", half: 1, isDebt: false, cuotasRestantes: null, order: 0 }, item);
export const updateRecurring = (hid, me, id, patch) => update(recurringRef, hid, id, patch);
export const removeRecurring = (hid, me, id) => update(recurringRef, hid, id, { active: false });

// Lleva un cambio de la plantilla al mes abierto (item = recurring con id; active:false lo quita).
export async function applyToCurrentMonth(hid, me, month, item) {
  assertOpen(month);
  const fixedItems = applyTemplateToFixed(month.fixedItems || [], item, month.id);
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { fixedItems, ...touched() });
  await commit(batch);
}

// Reservas anuales.
export const addAnnual = (hid, me, item) =>
  add(annualCol, annualRef, hid, me, { currency: "CRC", startsFrom: null, firstYear: null, lastPaidYear: null }, item);
export const updateAnnual = (hid, me, id, patch) => update(annualRef, hid, id, patch);
export const removeAnnual = (hid, me, id) => update(annualRef, hid, id, { active: false });

// Lugares de ahorro.
export const addPlace = (hid, me, item) =>
  add(placesCol, placeRef, hid, me, { currency: "CRC", kind: "cuenta", openingAmount: 0, openingAsOf: todayISO(), order: 0 }, item);
export const updatePlace = (hid, me, id, patch) => update(placeRef, hid, id, patch);
export const removePlace = (hid, me, id) => update(placeRef, hid, id, { active: false });
