import { describe, it, expect } from "vitest";
import { emergencyFund, EMERGENCY_MONTHS } from "./emergencyFund.js";

// Fijos de ₡930.000 al mes; ya hay ₡290.000 ahorrados.
describe("emergencyFund", () => {
  it("meta de 3 meses por defecto", () => {
    const r = emergencyFund({ monthlyExpenses: 930000, current: 290000 });
    expect(r.target).toBe(2790000);
    expect(r.missing).toBe(2500000);
    expect(r.covered).toBe(0.3);
    expect(r.pct).toBeCloseTo(10.39, 2);
  });
  it("6 y 9 meses", () => {
    expect(emergencyFund({ monthlyExpenses: 930000, months: 6 }).target).toBe(5580000);
    expect(emergencyFund({ monthlyExpenses: 930000, months: 9 }).target).toBe(8370000);
    expect(EMERGENCY_MONTHS).toEqual([3, 6, 9]);
  });
  it("meses cubiertos a 1 decimal, truncado hacia abajo", () => {
    expect(emergencyFund({ monthlyExpenses: 930000, current: 2000000 }).covered).toBe(2.1); // 2,15 → 2,1
    expect(emergencyFund({ monthlyExpenses: 930000, current: 1395000 }).covered).toBe(1.5);
  });
  it("meta alcanzada o superada: falta 0 y pct tope 100", () => {
    const r = emergencyFund({ monthlyExpenses: 930000, months: 3, current: 3000000 });
    expect(r.missing).toBe(0);
    expect(r.pct).toBe(100);
    expect(r.covered).toBe(3.2);
  });
  it("sin ahorro actual", () => {
    const r = emergencyFund({ monthlyExpenses: 930000, months: 3 });
    expect(r.covered).toBe(0);
    expect(r.pct).toBe(0);
    expect(r.missing).toBe(2790000);
  });
  it("gastos 0 o inválidos no producen NaN ni Infinity", () => {
    const r = emergencyFund({ monthlyExpenses: 0, months: 3, current: 100000 });
    expect(r).toEqual({ target: 0, covered: 0, missing: 0, pct: 0 });
    const r2 = emergencyFund({ monthlyExpenses: NaN, months: undefined, current: null });
    Object.values(r2).forEach((v) => expect(Number.isFinite(v)).toBe(true));
  });
});
