// Reparto en pareja: cómo se reparten los gastos del hogar y el ahorro entre dos
// salarios. Funciones puras; todo en CRC. Claves 'p1' / 'p2' son posicionales
// (persona 1 = people[0], persona 2 = people[1]).
import { fmt } from "./format.js";

export const SPLIT_RULES = ["igual_sobrante", "proporcional"];

// Regla "a los dos les queda lo mismo" (la del machote). Movida intacta desde calc.js.
// Después de aportar a gastos del hogar y ahorro (50/50), a ambos les queda lo mismo.
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

// Participación de cada ingreso en el total (I_i / (I1 + I2)). Sin ingresos: 50/50.
const incomeShares = (income1, income2) => {
  const total = income1 + income2;
  if (!(total > 0)) return { share1: 0.5, share2: 0.5 };
  return { share1: income1 / total, share2: income2 / total };
};

// Regla "mismo % del salario". Cada uno pone al hogar (G + S) · I_i / (I1 + I2):
// en este modo el AHORRO también va proporcional al ingreso (no 50/50), así a los
// dos les queda el mismo % de su salario.
//   aporte_i   = (G + S) · share_i     (todo lo que pone, gastos + ahorro)
//   gastos_i   = G · share_i           (desglose: parte de gastos del hogar)
//   ahorro_i   = S · share_i           (desglose: parte del ahorro)
//   restante_i = I_i − aporte_i
// ahorroCada = S/2 queda solo por compatibilidad de forma con repartoPareja; lo que
// aparta cada uno en este modo es ahorro1 / ahorro2.
export const repartoProporcional = ({ income1, income2, gastos, ahorro }) => {
  const { share1, share2 } = incomeShares(income1, income2);
  const gastos1 = gastos * share1;
  const gastos2 = gastos * share2;
  const ahorro1 = ahorro * share1;
  const ahorro2 = ahorro * share2;
  const aporte1 = gastos1 + ahorro1;
  const aporte2 = gastos2 + ahorro2;
  const restante1 = income1 - aporte1;
  const restante2 = income2 - aporte2;
  return {
    restante1,
    restante2,
    ahorroCada: ahorro / 2,
    aporte1,
    aporte2,
    gastos1,
    gastos2,
    ahorro1,
    ahorro2,
    deficit: restante1 < 0 || restante2 < 0,
    // Nadie se clampa: cada uno pone su %; si no alcanza es déficit de los dos.
    desbalance: false,
    share1,
    share2,
  };
};

// Forma unificada para la UI y para plan.js, sin importar la regla:
//   aporte  = lo que pone a GASTOS del hogar (sin ahorro; Σ aporte = G)
//   ahorro  = lo que aparta (Σ ahorro = S); restante = lo que le queda
//   share   = participación en el ingreso (I_i / (I1 + I2)) en ambas reglas.
// Ojo: en repartoProporcional aporte_i incluye el ahorro; acá va separado.
export const splitByRule = (rule, args) => {
  const { income1, income2, gastos, ahorro } = args;
  if (rule === "proporcional") {
    const r = repartoProporcional(args);
    return {
      rule,
      aporte: { p1: r.gastos1, p2: r.gastos2 },
      restante: { p1: r.restante1, p2: r.restante2 },
      ahorro: { p1: r.ahorro1, p2: r.ahorro2 },
      share: { p1: r.share1, p2: r.share2 },
      deficit: r.deficit,
      desbalance: r.desbalance,
      gastos,
      ahorroTotal: ahorro,
    };
  }
  if (rule !== "igual_sobrante" && rule != null) {
    throw new Error(`Regla de reparto desconocida: ${rule}`);
  }
  const r = repartoPareja(args);
  const { share1, share2 } = incomeShares(income1, income2);
  // Con desbalance el restante ya no es igual: se calcula lo que de verdad le queda a cada uno.
  const restante1 = r.desbalance ? income1 - r.aporte1 - r.ahorroCada : r.restante;
  const restante2 = r.desbalance ? income2 - r.aporte2 - r.ahorroCada : r.restante;
  return {
    rule: "igual_sobrante",
    aporte: { p1: r.aporte1, p2: r.aporte2 },
    restante: { p1: restante1, p2: restante2 },
    ahorro: { p1: r.ahorroCada, p2: r.ahorroCada },
    share: { p1: share1, p2: share2 },
    deficit: r.deficit,
    desbalance: r.desbalance,
    gastos,
    ahorroTotal: ahorro,
  };
};

// Porcentaje entero con redondeo al par (62,5% → 62%, 37,5% → 38%): así los dos
// porcentajes suman 100 en los empates.
const roundHalfEven = (x) => {
  const f = Math.floor(x);
  const d = x - f;
  if (Math.abs(d - 0.5) < 1e-9) return f % 2 === 0 ? f : f + 1;
  return Math.round(x);
};
const pct = (x) => `${roundHalfEven((Number(x) || 0) * 100)}%`;

const personSentence = (name, key, result, frequency) => {
  const aporte = result.aporte[key];
  const porQ = frequency === "quincenal" ? ` (${fmt(aporte / 2)} por quincena)` : "";
  const restante = result.restante[key];
  const queda = restante < 0 ? `le faltan ${fmt(-restante)}` : `le quedan ${fmt(restante)}`;
  return `${name} gana el ${pct(result.share[key])} del ingreso, pone ${fmt(aporte)} al hogar${porQ}, aparta ${fmt(result.ahorro[key])} y ${queda}`;
};

// Explica el reparto en una frase por persona (español de CR, montos con fmt) y
// la ecuación en un string aparte para un expandible.
// people: [{ id, name, incomeCRC }] en el mismo orden posicional que p1 / p2.
// result: lo que devuelve splitByRule. frequency: 'quincenal' (default) | 'mensual'.
export const explainSplit = ({ rule, people, result, frequency = "quincenal" }) => {
  const [a = {}, b = {}] = people || [];
  const n1 = a.name || "Persona 1";
  const n2 = b.name || "Persona 2";
  const I1 = Number(a.incomeCRC) || 0;
  const I2 = Number(b.incomeCRC) || 0;
  const G = result.aporte.p1 + result.aporte.p2;
  const S = result.ahorro.p1 + result.ahorro.p2;

  const sentences = [personSentence(n1, "p1", result, frequency), personSentence(n2, "p2", result, frequency)];
  const notes = [];
  if (result.desbalance) {
    const corto = result.aporte.p1 === 0 ? n1 : n2;
    const cubre = corto === n1 ? n2 : n1;
    notes.push(`El salario de ${corto} no alcanza para su parte, así que ${cubre} cubre todo el gasto del hogar`);
  }
  if (result.deficit) {
    const falta = Math.max(0, -(result.restante.p1 + result.restante.p2));
    notes.push(`Entre los dos faltan ${fmt(falta)}. Pasa. Ajustemos`);
  }

  let equation;
  if (rule === "proporcional") {
    equation = [
      `% ${n1} = ${fmt(I1)} / ${fmt(I1 + I2)} = ${pct(result.share.p1)}`,
      `% ${n2} = ${fmt(I2)} / ${fmt(I1 + I2)} = ${pct(result.share.p2)}`,
      `aporte ${n1} = (${fmt(G)} + ${fmt(S)}) × ${pct(result.share.p1)} = ${fmt(result.aporte.p1 + result.ahorro.p1)}`,
      `aporte ${n2} = (${fmt(G)} + ${fmt(S)}) × ${pct(result.share.p2)} = ${fmt(result.aporte.p2 + result.ahorro.p2)}`,
      `le queda a ${n1} = ${fmt(I1)} − ${fmt(result.aporte.p1 + result.ahorro.p1)} = ${fmt(result.restante.p1)}`,
      `le queda a ${n2} = ${fmt(I2)} − ${fmt(result.aporte.p2 + result.ahorro.p2)} = ${fmt(result.restante.p2)}`,
    ].join("\n");
  } else {
    const restante = (I1 + I2 - G - S) / 2;
    equation = [
      `restante = (${fmt(I1)} + ${fmt(I2)} − ${fmt(G)} − ${fmt(S)}) / 2 = ${fmt(restante)}`,
      `aporte ${n1} = ${fmt(I1)} − ${fmt(result.ahorro.p1)} − ${fmt(restante)} = ${fmt(result.aporte.p1)}`,
      `aporte ${n2} = ${fmt(I2)} − ${fmt(result.ahorro.p2)} − ${fmt(restante)} = ${fmt(result.aporte.p2)}`,
    ].join("\n");
  }

  return {
    sentence: [...sentences, ...notes].join(". "),
    sentences,
    notes,
    equation,
  };
};
