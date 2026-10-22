// "Pasá $X a colones": cuánto mover de la cuenta en dólares (donde cae el salario) a
// la de colones en cada quincena. A colones va solo lo que se paga en colones: los
// fijos en ₡ y la caja chica del mes (el límite de gasto del día a día). Todo lo
// demás se queda en dólares como ahorro. Función pura.
const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0);

// Parte de un fijo que cae en la quincena `half` (en mensual, todo en la única).
const shareIn = (item, half, quincenal) => {
  if (!quincenal) return 1;
  if (item.half === "ambas") return 0.5;
  return (item.half === 2 ? 2 : 1) === half ? 1 : 0;
};

// cajaChica: límite del mes en ₡ (se reparte por igual entre las quincenas).
// Devuelve { half, usd, crc, fixedCRC, cajaCRC } por quincena (mensual: una sola fila,
// half 1), o [] si la persona no cobra en dólares o el TC no sirve.
export const transferToColones = (month, personId, cajaChica = 0) => {
  const rate = num(month?.exchangeRate?.venta);
  const inc = month?.incomes?.[personId] || {};
  const salaryUSD = num(inc.salaryUSD);
  if (!(salaryUSD > 0) || !(rate > 0)) return [];
  const quincenal = month?.frequency === "quincenal";
  const halves = quincenal ? [1, 2] : [1];
  const factor = 1 / halves.length;
  const crcFixed = (month?.fixedItems || []).filter((it) => it.currency !== "USD" && it.status !== "skipped" && it.status !== "deferred");
  // El salario en ₡ (si hay) ya cae en colones: cubre primero lo que se paga en ₡.
  const salaryCRC = num(inc.salaryCRC) * factor;

  return halves.map((half) => {
    const fixedCRC = Math.round(crcFixed.reduce((s, it) => s + num(it.paidAmount ?? it.amount) * shareIn(it, half, quincenal), 0));
    const cajaCRC = Math.round(num(cajaChica) * factor);
    const crc = Math.round(Math.min(salaryUSD * factor * rate, Math.max(0, fixedCRC + cajaCRC - salaryCRC)));
    return { half, crc, usd: Math.round((crc / rate) * 100) / 100, fixedCRC, cajaCRC };
  });
};
