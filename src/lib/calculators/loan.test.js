import { describe, it, expect } from "vitest";
import { payment, schedule } from "./loan.js";

// Vehículo: ₡5.000.000 al 9,5 % a 60 meses. Vivienda: ₡30.000.000 al 8 % a 240 meses.
const auto = { principal: 5000000, annualRate: 0.095, months: 60 };
const casa = { principal: 30000000, annualRate: 0.08, months: 240 };

describe("payment", () => {
  it("calcula la cuota francesa", () => {
    expect(payment(auto)).toBeCloseTo(105009.31, 2);
    expect(payment(casa)).toBeCloseTo(250932.02, 2);
  });
  it("con tasa 0 es capital entre meses", () => {
    expect(payment({ principal: 1200000, annualRate: 0, months: 12 })).toBe(100000);
  });
  it("devuelve 0 con datos inválidos", () => {
    expect(payment({ principal: 0, annualRate: 0.1, months: 12 })).toBe(0);
    expect(payment({ principal: 1000000, annualRate: 0.1, months: 0 })).toBe(0);
    expect(payment({ principal: NaN, annualRate: 0.1, months: 12 })).toBe(0);
  });
});

describe("schedule sin abonos", () => {
  const s = schedule(auto);
  it("termina en el plazo con saldo 0 y suma intereses", () => {
    expect(s.monthsActual).toBe(60);
    expect(s.rows).toHaveLength(60);
    expect(s.rows[59].balance).toBe(0);
    expect(s.totalInterest).toBeCloseTo(1300558.39, 2);
    expect(s.totalPaid).toBeCloseTo(6300558.39, 2);
    expect(s.monthsSaved).toBe(0);
    expect(s.interestSaved).toBe(0);
  });
  it("cada fila cuadra: cuota = interés + capital, y el saldo baja", () => {
    for (const r of s.rows) {
      expect(r.payment).toBeCloseTo(r.interest + r.principal, 6);
      expect(r.extra).toBe(0);
    }
    expect(s.rows[0].interest).toBeCloseTo(5000000 * 0.095 / 12, 6);
    expect(s.rows[0].balance).toBeCloseTo(5000000 - s.rows[0].principal, 6);
  });
  it("el capital pagado suma el principal", () => {
    const cap = s.rows.reduce((a, r) => a + r.principal + r.extra, 0);
    expect(cap).toBeCloseTo(5000000, 4);
  });
  it("no redondea en el cálculo", () => {
    expect(Number.isInteger(s.rows[0].interest)).toBe(false);
  });
});

describe("schedule modo plazo (cuota fija, termina antes)", () => {
  const s = schedule({ ...auto, extraMonthly: 50000, mode: "plazo" });
  it("acorta el plazo y ahorra intereses", () => {
    expect(s.monthsActual).toBe(38);
    expect(s.monthsSaved).toBe(22);
    expect(s.interestSaved).toBeCloseTo(504278.03, 2);
    expect(s.totalInterest).toBeCloseTo(796280.36, 2);
    expect(s.rows[s.rows.length - 1].balance).toBe(0);
  });
  it("mantiene la cuota original salvo la última", () => {
    expect(s.payment).toBeCloseTo(105009.31, 2);
    s.rows.slice(0, -1).forEach((r) => expect(r.payment).toBeCloseTo(105009.31, 2));
    expect(s.rows[s.rows.length - 1].payment).toBeLessThan(105009.31);
  });
  it("el abono extra aparece en su columna y no pasa del saldo", () => {
    expect(s.rows[0].extra).toBe(50000);
    s.rows.forEach((r) => expect(r.extra).toBeLessThanOrEqual(50000));
    const cap = s.rows.reduce((a, r) => a + r.principal + r.extra, 0);
    expect(cap).toBeCloseTo(5000000, 4);
  });
});

describe("schedule con abono único", () => {
  const s = schedule({ ...auto, extraOnce: { month: 12, amount: 1000000 } });
  it("aplica el abono solo ese mes y acorta el plazo", () => {
    expect(s.rows[11].extra).toBe(1000000);
    expect(s.rows[10].extra).toBe(0);
    expect(s.rows[12].extra).toBe(0);
    expect(s.monthsActual).toBe(47);
    expect(s.monthsSaved).toBe(13);
    expect(s.interestSaved).toBeGreaterThan(0);
  });
  it("modo cuota: el plazo se mantiene y la cuota baja desde el mes siguiente", () => {
    const c = schedule({ ...auto, extraOnce: { month: 12, amount: 1000000 }, mode: "cuota" });
    expect(c.monthsActual).toBe(60);
    expect(c.monthsSaved).toBe(0);
    expect(c.rows[11].payment).toBeCloseTo(105009.31, 2);
    expect(c.rows[12].payment).toBeLessThan(90000);
    expect(c.rows[59].balance).toBe(0);
    expect(c.interestSaved).toBeGreaterThan(0);
    expect(c.interestSaved).toBeLessThan(s.interestSaved); // acortar plazo ahorra más que bajar cuota
  });
});

describe("schedule modo cuota con abono mensual", () => {
  const s = schedule({ ...auto, extraMonthly: 50000, mode: "cuota" });
  it("recalcula la cuota cada mes y baja", () => {
    expect(s.rows[0].payment).toBeCloseTo(105009.31, 2);
    expect(s.rows[1].payment).toBeLessThan(s.rows[0].payment);
    expect(s.rows[2].payment).toBeLessThan(s.rows[1].payment);
  });
  it("sigue cuadrando el capital y nunca pasa del plazo", () => {
    expect(s.monthsActual).toBeLessThanOrEqual(60);
    const cap = s.rows.reduce((a, r) => a + r.principal + r.extra, 0);
    expect(cap).toBeCloseTo(5000000, 4);
    expect(s.totalInterest).toBeLessThan(1300558.39);
  });
});

describe("schedule casos borde", () => {
  it("tasa 0 con abono único: cuotas lineales y termina antes", () => {
    const s = schedule({ principal: 1200000, annualRate: 0, months: 12, extraOnce: { month: 3, amount: 300000 } });
    expect(s.payment).toBe(100000);
    expect(s.monthsActual).toBe(9);
    expect(s.rows.map((r) => r.balance)).toEqual([1100000, 1000000, 600000, 500000, 400000, 300000, 200000, 100000, 0]);
    expect(s.totalInterest).toBe(0);
  });
  it("un abono mayor al saldo lo cancela de una vez", () => {
    const s = schedule({ ...auto, extraOnce: { month: 1, amount: 9000000 } });
    expect(s.monthsActual).toBe(1);
    expect(s.rows[0].extra).toBeCloseTo(5000000 - s.rows[0].principal, 6);
    expect(s.rows[0].balance).toBe(0);
  });
  it("datos inválidos devuelven tabla vacía sin NaN", () => {
    const s = schedule({ principal: 0, annualRate: 0.1, months: 12 });
    expect(s.rows).toEqual([]);
    expect(s.payment).toBe(0);
    expect(Number.isNaN(s.totalInterest)).toBe(false);
  });
  it("vivienda: 240 filas, sin NaN ni Infinity", () => {
    const s = schedule(casa);
    expect(s.rows).toHaveLength(240);
    s.rows.forEach((r) => Object.values(r).forEach((v) => expect(Number.isFinite(v)).toBe(true)));
  });
});
