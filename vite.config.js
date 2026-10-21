import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Tokens bg / accent (modo claro), ver docs/DESIGN-TOKENS.md
const BG = '#F4F5F7'
const ACCENT = '#2F56D9'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Clear Books',
        short_name: 'Books',
        description: 'Tu plan del mes y tu ahorro, en un solo lugar',
        lang: 'es-CR',
        start_url: '/clear-books/',
        scope: '/clear-books/',
        display: 'standalone',
        background_color: BG,
        theme_color: ACCENT,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          {
            name: 'Anotar gasto',
            url: '/clear-books/#/gasto/nuevo',
            icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/clear-books/index.html',
      },
    }),
  ],
  base: command === 'build' ? '/clear-books/' : '/',
  server: {
    port: 5173,
    open: true,
  },
}))
