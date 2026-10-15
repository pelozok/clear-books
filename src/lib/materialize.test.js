import { describe, it, expect } from "vitest";
import { materializeMonth } from "./materialize.js";

// Cifras de prueba (no las del machote): ₡1.000.000 / ₡600.000, fijos ₡930.000,
// ahorro ₡50.000 por quincena por persona.
const people = [
  { id: "p1", name: "Kevin", incomeCRC: 1000000, incomeUSD: 0, savingsPerPeriod: 50000, payrollSavings: null },
  { id: "p2", name: "Ana", incomeCRC: 600000, incomeUSD: 0, savingsPerPeriod: 50000, payrollSavings: null },
];
const profileQ = { mode: "pareja", frequency: "quincenal", people, splitRule: "igual_sobrante", exchangeRateDefault: 455 };
const profileM = { ...profileQ, frequency: "mensual" };

const recurring = [
  { id: "r1", name: "Alquiler", amount: 350000, currency: "CRC", half: 1, isDebt: false, cuotasRestantes: null, order: 0, active: true },
  { id: "r2", name: "Luz", amount: 60000, currency: "CRC", half: 2, isDebt: false, cuotasRestantes: null, order: 1, active: true },
  { id: "r3", name: "Internet", amount: 40000, currency: "CRC", half: "ambas", isDebt: false, cuotasRestantes: null, order: 2, active: true },
  { id: "r4", name: "Carro", amount: 480000, currency: "CRC", half: 2, isDebt: true, cuotasRestantes: 8, order: 3, active: true },
  { id: "r5", name: "Gimnasio", amount: 25000, currency: "CRC", half: 1, isDebt: false, cuotasRestantes: null, order: 4, active: false },
  { id: "r6", name: "Préstamo viejo", amount: 90000, currency: "CRC", half: 1, isDebt: true, cuotasRestantes: 0, order: 5, active: true },
];
const annual = [
  { id: "a1", name: "Marchamo", amount: 180000, currency: "CRC", month: 11, startsFrom: "2027-01", firstYear: "cubierto-aparte", lastPaidYear: null, active: true },
  { id: "a2", name: "Navidad", amount: 240000, currency: "CRC", month: 12, startsFrom: null, firstYear: "reservar", lastPaidYear: null, active: true },
];
const rate = { venta: 454.56, compra: 449.35, date: "2026-10-14" };
const base = { monthKey: "2026-10", profile: profileQ, recurring, annual, ledger: [], rate, today: "2026-10-14" };

describe("materializeMonth · quincenal", () => {
  const m = materializeMonth(base);

  it("copia estado, frecuencia, regla y TC congelado", () => {
    expect(m.status).toBe("open");
    expect(m.partial).toBe(false);
    expect(m.startedAt).toBeNull();
    expect(m.frequency).toBe("quincenal");
    expect(m.splitRule).toBe("igual_sobrante");
    expect(m.exchangeRate).toEqual({ venta: 454.56, compra: 449.35, date: "2026-10-14" });
    expect(m.extras).toEqual([]);
    expect(m.closing).toBeNull();
    expect(m.createdAt).toBe("2026-10-14");
  });

  it("ingresos desde el perfil", () => {
    expect(m.incomes).toEqual({ p1: { salaryCRC: 1000000, salaryUSD: 0 }, p2: { salaryCRC: 600000, salaryUSD: 0 } });
  });

  it("ahorro planificado por persona con q1 y q2", () => {
    expect(Object.keys(m.savings.perPerson)).toEqual(["p1", "p2"]);
    expect(m.savings.perPerson.p1.q1).toEqual({ planned: 50000, actual: null, at: null, note: null, ledgerId: null });
    expect(m.savings.perPerson.p1.q2.planned).toBe(50000);
    expect(m.savings.perPerson.p2.q2.planned).toBe(50000);
  });

  it("fijos activos con id estable, half copiado y status pending", () => {
    const ids = m.fixedItems.map((f) => f.id);
    expect(ids).toEqual(["r1_2026-10", "r2_2026-10", "r3_2026-10", "r4_2026-10"]);
    expect(m.fixedItems.find((f) => f.id === "r3_2026-10")).toMatchObject({
      templateId: "r3", fromMonth: null, name: "Internet", amount: 40000, currency: "CRC", half: "ambas",
      status: "pending", paidAt: null, paidAmount: null, deferredTo: null, isDebt: false,
    });
    expect(m.fixedItems.find((f) => f.id === "r4_2026-10").isDebt).toBe(true);
    expect(m.fixedItems.reduce((s, f) => s + f.amount, 0)).toBe(930000);
  });

  it("excluye inactivos y deudas sin cuotas restantes", () => {
    expect(m.fixedItems.some((f) => f.name === "Gimnasio")).toBe(false);
    expect(m.fixedItems.some((f) => f.name === "Préstamo viejo")).toBe(false);
  });

  it("reserva anual: marchamo cubierto aparte (0 hasta enero), Navidad ÷3", () => {
    expect(m.annualReserve.quota).toBe(80000);
    expect(m.annualReserve.done).toBe(false);
    expect(m.annualReserve.ledgerId).toBeNull();
    expect(m.annualReserve.paysThisMonth).toEqual([]);
    const marchamo = m.annualReserve.breakdown.find((b) => b.annualId === "a1");
    expect(marchamo.quota).toBe(0);
    expect(Number.isFinite(marchamo.quota)).toBe(true);
  });

  it("sin mes anterior: carryover en 0 y sin diferidos", () => {
    expect(m.carryover).toEqual({ in: 0, out: 0 });
    expect(m.fixedItems.every((f) => f.fromMonth === null)).toBe(true);
  });
});

describe("materializeMonth · mensual", () => {
  const m = materializeMonth({ ...base, profile: profileM });

  it("solo q1 en el ahorro", () => {
    expect(m.frequency).toBe("mensual");
    expect(m.savings.perPerson.p1).toEqual({ q1: { planned: 50000, actual: null, at: null, note: null, ledgerId: null } });
    expect(m.savings.perPerson.p1.q2).toBeUndefined();
  });

  it("los fijos conservan half aunque se ignore", () => {
    expect(m.fixedItems.map((f) => f.half)).toEqual([1, 2, "ambas", 2]);
  });
});

describe("materializeMonth · con mes anterior", () => {
  const previousMonth = {
    monthKey: "2026-09",
    status: "closed",
    fixedItems: [
      { id: "r1_2026-09", templateId: "r1", fromMonth: null, name: "Alquiler", amount: 350000, currency: "CRC", half: 1, status: "deferred", deferredTo: "2026-10", isDebt: false },
      { id: "r2_2026-09", templateId: "r2", fromMonth: null, name: "Luz", amount: 60000, currency: "CRC", half: 2, status: "paid", isDebt: false },
      { id: "r9_2026-08__2026-09", templateId: "r9", fromMonth: "2026-08", name: "Seguro (de agosto)", amount: 70000, currency: "CRC", half: 2, status: "deferred", isDebt: false },
    ],
    carryover: { in: 0, out: 120000 },
    closing: { closedAt: "2026-10-01", leftoverPlanned: -120000, deficitResolution: "carry", destination: "libre", seenBy: [] },
  };

  it("agrega los diferidos con fromMonth y nombre '(de septiembre)'", () => {
    const m = materializeMonth({ ...base, previousMonth });
    const def = m.fixedItems.filter((f) => f.fromMonth);
    expect(def).toHaveLength(2);
    expect(def[0]).toMatchObject({
      id: "r1_2026-09__2026-10", templateId: "r1", fromMonth: "2026-09", name: "Alquiler (de septiembre)",
      amount: 350000, half: 1, status: "pending", deferredTo: null,
    });
    // no encadena sufijos al diferir dos veces
    expect(def[1].name).toBe("Seguro (de septiembre)");
    // los de plantilla siguen ahí: el alquiler de octubre y el de septiembre conviven
    expect(m.fixedItems.filter((f) => f.templateId === "r1")).toHaveLength(2);
  });

  it("carry: carryover.in toma el out del mes anterior", () => {
    const m = materializeMonth({ ...base, previousMonth });
    expect(m.carryover).toEqual({ in: 120000, out: 0 });
  });

  it("sin carry (cover / less_savings): carryover.in = 0", () => {
    for (const res of ["cover", "less_savings", null]) {
      const prev = { ...previousMonth, closing: { ...previousMonth.closing, deficitResolution: res } };
      expect(materializeMonth({ ...base, previousMonth: prev }).carryover.in).toBe(0);
    }
  });

  it("el apartado del libro descuenta la cuota de la reserva", () => {
    const ledger = [
      { reserveId: "a2", type: "aporte", amount: 80000, monthKey: "2026-10" },
      { reserveId: null, type: "aporte", amount: 50000, monthKey: "2026-10" },
    ];
    const m = materializeMonth({ ...base, monthKey: "2026-11", ledger, previousMonth: { ...previousMonth, monthKey: "2026-10", fixedItems: [], closing: null } });
    const nav = m.annualReserve.breakdown.find((b) => b.annualId === "a2");
    expect(nav).toMatchObject({ reserved: 80000, quota: 80000 });
    expect(m.annualReserve.quota).toBe(80000);
  });
});

describe("materializeMonth · parcial", () => {
  it("quincenal desde el 16: q1 en 0 y fijos de la 1ra quincena saltados", () => {
    const m = materializeMonth({ ...base, partial: true, startedAt: "2026-10-16", today: "2026-10-16" });
    expect(m.partial).toBe(true);
    expect(m.startedAt).toBe("2026-10-16");
    expect(m.savings.perPerson.p1.q1.planned).toBe(0);
    expect(m.savings.perPerson.p1.q2.planned).toBe(50000);
    const byName = Object.fromEntries(m.fixedItems.map((f) => [f.name, f.status]));
    expect(byName).toEqual({ Alquiler: "skipped", Luz: "pending", Internet: "pending", Carro: "pending" });
  });

  it("parcial desde la 1ra quincena no salta nada", () => {
    const m = materializeMonth({ ...base, partial: true, startedAt: "2026-10-05" });
    expect(m.savings.perPerson.p1.q1.planned).toBe(50000);
    expect(m.fixedItems.every((f) => f.status === "pending")).toBe(true);
  });

  it("mensual parcial solo marca partial y startedAt", () => {
    const m = materializeMonth({ ...base, profile: profileM, partial: true, startedAt: "2026-10-20" });
    expect(m.partial).toBe(true);
    expect(m.startedAt).toBe("2026-10-20");
    expect(m.savings.perPerson.p1.q1.planned).toBe(50000);
    expect(m.fixedItems.every((f) => f.status === "pending")).toBe(true);
  });

  it("sin partial, startedAt se ignora", () => {
    const m = materializeMonth({ ...base, partial: false, startedAt: "2026-10-16" });
    expect(m.startedAt).toBeNull();
    expect(m.savings.perPerson.p1.q1.planned).toBe(50000);
  });
});

describe("materializeMonth · defaults", () => {
  it("sin TC usa el default del perfil y la fecha de hoy", () => {
    const m = materializeMonth({ monthKey: "2026-10", profile: profileQ, today: "2026-10-14" });
    expect(m.exchangeRate).toEqual({ venta: 455, compra: 455, date: "2026-10-14" });
    expect(m.fixedItems).toEqual([]);
    expect(m.annualReserve).toEqual({ quota: 0, breakdown: [], paysThisMonth: [], done: false, ledgerId: null });
  });

  it("fijos en USD conservan su moneda", () => {
    const m = materializeMonth({ ...base, recurring: [{ id: "r7", name: "Netflix", amount: 15, currency: "USD", half: 1, order: 0, active: true }] });
    expect(m.fixedItems[0]).toMatchObject({ amount: 15, currency: "USD" });
  });
});
