import { describe, it, expect } from "vitest";
import { aguinaldo, aguinaldoEstimate, AGUINALDO_INFO } from "./aguinaldo.js";

describe("aguinaldo", () => {
  it("12 salarios iguales → un salario completo", () => {
    expect(aguinaldo({ salaries: Array(12).fill(1000000) })).toBe(1000000);
  });
  it("promedia salarios distintos (aumento en el año)", () => {
    const salaries = [...Array(11).fill(1000000), 1500000];
    expect(aguinaldo({ salaries })).toBe(1041667);
  });
  it("menos de 12 meses: los que faltan cuentan como 0", () => {
    expect(aguinaldo({ salaries: Array(6).fill(1000000) })).toBe(500000);
  });
  it("más de 12 valores: usa los primeros 12", () => {
    expect(aguinaldo({ salaries: Array(15).fill(600000) })).toBe(600000);
  });
  it("ignora valores inválidos y tolera lista vacía", () => {
    expect(aguinaldo({ salaries: [1200000, "", null, "abc"] })).toBe(100000);
    expect(aguinaldo({})).toBe(0);
    expect(aguinaldo()).toBe(0);
  });
});

describe("aguinaldoEstimate", () => {
  it("año completo → un salario", () => {
    expect(aguinaldoEstimate({ monthlyGross: 1000000 })).toBe(1000000);
  });
  it("medio año → medio salario", () => {
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: 6 })).toBe(500000);
  });
  it("admite meses fraccionados", () => {
    expect(aguinaldoEstimate({ monthlyGross: 600000, monthsWorked: 10.5 })).toBe(525000);
  });
  it("acota meses a 0..12 y bruto a ≥ 0", () => {
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: 14 })).toBe(1000000);
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: -3 })).toBe(0);
    expect(aguinaldoEstimate({ monthlyGross: -5 })).toBe(0);
  });
  it("documenta que está exento de renta y CCSS", () => {
    expect(AGUINALDO_INFO.exentoRenta).toBe(true);
    expect(AGUINALDO_INFO.exentoCCSS).toBe(true);
  });
});
