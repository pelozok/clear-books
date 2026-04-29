import { useEffect } from "react";
import { PiggyBank, AlertCircle, X, Plus } from "lucide-react";
import { T, fontSans, fontBody, fontMono } from "../lib/constants.js";
import { fmt } from "../lib/helpers.js";

export function Field({ label, hint, children }) {
  return (
    <div>
      <label style={{ color: T.ink, ...fontSans, fontWeight: 600 }} className="block text-sm mb-1">{label}</label>
      {hint && <div style={{ color: T.muted }} className="text-xs mb-2">{hint}</div>}
      {children}
    </div>
  );
}

export function SettingsSection({ id, title, subtitle, danger, children }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-3">
        <h2 style={{ color: danger ? T.bad : T.ink, ...fontSans, fontWeight: 700 }} className="text-base">{title}</h2>
        {subtitle && <p style={{ color: T.muted }} className="text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div style={{ background: "white", borderColor: danger ? "#fecaca" : T.line }}
        className="rounded-lg border p-5 sm:p-6 space-y-5">
        {children}
      </div>
    </section>
  );
}

export function SummaryCard({ label, value, subtitle, tone }) {
  const toneColor = { ink: T.ink, good: T.good, bad: T.bad, accent: T.accent }[tone] || T.ink;
  return (
    <div style={{ borderColor: T.line, borderLeftColor: toneColor }}
      className="p-4 sm:p-5 border border-l-2 rounded-lg bg-white">
      <div style={{ color: T.muted }} className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2">{label}</div>
      <div style={{ ...fontMono, color: toneColor }} className="text-xl sm:text-2xl font-semibold tabular-nums leading-none">{value}</div>
      {subtitle && <div style={{ color: T.muted }} className="text-[11px] mt-1.5 truncate">{subtitle}</div>}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div style={{ background: "white", borderColor: T.line }} className={`p-5 sm:p-6 rounded-lg border ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children }) {
  return <h3 style={{ color: T.ink, fontWeight: 700 }} className="text-base font-bold mb-4 tracking-tight">{children}</h3>;
}

export function SavingsBar({ progress, goal }) {
  const pct     = goal > 0 ? Math.max(0, Math.min(100, (progress / goal) * 100)) : 0;
  const reached = progress >= goal && goal > 0;
  return (
    <div style={{ background: "white", borderColor: T.line }} className="border rounded-lg p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <div style={{ color: T.muted }} className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">Progreso de ahorro</div>
          <div style={{ fontWeight: 700, color: T.ink }} className="text-xl">
            {fmt(Math.max(0, progress))}
            <span style={{ color: T.muted }} className="text-sm font-medium ml-2">de {fmt(goal)}</span>
          </div>
        </div>
        <div style={{ ...fontMono, color: reached ? T.good : T.accent }} className="text-3xl font-bold">
          {Math.round(pct)}%
        </div>
      </div>
      <div style={{ background: T.bg2 }} className="h-2.5 rounded-full overflow-hidden">
        <div style={{ width: `${pct}%`, background: reached ? T.good : T.accent }}
          className="h-full rounded-full transition-all duration-700" />
      </div>
    </div>
  );
}

export function SavingsAlertBanner({ remaining, savingsGoal, savingsRate }) {
  if (remaining >= savingsGoal) return null;
  const critical = remaining < 0;
  const styles = critical
    ? { bg: "#fef2f2", border: "#fecaca", color: T.bad }
    : { bg: "#fffbeb", border: "#fde68a", color: T.warn };
  const msg = critical
    ? `Sobregirado ${fmt(Math.abs(remaining))} — estás gastando más de lo que ingresás este mes`
    : `Te faltan ${fmt(savingsGoal - remaining)} para alcanzar tu meta de ahorro del ${savingsRate}%`;
  return (
    <div style={{ background: styles.bg, borderColor: styles.border, color: styles.color }}
      className="border rounded-lg px-4 py-3 flex items-start gap-3 mb-4">
      <AlertCircle size={17} className="shrink-0 mt-0.5" />
      <p className="text-sm font-semibold leading-snug">{msg}</p>
    </div>
  );
}

export function EmptyState({ onAdd }) {
  return (
    <div style={{ borderColor: T.line, background: "white" }} className="border-2 border-dashed rounded-lg p-10 text-center">
      <div style={{ background: T.accentSoft, color: T.accent }} className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <PiggyBank size={26} />
      </div>
      <h3 style={{ color: T.ink, fontWeight: 700 }} className="text-xl font-bold mb-2">Sin movimientos este mes</h3>
      <p style={{ color: T.muted }} className="text-sm mb-6 max-w-sm mx-auto leading-relaxed">
        Registrá tu primer gasto para ver el dashboard completo con gráficas y sugerencias.
      </p>
      <button onClick={onAdd} style={{ background: T.accent, color: "white" }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition">
        <Plus size={15} /> Agregar el primero
      </button>
    </div>
  );
}

export function Modal({ children, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ background: "rgba(15,23,42,0.5)" }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5">
      <div onClick={e => e.stopPropagation()} style={{ background: T.bg, color: T.ink, ...fontBody }}
        className="w-full sm:max-w-md rounded-t-xl sm:rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div style={{ borderColor: T.line }} className="flex items-center justify-between px-5 py-4 border-b">
          <h2 style={{ fontWeight: 700, color: T.ink }} className="text-xl">{title}</h2>
          <button onClick={onClose} style={{ color: T.muted, background: T.bg2 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
