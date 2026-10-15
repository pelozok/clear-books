import { describe, it, expect } from "vitest";
import { repartoPareja, repartoProporcional, splitByRule, explainSplit, SPLIT_RULES } from "./split.js";

// Cifras de prueba: ingresos ₡1.000.000 / ₡600.000, fijos ₡930.000,
// ahorro ₡50.000 por quincena por persona → ₡200.000 al mes entre los dos.
const BASE = { income1: 1000000, income2: 600000, gastos: 930000, ahorro: 200000 };
const people = [
  { id: "p1", name: "Kevin", incomeCRC: 1000000 },
  { id: "p2", name: "Ana", incomeCRC: 600000 },
];

describe("repartoPareja (movida desde calc.js, contrato intacto)", () => {
  it("deja a ambos con el mismo restante y los aportes suman los gastos", () => {
    const r = repartoPareja(BASE);
    expect(r).toEqual({ restante: 235000, ahorroCada: 100000, aporte1: 665000, aporte2: 265000, deficit: false, desbalance: false });
    expect(r.aporte1 + r.aporte2).toBe(930000);
    expect(1000000 - r.ahorroCada - r.aporte1).toBe(600000 - r.ahorroCada - r.aporte2);
  });

  it("marca déficit cuando gastos + ahorro superan los ingresos", () => {
    const r = repartoPareja({ ...BASE, gastos: 1500000 });
    expect(r.restante).toBe(-50000);
    expect(r.deficit).toBe(true);
    expect(r.desbalance).toBe(false);
    expect(r.aporte1 + r.aporte2).toBe(1500000);
  });

  it("clampa a 0 cuando un salario no alcanza y el otro cubre todo", () => {
    const r = repartoPareja({ income1: 1000000, income2: 50000, gastos: 500000, ahorro: 200000 });
    expect(r.desbalance).toBe(true);
    expect(r.aporte2).toBe(0);
    expect(r.aporte1).toBe(500000);
  });

});

describe("repartoProporcional", () => {
  it("cada uno pone (G + S) · I_i / (I1 + I2), ahorro incluido", () => {
    const r = repartoProporcional(BASE);
    expect(r.share1).toBe(0.625);
    expect(r.share2).toBe(0.375);
    expect(r.aporte1).toBeCloseTo(1130000 * 0.625);
    expect(r.aporte2).toBeCloseTo(1130000 * 0.375);
    expect(r.aporte1 + r.aporte2).toBeCloseTo(1130000);
    expect(r.ahorro1).toBeCloseTo(125000);
    expect(r.ahorro2).toBeCloseTo(75000);
    expect(r.gastos1 + r.gastos2).toBeCloseTo(930000);
    expect(r.restante1).toBeCloseTo(293750);
    expect(r.restante2).toBeCloseTo(176250);
    expect(r.ahorroCada).toBe(100000);
    expect(r.deficit).toBe(false);
    expect(r.desbalance).toBe(false);
  });

  it("a los dos les queda el mismo % de su salario", () => {
    const r = repartoProporcional(BASE);
    expect(r.restante1 / 1000000).toBeCloseTo(r.restante2 / 600000);
  });

  it("déficit cuando no alcanza (los dos quedan negativos)", () => {
    const r = repartoProporcional({ ...BASE, gastos: 1500000 });
    expect(r.deficit).toBe(true);
    expect(r.restante1).toBeLessThan(0);
    expect(r.restante2).toBeLessThan(0);
  });

  it("sin ingresos reparte 50/50 sin NaN", () => {
    const r = repartoProporcional({ income1: 0, income2: 0, gastos: 100000, ahorro: 0 });
    expect(r.share1).toBe(0.5);
    expect(r.aporte1).toBe(50000);
    expect(Number.isNaN(r.restante1)).toBe(false);
  });
});

describe("splitByRule", () => {
  it("expone las dos reglas", () => {
    expect(SPLIT_RULES).toEqual(["igual_sobrante", "proporcional"]);
  });

  it("igual_sobrante: forma unificada", () => {
    const r = splitByRule("igual_sobrante", BASE);
    expect(r.aporte).toEqual({ p1: 665000, p2: 265000 });
    expect(r.restante).toEqual({ p1: 235000, p2: 235000 });
    expect(r.ahorro).toEqual({ p1: 100000, p2: 100000 });
    expect(r.share).toEqual({ p1: 0.625, p2: 0.375 });
    expect(r.deficit).toBe(false);
    expect(r.desbalance).toBe(false);
  });

  it("null o undefined cae en igual_sobrante", () => {
    expect(splitByRule(null, BASE).restante.p1).toBe(235000);
    expect(splitByRule(undefined, BASE).rule).toBe("igual_sobrante");
  });

  it("igual_sobrante con desbalance: restante real de cada uno", () => {
    const r = splitByRule("igual_sobrante", { income1: 1000000, income2: 50000, gastos: 500000, ahorro: 200000 });
    expect(r.desbalance).toBe(true);
    expect(r.aporte).toEqual({ p1: 500000, p2: 0 });
    expect(r.restante).toEqual({ p1: 400000, p2: -50000 });
  });

  it("proporcional: aporte es solo la parte de gastos, ahorro aparte", () => {
    const r = splitByRule("proporcional", BASE);
    expect(r.aporte.p1).toBeCloseTo(581250);
    expect(r.aporte.p2).toBeCloseTo(348750);
    expect(r.aporte.p1 + r.aporte.p2).toBeCloseTo(930000);
    expect(r.ahorro.p1 + r.ahorro.p2).toBeCloseTo(200000);
    expect(r.restante.p1).toBeCloseTo(293750);
  });

  it("en ambas reglas I_i = aporte + ahorro + restante", () => {
    for (const rule of SPLIT_RULES) {
      const r = splitByRule(rule, BASE);
      expect(r.aporte.p1 + r.ahorro.p1 + r.restante.p1).toBeCloseTo(1000000);
      expect(r.aporte.p2 + r.ahorro.p2 + r.restante.p2).toBeCloseTo(600000);
    }
  });

  it("regla desconocida tira error", () => {
    expect(() => splitByRule("mitad", BASE)).toThrow(/desconocida/);
  });
});

describe("explainSplit", () => {
  it("frase en español con montos es-CR (igual_sobrante)", () => {
    const result = splitByRule("igual_sobrante", BASE);
    const e = explainSplit({ rule: "igual_sobrante", people, result });
    expect(e.sentences[0]).toBe(
      "Kevin gana el 62% del ingreso, pone ₡665.000 al hogar (₡332.500 por quincena), aparta ₡100.000 y le quedan ₡235.000",
    );
    expect(e.sentences[1]).toBe(
      "Ana gana el 38% del ingreso, pone ₡265.000 al hogar (₡132.500 por quincena), aparta ₡100.000 y le quedan ₡235.000",
    );
    expect(e.sentence.startsWith(e.sentences[0])).toBe(true);
    expect(e.equation).toContain("restante = (₡1.000.000 + ₡600.000 − ₡930.000 − ₡200.000) / 2 = ₡235.000");
    expect(e.sentence).not.toContain("—");
  });

  it("mensual no menciona quincenas", () => {
    const result = splitByRule("igual_sobrante", BASE);
    const e = explainSplit({ rule: "igual_sobrante", people, result, frequency: "mensual" });
    expect(e.sentence).not.toContain("quincena");
  });

  it("proporcional: ecuación con porcentajes y aporte total", () => {
    const result = splitByRule("proporcional", BASE);
    const e = explainSplit({ rule: "proporcional", people, result });
    expect(e.sentences[0]).toContain("pone ₡581.250 al hogar");
    expect(e.sentences[0]).toContain("aparta ₡125.000");
    expect(e.equation).toContain("aporte Kevin = (₡930.000 + ₡200.000) × 62% = ₡706.250");
  });

  it("déficit: le faltan y nota sin culpa", () => {
    const result = splitByRule("igual_sobrante", { ...BASE, gastos: 1500000 });
    const e = explainSplit({ rule: "igual_sobrante", people, result });
    expect(e.sentences[0]).toContain("le faltan ₡50.000");
    expect(e.notes.at(-1)).toBe("Entre los dos faltan ₡100.000. Pasa. Ajustemos");
  });

  it("desbalance: explica quién cubre", () => {
    const result = splitByRule("igual_sobrante", { income1: 1000000, income2: 50000, gastos: 500000, ahorro: 200000 });
    const e = explainSplit({ rule: "igual_sobrante", people, result });
    expect(e.notes[0]).toBe("El salario de Ana no alcanza para su parte, así que Kevin cubre todo el gasto del hogar");
  });

  it("sin nombres usa Persona 1 / Persona 2", () => {
    const result = splitByRule("igual_sobrante", BASE);
    expect(explainSplit({ rule: "igual_sobrante", people: [], result }).sentence).toContain("Persona 1");
  });
});
