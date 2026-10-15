// Ahorro real: saldos de lugares, reservas anuales y resumen del mes.
// Funciones puras. El único libro es savingsLedger; nunca se suman metas.

// Conversión local para no depender de otros módulos en construcción.
const toCRC = (amount, currency, rate) =>
  currency === "USD" ? (Number(amount) || 0) * (Number(rate) || 0) : Number(amount) || 0;

const num = (v) => Number(v) || 0;
const isActive = (x) => x && x.active !== false;

// Signo de un movimiento: aporte suma, retiro resta.
const signed = (e) => (e.type === "retiro" ? -num(e.amount) : num(e.amount));

// Saldo de un lugar en SU moneda: apertura + aportes − retiros.
// Se asume que los movimientos de un lugar están en la moneda del lugar.
export const placeBalance = (place, ledger = []) => {
  if (!place) return 0;
  const movs = ledger.filter((e) => e.placeId === place.id);
  return num(place.openingAmount) + movs.reduce((s, e) => s + signed(e), 0);
};

// Apartado de una reserva anual (en CRC): aportes − retiros con ese reserveId.
// Nunca negativo: si se pagó más de lo apartado, el resto salió del ahorro libre.
const reservedFor = (annualId, ledger, rate) => {
  const total = ledger
    .filter((e) => e.reserveId === annualId)
    .reduce((s, e) => s + toCRC(signed(e), e.currency, rate), 0);
  return Math.max(0, total);
};

// "Llevamos ahorrado" = Σ saldos de lugares activos en CRC (TC de hoy).
// reservedCRC = Σ apartado por reserva; freeCRC = total − reservado (≥ 0).
export const savingsTotals = ({ places = [], ledger = [], annual = [], rate = 1 }) => {
  const byPlace = places
    .filter(isActive)
    .map((place) => ({ place, balance: placeBalance(place, ledger) }));
  const totalCRC = byPlace.reduce((s, { place, balance }) => s + toCRC(balance, place.currency, rate), 0);
  const reservedByAnnual = annual
    .filter(isActive)
    .map((a) => ({ annualId: a.id, name: a.name, amount: reservedFor(a.id, ledger, rate) }));
  const reservedCRC = reservedByAnnual.reduce((s, r) => s + r.amount, 0);
  return { byPlace, totalCRC, reservedCRC, reservedByAnnual, freeCRC: Math.max(0, totalCRC - reservedCRC) };
};

// Estado de una fila de ahorro:
//   pending  → nadie la tocó (actual null)
//   partial  → 0 ≤ actual < planned (el 0 explícito también, con etiqueta propia)
//   done     → actual ≥ planned
export const savingsRowState = (planned, actual) => {
  if (actual == null) return "pending";
  if (num(actual) >= num(planned)) return "done";
  return "partial";
};

const ROW_LABELS = {
  pending: "Pendiente",
  partial: "Parcial",
  zero: "Quedó en 0",
  done: "Apartado",
};

const rowLabel = (state, actual) =>
  state === "partial" && num(actual) === 0 ? ROW_LABELS.zero : ROW_LABELS[state];

// Resumen del ahorro planificado del mes (month.savings.perPerson).
//   planned = Σ planned, actual = Σ actual (null cuenta 0),
//   pending = Σ planned de las filas que nadie tocó todavía.
export const monthSavingsSummary = (month) => {
  const perPerson = month?.savings?.perPerson || {};
  const rows = [];
  for (const [personId, halves] of Object.entries(perPerson)) {
    for (const [hk, row] of Object.entries(halves || {})) {
      const half = hk === "q2" ? 2 : 1;
      const planned = num(row?.planned);
      const actual = row?.actual == null ? null : num(row.actual);
      const state = savingsRowState(planned, actual);
      rows.push({ personId, half, planned, actual, state, label: rowLabel(state, actual), ledgerId: row?.ledgerId ?? null });
    }
  }
  rows.sort((a, b) => a.half - b.half || 0);
  const planned = rows.reduce((s, r) => s + r.planned, 0);
  const actual = rows.reduce((s, r) => s + num(r.actual), 0);
  const pending = rows.filter((r) => r.state === "pending").reduce((s, r) => s + r.planned, 0);
  return { planned, actual, pending, rows };
};

// Meses de fijos cubiertos por el ahorro, con 1 decimal. 0 si no hay promedio.
export const monthsCovered = (totalCRC, avgFixedCRC) => {
  if (num(avgFixedCRC) <= 0) return 0;
  return Math.round((num(totalCRC) / num(avgFixedCRC)) * 10) / 10;
};

const MILESTONES = [1, 3, 6];

// Siguiente hito de meses cubiertos (1, 3 o 6) y cuánto falta para llegar.
// Pasados los 6 meses, el hito queda en 6 con missing 0.
export const nextMilestone = (totalCRC, avgFixedCRC) => {
  const avg = num(avgFixedCRC);
  if (avg <= 0) return { months: 1, missing: 0 };
  for (const months of MILESTONES) {
    const target = months * avg;
    if (num(totalCRC) < target) return { months, missing: target - num(totalCRC) };
  }
  return { months: 6, missing: 0 };
};

// Ahorro de planilla acumulado (solidarista, etc.) en CRC: el monto es MENSUAL
// y crece solo con cada mes cerrado. No vive en el libro ni en los lugares.
export const payrollSavingsCRC = (profile, closedMonthsCount, rate = 1) => {
  const months = Math.max(0, num(closedMonthsCount));
  const people = profile?.people || [];
  return people.reduce((s, p) => {
    const ps = p?.payrollSavings;
    if (!ps || !num(ps.amount)) return s;
    return s + toCRC(ps.amount, ps.currency, rate) * months;
  }, 0);
};

// Ahorro por período de una persona del perfil, en ₡ (si lo define en $, con `rate`).
export const savingsPerPeriodCRC = (person, rate) =>
  person?.savingsCurrency === "USD" ? num(person.savingsPerPeriod) * num(rate) : num(person?.savingsPerPeriod);
