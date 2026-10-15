import { describe, it, expect } from "vitest";
import { closeChecklist, resolveDeficit, applyClose, leftoverOf } from "./close.js";

const TODAY = "2026-10-31";

// Pareja quincenal: ingresos ₡1.000.000 / ₡600.000, fijos ₡930.000, ahorro ₡50.000 por quincena.
const month = () => ({
  key: "2026-10",
  status: "open",
  frequency: "quincenal",
  exchangeRate: { venta: 455, compra: 450, date: "2026-10-01" },
  incomes: { p1: { salaryCRC: 1000000, salaryUSD: 0 }, p2: { salaryCRC: 600000, salaryUSD: 0 } },
  fixedItems: [
    { id: "alq", name: "Alquiler", amount: 350000, currency: "CRC", half: 1, status: "paid", paidAt: "2026-10-02", paidAmount: null, isDebt: false },
    { id: "tar", name: "Tarjeta BAC", amount: 200000, currency: "CRC", half: 1, status: "paid", paidAt: "2026-10-10", paidAmount: 190000, isDebt: false },
    { id: "luz", name: "Luz", amount: 60000, currency: "CRC", half: 2, status: "pending", paidAt: null, paidAmount: null, isDebt: false },
    { id: "net", name: "Internet", amount: 30000, currency: "CRC", half: 2, status: "pending", paidAt: null, paidAmount: null, isDebt: false },
    { id: "car", name: "Carro", amount: 290000, currency: "CRC", half: "ambas", status: "pending", paidAt: null, paidAmount: null, isDebt: true },
  ],
  savings: {
    perPerson: {
      p1: { q1: { planned: 50000, actual: 50000, at: "2026-10-15", note: null, ledgerId: "l1" }, q2: { planned: 50000, actual: null, at: null, note: null, ledgerId: null } },
      p2: { q1: { planned: 50000, actual: 30000, at: "2026-10-15", note: null, ledgerId: "l2" }, q2: { planned: 50000, actual: null, at: null, note: null, ledgerId: null } },
    },
  },
  annualReserve: { quota: 28864, breakdown: [], done: false, ledgerId: null, paysThisMonth: [] },
  carryover: { in: 0, out: 0 },
  closing: null,
});

const totals = (over = {}) => ({
  incomeByPerson: { p1: 1000000, p2: 600000 },
  extrasIn: 0, extrasOut: 0, variable: 120000, reserveQuota: 28864, carryIn: 0,
  ...over,
});

describe("closeChecklist", () => {
  it("lista fijos pendientes, quincenas sin tocar y sobrante sin déficit", () => {
    const c = closeChecklist(month(), totals());
    expect(c.pendingFixed.map((f) => f.id)).toEqual(["luz", "net", "car"]);
    expect(c.untouchedSavings).toEqual([{ personId: "p1", half: 2 }, { personId: "p2", half: 2 }]);
    // 1.600.000 − fijos (350.000 + 190.000 + 60.000 + 30.000 + 290.000) − 120.000 − ahorro 80.000
    expect(c.leftover).toBe(480000);
    expect(c.deficit).toBe(0);
    expect(c.ready).toBe(false);
  });
  it("déficit real cuando el gasto se come el sobrante; reserva solo si se hizo", () => {
    const c = closeChecklist(month(), totals({ variable: 700000 }));
    expect(c.deficit).toBe(100000);
    const m = month();
    m.annualReserve.done = true;
    expect(closeChecklist(m, totals({ variable: 700000 })).deficit).toBe(128864);
  });
  it("ready cuando no hay pendientes ni déficit, aunque falte ahorro por tocar", () => {
    const m = month();
    m.fixedItems = m.fixedItems.map((f) => ({ ...f, status: f.status === "pending" ? "paid" : f.status }));
    const c = closeChecklist(m, totals());
    expect(c.ready).toBe(true);
    expect(c.untouchedSavings).toHaveLength(2);
  });
  it("acepta income como número y carryIn del mes anterior; ingresos en USD no entran aquí", () => {
    expect(leftoverOf(month(), { income: 1600000, variable: 120000 })).toBe(480000);
    expect(leftoverOf(month(), totals({ carryIn: 80000 }))).toBe(400000);
  });
});

describe("resolveDeficit", () => {
  it("less_savings baja el actual de la última quincena confirmada y devuelve retiros de ajuste", () => {
    const r = resolveDeficit(month(), "less_savings", 100000, { placeId: "bac", today: TODAY });
    const pp = r.monthPatch.savings.perPerson;
    expect(pp.p1.q1.actual).toBe(0);
    expect(pp.p2.q1.actual).toBe(0);
    expect(pp.p1.q2.actual).toBeNull();
    expect(r.remaining).toBe(20000);
    expect(r.ledgerEntries).toHaveLength(2);
    expect(r.ledgerEntries[0]).toMatchObject({ type: "retiro", kind: "planned", amount: 50000, personId: "p1", half: 1, placeId: "bac", monthKey: "2026-10", date: TODAY });
  });
  it("less_savings parcial deja el resto apartado y no toca el mes original", () => {
    const m = month();
    const r = resolveDeficit(m, "less_savings", 20000);
    expect(r.monthPatch.savings.perPerson.p1.q1.actual).toBe(30000);
    expect(r.monthPatch.savings.perPerson.p2.q1.actual).toBe(30000);
    expect(r.remaining).toBe(0);
    expect(m.savings.perPerson.p1.q1.actual).toBe(50000);
    expect(r.ledgerEntries[0].date).toBe("2026-10-31");
  });
  it("cover crea un retiro kind cover por el monto", () => {
    const r = resolveDeficit(month(), "cover", 100000, { placeId: "bac", today: TODAY });
    expect(r.monthPatch).toEqual({});
    expect(r.ledgerEntries).toEqual([expect.objectContaining({ id: "2026-10-close-cover", type: "retiro", kind: "cover", amount: 100000, currency: "CRC", placeId: "bac" })]);
  });
  it("carry pone carryover.out; monto 0 o salida desconocida no hacen nada", () => {
    expect(resolveDeficit(month(), "carry", 100000).monthPatch).toEqual({ carryover: { in: 0, out: 100000 } });
    expect(resolveDeficit(month(), "cover", 0).ledgerEntries).toEqual([]);
    expect(resolveDeficit(month(), "otra", 5000)).toMatchObject({ choice: null, remaining: 5000 });
  });
});

describe("applyClose", () => {
  it("cierra con decisiones de fijos, ahorro sin tocar en 0, sobrante reportado y aporte al ahorro", () => {
    const r = applyClose({
      month: month(),
      decisions: { fixed: { luz: "paid", net: "skipped" }, deficitResolution: null, leftoverReported: 750000, destination: "ahorro", seenBy: ["kevin@x.com"] },
      today: TODAY, placeId: "bac", totals: totals(),
    });
    const m = r.month;
    expect(m.status).toBe("closed");
    const by = (id) => m.fixedItems.find((f) => f.id === id);
    expect(by("luz")).toMatchObject({ status: "paid", paidAt: TODAY, paidAmount: 60000 });
    expect(by("net").status).toBe("skipped");
    expect(by("car")).toMatchObject({ status: "deferred", deferredTo: "2026-11" }); // sin decisión → pasa al mes siguiente
    expect(by("tar").paidAmount).toBe(190000); // los ya pagados no cambian
    expect(m.savings.perPerson.p1.q2).toMatchObject({ actual: 0, at: TODAY });
    expect(m.savings.perPerson.p2.q1.actual).toBe(30000);
    // 1.600.000 − fijos (350.000 + 190.000 + 60.000) − 120.000 − ahorro 80.000
    expect(m.closing).toMatchObject({ closedAt: TODAY, leftoverPlanned: 800000, leftoverReported: 750000, unlogged: 50000, deficitResolution: null, destination: "ahorro", seenBy: ["kevin@x.com"] });
    expect(r.leftover).toBe(750000);
    expect(r.ledgerEntries).toEqual([expect.objectContaining({ id: "2026-10-close-leftover", type: "aporte", kind: "extra", amount: 750000, placeId: "bac", monthKey: "2026-10" })]);
    expect(r.nextCarryIn).toBe(0);
  });
  it("destino libre no crea aporte; sin totales leftoverPlanned queda null", () => {
    const r = applyClose({ month: month(), decisions: { fixed: { luz: "paid", net: "paid", car: "paid" }, destination: "libre" }, today: TODAY });
    expect(r.ledgerEntries).toEqual([]);
    expect(r.month.closing.leftoverPlanned).toBeNull();
    expect(r.month.closing.unlogged).toBeNull();
    expect(r.month.closing.destination).toBe("libre");
  });
  it("déficit con carry pasa el faltante al mes siguiente", () => {
    const r = applyClose({
      month: month(),
      decisions: { fixed: { luz: "paid", net: "paid", car: "paid" }, deficitResolution: { choice: "carry", amount: 100000 }, destination: "ahorro" },
      today: TODAY, placeId: "bac", totals: totals({ variable: 700000 }),
    });
    expect(r.month.carryover).toEqual({ in: 0, out: 100000 });
    expect(r.nextCarryIn).toBe(100000);
    expect(r.month.closing.deficitResolution).toBe("carry");
    expect(r.month.closing.leftoverPlanned).toBe(-100000);
    expect(r.ledgerEntries).toEqual([]); // no hay sobrante que aportar
  });
  it("déficit con cover emite el retiro y less_savings baja el ahorro ya en 0 sin tocar", () => {
    const base = { month: month(), decisions: { fixed: { luz: "paid", net: "paid", car: "paid" }, deficitResolution: "cover", deficitAmount: 100000 }, today: TODAY, placeId: "bac", totals: totals({ variable: 700000 }) };
    const r = applyClose(base);
    expect(r.ledgerEntries.map((e) => e.kind)).toEqual(["cover"]);
    const r2 = applyClose({ ...base, decisions: { ...base.decisions, deficitResolution: { choice: "less_savings", amount: 100000 } } });
    expect(r2.month.savings.perPerson.p1.q1.actual).toBe(0);
    expect(r2.month.savings.perPerson.p1.q2.actual).toBe(0);
    expect(r2.ledgerEntries.filter((e) => e.kind === "planned")).toHaveLength(2);
    // tras bajar el ahorro a 0 el sobrante planificado sube: −100.000 + 80.000
    expect(r2.month.closing.leftoverPlanned).toBe(-20000);
  });
  it("no muta el mes original", () => {
    const m = month();
    applyClose({ month: m, decisions: { fixed: { luz: "paid" } }, today: TODAY });
    expect(m.status).toBe("open");
    expect(m.fixedItems[2].status).toBe("pending");
    expect(m.savings.perPerson.p1.q2.actual).toBeNull();
  });
});
