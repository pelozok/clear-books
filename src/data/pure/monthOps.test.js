import { describe, it, expect } from "vitest";
import { materializeGate, applyTemplateToFixed, markFixedItem, upsertById, toPlain, profileToMonthPatch, autoSavingsSync, monthTemplateSync } from "./monthOps.js";

const tpl = { id: "r1", name: "Alquiler", amount: 350000, currency: "CRC", half: 1, active: true };

describe("materializeGate", () => {
  it("permite hasta el mes siguiente", () => {
    expect(materializeGate("2026-11", "2026-10")).toBe("ok");
    expect(materializeGate("2026-12", "2026-10")).toBe("tooFar");
    expect(materializeGate("2027-01", "2026-12")).toBe("ok");
  });
  it("no materializa antes del arranque", () => {
    expect(materializeGate("2026-09", "2026-10", "2026-10-14")).toBe("beforeStart");
    expect(materializeGate("2026-10", "2026-10", "2026-10-14")).toBe("ok");
  });
});

describe("applyTemplateToFixed", () => {
  it("agrega, actualiza y quita pendientes", () => {
    const added = applyTemplateToFixed([], tpl, "2026-10");
    expect(added).toHaveLength(1);
    expect(added[0].id).toBe("r1_2026-10");
    const upd = applyTemplateToFixed(added, { ...tpl, amount: 360000 }, "2026-10");
    expect(upd[0].amount).toBe(360000);
    expect(applyTemplateToFixed(upd, { ...tpl, active: false }, "2026-10")).toHaveLength(0);
  });
  it("no toca fijos pagados ni diferidos de otro mes", () => {
    const paid = [{ ...applyTemplateToFixed([], tpl, "2026-10")[0], status: "paid" }];
    expect(applyTemplateToFixed(paid, { ...tpl, amount: 1 }, "2026-10")[0].amount).toBe(350000);
    const deferred = [{ id: "x", templateId: "r1", fromMonth: "2026-09", status: "pending", amount: 5 }];
    expect(applyTemplateToFixed(deferred, tpl, "2026-10")).toHaveLength(2);
  });
});

describe("markFixedItem", () => {
  const items = [{ id: "a", amount: 1000, status: "pending" }];
  it("paid usa monto y fecha por defecto", () => {
    const [it0] = markFixedItem(items, "a", { status: "paid" }, "2026-10", "2026-10-15");
    expect(it0).toMatchObject({ status: "paid", paidAmount: 1000, paidAt: "2026-10-15" });
  });
  it("deferred apunta al mes siguiente y limpia el pago", () => {
    const [it0] = markFixedItem(items, "a", { status: "deferred" }, "2026-12", "2026-12-20");
    expect(it0).toMatchObject({ status: "deferred", deferredTo: "2027-01", paidAt: null });
  });
});

describe("upsertById / toPlain", () => {
  it("upsert reemplaza o agrega", () => {
    expect(upsertById([{ id: 1, a: 1 }], { id: 1, a: 2 })).toEqual([{ id: 1, a: 2 }]);
    expect(upsertById([], { id: 2 })).toHaveLength(1);
  });
  it("convierte Timestamps", () => {
    const ts = { toDate: () => new Date("2026-10-15T12:00:00Z") };
    expect(toPlain({ a: [ts], b: 1 })).toEqual({ a: ["2026-10-15T12:00:00.000Z"], b: 1 });
  });
});

describe("profileToMonthPatch", () => {
  it("pasa ingreso y ahorro en dólares al mes, sin tocar lo confirmado", () => {
    const month = { incomes: { p1: { salaryCRC: 900000, salaryUSD: 0 } }, savings: { perPerson: { p1: { q1: { planned: 50000, actual: null }, q2: { planned: 50000, actual: 50000 } } } } };
    const out = profileToMonthPatch(month, [{ id: "p1", incomeCRC: 0, incomeUSD: 1500, savingsPerPeriod: 300, savingsCurrency: "USD" }]);
    expect(out.incomes.p1).toEqual({ salaryCRC: 0, salaryUSD: 1500 });
    expect(out.savings.perPerson.p1.q1).toMatchObject({ plannedAmount: 300, plannedCurrency: "USD", actual: null });
    expect(out.savings.perPerson.p1.q2).toMatchObject({ planned: 50000, actual: 50000 });
  });
});

describe("profileToMonthPatch frecuencia", () => {
  it("de quincenal a mensual deja un solo ahorro", () => {
    const month = { frequency: "quincenal", incomes: {}, savings: { perPerson: { p1: { q1: { planned: 50000, actual: null }, q2: { planned: 50000, actual: null } } } } };
    const out = profileToMonthPatch(month, [{ id: "p1", incomeUSD: 1500, savingsPerPeriod: 300, savingsCurrency: "USD" }], "mensual");
    expect(out.frequency).toBe("mensual");
    expect(Object.keys(out.savings.perPerson.p1)).toEqual(["q1"]);
    expect(out.savings.perPerson.p1.q1).toMatchObject({ plannedAmount: 300, plannedCurrency: "USD" });
  });
});

describe("autoSavingsSync", () => {
  const profile = { people: [{ id: "p1", autoSavingsPlaceId: "usd", savingsPerPeriod: 300, savingsCurrency: "USD" }] };
  it("lleva el ahorro sin confirmar al perfil", () => {
    const m = { status: "open", savings: { perPerson: { p1: { q1: { planned: 50000, actual: null } } } } };
    expect(autoSavingsSync(m, profile).perPerson.p1.q1).toMatchObject({ plannedAmount: 300, plannedCurrency: "USD" });
  });
  it("no toca si ya está, si está confirmado o si el mes está cerrado", () => {
    expect(autoSavingsSync({ status: "open", savings: { perPerson: { p1: { q1: { plannedAmount: 300, plannedCurrency: "USD", actual: null } } } } }, profile)).toBeNull();
    expect(autoSavingsSync({ status: "open", savings: { perPerson: { p1: { q1: { planned: 50000, actual: 50000 } } } } }, profile)).toBeNull();
    expect(autoSavingsSync({ status: "closed", savings: { perPerson: { p1: { q1: { planned: 50000, actual: null } } } } }, profile)).toBeNull();
  });
});

describe("monthTemplateSync", () => {
  const profile = { frequency: "mensual", people: [{ id: "p1", incomeUSD: 1500, savingsPerPeriod: 0 }] };
  const month = {
    id: "2026-10", status: "open", frequency: "mensual", fixedChecked: true,
    incomes: { p1: { salaryCRC: 0, salaryUSD: 1500 } }, savings: { perPerson: { p1: { q1: { planned: 0, actual: null } } } },
    fixedItems: [{ id: "r1_2026-10", templateId: "r1", fromMonth: null, name: "Alquiler", amount: 350000, currency: "CRC", half: 1, status: "pending" }],
  };
  const diezmo = { id: "r2", name: "Diezmo", amount: 0, percent: 10, currency: "USD", half: 1, active: true };

  it("al día: null", () => {
    expect(monthTemplateSync(month, [tpl], profile, "2026-10")).toBeNull();
  });
  it("agrega un fijo nuevo de la plantilla como pendiente", () => {
    const p = monthTemplateSync(month, [tpl, diezmo], profile, "2026-10");
    expect(p.fixedItems.map((f) => [f.name, f.status, f.percent])).toEqual([["Alquiler", "pending", undefined], ["Diezmo", "pending", 10]]);
  });
  it("no agrega inactivos ni toca meses pasados o cerrados", () => {
    expect(monthTemplateSync(month, [tpl, { ...diezmo, active: false }], profile, "2026-10")).toBeNull();
    expect(monthTemplateSync(month, [tpl, diezmo], profile, "2026-11")).toBeNull();
    expect(monthTemplateSync({ ...month, status: "closed" }, [tpl, diezmo], profile, "2026-10")).toBeNull();
  });
  it("frecuencia del perfil manda: quincenal → mensual", () => {
    const m = { ...month, frequency: "quincenal", savings: { perPerson: { p1: { q1: { planned: 0, actual: null }, q2: { planned: 0, actual: null } } } } };
    const p = monthTemplateSync(m, [tpl], profile, "2026-10");
    expect(p.frequency).toBe("mensual");
    expect(p.savings.perPerson.p1.q2).toBeUndefined();
  });
  it("una vez: lo omitido por el arranque vuelve a pendiente", () => {
    const m = { ...month, fixedChecked: undefined, fixedItems: [{ ...month.fixedItems[0], status: "skipped" }] };
    const p = monthTemplateSync(m, [tpl], profile, "2026-10");
    expect(p.fixedChecked).toBe(true);
    expect(p.fixedItems[0].status).toBe("pending");
    // Ya revisado: un omitido a mano se respeta.
    expect(monthTemplateSync({ ...m, fixedChecked: true }, [tpl], profile, "2026-10")).toBeNull();
  });
});
