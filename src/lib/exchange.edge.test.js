import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchExchangeRate, shouldRefreshRate, normalizeRate, DEFAULT_RATE } from "./exchange.js";
import { toCRC } from "./format.js";

const HACIENDA = "https://api.hacienda.go.cr/indicadores/tc/dolar";
const ok = (body) => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

let fetchMock;
beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("fetchExchangeRate: respuestas raras de Hacienda", () => {
  it("fecha con espacio en vez de T (formato real de la API)", async () => {
    fetchMock.mockImplementation(() => ok({ venta: { fecha: "2026-10-14 00:00:00", valor: 454.56 }, compra: { valor: 449.35 } }));
    await expect(fetchExchangeRate("2026-10-15")).resolves.toEqual({ venta: 454.56, compra: 449.35, date: "2026-10-14" });
  });
  it("fecha en formato que no es ISO cae a today", async () => {
    fetchMock.mockImplementation(() => ok({ venta: { fecha: "14/10/2026", valor: 454.56 }, compra: { valor: 449.35 } }));
    await expect(fetchExchangeRate("2026-10-15")).resolves.toMatchObject({ date: "2026-10-15" });
    fetchMock.mockImplementation(() => ok({ venta: { valor: 454.56 }, compra: { valor: 449.35 } }));
    await expect(fetchExchangeRate("2026-10-15")).resolves.toMatchObject({ date: "2026-10-15" });
  });
  it("venta como Infinity, NaN o string vacío no pasa como TC", async () => {
    for (const valor of [Infinity, "NaN", "", null, -454]) {
      fetchMock.mockImplementation((url) => (url === HACIENDA ? ok({ venta: { valor } }) : ok({ rates: { CRC: 455.5 } })));
      await expect(fetchExchangeRate("2026-10-15")).resolves.toEqual({ venta: 455.5, compra: 455.5, date: "2026-10-15" });
    }
  });
  it("json() que revienta en Hacienda cae al respaldo", async () => {
    fetchMock.mockImplementation((url) =>
      url === HACIENDA
        ? Promise.resolve({ ok: true, json: () => Promise.reject(new SyntaxError("bad json")) })
        : ok({ rates: { CRC: 455 } }));
    await expect(fetchExchangeRate("2026-10-15")).resolves.toEqual({ venta: 455, compra: 455, date: "2026-10-15" });
  });
  it("si Hacienda se cuelga, a los 8 s cae al respaldo", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation((url, opts) =>
      url === HACIENDA
        ? new Promise((_, reject) => opts?.signal?.addEventListener("abort", () => reject(new Error("aborted"))))
        : ok({ rates: { CRC: 455 } }));
    const p = fetchExchangeRate("2026-10-15");
    await vi.advanceTimersByTimeAsync(8000);
    await expect(p).resolves.toEqual({ venta: 455, compra: 455, date: "2026-10-15" });
  });
  it("el resultado sirve directo como rate de toCRC", async () => {
    fetchMock.mockImplementation(() => ok({ venta: { fecha: "2026-10-14", valor: 454.56 }, compra: { valor: 449.35 } }));
    const rate = await fetchExchangeRate("2026-10-14");
    expect(toCRC(350, "USD", rate)).toBeCloseTo(159096);
  });
});

describe("normalizeRate: TC guardado en formas viejas o sucias", () => {
  it("venta/compra como strings numéricos se devuelven como números", () => {
    expect(normalizeRate({ venta: "454.56", compra: "449.35", date: "2026-10-14" })).toEqual({ venta: 454.56, compra: 449.35, date: "2026-10-14" });
    expect(normalizeRate("455")).toEqual({ venta: 455, compra: 455, date: null });
  });
  it("Infinity, NaN, negativo y objeto vacío caen a DEFAULT_RATE", () => {
    for (const r of [Infinity, NaN, -455, {}, { venta: 0 }, { venta: Infinity }, undefined, "abc"]) {
      expect(normalizeRate(r)).toEqual({ ...DEFAULT_RATE, date: null });
    }
  });
  it("compra inválida se rellena con venta", () => {
    expect(normalizeRate({ venta: 454.56, compra: -1 })).toEqual({ venta: 454.56, compra: 454.56, date: null });
  });
  it("date vacío o undefined queda null", () => {
    expect(normalizeRate({ venta: 454.56, compra: 449.35, date: undefined }).date).toBeNull();
    expect(normalizeRate({ venta: 454.56, compra: 449.35, date: "" }).date).toBeNull();
  });
});

describe("shouldRefreshRate: bordes", () => {
  const now = new Date(2026, 9, 15, 12, 0).getTime();
  it("justo 24 h no refresca; 24 h + 1 ms sí", () => {
    expect(shouldRefreshRate(new Date(now - 86400000), now)).toBe(false);
    expect(shouldRefreshRate(new Date(now - 86400001), now)).toBe(true);
  });
  it("acepta milisegundos y Timestamp serializado { seconds }", () => {
    expect(shouldRefreshRate(now - 3600000, now)).toBe(false);
    expect(shouldRefreshRate({ seconds: (now - 3600000) / 1000, nanoseconds: 0 }, now)).toBe(false);
    expect(shouldRefreshRate({ seconds: (now - 2 * 86400000) / 1000 }, now)).toBe(true);
  });
  it("fecha en el futuro (reloj del teléfono mal) obliga a refrescar", () => {
    expect(shouldRefreshRate(new Date(now + 3 * 86400000), now)).toBe(true);
  });
  it("un desfase chico hacia el futuro (reloj del servidor) no refresca", () => {
    expect(shouldRefreshRate(new Date(now + 60000), now)).toBe(false);
  });
  it("Timestamp con toDate inválido refresca", () => {
    expect(shouldRefreshRate({ toDate: () => new Date(NaN) }, now)).toBe(true);
  });
});
