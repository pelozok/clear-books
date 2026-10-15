import { describe, it, expect } from "vitest";
import { looksLikeCard, detectCardDoubleCount } from "./cards.js";

describe("looksLikeCard", () => {
  it("reconoce nombres de tarjeta", () => {
    for (const n of ["Tarjeta BAC", "tarjetas", "VISA", "Pago Mastercard", "Master Card", "Credomatic",
      "AMEX oro", "American Express", "Pago bac", "BAC-Credomatic"]) {
      expect(looksLikeCard(n), n).toBe(true);
    }
  });
  it("no confunde palabras que contienen las siglas", () => {
    for (const n of ["Bacalao", "Alquiler", "Visado", "Revisar carro", "Abaco", "Internet", "", null, undefined, 12]) {
      expect(looksLikeCard(n), String(n)).toBe(false);
    }
  });
});

describe("detectCardDoubleCount", () => {
  const fixed = [
    { id: "f1", name: "Alquiler", amount: 350000, currency: "CRC", status: "pending", isDebt: false },
    { id: "f2", name: "Tarjeta BAC", amount: 120000, currency: "CRC", status: "pending", isDebt: false },
  ];
  it("avisa con fijo de tarjeta y gastos anotados", () => {
    expect(detectCardDoubleCount(fixed, 3)).toEqual({ warn: true, item: fixed[1] });
  });
  it("sin gastos anotados no avisa", () => {
    expect(detectCardDoubleCount(fixed, 0)).toEqual({ warn: false, item: null });
  });
  it("isDebt (cuota financiada) no avisa", () => {
    const f = [{ ...fixed[1], isDebt: true }];
    expect(detectCardDoubleCount(f, 5).warn).toBe(false);
  });
  it("fijo saltado este mes no avisa", () => {
    expect(detectCardDoubleCount([{ ...fixed[1], status: "skipped" }], 2).warn).toBe(false);
  });
  it("sin fijos de tarjeta no avisa; tolera entradas vacías", () => {
    expect(detectCardDoubleCount([fixed[0]], 4).warn).toBe(false);
    expect(detectCardDoubleCount(undefined, 4)).toEqual({ warn: false, item: null });
  });
});
