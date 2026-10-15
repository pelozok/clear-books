// Aguinaldo (décimo tercer mes, Ley 2412): promedio de los salarios brutos
// devengados del 1 de diciembre al 30 de noviembre. Se paga antes del 20 de
// diciembre. EXENTO de impuesto al salario y de cuota CCSS, así que el monto
// que da esta calculadora es lo que llega a la cuenta.
// Todo se redondea a colón entero.

// Solo números o strings numéricos; booleanos, arrays, null, NaN e Infinity → 0.
const num = (v) => ((typeof v === "number" || typeof v === "string") && Number.isFinite(Number(v)) ? Number(v) : 0);

export const AGUINALDO_INFO = {
  periodo: "1 de diciembre al 30 de noviembre",
  pagoAntesDe: "20 de diciembre",
  exentoRenta: true,
  exentoCCSS: true,
  fuente: "Ley 2412 (aguinaldo sector privado) y art. 35 Ley 7092 (exención)",
};

// Suma de hasta 12 salarios brutos ÷ 12. Si trabajó menos meses, los meses que
// faltan cuentan como 0 (igual se divide entre 12). Más de 12 valores: se usan
// los primeros 12.
export const aguinaldo = ({ salaries = [] } = {}) => {
  const list = (Array.isArray(salaries) ? salaries : []).slice(0, 12);
  const total = list.reduce((s, v) => s + Math.max(0, num(v)), 0);
  return Math.round(total / 12);
};

// Estimación rápida: salario mensual constante por los meses trabajados (0-12).
// Admite meses fraccionados (ej. 10,5). Meses vacíos (null, "" o no numéricos,
// como llegan de un formulario o de Firestore) cuentan como año completo.
export const aguinaldoEstimate = ({ monthlyGross, monthsWorked = 12 } = {}) => {
  const gross = Math.max(0, num(monthlyGross));
  const blank = monthsWorked == null || String(monthsWorked).trim() === "" || !Number.isFinite(Number(monthsWorked));
  const months = blank ? 12 : Math.min(12, Math.max(0, num(monthsWorked)));
  return Math.round((gross * months) / 12);
};
