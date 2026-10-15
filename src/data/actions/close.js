// Cierre del mes: escribe el resultado de lib/close.js applyClose (mes + libro + arrastre).
import { getDoc } from "firebase/firestore";
import { monthRef } from "../db.js";
import { closeEntryDocId } from "../pure/ids.js";
import { shiftMonth } from "../../lib/periods.js";
import { commit, newBatch, touched, assertOpen, monthDoc, setLedger, emailOf } from "./_common.js";

// result = applyClose({ month, decisions, today, placeId, totals }). opts.placeId rellena
// movimientos sin lugar. Si el mes siguiente ya existe, le pasa el faltante (carryover.in);
// si no, lo toma materializeMonth desde closing.
export async function closeMonth(hid, me, month, result, { placeId = null } = {}) {
  assertOpen(month);
  const batch = newBatch();
  const ids = (result.ledgerEntries || []).map((entry, i) => {
    const id = closeEntryDocId(hid, month.id, entry, i);
    const { id: _local, ...fields } = entry;
    return setLedger(batch, hid, id, me, { ...fields, monthKey: month.id, placeId: fields.placeId ?? placeId });
  });

  const { id: _mid, ...closed } = result.month;
  const email = emailOf(me);
  const seenBy = Array.from(new Set([...(closed.closing?.seenBy || []), ...(email ? [email] : [])]));
  batch.set(monthDoc(hid, month), { ...closed, status: "closed", closing: { ...closed.closing, seenBy, ledgerIds: ids }, ...touched() });

  const nextKey = shiftMonth(month.id, 1);
  const next = await getDoc(monthRef(hid, nextKey)).catch(() => null);
  if (next?.exists() && next.data().status !== "closed") {
    batch.update(monthRef(hid, nextKey), { "carryover.in": Number(result.nextCarryIn) || 0, ...touched() });
  }
  await commit(batch);
  return ids;
}

// Marca que alguien vio el cierre (para el aviso a la pareja).
export async function markCloseSeen(hid, me, month) {
  const email = emailOf(me);
  if (!email || !month?.closing || (month.closing.seenBy || []).includes(email)) return;
  const batch = newBatch();
  batch.update(monthDoc(hid, month), { "closing.seenBy": [...(month.closing.seenBy || []), email] });
  await commit(batch);
}
