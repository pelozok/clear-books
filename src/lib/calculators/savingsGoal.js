// Meta de ahorro: cuánto apartar por período, cuántos períodos faltan y
// proyección año a año. Modelo de anualidad vencida (el aporte entra al final
// de cada período y el saldo se capitaliza por período).
// perYear: 12 (mensual) | 24 (quincenal). annualRate es nominal anual.
// netOfTax: aplica la retención del 15% sobre intereses (tasa × 0,85).
// Nunca devuelve Infinity/NaN: los casos imposibles devuelven null.
import { RETENCION_INTERESES } from "../constantsCR.js";

// Solo números o strings numéricos; booleanos, arrays, null, NaN e Infinity → 0.
const num = (v) => ((typeof v === "number" || typeof v === "string") && Number.isFinite(Number(v)) ? Number(v) : 0);

// Períodos por año: entero 1..365. Vacío o inválido (null, 0, "", negativo)
// vuelve al default mensual (12); antes caía a 1 y capitalizaba anual en silencio.
const MAX_PER_YEAR = 365;
const perYearOf = (v) => {
  const n = Math.floor(num(v));
  return n >= 1 ? Math.min(MAX_PER_YEAR, n) : 12;
};
// Tope de años de la proyección: evita congelar la pestaña si se teclea 1000000.
export const MAX_YEARS = 100;

// Tasa efectiva por período (ya neta de retención si aplica).
export const periodRate = ({ annualRate = 0, perYear = 12, netOfTax = false } = {}) => {
  const n = perYearOf(perYear);
  const r = Math.max(0, num(annualRate)) * (netOfTax === true ? 1 - RETENCION_INTERESES : 1);
  return r / n;
};

// Redondeo hacia arriba a colón entero, limpiando ruido de punto flotante.
const ceilCRC = (x) => Math.ceil(Math.round(x * 100) / 100);

// Aporte por período para llegar a `goal` en `periods` períodos.
// c = (goal − initial·(1+r)^n) · r / ((1+r)^n − 1); con r = 0 es lineal.
// Devuelve 0 si ya se alcanzó, null si periods < 1 o si el resultado no es
// calculable (plazos absurdos que desbordan (1+r)^n).
export const contributionFor = ({ goal, initial = 0, periods, annualRate = 0, perYear = 12, netOfTax = false } = {}) => {
  const n = Math.floor(num(periods));
  if (n < 1) return null;
  const g = num(goal);
  const p0 = num(initial);
  const r = periodRate({ annualRate, perYear, netOfTax });
  let c;
  if (r === 0) {
    c = (g - p0) / n;
  } else {
    const f = Math.pow(1 + r, n);
    c = ((g - p0 * f) * r) / (f - 1);
  }
  if (!Number.isFinite(c)) return null;
  return Math.max(0, ceilCRC(c));
};

// Períodos necesarios para llegar a `goal`. 0 si ya está; null si nunca llega
// (sin aporte y sin interés, o aporte ≤ 0 con saldo inicial ≤ 0).
// n = ln((goal·r + c) / (initial·r + c)) / ln(1 + r)
export const periodsToReach = ({ goal, initial = 0, contribution = 0, annualRate = 0, perYear = 12, netOfTax = false } = {}) => {
  const g = num(goal);
  const p0 = num(initial);
  const c = Math.max(0, num(contribution));
  if (p0 >= g) return 0;
  const r = periodRate({ annualRate, perYear, netOfTax });
  if (r === 0) {
    if (c <= 0) return null;
    return Math.ceil(Math.round(((g - p0) / c) * 1e6) / 1e6);
  }
  const base = p0 * r + c;
  if (base <= 0) return null;
  const n = Math.log((g * r + c) / base) / Math.log(1 + r);
  if (!Number.isFinite(n)) return null;
  return Math.max(1, Math.ceil(Math.round(n * 1e6) / 1e6));
};

// Proyección año a año. contributed incluye el saldo inicial; interest es lo
// ganado acumulado; realBalance descuenta la inflación anual compuesta.
export const projection = ({ initial = 0, contribution = 0, annualRate = 0, perYear = 12, years, inflation = 0, netOfTax = false } = {}) => {
  const y = Math.min(MAX_YEARS, Math.floor(num(years)));
  if (y < 1) return [];
  const n = perYearOf(perYear);
  const r = periodRate({ annualRate, perYear: n, netOfTax });
  const c = Math.max(0, num(contribution));
  const infl = Math.max(0, num(inflation));
  let balance = num(initial);
  let contributed = balance;
  const rows = [];
  for (let year = 1; year <= y; year++) {
    for (let i = 0; i < n; i++) {
      balance = balance * (1 + r) + c;
      contributed += c;
    }
    const bal = Math.round(balance);
    const aportado = Math.round(contributed);
    rows.push({
      year,
      balance: bal,
      contributed: aportado,
      interest: bal - aportado, // así balance = contributed + interest siempre
      realBalance: Math.round(balance / Math.pow(1 + infl, year)),
    });
  }
  return rows;
};
