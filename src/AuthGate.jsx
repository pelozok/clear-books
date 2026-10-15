import { useEffect, useState } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth } from './firebaseConfig.js'
import { Button } from './components/ui/index.js'

// Logo oficial de Google: sus colores de marca son parte del botón, no decoración.
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
)

/** Login con Google. children puede ser un nodo o una función (user) => nodo. */
export default function AuthGate({ children }) {
  const [user, setUser] = useState(undefined)
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), [])

  // Mientras Firebase resuelve la sesión: fondo liso, sin spinner ni texto que parpadee
  if (user === undefined) return <div className="min-h-dvh bg-bg" aria-busy="true" />

  if (!user) {
    const handleLogin = async () => {
      setSigning(true)
      setError(null)
      try {
        await signInWithPopup(auth, new GoogleAuthProvider())
      } catch (e) {
        if (e.code !== 'auth/popup-closed-by-user') setError('No se pudo iniciar sesión. Intentá de nuevo.')
      } finally {
        setSigning(false)
      }
    }

    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg px-gutter">
        <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-card sm:p-8">
          <h1 className="text-title text-ink">clear-books</h1>
          <p className="mt-2 text-body text-ink-2">
            El plan del mes y lo que llevan ahorrado, en un solo lugar. Iniciá sesión para ver tus datos desde
            cualquier dispositivo.
          </p>
          <Button variant="secondary" size="lg" full loading={signing} icon={<GoogleIcon />} onClick={handleLogin} className="mt-6">
            Continuar con Google
          </Button>
          {error && (
            <p role="alert" className="mt-3 text-small text-bad">
              {error}
            </p>
          )}
        </div>
      </main>
    )
  }

  return typeof children === 'function' ? children(user) : children
}
