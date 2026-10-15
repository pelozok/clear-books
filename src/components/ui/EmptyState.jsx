import { cx, renderIcon } from './cx.js'

/** Estado vacío que enseña cómo llenar la pantalla. */
export default function EmptyState({ icon, title, body, action, className }) {
  return (
    <div className={cx('flex flex-col items-center px-6 py-10 text-center', className)}>
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-ink-2">
          {renderIcon(icon, 22)}
        </div>
      )}
      {title && <h2 className="text-heading text-ink">{title}</h2>}
      {body && <p className="mt-1.5 max-w-sm text-body text-ink-2">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
