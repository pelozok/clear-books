import { describe, it, expect } from "vitest";
import {
  monthKey, halfOf, shiftMonth, monthLabel, lastDayOfMonth, monthsBetween,
  halfLabel, halvesFor, quarterRange, periodDateRange, defaultDateFor,
  periodKeyFor, prevPeriodKey, nextPeriodKey, periodLabel, todayISO,
} from "./periods.js";

describe("periods: quincena 2 en meses de 31/30/28/29 días", () => {
  it("el fin de la 2da quincena es el último día real del mes", () => {
    expect(quarterRange("2026-12", 2)).toEqual({ start: "2026-12-16", end: "2026-12-31" });
    expect(quarterRange("2026-11", 2)).toEqual({ start: "2026-11-16", end: "2026-11-30" });
    expect(quarterRange("2027-02", 2)).toEqual({ start: "2027-02-16", end: "2027-02-28" });
    expect(quarterRange("2028-02", 2)).toEqual({ start: "2028-02-16", end: "2028-02-29" });
    expect(quarterRange("2100-02", 2).end).toBe("2100-02-28"); // 2100 no es bisiesto
    expect(quarterRange("2000-02", 2).end).toBe("2000-02-29");
  });
  it("halfOf en bordes: 15 → 1, 16 → 2, último día de febrero → 2", () => {
    expect(halfOf("2027-02-15")).toBe(1);
    expect(halfOf("2027-02-16")).toBe(2);
    expect(halfOf("2027-02-28")).toBe(2);
    expect(halfOf("2028-02-29")).toBe(2);
  });
  it("todos los meses del año tienen el último día correcto", () => {
    const dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    dias.forEach((d, i) => expect(lastDayOfMonth(`2027-${String(i + 1).padStart(2, "0")}`)).toBe(d));
  });
});

describe("periods: cruce de año 2026-12 → 2027-01", () => {
  it("shiftMonth y monthsBetween son inversos", () => {
    for (const d of [-25, -13, -12, -1, 0, 1, 2, 3, 11, 12, 13, 24]) {
      const m = shiftMonth("2026-12", d);
      expect(m).toMatch(/^\d{4}-\d{2}$/);
      expect(monthsBetween("2026-12", m)).toBe(d);
    }
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2027-01", -1)).toBe("2026-12");
  });
  it("reserva cuyo mes ya pasó: noviembre visto desde diciembre está a −1 (el próximo es +11)", () => {
    expect(monthsBetween("2026-12", "2026-11")).toBe(-1);
    expect(monthsBetween("2026-12", "2027-11")).toBe(11);
  });
  it("quincenas cruzan el año en ambos sentidos", () => {
    expect(nextPeriodKey("2026-12-Q2")).toBe("2027-01-Q1");
    expect(prevPeriodKey("2027-01-Q1")).toBe("2026-12-Q2");
    expect(periodKeyFor("2026-12-31", "quincenal")).toBe("2026-12-Q2");
    expect(periodKeyFor("2027-01-01", "quincenal")).toBe("2027-01-Q1");
    expect(periodLabel("2026-12-Q2")).toBe("2da quincena · Diciembre 2026");
    expect(monthLabel("2027-01")).toBe("Enero 2027");
  });
  it("defaultDateFor del 31 de diciembre en la 2da quincena", () => {
    expect(defaultDateFor("2026-12-Q2", "2026-12-31")).toBe("2026-12-31");
    expect(defaultDateFor("2027-01", "2026-12-31")).toBe("2027-01-01");
  });
});

describe("periods: mes parcial (arranque el 16)", () => {
  it("startedAt el 16 cae en la 2da quincena y el rango es 16-fin", () => {
    expect(halfOf("2026-10-16")).toBe(2);
    expect(monthKey("2026-10-16")).toBe("2026-10");
    expect(quarterRange("2026-10", halfOf("2026-10-16"))).toEqual({ start: "2026-10-16", end: "2026-10-31" });
  });
});

describe("periods: fijo 'ambas' y frecuencia mensual", () => {
  it("'ambas' se etiqueta y su rango es el mes completo", () => {
    expect(halfLabel("ambas")).toBe("Ambas quincenas");
    expect(quarterRange("2026-10", "ambas")).toEqual({ start: "2026-10-01", end: "2026-10-31" });
  });
  it("mensual solo tiene la quincena 1, aunque la frecuencia venga rara", () => {
    expect(halvesFor("mensual")).toEqual([1]);
    expect(halvesFor(null)).toEqual([1]);
    expect(halvesFor("Quincenal")).toEqual([1]);
  });
});

describe("periods: inputs como strings numéricos (select de un formulario)", () => {
  it("halfLabel y quarterRange aceptan '1' / '2'", () => {
    expect(halfLabel("1")).toBe("1ra quincena");
    expect(halfLabel("2")).toBe("2da quincena");
    expect(quarterRange("2026-11", "2")).toEqual({ start: "2026-11-16", end: "2026-11-30" });
    expect(quarterRange("2026-11", "1")).toEqual({ start: "2026-11-01", end: "2026-11-15" });
  });
  it("shiftMonth con delta string no concatena", () => {
    expect(shiftMonth("2026-12", "1")).toBe("2027-01");
    expect(shiftMonth("2026-01", "-1")).toBe("2025-12");
  });
  it("shiftMonth con delta inválido no devuelve 'NaN-NaN'", () => {
    expect(shiftMonth("2026-10", undefined)).toBe("2026-10");
    expect(shiftMonth("2026-10", NaN)).toBe("2026-10");
  });
  it("shiftMonth con delta fraccional trunca hacia cero (no inventa meses)", () => {
    expect(shiftMonth("2026-10", 1.9)).toBe("2026-11");
    expect(shiftMonth("2026-10", -1.9)).toBe("2026-09");
  });
});

describe("periods: entradas inválidas", () => {
  it("monthLabel de una clave inválida no imprime 'undefined'", () => {
    expect(monthLabel("2026-13")).toBe("");
    expect(monthLabel("2026-00")).toBe("");
    expect(monthLabel(null)).toBe("");
    expect(monthLabel(undefined)).toBe("");
  });
  it("halfLabel de valores desconocidos es vacío", () => {
    expect(halfLabel(undefined)).toBe("");
    expect(halfLabel(3)).toBe("");
    expect(halfLabel(0)).toBe("");
  });
  it("todayISO tiene forma YYYY-MM-DD", () => {
    expect(todayISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it("periodDateRange mensual de diciembre", () => {
    expect(periodDateRange("2026-12")).toEqual({ start: "2026-12-01", end: "2026-12-31" });
  });
});
