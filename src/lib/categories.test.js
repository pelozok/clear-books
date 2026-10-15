import { describe, expect, it } from "vitest";
import { categoryBreakdown, categoryTable, totalsByCategory } from "./categories.js";

const entries = [
  { categoryId: "super", amountCRC: 40000 },
  { categoryId: "super", amountCRC: 20000 },
  { categoryId: "gasolina", amountCRC: 25000 },
  { amountCRC: 15000 },
];

describe("categories", () => {
  it("suma por categoría, sin categoría va a otros", () => {
    expect(totalsByCategory(entries)).toEqual({ super: 60000, gasolina: 25000, otros: 15000 });
  });
  it("ordena, calcula % y compara con el mes anterior", () => {
    const rows = categoryBreakdown(entries, { super: 50000, comida: 9000 });
    expect(rows.map((r) => r.id)).toEqual(["super", "gasolina", "otros"]);
    expect(rows[0]).toMatchObject({ total: 60000, share: 0.6, prev: 50000, delta: 10000 });
    expect(rows[1]).toMatchObject({ prev: 0, delta: 25000 });
  });
  it("sin mes anterior no compara", () => {
    expect(categoryBreakdown(entries)[0].delta).toBeNull();
  });
  it("arma la tabla del historial", () => {
    const t = categoryTable([
      { id: "2026-11", byCategory: { super: 70000, cine: 5000 } },
      { id: "2026-10", byCategory: { super: 60000 } },
      { id: "2026-09" },
    ]);
    expect(t.months).toEqual(["2026-10", "2026-11"]);
    expect(t.rows[0]).toEqual({ id: "super", values: [60000, 70000], avg: 65000 });
    expect(t.rows[1].values).toEqual([0, 5000]);
    expect(t.totals).toEqual([60000, 75000]);
  });
});
