import { describe, it, expect } from "vitest";
import {
  fmt, fmtUSD, fmtAmount, toCRC, fmtSigned,
  fmtDate, fmtDateLong, fmtRelative, parseAmountInput, fmtAmountInput,
} from "./format.js";
import { DEFAULT_RATE } from "./exchange.js";

const TC = { venta: 454.56, compra: 449.35, date: "2026-10-14" };

describe("toCRC: USD con tipo de cambio del mes", () => {
  it("usa venta, nunca compra", () => {
    expect(toCRC(350, "USD", TC)).toBeCloseTo(159096);
    expect(toCRC(350, "USD", { venta: 454.56, compra: 999 })).toBeCloseTo(159096);
  });
  it("montos y TC como strings numéricos (input sin parsear) no se pierden", () => {
    expect(toCRC("600000", "CRC", TC)).toBe(600000);
    expect(toCRC("100", "USD", TC)).toBeCloseTo(45456);
    expect(toCRC(100, "USD", "454.56")).toBeCloseTo(45456);
    expect(toCRC(100, "USD", { venta: "454.56" })).toBeCloseTo(45456);
  });
  it("USD sin TC usa DEFAULT_RATE.venta en vez de desaparecer como ₡0", () => {
    expect(toCRC(100, "USD", undefined)).toBe(100 * DEFAULT_RATE.venta);
    expect(toCRC(100, "USD", null)).toBe(100 * DEFAULT_RATE.venta);
    expect(toCRC(100, "USD", 0)).toBe(100 * DEFAULT_RATE.venta);
    expect(toCRC(100, "USD", NaN)).toBe(100 * DEFAULT_RATE.venta);
    expect(toCRC(100, "USD", {})).toBe(100 * DEFAULT_RATE.venta);
  });
  it("nunca devuelve NaN ni Infinity", () => {
    for (const a of [NaN, Infinity, -Infinity, undefined, null, "", "abc", {}]) {
      for (const r of [TC, NaN, Infinity, undefined, 0]) {
        const v = toCRC(a, "USD", r);
        expect(Number.isFinite(v)).toBe(true);
      }
    }
    expect(toCRC(100, "USD", Infinity)).toBe(100 * DEFAULT_RATE.venta);
  });
  it("moneda desconocida o ausente se trata como colones", () => {
    expect(toCRC(5000, undefined, TC)).toBe(5000);
    expect(toCRC(5000, "CRC", undefined)).toBe(5000);
  });
  it("₡0 de ahorro parcial es 0, no NaN", () => {
    expect(toCRC(0, "CRC", TC)).toBe(0);
    expect(toCRC(0, "USD", TC)).toBe(0);
  });
});

describe("fmt / fmtSigned: redondeo y déficit", () => {
  it("redondeo simétrico: ±0,5 y ±1,5 se ven igual en valor absoluto", () => {
    expect(fmt(1.5)).toBe("₡2");
    expect(fmt(-1.5)).toBe("−₡2");
    expect(fmtSigned(2.5)).toBe("+₡3");
    expect(fmtSigned(-2.5)).toBe("−₡3");
  });
  it("menos de medio colón negativo no muestra '−₡0'", () => {
    expect(fmt(-0.4)).toBe("₡0");
    expect(fmt(-0)).toBe("₡0");
    expect(fmtSigned(-0.4)).toBe("₡0");
  });
  it("déficit cuando el salario no alcanza: ₡600.000 − ₡930.000", () => {
    expect(fmt(600000 - 930000)).toBe("−₡330.000");
    expect(fmtSigned(600000 - 930000)).toBe("−₡330.000");
  });
  it("conversión USD con decimales se muestra entera", () => {
    expect(fmt(toCRC(350, "USD", TC))).toBe("₡159.096");
    expect(fmt(toCRC(0.01, "USD", TC))).toBe("₡5");
  });
  it("Infinity y strings no imprimen basura", () => {
    expect(fmt(Infinity)).toBe("₡0");
    expect(fmt(-Infinity)).toBe("₡0");
    expect(fmtSigned(Infinity)).toBe("₡0");
    expect(fmt("1000000")).toBe("₡1.000.000");
    expect(fmt("abc")).toBe("₡0");
    expect(fmt("")).toBe("₡0");
  });
  it("cifras grandes (₡10 mil millones) siguen agrupadas", () => {
    expect(fmt(12345678901)).toBe("₡12.345.678.901");
  });
});

describe("fmtUSD", () => {
  it("negativo que redondea a cero no muestra '−$0'", () => {
    expect(fmtUSD(-0.001)).toBe("$0");
    expect(fmtUSD(-0)).toBe("$0");
  });
  it("centavos, Infinity y strings", () => {
    expect(fmtUSD(0.5)).toBe("$0.5");
    expect(fmtUSD(1234567.891)).toBe("$1,234,567.89");
    expect(fmtUSD(Infinity)).toBe("$0");
    expect(fmtUSD("350")).toBe("$350");
  });
  it("fmtAmount con moneda desconocida cae a colones", () => {
    expect(fmtAmount(5000, undefined)).toBe("₡5.000");
    expect(fmtAmount(null, "USD")).toBe("$0");
  });
});

describe("fmtDate: fechas imposibles", () => {
  it("rechaza día 0, 32 y 31 de febrero", () => {
    expect(fmtDate("2026-10-00")).toBe("");
    expect(fmtDate("2026-10-32")).toBe("");
    expect(fmtDate("2027-02-29")).toBe("");
    expect(fmtDateLong("2026-02-31")).toBe("");
    expect(fmtDate("2028-02-29")).toBe("29 feb");
    expect(fmtDate("2026-13-01")).toBe("");
  });
  it("acepta ISO con hora y Date/undefined", () => {
    expect(fmtDate("2026-12-31T23:59:00")).toBe("31 dic");
    expect(fmtDate(undefined)).toBe("");
  });
});

describe("fmtRelative: zonas horarias y tipos de entrada", () => {
  const hoy = "2026-10-14";
  it("string ISO con hora UTC se interpreta en hora local, no por los primeros 10 caracteres", () => {
    const d = new Date(2026, 9, 14, 20, 0); // 8 pm local del 14
    expect(fmtRelative(d.toISOString(), hoy)).toBe("hoy");
  });
  it("milisegundos y Timestamp serializado { seconds }", () => {
    const ms = new Date(2026, 9, 13, 12, 0).getTime();
    expect(fmtRelative(ms, hoy)).toBe("ayer");
    expect(fmtRelative({ seconds: Math.floor(ms / 1000), nanoseconds: 0 }, hoy)).toBe("ayer");
  });
  it("today puede venir como Date", () => {
    expect(fmtRelative("2026-10-11", new Date(2026, 9, 14, 7, 0))).toBe("hace 3 días");
  });
  it("cruce de año y bisiesto", () => {
    expect(fmtRelative("2026-12-16", "2027-01-15")).toBe("hace 30 días");
    expect(fmtRelative("2026-12-15", "2027-01-15")).toBe("15 dic");
    expect(fmtRelative("2028-02-28", "2028-03-01")).toBe("hace 2 días");
  });
  it("fechas inválidas devuelven vacío", () => {
    expect(fmtRelative("2026-02-31", hoy)).toBe("");
    expect(fmtRelative(new Date(NaN), hoy)).toBe("");
    expect(fmtRelative(NaN, hoy)).toBe("");
    expect(fmtRelative({}, hoy)).toBe("");
  });
});

describe("parseAmountInput: cómo escribe la gente en CR", () => {
  it("varias comas sin punto son separadores de miles (estilo en-US)", () => {
    expect(parseAmountInput("1,234,567")).toBe(1234567);
    expect(parseAmountInput("₡1,000,000")).toBe(1000000);
  });
  it("una coma seguida de exactamente 3 dígitos es de miles", () => {
    expect(parseAmountInput("1,500")).toBe(1500);
    expect(parseAmountInput("12,500")).toBe(12500);
    expect(parseAmountInput("12,5")).toBe(12.5);
    expect(parseAmountInput("454,56")).toBe(454.56);
  });
  it("cero antes del separador siempre es decimal", () => {
    expect(parseAmountInput("0.500")).toBe(0.5);
    expect(parseAmountInput("0,500")).toBe(0.5);
    expect(parseAmountInput(".5")).toBe(0.5);
    expect(parseAmountInput(",75")).toBe(0.75);
  });
  it("números Infinity/NaN no pasan como válidos", () => {
    expect(parseAmountInput(Infinity)).toBeNaN();
    expect(parseAmountInput(NaN)).toBeNaN();
    expect(parseAmountInput(undefined)).toBe(0);
    expect(parseAmountInput("   ")).toBe(0);
  });
  it("menos tipográfico y símbolos", () => {
    expect(parseAmountInput("−₡120.000")).toBe(-120000);
    expect(parseAmountInput("$ 350.00")).toBe(350);
    expect(parseAmountInput("₡")).toBeNaN();
  });
  it("un guion en el medio no es signo ni se pega a los dígitos", () => {
    expect(parseAmountInput("12-500")).toBeNaN();
  });
});

describe("fmtAmountInput", () => {
  it("errores de coma flotante no llegan al input", () => {
    expect(fmtAmountInput(0.1 + 0.2)).toBe("0,3");
    expect(fmtAmountInput(toCRC(33.33, "USD", TC))).toBe("15.150,48");
  });
  it("no muestra notación científica ni '-0'", () => {
    expect(fmtAmountInput(1e-7)).toBe("0");
    expect(fmtAmountInput(-0.001)).toBe("0");
    expect(fmtAmountInput(Infinity)).toBe("");
  });
  it("ida y vuelta con valores de 2 decimales y miles", () => {
    for (const n of [1.5, 12.25, 1500, 12500, 454.56, 1000000, -50000, 0.75]) {
      expect(parseAmountInput(fmtAmountInput(n))).toBe(n);
    }
  });
});
