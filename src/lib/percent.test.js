import { describe, expect, it } from "vitest";
import { monthIncomeCRC, percentAmount, withPercentAmounts } from "./percent.js";

const month = {
  exchangeRate: { venta: 500 },
  incomes: { p1: { salaryCRC: 100000, salaryUSD: 2000 } },
  extras: [
    { type: "ingreso", amount: 50000, currency: "CRC" },
    { type: "gasto", amount: 99999, currency: "CRC" },
  ],
  fixedItems: [
    { id: "a", name: "Alquiler", amount: 300000, currency: "CRC" },
    { id: "d", name: "Diezmo", amount: 0, currency: "CRC", percent: 10 },
    { id: "u", name: "Diezmo $", amount: 0, currency: "USD", percent: 10 },
  ],
};

describe("percent", () => {
  it("suma salarios y extras de ingreso en CRC", () => {
    expect(monthIncomeCRC(month)).toBe(100000 + 1000000 + 50000);
  });
  it("calcula el % en la moneda del fijo", () => {
    expect(percentAmount(10, month, "CRC")).toBe(115000);
    expect(percentAmount(10, month, "USD")).toBe(230);
  });
  it("recalcula solo los fijos porcentuales", () => {
    const out = withPercentAmounts(month);
    expect(out.fixedItems.map((x) => x.amount)).toEqual([300000, 115000, 230]);
  });
  it("sin porcentuales devuelve el mismo objeto", () => {
    const m = { fixedItems: [{ id: "a", amount: 1 }] };
    expect(withPercentAmounts(m)).toBe(m);
  });
});
