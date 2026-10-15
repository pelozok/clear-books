import { Children, cloneElement, isValidElement, useId } from 'react'
import { cx } from './cx.js'

/**
 * Etiqueta ARRIBA, ayuda y error ABAJO. Nunca placeholder como etiqueta.
 * Si el hijo es un solo control, le inyecta id, aria-describedby y aria-invalid.
 */
export default function Field({ label, hint, error, children, className, id: idProp }) {
  const autoId = useId()
  const id = idProp || `f${autoId}`
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  const only = Children.count(children) === 1 && isValidElement(children) ? children : null
  const control = only
    ? cloneElement(only, {
        id: only.props.id || id,
        'aria-describedby': cx(only.props['aria-describedby'], describedBy) || undefined,
        'aria-invalid': error ? true : only.props['aria-invalid'],
      })
    : children

  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={only ? only.props.id || id : undefined} className="text-small font-medium text-ink-2">
          {label}
        </label>
      )}
      {control}
      {error ? (
        <p id={errorId} className="text-small text-bad" role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="text-small text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
