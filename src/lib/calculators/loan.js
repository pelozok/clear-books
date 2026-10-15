// Préstamo con cuota francesa (cuota fija) y abonos extraordinarios.
// Tasas como fracción anual (0.095 = 9,5 %). Nada se redondea acá: la UI redondea al presentar.

const EPS = 1e-6;
// Tope de plazo (100 años): un typo como 9999999 meses no debe congelar la pantalla.
const MAX_MONTHS = 1200;

// Acepta números y strings numéricos (lo que llega de un input); lo demás es 0.
const num = (v) => {
  if (typeof v === "string" && v.trim() === "") return 0;
  const n = typeof v === "number" || typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 0;
};

// Cuota mensual: P·i / (1 − (1+i)^−n). Con i = 0 es P/n.
export function payment({ principal, annualRate, months }) {
  const P = num(principal);
  const n = Math.min(MAX_MONTHS, Math.floor(num(months)));
  if (P <= 0 || n <= 0) return 0;
  const i = num(annualRate) / 12;
  if (i <= 0) return P / n;
  return (P * i) / (1 - Math.pow(1 + i, -n));
}

// Corre la amortización mes a mes.
// mode 'plazo': la cuota se mantiene y el préstamo termina antes.
// mode 'cuota': tras cada abono se recalcula la cuota para el plazo restante.
function run({ principal, i, months, extraMonthly, extraOnce, mode }) {
  const rows = [];
  let balance = principal;
  let cuota = i > 0 ? (principal * i) / (1 - Math.pow(1 + i, -months)) : principal / months;
  let totalInterest = 0;
  let totalPaid = 0;

  for (let m = 1; m <= months && balance > EPS; m++) {
    const interest = balance * i;
    let regular = cuota - interest; // parte de la cuota que va a capital
    if (regular < 0) regular = 0;
    // Última cuota más pequeña; en el último mes del plazo se absorbe el residuo de punto flotante.
    if (regular > balance || m === months) regular = balance;
    let afterRegular = balance - regular;

    let extra = num(extraMonthly);
    if (extraOnce && Number(extraOnce.month) === m) extra += num(extraOnce.amount);
    if (extra < 0) extra = 0;
    if (extra > afterRegular) extra = afterRegular; // el abono no puede pasar el saldo

    balance = afterRegular - extra;
    if (balance < EPS) balance = 0;

    const paid = interest + regular;
    totalInterest += interest;
    totalPaid += paid + extra;
    rows.push({ month: m, payment: paid, interest, principal: regular, extra, balance });

    // En modo 'cuota' el plazo no cambia: se recalcula la cuota con el saldo nuevo.
    if (mode === "cuota" && extra > 0 && balance > 0) {
      const left = months - m;
      cuota = i > 0 ? (balance * i) / (1 - Math.pow(1 + i, -left)) : balance / left;
    }
  }
  return { rows, totalInterest, totalPaid, monthsActual: rows.length };
}

export function schedule({ principal, annualRate, months, extraMonthly = 0, extraOnce = null, mode = "plazo" }) {
  const P = num(principal);
  const n = Math.min(MAX_MONTHS, Math.floor(num(months)));
  const empty = { payment: 0, rows: [], totalInterest: 0, totalPaid: 0, monthsActual: 0, monthsSaved: 0, interestSaved: 0 };
  if (P <= 0 || n <= 0) return empty;
  const i = Math.max(0, num(annualRate) / 12);

  const base = run({ principal: P, i, months: n, extraMonthly: 0, extraOnce: null, mode: "plazo" });
  const hasExtras = num(extraMonthly) > 0 || (extraOnce && num(extraOnce.amount) > 0);
  const real = hasExtras ? run({ principal: P, i, months: n, extraMonthly, extraOnce, mode }) : base;

  return {
    payment: payment({ principal: P, annualRate, months: n }),
    rows: real.rows,
    totalInterest: real.totalInterest,
    totalPaid: real.totalPaid,
    monthsActual: real.monthsActual,
    monthsSaved: base.monthsActual - real.monthsActual,
    interestSaved: base.totalInterest - real.totalInterest,
  };
}
