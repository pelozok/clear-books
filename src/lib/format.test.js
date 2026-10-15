import { describe, it, expect } from "vitest";
import {
  fmt, fmtUSD, fmtAmount, toCRC, fmtSigned,
  fmtDate, fmtDateLong, fmtRelative, parseAmountInput, fmtAmountInput,
} from "./format.js";

describe("fmt", () => {
  it("colones con punto de miles y sin decimales", () => {
    expect(fmt(1000000)).toBe("₡1.000.000");
    expect(fmt(930000)).toBe("₡930.000");
    expect(fmt(50000.4)).toBe("₡50.000");
    expect(fmt(999)).toBe("₡999");
    expect(fmt(0)).toBe("₡0");
  });
  it("negativos con signo menos tipográfico antes del símbolo", () => {
    expect(fmt(-120000)).toBe("−₡120.000");
  });
  it("null/NaN caen a ₡0", () => {
    expect(fmt(null)).toBe("₡0");
    expect(fmt(NaN)).toBe("₡0");
    expect(fmt(undefined)).toBe("₡0");
  });
});

describe("fmtUSD / fmtAmount", () => {
  it("dólares en formato en-US con hasta 2 decimales", () => {
    expect(fmtUSD(1234.5)).toBe("$1,234.5");
    expect(fmtUSD(200)).toBe("$200");
    expect(fmtUSD(-15)).toBe("−$15");
    expect(fmtUSD(null)).toBe("$0");
  });
  it("fmtAmount elige por moneda", () => {
    expect(fmtAmount(600000, "CRC")).toBe("₡600.000");
    expect(fmtAmount(350, "USD")).toBe("$350");
  });
});

describe("toCRC", () => {
  it("convierte USD con venta y deja CRC igual", () => {
    expect(toCRC(100, "USD", 454.56)).toBeCloseTo(45456);
    expect(toCRC(100, "USD", { venta: 454.56, compra: 449.35 })).toBeCloseTo(45456);
    expect(toCRC(600000, "CRC", 454.56)).toBe(600000);
  });
  it("tolera montos nulos", () => {
    expect(toCRC(null, "USD", 455)).toBe(0);
  });
});

describe("fmtSigned", () => {
  it("signo explícito salvo cero", () => {
    expect(fmtSigned(50000)).toBe("+₡50.000");
    expect(fmtSigned(-50000)).toBe("−₡50.000");
    expect(fmtSigned(0)).toBe("₡0");
    expect(fmtSigned(null)).toBe("₡0");
  });
});

describe("fmtDate / fmtDateLong", () => {
  it("día y mes corto en minúscula", () => {
    expect(fmtDate("2026-10-14")).toBe("14 oct");
    expect(fmtDate("2026-01-05")).toBe("5 ene");
    expect(fmtDate("2026-12-20")).toBe("20 dic");
  });
  it("versión larga con 'de'", () => {
    expect(fmtDateLong("2026-10-14")).toBe("14 de octubre");
    expect(fmtDateLong("2026-09-01")).toBe("1 de septiembre");
  });
  it("entrada inválida devuelve vacío", () => {
    expect(fmtDate("")).toBe("");
    expect(fmtDate(null)).toBe("");
    expect(fmtDateLong("abc")).toBe("");
  });
});

describe("fmtRelative", () => {
  const hoy = "2026-10-14";
  it("hoy, ayer y hace N días", () => {
    expect(fmtRelative("2026-10-14", hoy)).toBe("hoy");
    expect(fmtRelative("2026-10-13", hoy)).toBe("ayer");
    expect(fmtRelative("2026-10-11", hoy)).toBe("hace 3 días");
    expect(fmtRelative("2026-09-30", hoy)).toBe("hace 14 días");
  });
  it("cruza el año sin problemas de zona horaria", () => {
    expect(fmtRelative("2026-12-31", "2027-01-02")).toBe("hace 2 días");
  });
  it("más de 30 días cae a la fecha corta", () => {
    expect(fmtRelative("2026-08-01", hoy)).toBe("1 ago");
  });
  it("futuro", () => {
    expect(fmtRelative("2026-10-15", hoy)).toBe("mañana");
    expect(fmtRelative("2026-10-20", hoy)).toBe("en 6 días");
  });
  it("acepta Date y Timestamp de Firestore", () => {
    expect(fmtRelative(new Date(2026, 9, 13, 23, 50), hoy)).toBe("ayer");
    expect(fmtRelative({ toDate: () => new Date(2026, 9, 14, 8, 0) }, hoy)).toBe("hoy");
  });
  it("entrada inválida devuelve vacío", () => {
    expect(fmtRelative(null, hoy)).toBe("");
    expect(fmtRelative("2026-10-14", undefined)).toBe("");
  });
});

describe("parseAmountInput", () => {
  it("texto es-CR con puntos de miles y coma decimal", () => {
    expect(parseAmountInput("1.234.567,5")).toBe(1234567.5);
    expect(parseAmountInput("1.000.000")).toBe(1000000);
    expect(parseAmountInput("930.000")).toBe(930000);
    expect(parseAmountInput("50.000,00")).toBe(50000);
  });
  it("dígitos pelados y símbolos de moneda", () => {
    expect(parseAmountInput("1234567")).toBe(1234567);
    expect(parseAmountInput("₡ 600.000")).toBe(600000);
    expect(parseAmountInput("$ 1,234.5")).toBe(1234.5);
    expect(parseAmountInput("1,234,567.25")).toBe(1234567.25);
  });
  it("un solo punto que no agrupa 3 dígitos es decimal", () => {
    expect(parseAmountInput("12.5")).toBe(12.5);
    expect(parseAmountInput("454.56")).toBe(454.56);
    expect(parseAmountInput("1.500")).toBe(1500);
  });
  it("coma sola es decimal", () => {
    expect(parseAmountInput("12,5")).toBe(12.5);
    expect(parseAmountInput("0,75")).toBe(0.75);
  });
  it("negativos, vacío y basura", () => {
    expect(parseAmountInput("-50.000")).toBe(-50000);
    expect(parseAmountInput("")).toBe(0);
    expect(parseAmountInput(null)).toBe(0);
    expect(parseAmountInput("abc")).toBeNaN();
    expect(parseAmountInput("1.2.3,4,5")).toBe(1234.5);
    expect(parseAmountInput(250)).toBe(250);
  });
});

describe("fmtAmountInput", () => {
  it("agrupa miles sin símbolo", () => {
    expect(fmtAmountInput(1234567)).toBe("1.234.567");
    expect(fmtAmountInput(50000)).toBe("50.000");
    expect(fmtAmountInput(999)).toBe("999");
    expect(fmtAmountInput(0)).toBe("0");
  });
  it("conserva decimales con coma y el signo", () => {
    expect(fmtAmountInput(1234567.5)).toBe("1.234.567,5");
    expect(fmtAmountInput(-50000)).toBe("-50.000");
  });
  it("sin valor devuelve vacío", () => {
    expect(fmtAmountInput(null)).toBe("");
    expect(fmtAmountInput(NaN)).toBe("");
  });
  it("ida y vuelta con parseAmountInput", () => {
    for (const n of [0, 999, 1000, 930000, 1234567.5]) {
      expect(parseAmountInput(fmtAmountInput(n))).toBe(n);
    }
  });
});
