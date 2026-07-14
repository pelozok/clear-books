export const DEFAULT_RATE = 515;

export const fetchExchangeRate = async () => {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("HTTP error");
  const data = await res.json();
  if (!data.rates?.CRC) throw new Error("No CRC in response");
  return Math.round(data.rates.CRC);
};

// El tipo de cambio se refresca si tiene más de 24 horas.
export const shouldRefreshRate = (updatedAt) => {
  if (!updatedAt) return true;
  return Date.now() - new Date(updatedAt).getTime() > 24 * 60 * 60 * 1000;
};
