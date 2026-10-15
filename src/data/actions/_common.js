// Piezas comunes de las acciones: autor, timestamps, guardas y movimientos del libro.
import { serverTimestamp } from "firebase/firestore";
import { ledgerRef, monthRef } from "../db.js";
import { todayISO, monthKey as monthOf } from "../../lib/periods.js";

export { commit, newBatch } from "../snap.js";

// `me` puede ser el objeto de useHousehold().me o directamente el correo.
export const emailOf = (me) => (typeof me === "string" ? me : me?.email) || null;
export const created = (me) => ({ createdBy: emailOf(me), createdAt: serverTimestamp() });
export const touched = () => ({ updatedAt: serverTimestamp() });

// Las acciones de mes reciben el doc de useMonth (con `id` = 'YYYY-MM').
export const assertOpen = (month) => {
  if (!month?.id) throw new Error("Falta el mes (doc de useMonth con id)");
  if (month.status === "closed") throw new Error("El mes está cerrado; la corrección va en el mes actual");
};

export const monthDoc = (hid, month) => monthRef(hid, month.id);

// Escribe un movimiento del libro con id dado (determinista = idempotente).
export const setLedger = (batch, hid, id, me, fields) => {
  const date = fields.date || todayISO();
  batch.set(ledgerRef(hid, id), {
    date,
    monthKey: fields.monthKey || monthOf(date),
    half: null, personId: null, placeId: null, currency: "CRC", label: "",
    reserveId: null, expenseId: null,
    ...fields,
    amount: Number(fields.amount) || 0,
    ...created(me),
  });
  return id;
};

export const deleteLedger = (batch, hid, id) => {
  if (id) batch.delete(ledgerRef(hid, id));
};

export { todayISO, monthOf };
