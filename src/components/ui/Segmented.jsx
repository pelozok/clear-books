import { useRef } from 'react'
import { cx } from './cx.js'

const SIZES = {
  sm: { track: 'h-8', btn: 'text-small font-medium px-2.5' },
  md: { track: 'h-10', btn: 'text-body font-medium px-3' },
}

/**
 * Control segmentado (radiogroup). Las opciones tienen el mismo ancho, así el
 * indicador se mueve solo con transform: translateX(índice × 100%).
 * Flechas izquierda/derecha cambian la selección.
 */
export default function Segmented({ options, value, onChange, size = 'md', className, disabled, ...props }) {
  const refs = useRef([])
  const n = options.length || 1
  const index = options.findIndex((o) => o.value === value)
  const s = SIZES[size] || SIZES.md

  const select = (i) => {
    const opt = options[(i + n) % n]
    if (!opt || opt.disabled) return
    onChange?.(opt.value)
    refs.current[(i + n) % n]?.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      select((index < 0 ? -1 : index) + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      select((index < 0 ? 0 : index) - 1)
    }
  }

  return (
    <div
      role="radiogroup"
      aria-disabled={disabled || undefined}
      onKeyDown={onKeyDown}
      className={cx(
        'relative grid rounded-xl bg-ink/6 p-[3px]',
        s.track,
        disabled && 'cb-disabled',
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      {...props}
    >
      <span
        aria-hidden="true"
        className="cb-segment-indicator"
        style={{
          left: 3,
          width: `calc((100% - 6px) / ${n})`,
          transform: `translateX(${Math.max(index, 0) * 100}%)`,
          opacity: index < 0 ? 0 : 1,
        }}
      />
      {options.map((opt, i) => {
        const checked = i === index
        return (
          <button
            key={String(opt.value)}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={opt.ariaLabel}
            tabIndex={checked || (index < 0 && i === 0) ? 0 : -1}
            disabled={disabled || opt.disabled}
            onClick={() => !checked && onChange?.(opt.value)}
            className={cx(
              'cb-press relative z-1 flex min-w-0 items-center justify-center truncate rounded-[9px] [--press-scale:0.96]',
              s.btn,
              checked ? 'text-ink' : 'text-ink-2',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
