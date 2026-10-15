// Reserva anual (marchamo, Navidad, …): cuota mensual = faltante / meses restantes
// incluyendo el mes actual. Misma aritmética que Actual Budget: si el mes objetivo
// ya pasó este año, salta al próximo ciclo. Funciones puras, sin fechas implícitas.
import { DEFAULT_RATE } from "./exchange.js";

// Número finito o 0 (acepta strings numéricos; NaN/Infinity/basura → 0).
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
// Mes 1-12 válido o null.
const validMonth = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 12 ? n : null;
};
const MKEY = /^\d{4}-\d{2}$/;
const yearOf = (mKey) => (typeof mKey === "string" && MKEY.test(mKey) ? parseInt(mKey.slice(0, 4), 10) : null);
const monthOf = (mKey) => (typeof mKey === "string" && MKEY.test(mKey) ? validMonth(mKey.slice(5, 7)) : null);
const validRate = (rate) => {
  const n = Number(rate);
  return rate !== null && rate !== "" && Number.isFinite(n) && n > 0 ? n : DEFAULT_RATE.venta;
};
// Colones a entero; dólares a centavos.
const roundIn = (n, currency) => (currency === "USD" ? Math.round(n * 100) / 100 : Math.round(n));
// Convierte entre ₡ y $ con el TC venta.
const convert = (amount, from, to, rate) => {
  if (from === to) return amount;
  return to === "USD" ? amount / rate : amount * rate;
};

// Meses desde `fromMonthKey` (incluyéndolo) hasta la próxima ocurrencia de
// `targetMonth` (1-12). Oct → nov = 2, oct → dic = 3, nov → nov = 1, dic → nov = 12.
// Con entradas inválidas devuelve 12 (un ciclo completo): nunca NaN ni < 1.
export const monthsUntilInclusive = (fromMonthKey, targetMonth) => {
  const from = monthOf(fromMonthKey);
  const target = validMonth(targetMonth);
  if (from === null || target === null) return 12;
  let diff = target - from;
  if (diff < 0) diff += 12;
  return diff + 1;
};

// ¿Aplica la reserva en este mes? (activa, con mes de pago válido y ya arrancó)
const applies = (item, mKey) => {
  if (!item || item.active === false) return false;
  if (monthOf(mKey) === null || validMonth(item.month) === null) return false;
  if (item.startsFrom && mKey < item.startsFrom) return false;
  return true;
};

const paidThisYear = (item, mKey) =>
  item.lastPaidYear !== null && item.lastPaidYear !== undefined && item.lastPaidYear !== "" &&
  Number(item.lastPaidYear) === yearOf(mKey);

// Meses que faltan para el próximo pago real: si ya se pagó este año y el mes
// objetivo todavía no pasó, el siguiente pago es el del próximo año (+12).
const monthsToNextPayment = (item, mKey) => {
  let months = monthsUntilInclusive(mKey, item.month);
  if (paidThisYear(item, mKey) && validMonth(item.month) >= monthOf(mKey)) months += 12;
  return months;
};

// Cuota del mes para una reserva, en la moneda del item (₡ enteros, $ con centavos).
// 0 antes de `startsFrom`, si está inactiva o si el mes de pago es inválido.
// Lo apartado negativo cuenta como 0. Nunca Infinity ni NaN.
export const annualQuota = (item, mKey, reservedSoFar = 0) => {
  if (!applies(item, mKey)) return 0;
  const amount = Math.max(0, num(item.amount));
  const reserved = Math.max(0, num(reservedSoFar));
  const missing = Math.max(0, amount - reserved);
  const months = monthsToNextPayment(item, mKey);
  return roundIn(missing / months, item.currency === "USD" ? "USD" : "CRC");
};

const signed = (e) => (e.type === "retiro" ? -num(e.amount) : num(e.amount));

// Apartado por reserva según el libro: Σ aportes − Σ retiros con ese `reserveId`,
// sumado tal cual (sin convertir moneda). Para montos por moneda usar reserveBreakdown.
export const reservedByAnnual = (ledger = []) => {
  const by = {};
  for (const e of ledger || []) {
    if (!e?.reserveId) continue;
    by[e.reserveId] = (by[e.reserveId] || 0) + signed(e);
  }
  return by;
};

// Apartado de una reserva en SU moneda: cada movimiento se convierte con el TC.
// Nunca negativo: si se pagó más de lo apartado, el resto salió del ahorro libre
// (misma regla que savings.js).
const reservedIn = (id, currency, ledger, rate) => {
  let total = 0;
  for (const e of ledger) {
    if (!e?.reserveId || e.reserveId !== id) continue;
    total += convert(signed(e), e.currency === "USD" ? "USD" : "CRC", currency, rate);
  }
  return Math.max(0, roundIn(total, currency));
};

// Desglose del mes: cuota total en ₡ (las reservas en $ se convierten con `rate`,
// por defecto el TC de respaldo), una fila por reserva activa y qué reservas se
// pagan este mes.
export const reserveBreakdown = (annualItems = [], mKey, ledger = [], rate = DEFAULT_RATE.venta) => {
  const r = validRate(rate);
  const items = Array.isArray(annualItems) ? annualItems : [];
  const entries = Array.isArray(ledger) ? ledger : [];
  const breakdown = [];
  const paysThisMonth = [];
  let quota = 0;
  for (const item of items) {
    if (!item || item.active === false) continue;
    const currency = item.currency === "USD" ? "USD" : "CRC";
    const reserved = reservedIn(item.id, currency, entries, r);
    const q = annualQuota(item, mKey, reserved);
    breakdown.push({
      annualId: item.id ?? null,
      name: item.name ?? "",
      quota: q,
      reserved,
      amount: Math.max(0, num(item.amount)),
      currency,
      monthsLeft: applies(item, mKey) ? monthsToNextPayment(item, mKey) : null,
    });
    quota += convert(q, currency, "CRC", r);
    if (item.id != null && validMonth(item.month) === monthOf(mKey) && monthOf(mKey) !== null && !paidThisYear(item, mKey)) {
      paysThisMonth.push(item.id);
    }
  }
  return { quota: Math.round(quota), breakdown, paysThisMonth };
};

// Regla de primer año: si quedan ≤ 2 meses o la cuota (en ₡) se come más de la
// mitad del ahorro base mensual, mejor cubrirlo aparte y reservar desde el próximo
// ciclo. `rate` convierte reservas en $ (por defecto el TC de respaldo).
export const firstYearSuggestion = (item, mKey, baseSavingsMonthly = 0, rate = DEFAULT_RATE.venta) => {
  if (!item || validMonth(item.month) === null) return "cubierto-aparte";
  const months = monthsUntilInclusive(mKey, item.month);
  const currency = item.currency === "USD" ? "USD" : "CRC";
  const quotaCRC = convert(Math.max(0, num(item.amount)) / months, currency, "CRC", validRate(rate));
  if (months <= 2) return "cubierto-aparte";
  if (quotaCRC > 0.5 * num(baseSavingsMonthly)) return "cubierto-aparte";
  return "reservar";
};
