import { describe, it, expect } from "vitest";
import { convert, cardCost } from "./fx.js";

const tc = { venta: 454.56, compra: 449.35 };

describe("convert: la dirección decide el TC cuando no hay side (contrato del SPEC sin side)", () => {
  it("compra se usa en USD → CRC y venta en CRC → USD", () => {
    expect(convert({ amount: 1000, from: "USD", to: "CRC", ...tc })).toBeCloseTo(449350, 6);
    expect(convert({ amount: 454560, from: "CRC", to: "USD", ...tc })).toBeCloseTo(1000, 6);
  });
  it("ida y vuelta pierde el diferencial cambiario (nunca gana plata)", () => {
    const usd = convert({ amount: 1000000, from: "CRC", to: "USD", ...tc });
    const back = convert({ amount: usd, from: "USD", to: "CRC", ...tc });
    expect(back).toBeLessThan(1000000);
    expect(back).toBeCloseTo(1000000 * 449.35 / 454.56, 4);
  });
  it("side inválido cae al default por dirección", () => {
    expect(convert({ amount: 100, from: "USD", to: "CRC", ...tc, side: "otro" })).toBeCloseTo(44935, 6);
  });
});

describe("convert: entradas sucias", () => {
  it("strings numéricos funcionan (salario en USD tecleado)", () => {
    expect(convert({ amount: "2500", from: "USD", to: "CRC", venta: "454.56", compra: "449.35", side: "venta" })).toBeCloseTo(1136400, 6);
  });
  it("monedas en minúscula o con espacios", () => {
    expect(convert({ amount: 100, from: "usd", to: " crc ", ...tc, side: "venta" })).toBeCloseTo(45456, 6);
    expect(convert({ amount: 100, from: "crc", to: "CRC", ...tc })).toBe(100);
  });
  it("moneda desconocida o ausente no inventa un monto", () => {
    expect(convert({ amount: 100, from: "EUR", to: "CRC", ...tc })).toBe(0);
    expect(convert({ amount: 100, from: undefined, to: undefined, ...tc })).toBe(0);
    expect(convert({ amount: 100, from: "EUR", to: "EUR", ...tc })).toBe(0);
  });
  it("Infinity, null, TC negativo devuelven 0", () => {
    expect(convert({ amount: Infinity, from: "USD", to: "CRC", ...tc })).toBe(0);
    expect(convert({ amount: null, from: "USD", to: "CRC", ...tc })).toBe(0);
    expect(convert({ amount: 100, from: "CRC", to: "USD", venta: -454.56 })).toBe(0);
    expect(convert({ amount: 100, from: "USD", to: "CRC", venta: 454.56, compra: -1 })).toBeCloseTo(45456, 6);
  });
  it("centavos de dólar no se redondean acá", () => {
    expect(convert({ amount: 0.01, from: "USD", to: "CRC", ...tc, side: "venta" })).toBeCloseTo(4.5456, 8);
  });
});

describe("cardCost: entradas sucias", () => {
  it("strings numéricos (Netflix $15,49 con spread 2 %)", () => {
    const r = cardCost({ usd: "15.49", venta: "454.56", spread: "2", feePct: "0" });
    expect(r.bccrCRC).toBeCloseTo(15.49 * 454.56, 6);
    expect(r.pct).toBeCloseTo(2, 6);
  });
  it("spread o comisión negativos no generan un 'ahorro' ficticio", () => {
    const r = cardCost({ usd: 100, venta: 454.56, spread: -50, feePct: -10 });
    expect(r.costCRC).toBeCloseTo(r.bccrCRC, 6);
    expect(r.vsBCCR).toBeCloseTo(0, 6);
  });
  it("usd negativo cuenta como 0 y nada sale NaN/Infinity", () => {
    const r = cardCost({ usd: -100, venta: 454.56 });
    expect(r.costCRC).toBe(0);
    Object.values(cardCost({ usd: Infinity, venta: Infinity, spread: NaN, feePct: null })).forEach((v) =>
      expect(Number.isFinite(v)).toBe(true));
  });
});
