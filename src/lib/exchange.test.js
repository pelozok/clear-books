import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchExchangeRate, shouldRefreshRate, normalizeRate, DEFAULT_RATE } from "./exchange.js";

const HACIENDA = "https://api.hacienda.go.cr/indicadores/tc/dolar";
const FALLBACK = "https://open.er-api.com/v6/latest/USD";

const ok = (body) => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
const fail = () => Promise.resolve({ ok: false, json: () => Promise.reject(new Error("no body")) });

const haciendaBody = {
  venta: { fecha: "2026-10-14", valor: 454.56 },
  compra: { fecha: "2026-10-14", valor: 449.35 },
};

let fetchMock;
beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("DEFAULT_RATE", () => {
  it("tiene venta y compra, venta mayor que compra", () => {
    expect(DEFAULT_RATE).toEqual({ venta: 455, compra: 450 });
    expect(DEFAULT_RATE.venta).toBeGreaterThan(DEFAULT_RATE.compra);
  });
});

describe("fetchExchangeRate", () => {
  it("usa Hacienda: venta, compra y fecha", async () => {
    fetchMock.mockImplementation((url) => (url === HACIENDA ? ok(haciendaBody) : fail()));
    await expect(fetchExchangeRate("2026-10-14")).resolves.toEqual({ venta: 454.56, compra: 449.35, date: "2026-10-14" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(HACIENDA, expect.anything());
  });

  it("redondea a 2 decimales y toma la fecha de venta", async () => {
    fetchMock.mockImplementation(() => ok({ venta: { fecha: "2026-10-13T00:00:00", valor: "454.567" }, compra: { valor: 449.333 } }));
    await expect(fetchExchangeRate("2026-10-14")).resolves.toEqual({ venta: 454.57, compra: 449.33, date: "2026-10-13" });
  });

  it("si Hacienda trae compra inválida, compra = venta", async () => {
    fetchMock.mockImplementation(() => ok({ venta: { fecha: "2026-10-14", valor: 454.56 }, compra: { valor: 0 } }));
    await expect(fetchExchangeRate("2026-10-14")).resolves.toEqual({ venta: 454.56, compra: 454.56, date: "2026-10-14" });
  });

  it("cae a open.er-api con compra = venta y la fecha de hoy", async () => {
    fetchMock.mockImplementation((url) => (url === HACIENDA ? fail() : ok({ rates: { CRC: 456.123 } })));
    await expect(fetchExchangeRate("2026-10-14")).resolves.toEqual({ venta: 456.12, compra: 456.12, date: "2026-10-14" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenLastCalledWith(FALLBACK, expect.anything());
  });

  it("también cae al respaldo si Hacienda responde sin venta o la red falla", async () => {
    fetchMock.mockImplementation((url) => (url === HACIENDA ? ok({ venta: null }) : ok({ rates: { CRC: 455 } })));
    await expect(fetchExchangeRate("2026-10-14")).resolves.toEqual({ venta: 455, compra: 455, date: "2026-10-14" });

    fetchMock.mockImplementation((url) => (url === HACIENDA ? Promise.reject(new TypeError("Failed to fetch")) : ok({ rates: { CRC: 455 } })));
    await expect(fetchExchangeRate("2026-10-14")).resolves.toEqual({ venta: 455, compra: 455, date: "2026-10-14" });
  });

  it("lanza si ambas fuentes fallan", async () => {
    fetchMock.mockImplementation(() => fail());
    await expect(fetchExchangeRate("2026-10-14")).rejects.toThrow();
  });
});

describe("normalizeRate", () => {
  it("convierte el número viejo a { venta, compra }", () => {
    expect(normalizeRate(455)).toEqual({ venta: 455, compra: 455, date: null });
  });
  it("respeta la forma nueva y rellena compra si falta", () => {
    expect(normalizeRate({ venta: 454.56, compra: 449.35, date: "2026-10-14" })).toEqual({ venta: 454.56, compra: 449.35, date: "2026-10-14" });
    expect(normalizeRate({ venta: 454.56 })).toEqual({ venta: 454.56, compra: 454.56, date: null });
  });
  it("sin valor usa DEFAULT_RATE", () => {
    expect(normalizeRate(null)).toEqual({ ...DEFAULT_RATE, date: null });
    expect(normalizeRate(0)).toEqual({ ...DEFAULT_RATE, date: null });
  });
});

describe("shouldRefreshRate", () => {
  const now = Date.UTC(2026, 9, 14, 12, 0, 0);
  it("sin fecha guardada hay que refrescar", () => {
    expect(shouldRefreshRate(null, now)).toBe(true);
    expect(shouldRefreshRate("", now)).toBe(true);
    expect(shouldRefreshRate("no es fecha", now)).toBe(true);
  });
  it("menos de 24h no refresca, más de 24h sí", () => {
    expect(shouldRefreshRate(new Date(now - 2 * 3600 * 1000).toISOString(), now)).toBe(false);
    expect(shouldRefreshRate(new Date(now - 25 * 3600 * 1000).toISOString(), now)).toBe(true);
  });
  it("acepta fecha ISO corta y Timestamp de Firestore", () => {
    expect(shouldRefreshRate("2026-10-12", now)).toBe(true);
    expect(shouldRefreshRate({ toDate: () => new Date(now - 60 * 1000) }, now)).toBe(false);
  });
});
