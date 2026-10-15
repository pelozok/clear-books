import { useState } from 'react'
import { AmountInput, Field, Segmented } from '../ui/index.js'
import { schedule } from '../../lib/calculators/loan.js'
import { TASAS_LABELS, TASAS_REFERENCIA } from '../../lib/constantsCR.js'
import { fmtAmount } from '../../lib/format.js'
import { DataUsed, InputsCard, Lines, NumberField, ResultCard, monthsText, pctText } from './parts.jsx'

const KINDS = [{ value: 'vivienda', label: 'Vivienda' }, { value: 'vehiculo', label: 'Vehículo' }, { value: 'personal', label: 'Personal' }]
const MODES = [{ value: 'plazo', label: 'Bajar plazo' }, { value: 'cuota', label: 'Bajar cuota' }]
const refKey = (kind, currency) => (kind === 'personal' ? 'personalCRC' : `${kind}${currency === 'USD' ? 'USD' : 'CRC'}`)

export default function LoanTool() {
  const [kind, setKind] = useState('vivienda')
  const [principal, setPrincipal] = useState(null)
  const [currency, setCurrency] = useState('CRC')
  const [ratePct, setRatePct] = useState(TASAS_REFERENCIA.viviendaCRC * 100)
  const [months, setMonths] = useState(240)
  const [extraMonthly, setExtraMonthly] = useState(null)
  const [onceAmount, setOnceAmount] = useState(null)
  const [onceMonth, setOnceMonth] = useState(12)
  const [mode, setMode] = useState('plazo')

  const resetRate = (k, c) => setRatePct(Math.round(TASAS_REFERENCIA[refKey(k, c)] * 10000) / 100)
  const r = schedule({
    principal: principal || 0, annualRate: (ratePct || 0) / 100, months: months || 0,
    extraMonthly: extraMonthly || 0, extraOnce: onceAmount > 0 ? { month: onceMonth || 1, amount: onceAmount } : null, mode,
  })
  const money = (n) => fmtAmount(Math.round(n * 100) / 100, currency)
  const hasExtras = extraMonthly > 0 || onceAmount > 0
  // Tabla resumida: saldo al final de cada año.
  const yearly = r.rows.filter((row, i) => row.month % 12 === 0 || i === r.rows.length - 1)

  return (
    <>
      <InputsCard>
        <Field label="Tipo de préstamo">
          <Segmented options={KINDS} value={kind} onChange={(k) => { setKind(k); resetRate(k, currency) }} />
        </Field>
        <Field label="Monto">
          <AmountInput value={principal} currency={currency}
            onChange={({ amount, currency: c }) => { setPrincipal(amount); if (c !== currency) { setCurrency(c); resetRate(kind, c) } }} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Interés anual" hint="Referencia, editable.">
            <NumberField value={ratePct} onChange={setRatePct} suffix="%" />
          </Field>
          <Field label="Plazo">
            <NumberField value={months} onChange={setMonths} decimals={false} suffix="meses" />
          </Field>
        </div>
        <Field label="Abono extra cada mes (opcional)">
          <AmountInput value={extraMonthly} currency={currency} allowCurrencyToggle={false} onChange={({ amount }) => setExtraMonthly(amount)} />
        </Field>
        <div className="grid grid-cols-[1fr_7rem] gap-3">
          <Field label="Abono único (opcional)">
            <AmountInput value={onceAmount} currency={currency} allowCurrencyToggle={false} onChange={({ amount }) => setOnceAmount(amount)} />
          </Field>
          <Field label="En el mes">
            <NumberField value={onceMonth} onChange={setOnceMonth} decimals={false} />
          </Field>
        </div>
        {hasExtras && (
          <Field label="Con los abonos querés">
            <Segmented options={MODES} value={mode} onChange={setMode} />
          </Field>
        )}
      </InputsCard>

      <ResultCard
        label="Cuota mensual"
        amount={Math.round(r.payment * 100) / 100}
        currency={currency}
        sentence={hasExtras && r.rows.length
          ? (mode === 'plazo' && r.monthsSaved > 0
            ? `Con los abonos terminás ${monthsText(r.monthsSaved)} antes y te ahorrás ${money(r.interestSaved)} en intereses.`
            : `Con los abonos te ahorrás ${money(r.interestSaved)} en intereses.`)
          : undefined}
      >
        {r.rows.length > 0 && (
          <>
            <Lines items={[
              { label: 'Lo pagás en', value: monthsText(r.monthsActual) },
              { label: 'Intereses en total', value: money(r.totalInterest) },
              { label: 'Pagás en total', value: money(r.totalPaid), strong: true },
            ]} />
            <table className="tnum mt-4 w-full text-small">
              <caption className="pb-2 text-left text-body font-medium text-ink">Saldo al final de cada año</caption>
              <thead>
                <tr className="text-muted">
                  <th className="py-1.5 text-left font-medium">Año</th>
                  <th className="py-1.5 text-right font-medium">Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-t border-line">
                {yearly.map((row) => (
                  <tr key={row.month}>
                    <td className="py-1.5 text-ink-2">{Math.ceil(row.month / 12)}</td>
                    <td className="py-1.5 text-right text-ink">{money(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </ResultCard>

      <DataUsed source={TASAS_REFERENCIA.fuente}>
        <p>Tasas de referencia (no son ofertas de ningún banco), actualizadas al {TASAS_REFERENCIA.actualizadoAl}:</p>
        <ul className="tnum list-inside list-disc">
          {['viviendaCRC', 'viviendaUSD', 'vehiculoCRC', 'vehiculoUSD', 'personalCRC'].map((k) => (
            <li key={k}>{TASAS_LABELS[k]}: {pctText(TASAS_REFERENCIA[k])}</li>
          ))}
        </ul>
        <p>Cuota fija (sistema francés). Los seguros y comisiones del banco no están incluidos.</p>
      </DataUsed>
    </>
  )
}
