import { useState } from 'react'
import { savingsPerPeriodCRC } from '../../lib/savings.js'
import { AmountInput, Field, Segmented } from '../ui/index.js'
import { contributionFor, periodsToReach } from '../../lib/calculators/savingsGoal.js'
import { RETENCION_INTERESES, TASAS_REFERENCIA } from '../../lib/constantsCR.js'
import { fmt } from '../../lib/format.js'
import { monthKey, monthLabel, shiftMonth, todayISO } from '../../lib/periods.js'
import { DataUsed, InputsCard, NumberField, ResultCard, monthsText, pctText } from './parts.jsx'

const FREQ = [{ value: 12, label: 'Por mes' }, { value: 24, label: 'Por quincena' }]
const YESNO = [{ value: true, label: 'Sí' }, { value: false, label: 'No' }]

export default function SavingsGoalTool({ ctx }) {
  const people = ctx.profile?.people || []
  const defaultContribution = people.reduce((s, p) => s + savingsPerPeriodCRC(p, ctx.profile?.exchangeRateDefault), 0) || null
  const [goal, setGoal] = useState(null)
  const [initial, setInitial] = useState(Math.round(ctx.totals.totalCRC) || null)
  const [perYear, setPerYear] = useState(ctx.profile?.frequency === 'quincenal' ? 24 : 12)
  const [contribution, setContribution] = useState(defaultContribution)
  const [ratePct, setRatePct] = useState(TASAS_REFERENCIA.cdpCRC * 100)
  const [netOfTax, setNetOfTax] = useState(true)
  const [deadline, setDeadline] = useState(null)

  const common = { goal: goal || 0, initial: initial || 0, annualRate: (ratePct || 0) / 100, perYear, netOfTax }
  const n = goal > 0 ? periodsToReach({ ...common, contribution: contribution || 0 }) : null
  const months = n == null ? null : Math.ceil(n / (perYear / 12))
  const when = months ? monthLabel(shiftMonth(monthKey(todayISO()), months)) : ''
  const needed = goal > 0 && deadline > 0 ? contributionFor({ ...common, periods: deadline * (perYear / 12) }) : null
  const per = perYear === 24 ? 'por quincena' : 'por mes'

  let sentence = 'Escribí tu meta para ver cuándo llegás.'
  if (goal > 0 && n === 0) sentence = 'Ya llegaste: tu ahorro de hoy cubre la meta.'
  else if (goal > 0 && n == null) sentence = 'Con ese aporte no llegás. Probá con un aporte mayor.'
  else if (goal > 0) sentence = `A este ritmo llegás en ${monthsText(months)}, para ${when}.`

  return (
    <>
      <InputsCard>
        <Field label="Meta">
          <AmountInput value={goal} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setGoal(amount)} />
        </Field>
        <Field label="Saldo inicial" hint="Por defecto es lo que llevás ahorrado hoy.">
          <AmountInput value={initial} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setInitial(amount)} />
        </Field>
        <Field label="Aporte">
          <Segmented options={FREQ} value={perYear} onChange={setPerYear} />
        </Field>
        <Field label={`Cuánto apartás ${per}`}>
          <AmountInput value={contribution} currency="CRC" allowCurrencyToggle={false}
            onChange={({ amount }) => setContribution(amount)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Interés anual" hint="Referencia CDP, editable.">
            <NumberField value={ratePct} onChange={setRatePct} suffix="%" />
          </Field>
          <Field label="Restar retención 15 %">
            <Segmented options={YESNO} value={netOfTax} onChange={setNetOfTax} />
          </Field>
        </div>
        <Field label="¿En cuántos meses la querés? (opcional)">
          <NumberField value={deadline} onChange={setDeadline} decimals={false} />
        </Field>
      </InputsCard>

      <ResultCard label="Tiempo para llegar" big={<p className="tnum mt-1 text-display text-ink">{months ? monthsText(months) : n === 0 ? 'Ya llegaste' : 'Sin fecha'}</p>} sentence={sentence}>
        {needed != null && (
          <p className="text-body text-ink-2">
            Para llegar en {monthsText(deadline)} apartá <span className="tnum font-medium text-ink">{fmt(needed)}</span> {per}.
          </p>
        )}
      </ResultCard>

      <DataUsed source={TASAS_REFERENCIA.fuente}>
        <p>Tasa de referencia de CDP en colones: {pctText(TASAS_REFERENCIA.cdpCRC)} anual (actualizado al {TASAS_REFERENCIA.actualizadoAl}). No es la oferta de ningún banco: cambiala por la tuya.</p>
        <p>Retención sobre intereses: {pctText(RETENCION_INTERESES, 0)} (art. 23 Ley 7092).</p>
        <p>El aporte entra al final de cada período y el interés se capitaliza por período.</p>
      </DataUsed>
    </>
  )
}
