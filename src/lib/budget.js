// Límite de gasto del día a día por mes (variables + extras de gasto de la cuenta).
// Sin límite propio, el límite es lo que deja el plan: ingreso − fijos − ahorro − reserva.
// Función pura.
import { toCRC } from "./format.js";

const num = (v) => Number(v) || 0;
export const NEAR = 0.8;

// plan = teQueda(...) ; totals = monthTotals(...). Solo modo individual (una persona).
export const spendBudget = ({ month, profile, plan, totals }) => {
  const row = plan?.perPerson?.[0];
  if (!row || plan.perPerson.length !== 1) return null;
  const person = (profile?.people || []).find((p) => p.id === row.personId) || {};
  const spent = num(totals?.variable) + num(totals?.extrasOut);
  const custom = num(person.spendLimit) > 0;
  const limit = custom
    ? toCRC(num(person.spendLimit), person.spendLimitCurrency, month?.exchangeRate?.venta)
    : Math.max(0, num(row.libre) + spent);
  const remaining = limit - spent;
  const level = remaining < 0 ? "over" : limit > 0 && spent >= limit * NEAR ? "near" : "ok";
  return { limit, spent, remaining, level, custom };
};

// Texto del aviso: "Te queda para gastar ₡N" / "Te pasaste ₡N del límite".
export const budgetMessage = (b, fmt) =>
  b.level === "over" ? `Te pasaste ${fmt(-b.remaining)} del límite del mes` : `Te queda para gastar ${fmt(b.remaining)}`;
