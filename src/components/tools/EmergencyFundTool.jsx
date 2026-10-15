import { useState } from 'react'
import { AmountInput, Field, ProgressBar, Segmented } from '../ui/index.js'
import { EMERGENCY_MONTHS, emergencyFund } from '../../lib/calculators/emergencyFund.js'
import { fmt } from '../../lib/format.js'
import { fmtDec } from '../savings/useSavingsOverview.js'
import { DataUsed, InputsCard, Lines, ResultCard } from './parts.jsx'

const MONTHS = EMERGENCY_MONTHS.map((m) => ({ value: m, label: `${m} meses` }))

export default function EmergencyFundTool({ ctx }) {
  const fullClosed = ctx.closed.filter((m) => !m.partial).length
  const [expenses, setExpenses] = useState(ctx.avgFixed > 0 ? Math.round(ctx.avgFixed) : null)
  const [months, setMonths] = useState(3)
  const [current, setCurrent] = useState(Math.round(ctx.totals.totalCRC) || null)

  const r = emergencyFund({ monthlyExpenses: expenses || 0, months, current: current || 0 })
  const sentence = !(expenses > 0)
    ? 'Escribí cuánto gastás al mes para ver tu meta.'
    : r.missing > 0
      ? `Hoy cubrís ${fmtDec(r.covered)} ${r.covered === 1 ? 'mes' : 'meses'}. Te faltan ${fmt(r.missing)}.`
      : `Ya lo tenés: cubrís ${fmtDec(r.covered)} meses de gastos.`

  return (
    <>
      <InputsCard>
        <Field
          label="Gastos del mes"
          hint={ctx.avgFixed > 0 ? `Promedio de fijos de tus ${fullClosed} meses cerrados. Sumale lo variable si querés.` : 'Fijos más lo que gastás en el súper, transporte y demás.'}
        >
          <AmountInput value={expenses} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setExpenses(amount)} />
        </Field>
        <Field label="Meses que querés cubrir">
          <Segmented options={MONTHS} value={months} onChange={setMonths} />
        </Field>
        <Field label="Ahorro actual" hint="Por defecto es lo que llevás ahorrado hoy.">
          <AmountInput value={current} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setCurrent(amount)} />
        </Field>
      </InputsCard>

      <ResultCard label="Tu fondo de emergencia" amount={r.target} sentence={sentence}>
        {r.target > 0 && (
          <>
            <ProgressBar value={r.pct} max={100} tone={r.missing > 0 ? 'accent' : 'good'} label="Avance del fondo" />
            <Lines className="mt-4" items={[
              { label: 'Tenés', value: fmt(current || 0) },
              { label: 'Faltan', value: fmt(r.missing), strong: true },
            ]} />
          </>
        )}
      </ResultCard>

      <DataUsed title="Cómo se calcula">
        <p>Meta = gastos del mes × meses a cubrir. No es una cifra oficial: 3 a 6 meses es la referencia usual; 9 si tu ingreso es variable.</p>
        <p>El ahorro actual incluye todos tus lugares de ahorro, con reservas anuales incluidas.</p>
      </DataUsed>
    </>
  )
}
