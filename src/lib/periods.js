// Claves de mes y quincena. Fechas siempre como ISO local "YYYY-MM-DD", mes "YYYY-MM".
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const pad = (n) => String(n).padStart(2, "0");

// Fecha local (no UTC): en Costa Rica toISOString() corre el día por la noche.
export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const monthKey = (iso) => iso.slice(0, 7);

// Quincena de una fecha: 1-15 → 1, 16-fin → 2.
export const halfOf = (iso) => (parseInt(iso.slice(8, 10), 10) <= 15 ? 1 : 2);

// Clave de período: "2026-07" (mensual) | "2026-07-Q1" / "2026-07-Q2" (quincenal)
export const periodKeyFor = (iso, frequency) => {
  const month = monthKey(iso);
  if (frequency !== "quincenal") return month;
  return `${month}-Q${halfOf(iso)}`;
};

export const currentPeriodKey = (frequency) => periodKeyFor(todayISO(), frequency);

export const parsePeriodKey = (key) => {
  const [month, q] = [key.slice(0, 7), key.slice(8)];
  return { month, half: q === "Q1" ? 1 : q === "Q2" ? 2 : null };
};

// Normaliza la quincena: 1 | 2 | 'ambas' | null. Acepta "1"/"2" (valor de un <select>).
const normHalf = (half) => {
  if (half === "ambas") return "ambas";
  const n = Number(half);
  return half != null && half !== "" && (n === 1 || n === 2) ? n : null;
};

// "1ra quincena" / "2da quincena" / "Ambas quincenas"; null → "".
export const halfLabel = (half) => {
  const h = normHalf(half);
  if (h === 1) return "1ra quincena";
  if (h === 2) return "2da quincena";
  if (h === "ambas") return "Ambas quincenas";
  return "";
};

// Quincenas que existen en una frecuencia: mensual solo tiene la 1.
export const halvesFor = (frequency) => (frequency === "quincenal" ? [1, 2] : [1]);

// Clave inválida ("2026-13", null) → "" en vez de "undefined 2026".
export const monthLabel = (mKey) => {
  const [y, m] = String(mKey ?? "").split("-");
  const mes = MESES[Number(m) - 1];
  return mes && /^\d{4}$/.test(y) ? `${mes} ${y}` : "";
};

export const periodLabel = (key) => {
  const { month, half } = parsePeriodKey(key);
  return half ? `${halfLabel(half)} · ${monthLabel(month)}` : monthLabel(month);
};

// Suma delta meses a una clave de mes (delta puede ser negativo). Delta string "1" se
// convierte (no concatena), fraccional se trunca y uno inválido cuenta como 0.
export const shiftMonth = (mKey, delta) => {
  const [y, m] = mKey.split("-").map(Number);
  const d = Math.trunc(Number(delta)) || 0;
  const total = y * 12 + (m - 1) + d;
  return `${Math.floor(total / 12)}-${pad((total % 12) + 1)}`;
};

// Meses de a hasta b (b − a). monthsBetween("2026-10", "2027-01") = 3.
export const monthsBetween = (a, b) => {
  const [ya, ma] = a.split("-").map(Number);
  const [yb, mb] = b.split("-").map(Number);
  return (yb - ya) * 12 + (mb - ma);
};

export const prevPeriodKey = (key) => {
  const { month, half } = parsePeriodKey(key);
  if (half === null) return shiftMonth(month, -1);
  if (half === 2) return `${month}-Q1`;
  return `${shiftMonth(month, -1)}-Q2`;
};

export const nextPeriodKey = (key) => {
  const { month, half } = parsePeriodKey(key);
  if (half === null) return shiftMonth(month, 1);
  if (half === 1) return `${month}-Q2`;
  return `${shiftMonth(month, 1)}-Q1`;
};

export const lastDayOfMonth = (mKey) => {
  const [y, m] = mKey.split("-").map(Number);
  return new Date(y, m, 0).getDate();
};

// Rango de fechas de una quincena dentro del mes; half null → mes completo.
export const quarterRange = (mKey, half) => {
  const fin = `${mKey}-${pad(lastDayOfMonth(mKey))}`;
  half = normHalf(half);
  if (half === 1) return { start: `${mKey}-01`, end: `${mKey}-15` };
  if (half === 2) return { start: `${mKey}-16`, end: fin };
  return { start: `${mKey}-01`, end: fin };
};

// Rango de fechas del período, para default y validación al agregar gastos.
export const periodDateRange = (key) => {
  const { month, half } = parsePeriodKey(key);
  return quarterRange(month, half);
};

// Fecha default al agregar un gasto: hoy si cae dentro del período, si no el inicio.
export const defaultDateFor = (key, today = todayISO()) => {
  const { start, end } = periodDateRange(key);
  return today >= start && today <= end ? today : start;
};
