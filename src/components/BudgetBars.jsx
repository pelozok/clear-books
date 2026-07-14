import { Card, ProgressBar } from "./ui.jsx";
import { fmt } from "../lib/format.js";
import { totalsByCategory } from "../lib/calc.js";
import { T } from "../lib/constants.js";
import { CategoryIcon } from "../lib/icons.jsx";

// Barras de gasto variable por categoría contra su presupuesto.
export default function BudgetBars({ categories, expenses, rate }) {
  const spent = totalsByCategory(expenses, rate);
  const rows = categories
    .map((c) => ({ ...c, spent: spent[c.id] || 0 }))
    .filter((c) => c.budget > 0 || c.spent > 0);

  if (rows.length === 0) return null;

  const anyBudget = rows.some((c) => c.budget > 0);

  return (
    <Card
      title="Por categoría"
      subtitle={anyBudget ? "Gasto variable del período contra tu presupuesto" : "Definí presupuestos por categoría en Ajustes"}
    >
      <div className="space-y-3.5">
        {rows.map((c) => {
          const pct = c.budget > 0 ? (c.spent / c.budget) * 100 : 0;
          const over = c.budget > 0 && c.spent > c.budget;
          return (
            <div key={c.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-ink flex items-center gap-1.5">
                  <CategoryIcon category={c} size={15} />
                  {c.label}
                </span>
                <span className={`text-xs font-mono font-semibold ${over ? "text-bad" : "text-ink2"}`}>
                  {fmt(c.spent)}
                  {c.budget > 0 && <span className="text-muted font-normal"> / {fmt(c.budget)}</span>}
                </span>
              </div>
              {c.budget > 0 && <ProgressBar pct={pct} color={over ? T.bad : c.color} />}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
