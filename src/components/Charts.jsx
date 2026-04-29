import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { T, fontMono } from "../lib/constants.js";
import { getCat, fmt, toCRC, monthKey, monthLabel } from "../lib/helpers.js";

export function CategoryChart({ byCat, categories }) {
  const data  = Object.entries(byCat)
    .map(([id, value]) => ({ id, name: getCat(id, categories).label, value, color: getCat(id, categories).color }))
    .sort((a, b) => b.value - a.value);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-44 h-44 shrink-0">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={2} stroke="none">
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip
              contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 12, fontFamily: "'Plus Jakarta Sans'" }}
              labelStyle={{ color: "white" }} itemStyle={{ color: "white" }}
              formatter={(v) => fmt(v)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 w-full space-y-2">
        {data.map(d => (
          <div key={d.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <div style={{ background: d.color }} className="w-2 h-2 rounded-full shrink-0" />
              <span style={{ color: T.ink2 }} className="truncate text-xs font-medium">{d.name}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span style={{ color: T.muted, ...fontMono }} className="text-[11px]">{Math.round(d.value / total * 100)}%</span>
              <span style={{ ...fontMono, color: T.ink }} className="text-xs tabular-nums font-medium">{fmt(d.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MonthComparisonChart({ expenses, currentMonth, categories, rate }) {
  const [y, m] = currentMonth.split("-").map(Number);
  const prevMonth = monthKey(new Date(y, m - 2, 1).toISOString());

  const byCatCurrent = {};
  expenses.filter(e => monthKey(e.date) === currentMonth).forEach(e => {
    byCatCurrent[e.category] = (byCatCurrent[e.category] || 0) + toCRC(e.amount, e.currency || "CRC", rate);
  });
  const byCatPrev = {};
  expenses.filter(e => monthKey(e.date) === prevMonth).forEach(e => {
    byCatPrev[e.category] = (byCatPrev[e.category] || 0) + toCRC(e.amount, e.currency || "CRC", rate);
  });

  const hasPrev = Object.keys(byCatPrev).length > 0;

  const data = categories
    .filter(cat => (byCatCurrent[cat.id] || 0) > 0 || (byCatPrev[cat.id] || 0) > 0)
    .map(cat => ({
      name: cat.emoji,
      label: cat.label,
      color: cat.color,
      actual: Math.round(byCatCurrent[cat.id] || 0),
      anterior: Math.round(byCatPrev[cat.id] || 0),
    }))
    .sort((a, b) => b.actual - a.actual)
    .slice(0, 8);

  if (data.length === 0) return (
    <div style={{ color: T.muted }} className="text-sm text-center py-8">Sin datos este mes</div>
  );

  return (
    <div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div style={{ background: T.accent }} className="w-2.5 h-2.5 rounded-sm" />
          <span style={{ color: T.muted }} className="text-xs">Este mes</span>
        </div>
        {hasPrev ? (
          <div className="flex items-center gap-1.5">
            <div style={{ background: T.line }} className="w-2.5 h-2.5 rounded-sm" />
            <span style={{ color: T.muted }} className="text-xs">{monthLabel(prevMonth)}</span>
          </div>
        ) : (
          <span style={{ color: T.muted }} className="text-xs italic">Sin datos del mes anterior</span>
        )}
      </div>
      <div className="h-52">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <XAxis dataKey="name" tick={{ fontSize: 15 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: T.muted }} axisLine={false} tickLine={false}
              tickFormatter={v => v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v >= 1000 ? (v/1000).toFixed(0)+'K' : v} />
            <Tooltip
              contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 11, fontFamily: "'Plus Jakarta Sans'" }}
              labelStyle={{ color: "white" }} itemStyle={{ color: "white" }}
              formatter={(v, name) => [fmt(v), name === "actual" ? "Este mes" : "Mes anterior"]}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.label || ""} />
            {hasPrev && <Bar dataKey="anterior" fill={T.bg2} radius={[4, 4, 0, 0]} name="anterior" />}
            <Bar dataKey="actual" radius={[4, 4, 0, 0]} name="actual">
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
