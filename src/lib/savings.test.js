import { describe, it, expect } from "vitest";
import {
  placeBalance,
  savingsTotals,
  monthSavingsSummary,
  monthsCovered,
  nextMilestone,
  payrollSavingsCRC,
} from "./savings.js";

const RATE = 455;

const places = [
  { id: "bac", name: "Cuenta BAC", currency: "CRC", openingAmount: 290000, active: true },
  { id: "usd", name: "Cuenta $", currency: "USD", openingAmount: 200, active: true },
  { id: "old", name: "CDP viejo", currency: "CRC", openingAmount: 999999, active: false },
];

const ledger = [
  { id: "l1", placeId: "bac", type: "aporte", amount: 50000, currency: "CRC", kind: "planned", reserveId: null },
  { id: "l2", placeId: "bac", type: "aporte", amount: 50000, currency: "CRC", kind: "planned", reserveId: null },
  { id: "l3", placeId: "bac", type: "retiro", amount: 20000, currency: "CRC", kind: "expense", reserveId: null },
  { id: "l4", placeId: "bac", type: "aporte", amount: 30000, currency: "CRC", kind: "reserve", reserveId: "marchamo" },
  { id: "l5", placeId: "usd", type: "aporte", amount: 100, currency: "USD", kind: "extra", reserveId: null },
  { id: "l6", placeId: "usd", type: "aporte", amount: 50, currency: "USD", kind: "reserve", reserveId: "navidad" },
];

const annual = [
  { id: "marchamo", name: "Marchamo", amount: 180000, currency: "CRC", month: 11, active: true },
  { id: "navidad", name: "Navidad", amount: 150000, currency: "CRC", month: 12, active: true },
  { id: "viaje", name: "Viaje", amount: 500000, currency: "CRC", month: 7, active: false },
];

describe("placeBalance", () => {
  it("apertura + aportes − retiros en la moneda del lugar", () => {
    expect(placeBalance(places[0], ledger)).toBe(290000 + 50000 + 50000 - 20000 + 30000);
    expect(placeBalance(places[1], ledger)).toBe(200 + 100 + 50);
  });
  it("sin movimientos devuelve la apertura; sin lugar devuelve 0", () => {
    expect(placeBalance(places[0], [])).toBe(290000);
    expect(placeBalance(null, ledger)).toBe(0);
  });
});

describe("savingsTotals", () => {
  const t = savingsTotals({ places, ledger, annual, rate: RATE });
  it("ignora lugares inactivos y convierte a CRC", () => {
    expect(t.byPlace.map((b) => b.place.id)).toEqual(["bac", "usd"]);
    expect(t.totalCRC).toBe(400000 + 350 * RATE);
  });
  it("reservado = Σ por reserveId convertido a CRC, solo anuales activos", () => {
    expect(t.reservedByAnnual).toEqual([
      { annualId: "marchamo", name: "Marchamo", amount: 30000 },
      { annualId: "navidad", name: "Navidad", amount: 50 * RATE },
    ]);
    expect(t.reservedCRC).toBe(30000 + 50 * RATE);
    expect(t.freeCRC).toBe(t.totalCRC - t.reservedCRC);
  });
  it("una reserva pagada de más no queda negativa", () => {
    const l = [...ledger, { id: "x", placeId: "bac", type: "retiro", amount: 200000, currency: "CRC", kind: "reserve_pay", reserveId: "marchamo" }];
    const r = savingsTotals({ places, ledger: l, annual, rate: RATE });
    expect(r.reservedByAnnual[0].amount).toBe(0);
    expect(r.freeCRC).toBeGreaterThanOrEqual(0);
  });
  it("sin datos no da NaN", () => {
    const r = savingsTotals({});
    expect(r.totalCRC).toBe(0);
    expect(r.freeCRC).toBe(0);
    expect(r.byPlace).toEqual([]);
  });
});

describe("monthSavingsSummary", () => {
  const month = {
    savings: {
      perPerson: {
        p1: { q1: { planned: 50000, actual: 50000, ledgerId: "a" }, q2: { planned: 50000, actual: null } },
        p2: { q1: { planned: 50000, actual: 30000 }, q2: { planned: 50000, actual: 0 } },
      },
    },
  };
  const s = monthSavingsSummary(month);
  it("totales: planned, actual (null = 0) y pending de filas sin tocar", () => {
    expect(s.planned).toBe(200000);
    expect(s.actual).toBe(80000);
    expect(s.pending).toBe(50000);
  });
  it("estados por fila: done, pending, partial y el 0 explícito como partial con etiqueta", () => {
    const by = (p, h) => s.rows.find((r) => r.personId === p && r.half === h);
    expect(by("p1", 1)).toMatchObject({ state: "done", label: "Apartado", ledgerId: "a" });
    expect(by("p1", 2)).toMatchObject({ state: "pending", actual: null, label: "Pendiente" });
    expect(by("p2", 1)).toMatchObject({ state: "partial", label: "Parcial" });
    expect(by("p2", 2)).toMatchObject({ state: "partial", actual: 0, label: "Quedó en 0" });
  });
  it("mensual solo tiene q1; mes vacío no rompe", () => {
    const m = { savings: { perPerson: { p1: { q1: { planned: 100000, actual: null } } } } };
    expect(monthSavingsSummary(m).rows).toHaveLength(1);
    expect(monthSavingsSummary({}).rows).toEqual([]);
    expect(monthSavingsSummary(null).planned).toBe(0);
  });
});

describe("monthsCovered / nextMilestone", () => {
  it("meses cubiertos con 1 decimal, 0 si no hay promedio", () => {
    expect(monthsCovered(400000, 930000)).toBe(0.4);
    expect(monthsCovered(2000000, 930000)).toBe(2.2);
    expect(monthsCovered(400000, 0)).toBe(0);
  });
  it("siguiente hito 1 / 3 / 6 y faltante", () => {
    expect(nextMilestone(400000, 930000)).toEqual({ months: 1, missing: 530000 });
    expect(nextMilestone(1000000, 930000)).toEqual({ months: 3, missing: 1790000 });
    expect(nextMilestone(3000000, 930000)).toEqual({ months: 6, missing: 2580000 });
    expect(nextMilestone(6000000, 930000)).toEqual({ months: 6, missing: 0 });
    expect(nextMilestone(100, 0)).toEqual({ months: 1, missing: 0 });
  });
});

describe("payrollSavingsCRC", () => {
  const profile = {
    people: [
      { id: "p1", name: "Kevin", payrollSavings: { label: "Solidarista", amount: 56000, currency: "CRC" } },
      { id: "p2", name: "Ana", payrollSavings: { label: "Asociación", amount: 100, currency: "USD" } },
      { id: "p3", name: "Sin", payrollSavings: null },
    ],
  };
  it("monto mensual × meses cerrados, convertido a CRC", () => {
    expect(payrollSavingsCRC(profile, 3, RATE)).toBe(56000 * 3 + 100 * RATE * 3);
  });
  it("0 meses o sin perfil da 0", () => {
    expect(payrollSavingsCRC(profile, 0, RATE)).toBe(0);
    expect(payrollSavingsCRC(null, 5, RATE)).toBe(0);
  });
});
