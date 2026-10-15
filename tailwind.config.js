/** @type {import('tailwindcss').Config} */
// Los colores viven como variables CSS en src/index.css (claro/oscuro).
// Aquí solo se mapean para que funcionen con opacidad: bg-accent/10, text-ink/60, etc.
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // hover: solo con puntero fino → @media (hover: hover) and (pointer: fine)
  future: { hoverOnlyWhenSupported: true },
  theme: {
    // Motion (Emil Kowalski): solo transform y opacidad (+ filter para blur ≤ 4px).
    // No existe transition-all ni transition-colors a propósito.
    transitionProperty: {
      none: 'none',
      DEFAULT: 'transform, opacity',
      transform: 'transform',
      opacity: 'opacity',
      filter: 'filter',
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      bg: c('bg'),
      surface: { DEFAULT: c('surface'), 2: c('surface-2') },
      line: c('line'),
      ink: { DEFAULT: c('ink'), 2: c('ink-2') },
      muted: c('muted'),
      accent: { DEFAULT: c('accent'), ink: c('accent-ink'), soft: c('accent-soft') },
      'on-accent': c('on-accent'),
      good: { DEFAULT: c('good'), soft: c('good-soft') },
      warn: { DEFAULT: c('warn'), soft: c('warn-soft') },
      bad: { DEFAULT: c('bad'), soft: c('bad-soft') },
    },
    fontFamily: {
      sans: ["'Geist Variable'", 'system-ui', '-apple-system', "'Segoe UI'", 'sans-serif'],
    },
    fontSize: {
      // Escala fija en rem (docs/DESIGN-TOKENS.md). "display" baja a 2.5rem en < 360px vía CSS.
      micro: ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],
      small: ['0.8125rem', { lineHeight: '1.45' }],
      body: ['0.9375rem', { lineHeight: '1.5' }],
      heading: ['1.0625rem', { lineHeight: '1.3', fontWeight: '600' }],
      title: ['1.375rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
      display: ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
      // Alias de Tailwind que se siguen usando en utilidades genéricas
      xs: ['0.75rem', { lineHeight: '1.3' }],
      sm: ['0.8125rem', { lineHeight: '1.45' }],
      base: ['0.9375rem', { lineHeight: '1.5' }],
      lg: ['1.0625rem', { lineHeight: '1.3' }],
      xl: ['1.375rem', { lineHeight: '1.2' }],
    },
    extend: {
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        sheet: 'var(--shadow-sheet)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--ease-out)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        drawer: 'var(--ease-drawer)',
      },
      transitionDuration: {
        DEFAULT: 'var(--dur-hover)',
        press: 'var(--dur-press)',
        hover: 'var(--dur-hover)',
        toast: 'var(--dur-toast)',
        dropdown: 'var(--dur-dropdown)',
        'sheet-in': 'var(--dur-sheet-in)',
        'sheet-out': 'var(--dur-sheet-out)',
      },
      spacing: {
        side: 'var(--side-w)',
        nav: 'var(--nav-h)',
        'safe-b': 'env(safe-area-inset-bottom)',
        'safe-t': 'env(safe-area-inset-top)',
        gutter: 'var(--gutter)',
      },
      minHeight: {
        row: '56px',
        control: '44px',
      },
      height: {
        control: '44px',
      },
    },
  },
  plugins: [],
}
