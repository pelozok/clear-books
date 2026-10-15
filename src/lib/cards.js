// Tarjetas de crédito: detección por nombre y aviso anti doble conteo.
// Si el pago de la tarjeta es un fijo y además se anotan gastos variables
// hechos con esa tarjeta, el mismo dinero se cuenta dos veces.

// Palabras completas (límites de palabra con acentos): "BAC" sí, "bacalao" no.
// "tarjetas" y "credomatic" con sufijos razonables.
const CARD_RE = /(^|[^\p{L}\p{N}])(tarjetas?|visa|master\s?card|bac|credomatic|amex|american\s+express)(?=$|[^\p{L}\p{N}])/iu;

// ¿El nombre de un fijo parece el pago de una tarjeta?
export const looksLikeCard = (name) => (typeof name === "string" && name ? CARD_RE.test(name) : false);

// Aviso cuando hay un fijo que parece tarjeta (y no está marcado como cuota
// financiada, isDebt) y ya hay gastos variables anotados en el mes.
// Devuelve el primer fijo sospechoso; ignora los saltados del mes.
export const detectCardDoubleCount = (fixedItems = [], entriesCount = 0) => {
  if (!(Number(entriesCount) > 0)) return { warn: false, item: null };
  const item = (fixedItems || []).find(
    (it) => it && !it.isDebt && it.status !== "skipped" && looksLikeCard(it.name),
  );
  return item ? { warn: true, item } : { warn: false, item: null };
};
