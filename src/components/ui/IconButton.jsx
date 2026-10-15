import { forwardRef } from 'react'
import { cx, renderIcon } from './cx.js'

// Cuadrado: sm 36px, md 44px (objetivo táctil mínimo), lg 48px.
const SIZES = { sm: 'h-9 w-9', md: 'h-11 w-11', lg: 'h-12 w-12' }
const ICON = { sm: 18, md: 20, lg: 22 }
const VARIANTS = {
  ghost: 'bg-transparent text-ink-2',
  secondary: 'bg-surface text-ink border border-line',
  primary: 'bg-accent text-on-accent [--hover-bg:rgb(var(--c-accent-ink))]',
  danger: 'bg-transparent text-bad [--hover-bg:rgb(var(--c-bad)/0.1)]',
}

/** Botón de solo ícono. `label` es obligatorio: va a aria-label y a title. */
const IconButton = forwardRef(function IconButton(
  { label, icon, variant = 'ghost', size = 'md', as: As = 'button', disabled, className, type, ...props },
  ref,
) {
  const isButton = As === 'button'
  return (
    <As
      ref={ref}
      type={isButton ? type || 'button' : type}
      aria-label={label}
      title={label}
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      className={cx(
        'cb-press cb-hover inline-flex shrink-0 items-center justify-center rounded-xl',
        SIZES[size] || SIZES.md,
        VARIANTS[variant] || VARIANTS.ghost,
        disabled && 'cb-disabled',
        className,
      )}
      {...props}
    >
      {renderIcon(icon, ICON[size] || 20)}
    </As>
  )
})

export default IconButton
