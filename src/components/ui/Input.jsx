import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cx } from './cx.js'

const BASE = 'cb-input block w-full text-body placeholder:text-muted'

/** Campo de texto: surface-2, borde line, foco acento. 44px de alto. */
export const Input = forwardRef(function Input({ className, type = 'text', ...props }, ref) {
  return <input ref={ref} type={type} className={cx(BASE, 'h-11 px-3.5', className)} {...props} />
})

/** Select nativo con chevron propio (el del sistema no respeta los tokens). */
export const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <div className={cx('relative', className)}>
      <select ref={ref} className={cx(BASE, 'h-11 appearance-none pl-3.5 pr-10')} {...props}>
        {children}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={1.75}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  )
})

export const Textarea = forwardRef(function Textarea({ className, rows = 3, ...props }, ref) {
  return <textarea ref={ref} rows={rows} className={cx(BASE, 'resize-y px-3.5 py-2.5', className)} {...props} />
})
