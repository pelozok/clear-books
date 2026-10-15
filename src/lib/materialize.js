// Materializa el doc de un mes (SPEC §1 `months/{YYYY-MM}`) a partir del perfil,
// la plantilla de fijos, las reservas anuales y el mes anterior. Función pura:
// no toca Firestore ni lee la fecha del sistema (recibe `today`).
import { reserveBreakdown } from "./reserve.js";
import { deriveMonth } from "./derive.js";

const MESES_MIN = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const pad = (n) => String(n).padStart(2, "0");

// Helpers locales de mes (periods.js se extiende en paralelo; no dependemos de él).
const shiftMonth = (mKey, delta) => {
  const [y, m] = mKey.split("-").map(Number);
  const total = y * 12 + (m - 1) + delta;
  return `${Math.floor(total / 12)}-${pad((total % 12) + 1)}`;
};
const monthName = (mKey) => MESES_MIN[parseInt(mKey.slice(5, 7), 10) - 1];
const halfOf = (iso) => (parseInt(iso.slice(8, 10), 10) <= 15 ? 1 : 2);

// Quita un sufijo "(de septiembre)" previo para no encadenar al diferir dos veces.
const baseName = (name = "") => name.replace(/\s*\(de [a-záéíóú]+\)\s*$/i, "");

// Campos del plan de ahorro de una persona del perfil para un slot del mes.
export const savingsPlanOf = (p) => {
  const amt = Number(p?.savingsPerPeriod) || 0;
  return p?.savingsCurrency === "USD"
    ? { planned: 0, plannedAmount: amt, plannedCurrency: "USD" }
    : { planned: amt, plannedAmount: null, plannedCurrency: null };
};

// planned siempre en ₡; si el ahorro se define en $, plannedAmount/plannedCurrency lo guardan
// y deriveMonth recalcula planned con el TC del mes.
const savingsSlot = (planned, currency = "CRC") => ({
  planned: currency === "USD" ? 0 : planned, actual: null, at: null, note: null, ledgerId: null,
  ...(currency === "USD" ? { plannedAmount: planned, plannedCurrency: "USD" } : {}),
});

const incomesFrom = (people = []) => {
  const incomes = {};
  for (const p of people) {
    incomes[p.id] = { salaryCRC: Number(p.incomeCRC) || 0, salaryUSD: Number(p.incomeUSD) || 0 };
  }
  return incomes;
};

// Ahorro planificado por persona y quincena. En parcial desde la 2da quincena,
// la 1ra ya pasó fuera de la app: queda en 0 ("empezamos limpio").
const savingsFrom = (people = [], halves, skipQ1) => {
  const perPerson = {};
  for (const p of people) {
    const planned = Number(p.savingsPerPeriod) || 0;
    const cur = p.savingsCurrency === "USD" ? "USD" : "CRC";
    const slots = { q1: savingsSlot(skipQ1 ? 0 : planned, cur) };
    if (halves.includes(2)) slots.q2 = savingsSlot(planned, cur);
    perPerson[p.id] = slots;
  }
  return { perPerson };
};

// Fijos del mes desde la plantilla activa. Id estable: templateId + monthKey.
const fixedFromTemplate = (recurring = [], monthKey, skipHalf1) =>
  recurring
    .filter((r) => r && r.active !== false)
    .filter((r) => r.cuotasRestantes == null || r.cuotasRestantes > 0)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((r) => ({
      id: `${r.id}_${monthKey}`,
      templateId: r.id,
      fromMonth: null,
      name: r.name,
      amount: Number(r.amount) || 0,
      currency: r.currency || "CRC",
      half: r.half ?? 1,
      status: skipHalf1 && r.half === 1 ? "skipped" : "pending",
      paidAt: null,
      paidAmount: null,
      deferredTo: null,
      isDebt: !!r.isDebt,
      percent: Number(r.percent) > 0 ? Number(r.percent) : null,
    }));

// Fijos que el mes anterior dejó como 'deferred': entran con `fromMonth` y el
// nombre "Alquiler (de septiembre)". Id estable derivado del item original.
const deferredFrom = (previousMonth, prevKey, monthKey) =>
  (previousMonth?.fixedItems || [])
    .filter((it) => it.status === "deferred")
    .map((it) => ({
      id: `${it.id}__${monthKey}`,
      templateId: it.templateId ?? null,
      fromMonth: prevKey,
      name: `${baseName(it.name)} (de ${monthName(prevKey)})`,
      amount: Number(it.amount) || 0,
      currency: it.currency || "CRC",
      half: it.half ?? 1,
      status: "pending",
      paidAt: null,
      paidAmount: null,
      deferredTo: null,
      isDebt: !!it.isDebt,
    }));

export const materializeMonth = ({
  monthKey,
  profile,
  recurring = [],
  annual = [],
  ledger = [],
  rate,
  today,
  previousMonth = null,
  partial = false,
  startedAt = null,
}) => {
  const frequency = profile?.frequency === "quincenal" ? "quincenal" : "mensual";
  const halves = frequency === "quincenal" ? [1, 2] : [1];
  const people = profile?.people || [];

  // Parcial desde la 2da quincena: la 1ra quedó fuera de la app.
  const skipHalf1 = partial && frequency === "quincenal" && !!startedAt && halfOf(startedAt) === 2;

  const prevKey = previousMonth?.monthKey || previousMonth?.id || shiftMonth(monthKey, -1);
  const carryIn = previousMonth?.closing?.deficitResolution === "carry"
    ? Number(previousMonth?.carryover?.out) || 0
    : 0;

  const venta = Number(rate?.venta) || Number(profile?.exchangeRateDefault) || 0;
  const exchangeRate = {
    venta,
    compra: Number(rate?.compra) || venta,
    date: rate?.date || today,
  };

  const reserve = reserveBreakdown(annual, monthKey, ledger, venta);

  return deriveMonth({
    status: "open",
    partial: !!partial,
    startedAt: partial ? startedAt : null,
    frequency,
    splitRule: profile?.splitRule || "igual_sobrante",
    exchangeRate,
    incomes: incomesFrom(people),
    extras: [],
    savings: savingsFrom(people, halves, skipHalf1),
    fixedItems: [
      ...fixedFromTemplate(recurring, monthKey, skipHalf1),
      ...deferredFrom(previousMonth, prevKey, monthKey),
    ],
    annualReserve: { ...reserve, done: false, ledgerId: null },
    carryover: { in: carryIn, out: 0 },
    closing: null,
    createdAt: today,
    updatedAt: today,
  });
};
