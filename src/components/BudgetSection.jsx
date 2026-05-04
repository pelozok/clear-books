import { T, fontMono } from "../lib/constants.js";
import { fmt } from "../lib/helpers.js";
import { Card } from "./ui.jsx";

function BudgetItem({ cat, spent, budget }) {
  const pct      = budget > 0 ? Math.min(spent / budget * 100, 100) : 0;
  const over     = spent > budget && budget > 0;
  const barColor = over || pct >= 90 ? T.bad : pct >= 70 ? T.warn : T.good;
  return (
    <div className="flex items-center gap-3">
      <div style={{ color: cat.color, background: cat.color + "15" }}
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm">
        {cat.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ color: T.ink2 }} className="text-xs font-semibold">{cat.label}</span>
          <span style={{ ...fontMono }} className="text-[11px] tabular-nums ml-2 shrink-0">
            <span style={{ color: over ? T.bad : T.ink }}>{fmt(spent)}</span>
            {budget > 0 && <span style={{ color: T.muted }}> / {fmt(budget)}</span>}
          </span>
        </div>
        {budget > 0 && (
          <div style={{ background: T.bg2 }} className="h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${pct}%`, background: barColor }}
              className="h-full rounded-full transition-all duration-500" />
          </div>
        )}
      </div>
    </div>
  );
}

function BudgetGroup({ label, cats, byCat, budgets }) {
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
      <div className="flex items-center justify-between mb-3">
        <span style={{ color: T.muted }} className="text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
        <span style={{ ...fontMono }} className="text-xs tabular-nums">
          <span style={{ color: over ? T.bad : T.ink }}>{fmt(totalSpent)}</span>
          {totalBudget > 0 && <span style={{ color: T.muted }}> / {fmt(totalBudget)}</span>}
        </span>
      </div>
      <div className="space-y-2.5">
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
      <h3 style={{ color: T.ink, fontWeight: 700 }} className="text-base font-bold mb-5 tracking-tight">Presupuesto del período</h3>
      <div className="space-y-5">
        <BudgetGroup label="Necesidades" cats={nec} byCat={byCat} budgets={budgets} />
        <BudgetGroup label="Deseos" cats={des} byCat={byCat} budgets={budgets} />
      </div>
    </Card>
  );
}
