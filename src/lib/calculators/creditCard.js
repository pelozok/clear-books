// Tarjeta de crédito: cuánto tarda y cuánto cuesta salir del saldo pagando el mínimo o un monto fijo.
// Interés mensual = saldo × tasa/12. Mínimo = interés + max(saldo × minPct, minFloor).
// Nada se redondea acá; la UI redondea al presentar.

// Acepta números y strings numéricos (lo que llega de un input); lo demás es 0.
const num = (v) => {
  if (typeof v === "string" && v.trim() === "") return 0;
  const n = typeof v === "number" || typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 0;
};
// Un saldo menor a medio colón (o medio dólar) se da por cancelado.
const DONE = 0.5;

// Campo vacío ("", NaN, null) = no hay escenario fijo; 0 o negativo sí es un escenario (nunca termina).
const hasFixedInput = (v) =>
  v != null && !(typeof v === "string" && v.trim() === "") && (typeof v === "number" || typeof v === "string")
  && Number.isFinite(Number(v));

function simulate({ balance, monthlyRate, maxMonths, paymentFor }) {
  let bal = balance;
  let months = 0;
  let totalPaid = 0;
  // bal > 0: un saldo inicial ≤ DONE igual se paga (un mes), nunca da interés negativo.
  while (bal > 0 && months < maxMonths) {
    const interest = bal * monthlyRate;
    const due = bal + interest;
    let pay = Math.min(paymentFor(bal, interest), due);
    if (pay <= interest) {
      // El pago no baja el saldo: nunca termina.
      return { months: null, totalPaid: null, interest: null, neverEnds: true };
    }
    if (due - pay <= DONE) pay = due; // el residuo se absorbe en el último pago
    bal = due - pay;
    totalPaid += pay;
    months++;
  }
  if (bal > 0) return { months: null, totalPaid: null, interest: null, neverEnds: true };
  return { months, totalPaid, interest: totalPaid - balance, neverEnds: false };
}

export function payoff({ balance, annualRate, minPct = 0.03, minFloor = 0, fixedPayment = null, maxMonths = 600 }) {
  const B = Math.max(0, num(balance));
  const r = Math.max(0, num(annualRate)) / 12;
  const firstInterest = B * r; // lo que hay que superar para que el saldo baje
  const cap = num(maxMonths) > 0 ? Math.min(Math.floor(num(maxMonths)), 1200) : 600;
  const zero = { months: 0, totalPaid: 0, interest: 0, neverEnds: false };

  if (B <= 0) return { minimum: zero, fixed: hasFixedInput(fixedPayment) ? zero : null, firstInterest, neverEnds: false };

  const minimum = simulate({
    balance: B,
    monthlyRate: r,
    maxMonths: cap,
    paymentFor: (bal, interest) => interest + Math.max(bal * Math.max(0, num(minPct)), num(minFloor)),
  });

  const hasFixed = hasFixedInput(fixedPayment);
  let fixed = null;
  if (hasFixed) {
    const F = num(fixedPayment);
    fixed = F <= firstInterest
      ? { months: null, totalPaid: null, interest: null, neverEnds: true }
      : simulate({ balance: B, monthlyRate: r, maxMonths: cap, paymentFor: () => F });
  }

  // neverEnds de la raíz: el escenario que se está mirando (el fijo si hay; si no, el mínimo).
  return { minimum, fixed, firstInterest, neverEnds: fixed ? fixed.neverEnds : minimum.neverEnds };
}
