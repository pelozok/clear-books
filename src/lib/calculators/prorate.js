// Prorrateo de un gasto anual (marchamo, Navidad, seguro) en cuotas mensuales.
// Cuenta los meses INCLUSIVE desde el mes actual hasta el mes en que se paga;
// si ese mes ya pasó este año, salta al próximo. Siempre entre 1 y 12 meses,
// así que nunca divide entre 0. Las cuotas se redondean hacia arriba a colón
// entero para que la suma nunca quede corta.

// Solo números o strings numéricos; booleanos, arrays, null, NaN e Infinity → 0.
const num = (v) => ((typeof v === "number" || typeof v === "string") && Number.isFinite(Number(v)) ? Number(v) : 0);
const pad = (n) => String(n).padStart(2, "0");

const parseMonthKey = (mKey) => {
  const [y, m] = String(mKey || "").split("-").map(Number);
  return Number.isInteger(y) && Number.isInteger(m) && m >= 1 && m <= 12 ? { y, m } : null;
};

// Mes de pago válido: entero 1..12 (acepta "11"). Cualquier otra cosa → null.
// Antes un dueMonth vacío caía en enero y 99 en diciembre, en silencio.
const dueMonthOf = (dueMonth) => {
  if (dueMonth == null || String(dueMonth).trim() === "") return null;
  const m = Number(dueMonth);
  return Number.isInteger(m) && m >= 1 && m <= 12 ? m : null;
};

// Meses inclusive desde fromMonthKey hasta el próximo dueMonth (1..12).
// Si el mes de origen o el de pago no son válidos, reparte en 12.
export const monthsUntilDue = ({ dueMonth, fromMonthKey, fromMonth } = {}) => {
  const from = parseMonthKey(fromMonthKey ?? fromMonth);
  const due = dueMonthOf(dueMonth);
  if (!from || !due) return 12;
  const diff = due - from.m + 1;
  return diff >= 1 ? diff : diff + 12;
};

// Clave YYYY-MM del próximo pago (este año o el siguiente).
export const nextDueMonthKey = ({ dueMonth, fromMonthKey, fromMonth } = {}) => {
  const from = parseMonthKey(fromMonthKey ?? fromMonth);
  const due = dueMonthOf(dueMonth);
  if (!from || !due) return null;
  const year = due >= from.m ? from.y : from.y + 1;
  return `${year}-${pad(due)}`;
};

// Cuota mensual = amount / meses inclusive hasta el pago, en la moneda del
// monto: CRC se redondea hacia arriba a colón entero; USD a centavo (redondear
// $100/3 a $34 sobre-reservaba $2). La conversión a ₡ la hace quien llama.
export const monthlyShare = ({ amount, dueMonth, fromMonthKey, fromMonth, currency = "CRC" } = {}) => {
  const total = Math.max(0, num(amount));
  const months = monthsUntilDue({ dueMonth, fromMonthKey, fromMonth });
  const unit = currency === "USD" ? 100 : 1;
  // Limpia ruido de punto flotante antes del ceil (100000/3 → 33333,33 → 33334).
  return Math.ceil(Math.round((total / months) * unit * 100) / 100) / unit;
};
