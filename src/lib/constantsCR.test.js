import { describe, it, expect } from "vitest";
import { CCSS_2026, RENTA_2026, RETENCION_INTERESES, TASAS_REFERENCIA, TASAS_LABELS } from "./constantsCR.js";

describe("CCSS_2026", () => {
  it("el total es la suma de SEM + IVM + Banco Popular", () => {
    expect(CCSS_2026.sem + CCSS_2026.ivm + CCSS_2026.bp).toBeCloseTo(CCSS_2026.total, 10);
    expect(CCSS_2026.total).toBe(0.1083);
  });
  it("trae vigencia y fuente", () => {
    expect(CCSS_2026.vigenteDesde).toBe("2026-01-01");
    expect(CCSS_2026.fuente).toMatch(/^https:\/\//);
  });
});

describe("RENTA_2026", () => {
  it("los tramos son crecientes, el último no tiene tope y ninguno es Infinity", () => {
    const { tramos } = RENTA_2026;
    expect(tramos).toHaveLength(5);
    for (let i = 1; i < tramos.length - 1; i++) {
      expect(tramos[i].hasta).toBeGreaterThan(tramos[i - 1].hasta);
      expect(tramos[i].tasa).toBeGreaterThan(tramos[i - 1].tasa);
    }
    expect(tramos.at(-1).hasta).toBeNull();
    expect(tramos.at(-1).tasa).toBe(0.25);
    expect(tramos.some((t) => t.hasta === Infinity)).toBe(false);
  });
  it("créditos mensuales por hijo y cónyuge", () => {
    expect(RENTA_2026.creditoHijo).toBe(1710);
    expect(RENTA_2026.creditoConyuge).toBe(2590);
    expect(RENTA_2026.fuente).toMatch(/^https:\/\//);
  });
});

describe("TASAS_REFERENCIA", () => {
  it("todas las tasas son fracciones entre 0 y 1", () => {
    for (const [k, v] of Object.entries(TASAS_REFERENCIA)) {
      if (typeof v !== "number") continue;
      expect(v, k).toBeGreaterThan(0);
      expect(v, k).toBeLessThan(1);
    }
  });
  it("las tarjetas no superan el tope de usura", () => {
    expect(TASAS_REFERENCIA.tarjetaCRC).toBeLessThanOrEqual(TASAS_REFERENCIA.topeUsuraCRC);
    expect(TASAS_REFERENCIA.tarjetaUSD).toBeLessThanOrEqual(TASAS_REFERENCIA.topeUsuraUSD);
  });
  it("cada tasa numérica tiene etiqueta en español", () => {
    for (const [k, v] of Object.entries(TASAS_REFERENCIA)) {
      if (typeof v === "number") expect(TASAS_LABELS[k], k).toBeTruthy();
    }
  });
  it("retención sobre intereses es 15%", () => {
    expect(RETENCION_INTERESES).toBe(0.15);
  });
});
