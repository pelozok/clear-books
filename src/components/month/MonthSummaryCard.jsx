import { Card, Row, RowGroup } from '../ui/index.js'
import { fmt, fmtAmount } from '../../lib/format.js'

const usdOf = (crc, rate) => (rate > 0 ? ` ($${Math.round(crc / rate).toLocaleString('en-US')})` : '')

/** Resumen del mes: lo que entró, en qué se fue y cuánto se ahorró. */
export default function MonthSummaryCard({ month, totals }) {
  if (!month || !totals) return null
  const rate = Number(month.exchangeRate?.venta) || 0
  const salaryUSD = Object.values(month.incomes || {}).reduce((s, i) => s + (Number(i?.salaryUSD) || 0), 0)
  const salaryCRC = Object.values(month.incomes || {}).reduce((s, i) => s + (Number(i?.salaryCRC) || 0), 0)
  const income = Object.values(totals.incomeByPerson || {}).reduce((s, v) => s + v, 0) + totals.extrasIn
  const gastos = totals.variable + totals.extrasOut
  const savingsUSD = Object.values(month.savings?.perPerson || {}).flatMap((h) => Object.values(h || {}))
    .filter((r) => r?.plannedCurrency === 'USD').reduce((s, r) => s + (Number(r.plannedAmount) || 0), 0)

  const entro = salaryUSD > 0 && !salaryCRC && !totals.extrasIn ? `${fmtAmount(salaryUSD, 'USD')} (${fmt(income)})` : fmt(income)
  const rows = [
    { title: 'Entró', value: entro },
    { title: 'Fijos', value: `${fmt(totals.fixedPlanned)}${usdOf(totals.fixedPlanned, rate)}`, sub: `Pagado ${fmt(totals.fixedPaid)} · falta ${fmt(totals.fixedPending)}` },
    { title: 'Gastos del día a día', value: `${fmt(gastos)}${usdOf(gastos, rate)}` },
    { title: 'Ahorro', value: savingsUSD > 0 ? fmtAmount(savingsUSD, 'USD') : fmt(totals.savingsPlanned) },
  ]
  return (
    <Card title="Resumen del mes" padded={false}>
      <RowGroup>
        {rows.map((r) => (
          <Row key={r.title} title={r.title} subtitle={r.sub} trailing={<span className="tnum">{r.value}</span>} />
        ))}
      </RowGroup>
    </Card>
  )
}
