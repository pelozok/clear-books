import { describe, it, expect } from "vitest";
import { convert, cardCost } from "./fx.js";

// TC BCCR de referencia: venta 454,56 / compra 449,35.
const tc = { venta: 454.56, compra: 449.35 };

describe("convert", () => {
  it("USD → CRC sin side usa compra (vendés dólares al banco)", () => {
    expect(convert({ amount: 100, from: "USD", to: "CRC", ...tc })).toBeCloseTo(44935, 6);
  });
  it("USD → CRC con side venta (regla del TC del mes)", () => {
    expect(convert({ amount: 100, from: "USD", to: "CRC", ...tc, side: "venta" })).toBeCloseTo(45456, 6);
  });
  it("USD → CRC con side compra (vendés dólares al banco)", () => {
    expect(convert({ amount: 100, from: "USD", to: "CRC", ...tc, side: "compra" })).toBeCloseTo(44935, 6);
  });
  it("CRC → USD usa venta por defecto (comprás dólares)", () => {
    expect(convert({ amount: 454560, from: "CRC", to: "USD", ...tc })).toBeCloseTo(1000, 6);
  });
  it("CRC → USD con side compra", () => {
    expect(convert({ amount: 449350, from: "CRC", to: "USD", ...tc, side: "compra" })).toBeCloseTo(1000, 6);
  });
  it("misma moneda devuelve el monto", () => {
    expect(convert({ amount: 12500, from: "CRC", to: "CRC", ...tc })).toBe(12500);
    expect(convert({ amount: 80, from: "USD", to: "USD", ...tc })).toBe(80);
  });
  it("sin compra, usa venta como respaldo", () => {
    expect(convert({ amount: 100, from: "USD", to: "CRC", venta: 454.56, side: "compra" })).toBeCloseTo(45456, 6);
  });
  it("sin TC o monto inválido devuelve 0", () => {
    expect(convert({ amount: 100, from: "USD", to: "CRC", venta: 0 })).toBe(0);
    expect(convert({ amount: NaN, from: "USD", to: "CRC", ...tc })).toBe(0);
  });
});

describe("cardCost", () => {
  it("spread 2 % por defecto sobre venta", () => {
    const r = cardCost({ usd: 100, venta: 454.56 });
    expect(r.bccrCRC).toBeCloseTo(45456, 6);
    expect(r.tcBanco).toBeCloseTo(463.6512, 6);
    expect(r.costCRC).toBeCloseTo(46365.12, 6);
    expect(r.vsBCCR).toBeCloseTo(909.12, 6);
    expect(r.pct).toBeCloseTo(2, 6);
  });
  it("comisión extra se suma al sobrecosto", () => {
    const r = cardCost({ usd: 100, venta: 454.56, spread: 2, feePct: 1 });
    expect(r.costCRC).toBeCloseTo(46365.12 * 1.01, 6);
    expect(r.pct).toBeCloseTo(3.02, 6);
  });
  it("sin spread ni comisión cuesta lo mismo que el BCCR", () => {
    const r = cardCost({ usd: 250, venta: 454.56, spread: 0 });
    expect(r.costCRC).toBeCloseTo(r.bccrCRC, 6);
    expect(r.vsBCCR).toBeCloseTo(0, 6);
    expect(r.pct).toBe(0);
  });
  it("monto 0 o inválido no produce NaN", () => {
    const r = cardCost({ usd: 0, venta: 454.56 });
    expect(r).toMatchObject({ costCRC: 0, bccrCRC: 0, vsBCCR: 0, pct: 0 });
    Object.values(cardCost({ usd: NaN, venta: undefined })).forEach((v) => expect(Number.isFinite(v)).toBe(true));
  });
});
