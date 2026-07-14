export const DEFAULT_RATE = 455;

// Tipo de cambio oficial del BCCR (venta), vía la API pública del
// Ministerio de Hacienda (el web service del BCCR es SOAP y no permite CORS).
const fetchFromBCCR = async () => {
  const res = await fetch("https://api.hacienda.go.cr/indicadores/tc/dolar");
  if (!res.ok) throw new Error("HTTP error");
  const data = await res.json();
  const venta = Number(data?.venta?.valor);
  if (!venta || venta <= 0) throw new Error("No venta in response");
  return Math.round(venta * 100) / 100;
};

// Respaldo si Hacienda está caído (tasa de mercado, no BCCR).
const fetchFallback = async () => {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("HTTP error");
  const data = await res.json();
  if (!data.rates?.CRC) throw new Error("No CRC in response");
  return Math.round(data.rates.CRC);
};

export const fetchExchangeRate = async () => {
  try {
    return await fetchFromBCCR();
  } catch {
    return await fetchFallback();
  }
};

// El tipo de cambio se refresca si tiene más de 24 horas.
export const shouldRefreshRate = (updatedAt) => {
  if (!updatedAt) return true;
  return Date.now() - new Date(updatedAt).getTime() > 24 * 60 * 60 * 1000;
};
