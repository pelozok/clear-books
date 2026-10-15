import { cx, renderIcon } from './cx.js'

/** Pastilla para categorías y filtros. Con onClick es un toggle (aria-pressed). */
export default function Chip({ selected = false, onClick, icon, children, className, disabled, ...props }) {
  const As = onClick ? 'button' : 'span'
  return (
    <As
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      disabled={onClick ? disabled : undefined}
      aria-pressed={onClick ? selected : undefined}
      className={cx(
        'tnum inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-small font-medium',
        onClick && 'cb-press cb-hover',
        selected ? 'border-transparent bg-accent-soft text-accent-ink' : 'border-line bg-surface text-ink-2',
        className,
      )}
      {...props}
    >
      {renderIcon(icon, 16)}
      {children}
    </As>
  )
}
