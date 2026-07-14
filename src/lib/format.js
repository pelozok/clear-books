export const toCRC = (amount, currency, rate) =>
  currency === "USD" ? amount * rate : amount;

export const fmt = (n) => {
  if (n == null || isNaN(n)) return "₡0";
  const abs = Math.abs(Math.round(n)).toLocaleString("es-CR");
  return `${n < 0 ? "−" : ""}₡${abs}`;
};

export const fmtUSD = (n) => {
  if (n == null || isNaN(n)) return "$0";
  return `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

export const fmtAmount = (amount, currency) =>
  currency === "USD" ? fmtUSD(amount) : fmt(amount);
