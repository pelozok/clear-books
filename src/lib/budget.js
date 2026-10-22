// Caja chica del mes: el límite de gasto del día a día (variables + extras de gasto
// de la cuenta), en colones. Sin límite propio se usa la sugerencia austera: 35% del
// ingreso del mes, sin pasar de lo que deja el plan (ingreso − fijos − ahorro − reserva).
// Función pura.
import { toCRC } from "./format.js";

const num = (v) => Number(v) || 0;
export const NEAR = 0.8;
export const SUGGESTED_SHARE = 0.35;

// Sugerencia en ₡ (redondeada a ₡5.000) para una persona: 35% del ingreso, topada por `cap`.
export const suggestedSpend = (month, personId, cap = Infinity) => {
  const inc = month?.incomes?.[personId] || {};
  const income = num(inc.salaryCRC) + toCRC(num(inc.salaryUSD), "USD", month?.exchangeRate?.venta);
  const amount = Math.round((income * SUGGESTED_SHARE) / 5000) * 5000;
  return Math.max(0, Math.min(Math.floor(cap), amount));
};

// plan = teQueda(...) ; totals = monthTotals(...). Solo modo individual (una persona).
export const spendBudget = ({ month, profile, plan, totals }) => {
  const row = plan?.perPerson?.[0];
  if (!row || plan.perPerson.length !== 1) return null;
  const person = (profile?.people || []).find((p) => p.id === row.personId) || {};
  const spent = num(totals?.variable) + num(totals?.extrasOut);
  const custom = num(person.spendLimit) > 0;
  const cap = Math.max(0, num(row.libre) + spent);
  const limit = custom
    ? toCRC(num(person.spendLimit), person.spendLimitCurrency, month?.exchangeRate?.venta)
    : suggestedSpend(month, row.personId, cap);
  const remaining = limit - spent;
  const level = remaining < 0 ? "over" : limit > 0 && spent >= limit * NEAR ? "near" : "ok";
  return { limit, spent, remaining, level, custom };
};

// Texto del aviso: "Te queda para gastar ₡N" / "Te pasaste ₡N del límite".
export const budgetMessage = (b, fmt) =>
  b.level === "over" ? `Te pasaste ${fmt(-b.remaining)} del límite del mes` : `Te queda para gastar ${fmt(b.remaining)}`;
