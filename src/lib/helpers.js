import { DEFAULT_BUDGET_PCTS } from "./constants.js";

export const getCat = (id, cats) => cats.find(c => c.id === id) || cats[cats.length - 1];

export const getBudgets = (config, totalIncomeCRC, cats) =>
  Object.fromEntries(
    cats.map(c => [
      c.id,
      config.budgets?.[c.id] ?? Math.round(totalIncomeCRC * (DEFAULT_BUDGET_PCTS[c.id] || 0)),
    ])
  );

export const fetchExchangeRate = async () => {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("HTTP error");
  const data = await res.json();
  if (!data.rates?.CRC) throw new Error("No CRC in response");
  return Math.round(data.rates.CRC);
};

export const toCRC = (amount, currency, rate) => currency === "USD" ? amount * rate : amount;

export const fmt = (n) => {
  if (n == null || isNaN(n)) return "₡0";
  return `₡${Math.round(n).toLocaleString("es-CR")}`;
};

export const fmtUSD = (n) => {
  if (n == null || isNaN(n)) return "$0";
  return `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

export const fmtAmount = (amount, currency) => currency === "USD" ? fmtUSD(amount) : fmt(amount);

export const todayISO   = () => new Date().toISOString().slice(0, 10);
export const monthKey   = (iso) => iso.slice(0, 7);
export const monthLabel = (key) => {
  const [y, m] = key.split("-");
  return `${["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][+m-1]} ${y}`;
};
export const nextMonthKey = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return monthKey(d.toISOString());
};

// ── Quincena helpers ──────────────────────────────────
export const dayOfMonth  = (iso) => parseInt(iso.split("-")[2]);
export const isFirstQ    = (iso) => dayOfMonth(iso) <= 15;
export const todayHalf   = () => isFirstQ(todayISO()) ? 1 : 2;

export const quincenaKey = (iso) => `${monthKey(iso)}-${isFirstQ(iso) ? 1 : 2}`;

export const quincenaLabel = (month, half) => {
  const [y, m] = month.split("-");
  const mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][+m - 1];
  return `${half === 1 ? "1ra" : "2da"} quincena · ${mes} ${y}`;
};

export const prevQuincena = (month, half) => {
  if (half === 2) return { month, half: 1 };
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 2, 1);
  return { month: monthKey(d.toISOString()), half: 2 };
};
