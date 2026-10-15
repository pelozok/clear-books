import { cx } from './cx.js'

/**
 * Fila de lista: 56px mínimo. Si recibe onClick, `as` o `to` es presionable.
 * Las líneas entre filas las pone el contenedor (RowGroup / divide-y divide-line).
 */
export default function Row({ leading, title, subtitle, trailing, onClick, as, className, ...props }) {
  const interactive = Boolean(onClick || as || props.to || props.href)
  const As = as || (onClick ? 'button' : 'div')
  return (
    <As
      type={As === 'button' ? 'button' : undefined}
      onClick={onClick}
      className={cx(
        'flex min-h-row w-full items-center gap-3 px-4 py-2.5 text-left no-underline sm:px-5',
        interactive && 'cb-press cb-hover [--press-scale:0.985]',
        className,
      )}
      {...props}
    >
      {leading && <div className="flex shrink-0 items-center text-ink-2">{leading}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-body font-medium text-ink">{title}</div>
        {subtitle && <div className="truncate text-small text-muted">{subtitle}</div>}
      </div>
      {trailing != null && <div className="flex shrink-0 items-center gap-2 text-body text-ink">{trailing}</div>}
    </As>
  )
}

/** Contenedor de filas con línea fina de 1px entre ellas. */
export function RowGroup({ className, children, as: As = 'div' }) {
  return <As className={cx('divide-y divide-line', className)}>{children}</As>
}
