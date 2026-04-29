import { Trash2 } from "lucide-react";
import { T, fontMono, fontBody } from "../lib/constants.js";
import { getCat, fmt, fmtAmount } from "../lib/helpers.js";

function formatDate(iso) {
  const [, m, d] = iso.split("-");
  return `${+d} ${["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"][+m-1]}`;
}

export function ExpenseList({ expenses, exchangeRate, onDelete, categories }) {
  return (
    <div style={{ background: "white", borderColor: T.line }} className="border rounded-lg overflow-hidden">
      {expenses.map((e, i) => {
        const cat    = getCat(e.category, categories);
        const expCur = e.currency || "CRC";
        const isUSD  = expCur === "USD";
        return (
          <div key={e.id}
            style={{ borderColor: i === expenses.length - 1 ? "transparent" : T.line }}
            className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b group hover:bg-slate-50 transition">
            <div className="flex items-center gap-3 min-w-0">
              <div style={{ background: cat.color + "15", color: cat.color }}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg">
                {cat.emoji}
              </div>
              <div className="min-w-0">
                <div style={{ color: T.ink }} className="text-sm font-semibold truncate">{e.description || cat.label}</div>
                <div style={{ color: T.muted }} className="text-xs flex items-center gap-1.5 mt-0.5">
                  <span>{cat.label}</span><span>·</span><span>{formatDate(e.date)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div style={{ ...fontMono, color: T.ink }} className="tabular-nums font-semibold text-sm">
                  {fmtAmount(e.amount, expCur)}
                </div>
                {isUSD && (
                  <div style={{ color: T.muted, ...fontMono }} className="text-[10px] tabular-nums">
                    ≈ {fmt(e.amount * exchangeRate)}
                  </div>
                )}
              </div>
              <button onClick={() => onDelete(e.id)} style={{ color: T.muted }}
                className="sm:opacity-0 sm:group-hover:opacity-100 hover:text-red-500 transition p-1 rounded-lg" aria-label="Eliminar">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
