import { describe, it, expect } from "vitest";
import { netSalary, rentaMensual } from "./netSalary.js";
import { RENTA_2026 } from "../constantsCR.js";

const sumBreakdown = (r) => r.breakdown.reduce((s, x) => s + x.amount, 0);
const ccssRows = (r) => r.breakdown.slice(0, 3).reduce((s, x) => s + x.amount, 0);

describe("netSalary: el desglose cuadra con el neto", () => {
  it("SEM + IVM + BP suman exactamente ccss en salarios no redondos (mensual y quincenal)", () => {
    for (const gross of [300005, 345678, 1000001, 1234567, 999999, 7, 15]) {
      for (const frequency of ["mensual", "quincenal"]) {
        const r = netSalary({ gross, frequency });
        expect(ccssRows(r), `${gross} ${frequency}`).toBe(r.ccss);
        expect(r.gross - sumBreakdown(r), `${gross} ${frequency}`).toBe(r.neto);
      }
    }
  });
  it("barrido: gross − Σ desglose = neto para 2.000 salarios seguidos", () => {
    for (let g = 1346000; g < 1348000; g++) {
      const r = netSalary({ gross: g, children: 1 });
      expect(r.gross - sumBreakdown(r)).toBe(r.neto);
    }
  });
});

describe("netSalary: bordes de tramo", () => {
  it("918.000 exacto no paga renta; 918.001 paga 0,10 → redondea a 0", () => {
    expect(netSalary({ gross: 918000 }).renta).toBe(0);
    expect(netSalary({ gross: 918001 }).rentaBruta).toBe(0);
    expect(netSalary({ gross: 918010 }).rentaBruta).toBe(1);
  });
  it("en cada tope de tramo el impuesto es continuo (sin saltos)", () => {
    for (const { hasta } of RENTA_2026.tramos.filter((t) => t.hasta)) {
      const a = rentaMensual(hasta);
      const b = rentaMensual(hasta + 1);
      expect(b - a).toBeGreaterThanOrEqual(0);
      expect(b - a).toBeLessThanOrEqual(0.25 + 1e-9);
    }
  });
});

describe("netSalary quincenal", () => {
  it("Q1 + Q2 = mensual con diferencia de a lo sumo 1 colón por concepto (meses de 28, 30 o 31 días dan igual)", () => {
    for (const monthly of [1000000, 1500001, 2364003, 600000]) {
      const m = netSalary({ gross: monthly });
      const q = netSalary({ gross: monthly / 2, frequency: "quincenal" });
      expect(Math.abs(q.ccss * 2 - m.ccss)).toBeLessThanOrEqual(1);
      expect(Math.abs(q.renta * 2 - m.renta)).toBeLessThanOrEqual(1);
      expect(Math.abs(q.neto * 2 - m.neto)).toBeLessThanOrEqual(2);
    }
  });
  it("frecuencia desconocida o null se trata como mensual", () => {
    expect(netSalary({ gross: 1000000, frequency: null }).renta).toBe(8200);
    expect(netSalary({ gross: 1000000, frequency: "semanal" }).renta).toBe(8200);
  });
});

describe("netSalary: salario en USD", () => {
  it("convertido con el TC venta da lo mismo que el bruto en colones", () => {
    const venta = 454.56;
    const usd = 3300;
    const r = netSalary({ gross: Math.round(usd * venta) });
    expect(r.gross).toBe(1500048);
    expect(Number.isFinite(r.neto)).toBe(true);
    expect(r.renta).toBe(Math.round(42900 + (1500048 - 1347000) * 0.15));
  });
});

describe("netSalary: déficit y entradas basura", () => {
  it("si las otras deducciones no caben, neto 0 y el faltante se informa", () => {
    const r = netSalary({ gross: 500000, otherDeductions: 600000 });
    expect(r.neto).toBe(0);
    expect(r.deficit).toBe(54150 + 600000 - 500000);
  });
  it("sin déficit, deficit es 0", () => {
    expect(netSalary({ gross: 1000000, otherDeductions: 56000 }).deficit).toBe(0);
  });
  it("spouse como string 'false' NO aplica el crédito; 'true' sí", () => {
    expect(netSalary({ gross: 1500000, spouse: "false" }).creditos).toBe(0);
    expect(netSalary({ gross: 1500000, spouse: "true" }).creditos).toBe(2590);
  });
  it("strings numéricos funcionan; booleanos, arrays, NaN e Infinity cuentan como 0", () => {
    expect(netSalary({ gross: "1500000", children: "2" }).creditos).toBe(3420);
    for (const gross of [true, [1500000], NaN, Infinity, -Infinity, null, undefined, {}]) {
      const r = netSalary({ gross });
      expect(r.gross, String(gross)).toBe(0);
      expect(r.neto).toBe(0);
      expect(Object.values(r).filter((v) => typeof v === "number").every(Number.isFinite)).toBe(true);
    }
  });
  it("hijos fraccionados o negativos no dan créditos raros", () => {
    expect(netSalary({ gross: 1500000, children: 1.9 }).creditos).toBe(1710);
    expect(netSalary({ gross: 1500000, children: -3 }).creditos).toBe(0);
  });
  it("créditos enormes se topan en el impuesto (renta nunca negativa)", () => {
    const r = netSalary({ gross: 1000000, children: 100, spouse: true });
    expect(r.renta).toBe(0);
    expect(r.creditos).toBe(r.rentaBruta);
  });
  it("otherDeductions negativo no suma al neto", () => {
    expect(netSalary({ gross: 1000000, otherDeductions: -50000 }).neto).toBe(883500);
  });
});
