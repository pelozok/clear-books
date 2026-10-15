import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cx, renderIcon } from './cx.js'

// Alturas: sm 36px, md 44px (objetivo táctil), lg 52px.
const SIZES = {
  sm: 'h-9 px-3 gap-1.5 text-small font-medium',
  md: 'h-11 px-4 gap-2 text-body font-medium',
  lg: 'h-[52px] px-5 gap-2 text-body font-semibold',
}
const ICON_SIZE = { sm: 16, md: 18, lg: 20 }

// La capa de hover/pressed (::before) toma su color de --hover-bg.
const VARIANTS = {
  primary: 'bg-accent text-on-accent [--hover-bg:rgb(var(--c-accent-ink))]',
  secondary: 'bg-surface text-ink border border-line',
  ghost: 'bg-transparent text-ink-2 [--hover-bg:rgb(var(--c-ink)/0.06)]',
  danger: 'bg-bad text-on-accent [--hover-bg:rgb(0_0_0/0.12)]',
}

/**
 * Botón con estados: hover (capa, solo puntero fino), focus-visible (anillo acento),
 * active scale(0.97), disabled y loading (mantiene el ancho, aria-busy).
 * `as` permite renderizar un Link manteniendo el mismo aspecto.
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    full = false,
    as: As = 'button',
    disabled,
    className,
    children,
    type,
    ...props
  },
  ref,
) {
  const isButton = As === 'button'
  const inactive = disabled || loading
  return (
    <As
      ref={ref}
      type={isButton ? type || 'button' : type}
      disabled={isButton ? inactive : undefined}
      aria-disabled={!isButton && inactive ? true : undefined}
      aria-busy={loading || undefined}
      className={cx(
        'cb-press cb-hover inline-flex select-none items-center justify-center whitespace-nowrap rounded-xl no-underline',
        SIZES[size] || SIZES.md,
        VARIANTS[variant] || VARIANTS.primary,
        full && 'w-full',
        disabled && !loading && 'cb-disabled',
        loading && 'cursor-progress',
        className,
      )}
      {...props}
    >
      <span className={cx('inline-flex items-center justify-center gap-[inherit]', loading && 'opacity-0')}>
        {renderIcon(icon, ICON_SIZE[size] || 18)}
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Loader2 size={ICON_SIZE[size] || 18} strokeWidth={1.75} className="animate-spin" />
        </span>
      )}
    </As>
  )
})

export default Button
