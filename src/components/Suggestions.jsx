import { Sparkles } from "lucide-react";
import { T, fontSans } from "../lib/constants.js";
import { fmt, toCRC, monthKey } from "../lib/helpers.js";

export function Suggestions({ income, totals, config, expensesCount, categories, budgets, expenses, currentMonth, rate }) {
  const tips = [];

  if (expensesCount === 0) {
    tips.push({ tone: "neutral", title: "Empezá registrando tus gastos",
      text: "Aún no tenés gastos este mes. Registrá todo, hasta lo más pequeño — ahí está el aprendizaje." });
  } else {
    const overBudget = [];
    const nearBudget = [];
    categories.forEach(cat => {
      const spent  = totals.byCat[cat.id] || 0;
      const budget = budgets[cat.id] || 0;
      if (budget <= 0 || spent <= 0) return;
      const pct = spent / budget * 100;
      if (pct > 100) overBudget.push({ cat, spent, budget, pct });
      else if (pct >= 80) nearBudget.push({ cat, spent, budget, pct });
    });

    overBudget.sort((a, b) => b.pct - a.pct).slice(0, 2).forEach(({ cat, spent, budget, pct }) => {
      tips.push({ tone: "bad",
        title: `${cat.emoji} ${cat.label} superó el presupuesto`,
        text: `Gastaste ${fmt(spent)} de ${fmt(budget)} (${Math.round(pct)}%). Considerá revisar este rubro.` });
    });

    nearBudget.sort((a, b) => b.pct - a.pct).slice(0, 1).forEach(({ cat, spent, budget, pct }) => {
      tips.push({ tone: "warn",
        title: `${cat.emoji} ${cat.label} casi en el límite`,
        text: `Llevás ${fmt(spent)} de ${fmt(budget)} presupuestados (${Math.round(pct)}%).` });
    });

    const [y, m] = currentMonth.split("-").map(Number);
    const prevMonth = monthKey(new Date(y, m - 2, 1).toISOString());
    const byCatPrev = {};
    expenses.filter(e => monthKey(e.date) === prevMonth).forEach(e => {
      byCatPrev[e.category] = (byCatPrev[e.category] || 0) + toCRC(e.amount, e.currency || "CRC", rate);
    });

    if (Object.keys(byCatPrev).length > 0) {
      const increases = [], decreases = [];
      categories.forEach(cat => {
        const curr = totals.byCat[cat.id] || 0;
        const prev = byCatPrev[cat.id] || 0;
        if (prev <= 0 || curr <= 0) return;
        const change = (curr - prev) / prev * 100;
        if (change > 30)  increases.push({ cat, curr, prev, change });
        if (change < -30) decreases.push({ cat, curr, prev, change });
      });

      increases.sort((a, b) => b.change - a.change).slice(0, 2).forEach(({ cat, curr, prev, change }) => {
        tips.push({ tone: "warn",
          title: `${cat.emoji} ${cat.label} subió ${Math.round(change)}% vs el mes anterior`,
          text: `Este mes: ${fmt(curr)} · Mes anterior: ${fmt(prev)}.` });
      });

      if (decreases.length > 0 && !tips.some(t => t.tone === "good")) {
        const best = decreases.sort((a, b) => a.change - b.change)[0];
        tips.push({ tone: "good",
          title: `${best.cat.emoji} ${best.cat.label} bajó ${Math.round(Math.abs(best.change))}% vs el mes anterior`,
          text: `Este mes: ${fmt(best.curr)} · Mes anterior: ${fmt(best.prev)}.` });
      }
    }

    const idealSavings  = income * (config.savingsRate / 100);
    const actualSavings = income - totals.total;

    if (actualSavings < 0) {
      tips.push({ tone: "bad",
        title: "Estás gastando más de lo que ingresás",
        text: `Llevás ${fmt(Math.abs(actualSavings))} de sobregiro. Identificá el gasto más grande y evaluá si era esencial.` });
    } else if (idealSavings > 0 && actualSavings < idealSavings && !tips.some(t => t.tone === "neutral")) {
      tips.push({ tone: "neutral",
        title: "Te falta para tu meta de ahorro",
        text: `Necesitás ${fmt(idealSavings - actualSavings)} más para llegar al ${config.savingsRate}%.` });
    } else if (idealSavings > 0 && actualSavings >= idealSavings && !tips.some(t => t.tone === "good")) {
      tips.push({ tone: "good",
        title: "Vas bien con el ahorro",
        text: `Disponible: ${fmt(actualSavings)}. Meta de ${config.savingsRate}%: ${fmt(idealSavings)}.` });
    }

    if (tips.length === 0) {
      tips.push({ tone: "good",
        title: "Todo bajo control",
        text: "Todos los presupuestos dentro del límite y sin cambios bruscos respecto al mes anterior." });
    }
  }

  if (tips.length === 0) return null;

  return (
    <section className="mt-8 mb-8">
      <h2 style={{ color: T.ink, fontWeight: 700 }} className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles size={16} style={{ color: T.accent }} /> Sugerencias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((t, i) => {
          const s = {
            good:    { bg: "#f0fdf4", border: "#bbf7d0", color: T.good },
            warn:    { bg: "#fffbeb", border: "#fde68a", color: T.warn },
            bad:     { bg: "#fef2f2", border: "#fecaca", color: T.bad },
            neutral: { bg: "white",   border: T.line,    color: T.ink2 },
          }[t.tone];
          return (
            <div key={i} style={{ background: s.bg, borderColor: s.border }} className="p-5 rounded-2xl border">
              <div className="flex items-center gap-2 mb-1.5">
                <div style={{ background: s.color }} className="w-2 h-2 rounded-full shrink-0" />
                <div style={{ color: s.color, ...fontSans, fontWeight: 700 }} className="text-sm">{t.title}</div>
              </div>
              <p style={{ color: T.ink2 }} className="text-sm leading-relaxed">{t.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
