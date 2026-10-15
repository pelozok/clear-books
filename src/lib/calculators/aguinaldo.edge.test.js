import { describe, it, expect } from "vitest";
import { aguinaldo, aguinaldoEstimate } from "./aguinaldo.js";

describe("aguinaldo: bordes", () => {
  it("mes parcial (entró a mitad de mes): el salario proporcional entra tal cual", () => {
    // Entró el 16 de junio: junio vale media quincena de salario + 6 meses completos
    const salaries = [500000, ...Array(5).fill(1000000)];
    expect(aguinaldo({ salaries })).toBe(Math.round(5500000 / 12));
  });
  it("strings numéricos se aceptan; booleanos, arrays, Infinity y NaN no suman", () => {
    expect(aguinaldo({ salaries: ["1200000", true, [5], Infinity, NaN] })).toBe(100000);
  });
  it("salaries que no es arreglo → 0", () => {
    expect(aguinaldo({ salaries: "1000000" })).toBe(0);
    expect(aguinaldo({ salaries: null })).toBe(0);
  });
  it("redondea a colón entero (mitad hacia arriba)", () => {
    expect(aguinaldo({ salaries: [6] })).toBe(1); // 0,5
    expect(aguinaldo({ salaries: [5] })).toBe(0); // 0,4166
  });
});

describe("aguinaldoEstimate: entradas de formulario", () => {
  it("monthsWorked null o vacío = año completo (no 0)", () => {
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: null })).toBe(1000000);
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: "" })).toBe(1000000);
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: "abc" })).toBe(1000000);
  });
  it("monthsWorked 0 explícito → 0", () => {
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: 0 })).toBe(0);
    expect(aguinaldoEstimate({ monthlyGross: 1000000, monthsWorked: "0" })).toBe(0);
  });
  it("strings numéricos y salario en USD convertido", () => {
    expect(aguinaldoEstimate({ monthlyGross: "600000", monthsWorked: "6" })).toBe(300000);
    expect(aguinaldoEstimate({ monthlyGross: 2000 * 454.56 })).toBe(909120);
  });
  it("Infinity o NaN en el bruto → 0, nunca NaN", () => {
    expect(aguinaldoEstimate({ monthlyGross: Infinity })).toBe(0);
    expect(aguinaldoEstimate({ monthlyGross: NaN, monthsWorked: Infinity })).toBe(0);
  });
});
