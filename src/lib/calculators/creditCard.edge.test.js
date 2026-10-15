import { describe, it, expect } from "vitest";
import { payoff } from "./creditCard.js";

const card = { balance: 600000, annualRate: 0.3612 };

describe("payoff: strings numéricos", () => {
  it("acepta strings como números", () => {
    const r = payoff({ balance: "600000", annualRate: "0.3612", fixedPayment: "40000" });
    expect(r.fixed.months).toBe(21);
    expect(r.minimum.months).toBe(460);
    expect(r.firstInterest).toBeCloseTo(18060, 6);
  });
  it("fixedPayment vacío, NaN o undefined = sin escenario fijo (no 'nunca terminás')", () => {
    for (const fixedPayment of ["", "  ", NaN, undefined, null, Infinity]) {
      const r = payoff({ ...card, fixedPayment });
      expect(r.fixed).toBeNull();
      expect(r.neverEnds).toBe(false);
    }
  });
  it("fixedPayment 0 o negativo sí es escenario y nunca termina", () => {
    expect(payoff({ ...card, fixedPayment: 0 }).fixed.neverEnds).toBe(true);
    expect(payoff({ ...card, fixedPayment: "-1000" }).neverEnds).toBe(true);
  });
});

describe("payoff: saldos minúsculos", () => {
  it("saldo de ₡0,30 se paga en un mes, sin interés negativo", () => {
    const r = payoff({ balance: 0.3, annualRate: 0.36, fixedPayment: 1000 });
    for (const s of [r.minimum, r.fixed]) {
      expect(s.months).toBe(1);
      expect(s.interest).toBeGreaterThanOrEqual(0);
      expect(s.totalPaid).toBeGreaterThanOrEqual(0.3);
    }
  });
  it("nunca reporta interés negativo ni totalPaid menor al saldo", () => {
    for (const balance of [0.01, 0.5, 0.51, 1, 17, 999.99]) {
      const r = payoff({ balance, annualRate: 0.3612, fixedPayment: 5000 });
      expect(r.minimum.interest).toBeGreaterThanOrEqual(0);
      expect(r.fixed.totalPaid).toBeGreaterThanOrEqual(balance);
    }
  });
});

describe("payoff: tarjeta en dólares", () => {
  it("$1.500 al 30 % pagando el mínimo: termina, total > saldo", () => {
    const { minimum } = payoff({ balance: 1500, annualRate: 0.3, minPct: 0.03 });
    expect(minimum.neverEnds).toBe(false);
    expect(minimum.months).toBeGreaterThan(200);
    expect(minimum.totalPaid).toBeGreaterThan(1500);
  });
  it("$1.500 con $100 fijos termina en menos de 2 años", () => {
    const { fixed } = payoff({ balance: 1500, annualRate: 0.3, fixedPayment: 100 });
    expect(fixed.months).toBeLessThan(24);
    expect(fixed.interest).toBeCloseTo(fixed.totalPaid - 1500, 6);
  });
});

describe("payoff: neverEnds de la raíz", () => {
  it("sin fijo, refleja el mínimo (minPct 0 sin piso nunca termina)", () => {
    const r = payoff({ ...card, minPct: 0 });
    expect(r.minimum.neverEnds).toBe(true);
    expect(r.neverEnds).toBe(true);
  });
  it("con fijo, refleja el fijo", () => {
    const r = payoff({ ...card, minPct: 0, fixedPayment: 40000 });
    expect(r.fixed.neverEnds).toBe(false);
    expect(r.neverEnds).toBe(false);
  });
});

describe("payoff: maxMonths y entradas raras", () => {
  it("maxMonths inválido usa 600, gigante se topa en 1200", () => {
    expect(payoff({ ...card, maxMonths: null }).minimum.months).toBe(460);
    expect(payoff({ ...card, maxMonths: "abc" }).minimum.months).toBe(460);
    // Interés ₡500/mes y pago ₡500,0001: necesitaría ~18.500 meses; con tope 1200 se corta.
    const r = payoff({ balance: 600000, annualRate: 0.01, fixedPayment: 500.0001, maxMonths: 1e12 });
    expect(r.fixed.neverEnds).toBe(true);
    const ok = payoff({ ...card, fixedPayment: 18060.01, maxMonths: 1e12 });
    expect(ok.fixed.months).toBeLessThanOrEqual(1200);
  });
  it("tasa negativa = 0, minPct negativo = 0 (con piso termina)", () => {
    const r = payoff({ balance: 600000, annualRate: -0.2, minPct: -0.5, minFloor: 100000 });
    expect(r.minimum.months).toBe(6);
    expect(r.minimum.interest).toBe(0);
  });
  it("nada sale NaN con todo undefined", () => {
    const r = payoff({});
    expect(r.minimum).toEqual({ months: 0, totalPaid: 0, interest: 0, neverEnds: false });
    expect(r.fixed).toBeNull();
    expect(r.neverEnds).toBe(false);
  });
});
