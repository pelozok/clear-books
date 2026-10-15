import { useState } from 'react'
import { AmountInput, Field, Row, RowGroup, Select } from '../ui/index.js'
import { monthlyShare, monthsUntilDue, nextDueMonthKey } from '../../lib/calculators/prorate.js'
import { fmt, fmtAmount, toCRC } from '../../lib/format.js'
import { monthKey, monthLabel, todayISO } from '../../lib/periods.js'
import { DataUsed, InputsCard, ResultCard, monthsText } from './parts.jsx'

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function ProrateTool({ ctx }) {
  const from = monthKey(todayISO())
  const [amount, setAmount] = useState(null)
  const [currency, setCurrency] = useState('CRC')
  const [dueMonth, setDueMonth] = useState(12)

  const share = monthlyShare({ amount: amount || 0, dueMonth, fromMonthKey: from, currency })
  const months = monthsUntilDue({ dueMonth, fromMonthKey: from })
  const due = nextDueMonthKey({ dueMonth, fromMonthKey: from })
  const mine = ctx.annual.map((a) => {
    const s = monthlyShare({ amount: a.amount, dueMonth: a.month, fromMonthKey: from, currency: a.currency })
    return { a, share: s, crc: toCRC(s, a.currency, ctx.rate) }
  })
  const mineTotal = mine.reduce((s, x) => s + x.crc, 0)

  return (
    <>
      <InputsCard>
        <Field label="Monto del gasto anual">
          <AmountInput value={amount} currency={currency} onChange={({ amount: a, currency: c }) => { setAmount(a); setCurrency(c) }} />
        </Field>
        <Field label="Mes en que se paga">
          <Select value={dueMonth} onChange={(e) => setDueMonth(Number(e.target.value))}>
            {MESES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </Select>
        </Field>
      </InputsCard>

      <ResultCard
        label="Apartá por mes"
        amount={share}
        currency={currency}
        sentence={`Son ${monthsText(months)} contando este, hasta ${monthLabel(due)}.`}
      >
        {mine.length > 0 && (
          <>
            <h3 className="text-body font-medium text-ink">Tus gastos anuales</h3>
            <RowGroup className="-mx-4 mt-1 border-t border-line sm:-mx-5">
              {mine.map(({ a, share: s }) => (
                <Row key={a.id} title={a.name} subtitle={`${fmtAmount(a.amount, a.currency)} en ${MESES[(a.month || 1) - 1].toLowerCase()}`}
                  trailing={<span className="tnum">{fmtAmount(s, a.currency)}/mes</span>} />
              ))}
              <Row title="Total por mes" trailing={<span className="tnum font-semibold">{fmt(mineTotal)}</span>} />
            </RowGroup>
          </>
        )}
      </ResultCard>

      <DataUsed title="Cómo se calcula">
        <p>Cuota = monto ÷ meses que faltan, contando el mes actual y el del pago. Si el mes de pago ya pasó este año, cuenta hasta el del próximo.</p>
        <p>Se redondea hacia arriba para que nunca te quede corto. En tu plan, la reserva anual usa además lo que ya apartaste.</p>
      </DataUsed>
    </>
  )
}
