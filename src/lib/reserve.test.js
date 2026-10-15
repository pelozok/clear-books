import { describe, it, expect } from "vitest";
import {
  monthsUntilInclusive,
  annualQuota,
  reservedByAnnual,
  reserveBreakdown,
  firstYearSuggestion,
} from "./reserve.js";

const marchamo = { id: "a1", name: "Marchamo", amount: 180000, currency: "CRC", month: 11, startsFrom: null, firstYear: null, lastPaidYear: null, active: true };
const navidad = { id: "a2", name: "Navidad", amount: 240000, currency: "CRC", month: 12, startsFrom: null, firstYear: null, lastPaidYear: null, active: true };

describe("monthsUntilInclusive", () => {
  it("cuenta el mes actual como uno", () => {
    expect(monthsUntilInclusive("2026-10", 11)).toBe(2);
    expect(monthsUntilInclusive("2026-10", 12)).toBe(3);
    expect(monthsUntilInclusive("2026-11", 11)).toBe(1);
    expect(monthsUntilInclusive("2026-12", 12)).toBe(1);
  });
  it("si el mes objetivo ya pasó, salta al próximo año", () => {
    expect(monthsUntilInclusive("2026-12", 11)).toBe(12);
    expect(monthsUntilInclusive("2027-01", 11)).toBe(11);
    expect(monthsUntilInclusive("2027-01", 12)).toBe(12);
  });
});

describe("annualQuota", () => {
  it("arranque en 2026-10: marchamo ÷2, Navidad ÷3", () => {
    expect(annualQuota(marchamo, "2026-10", 0)).toBe(90000);
    expect(annualQuota(navidad, "2026-10", 0)).toBe(80000);
  });
  it("noviembre: marchamo ÷1 descontando lo ya apartado", () => {
    expect(annualQuota(marchamo, "2026-11", 90000)).toBe(90000);
    expect(annualQuota(navidad, "2026-11", 80000)).toBe(80000);
  });
  it("diciembre: Navidad ÷1 y marchamo ya cuenta ÷12 para el próximo año", () => {
    expect(annualQuota(navidad, "2026-12", 160000)).toBe(80000);
    expect(annualQuota(marchamo, "2026-12", 0)).toBe(15000);
  });
  it("nunca Infinity ni NaN", () => {
    for (const m of ["2026-10", "2026-11", "2026-12", "2027-01", "2027-11"]) {
      for (const it of [marchamo, navidad]) {
        const q = annualQuota(it, m, 0);
        expect(Number.isFinite(q)).toBe(true);
      }
    }
    expect(Number.isFinite(annualQuota({ ...marchamo, amount: undefined }, "2026-10"))).toBe(true);
  });
  it("es 0 antes de startsFrom y si está inactiva", () => {
    const aparte = { ...marchamo, startsFrom: "2027-01", firstYear: "cubierto-aparte" };
    expect(annualQuota(aparte, "2026-10", 0)).toBe(0);
    expect(annualQuota(aparte, "2026-12", 0)).toBe(0);
    expect(annualQuota(aparte, "2027-01", 0)).toBe(Math.round(180000 / 11));
    expect(annualQuota({ ...marchamo, active: false }, "2026-10", 0)).toBe(0);
  });
  it("si ya está cubierta, la cuota es 0 (no negativa)", () => {
    expect(annualQuota(marchamo, "2026-10", 200000)).toBe(0);
  });
  it("si ya se pagó este año y el mes aún no pasa, apunta al próximo ciclo", () => {
    const pagado = { ...marchamo, lastPaidYear: 2026 };
    expect(annualQuota(pagado, "2026-11", 0)).toBe(Math.round(180000 / 13));
  });
});

describe("reservedByAnnual / reserveBreakdown", () => {
  const ledger = [
    { reserveId: "a1", type: "aporte", amount: 90000 },
    { reserveId: "a2", type: "aporte", amount: 80000 },
    { reserveId: "a2", type: "retiro", amount: 20000 },
    { reserveId: null, type: "aporte", amount: 50000 }, // ahorro normal, no cuenta
  ];
  it("suma aportes menos retiros por reserveId", () => {
    expect(reservedByAnnual(ledger)).toEqual({ a1: 90000, a2: 60000 });
  });
  it("arma el desglose y la cuota total", () => {
    const r = reserveBreakdown([marchamo, navidad], "2026-11", ledger);
    expect(r.breakdown).toHaveLength(2);
    expect(r.breakdown[0]).toMatchObject({ annualId: "a1", name: "Marchamo", quota: 90000, reserved: 90000, amount: 180000, monthsLeft: 1 });
    expect(r.breakdown[1]).toMatchObject({ annualId: "a2", quota: 90000, reserved: 60000, monthsLeft: 2 });
    expect(r.quota).toBe(180000);
    expect(r.paysThisMonth).toEqual(["a1"]);
  });
  it("ignora inactivas y convierte USD con el TC", () => {
    const viaje = { id: "a3", name: "Viaje", amount: 1000, currency: "USD", month: 6, active: true };
    const r = reserveBreakdown([{ ...marchamo, active: false }, viaje], "2027-01", [], 500);
    expect(r.breakdown).toHaveLength(1);
    expect(r.breakdown[0].quota).toBe(166.67); // dólares con centavos
    expect(r.quota).toBe(Math.round(166.67 * 500));
  });
  it("sin items devuelve ceros", () => {
    expect(reserveBreakdown([], "2026-10", [])).toEqual({ quota: 0, breakdown: [], paysThisMonth: [] });
  });
  it("no marca paysThisMonth si ya se pagó este año", () => {
    const r = reserveBreakdown([{ ...marchamo, lastPaidYear: 2026 }], "2026-11", []);
    expect(r.paysThisMonth).toEqual([]);
  });
});

describe("firstYearSuggestion", () => {
  const base = 100000; // ₡50.000 por quincena por persona → ₡100.000 al mes
  it("≤ 2 meses → cubierto aparte", () => {
    expect(firstYearSuggestion(marchamo, "2026-10", base)).toBe("cubierto-aparte");
    expect(firstYearSuggestion(marchamo, "2026-11", base)).toBe("cubierto-aparte");
  });
  it("cuota mayor al 50% del ahorro base → cubierto aparte", () => {
    // Navidad en octubre: 240.000 / 3 = 80.000 > 50.000
    expect(firstYearSuggestion(navidad, "2026-10", base)).toBe("cubierto-aparte");
  });
  it("cuota cómoda y tiempo de sobra → reservar", () => {
    // Marchamo desde enero: 180.000 / 11 ≈ 16.364 < 50.000
    expect(firstYearSuggestion(marchamo, "2027-01", base)).toBe("reservar");
  });
  it("sin ahorro base, cualquier cuota es demasiado", () => {
    expect(firstYearSuggestion(marchamo, "2027-01", 0)).toBe("cubierto-aparte");
  });
});
