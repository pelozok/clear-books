// Gastos variables. source 'savings' = pagado del ahorro: crea/borra el retiro enlazado.
import { entriesCol, entryRef, newId } from "../db.js";
import { entryLedgerId } from "../pure/ids.js";
import { toCRC } from "../../lib/format.js";
import { commit, newBatch, created, touched, setLedger, deleteLedger, todayISO, monthOf } from "./_common.js";

const linkLedger = (batch, hid, me, id, e) => {
  const lid = entryLedgerId(hid, e.monthKey, id);
  if (e.source === "savings") {
    setLedger(batch, hid, lid, me, {
      date: e.date, monthKey: e.monthKey, placeId: e.placeId ?? null, type: "retiro", amount: e.amount,
      currency: e.currency, label: e.description || "Gasto del ahorro", kind: "expense", expenseId: id,
    });
    return lid;
  }
  deleteLedger(batch, hid, lid);
  return null;
};

// data = { date?, monthKey?, amount, currency?, categoryId?, description?, source?, placeId? };
// rate = TC del mes (número o { venta }). Devuelve el id.
export async function addEntry(hid, me, data, rate) {
  const id = newId(entriesCol(hid));
  const date = data.date || todayISO();
  const e = {
    monthKey: data.monthKey || monthOf(date), date, amount: Number(data.amount) || 0, currency: data.currency || "CRC",
    categoryId: data.categoryId || "otros", description: data.description || "", source: data.source || null,
    placeId: data.placeId ?? null,
  };
  e.amountCRC = toCRC(e.amount, e.currency, rate);
  const batch = newBatch();
  e.ledgerId = linkLedger(batch, hid, me, id, e);
  batch.set(entryRef(hid, id), { ...e, ...created(me) });
  await commit(batch);
  return id;
}

// entry = el doc actual (con id); patch = campos a cambiar.
export async function updateEntry(hid, me, entry, patch, rate) {
  const e = { ...entry, ...patch };
  if (patch.date && !patch.monthKey) e.monthKey = monthOf(patch.date);
  e.amount = Number(e.amount) || 0;
  e.amountCRC = toCRC(e.amount, e.currency, rate);
  const batch = newBatch();
  if (entry.ledgerId && entry.monthKey !== e.monthKey) deleteLedger(batch, hid, entry.ledgerId);
  e.ledgerId = linkLedger(batch, hid, me, entry.id, e);
  const { id: _id, createdAt: _c, createdBy: _b, ...rest } = e;
  batch.update(entryRef(hid, entry.id), { ...rest, ...touched() });
  await commit(batch);
}

export async function removeEntry(hid, me, entry) {
  const batch = newBatch();
  if (entry.ledgerId) deleteLedger(batch, hid, entry.ledgerId);
  batch.delete(entryRef(hid, entry.id));
  await commit(batch);
}
