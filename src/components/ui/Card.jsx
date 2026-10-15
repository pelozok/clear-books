import { cx } from './cx.js'

/**
 * Superficie blanca, radio 16, sombra de tarjeta. Con `padded={false}` el
 * contenido va a sangre (listas de Row separadas por línea fina, sin anidar tarjetas).
 */
export default function Card({ title, subtitle, action, padded = true, children, className, as: As = 'section', ...props }) {
  const hasHeader = title || subtitle || action
  return (
    <As className={cx('rounded-2xl bg-surface shadow-card', className)} {...props}>
      {hasHeader && (
        <header className={cx('flex items-start gap-3 px-4 pt-4 sm:px-5 sm:pt-5', padded ? 'pb-3' : 'pb-2')}>
          <div className="min-w-0 flex-1">
            {title && <h2 className="text-heading text-ink">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-small text-ink-2">{subtitle}</p>}
          </div>
          {action && <div className="-my-1.5 -mr-2 shrink-0">{action}</div>}
        </header>
      )}
      {padded ? (
        <div className={cx('px-4 pb-4 sm:px-5 sm:pb-5', !hasHeader && 'pt-4 sm:pt-5')}>{children}</div>
      ) : (
        children
      )}
    </As>
  )
}
