import { describe, it, expect } from "vitest";
import { monthlyShare, monthsUntilDue, nextDueMonthKey } from "./prorate.js";

describe("monthsUntilDue", () => {
  it("cuenta inclusive: de octubre a noviembre son 2 meses", () => {
    expect(monthsUntilDue({ dueMonth: 11, fromMonthKey: "2026-10" })).toBe(2);
  });
  it("el mismo mes es 1 (nunca 0)", () => {
    expect(monthsUntilDue({ dueMonth: 11, fromMonthKey: "2026-11" })).toBe(1);
  });
  it("si ya pasó, salta al próximo año", () => {
    expect(monthsUntilDue({ dueMonth: 11, fromMonthKey: "2026-12" })).toBe(12);
    expect(monthsUntilDue({ dueMonth: 3, fromMonthKey: "2026-10" })).toBe(6);
  });
  it("acepta fromMonth como alias y tolera entradas inválidas", () => {
    expect(monthsUntilDue({ dueMonth: 11, fromMonth: "2026-10" })).toBe(2);
    expect(monthsUntilDue({ dueMonth: 11, fromMonthKey: "" })).toBe(12);
    expect(monthsUntilDue({ dueMonth: 0, fromMonthKey: "2026-10" })).toBe(12);
    expect(monthsUntilDue({ dueMonth: 99, fromMonthKey: "2026-10" })).toBe(12);
  });
});

describe("nextDueMonthKey", () => {
  it("este año si todavía no pasó, el siguiente si ya pasó", () => {
    expect(nextDueMonthKey({ dueMonth: 11, fromMonthKey: "2026-10" })).toBe("2026-11");
    expect(nextDueMonthKey({ dueMonth: 11, fromMonthKey: "2026-11" })).toBe("2026-11");
    expect(nextDueMonthKey({ dueMonth: 11, fromMonthKey: "2026-12" })).toBe("2027-11");
    expect(nextDueMonthKey({ dueMonth: 3, fromMonthKey: "" })).toBeNull();
  });
});

describe("monthlyShare", () => {
  it("marchamo de 180.000 en noviembre, visto desde octubre → 90.000", () => {
    expect(monthlyShare({ amount: 180000, dueMonth: 11, fromMonthKey: "2026-10" })).toBe(90000);
  });
  it("visto desde diciembre, se reparte en 12 meses", () => {
    expect(monthlyShare({ amount: 180000, dueMonth: 11, fromMonthKey: "2026-12" })).toBe(15000);
  });
  it("en el mismo mes es el monto completo", () => {
    expect(monthlyShare({ amount: 180000, dueMonth: 11, fromMonthKey: "2026-11" })).toBe(180000);
  });
  it("redondea hacia arriba para que la suma no quede corta", () => {
    const share = monthlyShare({ amount: 100000, dueMonth: 12, fromMonthKey: "2026-10" });
    expect(share).toBe(33334);
    expect(share * 3).toBeGreaterThanOrEqual(100000);
  });
  it("nunca divide entre 0 ni devuelve NaN", () => {
    expect(monthlyShare({ amount: 180000, dueMonth: 5, fromMonthKey: "nada" })).toBe(15000);
    expect(monthlyShare({ amount: "", dueMonth: 11, fromMonthKey: "2026-10" })).toBe(0);
    expect(Number.isFinite(monthlyShare({}))).toBe(true);
  });
});
