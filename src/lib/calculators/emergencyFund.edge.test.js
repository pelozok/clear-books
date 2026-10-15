import { describe, it, expect } from "vitest";
import { emergencyFund } from "./emergencyFund.js";
import { convert } from "./fx.js";

describe("emergencyFund: honestidad del redondeo", () => {
  it("con ₡1 faltante no dice 'cubrís 3 meses'", () => {
    const r = emergencyFund({ monthlyExpenses: 930000, months: 3, current: 2789999 });
    expect(r.missing).toBe(1);
    expect(r.covered).toBe(2.9);
    expect(r.pct).toBeLessThan(100);
  });
  it("exacto en la meta: 3,0 meses, falta 0, 100 %", () => {
    const r = emergencyFund({ monthlyExpenses: 930000, months: 3, current: 2790000 });
    expect(r).toEqual({ target: 2790000, covered: 3, missing: 0, pct: 100 });
  });
  it("divisiones con ruido de punto flotante no bajan un décimo de más", () => {
    // 0,3 × 930.000 = 279.000 → 0,3 exacto (279000/930000*10 = 2.9999999999999996)
    expect(emergencyFund({ monthlyExpenses: 930000, current: 279000 }).covered).toBe(0.3);
    expect(emergencyFund({ monthlyExpenses: 1000000, current: 700000 }).covered).toBe(0.7);
  });
});

describe("emergencyFund: entradas sucias", () => {
  it("strings numéricos funcionan", () => {
    const r = emergencyFund({ monthlyExpenses: "930000", months: "6", current: "290000" });
    expect(r.target).toBe(5580000);
    expect(r.missing).toBe(5290000);
    expect(r.covered).toBe(0.3);
  });
  it("meses negativos o 0: meta 0, sin NaN", () => {
    expect(emergencyFund({ monthlyExpenses: 930000, months: -3, current: 0 })).toEqual({ target: 0, covered: 0, missing: 0, pct: 0 });
    const r = emergencyFund({ monthlyExpenses: 930000, months: 0, current: 500000 });
    expect(r.missing).toBe(0);
    expect(r.covered).toBe(0.5);
  });
  it("ahorro negativo cuenta como 0; Infinity como 0", () => {
    expect(emergencyFund({ monthlyExpenses: 930000, current: -100000 }).covered).toBe(0);
    const r = emergencyFund({ monthlyExpenses: Infinity, months: Infinity, current: Infinity });
    Object.values(r).forEach((v) => expect(Number.isFinite(v)).toBe(true));
  });
});

describe("emergencyFund con ahorro en dólares", () => {
  it("cuenta de $2.000 + ₡290.000 contra gastos de ₡930.000 (TC compra al vender dólares)", () => {
    const usdEnCRC = convert({ amount: 2000, from: "USD", to: "CRC", venta: 454.56, compra: 449.35 });
    const r = emergencyFund({ monthlyExpenses: 930000, months: 3, current: 290000 + usdEnCRC });
    expect(usdEnCRC).toBeCloseTo(898700, 6);
    expect(r.covered).toBe(1.2); // 1.188.700 / 930.000 = 1,278 → 1,2
    expect(r.missing).toBeCloseTo(2790000 - 1188700, 6);
  });
});
