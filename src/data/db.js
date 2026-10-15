import { doc, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

// Única definición de rutas. Todo vive bajo users/{hid}/ donde `hid` es el uid
// del hogar (el dueño; la pareja entra con partnerOf). Ver docs/SPEC.md §1.

const usersCol = "users";

export const profileRef = (hid) => doc(db, usersCol, hid, "config", "profile");

export const placesCol = (hid) => collection(db, usersCol, hid, "savingsPlaces");
export const placeRef = (hid, id) => doc(db, usersCol, hid, "savingsPlaces", id);

export const recurringCol = (hid) => collection(db, usersCol, hid, "recurring");
export const recurringRef = (hid, id) => doc(db, usersCol, hid, "recurring", id);

export const annualCol = (hid) => collection(db, usersCol, hid, "annual");
export const annualRef = (hid, id) => doc(db, usersCol, hid, "annual", id);

export const monthsCol = (hid) => collection(db, usersCol, hid, "months");
export const monthRef = (hid, key) => doc(db, usersCol, hid, "months", key);

export const ledgerCol = (hid) => collection(db, usersCol, hid, "savingsLedger");
export const ledgerRef = (hid, id) => doc(db, usersCol, hid, "savingsLedger", id);

export const entriesCol = (hid) => collection(db, usersCol, hid, "entries");
export const entryRef = (hid, id) => doc(db, usersCol, hid, "entries", id);

// Queries. Solo filtros de un campo (sin orderBy combinado) para no necesitar
// índices compuestos; el orden se resuelve en el cliente.
export const entriesByMonth = (hid, monthKey) =>
  query(entriesCol(hid), where("monthKey", "==", monthKey));

export const ledgerByMonth = (hid, monthKey) =>
  query(ledgerCol(hid), where("monthKey", "==", monthKey));

export const ledgerOrdered = (hid) => query(ledgerCol(hid), orderBy("date", "desc"));

// Id nuevo generado por el SDK (funciona offline).
export const newId = (col) => doc(col).id;

export { db };
