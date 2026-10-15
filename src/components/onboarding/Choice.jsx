import { Check } from 'lucide-react'
import { cx } from '../ui/cx.js'

/** Opción grande tipo radio: título, descripción y check cuando está elegida. */
export default function Choice({ selected, onClick, title, body, icon: Icon }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cx(
        'cb-press cb-hover flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left [--press-scale:0.985]',
        selected ? 'border-accent bg-accent-soft' : 'border-line bg-surface',
      )}
    >
      {Icon && <Icon size={22} strokeWidth={1.75} aria-hidden="true" className={selected ? 'mt-0.5 text-accent' : 'mt-0.5 text-ink-2'} />}
      <span className="min-w-0 flex-1">
        <span className="block text-body font-medium text-ink">{title}</span>
        {body && <span className="mt-0.5 block text-small text-ink-2">{body}</span>}
      </span>
      <span
        aria-hidden="true"
        className={cx(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
          selected ? 'border-accent bg-accent text-on-accent' : 'border-line',
        )}
      >
        {selected && <Check size={14} strokeWidth={2.25} />}
      </span>
    </button>
  )
}

/** Casilla nativa con texto (accent-color tematizado en index.css). */
export function CheckRow({ checked, onChange, label, hint }) {
  return (
    <label className="flex min-h-control cursor-pointer items-start gap-3 py-2">
      <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="min-w-0">
        <span className="block text-body text-ink">{label}</span>
        {hint && <span className="block text-small text-muted">{hint}</span>}
      </span>
    </label>
  )
}
