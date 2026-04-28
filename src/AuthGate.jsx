import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
`;
const font = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function AuthGate({ children }) {
  const [user,    setUser]    = useState(undefined);
  const [signing, setSigning] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);

  if (user === undefined) {
    return (
      <div style={{ background: "#f8fafc", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", ...font }}>
        <style>{FONTS}</style>
        <div style={{ color: "#94a3b8", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Cargando…
        </div>
      </div>
    );
  }

  if (!user) {
    const handleLogin = async () => {
      setSigning(true);
      setError(null);
      try {
        await signInWithPopup(auth, new GoogleAuthProvider());
      } catch (e) {
        if (e.code !== "auth/popup-closed-by-user") {
          setError("No se pudo iniciar sesión. Intentá de nuevo.");
        }
      } finally {
        setSigning(false);
      }
    };

    return (
      <div style={{ background: "#f8fafc", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", ...font }}>
        <style>{FONTS}</style>
        <div style={{ width: "100%", maxWidth: "380px", textAlign: "center" }}>
          <div style={{ color: "#4f46e5", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Libro de cuentas
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
            Finanzas<br/>
            <em style={{ color: "#4f46e5", fontStyle: "italic", fontWeight: 700 }}>personales.</em>
          </h1>
          <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Iniciá sesión para acceder a tus datos desde cualquier dispositivo.
          </p>

          <button
            onClick={handleLogin}
            disabled={signing}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
              width: "100%", padding: "0.875rem 1.5rem",
              background: "white", border: "1px solid #e2e8f0", borderRadius: "0.875rem",
              fontSize: "0.9rem", fontWeight: 600, color: "#0f172a",
              cursor: signing ? "not-allowed" : "pointer",
              opacity: signing ? 0.6 : 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              transition: "box-shadow 150ms",
              ...font,
            }}
          >
            <GoogleIcon />
            {signing ? "Iniciando sesión…" : "Continuar con Google"}
          </button>

          {error && (
            <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "1rem" }}>{error}</p>
          )}
        </div>
      </div>
    );
  }

  return children;
}
