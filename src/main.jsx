import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import './index.css' // incluye styles/components.css
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'

// App instalada: busca versión nueva al abrirla o volver a ella (y cada hora); si hay,
// se activa sola y recarga la página para no quedarse con el build anterior.
registerSW({
  immediate: true,
  onRegisteredSW(_url, reg) {
    if (!reg) return
    const check = () => navigator.onLine && reg.update().catch(() => {})
    document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && check())
    setInterval(check, 60 * 60 * 1000)
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
