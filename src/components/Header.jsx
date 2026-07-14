import PeriodPicker from "./PeriodPicker.jsx";

export default function Header({ profile, periodKey, setPeriodKey, onOpenSettings, onSignOut }) {
  const title = profile.mode === "pareja" ? "Presupuesto del hogar" : "Mi presupuesto";
  const names = profile.people.map((p) => p.name).filter(Boolean).join(" y ");

  return (
    <header className="mb-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-extrabold text-ink leading-tight">{title}</h1>
          <p className="text-xs text-muted">{names}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenSettings}
            title="Ajustes"
            className="w-9 h-9 rounded-xl text-lg hover:bg-bg2"
          >
            ⚙️
          </button>
          <button
            type="button"
            onClick={onSignOut}
            title="Cerrar sesión"
            className="w-9 h-9 rounded-xl text-base hover:bg-bg2"
          >
            ↩︎
          </button>
        </div>
      </div>
      <PeriodPicker periodKey={periodKey} setPeriodKey={setPeriodKey} frequency={profile.frequency} />
    </header>
  );
}
