// Helpers puros de la capa de datos (sin Firebase): edición de arrays del mes,
// límites de materialización y serialización para respaldos.
import { shiftMonth } from "../../lib/periods.js";
import { savingsPlanOf } from "../../lib/materialize.js";

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
      percent: Number(r.percent) > 0 ? Number(r.percent) : null,
    };
    return items;
  }
  if (inactive) return items;
  items.push({
    id: `${r.id}_${monthKey}`, templateId: r.id, fromMonth: null, name: r.name,
    amount: Number(r.amount) || 0, currency: r.currency || "CRC", half: r.half ?? 1,
    status: "pending", paidAt: null, paidAmount: null, deferredTo: null, isDebt: !!r.isDebt,
    percent: Number(r.percent) > 0 ? Number(r.percent) : null,
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

// Lleva ingreso, ahorro y frecuencia del perfil al mes abierto. El ahorro solo cambia
// en los slots sin confirmar (y no revive una 1ra quincena que quedó en 0 por arranque
// parcial). Pasar a mensual quita la 2da quincena si no tiene ahorro confirmado.
export const profileToMonthPatch = (month, people = [], frequency = null) => {
  const incomes = { ...(month?.incomes || {}) };
  const perPerson = {};
  for (const [pid, halves] of Object.entries(month?.savings?.perPerson || {})) {
    perPerson[pid] = {};
    for (const [hk, row] of Object.entries(halves || {})) perPerson[pid][hk] = { ...row };
  }
  const freq = frequency || month?.frequency || "mensual";
  for (const p of people) {
    incomes[p.id] = { salaryCRC: Number(p.incomeCRC) || 0, salaryUSD: Number(p.incomeUSD) || 0 };
    const slots = (perPerson[p.id] ||= {});
    const blank = { planned: 0, actual: null, at: null, note: null, ledgerId: null };
    if (!slots.q1) slots.q1 = { ...blank };
    if (freq === "quincenal" && !slots.q2) slots.q2 = { ...blank };
    if (freq !== "quincenal" && slots.q2 && slots.q2.actual == null) delete slots.q2;
    for (const [hk, row] of Object.entries(perPerson[p.id] || {})) {
      if (row.actual != null) continue;
      if (month?.partial && hk === "q1" && !row.planned && !row.plannedAmount) continue;
      Object.assign(row, savingsPlanOf(p));
    }
  }
  return { frequency: freq, incomes, savings: { ...(month?.savings || {}), perPerson } };
};

// Con ahorro automático el perfil manda: en el mes abierto, el ahorro sin confirmar de
// esas personas sigue al perfil (monto y moneda). Devuelve el nuevo `savings` o null si ya está.
export const autoSavingsSync = (month, profile) => {
  if (!month || month.status === "closed") return null;
  let changed = false;
  const perPerson = {};
  for (const [pid, halves] of Object.entries(month.savings?.perPerson || {})) {
    const person = (profile?.people || []).find((p) => p.id === pid);
    perPerson[pid] = {};
    for (const [hk, row] of Object.entries(halves || {})) {
      const want = person?.autoSavingsPlaceId && row?.actual == null ? savingsPlanOf(person) : null;
      const same = !want || (want.plannedCurrency === "USD"
        ? row.plannedCurrency === "USD" && Number(row.plannedAmount) === want.plannedAmount
        : row.plannedCurrency !== "USD" && Number(row.planned) === want.planned);
      if (!same) changed = true;
      perPerson[pid][hk] = same ? row : { ...row, ...want };
    }
  }
  return changed ? { ...month.savings, perPerson } : null;
};

// Pone el mes abierto (el actual o uno siguiente) al día con el perfil y la plantilla.
// Devuelve el patch o null si ya está:
//   - frecuencia distinta a la del perfil: se aplica la del perfil (mensual = sin quincenas)
//   - fijos activos de la plantilla que no están en el mes: entran pendientes
//   - una vez por mes: fijos que el arranque en 2da quincena dejó "omitidos" vuelven a pendiente
export const monthTemplateSync = (month, recurring, profile, currentKey) => {
  if (!month || month.status === "closed" || !recurring || month.id < currentKey) return null;
  const patch = {};
  const freq = profile?.frequency;
  if (freq && month.frequency !== freq) Object.assign(patch, profileToMonthPatch(month, profile.people || [], freq));
  let items = (month.fixedItems || []).slice();
  if (!month.fixedChecked) {
    items = items.map((it) => (it.status === "skipped" && it.templateId && !it.fromMonth ? { ...it, status: "pending" } : it));
    patch.fixedChecked = true;
  }
  for (const r of recurring) {
    if (r.active === false || items.some((it) => it.templateId === r.id && !it.fromMonth)) continue;
    items = applyTemplateToFixed(items, r, month.id);
  }
  if (JSON.stringify(items) !== JSON.stringify(month.fixedItems || [])) patch.fixedItems = items;
  return Object.keys(patch).length ? patch : null;
};
