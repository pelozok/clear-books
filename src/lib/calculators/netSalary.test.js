import { describe, it, expect } from "vitest";
import { netSalary, rentaMensual } from "./netSalary.js";

describe("rentaMensual", () => {
  it("0 hasta 918.000", () => {
    expect(rentaMensual(600000)).toBe(0);
    expect(rentaMensual(918000)).toBe(0);
  });
  it("10% solo sobre el exceso del primer tramo", () => {
    expect(rentaMensual(1000000)).toBeCloseTo(8200, 6);
  });
  it("tramos altos (20% y 25%) sin Infinity", () => {
    // 42.900 + 152.550 + 472.600 + 25% de 273.000
    expect(rentaMensual(5000000)).toBeCloseTo(42900 + 152550 + 472600 + 68250, 6);
    expect(Number.isFinite(rentaMensual(50000000))).toBe(true);
  });
});

describe("netSalary mensual", () => {
  it("caso de control: bruto 1.500.000 → ccss 162.450, renta 65.850, neto 1.271.700", () => {
    const r = netSalary({ gross: 1500000, frequency: "mensual" });
    expect(r.ccss).toBe(162450);
    expect(r.renta).toBe(65850);
    expect(r.rentaBruta).toBe(65850);
    expect(r.creditos).toBe(0);
    expect(r.neto).toBe(1271700);
  });
  it("bruto 1.000.000 → ccss 108.300, renta 8.200, neto 883.500", () => {
    const r = netSalary({ gross: 1000000 });
    expect(r.ccss).toBe(108300);
    expect(r.renta).toBe(8200);
    expect(r.neto).toBe(883500);
  });
  it("salario bajo: sin renta y los créditos no la vuelven negativa", () => {
    const r = netSalary({ gross: 600000, children: 2, spouse: true });
    expect(r.ccss).toBe(64980);
    expect(r.rentaBruta).toBe(0);
    expect(r.creditos).toBe(0);
    expect(r.renta).toBe(0);
    expect(r.neto).toBe(535020);
  });
  it("créditos por 2 hijos y cónyuge se restan del impuesto", () => {
    const r = netSalary({ gross: 1500000, children: 2, spouse: true });
    expect(r.creditos).toBe(2 * 1710 + 2590);
    expect(r.renta).toBe(65850 - 6010);
    expect(r.neto).toBe(1271700 + 6010);
  });
  it("otras deducciones (ej. solidarista) bajan el neto pero no el impuesto", () => {
    const r = netSalary({ gross: 1500000, otherDeductions: 56000 });
    expect(r.renta).toBe(65850);
    expect(r.neto).toBe(1271700 - 56000);
    expect(r.breakdown.at(-1)).toEqual({ label: "Otras deducciones", amount: 56000 });
  });
  it("el desglose de CCSS suma el total de ccss", () => {
    const r = netSalary({ gross: 1500000 });
    const ccssRows = r.breakdown.slice(0, 3);
    expect(ccssRows.map((x) => x.label)).toEqual(["SEM 5,50%", "IVM 4,33%", "Banco Popular 1,00%"]);
    expect(ccssRows.reduce((s, x) => s + x.amount, 0)).toBe(r.ccss);
    expect(r.breakdown[3]).toEqual({ label: "Impuesto al salario", amount: 65850 });
  });
  it("tolera entradas vacías o inválidas", () => {
    const r = netSalary({ gross: "" });
    expect(r.neto).toBe(0);
    expect(r.ccss).toBe(0);
    expect(netSalary().neto).toBe(0);
  });
});

describe("netSalary quincenal", () => {
  it("750.000 por quincena = mitad del caso mensual de 1.500.000", () => {
    const r = netSalary({ gross: 750000, frequency: "quincenal" });
    expect(r.ccss).toBe(81225);
    expect(r.renta).toBe(32925);
    expect(r.neto).toBe(635850);
  });
  it("la renta usa los tramos mensuales: 500.000 por quincena sí paga renta", () => {
    // 1.000.000 mensual → 8.200 de renta → 4.100 por quincena
    const r = netSalary({ gross: 500000, frequency: "quincenal" });
    expect(r.renta).toBe(4100);
    expect(r.neto).toBe(500000 - 54150 - 4100);
  });
  it("los créditos también se parten entre 2", () => {
    const r = netSalary({ gross: 750000, frequency: "quincenal", children: 1 });
    expect(r.creditos).toBe(855);
    expect(r.renta).toBe(32925 - 855);
  });
});
