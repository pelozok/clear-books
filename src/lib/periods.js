const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const pad = (n) => String(n).padStart(2, "0");

// Fecha local (no UTC): en Costa Rica toISOString() corre el día por la noche.
export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const monthKey = (iso) => iso.slice(0, 7);

// Clave de período: "2026-07" (mensual) | "2026-07-Q1" / "2026-07-Q2" (quincenal)
export const periodKeyFor = (iso, frequency) => {
  const month = monthKey(iso);
  if (frequency !== "quincenal") return month;
  const day = parseInt(iso.slice(8, 10), 10);
  return `${month}-Q${day <= 15 ? 1 : 2}`;
};

export const currentPeriodKey = (frequency) => periodKeyFor(todayISO(), frequency);

export const parsePeriodKey = (key) => {
  const [month, q] = [key.slice(0, 7), key.slice(8)];
  return { month, half: q === "Q1" ? 1 : q === "Q2" ? 2 : null };
};

export const periodLabel = (key) => {
  const { month, half } = parsePeriodKey(key);
  const [y, m] = month.split("-");
  const mes = `${MESES[+m - 1]} ${y}`;
  return half ? `${half === 1 ? "1ra" : "2da"} quincena · ${mes}` : mes;
};

export const monthLabel = (mKey) => {
  const [y, m] = mKey.split("-");
  return `${MESES[+m - 1]} ${y}`;
};

const shiftMonth = (mKey, delta) => {
  const [y, m] = mKey.split("-").map(Number);
  const total = y * 12 + (m - 1) + delta;
  return `${Math.floor(total / 12)}-${pad((total % 12) + 1)}`;
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

const lastDayOfMonth = (mKey) => {
  const [y, m] = mKey.split("-").map(Number);
  return new Date(y, m, 0).getDate();
};

// Rango de fechas del período, para default y validación al agregar gastos.
export const periodDateRange = (key) => {
  const { month, half } = parsePeriodKey(key);
  if (half === 1) return { start: `${month}-01`, end: `${month}-15` };
  if (half === 2) return { start: `${month}-16`, end: `${month}-${pad(lastDayOfMonth(month))}` };
  return { start: `${month}-01`, end: `${month}-${pad(lastDayOfMonth(month))}` };
};

// Fecha default al agregar un gasto: hoy si cae dentro del período, si no el inicio.
export const defaultDateFor = (key) => {
  const hoy = todayISO();
  const { start, end } = periodDateRange(key);
  return hoy >= start && hoy <= end ? hoy : start;
};
