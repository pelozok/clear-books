// Fondo de emergencia: meta = gastos mensuales × meses. Montos en la moneda que reciba (normalmente CRC).

// Acepta números y strings numéricos (lo que llega de un input); lo demás es 0.
const num = (v) => {
  if (typeof v === "string" && v.trim() === "") return 0;
  const n = typeof v === "number" || typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 0;
};

export const EMERGENCY_MONTHS = [3, 6, 9];

export function emergencyFund({ monthlyExpenses, months = 3, current = 0 }) {
  const expenses = Math.max(0, num(monthlyExpenses));
  const m = Math.max(0, num(months));
  const have = Math.max(0, num(current));
  const target = expenses * m;
  // Meses cubiertos con el ahorro actual, a 1 decimal hacia abajo (es lo que se lee: "cubrís 2,3 meses").
  // Truncar y no redondear: con ₡1 faltante no se puede decir "cubrís 3 meses".
  const covered = expenses > 0 ? Math.floor((have / expenses) * 10 + 1e-9) / 10 : 0;
  const missing = Math.max(0, target - have);
  // Porcentaje 0..100 de la meta, tope en 100 para la barra.
  const pct = target > 0 ? Math.min(100, (have / target) * 100) : 0;
  return { target, covered, missing, pct };
}
