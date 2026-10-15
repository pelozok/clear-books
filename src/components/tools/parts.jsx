import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { BigNumber, Card, Input } from '../ui/index.js'
import { fmtAmountInput, parseAmountInput } from '../../lib/format.js'
import { cx } from '../ui/cx.js'

/** Tarjeta de entradas (arriba). */
export function InputsCard({ children }) {
  return (
    <Card>
      <div className="flex flex-col gap-4">{children}</div>
    </Card>
  )
}

/** Resultado grande (abajo): etiqueta, cifra y detalle opcional. */
export function ResultCard({ label, amount, currency = 'CRC', tone = 'ink', big, sentence, children }) {
  return (
    <Card aria-live="polite">
      <p className="text-body text-ink-2">{label}</p>
      {big ?? <BigNumber amount={amount} currency={currency} tone={tone} className="mt-1" />}
      {sentence && <p className="mt-2 text-body text-ink">{sentence}</p>}
      {children && <div className="mt-4">{children}</div>}
    </Card>
  )
}

/** Lista etiqueta / valor separada por líneas finas. */
export function Lines({ items, className }) {
  return (
    <dl className={cx('divide-y divide-line border-t border-line', className)}>
      {items.filter(Boolean).map(({ label, value, strong }) => (
        <div key={label} className="flex items-baseline justify-between gap-3 py-2.5">
          <dt className="text-body text-ink-2">{label}</dt>
          <dd className={cx('tnum text-right text-body', strong ? 'font-semibold text-ink' : 'text-ink')}>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Expandible "Datos usados (vigentes 2026, fuente)". */
export function DataUsed({ title = 'Datos usados (vigentes 2026)', source, children }) {
  return (
    <Card padded={false}>
      <details className="group">
        <summary className="cb-press flex min-h-row cursor-pointer list-none items-center gap-3 px-4 text-body font-medium text-ink sm:px-5 [&::-webkit-details-marker]:hidden">
          <span className="flex-1">{title}</span>
          <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" className="text-muted group-open:rotate-180" />
        </summary>
        <div className="flex flex-col gap-2 border-t border-line px-4 py-3 text-small text-ink-2 sm:px-5">
          {children}
          {source && (
            <p className="text-muted">
              Fuente:{' '}
              {/^https?:/.test(source) ? (
                <a href={source} target="_blank" rel="noreferrer" className="break-all text-accent underline">
                  {source}
                </a>
              ) : (
                source
              )}
            </p>
          )}
        </div>
      </details>
    </Card>
  )
}

/**
 * Número es-CR libre (porcentaje, meses, cantidad). value en la unidad que se ve
 * (ej. 36,12 para 36,12 %); onChange(number | null).
 */
export function NumberField({ value, onChange, suffix, id, decimals = true, ...props }) {
  const [text, setText] = useState(value == null ? '' : fmtAmountInput(value))
  useEffect(() => {
    const cur = text.trim() === '' ? null : parseAmountInput(text)
    if ((value ?? null) !== cur) setText(value == null ? '' : fmtAmountInput(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const handle = (e) => {
    const t = decimals ? e.target.value.replace(/[^\d.,]/g, '') : e.target.value.replace(/\D/g, '')
    setText(t)
    const n = t.trim() === '' ? null : parseAmountInput(t)
    onChange(Number.isFinite(n) ? n : null)
  }
  return (
    <div className="relative">
      <Input id={id} inputMode={decimals ? 'decimal' : 'numeric'} value={text} onChange={handle}
        className={cx('tnum', suffix && 'pr-12')} {...props} />
      {suffix && (
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body text-muted" aria-hidden="true">
          {suffix}
        </span>
      )}
    </div>
  )
}

/** "36,12 %" para mostrar tasas. */
export const pctText = (rate, dec = 2) => `${fmtAmountInput(Math.round(rate * 100 * 10 ** dec) / 10 ** dec)} %`

/** "1 mes" / "3 meses" (y años si conviene). */
export const monthsText = (n) => {
  if (n == null) return ''
  if (n < 24) return `${n} ${n === 1 ? 'mes' : 'meses'}`
  const y = Math.floor(n / 12)
  const m = n % 12
  return `${y} años${m ? ` y ${m} ${m === 1 ? 'mes' : 'meses'}` : ''}`
}
