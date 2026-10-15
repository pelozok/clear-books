import { useState } from 'react'
import { AmountInput, Field } from '../ui/index.js'
import { payoff } from '../../lib/calculators/creditCard.js'
import { TASAS_LABELS, TASAS_REFERENCIA } from '../../lib/constantsCR.js'
import { fmtAmount } from '../../lib/format.js'
import { DataUsed, InputsCard, Lines, NumberField, ResultCard, monthsText, pctText } from './parts.jsx'

const refRate = (c) => Math.round(TASAS_REFERENCIA[c === 'USD' ? 'tarjetaUSD' : 'tarjetaCRC'] * 10000) / 100

export default function CreditCardTool() {
  const [balance, setBalance] = useState(null)
  const [currency, setCurrency] = useState('CRC')
  const [ratePct, setRatePct] = useState(refRate('CRC'))
  const [minPct, setMinPct] = useState(3)
  const [fixed, setFixed] = useState(null)

  const r = payoff({ balance: balance || 0, annualRate: (ratePct || 0) / 100, minPct: (minPct || 0) / 100, fixedPayment: fixed > 0 ? fixed : null })
  const money = (n) => fmtAmount(Math.round(n), currency)
  const scenario = (s) => (s.neverEnds
    ? [{ label: 'Tiempo', value: 'No se termina de pagar' }]
    : [{ label: 'Tiempo', value: monthsText(s.months) }, { label: 'Intereses', value: money(s.interest) }, { label: 'Pagás en total', value: money(s.totalPaid), strong: true }])
  const saved = r.fixed && !r.fixed.neverEnds && !r.minimum.neverEnds ? r.minimum.interest - r.fixed.interest : null

  let sentence
  if (r.fixed?.neverEnds) sentence = `Ese pago no cubre ni el interés del mes (${money(r.firstInterest)}). Subilo para que el saldo baje.`
  else if (saved != null) sentence = `Pagando ${money(fixed)} fijo terminás ${monthsText(r.minimum.months - r.fixed.months)} antes y te ahorrás ${money(saved)} en intereses.`
  else if (balance > 0) sentence = 'Escribí un pago fijo para comparar.'

  return (
    <>
      <InputsCard>
        <Field label="Saldo de la tarjeta">
          <AmountInput value={balance} currency={currency}
            onChange={({ amount, currency: c }) => { setBalance(amount); if (c !== currency) { setCurrency(c); setRatePct(refRate(c)) } }} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Interés anual" hint="Referencia, editable.">
            <NumberField value={ratePct} onChange={setRatePct} suffix="%" />
          </Field>
          <Field label="Pago mínimo" hint="% del saldo + interés.">
            <NumberField value={minPct} onChange={setMinPct} suffix="%" />
          </Field>
        </div>
        <Field label="Pago fijo por mes (opcional)">
          <AmountInput value={fixed} currency={currency} allowCurrencyToggle={false} onChange={({ amount }) => setFixed(amount)} />
        </Field>
      </InputsCard>

      <ResultCard label={saved != null ? 'Te ahorrás en intereses' : 'Intereses pagando el mínimo'}
        amount={saved != null ? Math.round(saved) : r.minimum.neverEnds ? 0 : Math.round(r.minimum.interest)}
        currency={currency} sentence={sentence}>
        {balance > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-1 text-body font-medium text-ink">Solo el mínimo</h3>
              <Lines items={scenario(r.minimum)} />
            </div>
            {r.fixed && (
              <div>
                <h3 className="mb-1 text-body font-medium text-ink">Pago fijo</h3>
                <Lines items={scenario(r.fixed)} />
              </div>
            )}
          </div>
        )}
      </ResultCard>

      <DataUsed source={TASAS_REFERENCIA.fuente}>
        <ul className="tnum list-inside list-disc">
          {['tarjetaCRC', 'tarjetaUSD', 'topeUsuraCRC', 'topeUsuraUSD'].map((k) => (
            <li key={k}>{TASAS_LABELS[k]}: {pctText(TASAS_REFERENCIA[k])}</li>
          ))}
        </ul>
        <p>Actualizado al {TASAS_REFERENCIA.actualizadoAl}. Interés del mes = saldo × tasa ÷ 12. Mínimo = interés + {minPct || 0} % del saldo.</p>
      </DataUsed>
    </>
  )
}
