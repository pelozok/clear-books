// Hooks de lectura en vivo: perfil, lugares, plantilla, anuales, libro, gastos, meses.
import { onSnapshot } from "firebase/firestore";
import {
  profileRef, placesCol, recurringCol, annualCol, ledgerCol, monthsCol, entriesByMonth,
} from "../db.js";
import { docData, colData } from "../snap.js";
import { useLive } from "./useLive.js";

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0) || String(a.name).localeCompare(String(b.name));
const byDateDesc = (a, b) => String(b.date).localeCompare(String(a.date));

const useCol = (key, ref, sort) =>
  useLive(key, (ok, fail) => onSnapshot(ref(), (s) => ok(sort ? colData(s).sort(sort) : colData(s)), fail));

// Perfil del hogar ({ id, ...profile } o null).
export const useProfile = (hid) =>
  useLive(hid ? `profile/${hid}` : null, (ok, fail) => onSnapshot(profileRef(hid), (s) => ok(docData(s)), fail));

// Lugares de ahorro (incluye inactivos; filtrar por `active` en la UI), por order.
export const useSavingsPlaces = (hid) => useCol(hid && `places/${hid}`, () => placesCol(hid), byOrder);

// Plantilla de fijos, por order.
export const useRecurring = (hid) => useCol(hid && `recurring/${hid}`, () => recurringCol(hid), byOrder);

// Reservas anuales, por mes de pago.
export const useAnnual = (hid) =>
  useCol(hid && `annual/${hid}`, () => annualCol(hid), (a, b) => (a.month ?? 0) - (b.month ?? 0));

// Todo el libro de ahorro, fecha desc (orden en cliente: sin índices).
export const useLedger = (hid) => useCol(hid && `ledger/${hid}`, () => ledgerCol(hid), byDateDesc);

// Gastos variables de un mes, fecha desc.
export const useEntries = (hid, monthKey) =>
  useCol(hid && monthKey && `entries/${hid}/${monthKey}`, () => entriesByMonth(hid, monthKey), byDateDesc);

// Todos los meses (para historial), clave desc. Cada item: { id: 'YYYY-MM', ...doc }.
export const useMonthsIndex = (hid) =>
  useCol(hid && `months/${hid}`, () => monthsCol(hid), (a, b) => b.id.localeCompare(a.id));
