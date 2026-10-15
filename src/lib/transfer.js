// "Pasá $X a colones": cuánto mover de la cuenta en dólares (salario + ahorro) a la
// de colones (gasto del mes) en cada quincena. Lo que se queda en dólares: el ahorro
// planeado, la cuota de reserva anual y los fijos que se pagan en dólares (ej: diezmo).
// Todo lo demás (fijos en ₡ y gasto variable) se paga desde colones. Función pura.
import { toCRC } from "./format.js";

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0);

// Parte de un fijo que cae en la quincena `half` (en mensual, todo en la única).
const shareIn = (item, half, quincenal) => {
  if (!quincenal) return 1;
  if (item.half === "ambas") return 0.5;
  return (item.half === 2 ? 2 : 1) === half ? 1 : 0;
};

// Devuelve { half, usd, crc } por quincena (mensual: una sola fila, half 1), o []
// si la persona no cobra en dólares o el TC no sirve.
export const transferToColones = (month, personId) => {
  const rate = num(month?.exchangeRate?.venta);
  const inc = month?.incomes?.[personId] || {};
  const salaryUSD = num(inc.salaryUSD);
  if (!(salaryUSD > 0) || !(rate > 0)) return [];
  const quincenal = month?.frequency === "quincenal";
  const halves = quincenal ? [1, 2] : [1];
  const factor = 1 / halves.length;
  const rows = month?.savings?.perPerson?.[personId] || {};
  const usdFixed = (month?.fixedItems || []).filter((it) => it.currency === "USD" && it.status !== "skipped" && it.status !== "deferred");

  return halves.map((half) => {
    const keep =
      num(rows[half === 2 ? "q2" : "q1"]?.planned) +
      num(month?.annualReserve?.quota) * factor +
      usdFixed.reduce((s, it) => s + toCRC(num(it.paidAmount ?? it.amount), "USD", rate) * shareIn(it, half, quincenal), 0);
    // El salario en ₡ (si hay) ya cae en colones: solo se mueve la parte en dólares.
    const crc = Math.max(0, salaryUSD * factor * rate - keep);
    return { half, crc: Math.round(crc), usd: Math.round((crc / rate) * 100) / 100 };
  });
};
