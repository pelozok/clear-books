import { useState, useEffect, useRef } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { T, fontSans, fontBody } from "../lib/constants.js";
import { monthLabel, quincenaLabel } from "../lib/helpers.js";

export function Header({ config, user, currentMonth, setCurrentMonth, currentHalf, setCurrentHalf, months, onOpenSettings, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const isQ = config?.payFrequency === "quincenal";

  useEffect(() => {
    const close = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "";

  const quincenaOptions = months.flatMap(m => [
    { month: m, half: 1 },
    { month: m, half: 2 },
  ]);

  const handleQuincenaChange = (e) => {
    const parts = e.target.value.split("-");
    const h = parts.pop();
    setCurrentMonth(parts.join("-"));
    setCurrentHalf(parseInt(h));
  };

  return (
    <header className="flex items-start justify-between mb-8 sm:mb-14">
      <div>
        {firstName && (
          <div style={{ color: T.ink2 }} className="text-sm font-medium mb-1.5">
            Hola, {firstName}
          </div>
        )}
        <h1 style={{ ...fontSans, fontWeight: 800, color: T.ink }}
          className="text-3xl sm:text-5xl tracking-tight leading-none">
          Finanzas
        </h1>
        <div className="mt-4">
          {isQ ? (
            <select
              value={`${currentMonth}-${currentHalf}`}
              onChange={handleQuincenaChange}
              style={{ background: "white", borderColor: T.line, color: T.ink2, ...fontBody }}
              className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition min-h-[40px]">
              {quincenaOptions.map(({ month, half }) => (
                <option key={`${month}-${half}`} value={`${month}-${half}`}>
                  {quincenaLabel(month, half)}
                </option>
              ))}
            </select>
          ) : (
            <select value={currentMonth} onChange={e => setCurrentMonth(e.target.value)}
              style={{ background: "white", borderColor: T.line, color: T.ink2, ...fontBody }}
              className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition min-h-[40px]">
              {months.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
            </select>
          )}
        </div>
      </div>

      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ borderColor: T.line, background: "white" }}
          className="flex items-center gap-2 pl-2 pr-3 py-2 border rounded-xl hover:bg-slate-50 active:bg-slate-100 transition shadow-sm">
          {user?.photoURL ? (
            <img src={user.photoURL} referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full" alt={firstName} />
          ) : (
            <div style={{ background: T.accent, color: "white" }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
              {firstName?.[0]?.toUpperCase()}
            </div>
          )}
          <ChevronDown size={13} style={{ color: T.muted, transition: "transform 200ms", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
        </button>

        {menuOpen && (
          <div style={{ background: "white", borderColor: T.line }}
            className="absolute right-0 top-full mt-2 w-64 rounded-2xl border shadow-lg overflow-hidden z-40">
            <div style={{ borderColor: T.line }} className="flex items-center gap-3 px-4 py-3.5 border-b">
              {user?.photoURL ? (
                <img src={user.photoURL} referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full shrink-0" alt={firstName} />
              ) : (
                <div style={{ background: T.accent + "20", color: T.accent }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">
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
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium hover:bg-slate-50 active:bg-slate-100 transition">
              <Settings size={15} /> Configuración
            </button>
            <button
              onClick={onSignOut}
              style={{ color: T.ink2, borderColor: T.line }}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium hover:bg-slate-50 active:bg-slate-100 transition border-t">
              <LogOut size={15} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
