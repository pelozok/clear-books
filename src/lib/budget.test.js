import { describe, expect, it } from "vitest";
import { spendBudget, budgetMessage } from "./budget.js";

const month = { exchangeRate: { venta: 500 } };
const plan = (libre) => ({ perPerson: [{ personId: "p1", libre }] });
const profile = (extra = {}) => ({ people: [{ id: "p1", ...extra }] });

describe("spendBudget", () => {
  it("sin límite propio usa lo que deja el plan", () => {
    const b = spendBudget({ month, profile: profile(), plan: plan(100000), totals: { variable: 300000, extrasOut: 0 } });
    expect(b).toMatchObject({ limit: 400000, spent: 300000, remaining: 100000, level: "ok" });
  });
  it("avisa al 80%", () => {
    const b = spendBudget({ month, profile: profile(), plan: plan(80000), totals: { variable: 320000 } });
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
