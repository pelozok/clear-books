import { Trash2 } from "lucide-react";
import { T, fontMono } from "../lib/constants.js";
import { getCat, fmt, fmtAmount, todayISO } from "../lib/helpers.js";

const MONTHS_SHORT = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

function dayLabel(iso) {
  const today     = todayISO();
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  if (iso === today)     return "Hoy";
  if (iso === yesterday) return "Ayer";
  const [, m, d] = iso.split("-");
  return `${+d} de ${MONTHS_SHORT[+m - 1]}`;
}

function groupByDate(expenses) {
  const map = {};
  expenses.forEach(e => { (map[e.date] = map[e.date] || []).push(e); });
  return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
}

export function ExpenseList({ expenses, exchangeRate, onDelete, categories }) {
  const groups = groupByDate(expenses);
  return (
    <div style={{ background: "white", borderColor: T.line }} className="border rounded-2xl overflow-hidden">
      {groups.map(([date, exps], gi) => (
        <div key={date}>
          <div
            style={{ background: T.bg, borderColor: T.line, color: T.muted }}
            className={`px-4 py-2.5 border-b text-[11px] font-bold tracking-[0.12em] uppercase ${gi > 0 ? "border-t" : ""}`}>
            {dayLabel(date)}
          </div>
          {exps.map((e, i) => {
            const cat    = getCat(e.category, categories);
            const expCur = e.currency || "CRC";
            const isUSD  = expCur === "USD";
            return (
              <div key={e.id}
                style={{ borderColor: i === exps.length - 1 ? "transparent" : T.line }}
                className="flex items-center gap-3 px-4 py-4 border-b hover:bg-slate-50 transition">
                <div style={{ background: cat.color + "18", color: cat.color }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl">
                  {cat.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ color: T.ink }} className="text-sm font-semibold truncate leading-snug">
                    {e.description || cat.label}
                  </div>
                  <div style={{ color: T.muted }} className="text-xs mt-0.5">{cat.label}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <div className="text-right mr-1">
                    <div style={{ ...fontMono, color: T.ink }} className="tabular-nums font-semibold text-sm">
                      {fmtAmount(e.amount, expCur)}
                    </div>
                    {isUSD && (
                      <div style={{ color: T.muted, ...fontMono }} className="text-[10px] tabular-nums">
                        ≈ {fmt(e.amount * exchangeRate)}
                      </div>
                    )}
                  </div>
                  <button onClick={() => onDelete(e.id)}
                    style={{ color: T.muted }}
                    className="p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 active:bg-red-50 active:text-red-500 transition"
                    aria-label="Eliminar">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
