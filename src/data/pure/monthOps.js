// Helpers puros de la capa de datos (sin Firebase): edición de arrays del mes,
// límites de materialización y serialización para respaldos.
import { shiftMonth } from "../../lib/periods.js";

// ¿Se puede materializar `key`? Nunca más allá del mes actual + 1, ni antes del arranque.
// Devuelve 'ok' | 'tooFar' | 'beforeStart'.
export const materializeGate = (key, currentKey, startedAt = null) => {
  if (key > shiftMonth(currentKey, 1)) return "tooFar";
  if (startedAt && key < String(startedAt).slice(0, 7)) return "beforeStart";
  return "ok";
};

// Aplica un cambio en la plantilla al mes abierto: actualiza el fijo pendiente que
// viene de esa plantilla, lo agrega si no está, o lo quita si se desactivó.
// Los fijos ya pagados/omitidos/diferidos no se tocan.
export const applyTemplateToFixed = (fixedItems = [], r, monthKey) => {
  const items = fixedItems.slice();
  const idx = items.findIndex((it) => it.templateId === r.id && !it.fromMonth);
  const inactive = r.active === false || (r.cuotasRestantes != null && r.cuotasRestantes <= 0);
  if (idx >= 0) {
    if (items[idx].status !== "pending") return items;
    if (inactive) return items.filter((_, i) => i !== idx);
    items[idx] = {
      ...items[idx],
      name: r.name,
      amount: Number(r.amount) || 0,
      currency: r.currency || "CRC",
      half: r.half ?? 1,
      isDebt: !!r.isDebt,
    };
    return items;
  }
  if (inactive) return items;
  items.push({
    id: `${r.id}_${monthKey}`, templateId: r.id, fromMonth: null, name: r.name,
    amount: Number(r.amount) || 0, currency: r.currency || "CRC", half: r.half ?? 1,
    status: "pending", paidAt: null, paidAmount: null, deferredTo: null, isDebt: !!r.isDebt,
  });
  return items;
};

// Cambia el estado de un fijo. paid: guarda paidAt/paidAmount (por defecto hoy y el monto);
// deferred: pasa al mes siguiente; pending/skipped: limpia el pago.
export const markFixedItem = (fixedItems = [], itemId, { status, paidAmount, paidAt } = {}, monthKey, today) =>
  fixedItems.map((it) => {
    if (it.id !== itemId) return it;
    if (status === "paid") {
      return { ...it, status, paidAt: paidAt || today, paidAmount: paidAmount ?? it.amount, deferredTo: null };
    }
    return {
      ...it, status, paidAt: null, paidAmount: null,
      deferredTo: status === "deferred" ? shiftMonth(monthKey, 1) : null,
    };
  });

// Reemplaza (o agrega) un elemento por id.
export const upsertById = (list = [], item) => {
  const idx = list.findIndex((x) => x.id === item.id);
  if (idx < 0) return [...list, item];
  const out = list.slice();
  out[idx] = { ...out[idx], ...item };
  return out;
};

// Convierte Timestamps de Firestore a ISO para JSON/Excel (recursivo).
export const toPlain = (v) => {
  if (v == null) return v;
  if (typeof v?.toDate === "function") return v.toDate().toISOString();
  if (Array.isArray(v)) return v.map(toPlain);
  if (typeof v === "object") {
    const out = {};
    for (const [k, x] of Object.entries(v)) out[k] = toPlain(x);
    return out;
  }
  return v;
};
