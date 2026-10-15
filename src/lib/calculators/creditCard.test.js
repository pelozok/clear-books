import { describe, it, expect } from "vitest";
import { payoff } from "./creditCard.js";

// Saldo de ₡600.000 al 36,12 % anual (tasa de referencia de tarjetas en CR).
const card = { balance: 600000, annualRate: 0.3612 };

describe("payoff pago mínimo", () => {
  it("mínimo = interés + 3 % del saldo: tarda años y paga el doble", () => {
    const { minimum, fixed, firstInterest } = payoff(card);
    expect(fixed).toBeNull();
    expect(firstInterest).toBeCloseTo(18060, 6);
    expect(minimum.neverEnds).toBe(false);
    expect(minimum.months).toBe(460);
    expect(minimum.totalPaid).toBeCloseTo(1201999.51, 2);
    expect(minimum.interest).toBeCloseTo(minimum.totalPaid - 600000, 6);
  });
  it("con piso de ₡15.000 termina mucho antes", () => {
    const { minimum } = payoff({ ...card, minFloor: 15000 });
    expect(minimum.months).toBe(40);
    expect(minimum.totalPaid).toBeCloseTo(958737.48, 2);
  });
  it("con tasa 0 el total pagado es exactamente el saldo", () => {
    const { minimum } = payoff({ balance: 600000, annualRate: 0, minFloor: 100000 });
    expect(minimum.months).toBe(6);
    expect(minimum.totalPaid).toBe(600000);
    expect(minimum.interest).toBe(0);
  });
  it("minPct 0 sin piso nunca termina", () => {
    const { minimum } = payoff({ ...card, minPct: 0 });
    expect(minimum.neverEnds).toBe(true);
    expect(minimum.months).toBeNull();
  });
});

describe("payoff pago fijo", () => {
  it("₡40.000 fijos salen en 21 meses", () => {
    const { fixed, neverEnds } = payoff({ ...card, fixedPayment: 40000 });
    expect(neverEnds).toBe(false);
    expect(fixed.months).toBe(21);
    expect(fixed.totalPaid).toBeCloseTo(810160.85, 2);
    expect(fixed.interest).toBeCloseTo(210160.85, 2);
    expect(fixed.totalPaid).toBeLessThan(payoff(card).minimum.totalPaid);
  });
  it("el último pago es solo lo que falta (no se paga de más)", () => {
    const { fixed } = payoff({ balance: 600000, annualRate: 0, fixedPayment: 100000 });
    expect(fixed.months).toBe(6);
    expect(fixed.totalPaid).toBe(600000);
    const { fixed: f2 } = payoff({ balance: 600000, annualRate: 0, fixedPayment: 250000 });
    expect(f2.months).toBe(3);
    expect(f2.totalPaid).toBe(600000);
  });
  it("pago ≤ interés del primer mes nunca termina", () => {
    const r = payoff({ ...card, fixedPayment: 18060 });
    expect(r.fixed.neverEnds).toBe(true);
    expect(r.neverEnds).toBe(true);
    expect(r.fixed.months).toBeNull();
    expect(r.fixed.totalPaid).toBeNull();
    expect(r.minimum.neverEnds).toBe(false); // el mínimo sí avanza
  });
  it("pago apenas por encima del interés termina, pero tarda", () => {
    const { fixed } = payoff({ ...card, fixedPayment: 18100 });
    expect(fixed.neverEnds).toBe(false);
    expect(fixed.months).toBe(207);
  });
  it("respeta maxMonths", () => {
    const { fixed } = payoff({ ...card, fixedPayment: 18100, maxMonths: 120 });
    expect(fixed.neverEnds).toBe(true);
  });
});

describe("payoff casos borde", () => {
  it("saldo 0 devuelve ceros sin NaN", () => {
    const r = payoff({ balance: 0, annualRate: 0.3612, fixedPayment: 40000 });
    expect(r.minimum).toEqual({ months: 0, totalPaid: 0, interest: 0, neverEnds: false });
    expect(r.fixed.months).toBe(0);
    expect(r.neverEnds).toBe(false);
  });
  it("entradas inválidas no producen NaN", () => {
    const r = payoff({ balance: NaN, annualRate: undefined });
    expect(r.minimum.months).toBe(0);
    expect(Number.isFinite(r.firstInterest)).toBe(true);
  });
});
