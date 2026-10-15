import { forwardRef, useEffect, useRef, useState } from 'react'
import { fmtAmountInput } from '../../lib/format.js'
import Segmented from './Segmented.jsx'
import { cx } from './cx.js'

const SYMBOL = { CRC: '₡', USD: '$' }
const CURRENCIES = [
  { value: 'CRC', label: '₡', ariaLabel: 'Colones' },
  { value: 'USD', label: '$', ariaLabel: 'Dólares' },
]

// Reescribe lo tecleado en formato es-CR: puntos de miles, coma decimal (máx. 2).
// Un "." tecleado al final se toma como coma decimal (teclados en-US).
// Devuelve { text, amount, caretDigits } donde caretDigits sirve para reponer el cursor.
export function formatTyping(raw, caret = raw.length) {
  let s = String(raw).replace(/[^\d.,]/g, '')
  let caretIn = String(raw).slice(0, caret).replace(/[^\d.,]/g, '')
  if (!s.includes(',') && /\.$/.test(caretIn) && caretIn.length === s.length) {
    // "1.234." → el último punto recién tecleado es el decimal
    s = s.slice(0, -1) + ','
    caretIn = caretIn.slice(0, -1) + ','
  }
  const comma = s.indexOf(',')
  const intDigits = (comma >= 0 ? s.slice(0, comma) : s).replace(/\D/g, '').replace(/^0+(?=\d)/, '')
  const decDigits = comma >= 0 ? s.slice(comma + 1).replace(/\D/g, '').slice(0, 2) : ''
  const grouped = intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const text = comma >= 0 ? `${grouped || '0'},${decDigits}` : grouped
  const amount = intDigits === '' && decDigits === '' ? null : Number(`${intDigits || '0'}.${decDigits || '0'}`)
  // Posición del cursor: cantidad de dígitos/comas a su izquierda en el texto crudo
  const caretTokens = caretIn.replace(/\./g, '').length
  return { text, amount, caretTokens }
}

const caretFromTokens = (text, tokens) => {
  if (tokens <= 0) return 0
  let seen = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== '.') seen++
    if (seen >= tokens) return i + 1
  }
  return text.length
}

/**
 * Monto en ₡ o $. Formatea es-CR mientras se escribe (1.234.567), teclado decimal.
 * onChange({ amount, currency }); amount es null cuando el campo queda vacío.
 */
const AmountInput = forwardRef(function AmountInput(
  { value, currency = 'CRC', onChange, allowCurrencyToggle = true, autoFocus, id, className, disabled, placeholder = '0', ...props },
  forwardedRef,
) {
  const innerRef = useRef(null)
  const ref = forwardedRef || innerRef
  const [text, setText] = useState(() => (value == null ? '' : fmtAmountInput(value).replace('-', '')))
  const pendingCaret = useRef(null)

  // Si el valor cambia desde afuera (no por lo que se escribió), se reescribe el texto.
  useEffect(() => {
    const current = formatTyping(text).amount
    if ((value ?? null) !== current) setText(value == null ? '' : fmtAmountInput(Math.abs(value)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    const el = ref.current
    if (el && pendingCaret.current != null && document.activeElement === el) {
      el.setSelectionRange(pendingCaret.current, pendingCaret.current)
      pendingCaret.current = null
    }
  })

  const handleChange = (e) => {
    const { text: next, amount, caretTokens } = formatTyping(e.target.value, e.target.selectionStart ?? e.target.value.length)
    pendingCaret.current = caretFromTokens(next, caretTokens)
    setText(next)
    onChange?.({ amount, currency })
  }

  const handleCurrency = (c) => {
    onChange?.({ amount: formatTyping(text).amount, currency: c })
    ref.current?.focus()
  }

  return (
    <div className={cx('flex items-center gap-2', className)}>
      <div
        data-disabled={disabled || undefined}
        className="cb-input flex h-14 min-w-0 flex-1 items-center gap-1.5 px-3.5"
        onClick={() => ref.current?.focus()}
      >
        <span className="text-title tnum text-muted" aria-hidden="true">
          {SYMBOL[currency] || '₡'}
        </span>
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          enterKeyHint="done"
          autoFocus={autoFocus}
          disabled={disabled}
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
          aria-label={props['aria-label'] || `Monto en ${currency === 'USD' ? 'dólares' : 'colones'}`}
          className="tnum min-w-0 flex-1 bg-transparent text-title text-ink outline-none placeholder:text-muted focus-visible:outline-none"
          {...props}
        />
      </div>
      {allowCurrencyToggle && (
        <Segmented
          size="sm"
          aria-label="Moneda"
          options={CURRENCIES}
          value={currency}
          onChange={handleCurrency}
          disabled={disabled}
          className="w-[88px] shrink-0"
        />
      )}
    </div>
  )
})

export default AmountInput
