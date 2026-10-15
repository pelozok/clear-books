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
  it("salario − ahorro − fijos en dólares, por quincena", () => {
    // 750 − 150 (ahorro) − 75 (media del diezmo) = 525
    expect(transferToColones(base, "p1")).toEqual([
      { half: 1, crc: 262500, usd: 525 },
      { half: 2, crc: 262500, usd: 525 },
    ]);
  });
  it("mensual: una sola fila", () => {
    const m = { ...base, frequency: "mensual", savings: { perPerson: { p1: { q1: { planned: 150000 } } } } };
    expect(transferToColones(m, "p1")).toEqual([{ half: 1, crc: 525000, usd: 1050 }]);
  });
  it("sin salario en dólares no hay nada que pasar", () => {
    expect(transferToColones({ ...base, incomes: { p1: { salaryCRC: 900000 } } }, "p1")).toEqual([]);
  });
  it("nunca negativo", () => {
    const m = { ...base, savings: { perPerson: { p1: { q1: { planned: 9e9 }, q2: { planned: 0 } } } } };
    expect(transferToColones(m, "p1")[0].crc).toBe(0);
  });
});
