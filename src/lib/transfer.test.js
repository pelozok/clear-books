import { describe, expect, it } from "vitest";
import { transferToColones } from "./transfer.js";

const base = {
  frequency: "quincenal",
  exchangeRate: { venta: 500 },
  incomes: { p1: { salaryCRC: 0, salaryUSD: 1500 } },
  savings: { perPerson: { p1: { q1: { planned: 75000 }, q2: { planned: 75000 } } } },
  annualReserve: { quota: 0 },
  fixedItems: [
    { id: "d", currency: "USD", amount: 150, half: "ambas", status: "pending", percent: 10 },
    { id: "c", currency: "CRC", amount: 20000, half: 1, status: "pending" },
  ],
};

describe("transferToColones", () => {
  it("fijos en ₡ + caja chica, por quincena", () => {
    // q1: 20000 fijo + 150000 caja = 170000 → $340 ; q2: solo caja
    expect(transferToColones(base, "p1", 300000)).toEqual([
      { half: 1, crc: 170000, usd: 340, fixedCRC: 20000, cajaCRC: 150000 },
      { half: 2, crc: 150000, usd: 300, fixedCRC: 0, cajaCRC: 150000 },
    ]);
  });
  it("mensual: una sola fila", () => {
    expect(transferToColones({ ...base, frequency: "mensual" }, "p1", 300000)).toEqual([
      { half: 1, crc: 320000, usd: 640, fixedCRC: 20000, cajaCRC: 300000 },
    ]);
  });
  it("fijos saltados no cuentan", () => {
    const m = { ...base, frequency: "mensual", fixedItems: base.fixedItems.map((it) => ({ ...it, status: "skipped" })) };
    expect(transferToColones(m, "p1", 100000)[0].crc).toBe(100000);
  });
  it("el salario en colones cubre primero", () => {
    const m = { ...base, frequency: "mensual", incomes: { p1: { salaryCRC: 120000, salaryUSD: 1000 } } };
    expect(transferToColones(m, "p1", 300000)[0].crc).toBe(200000);
  });
  it("sin salario en dólares no hay nada que pasar", () => {
    expect(transferToColones({ ...base, incomes: { p1: { salaryCRC: 900000 } } }, "p1", 300000)).toEqual([]);
  });
  it("nunca más que el salario", () => {
    expect(transferToColones({ ...base, frequency: "mensual" }, "p1", 9e9)[0].usd).toBe(1500);
  });
});
