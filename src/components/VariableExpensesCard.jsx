import { Plus, Receipt, X } from "lucide-react";
import { Card, Btn, EmptyState } from "./ui.jsx";
import { fmt, fmtAmount, toCRC } from "../lib/format.js";
import { sumCRC } from "../lib/calc.js";
import { getCat } from "../lib/constants.js";
import { CategoryIcon } from "../lib/icons.jsx";

const fmtDay = (iso) => `${parseInt(iso.slice(8, 10), 10)}`;

export default function VariableExpensesCard({ expenses, categories, rate, onAdd, onRemove }) {
  const total = sumCRC(expenses || [], rate);

  return (
    <Card
      title="Gastos variables"
      subtitle="Lo que va saliendo en el período"
      action={<span className="text-sm font-bold font-mono text-ink">{fmt(total)}</span>}
    >
      {!expenses || expenses.length === 0 ? (
        <EmptyState icon={Receipt} text="Todavía no hay gastos variables este período." />
      ) : (
        <ul className="divide-y divide-line -mx-1 mb-3">
          {expenses.map((e) => {
            const cat = getCat(e.categoryId, categories);
            return (
              <li key={e.id} className="flex items-center gap-3 px-1 py-2.5 group">
                <span className="w-7 shrink-0 text-center">
                  <span className="block text-[10px] text-muted font-semibold uppercase">día</span>
                  <span className="block text-sm font-bold text-ink2 -mt-0.5">{fmtDay(e.date)}</span>
                </span>
                <span className="shrink-0" title={cat.label}><CategoryIcon category={cat} /></span>
                <span className="flex-1 text-sm text-ink truncate">
                  {e.description || cat.label}
                </span>
                <span className="text-sm font-mono font-semibold text-ink text-right">
                  {fmtAmount(e.amount, e.currency)}
                  {e.currency === "USD" && (
                    <span className="block text-[10px] text-muted font-sans font-normal">
                      ≈ {fmt(toCRC(e.amount, "USD", rate))}
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(e.id)}
                  title="Borrar gasto"
                  className="text-muted hover:text-bad p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
                >
                  <X size={15} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <Btn variant="soft" className="w-full flex items-center justify-center gap-1.5" onClick={onAdd}>
        <Plus size={16} /> Agregar gasto
      </Btn>
    </Card>
  );
}
