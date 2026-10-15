import { todayISO } from "./periods.js";

// Tipo de cambio por defecto si no hay red ni valor guardado (CRC por USD).
export const DEFAULT_RATE = { venta: 455, compra: 450 };

const round2 = (n) => Math.round(n * 100) / 100;
const TIMEOUT_MS = 8000;
const isoDate = (v) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : null);

// fetch con tope de tiempo: si Hacienda se cuelga, se aborta y entra el respaldo.
const fetchWithTimeout = async (url) => {
  const ctrl = typeof AbortController === "function" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), TIMEOUT_MS) : null;
  try {
    return await fetch(url, ctrl ? { signal: ctrl.signal } : undefined);
  } finally {
    if (timer) clearTimeout(timer);
  }
};
const positive = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};

// Tipo de cambio oficial del BCCR (compra y venta) vía la API pública del
// Ministerio de Hacienda (el web service del BCCR es SOAP y no permite CORS).
// Responde { venta: { fecha, valor }, compra: { fecha, valor } }.
const fetchFromHacienda = async (today) => {
  const res = await fetchWithTimeout("https://api.hacienda.go.cr/indicadores/tc/dolar");
  if (!res.ok) throw new Error("HTTP error");
  const data = await res.json();
  const venta = positive(data?.venta?.valor);
  if (!venta) throw new Error("No venta in response");
  const compra = positive(data?.compra?.valor) ?? venta;
  const fecha = isoDate(data?.venta?.fecha) ?? today; // "2026-10-14 00:00:00" → "2026-10-14"
  return { venta: round2(venta), compra: round2(compra), date: fecha };
};

// Respaldo si Hacienda está caído: tasa de mercado (no BCCR), compra = venta.
const fetchFallback = async (today) => {
  const res = await fetchWithTimeout("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("HTTP error");
  const data = await res.json();
  const crc = positive(data?.rates?.CRC);
  if (!crc) throw new Error("No CRC in response");
  const venta = round2(crc);
  return { venta, compra: venta, date: today };
};

// Devuelve { venta, compra, date }. Lanza si ambas fuentes fallan: el caller decide
// si usa DEFAULT_RATE o el último valor guardado.
export const fetchExchangeRate = async (today = todayISO()) => {
  try {
    return await fetchFromHacienda(today);
  } catch {
    return await fetchFallback(today);
  }
};

// Normaliza un TC guardado (número viejo o { venta, compra }) a la forma nueva, siempre numérica.
export const normalizeRate = (rate) => {
  const venta = rate && typeof rate === "object" ? positive(rate.venta) : null;
  if (venta) {
    return { venta, compra: positive(rate.compra) ?? venta, date: rate.date || null };
  }
  const n = positive(rate);
  return n ? { venta: n, compra: n, date: null } : { ...DEFAULT_RATE, date: null };
};

const HOUR = 60 * 60 * 1000;
const toMillis = (v) => {
  if (typeof v?.toDate === "function") return v.toDate().getTime();
  if (v && typeof v === "object" && !(v instanceof Date) && Number.isFinite(v.seconds)) return v.seconds * 1000;
  return new Date(v).getTime();
};

// El tipo de cambio se refresca si tiene más de 24 horas, nunca se guardó o la fecha
// guardada está más de 1 h en el futuro (reloj del teléfono adelantado al guardarla).
// Acepta ISO, Date, milisegundos, Timestamp (toDate) o Timestamp serializado ({ seconds }).
export const shouldRefreshRate = (updatedAt, now = Date.now()) => {
  if (!updatedAt) return true;
  const t = toMillis(updatedAt);
  if (Number.isNaN(t)) return true;
  return now - t > 24 * HOUR || t - now > HOUR;
};
