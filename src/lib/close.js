// Cierre de mes: checklist, salidas al déficit y aplicación del cierre.
// Puro. Recibe los totales de plan.monthTotals como argumento (no importa plan.js).
import { monthSavingsSummary } from "./savings.js";

const num = (v) => Number(v) || 0;
const pad = (n) => String(n).padStart(2, "0");

const toCRC = (amount, currency, rate) =>
  currency === "USD" ? num(amount) * num(rate) : num(amount);

// Clave del mes: el doc no la trae, así que se acepta desde fuera o desde campos usuales.
const keyOf = (month, explicit) => explicit || month?.key || month?.monthKey || month?.id || null;

const shiftMonth = (mKey, delta) => {
  const [y, m] = mKey.split("-").map(Number);
  const total = y * 12 + (m - 1) + delta;
  return `${Math.floor(total / 12)}-${pad((total % 12) + 1)}`;
};

const lastDayISO = (mKey) => {
  const [y, m] = mKey.split("-").map(Number);
  return `${mKey}-${pad(new Date(y, m, 0).getDate())}`;
};

// Un total puede venir como número o como mapa por persona { p1: n }.
const sumTotal = (v) => {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "object") return Object.values(v).reduce((s, x) => s + sumTotal(x), 0);
  return num(v);
};

// Fijos que ya salieron o van a salir de la cuenta este mes (CRC).
// paid usa paidAmount si existe; pending cuenta su monto; skipped/deferred no.
const fixedCommittedCRC = (month) => {
  const rate = num(month?.exchangeRate?.venta) || 1;
  return (month?.fixedItems || []).reduce((s, it) => {
    if (it.status === "paid") return s + toCRC(it.paidAmount ?? it.amount, it.currency, rate);
    if (it.status === "pending") return s + toCRC(it.amount, it.currency, rate);
    return s;
  }, 0);
};

// Sobrante real del mes con lo que de verdad pasó:
//   ingresos + extras in − extras out − fijos (pagados y pendientes) − variables
//   − ahorro confirmado − reserva (solo si se hizo) − faltante arrastrado.
export const leftoverOf = (month, totals = {}) => {
  const income = sumTotal(totals.income ?? totals.incomeByPerson);
  const reserve = month?.annualReserve?.done ? num(totals.reserveQuota) : 0;
  const savingsActual = monthSavingsSummary(month).actual;
  return (
    income + num(totals.extrasIn) - num(totals.extrasOut) - fixedCommittedCRC(month) -
    num(totals.variable) - savingsActual - reserve - num(totals.carryIn ?? month?.carryover?.in)
  );
};

// Lugar donde se queda solo el ahorro de cada persona (perfil: people[].autoSavingsPlaceId).
// Esas personas no usan el botón Apartar: al cerrar, lo planeado cuenta como apartado.
export const autoSavingsOf = (profile) =>
  Object.fromEntries((profile?.people || []).filter((p) => p.autoSavingsPlaceId).map((p) => [p.id, p.autoSavingsPlaceId]));

// Checklist previo al cierre.
export const closeChecklist = (month, totals = {}, autoSavings = {}) => {
  const pendingFixed = (month?.fixedItems || []).filter((it) => it.status === "pending");
  const untouchedSavings = monthSavingsSummary(month).rows
    .filter((r) => r.state === "pending" && !autoSavings[r.personId])
    .map((r) => ({ personId: r.personId, half: r.half }));
  const leftover = leftoverOf(month, totals);
  const deficit = Math.max(0, -leftover);
  return { pendingFixed, untouchedSavings, deficit, leftover, ready: pendingFixed.length === 0 && deficit === 0 };
};

const cloneSavings = (month) => {
  const out = {};
  for (const [pid, halves] of Object.entries(month?.savings?.perPerson || {})) {
    out[pid] = {};
    for (const [hk, row] of Object.entries(halves || {})) out[pid][hk] = { ...row };
  }
  return out;
};

// 'less_savings': baja el actual de la última quincena con ahorro confirmado,
// persona por persona, y sigue con la anterior si no alcanza. Si la fila ya
// estaba en el libro (ledgerId), devuelve un retiro de ajuste para que cuadre.
const applyLessSavings = (month, amount, { monthKey, placeId, date }) => {
  const perPerson = cloneSavings(month);
  const ledgerEntries = [];
  let remaining = Math.max(0, num(amount));
  for (const hk of ["q2", "q1"]) {
    for (const [personId, halves] of Object.entries(perPerson)) {
      const row = halves[hk];
      if (!row || remaining <= 0 || num(row.actual) <= 0) continue;
      const cut = Math.min(num(row.actual), remaining);
      row.actual = num(row.actual) - cut;
      remaining -= cut;
      if (row.ledgerId) {
        ledgerEntries.push({
          id: `${monthKey}-close-adjust-${personId}-${hk}`, date, monthKey, half: hk === "q2" ? 2 : 1,
          personId, placeId: placeId ?? null, type: "retiro", amount: cut, currency: "CRC",
          label: `Ajuste de ahorro ${hk === "q2" ? "2da" : "1ra"} quincena`, kind: "planned",
          reserveId: null, expenseId: null,
        });
      }
    }
  }
  return { monthPatch: { savings: { ...month.savings, perPerson } }, ledgerEntries, remaining };
};

// Resuelve el déficit según la salida elegida.
// Devuelve { monthPatch, ledgerEntries, remaining, choice }.
export const resolveDeficit = (month, choice, amount, opts = {}) => {
  const monthKey = keyOf(month, opts.monthKey);
  const date = opts.today || (monthKey ? lastDayISO(monthKey) : null);
  const amt = Math.max(0, num(amount));
  const ctx = { monthKey, placeId: opts.placeId, date };
  if (amt === 0) return { monthPatch: {}, ledgerEntries: [], remaining: 0, choice };
  if (choice === "less_savings") return { ...applyLessSavings(month, amt, ctx), choice };
  if (choice === "cover") {
    return {
      monthPatch: {},
      ledgerEntries: [{
        id: `${monthKey}-close-cover`, date, monthKey, half: null, personId: null, placeId: opts.placeId ?? null,
        type: "retiro", amount: amt, currency: "CRC", label: "Cubrir faltante del mes", kind: "cover",
        reserveId: null, expenseId: null,
      }],
      remaining: 0, choice,
    };
  }
  if (choice === "carry") {
    return { monthPatch: { carryover: { ...(month?.carryover || { in: 0 }), out: amt } }, ledgerEntries: [], remaining: 0, choice };
  }
  return { monthPatch: {}, ledgerEntries: [], remaining: amt, choice: null };
};

// Aplica las decisiones a los fijos. Un pendiente sin decisión pasa al mes
// siguiente (nada se pierde). paid guarda paidAt y paidAmount.
const applyFixedDecisions = (month, decisions, today, nextKey) =>
  (month?.fixedItems || []).map((it) => {
    if (it.status !== "pending") return it;
    const d = decisions[it.id] || "deferred";
    if (d === "paid") return { ...it, status: "paid", paidAt: today, paidAmount: it.paidAmount ?? it.amount };
    if (d === "skipped") return { ...it, status: "skipped" };
    return { ...it, status: "deferred", deferredTo: nextKey };
  });

// Quincenas sin tocar quedan en 0, sin castigo. Si la persona tiene ahorro automático,
// lo planeado cuenta como apartado en su lugar y se agrega el aporte al libro.
const settleUntouched = (month, today, monthKey, autoSavings = {}) => {
  const perPerson = cloneSavings(month);
  const entries = [];
  for (const [pid, halves] of Object.entries(perPerson)) {
    for (const [hk, row] of Object.entries(halves)) {
      if (row.actual != null) continue;
      const planned = num(row.planned);
      if (autoSavings[pid] && planned > 0) {
        Object.assign(row, { actual: planned, at: today, note: row.note ?? "Apartado automático al cerrar" });
        entries.push({
          id: `${monthKey}-auto-${pid}-${hk}`, date: today, monthKey, half: hk === "q2" ? 2 : 1, personId: pid,
          placeId: autoSavings[pid], type: "aporte",
          ...(row.plannedCurrency === "USD" ? { amount: num(row.plannedAmount), currency: "USD" } : { amount: planned, currency: "CRC" }),
          label: "Ahorro del mes", kind: "planned", reserveId: null, expenseId: null,
        });
      } else {
        Object.assign(row, { actual: 0, at: today, note: row.note ?? "Sin apartar al cerrar" });
      }
    }
  }
  return { savings: { ...(month?.savings || {}), perPerson }, entries };
};

// Cierra el mes. decisions = { fixed: {[id]: 'paid'|'skipped'|'deferred'},
//   deficitResolution: null | { choice, amount }, leftoverReported: null | number,
//   destination: 'libre' | 'ahorro', seenBy: ['correo'] }.
// totals (opcional, de plan.monthTotals) permite guardar leftoverPlanned.
export const applyClose = ({ month, decisions = {}, today, placeId = null, monthKey: mk, totals = null, autoSavings = {}, byCategory = null }) => {
  const monthKey = keyOf(month, mk);
  const nextKey = monthKey ? shiftMonth(monthKey, 1) : null;
  const settled = settleUntouched(month, today, monthKey, autoSavings);
  let closed = {
    ...month,
    fixedItems: applyFixedDecisions(month, decisions.fixed || {}, today, nextKey),
    savings: settled.savings,
  };
  const ledgerEntries = [...settled.entries];

  // Déficit: se resuelve sobre el mes ya con fijos decididos y ahorro en 0.
  const dr = decisions.deficitResolution;
  const resolution = typeof dr === "string" ? { choice: dr, amount: decisions.deficitAmount } : dr;
  let deficitResolution = null;
  if (resolution?.choice && num(resolution.amount) > 0) {
    const r = resolveDeficit(closed, resolution.choice, resolution.amount, { monthKey, placeId, today });
    closed = { ...closed, ...r.monthPatch };
    ledgerEntries.push(...r.ledgerEntries);
    deficitResolution = r.choice;
  }

  // Sobrante: planificado (si hay totales) vs reportado; la diferencia es gasto sin anotar.
  const leftoverPlanned = totals ? leftoverOf(closed, totals) : null;
  const leftoverReported = decisions.leftoverReported == null ? null : num(decisions.leftoverReported);
  const unlogged = leftoverPlanned != null && leftoverReported != null ? Math.max(0, leftoverPlanned - leftoverReported) : null;
  const leftover = leftoverReported ?? leftoverPlanned ?? 0;
  const destination = decisions.destination === "ahorro" ? "ahorro" : "libre";

  if (destination === "ahorro" && leftover > 0) {
    ledgerEntries.push({
      id: `${monthKey}-close-leftover`, date: today, monthKey, half: null, personId: null, placeId,
      type: "aporte", amount: leftover, currency: "CRC", label: "Sobrante del mes", kind: "extra",
      reserveId: null, expenseId: null,
    });
  }

  closed.status = "closed";
  // Gastado en el mes (₡): fijos pagados + variables + extras de gasto de la cuenta.
  const spent = totals ? fixedCommittedCRC(closed) + num(totals.variable) + num(totals.extrasOut) : null;
  closed.closing = {
    closedAt: today, spent, byCategory, leftoverPlanned, leftoverReported, unlogged, deficitResolution, destination,
    seenBy: decisions.seenBy || [],
  };
  const nextCarryIn = deficitResolution === "carry" ? num(closed.carryover?.out) : 0;
  return { month: closed, ledgerEntries, nextCarryIn, leftover };
};
