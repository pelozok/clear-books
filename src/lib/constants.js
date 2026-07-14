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

// budget en CRC por período; 0 = sin presupuesto definido. icon: ver lib/icons.jsx.
export const DEFAULT_CATEGORIES = [
  { id: "vivienda",        label: "Vivienda",        icon: "home",     color: "#4f46e5", budget: 0 },
  { id: "alimentacion",    label: "Alimentación",    icon: "utensils", color: "#7c3aed", budget: 0 },
  { id: "transporte",      label: "Transporte",      icon: "car",      color: "#0891b2", budget: 0 },
  { id: "servicios",       label: "Servicios",       icon: "zap",      color: "#0369a1", budget: 0 },
  { id: "salud",           label: "Salud",           icon: "heart",    color: "#0f766e", budget: 0 },
  { id: "entretenimiento", label: "Entretenimiento", icon: "film",     color: "#d97706", budget: 0 },
  { id: "ropa",            label: "Ropa",            icon: "shirt",    color: "#db2777", budget: 0 },
  { id: "otros",           label: "Otros",           icon: "wallet",   color: "#64748b", budget: 0 },
];

export const COLOR_PALETTE = [
  "#4f46e5", "#7c3aed", "#0891b2", "#0369a1", "#0f766e",
  "#059669", "#d97706", "#dc2626", "#db2777", "#64748b", "#92400e", "#1d4ed8",
];

// Sugerencias de gastos fijos para el onboarding (del machote familiar).
export const FIXED_SUGGESTIONS = [
  { name: "Alquiler / Apartamento" },
  { name: "Internet" },
  { name: "Electricidad" },
  { name: "Agua" },
  { name: "Celulares" },
  { name: "Auto (cuota)" },
  { name: "Gasolina" },
  { name: "Mercado" },
  { name: "Streaming (Netflix…)" },
];

export const getCat = (id, cats) =>
  cats.find((c) => c.id === id) || cats[cats.length - 1];
