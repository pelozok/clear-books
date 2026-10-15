// Fijos que son un % del ingreso del mes (ej: diezmo 10%). Su monto no se guarda
// fijo: se recalcula con los salarios y los extras de ingreso del mes. Función pura.
import { toCRC } from "./format.js";

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0);

// Ingreso del mes en CRC: salarios de todos + extras de ingreso.
export const monthIncomeCRC = (month) => {
  const r = month?.exchangeRate?.venta ?? 0;
  let total = 0;
  for (const inc of Object.values(month?.incomes || {})) {
    total += num(inc?.salaryCRC) + toCRC(num(inc?.salaryUSD), "USD", r);
  }
  for (const x of month?.extras || []) {
    if (x?.type === "ingreso") total += toCRC(num(x.amount), x.currency, r);
  }
  return total;
};

// Monto de un fijo porcentual en su moneda (CRC redondeado a colones, USD a centavos).
export const percentAmount = (percent, month, currency = "CRC") => {
  const crc = monthIncomeCRC(month) * (num(percent) / 100);
  if (currency !== "USD") return Math.round(crc);
  const r = num(month?.exchangeRate?.venta);
  return r > 0 ? Math.round((crc / r) * 100) / 100 : 0;
};

// Devuelve el mes con los fijos porcentuales al día. Los ya pagados conservan su
// paidAmount; solo cambia `amount`. Sin fijos porcentuales devuelve el mismo objeto.
export const withPercentAmounts = (month) => {
  const items = month?.fixedItems;
  if (!items?.some((it) => num(it?.percent) > 0)) return month;
  return {
    ...month,
    fixedItems: items.map((it) =>
      num(it?.percent) > 0 ? { ...it, amount: percentAmount(it.percent, month, it.currency) } : it),
  };
};
