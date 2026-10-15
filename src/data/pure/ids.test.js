import { describe, it, expect } from "vitest";
import {
  savingsLedgerId, reserveLedgerId, annualPayLedgerId, extraLedgerId,
  entryLedgerId, coverLedgerId, closeLedgerId, parseLedgerId, closeEntryDocId,
} from "./ids.js";

const hid = "abc123XYZ";

describe("ids deterministas del libro", () => {
  it("savingsLedgerId sigue el formato hid-mes-persona-quincena", () => {
    expect(savingsLedgerId(hid, "2026-10", "p1", 1)).toBe("abc123XYZ-2026-10-p1-1");
    expect(savingsLedgerId(hid, "2026-10", "p2", 2)).toBe("abc123XYZ-2026-10-p2-2");
  });

  it("mensual sin quincena usa 1", () => {
    expect(savingsLedgerId(hid, "2026-10", "p1", null)).toBe("abc123XYZ-2026-10-p1-1");
    expect(savingsLedgerId(hid, "2026-10", "p1", undefined)).toBe("abc123XYZ-2026-10-p1-1");
  });

  it("es idempotente: mismos argumentos, mismo id", () => {
    expect(savingsLedgerId(hid, "2026-11", "p1", 2)).toBe(savingsLedgerId(hid, "2026-11", "p1", 2));
  });

  it("ids distintos para acciones distintas del mismo mes", () => {
    const all = [
      savingsLedgerId(hid, "2026-10", "p1", 1),
      reserveLedgerId(hid, "2026-10", "marchamo"),
      annualPayLedgerId(hid, "2026-10", "marchamo"),
      extraLedgerId(hid, "2026-10", "x1"),
      entryLedgerId(hid, "2026-10", "e1"),
      coverLedgerId(hid, "2026-10"),
      closeLedgerId(hid, "2026-10", "cover", 0),
    ];
    expect(new Set(all).size).toBe(all.length);
  });

  it("limpia caracteres que Firestore no acepta en ids", () => {
    expect(extraLedgerId(hid, "2026-10", "a/b c")).toBe("abc123XYZ-2026-10-extra-a_b_c");
    expect(reserveLedgerId(hid, "2026-10", "nav.idad")).toBe("abc123XYZ-2026-10-reserve-nav_idad");
  });

  it("parseLedgerId recupera hid y mes", () => {
    expect(parseLedgerId("abc123XYZ-2026-10-p1-1")).toEqual({ hid: "abc123XYZ", monthKey: "2026-10", rest: "p1-1" });
    expect(parseLedgerId("sin-formato")).toBeNull();
    expect(parseLedgerId(null)).toBeNull();
  });

  it("closeEntryDocId antepone el hid al id local del cierre", () => {
    expect(closeEntryDocId(hid, "2026-10", { id: "2026-10-close-cover", kind: "cover" }, 0))
      .toBe("abc123XYZ-2026-10-close-cover");
    expect(closeEntryDocId(hid, "2026-10", { kind: "extra" }, 2)).toBe("abc123XYZ-2026-10-close-extra-2");
    expect(closeEntryDocId(hid, "2026-10", { id: "otro-id", kind: "cover" }, 1)).toBe("abc123XYZ-2026-10-close-cover-1");
  });
});
