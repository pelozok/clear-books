import { useEffect } from "react";
import { X, ClipboardList } from "lucide-react";

export function Card({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`bg-white border border-line rounded-2xl p-4 sm:p-5 ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between mb-3">
          <div>
            {title && <h2 className="text-sm font-bold text-ink">{title}</h2>}
            {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function Btn({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-accent text-white hover:opacity-90 disabled:opacity-40",
    ghost:   "bg-transparent text-ink2 border border-line hover:bg-bg2",
    soft:    "bg-accent-soft text-accent hover:opacity-80",
    danger:  "bg-transparent text-bad border border-line hover:bg-red-50",
  };
  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-ink2 mb-1">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-muted mt-1">{hint}</span>}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent ${className}`}
      {...props}
    />
  );
}

export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`w-full px-3 py-2 rounded-xl border border-line bg-white text-sm text-ink focus:outline-none focus:border-accent ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Segmented({ value, onChange, options }) {
  return (
    <div className="inline-flex bg-bg2 rounded-xl p-1 gap-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
            value === o.value ? "bg-white text-ink shadow-sm" : "text-ink2 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-0 sm:p-6" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-ink">{title}</h3>
          <button onClick={onClose} aria-label="Cerrar" className="text-muted hover:text-ink p-1">
            <X size={18} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

export function ProgressBar({ pct, color }) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div className="h-2 rounded-full bg-bg2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${clamped}%`, background: color }}
      />
    </div>
  );
}

export function EmptyState({ icon: Icon = ClipboardList, text }) {
  return (
    <div className="text-center py-8">
      <Icon size={28} className="mx-auto mb-2 text-muted" strokeWidth={1.75} />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-ink text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg">
      {message}
    </div>
  );
}
