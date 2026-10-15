import { describe, it, expect } from "vitest";
import { payment, schedule } from "./loan.js";

const auto = { principal: 5000000, annualRate: 0.095, months: 60 };
const finite = (s) =>
  s.rows.forEach((r) => Object.values(r).forEach((v) => expect(Number.isFinite(v)).toBe(true)));

describe("loan: strings numéricos (lo que llega de un input)", () => {
  it("payment acepta strings como números", () => {
    expect(payment({ principal: "5000000", annualRate: "0.095", months: "60" })).toBeCloseTo(105009.31, 2);
  });
  it("schedule acepta strings y abono único con strings", () => {
    const s = schedule({ principal: "5000000", annualRate: "0.095", months: "60", extraOnce: { month: "12", amount: "1000000" } });
    expect(s.monthsActual).toBe(47);
    expect(s.rows[11].extra).toBe(1000000);
  });
  it("string vacío o basura es 0, sin NaN", () => {
    expect(payment({ principal: "", annualRate: "0.1", months: "12" })).toBe(0);
    expect(payment({ principal: "abc", annualRate: "0.1", months: "12" })).toBe(0);
    const s = schedule({ principal: "1000000", annualRate: "x", months: "10" });
    expect(s.payment).toBe(100000);
    expect(s.totalInterest).toBe(0);
  });
});

describe("loan: saldo final exactamente 0 en préstamos grandes", () => {
  it.each([
    [150000000, 0.08, 360],
    [300000000, 0.0725, 360],
    [99999999.99, 0.13, 480],
    [50000, 0.3612, 7],
  ])("₡%d al %d a %d meses termina en 0", (principal, annualRate, months) => {
    const s = schedule({ principal, annualRate, months });
    expect(s.monthsActual).toBe(months);
    expect(s.rows[months - 1].balance).toBe(0);
    const cap = s.rows.reduce((a, r) => a + r.principal, 0);
    expect(cap).toBeCloseTo(principal, 2);
    finite(s);
  });
});

describe("loan: abonos en bordes del plazo", () => {
  it("abono único en el último mes no rompe nada (modo cuota)", () => {
    const s = schedule({ ...auto, extraOnce: { month: 60, amount: 100000 }, mode: "cuota" });
    expect(s.monthsActual).toBe(60);
    expect(s.rows[59].balance).toBe(0);
    expect(s.rows[59].extra).toBe(0); // ya no queda saldo para abonar
    finite(s);
  });
  it("abono en el mes 59 en modo cuota deja una última cuota menor, finita", () => {
    const s = schedule({ ...auto, extraOnce: { month: 59, amount: 50000 }, mode: "cuota" });
    expect(s.rows[59].balance).toBe(0);
    expect(s.rows[59].payment).toBeLessThan(105009.31);
    finite(s);
  });
  it("abono en mes 0, negativo o fuera de plazo se ignora", () => {
    for (const extraOnce of [{ month: 0, amount: 1000000 }, { month: 5, amount: -500000 }, { month: 99, amount: 1000000 }]) {
      const s = schedule({ ...auto, extraOnce });
      expect(s.monthsActual).toBe(60);
      expect(s.monthsSaved).toBe(0);
      expect(s.interestSaved).toBeCloseTo(0, 6);
    }
    expect(schedule({ ...auto, extraMonthly: -5000 }).monthsSaved).toBe(0);
  });
  it("aguinaldo de diciembre como abono único (₡700.000 en el mes 3)", () => {
    const s = schedule({ ...auto, extraOnce: { month: 3, amount: 700000 } });
    expect(s.rows[2].extra).toBe(700000);
    expect(s.monthsSaved).toBeGreaterThan(0);
    expect(s.totalPaid).toBeCloseTo(5000000 + s.totalInterest, 4);
  });
});

describe("loan: entradas absurdas", () => {
  it("plazo gigante (typo) se topa en 1200 meses y no congela", () => {
    const s = schedule({ principal: 1000000, annualRate: 0.08, months: 99999999 });
    expect(s.rows.length).toBe(1200);
    expect(s.rows[1199].balance).toBe(0);
    expect(payment({ principal: 1000000, annualRate: 0.08, months: 99999999 })).toBeCloseTo(s.payment, 6);
  });
  it("Infinity / null / undefined no generan NaN", () => {
    expect(payment({ principal: Infinity, annualRate: 0.1, months: 12 })).toBe(0);
    expect(payment({ principal: 1000000, annualRate: Infinity, months: 12 })).toBeCloseTo(1000000 / 12, 6);
    const s = schedule({ principal: null, annualRate: undefined, months: undefined });
    expect(s.rows).toEqual([]);
    expect(s.monthsSaved).toBe(0);
  });
  it("plazo fraccionario se trunca y tasa negativa cuenta como 0", () => {
    expect(schedule({ principal: 1200000, annualRate: 0, months: 12.9 }).monthsActual).toBe(12);
    expect(payment({ principal: 1200000, annualRate: -0.05, months: 12 })).toBe(100000);
    expect(schedule({ principal: 1200000, annualRate: -0.05, months: 12 }).totalInterest).toBe(0);
  });
});
