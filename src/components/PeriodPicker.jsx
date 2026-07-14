import { periodLabel, prevPeriodKey, nextPeriodKey, currentPeriodKey } from "../lib/periods.js";

export default function PeriodPicker({ periodKey, setPeriodKey, frequency }) {
  const current = currentPeriodKey(frequency);
  const isCurrent = periodKey === current;

  const Arrow = ({ dir, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 rounded-xl border border-line bg-white text-ink2 hover:text-ink hover:bg-bg2 text-lg leading-none"
      aria-label={dir === "prev" ? "Período anterior" : "Período siguiente"}
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );

  return (
    <div className="flex items-center justify-between gap-2">
      <Arrow dir="prev" onClick={() => setPeriodKey(prevPeriodKey(periodKey))} />
      <div className="text-center">
        <div className="text-sm font-bold text-ink">{periodLabel(periodKey)}</div>
        {!isCurrent && (
          <button
            type="button"
            onClick={() => setPeriodKey(current)}
            className="text-[11px] text-accent font-semibold hover:underline"
          >
            Volver a hoy
          </button>
        )}
      </div>
      <Arrow dir="next" onClick={() => setPeriodKey(nextPeriodKey(periodKey))} />
    </div>
  );
}
