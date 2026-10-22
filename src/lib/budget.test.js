import { describe, expect, it } from "vitest";
import { spendBudget, budgetMessage, suggestedSpend } from "./budget.js";

const month = { exchangeRate: { venta: 500 }, incomes: { p1: { salaryUSD: 2000 } } };
const plan = (libre) => ({ perPerson: [{ personId: "p1", libre }] });
const profile = (extra = {}) => ({ people: [{ id: "p1", ...extra }] });

describe("spendBudget", () => {
  it("sin límite propio usa la sugerencia: 35% del ingreso", () => {
    // $2000 × 500 = ₡1.000.000 → ₡350.000
    const b = spendBudget({ month, profile: profile(), plan: plan(500000), totals: { variable: 100000, extrasOut: 0 } });
    expect(b).toMatchObject({ limit: 350000, spent: 100000, remaining: 250000, level: "ok", custom: false });
  });
  it("la sugerencia no pasa de lo que deja el plan", () => {
    const b = spendBudget({ month, profile: profile(), plan: plan(100000), totals: { variable: 100000 } });
    expect(b.limit).toBe(200000);
  });
  it("avisa al 80%", () => {
    const b = spendBudget({ month, profile: profile(), plan: plan(500000), totals: { variable: 290000 } });
    expect(b.level).toBe("near");
  });
  it("límite propio en dólares y pasado", () => {
    const b = spendBudget({ month, profile: profile({ spendLimit: 600, spendLimitCurrency: "USD" }), plan: plan(0), totals: { variable: 310000 } });
    expect(b).toMatchObject({ limit: 300000, remaining: -10000, level: "over" });
    expect(budgetMessage(b, (n) => `₡${n}`)).toBe("Te pasaste ₡10000 del límite del mes");
  });
  it("en pareja no aplica", () => {
    expect(spendBudget({ month, profile: profile(), plan: { perPerson: [{}, {}] }, totals: {} })).toBeNull();
  });
});

describe("suggestedSpend", () => {
  it("suma ₡ y $ y redondea a ₡5.000", () => {
    expect(suggestedSpend({ exchangeRate: { venta: 512 }, incomes: { p1: { salaryCRC: 100000, salaryUSD: 1500 } } }, "p1")).toBe(305000);
  });
  it("sin ingreso es 0", () => {
    expect(suggestedSpend({}, "p1")).toBe(0);
  });
});
