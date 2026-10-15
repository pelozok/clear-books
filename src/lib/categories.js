// Gasto por categoría (₡, con amountCRC guardado al anotar). Funciones puras.
const num = (v) => Number(v) || 0;
const idOf = (e) => e?.categoryId || "otros";

// { [categoryId]: totalCRC }
export const totalsByCategory = (entries = []) => {
  const out = {};
  for (const e of entries) out[idOf(e)] = (out[idOf(e)] || 0) + num(e.amountCRC);
  return out;
};

// Filas ordenadas de mayor a menor: { id, total, share, prev, delta }.
// `prev` = totales del mes anterior (o null si no hay con qué comparar).
export const categoryBreakdown = (entries = [], prev = null) => {
  const cur = totalsByCategory(entries);
  const sum = Object.values(cur).reduce((s, v) => s + v, 0);
  return Object.entries(cur)
    .filter(([, total]) => total > 0)
    .map(([id, total]) => ({
      id,
      total,
      share: sum > 0 ? total / sum : 0,
      prev: prev ? num(prev[id]) : null,
      delta: prev ? total - num(prev[id]) : null,
    }))
    .sort((a, b) => b.total - a.total);
};

// Tabla del historial: categorías (filas, de mayor a menor gasto acumulado) × meses
// (columnas, del más viejo al más nuevo). months = [{ id, byCategory }].
export const categoryTable = (months = []) => {
  const cols = months.filter((m) => m?.byCategory).slice().sort((a, b) => a.id.localeCompare(b.id));
  const sums = {};
  for (const m of cols) for (const [id, v] of Object.entries(m.byCategory)) sums[id] = (sums[id] || 0) + num(v);
  const rows = Object.keys(sums)
    .filter((id) => sums[id] > 0)
    .sort((a, b) => sums[b] - sums[a])
    .map((id) => ({ id, values: cols.map((m) => num(m.byCategory[id])), avg: sums[id] / cols.length }));
  const totals = cols.map((m) => Object.values(m.byCategory).reduce((s, v) => s + num(v), 0));
  return { months: cols.map((m) => m.id), rows, totals };
};
