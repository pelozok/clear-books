import { describe, it, expect } from "vitest";
import { materializeGate, applyTemplateToFixed, markFixedItem, upsertById, toPlain } from "./monthOps.js";

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
