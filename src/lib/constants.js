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

export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
`;

export const fontSans    = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
export const fontDisplay = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 700 };
export const fontBody    = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
export const fontMono    = { fontFamily: "'JetBrains Mono', monospace" };

export const DEFAULT_CATEGORIES = [
  { id: "vivienda",        label: "Vivienda",        emoji: "🏠", type: "necesidad", color: "#4f46e5" },
  { id: "alimentacion",    label: "Alimentación",    emoji: "🍽️", type: "necesidad", color: "#7c3aed" },
  { id: "transporte",      label: "Transporte",      emoji: "🚗", type: "necesidad", color: "#0891b2" },
  { id: "servicios",       label: "Servicios",       emoji: "⚡",  type: "necesidad", color: "#0369a1" },
  { id: "salud",           label: "Salud",           emoji: "❤️", type: "necesidad", color: "#0f766e" },
  { id: "educacion",       label: "Educación",       emoji: "📚", type: "deseo",     color: "#059669" },
  { id: "entretenimiento", label: "Entretenimiento", emoji: "🎬", type: "deseo",     color: "#d97706" },
  { id: "ropa",            label: "Ropa",            emoji: "👕", type: "deseo",     color: "#db2777" },
  { id: "otros",           label: "Otros",           emoji: "💰", type: "deseo",     color: "#64748b" },
];

export const COLOR_PALETTE = [
  "#4f46e5","#7c3aed","#0891b2","#0369a1","#0f766e",
  "#059669","#d97706","#dc2626","#db2777","#64748b","#92400e","#1d4ed8",
];

export const DEFAULT_BUDGET_PCTS = {
  vivienda: 0.25, alimentacion: 0.15, transporte: 0.05, servicios: 0.03, salud: 0.02,
  educacion: 0.08, entretenimiento: 0.10, ropa: 0.07, otros: 0.05,
};
