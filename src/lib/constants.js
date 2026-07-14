// Tokens de color (mismos valores que tailwind.config.js, para estilos inline).
export const T = {
  bg:         "#fafaf9",
  bg2:        "#f5f5f4",
  ink:        "#1c1917",
  ink2:       "#57534e",
  muted:      "#a8a29e",
  line:       "#e7e5e4",
  accent:     "#4338ca",
  accentSoft: "#eeecfd",
  good:       "#16a34a",
  warn:       "#b45309",
  bad:        "#dc2626",
};

// budget en CRC por período; 0 = sin presupuesto definido.
export const DEFAULT_CATEGORIES = [
  { id: "vivienda",        label: "Vivienda",        emoji: "🏠", color: "#4f46e5", budget: 0 },
  { id: "alimentacion",    label: "Alimentación",    emoji: "🍽️", color: "#7c3aed", budget: 0 },
  { id: "transporte",      label: "Transporte",      emoji: "🚗", color: "#0891b2", budget: 0 },
  { id: "servicios",       label: "Servicios",       emoji: "⚡",  color: "#0369a1", budget: 0 },
  { id: "salud",           label: "Salud",           emoji: "❤️", color: "#0f766e", budget: 0 },
  { id: "entretenimiento", label: "Entretenimiento", emoji: "🎬", color: "#d97706", budget: 0 },
  { id: "ropa",            label: "Ropa",            emoji: "👕", color: "#db2777", budget: 0 },
  { id: "otros",           label: "Otros",           emoji: "💰", color: "#64748b", budget: 0 },
];

export const COLOR_PALETTE = [
  "#4f46e5", "#7c3aed", "#0891b2", "#0369a1", "#0f766e",
  "#059669", "#d97706", "#dc2626", "#db2777", "#64748b", "#92400e", "#1d4ed8",
];

// Sugerencias de gastos fijos para el onboarding (del machote familiar).
export const FIXED_SUGGESTIONS = [
  { name: "Alquiler / Apartamento", categoryId: "vivienda" },
  { name: "Internet",               categoryId: "servicios" },
  { name: "Electricidad",           categoryId: "servicios" },
  { name: "Agua",                   categoryId: "servicios" },
  { name: "Celulares",              categoryId: "servicios" },
  { name: "Auto (cuota)",           categoryId: "transporte" },
  { name: "Gasolina",               categoryId: "transporte" },
  { name: "Mercado",                categoryId: "alimentacion" },
  { name: "Streaming (Netflix…)",   categoryId: "entretenimiento" },
];

export const getCat = (id, cats) =>
  cats.find((c) => c.id === id) || cats[cats.length - 1];
