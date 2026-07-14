import { Card } from "./ui.jsx";
import { fmt } from "../lib/format.js";
import { summary } from "../lib/calc.js";

function Row({ label, value, sign, bold, color }) {
  return (
    <div className={`flex items-center justify-between py-1.5 ${bold ? "font-bold" : ""}`}>
      <span className={`text-sm ${bold ? "text-ink" : "text-ink2"}`}>{label}</span>
      <span className={`text-sm font-mono font-semibold ${color || "text-ink"}`}>
        {sign && <span className="text-muted mr-1">{sign}</span>}
        {fmt(value)}
      </span>
    </div>
  );
}

export default function SummaryCard({ income, fixedTotal, variableTotal, savings, frequency }) {
  const s = summary({ income, fixed: fixedTotal, variable: variableTotal, savings });
  const periodo = frequency === "quincenal" ? "la quincena" : "el mes";
  const finalColor = s.final >= 0 ? "text-good" : "text-bad";

  return (
    <Card>
      <div className="text-center pb-4 mb-3 border-b border-line">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
          Terminamos {periodo} con
        </p>
        <p className={`text-4xl font-extrabold font-mono ${finalColor}`}>{fmt(s.final)}</p>
        {s.final < 0 && (
          <p className="text-xs text-bad mt-1.5">
            Los gastos y el ahorro superan los ingresos de este período.
          </p>
        )}
      </div>
      <Row label="Ingresos" value={income} sign="+" />
      <Row label="Gastos fijos" value={fixedTotal} sign="−" />
      <Row label="Gastos variables" value={variableTotal} sign="−" />
      <div className="border-t border-line mt-1 pt-1">
        <Row label="Sobrante" value={s.sobrante} bold color={s.sobrante >= 0 ? "text-ink" : "text-bad"} />
      </div>
      {savings > 0 && <Row label="Meta de ahorro" value={savings} sign="−" />}
    </Card>
  );
}
