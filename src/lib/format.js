// Formato es-CR: ₡1.234.567 (punto de miles, coma decimal). Se agrupa a mano porque
// ICU usa espacio duro como separador de miles en es-CR y el producto pide puntos.
const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MESES_LARGOS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MINUS = "−"; // U+2212, se ve mejor que el guion en cifras grandes

import { DEFAULT_RATE } from "./exchange.js";

const isNum = (n) => typeof n === "number" && Number.isFinite(n);
// Número finito o string numérico canónico ("600000", "454.56"); cualquier otra cosa → null.
const toNum = (v) => {
  if (isNum(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};
// Redondeo simétrico (mitad lejos de cero): 1,5 → 2 y −1,5 → −2; nunca −0.
const roundTo = (n, dec = 0) => {
  const f = 10 ** dec;
  const r = (Math.sign(n) * Math.round(Math.abs(n) * f)) / f;
  return r === 0 ? 0 : r;
};
const groupDots = (digits) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// rate puede ser número (TC viejo) o { venta, compra } (TC nuevo): se usa venta.
// Sin TC válido se usa DEFAULT_RATE.venta: un fijo en $ nunca desaparece como ₡0.
// Nunca devuelve NaN ni Infinity.
export const toCRC = (amount, currency, rate) => {
  const n = toNum(amount) ?? 0;
  if (currency !== "USD") return n;
  const r = toNum(rate && typeof rate === "object" ? rate.venta : rate);
  return n * (r && r > 0 ? r : DEFAULT_RATE.venta);
};

export const fmt = (n) => {
  const v = toNum(n);
  if (v === null) return "₡0";
  const r = roundTo(v);
  return `${r < 0 ? MINUS : ""}₡${groupDots(String(Math.abs(r)))}`;
};

export const fmtUSD = (n) => {
  const v = toNum(n);
  if (v === null) return "$0";
  const r = roundTo(v, 2);
  const abs = Math.abs(r).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  return `${r < 0 ? MINUS : ""}$${abs}`;
};

export const fmtAmount = (amount, currency) =>
  currency === "USD" ? fmtUSD(amount) : fmt(amount);

// "+₡50.000" / "−₡50.000" / "₡0" (el signo va antes del símbolo).
export const fmtSigned = (n) => {
  const v = toNum(n);
  if (v === null || roundTo(v) === 0) return "₡0";
  return v > 0 ? `+${fmt(v)}` : fmt(v);
};

// Partes de una fecha ISO; rechaza fechas imposibles ("2026-02-31", día 0, mes 13).
const partsOf = (iso) => {
  const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return null;
  if (m < 1 || m > 12 || d < 1 || d > new Date(Date.UTC(y, m, 0)).getUTCDate()) return null;
  return { y, m, d };
};

// "14 oct"
export const fmtDate = (iso) => {
  const p = partsOf(iso);
  return p && MESES_CORTOS[p.m - 1] ? `${p.d} ${MESES_CORTOS[p.m - 1]}` : "";
};

// "14 de octubre"
export const fmtDateLong = (iso) => {
  const p = partsOf(iso);
  return p && MESES_LARGOS[p.m - 1] ? `${p.d} de ${MESES_LARGOS[p.m - 1]}` : "";
};

// Acepta ISO local "YYYY-MM-DD", ISO con hora (se pasa a hora local), Date, milisegundos,
// Timestamp de Firestore (toDate) o Timestamp serializado ({ seconds }). Devuelve ISO local.
const toLocalISO = (v) => {
  if (v == null) return null;
  if (typeof v === "string" && v.length <= 10) return v;
  let d = v;
  if (typeof v === "string" || typeof v === "number") d = new Date(v);
  else if (typeof v.toDate === "function") d = v.toDate();
  else if (isNum(v.seconds)) d = new Date(v.seconds * 1000);
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Diferencia en días calendario (hoy − fecha), sin efectos de hora ni zona horaria.
const daysAgo = (iso, today) => {
  const a = partsOf(iso);
  const b = partsOf(today);
  if (!a || !b) return null;
  return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86400000);
};

// "hoy" / "ayer" / "hace 3 días"; más de 30 días atrás cae a "14 oct". Futuro: "mañana" / "en 3 días".
export const fmtRelative = (ts, today) => {
  const iso = toLocalISO(ts);
  const hoy = toLocalISO(today);
  const diff = iso && hoy ? daysAgo(iso, hoy) : null;
  if (diff === null) return "";
  if (diff === 0) return "hoy";
  if (diff === 1) return "ayer";
  if (diff === -1) return "mañana";
  if (diff < 0) return `en ${-diff} días`;
  if (diff > 30) return fmtDate(iso);
  return `hace ${diff} días`;
};

// Texto es-CR a número: "1.234.567,5" → 1234567.5, "1234567" → 1234567, "₡ 50.000" → 50000.
// Regla: si hay punto y coma, el último separador es el decimal (sirve "1,234.5" en-US).
// Un solo tipo de separador repetido ("1,234,567", "1.000.000") es de miles. Separador único:
// es de miles si le siguen exactamente 3 dígitos y antes hay algo distinto de 0
// ("1.500" y "1,500" → 1500; "12.5", "12,5", "0.500" → decimales).
// Vacío → 0; texto sin dígitos, guion en el medio o número no finito → NaN.
export const parseAmountInput = (str) => {
  if (str == null) return 0;
  if (typeof str === "number") return Number.isFinite(str) ? str : NaN;
  if (String(str).trim() === "") return 0;
  const raw = String(str).replace(/\u2212/g, "-").replace(/[^\d.,-]/g, "");
  if (!/\d/.test(raw) || /\d.*-/.test(raw)) return NaN;
  const neg = raw.startsWith("-");
  const body = raw.replace(/-/g, "");
  const lastDot = body.lastIndexOf(".");
  const lastComma = body.lastIndexOf(",");
  let normalized;
  if (lastDot >= 0 && lastComma >= 0) {
    const i = Math.max(lastDot, lastComma);
    normalized = `${body.slice(0, i).replace(/[.,]/g, "")}.${body.slice(i + 1)}`;
  } else if (lastDot >= 0 || lastComma >= 0) {
    const parts = body.split(lastDot >= 0 ? "." : ",");
    const miles = parts.length > 2 || (parts[1].length === 3 && !/^0*$/.test(parts[0]));
    normalized = miles ? parts.join("") : `${parts[0]}.${parts[1]}`;
  } else {
    normalized = body;
  }
  const n = Number(normalized);
  if (!Number.isFinite(n)) return NaN;
  return neg && n !== 0 ? -n : n;
};

// Número a texto para un input es-CR, con 2 decimales como máximo:
// 1234567 → "1.234.567", 1234567.5 → "1.234.567,5", 0.1 + 0.2 → "0,3".
export const fmtAmountInput = (n) => {
  if (!isNum(n)) return "";
  const r = roundTo(n, 2);
  const [ent, dec] = Math.abs(r).toFixed(2).replace(/\.?0+$/, "").split(".");
  const base = groupDots(ent) + (dec ? `,${dec}` : "");
  return r < 0 ? `-${base}` : base;
};
