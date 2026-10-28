import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import './index.css' // incluye styles/components.css
import App from './App.jsx'

// El service worker (versión nueva → aviso) se registra en components/layout/UpdatePrompt.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
