// Casos borde de reserve.js: inputs sucios, monedas mezcladas, cruces de año.
import { describe, it, expect } from "vitest";
import { monthsUntilInclusive, annualQuota, reserveBreakdown, firstYearSuggestion } from "./reserve.js";
import { DEFAULT_RATE } from "./exchange.js";

const marchamo = { id: "a1", name: "Marchamo", amount: 180000, currency: "CRC", month: 11, startsFrom: null, firstYear: null, lastPaidYear: null, active: true };
const navidad = { id: "a2", name: "Navidad", amount: 240000, currency: "CRC", month: 12, startsFrom: null, firstYear: null, lastPaidYear: null, active: true };
const viajeUSD = { id: "a3", name: "Viaje", amount: 1200, currency: "USD", month: 6, startsFrom: null, lastPaidYear: null, active: true };
const finite = (n) => typeof n === "number" && Number.isFinite(n);

describe("monthsUntilInclusive · bordes", () => {
  it("cruce de año 2026-12 → 2027-01", () => {
    expect(monthsUntilInclusive("2026-12", 1)).toBe(2);
    expect(monthsUntilInclusive("2027-01", 1)).toBe(1);
    expect(monthsUntilInclusive("2026-02", 1)).toBe(12);
  });
  it("siempre entre 1 y 12 para los 144 pares mes/objetivo", () => {
    for (let m = 1; m <= 12; m++) {
      for (let t = 1; t <= 12; t++) {
        const n = monthsUntilInclusive(`2026-${String(m).padStart(2, "0")}`, t);
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(12);
      }
    }
  });
  it("acepta el mes objetivo como string numérico", () => {
    expect(monthsUntilInclusive("2026-10", "11")).toBe(2);
    expect(monthsUntilInclusive("2026-12", "11")).toBe(12);
  });
  it("objetivo inválido o clave inválida: número finito ≥ 1, nunca NaN", () => {
    for (const t of [undefined, null, NaN, 0, 13, -1, "abc", 2.5]) {
      const n = monthsUntilInclusive("2026-10", t);
      expect(finite(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(1);
    }
    for (const k of [undefined, null, "", "basura"]) {
      expect(finite(monthsUntilInclusive(k, 11))).toBe(true);
    }
  });
});

describe("annualQuota · bordes", () => {
  it("item sin mes o con mes inválido: 0, nunca NaN", () => {
    for (const month of [undefined, null, 0, 13, "x", NaN]) {
      expect(annualQuota({ ...marchamo, month }, "2026-10", 0)).toBe(0);
    }
  });
  it("item null/undefined o clave de mes inválida: 0", () => {
    expect(annualQuota(null, "2026-10")).toBe(0);
    expect(annualQuota(undefined, "2026-10")).toBe(0);
    expect(annualQuota(marchamo, undefined)).toBe(0);
    expect(annualQuota(marchamo, null)).toBe(0);
  });
  it("strings numéricos en amount, month y reservedSoFar", () => {
    expect(annualQuota({ ...marchamo, amount: "180000", month: "11" }, "2026-10", "90000")).toBe(45000);
  });
  it("reservado negativo (se pagó más de lo apartado) no infla la cuota", () => {
    // Pagaron ₡200.000 con ₡180.000 apartados: el libro queda en −20.000.
    expect(annualQuota(marchamo, "2026-12", -20000)).toBe(15000);
  });
  it("amount negativo, NaN o Infinity: 0", () => {
    expect(annualQuota({ ...marchamo, amount: -5000 }, "2026-10")).toBe(0);
    expect(annualQuota({ ...marchamo, amount: NaN }, "2026-10")).toBe(0);
    expect(annualQuota({ ...marchamo, amount: Infinity }, "2026-10")).toBe(0);
    expect(Number.isFinite(annualQuota(marchamo, "2026-10", Infinity))).toBe(true);
    expect(annualQuota(marchamo, "2026-10", NaN)).toBe(90000);
  });
  it("redondeo a colones enteros (₡100.000 ÷ 3)", () => {
    expect(annualQuota({ ...marchamo, amount: 100000, month: 12 }, "2026-10")).toBe(33333);
  });
  it("reserva en USD: cuota en dólares con centavos", () => {
    // $1.200 en junio desde enero: ÷6 = $200; $1.000 ÷ 6 = $166,67
    expect(annualQuota(viajeUSD, "2027-01")).toBe(200);
    expect(annualQuota({ ...viajeUSD, amount: 1000 }, "2027-01")).toBe(166.67);
  });
  it("mes de pago ya pasó este año: apunta al del próximo (dic → nov = ÷12)", () => {
    expect(annualQuota(marchamo, "2026-12", 0)).toBe(15000);
    expect(annualQuota(navidad, "2027-01", 0)).toBe(20000);
  });
  it("lastPaidYear como string se respeta igual que número", () => {
    expect(annualQuota({ ...marchamo, lastPaidYear: "2026" }, "2026-11", 0)).toBe(Math.round(180000 / 13));
  });
  it("lastPaidYear del año anterior no altera el ciclo", () => {
    expect(annualQuota({ ...marchamo, lastPaidYear: 2025 }, "2026-11", 90000)).toBe(90000);
  });
  it("startsFrom igual al mes actual ya aplica; cruce 2026-12 → 2027-01", () => {
    const aparte = { ...marchamo, startsFrom: "2027-01" };
    expect(annualQuota(aparte, "2026-12")).toBe(0);
    expect(annualQuota(aparte, "2027-01")).toBe(16364);
  });
});

describe("reserveBreakdown · bordes", () => {
  it("contrato del SPEC (3 args) con reserva en USD usa el TC por defecto, no 1", () => {
    const r = reserveBreakdown([viajeUSD], "2027-01", []);
    expect(r.quota).toBe(200 * DEFAULT_RATE.venta);
  });
  it("TC inválido (0, NaN, string vacío, negativo) cae al TC por defecto", () => {
    for (const bad of [0, NaN, "", -455, null]) {
      expect(reserveBreakdown([viajeUSD], "2027-01", [], bad).quota).toBe(200 * DEFAULT_RATE.venta);
    }
  });
  it("TC como string numérico", () => {
    expect(reserveBreakdown([viajeUSD], "2027-01", [], "500").quota).toBe(100000);
  });
  it("aporte en ₡ a una reserva en $ se convierte antes de descontar", () => {
    // ₡91.000 a 455 = $200 apartados; faltan $1.000 en 5 meses (feb → jun) = $200
    const ledger = [{ reserveId: "a3", type: "aporte", amount: 91000, currency: "CRC" }];
    const r = reserveBreakdown([viajeUSD], "2027-02", ledger, 455);
    expect(r.breakdown[0].reserved).toBe(200);
    expect(r.breakdown[0].quota).toBe(200);
    expect(r.quota).toBe(91000);
  });
  it("aporte en $ a una reserva en ₡ se convierte antes de descontar", () => {
    // $100 a 450 = ₡45.000 apartados para el marchamo; faltan ₡135.000 en nov ÷1
    const ledger = [{ reserveId: "a1", type: "aporte", amount: 100, currency: "USD" }];
    const r = reserveBreakdown([marchamo], "2026-11", ledger, 450);
    expect(r.breakdown[0].reserved).toBe(45000);
    expect(r.breakdown[0].quota).toBe(135000);
  });
  it("retiro mayor que lo apartado: reserved 0, cuota del ciclo completo", () => {
    const ledger = [
      { reserveId: "a1", type: "aporte", amount: 180000, currency: "CRC" },
      { reserveId: "a1", type: "retiro", amount: 200000, currency: "CRC", kind: "reserve_pay" },
    ];
    const r = reserveBreakdown([marchamo], "2026-12", ledger);
    expect(r.breakdown[0].reserved).toBe(0);
    expect(r.breakdown[0].quota).toBe(15000);
  });
  it("mes de pago como string sí entra en paysThisMonth", () => {
    const r = reserveBreakdown([{ ...marchamo, month: "11" }], "2026-11", []);
    expect(r.paysThisMonth).toEqual(["a1"]);
  });
  it("lastPaidYear como string excluye de paysThisMonth", () => {
    const r = reserveBreakdown([{ ...marchamo, lastPaidYear: "2026" }], "2026-11", []);
    expect(r.paysThisMonth).toEqual([]);
  });
  it("items y ledger nulos o con basura no rompen ni dan NaN", () => {
    const r = reserveBreakdown([null, undefined, { ...marchamo, amount: "abc" }], "2026-10", [null, { reserveId: "a1", amount: "x" }]);
    expect(finite(r.quota)).toBe(true);
    expect(r.breakdown.every((b) => finite(b.quota) && finite(b.reserved))).toBe(true);
    expect(reserveBreakdown(null, "2026-10", null)).toEqual({ quota: 0, breakdown: [], paysThisMonth: [] });
  });
  it("filas sin undefined (Firestore no los acepta)", () => {
    const r = reserveBreakdown([{ month: 11, amount: 1000, active: true }], "2026-10", []);
    for (const v of Object.values(r.breakdown[0])) expect(v).not.toBeUndefined();
  });
  it("cuota total = Σ cuotas de filas (CRC), sin NaN en meses de todo el año", () => {
    for (let m = 1; m <= 12; m++) {
      const key = `2027-${String(m).padStart(2, "0")}`;
      const r = reserveBreakdown([marchamo, navidad], key, []);
      expect(r.quota).toBe(r.breakdown.reduce((s, b) => s + b.quota, 0));
      expect(finite(r.quota)).toBe(true);
    }
  });
});

describe("firstYearSuggestion · bordes", () => {
  it("reserva en USD se compara en colones", () => {
    // $1.200 desde enero a junio: $200/mes ≈ ₡91.000 > 50% de ₡100.000
    expect(firstYearSuggestion(viajeUSD, "2027-01", 100000, 455)).toBe("cubierto-aparte");
    // sin TC explícito usa el TC por defecto, no 1
    expect(firstYearSuggestion(viajeUSD, "2027-01", 100000)).toBe("cubierto-aparte");
  });
  it("cuota exactamente en el 50% → reservar (solo 'más de la mitad' es aparte)", () => {
    // ₡150.000 ÷ 3 = ₡50.000 = 50% de ₡100.000
    expect(firstYearSuggestion({ ...navidad, amount: 150000 }, "2026-10", 100000)).toBe("reservar");
  });
  it("ahorro base como string numérico", () => {
    expect(firstYearSuggestion(marchamo, "2027-01", "100000")).toBe("reservar");
  });
  it("mes inválido o item nulo: no revienta y devuelve un valor válido", () => {
    expect(["cubierto-aparte", "reservar"]).toContain(firstYearSuggestion({ ...marchamo, month: undefined }, "2026-10", 100000));
    expect(["cubierto-aparte", "reservar"]).toContain(firstYearSuggestion(null, "2026-10", 100000));
  });
});
