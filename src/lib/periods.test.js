import { describe, it, expect } from "vitest";
import {
  periodKeyFor, parsePeriodKey, periodLabel, monthLabel,
  prevPeriodKey, nextPeriodKey, periodDateRange, defaultDateFor,
  shiftMonth, halfOf, lastDayOfMonth, monthsBetween, halfLabel, halvesFor, quarterRange,
} from "./periods.js";

describe("periodKeyFor", () => {
  it("mensual usa el mes", () => {
    expect(periodKeyFor("2026-07-13", "mensual")).toBe("2026-07");
  });
  it("quincenal: día 1-15 es Q1, 16+ es Q2", () => {
    expect(periodKeyFor("2026-07-15", "quincenal")).toBe("2026-07-Q1");
    expect(periodKeyFor("2026-07-16", "quincenal")).toBe("2026-07-Q2");
  });
});

describe("parsePeriodKey", () => {
  it("distingue mensual de quincenal", () => {
    expect(parsePeriodKey("2026-07")).toEqual({ month: "2026-07", half: null });
    expect(parsePeriodKey("2026-07-Q2")).toEqual({ month: "2026-07", half: 2 });
  });
});

describe("periodLabel / monthLabel", () => {
  it("etiqueta legible en español", () => {
    expect(periodLabel("2026-07")).toBe("Julio 2026");
    expect(periodLabel("2026-07-Q1")).toBe("1ra quincena · Julio 2026");
    expect(monthLabel("2026-10")).toBe("Octubre 2026");
  });
});

describe("prev/nextPeriodKey", () => {
  it("mensual cruza el año", () => {
    expect(prevPeriodKey("2026-01")).toBe("2025-12");
    expect(nextPeriodKey("2025-12")).toBe("2026-01");
  });
  it("quincenal alterna Q1/Q2 y cruza mes y año", () => {
    expect(prevPeriodKey("2026-07-Q2")).toBe("2026-07-Q1");
    expect(prevPeriodKey("2026-07-Q1")).toBe("2026-06-Q2");
    expect(prevPeriodKey("2026-01-Q1")).toBe("2025-12-Q2");
    expect(nextPeriodKey("2026-07-Q1")).toBe("2026-07-Q2");
    expect(nextPeriodKey("2025-12-Q2")).toBe("2026-01-Q1");
  });
});

describe("periodDateRange", () => {
  it("mensual: mes completo con último día correcto", () => {
    expect(periodDateRange("2026-02")).toEqual({ start: "2026-02-01", end: "2026-02-28" });
    expect(periodDateRange("2024-02")).toEqual({ start: "2024-02-01", end: "2024-02-29" });
  });
  it("quincenal: 1-15 y 16-fin", () => {
    expect(periodDateRange("2026-07-Q1")).toEqual({ start: "2026-07-01", end: "2026-07-15" });
    expect(periodDateRange("2026-07-Q2")).toEqual({ start: "2026-07-16", end: "2026-07-31" });
  });
});

describe("defaultDateFor", () => {
  it("hoy si cae dentro del período, si no el inicio", () => {
    expect(defaultDateFor("2026-10", "2026-10-14")).toBe("2026-10-14");
    expect(defaultDateFor("2026-09", "2026-10-14")).toBe("2026-09-01");
    expect(defaultDateFor("2026-10-Q1", "2026-10-20")).toBe("2026-10-01");
  });
});

describe("shiftMonth", () => {
  it("suma y resta meses cruzando el año", () => {
    expect(shiftMonth("2026-10", 1)).toBe("2026-11");
    expect(shiftMonth("2026-10", 3)).toBe("2027-01");
    expect(shiftMonth("2026-01", -1)).toBe("2025-12");
    expect(shiftMonth("2026-10", -22)).toBe("2024-12");
    expect(shiftMonth("2026-10", 0)).toBe("2026-10");
  });
});

describe("halfOf", () => {
  it("1-15 es la 1ra quincena, 16-fin la 2da", () => {
    expect(halfOf("2026-10-01")).toBe(1);
    expect(halfOf("2026-10-15")).toBe(1);
    expect(halfOf("2026-10-16")).toBe(2);
    expect(halfOf("2026-10-31")).toBe(2);
  });
});

describe("lastDayOfMonth", () => {
  it("respeta bisiestos y meses de 30", () => {
    expect(lastDayOfMonth("2026-02")).toBe(28);
    expect(lastDayOfMonth("2028-02")).toBe(29);
    expect(lastDayOfMonth("2026-11")).toBe(30);
    expect(lastDayOfMonth("2026-12")).toBe(31);
  });
});

describe("monthsBetween", () => {
  it("devuelve b − a en meses, con signo", () => {
    expect(monthsBetween("2026-10", "2027-01")).toBe(3);
    expect(monthsBetween("2026-10", "2026-10")).toBe(0);
    expect(monthsBetween("2027-01", "2026-10")).toBe(-3);
    expect(monthsBetween("2026-11", "2027-11")).toBe(12);
  });
});

describe("halfLabel / halvesFor", () => {
  it("etiquetas de quincena", () => {
    expect(halfLabel(1)).toBe("1ra quincena");
    expect(halfLabel(2)).toBe("2da quincena");
    expect(halfLabel("ambas")).toBe("Ambas quincenas");
    expect(halfLabel(null)).toBe("");
  });
  it("quincenal tiene dos mitades, mensual una", () => {
    expect(halvesFor("quincenal")).toEqual([1, 2]);
    expect(halvesFor("mensual")).toEqual([1]);
    expect(halvesFor(undefined)).toEqual([1]);
  });
});

describe("quarterRange", () => {
  it("rango por quincena y mes completo", () => {
    expect(quarterRange("2026-10", 1)).toEqual({ start: "2026-10-01", end: "2026-10-15" });
    expect(quarterRange("2026-10", 2)).toEqual({ start: "2026-10-16", end: "2026-10-31" });
    expect(quarterRange("2026-02", 2)).toEqual({ start: "2026-02-16", end: "2026-02-28" });
    expect(quarterRange("2026-10", null)).toEqual({ start: "2026-10-01", end: "2026-10-31" });
  });
});
