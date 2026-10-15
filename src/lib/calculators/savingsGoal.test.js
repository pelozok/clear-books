import { describe, it, expect } from "vitest";
import { contributionFor, periodsToReach, projection, periodRate } from "./savingsGoal.js";

// Simula aportes vencidos para verificar las fórmulas cerradas.
const simulate = ({ initial = 0, contribution, r, n }) => {
  let b = initial;
  for (let i = 0; i < n; i++) b = b * (1 + r) + contribution;
  return b;
};

describe("periodRate", () => {
  it("divide la tasa anual entre los períodos del año", () => {
    expect(periodRate({ annualRate: 0.04, perYear: 12 })).toBeCloseTo(0.04 / 12, 12);
    expect(periodRate({ annualRate: 0.04, perYear: 24 })).toBeCloseTo(0.04 / 24, 12);
  });
  it("netOfTax aplica la retención del 15%", () => {
    expect(periodRate({ annualRate: 0.04, perYear: 12, netOfTax: true })).toBeCloseTo((0.04 * 0.85) / 12, 12);
  });
  it("tolera perYear inválido sin dividir entre 0", () => {
    expect(Number.isFinite(periodRate({ annualRate: 0.04, perYear: 0 }))).toBe(true);
  });
});

describe("contributionFor", () => {
  it("sin interés es lineal: 600.000 en 12 quincenas → 50.000", () => {
    expect(contributionFor({ goal: 600000, periods: 12, perYear: 24 })).toBe(50000);
  });
  it("descuenta el saldo inicial", () => {
    expect(contributionFor({ goal: 600000, initial: 290000, periods: 12 })).toBe(Math.ceil(310000 / 12));
  });
  it("con interés el aporte es menor y la simulación llega a la meta", () => {
    const args = { goal: 1200000, initial: 290000, periods: 24, annualRate: 0.04, perYear: 24 };
    const c = contributionFor(args);
    expect(c).toBeLessThan(Math.ceil((1200000 - 290000) / 24));
    const r = 0.04 / 24;
    expect(simulate({ initial: 290000, contribution: c, r, n: 24 })).toBeGreaterThanOrEqual(1200000);
    expect(simulate({ initial: 290000, contribution: c - 1, r, n: 24 })).toBeLessThan(1200000);
  });
  it("netOfTax exige un aporte un poco mayor", () => {
    const base = { goal: 1200000, periods: 24, annualRate: 0.04, perYear: 24 };
    expect(contributionFor({ ...base, netOfTax: true })).toBeGreaterThan(contributionFor(base));
  });
  it("meta ya alcanzada → 0; periods inválido → null", () => {
    expect(contributionFor({ goal: 500000, initial: 600000, periods: 12 })).toBe(0);
    expect(contributionFor({ goal: 500000, periods: 0 })).toBeNull();
    expect(contributionFor({ goal: 500000 })).toBeNull();
  });
});

describe("periodsToReach", () => {
  it("sin interés: 1.200.000 a 50.000 por quincena → 24", () => {
    expect(periodsToReach({ goal: 1200000, contribution: 50000, perYear: 24 })).toBe(24);
  });
  it("redondea hacia arriba cuando no cae exacto", () => {
    expect(periodsToReach({ goal: 1000000, contribution: 60000 })).toBe(17);
  });
  it("con interés llega en igual o menos períodos y la simulación lo confirma", () => {
    const args = { goal: 1200000, initial: 290000, contribution: 50000, annualRate: 0.04, perYear: 24 };
    const n = periodsToReach(args);
    expect(n).toBeLessThanOrEqual(periodsToReach({ ...args, annualRate: 0 }));
    const r = 0.04 / 24;
    expect(simulate({ initial: 290000, contribution: 50000, r, n })).toBeGreaterThanOrEqual(1200000);
    expect(simulate({ initial: 290000, contribution: 50000, r, n: n - 1 })).toBeLessThan(1200000);
  });
  it("ya alcanzado → 0", () => {
    expect(periodsToReach({ goal: 290000, initial: 290000, contribution: 50000 })).toBe(0);
    expect(periodsToReach({ goal: 200000, initial: 290000, contribution: 0 })).toBe(0);
  });
  it("nunca llega → null (no Infinity)", () => {
    expect(periodsToReach({ goal: 1200000, contribution: 0 })).toBeNull();
    expect(periodsToReach({ goal: 1200000, contribution: -5, annualRate: 0 })).toBeNull();
    expect(periodsToReach({ goal: 1200000, initial: 0, contribution: 0, annualRate: 0.04 })).toBeNull();
  });
  it("solo con interés y saldo inicial sí llega", () => {
    const n = periodsToReach({ goal: 400000, initial: 290000, contribution: 0, annualRate: 0.04, perYear: 12 });
    expect(n).toBeGreaterThan(0);
    expect(simulate({ initial: 290000, contribution: 0, r: 0.04 / 12, n })).toBeGreaterThanOrEqual(400000);
  });
});

describe("projection", () => {
  it("sin interés ni inflación: balance = aportado", () => {
    const rows = projection({ initial: 290000, contribution: 50000, perYear: 24, years: 2 });
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ year: 1, balance: 1490000, contributed: 1490000, interest: 0, realBalance: 1490000 });
    expect(rows[1].balance).toBe(2690000);
  });
  it("con interés e inflación: interés positivo y saldo real menor", () => {
    const rows = projection({ initial: 290000, contribution: 50000, annualRate: 0.04, perYear: 24, years: 3, inflation: 0.03 });
    const last = rows[2];
    expect(last.year).toBe(3);
    expect(last.contributed).toBe(290000 + 50000 * 72);
    expect(last.interest).toBeGreaterThan(0);
    expect(last.balance).toBe(last.contributed + last.interest);
    expect(last.realBalance).toBeLessThan(last.balance);
    expect(last.realBalance).toBe(Math.round(last.balance / Math.pow(1.03, 3)));
    const sim = simulate({ initial: 290000, contribution: 50000, r: 0.04 / 24, n: 72 });
    expect(Math.abs(last.balance - sim)).toBeLessThan(1);
  });
  it("years inválido → lista vacía; nada es NaN", () => {
    expect(projection({ initial: 290000, contribution: 50000, years: 0 })).toEqual([]);
    const rows = projection({ initial: "", contribution: "", annualRate: "", perYear: 0, years: 1 });
    expect(rows[0].balance).toBe(0);
    expect(Object.values(rows[0]).every(Number.isFinite)).toBe(true);
  });
});
