import { describe, it, expect } from "vitest";
import {
  periodKeyFor, parsePeriodKey, periodLabel,
  prevPeriodKey, nextPeriodKey, periodDateRange,
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

describe("periodLabel", () => {
  it("etiqueta legible en español", () => {
    expect(periodLabel("2026-07")).toBe("Julio 2026");
    expect(periodLabel("2026-07-Q1")).toBe("1ra quincena · Julio 2026");
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
