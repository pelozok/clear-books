import { T, fontMono } from "../lib/constants.js";
import { fmt } from "../lib/helpers.js";
import { Card, CardTitle } from "./ui.jsx";

function BudgetItem({ cat, spent, budget }) {
  const pct      = budget > 0 ? Math.min(spent / budget * 100, 100) : 0;
  const over     = spent > budget;
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
            <span style={{ color: T.muted }}> / {fmt(budget)}</span>
          </span>
        </div>
        <div style={{ background: T.bg2 }} className="h-1.5 rounded-full overflow-hidden">
          <div style={{ width: `${pct}%`, background: barColor }}
            className="h-full rounded-full transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}

function BudgetGroup({ label, cats, byCat, budgets, totalSpent, totalBudget }) {
  const over = totalSpent > totalBudget;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span style={{ color: T.muted }} className="text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
        <span style={{ ...fontMono }} className="text-xs tabular-nums">
          <span style={{ color: over ? T.bad : T.ink }}>{fmt(totalSpent)}</span>
          <span style={{ color: T.muted }}> / {fmt(totalBudget)}</span>
        </span>
      </div>
      <div className="space-y-2.5">
        {cats.map(cat => (
          <BudgetItem key={cat.id} cat={cat} spent={byCat[cat.id] || 0} budget={budgets[cat.id] || 0} />
        ))}
      </div>
    </div>
  );
}

export function BudgetSection({ byCat, budgets, categories, isQuincenal }) {
  const nec = categories.filter(c => c.type === "necesidad");
  const des = categories.filter(c => c.type === "deseo");
  const sumSpent  = cats => cats.reduce((s, c) => s + (byCat[c.id]  || 0), 0);
  const sumBudget = cats => cats.reduce((s, c) => s + (budgets[c.id] || 0), 0);
  const sortPct   = cats => [...cats].sort((a, b) =>
    (byCat[b.id] || 0) / (budgets[b.id] || 1) - (byCat[a.id] || 0) / (budgets[a.id] || 1)
  );
  return (
    <Card className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span style={{ color: T.ink, fontWeight: 700 }} className="text-base font-bold tracking-tight">Presupuesto del mes</span>
        {isQuincenal && (
          <span style={{ color: T.muted }} className="text-xs">presupuesto por quincena ×2</span>
        )}
      </div>
      <div className="space-y-5">
        <BudgetGroup label="Necesidades" cats={sortPct(nec)} byCat={byCat} budgets={budgets}
          totalSpent={sumSpent(nec)} totalBudget={sumBudget(nec)} />
        <BudgetGroup label="Deseos" cats={sortPct(des)} byCat={byCat} budgets={budgets}
          totalSpent={sumSpent(des)} totalBudget={sumBudget(des)} />
      </div>
    </Card>
  );
}
