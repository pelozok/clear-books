// Ids deterministas del libro de ahorro: una acción repetida (doble toque,
// reintento offline) escribe el mismo documento en vez de duplicarlo.
// Formato: `${hid}-${monthKey}-…`. Solo [A-Za-z0-9_-], válido como id de Firestore.

const clean = (s) => String(s ?? "").replace(/[^A-Za-z0-9_-]/g, "_");

const join = (...parts) => parts.map(clean).join("-");

// Aporte planeado de una persona en una quincena (mensual: half = 1).
export const savingsLedgerId = (hid, monthKey, personId, half) =>
  join(hid, monthKey, personId, half ?? 1);

// Aporte a una reserva anual en un mes (uno por reserva).
export const reserveLedgerId = (hid, monthKey, annualId) =>
  join(hid, monthKey, "reserve", annualId);

// Pago de una reserva anual (marchamo en noviembre, etc.).
export const annualPayLedgerId = (hid, monthKey, annualId) =>
  join(hid, monthKey, "pay", annualId);

// Movimiento enlazado a un extra del mes (aguinaldo apartado, gasto extra del ahorro).
export const extraLedgerId = (hid, monthKey, extraId) =>
  join(hid, monthKey, "extra", extraId);

// Retiro enlazado a un gasto variable pagado del ahorro.
export const entryLedgerId = (hid, monthKey, entryId) =>
  join(hid, monthKey, "expense", entryId);

// Retiro para cubrir el déficit al cerrar el mes.
export const coverLedgerId = (hid, monthKey) => join(hid, monthKey, "cover");

// Entradas que genera el cierre sin id propio: por tipo y posición.
export const closeLedgerId = (hid, monthKey, kind, index) =>
  join(hid, monthKey, "close", kind, index);

// Lee el hid y el mes de un id determinista (para depurar o migrar). null si no calza.
export const parseLedgerId = (id) => {
  const m = /^(.+?)-(\d{4}-\d{2})-(.+)$/.exec(String(id ?? ""));
  if (!m) return null;
  return { hid: m[1], monthKey: m[2], rest: m[3] };
};

// Id del libro para un movimiento que el cierre (lib/close.js) ya trae con id local
// "2026-10-close-cover": se le antepone el hid. Sin id local, cae a closeLedgerId.
export const closeEntryDocId = (hid, monthKey, entry, index) => {
  const local = entry?.id ? String(entry.id) : "";
  if (local.startsWith(`${monthKey}-`)) return join(hid, local);
  return closeLedgerId(hid, monthKey, entry?.kind || "mov", index);
};
