import { toCRC } from "./format.js";

// Suma en CRC una lista de items { amount, currency }.
export const sumCRC = (items, rate) =>
  items.reduce((s, it) => s + toCRC(Number(it.amount) || 0, it.currency, rate), 0);

// Ingreso de una persona { incomeCRC, incomeUSD } en CRC.
export const personIncomeCRC = (p, rate) =>
  (Number(p?.incomeCRC) || 0) + (Number(p?.incomeUSD) || 0) * rate;

// Gasto variable total por categoría, en CRC (los fijos no llevan categoría).
export const totalsByCategory = (expenses, rate) => {
  const by = {};
  for (const it of expenses) {
    const cat = it.categoryId || "otros";
    by[cat] = (by[cat] || 0) + toCRC(Number(it.amount) || 0, it.currency, rate);
  }
  return by;
};

// Resumen del machote (modo individual y totales de pareja):
//   sobrante  = ingresos − gastos          ("Sobrante de dinero")
//   final     = sobrante − ahorro          ("Terminamos el período con:")
export const summary = ({ income, fixed, variable, savings }) => {
  const gastos = fixed + variable;
  const sobrante = income - gastos;
  return { gastos, sobrante, final: sobrante - savings };
};

// Reparto proporcional del machote (modo pareja):
// después de aportar a gastos del hogar y ahorro (50/50), a ambos les queda lo mismo.
//   restante  = (I1 + I2 − G − S) / 2
//   aporte_i  = I_i − S/2 − restante       (invariante: aporte1 + aporte2 = G)
export const repartoPareja = ({ income1, income2, gastos, ahorro }) => {
  const restante = (income1 + income2 - gastos - ahorro) / 2;
  const ahorroCada = ahorro / 2;
  const raw1 = income1 - ahorroCada - restante;
  const raw2 = income2 - ahorroCada - restante;
  // Si un salario no alcanza para su parte, aporta 0 y el otro cubre el resto.
  const desbalance = raw1 < 0 || raw2 < 0;
  const aporte1 = desbalance ? (raw1 < 0 ? 0 : gastos) : raw1;
  const aporte2 = desbalance ? (raw2 < 0 ? 0 : gastos) : raw2;
  return {
    restante,
    ahorroCada,
    aporte1,
    aporte2,
    deficit: restante < 0,
    desbalance,
  };
};
