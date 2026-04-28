import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthGate from './AuthGate.jsx'
import { auth } from './firebaseConfig.js'
import { signOut } from 'firebase/auth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthGate>
      <App onSignOut={() => signOut(auth)} />
    </AuthGate>
  </StrictMode>,
)
