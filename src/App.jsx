import { T, FONTS, fontSans } from "./lib/constants.js";

export default function App({ user, onSignOut }) {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", ...fontSans }}>
      <style>{FONTS}</style>
      <div style={{ textAlign: "center", color: T.ink2 }}>
        <p>Hola, {user.displayName}</p>
        <button onClick={onSignOut} style={{ marginTop: 12, color: T.accent, background: "none", border: "none", cursor: "pointer", ...fontSans }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
