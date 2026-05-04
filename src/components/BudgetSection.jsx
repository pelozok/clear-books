import { T, fontMono } from "../lib/constants.js";
import { fmt } from "../lib/helpers.js";
import { Card } from "./ui.jsx";

function BudgetItem({ cat, spent, budget }) {
  const pct      = budget > 0 ? Math.min(spent / budget * 100, 100) : 0;
  const rawPct   = budget > 0 ? Math.round(spent / budget * 100) : null;
  const over     = spent > budget && budget > 0;
  const barColor = over || pct >= 90 ? T.bad : pct >= 70 ? T.warn : T.good;

  return (
    <div className="flex items-center gap-3">
      <div style={{ color: cat.color, background: cat.color + "18" }}
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
        {cat.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: T.ink }} className="text-sm font-semibold truncate pr-2 leading-none">{cat.label}</span>
          <div className="flex items-center gap-2 shrink-0">
            {rawPct !== null && (
              <span style={{ color: over ? T.bad : pct >= 70 ? T.warn : T.muted, ...fontMono }}
                className="text-[11px] font-bold">{rawPct}%</span>
            )}
            <span style={{ ...fontMono }} className="text-xs tabular-nums">
              <span style={{ color: over ? T.bad : T.ink }}>{fmt(spent)}</span>
              {budget > 0 && <span style={{ color: T.muted }}> / {fmt(budget)}</span>}
            </span>
          </div>
        </div>
        {budget > 0 && (
          <div style={{ background: T.bg2 }} className="h-3 rounded-full overflow-hidden">
            <div style={{ width: `${pct}%`, background: barColor }}
              className="h-full rounded-full transition-all duration-500" />
          </div>
        )}
      </div>
    </div>
  );
}

function BudgetGroup({ label, color, cats, byCat, budgets }) {
  const totalSpent  = cats.reduce((s, c) => s + (byCat[c.id]  || 0), 0);
  const totalBudget = cats.reduce((s, c) => s + (budgets[c.id] || 0), 0);
  const over = totalBudget > 0 && totalSpent > totalBudget;

  const catsWithActivity = cats.filter(c => (byCat[c.id] || 0) > 0 || (budgets[c.id] || 0) > 0);
  if (catsWithActivity.length === 0) return null;

  const sorted = [...catsWithActivity].sort((a, b) =>
    (byCat[b.id] || 0) / (budgets[b.id] || 1) - (byCat[a.id] || 0) / (budgets[a.id] || 1)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span style={{ color: color || T.muted }} className="text-[11px] font-bold tracking-[0.18em] uppercase">{label}</span>
        <span style={{ ...fontMono }} className="text-sm tabular-nums">
          <span style={{ color: over ? T.bad : T.ink, fontWeight: 600 }}>{fmt(totalSpent)}</span>
          {totalBudget > 0 && <span style={{ color: T.muted }}> / {fmt(totalBudget)}</span>}
        </span>
      </div>
      <div className="space-y-4">
        {sorted.map(cat => (
          <BudgetItem key={cat.id} cat={cat} spent={byCat[cat.id] || 0} budget={budgets[cat.id] || 0} />
        ))}
      </div>
    </div>
  );
}

export function BudgetSection({ byCat, budgets, categories }) {
  const nec = categories.filter(c => c.type === "necesidad");
  const des = categories.filter(c => c.type === "deseo");
  return (
    <Card className="mb-8">
      <div className="flex items-start justify-between mb-6 gap-3">
        <h3 style={{ color: T.ink, fontWeight: 700 }} className="text-base font-bold tracking-tight">Presupuesto del período</h3>
        <div className="text-xs leading-snug text-right shrink-0">
          <span style={{ color: T.accent, fontWeight: 700 }}>Esencial</span>
          <span style={{ color: T.muted }}> = fijo &nbsp;·&nbsp; </span>
          <span style={{ color: "#7c3aed", fontWeight: 700 }}>Flexible</span>
          <span style={{ color: T.muted }}> = ajustable</span>
        </div>
      </div>
      <div className="space-y-6">
        <BudgetGroup label="Esencial" color={T.accent} cats={nec} byCat={byCat} budgets={budgets} />
        <BudgetGroup label="Flexible" color="#7c3aed" cats={des} byCat={byCat} budgets={budgets} />
      </div>
    </Card>
  );
}
