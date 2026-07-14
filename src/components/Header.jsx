import { Settings, LogOut, History } from "lucide-react";
import PeriodPicker from "./PeriodPicker.jsx";

export default function Header({ profile, rate, periodKey, setPeriodKey, onOpenHistory, onOpenSettings, onSignOut }) {
  const title = profile.mode === "pareja" ? "Presupuesto del hogar" : "Mi presupuesto";
  const names = profile.people.map((p) => p.name).filter(Boolean).join(" y ");
  const rateLabel = Number(rate).toLocaleString("es-CR", { maximumFractionDigits: 2 });

  return (
    <header className="mb-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-extrabold text-ink leading-tight">{title}</h1>
          <p className="text-xs text-muted">
            {names} · $1 = ₡{rateLabel}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenHistory}
            title="Historial"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink2 hover:text-ink hover:bg-bg2"
          >
            <History size={18} />
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            title="Ajustes"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink2 hover:text-ink hover:bg-bg2"
          >
            <Settings size={18} />
          </button>
          <button
            type="button"
            onClick={onSignOut}
            title="Cerrar sesión"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink2 hover:text-ink hover:bg-bg2"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
      <PeriodPicker periodKey={periodKey} setPeriodKey={setPeriodKey} frequency={profile.frequency} />
    </header>
  );
}
