// Ahorro: aportes planeados por quincena, reserva anual del mes, retiros y aportes extra.
import { ledgerCol, newId } from "../db.js";
import { savingsLedgerId, reserveLedgerId } from "../pure/ids.js";
import { commit, newBatch, touched, assertOpen, monthDoc, setLedger, deleteLedger, todayISO } from "./_common.js";

const slotPath = (personId, half) => `savings.perPerson.${personId}.q${half === 2 ? 2 : 1}`;

// Confirma lo apartado por una persona en una quincena (mensual: half 1). Idempotente:
// el id del libro es determinista. amount 0 = "esta vez no", sin movimiento.
export async function confirmSavings(hid, me, month, { personId, half = 1, amount, placeId, date = todayISO(), note = null, currency = "CRC", label }) {
  assertOpen(month);
  const id = savingsLedgerId(hid, month.id, personId, half);
  const amt = Number(amount) || 0;
  const batch = newBatch();
  if (amt > 0) {
    setLedger(batch, hid, id, me, {
      date, monthKey: month.id, half, personId, placeId: placeId ?? null, type: "aporte",
      amount: amt, currency, label: label || (half === 2 ? "Ahorro 2da quincena" : "Ahorro 1ra quincena"), kind: "planned",
    });
  } else {
    deleteLedger(batch, hid, id);
  }
  const p = slotPath(personId, half);
  batch.update(monthDoc(hid, month), {
    [`${p}.actual`]: amt, [`${p}.at`]: date, [`${p}.note`]: note, [`${p}.ledgerId`]: amt > 0 ? id : null, ...touched(),
  });
  await commit(batch);
  return amt > 0 ? id : null;
}

// Deshace la confirmación: vuelve a "pendiente" y borra el aporte.
export async function clearSavings(hid, me, month, { personId, half = 1 }) {
  assertOpen(month);
  const batch = newBatch();
  deleteLedger(batch, hid, savingsLedgerId(hid, month.id, personId, half));
  const p = slotPath(personId, half);
  batch.update(monthDoc(hid, month), {
    [`${p}.actual`]: null, [`${p}.at`]: null, [`${p}.note`]: null, [`${p}.ledgerId`]: null, ...touched(),
  });
  await commit(batch);
}

// Aparta la cuota de la reserva anual del mes (un aporte por reserva, ids deterministas).
export async function confirmReserve(hid, me, month, { placeId, date = todayISO() }) {
  assertOpen(month);
  const batch = newBatch();
  const ids = [];
  for (const b of month.annualReserve?.breakdown || []) {
    const id = reserveLedgerId(hid, month.id, b.annualId);
    if (!(Number(b.quota) > 0)) { deleteLedger(batch, hid, id); continue; }
    ids.push(setLedger(batch, hid, id, me, {
      date, monthKey: month.id, placeId, type: "aporte", amount: b.quota, currency: "CRC",
      label: `Reserva ${b.name}`, kind: "reserve", reserveId: b.annualId,
    }));
  }
  batch.update(monthDoc(hid, month), {
    "annualReserve.done": true, "annualReserve.ledgerId": ids[0] || null, "annualReserve.ledgerIds": ids, ...touched(),
  });
  await commit(batch);
  return ids;
}

export async function clearReserve(hid, me, month) {
  assertOpen(month);
  const batch = newBatch();
  for (const b of month.annualReserve?.breakdown || []) deleteLedger(batch, hid, reserveLedgerId(hid, month.id, b.annualId));
  batch.update(monthDoc(hid, month), {
    "annualReserve.done": false, "annualReserve.ledgerId": null, "annualReserve.ledgerIds": [], ...touched(),
  });
  await commit(batch);
}

const freeMove = async (hid, me, type, defaults, data) => {
  const id = data.id || newId(ledgerCol(hid));
  const batch = newBatch();
  const { id: _ignored, ...fields } = data;
  setLedger(batch, hid, id, me, { type, ...defaults, ...fields });
  await commit(batch);
  return id;
};

// Retiro suelto del ahorro. data = { placeId, amount, currency?, date?, label?, kind?, reserveId?, personId?, monthKey? }.
export const recordWithdrawal = (hid, me, data) =>
  freeMove(hid, me, "retiro", { kind: "expense", label: "Retiro" }, data);

// Aporte extra (aguinaldo apartado, sobrante, ajuste de saldo con kind 'opening_adjust').
export const recordExtraContribution = (hid, me, data) =>
  freeMove(hid, me, "aporte", { kind: "extra", label: "Aporte extra" }, data);

// Guarda el ahorro sincronizado con el perfil (ver autoSavingsSync).
export async function syncAutoSavings(hid, me, month, savings) {
  assertOpen(month);
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { savings, ...touched() });
  await commit(batch);
}
