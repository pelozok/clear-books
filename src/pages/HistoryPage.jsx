import { useEffect, useState } from "react";
import { ChevronLeft, History, PiggyBank } from "lucide-react";
import { Card, EmptyState } from "../components/ui.jsx";
import { fetchAllData } from "../data/archive.js";
import { fmt } from "../lib/format.js";
import { sumCRC } from "../lib/calc.js";
import { currentPeriodKey, periodLabel } from "../lib/periods.js";
import { DEFAULT_RATE } from "../lib/exchange.js";

// Cómo les fue en cada período: "Terminamos con" a lo largo del tiempo
// y el ahorro acumulado según las metas de cada período.
export default function HistoryPage({ uid, profile, onBack }) {
  const [rows, setRows] = useState(null); // null = cargando

  useEffect(() => {
    let alive = true;
    fetchAllData(uid).then(({ periods, expenses }) => {
      if (!alive) return;
      const list = periods
        .map((p) => {
          const rate = p.exchangeRate || DEFAULT_RATE;
          const income = Object.values(p.incomes || {}).reduce(
            (s, inc) => s + (Number(inc.crc) || 0) + (Number(inc.usd) || 0) * rate,
            0
          );
          const fixed = sumCRC(p.fixedItems || [], rate);
          const variable = sumCRC(expenses.filter((e) => e.periodKey === p.key), rate);
          const savings = Number(p.savingsGoal) || 0;
          return { key: p.key, income, gastos: fixed + variable, savings, final: income - fixed - variable - savings };
        })
        .sort((a, b) => b.key.localeCompare(a.key));
      setRows(list);
    });
    return () => { alive = false; };
  }, [uid]);

  const current = currentPeriodKey(profile.frequency);
  const past = rows?.filter((r) => r.key !== current) || [];
  const ahorroAcumulado = past.reduce((s, r) => s + r.savings, 0);
  const cumplidos = past.filter((r) => r.final >= 0).length;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <header className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl border border-line bg-white text-ink2 hover:bg-bg2 flex items-center justify-center"
          aria-label="Volver"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-lg font-extrabold text-ink">Historial</h1>
      </header>

      {rows === null ? (
        <p className="text-sm text-muted text-center py-16">Cargando…</p>
      ) : rows.length === 0 ? (
        <Card>
          <EmptyState icon={History} text="Todavía no hay períodos guardados." />
        </Card>
      ) : (
        <div className="space-y-4">
          {past.length > 0 && (
            <Card>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <PiggyBank size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-ink2">Ahorro acumulado (metas de períodos pasados)</p>
                  <p className="text-2xl font-extrabold font-mono text-ink">{fmt(ahorroAcumulado)}</p>
                </div>
              </div>
              <p className="text-[11px] text-muted mt-2">
                {cumplidos} de {past.length} períodos terminaron en positivo.
              </p>
            </Card>
          )}

          <Card title="Períodos" subtitle="Con cuánto terminaron cada uno, después del ahorro.">
            <ul className="divide-y divide-line -mx-1">
              {rows.map((r) => (
                <li key={r.key} className="flex items-center gap-3 px-1 py-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">
                      {periodLabel(r.key)}
                      {r.key === current && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-accent bg-accent-soft rounded-full px-2 py-0.5">
                          En curso
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-muted">
                      Ingresos {fmt(r.income)} · Gastos {fmt(r.gastos)}
                      {r.savings > 0 && <> · Ahorro {fmt(r.savings)}</>}
                    </p>
                  </div>
                  <span className={`text-sm font-mono font-bold ${r.final >= 0 ? "text-good" : "text-bad"}`}>
                    {fmt(r.final)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
