/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:     '#fafaf9',
        bg2:    '#f5f5f4',
        ink:    '#1c1917',
        ink2:   '#57534e',
        muted:  '#a8a29e',
        line:   '#e7e5e4',
        accent: { DEFAULT: '#4338ca', soft: '#eeecfd' },
        good:   '#16a34a',
        warn:   '#b45309',
        bad:    '#dc2626',
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
}
