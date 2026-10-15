// Montos del mes que dependen de otros datos del mismo mes y se recalculan al leerlo:
// fijos que son % del ingreso y ahorro planeado en dólares (se pasa a ₡ con el TC del mes).
import { withPercentAmounts } from "./percent.js";

const num = (v) => Number(v) || 0;

// Ahorro planeado en $: `planned` (siempre ₡) = plannedAmount × TC del mes.
export const withUSDSavings = (month) => {
  const pp = month?.savings?.perPerson;
  const rate = num(month?.exchangeRate?.venta);
  if (!pp || !(rate > 0)) return month;
  let changed = false;
  const perPerson = {};
  for (const [pid, halves] of Object.entries(pp)) {
    perPerson[pid] = {};
    for (const [hk, row] of Object.entries(halves || {})) {
      if (row?.plannedCurrency === "USD") {
        const planned = Math.round(num(row.plannedAmount) * rate);
        if (planned !== row.planned) changed = true;
        perPerson[pid][hk] = { ...row, planned };
      } else perPerson[pid][hk] = row;
    }
  }
  return changed ? { ...month, savings: { ...month.savings, perPerson } } : month;
};

export const deriveMonth = (month) => (month ? withPercentAmounts(withUSDSavings(month)) : month);
