import { useState } from "react";
import { Check, Pin } from "lucide-react";
import { Card, EmptyState, Input } from "./ui.jsx";
import { fmt, fmtAmount, toCRC } from "../lib/format.js";
import { sumCRC } from "../lib/calc.js";

export default function FixedExpensesCard({ items, rate, onTogglePaid, onPatchItem }) {
  const [editing, setEditing] = useState(null); // índice del item cuyo monto se edita
  const [draft, setDraft] = useState("");

  const total = sumCRC(items, rate);
  const paidCount = items.filter((i) => i.paid).length;

  const startEdit = (i) => {
    setEditing(i);
    setDraft(String(items[i].amount || ""));
  };
  const commitEdit = () => {
    if (editing === null) return;
    const amount = Number(draft);
    if (!isNaN(amount) && amount >= 0 && amount !== items[editing].amount) {
      onPatchItem(editing, { amount });
    }
    setEditing(null);
  };

  return (
    <Card
      title="Gastos fijos"
      subtitle={items.length ? `${paidCount} de ${items.length} pagados` : null}
      action={<span className="text-sm font-bold font-mono text-ink">{fmt(total)}</span>}
    >
      {items.length === 0 ? (
        <EmptyState icon={Pin} text="No hay gastos fijos. Agregalos en Ajustes → Gastos fijos." />
      ) : (
        <ul className="divide-y divide-line -mx-1">
          {items.map((item, i) => (
            <li
              key={item.templateId || i}
              className={`flex items-center gap-3 px-1 py-2.5 rounded-lg transition ${
                item.paid ? "bg-green-50" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => onTogglePaid(i)}
                aria-label={item.paid ? "Marcar como no pagado" : "Marcar como pagado"}
                className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition ${
                  item.paid ? "bg-good border-good text-white" : "border-line bg-white text-transparent hover:border-good"
                }`}
              >
                <Check size={13} strokeWidth={3} />
              </button>
              <span className={`flex-1 text-sm truncate ${item.paid ? "text-ink2 line-through decoration-good/40" : "text-ink"}`}>
                {item.name}
              </span>
              {editing === i ? (
                <Input
                  type="number" inputMode="numeric" autoFocus
                  className="!w-28 !py-1 text-right font-mono"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => startEdit(i)}
                  title="Editar monto (solo este período)"
                  className="text-sm font-mono font-semibold text-ink hover:text-accent"
                >
                  {fmtAmount(item.amount, item.currency)}
                  {item.currency === "USD" && (
                    <span className="block text-[10px] text-muted font-sans font-normal">
                      ≈ {fmt(toCRC(item.amount, "USD", rate))}
                    </span>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
