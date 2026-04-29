import { useState, useEffect, useRef } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { T, fontSans, fontBody } from "../lib/constants.js";
import { monthLabel } from "../lib/helpers.js";

export function Header({ config, user, currentMonth, setCurrentMonth, months, onOpenSettings, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "";

  return (
    <header className="flex items-start justify-between mb-10 sm:mb-14">
      <div>
        {firstName && (
          <div style={{ color: T.ink2 }} className="text-sm font-medium mb-2">
            Hola, {firstName}
          </div>
        )}
        <h1 style={{ ...fontSans, fontWeight: 800, color: T.ink }} className="text-4xl sm:text-5xl tracking-tight leading-none">
          Finanzas
        </h1>
        <div className="mt-4">
          <select value={currentMonth} onChange={e => setCurrentMonth(e.target.value)}
            style={{ background: "white", borderColor: T.line, color: T.ink2, ...fontBody }}
            className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition">
            {months.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
          </select>
        </div>
      </div>

      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ borderColor: T.line, background: "white" }}
          className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 border rounded-xl hover:bg-slate-50 transition shadow-sm">
          {user?.photoURL ? (
            <img src={user.photoURL} referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full" alt={firstName} />
          ) : (
            <div style={{ background: T.accent, color: "white" }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
              {firstName?.[0]?.toUpperCase()}
            </div>
          )}
          <ChevronDown size={13} style={{ color: T.muted, transition: "transform 200ms", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
        </button>

        {menuOpen && (
          <div style={{ background: "white", borderColor: T.line }}
            className="absolute right-0 top-full mt-2 w-60 rounded-xl border shadow-md overflow-hidden z-40">
            <div style={{ borderColor: T.line }} className="flex items-center gap-3 px-4 py-3 border-b">
              {user?.photoURL ? (
                <img src={user.photoURL} referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full shrink-0" alt={firstName} />
              ) : (
                <div style={{ background: T.accent + "20", color: T.accent }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0">
                  {firstName?.[0]?.toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <div style={{ color: T.ink }} className="text-sm font-semibold truncate">{user?.displayName}</div>
                <div style={{ color: T.muted }} className="text-xs truncate">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={() => { onOpenSettings(); setMenuOpen(false); }}
              style={{ color: T.ink2 }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-slate-50 transition">
              <Settings size={14} /> Configuración
            </button>
            <button
              onClick={onSignOut}
              style={{ color: T.ink2, borderColor: T.line }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-slate-50 transition border-t">
              <LogOut size={14} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
