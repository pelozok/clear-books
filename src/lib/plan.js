// Plan del mes: totales en CRC y "Te queda" por persona. Funciones puras.
// Todo monto se convierte con el TC del mes (month.exchangeRate.venta) salvo que
// se pase `rate` explícito (número o { venta }).
import { toCRC } from "./format.js";
import { halfOf } from "./periods.js";
import { splitByRule } from "./split.js";

const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : Number(v) || 0);
const rateOf = (month, rate) => rate ?? month?.exchangeRate?.venta ?? 0;
const crc = (amount, currency, rate) => toCRC(num(amount), currency, rate);
const halfKey = (h) => (h === 2 ? "q2" : "q1");

// Parte de un fijo que cae en las quincenas dadas. 'ambas' = amount/2 por quincena;
// en mensual el `half` se ignora (cuenta entero).
const fixedShare = (item, halves, frequency) => {
  if (frequency !== "quincenal") return 1;
  if (item.half === "ambas") return halves.filter((h) => h === 1 || h === 2).length / 2;
  return halves.includes(item.half === 2 ? 2 : 1) ? 1 : 0;
};

// Monto efectivo de un fijo según su estado (null = no suma).
const fixedEffective = (item) => {
  if (item.status === "paid") return item.paidAmount ?? item.amount;
  if (item.status === "pending" || item.status == null) return item.amount;
  return null; // skipped / deferred
};

// Una variable cuenta como "del ahorro" si se pagó del ahorro.
const isFromSavings = (e) => e?.source === "savings";
// Monto de un gasto variable en CRC con el TC del mes (si no trae amount, usa amountCRC).
const entryCRC = (e, rate) => (e?.amount == null ? num(e?.amountCRC) : crc(e.amount, e.currency, rate));

const sumBy = (list, fn) => list.reduce((s, x) => s + fn(x), 0);

// Totales del mes en CRC. `entries` (gastos variables) es opcional.
//   fixedPlanned = fixedPaid + fixedPending (lo comprometido; skipped y deferred no suman)
//   variable = gastos variables pagados de la cuenta; fromSavings = los pagados del
//   ahorro (variables con source 'savings' + extras de gasto con source 'ahorro').
export const monthTotals = (month, rate, entries = []) => {
  const r = rateOf(month, rate);
  const incomeByPerson = {};
  for (const [pid, inc] of Object.entries(month?.incomes || {})) {
    incomeByPerson[pid] = num(inc?.salaryCRC) + crc(inc?.salaryUSD, "USD", r);
  }

  const extras = month?.extras || [];
  const extrasIn = sumBy(extras.filter((x) => x.type === "ingreso"), (x) => crc(x.amount, x.currency, r));
  const gastosExtra = extras.filter((x) => x.type === "gasto");
  const extrasOut = sumBy(gastosExtra.filter((x) => x.source !== "ahorro"), (x) => crc(x.amount, x.currency, r));
  const extrasFromSavings = sumBy(gastosExtra.filter((x) => x.source === "ahorro"), (x) => crc(x.amount, x.currency, r));

  let fixedPaid = 0, fixedPending = 0, fixedSkipped = 0, fixedDeferred = 0;
  for (const it of month?.fixedItems || []) {
    if (it.status === "paid") fixedPaid += crc(it.paidAmount ?? it.amount, it.currency, r);
    else if (it.status === "skipped") fixedSkipped += crc(it.amount, it.currency, r);
    else if (it.status === "deferred") fixedDeferred += crc(it.amount, it.currency, r);
    else fixedPending += crc(it.amount, it.currency, r);
  }

  const list = entries || [];
  const variable = sumBy(list.filter((e) => !isFromSavings(e)), (e) => entryCRC(e, r));
  const fromSavings = sumBy(list.filter(isFromSavings), (e) => entryCRC(e, r)) + extrasFromSavings;

  let savingsPlanned = 0, savingsActual = 0;
  for (const halves of Object.values(month?.savings?.perPerson || {})) {
    for (const row of Object.values(halves || {})) {
      savingsPlanned += num(row?.planned);
      if (row?.actual != null) savingsActual += num(row.actual);
    }
  }

  return {
    incomeByPerson,
    extrasIn,
    extrasOut,
    fixedPlanned: fixedPaid + fixedPending,
    fixedPaid,
    fixedPending,
    fixedSkipped,
    fixedDeferred,
    variable,
    fromSavings,
    savingsPlanned,
    savingsActual,
    reserveQuota: num(month?.annualReserve?.quota),
    carryIn: num(month?.carryover?.in),
  };
};

// Quincenas que cuentan. Normal: todas. Parcial quincenal: desde la quincena de
// startedAt (la anterior quedó fuera de la app). Parcial mensual: el mes entero
// (el salario mensual ya cubre lo marcado como pagado; solo se recortan variables).
const activeHalves = (month, frequency) => {
  const all = frequency === "quincenal" ? [1, 2] : [1];
  if (!month?.partial || !month?.startedAt || frequency !== "quincenal") return all;
  return all.filter((h) => h >= halfOf(month.startedAt));
};

// Ahorro por persona en las quincenas activas: lo planeado y lo efectivo
// (actual si ya se confirmó, si no planned).
const savingsByPerson = (month, halves) => {
  const out = {};
  for (const [pid, rows] of Object.entries(month?.savings?.perPerson || {})) {
    let planned = 0, effective = 0;
    for (const h of halves) {
      const row = rows?.[halfKey(h)];
      if (!row) continue;
      planned += num(row.planned);
      effective += row.actual == null ? num(row.planned) : num(row.actual);
    }
    out[pid] = { planned, effective };
  }
  return out;
};

// Te queda ₡X este mes, por persona.
//   comprometido (G) = fijos (paid + pending de las quincenas activas) + variables
//     de la cuenta (en parcial, desde startedAt) + extras de gasto del hogar
//     + carryover.in + annualReserve.quota
//   ahorro (S) = Σ planned de las quincenas activas
//   ingreso del reparto = salario de las quincenas activas + extras de ingreso inSplit
//     (o sin persona: se reparten 50/50 al ingreso de cada uno)
// En pareja se reparte con month.splitRule (split.js). Después, a cada persona:
//   + extras de ingreso suyos que NO entran al reparto
//   − extras de gasto suyos que NO entran al reparto
//   + (planned − efectivo) de su ahorro: si apartó menos, le queda más a esa persona.
// Extras de gasto con source 'ahorro' no tocan la cuenta (van a fromSavings).
// En 'solo' no hay reparto: libre = ingreso − G − S de la única persona.
export const teQueda = ({ month, profile, entries = [], rate, today = null }) => {
  const r = rateOf(month, rate);
  const frequency = month?.frequency || profile?.frequency || "mensual";
  const halves = activeHalves(month, frequency);
  const isPartial = !!month?.partial;
  const since = isPartial ? month?.startedAt ?? null : null;
  const people = (profile?.people || []).slice(0, profile?.mode === "pareja" ? 2 : 1);
  const ids = people.map((p) => p.id);
  const halfFactor = frequency === "quincenal" ? halves.length / 2 : 1;

  // Ingreso de salario de las quincenas activas.
  const salary = {};
  for (const id of ids) {
    const inc = month?.incomes?.[id] || {};
    salary[id] = (num(inc.salaryCRC) + crc(inc.salaryUSD, "USD", r)) * halfFactor;
  }

  // Extras: al reparto o a la persona.
  const splitIncome = { ...salary };
  const ownIn = Object.fromEntries(ids.map((id) => [id, 0]));
  const ownOut = Object.fromEntries(ids.map((id) => [id, 0]));
  let householdOut = 0;
  for (const x of month?.extras || []) {
    const amt = crc(x.amount, x.currency, r);
    const mine = ids.includes(x.personId) ? x.personId : null;
    if (x.type === "ingreso") {
      if (mine && !x.inSplit) ownIn[mine] += amt;
      else if (mine) splitIncome[mine] += amt;
      else ids.forEach((id) => { splitIncome[id] += amt / ids.length; });
    } else if (x.type === "gasto" && x.source !== "ahorro") {
      if (mine && !x.inSplit) ownOut[mine] += amt;
      else householdOut += amt;
    }
  }

  // Fijos de las quincenas activas.
  const fixed = sumBy(month?.fixedItems || [], (it) => {
    const eff = fixedEffective(it);
    if (eff == null) return 0;
    return crc(eff, it.currency, r) * fixedShare(it, halves, frequency);
  });

  // Variables pagadas de la cuenta (en parcial, solo desde startedAt).
  const variable = sumBy(
    (entries || []).filter((e) => !isFromSavings(e) && (!since || !e?.date || e.date >= since)),
    (e) => entryCRC(e, r),
  );

  const gastos = fixed + variable + householdOut + num(month?.carryover?.in) + num(month?.annualReserve?.quota);
  const sav = savingsByPerson(month, halves);
  const ahorro = sumBy(ids, (id) => sav[id]?.planned || 0);
  const savingsDelta = (id) => (sav[id]?.planned || 0) - (sav[id]?.effective || 0);

  let rows;
  if (ids.length === 2) {
    const res = splitByRule(month?.splitRule || profile?.splitRule || "igual_sobrante", {
      income1: splitIncome[ids[0]], income2: splitIncome[ids[1]], gastos, ahorro,
    });
    rows = ids.map((id, i) => {
      const k = i === 0 ? "p1" : "p2";
      return {
        personId: id,
        libre: res.restante[k] + ownIn[id] - ownOut[id] + savingsDelta(id),
        aporte: res.aporte[k],
        ahorro: res.ahorro[k],
        share: res.share[k],
      };
    });
  } else if (ids.length === 1) {
    const id = ids[0];
    rows = [{
      personId: id,
      libre: splitIncome[id] + ownIn[id] - ownOut[id] - gastos - ahorro + savingsDelta(id),
      aporte: gastos,
      ahorro,
      share: 1,
    }];
  } else {
    rows = [];
  }

  // "≈ por quincena": quincenal reparte entre las quincenas que faltan; mensual /2.
  const perHalf = frequency === "quincenal" ? Math.max(1, halves.length) : 2;
  const perPerson = rows.map((row) => ({ ...row, porQuincena: row.libre / perHalf }));
  const total = sumBy(perPerson, (p) => p.libre);
  return {
    perPerson,
    total,
    deficit: Math.max(0, -total),
    gastos,
    ahorro,
    isPartial,
    since,
    today,
  };
};
