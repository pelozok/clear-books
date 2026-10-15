import { fmtAmount } from '../../lib/format.js'
import { cx } from './cx.js'

const STATES = {
  pending: { label: 'Pendiente', cls: 'bg-surface-2 text-muted' },
  partial: { label: 'Parcial', cls: 'bg-warn-soft text-warn' },
  done: { label: 'Listo', cls: 'bg-good-soft text-good' },
  skipped: { label: 'Este mes no', cls: 'bg-surface-2 text-muted line-through' },
  deferred: { label: 'Pasa al siguiente', cls: 'bg-surface-2 text-ink-2' },
  deficit: { label: 'Faltan', cls: 'bg-bad-soft text-bad' },
}

/**
 * Pastilla de estado: siempre texto + color, nunca solo color.
 * En `deficit` muestra "Faltan ₡X" con `amount` y `currency`. `label` reemplaza el texto.
 */
export default function StatusPill({ state = 'pending', amount, currency = 'CRC', label, className }) {
  const s = STATES[state] || STATES.pending
  let text = label || s.label
  if (!label && state === 'deficit' && amount != null) text = `Faltan ${fmtAmount(amount, currency)}`
  return (
    <span
      className={cx(
        'tnum inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full px-2.5 text-micro',
        s.cls,
        className,
      )}
    >
      {text}
    </span>
  )
}
