// Conversión ₡/$ con TC del BCCR (venta y compra) y costo real de pagar en dólares con tarjeta.
// Tipos de cambio en colones por dólar. Nada se redondea acá.

// Acepta números y strings numéricos (lo que llega de un input); lo demás es 0.
const num = (v) => {
  if (typeof v === "string" && v.trim() === "") return 0;
  const n = typeof v === "number" || typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 0;
};

const cur = (c) => String(c ?? "").trim().toUpperCase();

// side: qué ventanilla usa el banco. Sin side, sale de la dirección:
// CRC → USD = comprás dólares (venta); USD → CRC = vendés dólares (compra).
// side 'venta' | 'compra' fuerza un TC (p. ej. 'venta' para seguir la regla del mes).
export function convert({ amount, from, to, venta, compra, side }) {
  const a = num(amount);
  const f = cur(from);
  const t = cur(to);
  if (f === t && (f === "CRC" || f === "USD")) return a;
  const v = num(venta);
  const c = num(compra) > 0 ? num(compra) : v; // sin compra, se usa venta
  const s = side === "venta" || side === "compra" ? side : f === "USD" ? "compra" : "venta";
  const rate = s === "compra" ? c : v;
  if (rate <= 0) return 0;
  if (f === "USD" && t === "CRC") return a * rate;
  if (f === "CRC" && t === "USD") return a / rate;
  return 0; // moneda desconocida: no inventar un monto
}

// Costo en colones de un cobro en dólares con tarjeta.
// spread: % que el banco carga sobre el TC venta del BCCR. feePct: comisión extra en %.
export function cardCost({ usd, venta, spread = 2, feePct = 0 }) {
  const u = Math.max(0, num(usd));
  const v = num(venta);
  // El banco no da descuento: spread y comisión negativos cuentan como 0.
  const tcBanco = v * (1 + Math.max(0, num(spread)) / 100);
  const bccrCRC = u * v;
  const costCRC = u * tcBanco * (1 + Math.max(0, num(feePct)) / 100);
  const vsBCCR = costCRC - bccrCRC;
  const pct = bccrCRC > 0 ? (vsBCCR / bccrCRC) * 100 : 0;
  return { tcBanco, costCRC, bccrCRC, vsBCCR, pct };
}
