import { describe, expect, it } from "vitest";
import { deriveMonth } from "./derive.js";

describe("deriveMonth", () => {
  it("pasa el ahorro en dólares a colones con el TC del mes", () => {
    const m = { exchangeRate: { venta: 500 }, savings: { perPerson: { p1: { q1: { planned: 1, plannedAmount: 300, plannedCurrency: "USD", actual: null } } } } };
    expect(deriveMonth(m).savings.perPerson.p1.q1.planned).toBe(150000);
  });
  it("ahorro en colones no cambia", () => {
    const m = { exchangeRate: { venta: 500 }, savings: { perPerson: { p1: { q1: { planned: 50000 } } } } };
    expect(deriveMonth(m)).toBe(m);
  });
});
