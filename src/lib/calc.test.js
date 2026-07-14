import { describe, it, expect } from "vitest";
import { sumCRC, personIncomeCRC, totalsByCategory, summary, repartoPareja } from "./calc.js";

describe("sumCRC", () => {
  it("suma CRC y convierte USD con el tipo de cambio", () => {
    const items = [
      { amount: 100000, currency: "CRC" },
      { amount: 100, currency: "USD" },
    ];
    expect(sumCRC(items, 500)).toBe(150000);
  });

  it("tolera montos vacíos o inválidos", () => {
    expect(sumCRC([{ amount: "", currency: "CRC" }, { amount: null, currency: "USD" }], 500)).toBe(0);
  });
});

describe("personIncomeCRC", () => {
  it("combina ingreso CRC y USD", () => {
    expect(personIncomeCRC({ incomeCRC: 500000, incomeUSD: 1000 }, 515)).toBe(1015000);
  });
  it("tolera persona vacía", () => {
    expect(personIncomeCRC(null, 515)).toBe(0);
  });
});

describe("totalsByCategory", () => {
  it("agrupa fijos y variables por categoría en CRC", () => {
    const fixed = [{ amount: 300000, currency: "CRC", categoryId: "vivienda" }];
    const variable = [
      { amount: 20000, currency: "CRC", categoryId: "vivienda" },
      { amount: 10, currency: "USD", categoryId: "salud" },
    ];
    expect(totalsByCategory(fixed, variable, 500)).toEqual({ vivienda: 320000, salud: 5000 });
  });
});

describe("summary", () => {
  it("calcula sobrante y final del machote", () => {
    const s = summary({ income: 1000000, fixed: 600000, variable: 150000, savings: 100000 });
    expect(s.gastos).toBe(750000);
    expect(s.sobrante).toBe(250000);
    expect(s.final).toBe(150000);
  });
});

describe("repartoPareja", () => {
  it("deja a ambos con el mismo restante y los aportes suman los gastos", () => {
    const r = repartoPareja({ income1: 800000, income2: 600000, gastos: 700000, ahorro: 200000 });
    expect(r.restante).toBe(250000);
    expect(r.ahorroCada).toBe(100000);
    expect(r.aporte1).toBe(450000);
    expect(r.aporte2).toBe(250000);
    expect(r.aporte1 + r.aporte2).toBe(700000);
    // restante igual para ambos: I_i − ahorroCada − aporte_i
    expect(800000 - r.ahorroCada - r.aporte1).toBe(600000 - r.ahorroCada - r.aporte2);
    expect(r.deficit).toBe(false);
    expect(r.desbalance).toBe(false);
  });

  it("marca déficit cuando los gastos+ahorro superan los ingresos", () => {
    const r = repartoPareja({ income1: 400000, income2: 300000, gastos: 700000, ahorro: 100000 });
    expect(r.restante).toBe(-50000);
    expect(r.deficit).toBe(true);
  });

  it("clampa a 0 cuando un salario no alcanza y el otro cubre todo", () => {
    const r = repartoPareja({ income1: 1000000, income2: 50000, gastos: 500000, ahorro: 100000 });
    expect(r.desbalance).toBe(true);
    expect(r.aporte2).toBe(0);
    expect(r.aporte1).toBe(500000);
  });
});
