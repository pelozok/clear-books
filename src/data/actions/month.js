// Edición del mes abierto: fijos, campos sueltos, extras y pago de reservas anuales.
import { getDoc } from "firebase/firestore";
import { annualRef } from "../db.js";
import { extraLedgerId, annualPayLedgerId } from "../pure/ids.js";
import { markFixedItem, upsertById } from "../pure/monthOps.js";
import { deriveMonth } from "../../lib/derive.js";
import { commit, newBatch, touched, assertOpen, monthDoc, setLedger, deleteLedger, todayISO } from "./_common.js";

// Relee el mes (la caché local incluye escrituras pendientes) para que dos acciones
// seguidas sobre el mismo mes no se pisen al reescribir fixedItems/extras.
async function fresh(hid, month) {
  const snap = await getDoc(monthDoc(hid, month)).catch(() => null);
  const cur = snap?.exists() ? { id: month.id, ...snap.data() } : month;
  assertOpen(cur);
  return deriveMonth(cur);
}

const STATUSES = ["pending", "paid", "skipped", "deferred"];
const EDITABLE = ["incomes", "exchangeRate", "savings", "splitRule", "annualReserve.quota"];

// Cambia el estado de un fijo. patch = { status, paidAmount?, paidAt? }.
export async function markFixed(hid, me, monthArg, itemId, patch) {
  const month = await fresh(hid, monthArg);
  if (!STATUSES.includes(patch?.status)) throw new Error(`Estado inválido: ${patch?.status}`);
  const fixedItems = markFixedItem(month.fixedItems || [], itemId, patch, month.id, todayISO());
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { fixedItems, ...touched() });
  await commit(batch);
}

// Edita un fijo del mes (monto, nombre, quincena…) o lo agrega si el id no existe.
export async function updateFixedItem(hid, me, monthArg, item) {
  const month = await fresh(hid, monthArg);
  const base = { templateId: null, fromMonth: null, currency: "CRC", half: 1, status: "pending", paidAt: null, paidAmount: null, deferredTo: null, isDebt: false };
  const exists = (month.fixedItems || []).some((x) => x.id === item.id);
  const fixedItems = upsertById(month.fixedItems || [], exists ? item : { ...base, ...item });
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { fixedItems, ...touched() });
  await commit(batch);
}

// Escribe el patch de monthTemplateSync (mes al día con perfil y plantilla).
export async function syncMonthTemplate(hid, me, month, patch) {
  assertOpen(month);
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { ...patch, ...touched() });
  await commit(batch);
}

// Campo puntual del mes por ruta: 'incomes.p1.salaryCRC', 'exchangeRate',
// 'savings.perPerson.p1.q1.planned', 'splitRule'.
export async function updateMonthField(hid, me, month, path, value) {
  assertOpen(month);
  if (!EDITABLE.some((p) => path === p || path.startsWith(`${p}.`))) throw new Error(`Campo no editable: ${path}`);
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { [path]: value, ...touched() });
  await commit(batch);
}

// Agrega (o reemplaza por id) un extra. Con source 'ahorro' crea el retiro enlazado
// desde extra.placeId. Devuelve el id del extra.
export async function addExtra(hid, me, monthArg, extra) {
  const month = await fresh(hid, monthArg);
  const id = extra.id || `x${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const lid = extraLedgerId(hid, month.id, id);
  const fromSavings = extra.source === "ahorro";
  const row = {
    type: "gasto", label: "", currency: "CRC", date: todayISO(), personId: null, inSplit: false,
    reserveId: null, source: "corriente", placeId: null,
    ...extra, id, amount: Number(extra.amount) || 0, ledgerId: fromSavings ? lid : null,
  };
  const batch = newBatch();
  if (fromSavings) {
    setLedger(batch, hid, lid, me, {
      date: row.date, monthKey: month.id, personId: row.personId, placeId: row.placeId, type: "retiro",
      amount: row.amount, currency: row.currency, label: row.label || "Extra del ahorro",
      kind: row.reserveId ? "reserve_pay" : "expense", reserveId: row.reserveId,
    });
  } else {
    deleteLedger(batch, hid, lid);
  }
  batch.update(monthDoc(hid, month), { extras: upsertById(month.extras || [], row), ...touched() });
  await commit(batch);
  return id;
}

export async function removeExtra(hid, me, monthArg, extraId) {
  const month = await fresh(hid, monthArg);
  const ex = (month.extras || []).find((x) => x.id === extraId);
  const batch = newBatch();
  if (ex?.ledgerId) deleteLedger(batch, hid, ex.ledgerId);
  batch.update(monthDoc(hid, month), { extras: (month.extras || []).filter((x) => x.id !== extraId), ...touched() });
  await commit(batch);
}

// Paga una reserva anual: extra 'gasto' con reserveId. fromSavings: el pago sale del
// ahorro (retiro etiquetado kind 'reserve_pay' que baja el apartado de esa reserva).
// data = { annualId, amount, currency?, date?, fromSavings?, placeId?, label? }.
export async function payAnnual(hid, me, monthArg, { annualId, amount, currency = "CRC", date = todayISO(), fromSavings = false, placeId = null, label }) {
  const month = await fresh(hid, monthArg);
  const snap = await getDoc(annualRef(hid, annualId)).catch(() => null);
  const name = label || (snap?.exists() ? snap.data().name : "Reserva anual");
  const id = `annual-${annualId}`;
  const lid = annualPayLedgerId(hid, month.id, annualId);
  const batch = newBatch();
  const row = {
    id, type: "gasto", label: name, amount: Number(amount) || 0, currency, date, personId: null, inSplit: false,
    reserveId: annualId, source: fromSavings ? "ahorro" : "corriente", placeId, ledgerId: fromSavings ? lid : null,
  };
  if (fromSavings) {
    setLedger(batch, hid, lid, me, {
      date, monthKey: month.id, placeId, type: "retiro", amount: row.amount, currency,
      label: `Pago ${name}`, kind: "reserve_pay", reserveId: annualId,
    });
  } else {
    deleteLedger(batch, hid, lid);
  }
  batch.update(monthDoc(hid, month), { extras: upsertById(month.extras || [], row), ...touched() });
  batch.update(annualRef(hid, annualId), { lastPaidYear: Number(month.id.slice(0, 4)), ...touched() });
  await commit(batch);
  return id;
}
