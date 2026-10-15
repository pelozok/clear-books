import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button, Card, ProgressBar, Row, RowGroup } from '../ui/index.js'
import { fmt, fmtAmount, fmtDate } from '../../lib/format.js'
import { categoriesOf, categoryLabel } from './shared.js'

// Gasto por categoría en CRC (amountCRC guardado al anotar). Hueco de la lib: no hay
// una función de totales por categoría en v4, así que se suma acá solo para las barras.
const spentByCategory = (entries) => {
  const out = {}
  for (const e of entries) out[e.categoryId || 'otros'] = (out[e.categoryId || 'otros'] || 0) + (Number(e.amountCRC) || 0)
  return out
}

function BudgetBars({ profile, entries }) {
  const withBudget = categoriesOf(profile).filter((c) => Number(c.budget) > 0)
  if (!withBudget.length) return null
  const spent = spentByCategory(entries)
  return (
    <div className="flex flex-col gap-3 border-t border-line px-4 py-4 sm:px-5">
      {withBudget.map((c) => {
        const used = spent[c.id] || 0
        const over = used > c.budget
        return (
          <div key={c.id}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-small">
              <span className="text-ink">{c.label}</span>
              <span className={over ? 'tnum text-bad' : 'tnum text-ink-2'}>
                {fmt(used)} de {fmt(c.budget)}
              </span>
            </div>
            <ProgressBar value={used} max={c.budget} tone={over ? 'bad' : 'accent'} label={`${c.label}: ${fmt(used)} de ${fmt(c.budget)}`} />
          </div>
        )
      })}
    </div>
  )
}

/** Gastos variables del mes por fecha, total y barras por categoría si hay presupuesto. */
export default function EntriesSection({ monthKey, profile, entries, totals, readOnly }) {
  const navigate = useNavigate()
  const add = () => navigate(`/gasto/nuevo?mes=${monthKey}`)
  const subtitle = entries.length ? (
    <span className="tnum">
      Total {fmt(totals.variable)}
      {totals.fromSavings > 0 ? ` · del ahorro ${fmt(totals.fromSavings)}` : ''}
    </span>
  ) : (
    'Anotar gastos es opcional. Sirve para ver en qué se va lo que queda.'
  )
  return (
    <Card
      title="Gastos del mes"
      subtitle={subtitle}
      action={
        readOnly ? null : (
          <Button variant="ghost" size="sm" icon={Plus} onClick={add}>
            Anotar
          </Button>
        )
      }
      padded={false}
    >
      {entries.length > 0 && (
        <RowGroup>
          {entries.map((e) => (
            <Row
              key={e.id}
              title={e.description || categoryLabel(profile, e.categoryId)}
              subtitle={[fmtDate(e.date), e.description ? categoryLabel(profile, e.categoryId) : null, e.source === 'savings' ? 'del ahorro' : null]
                .filter(Boolean)
                .join(' · ')}
              trailing={<span className="tnum">{fmtAmount(e.amount, e.currency)}</span>}
              onClick={readOnly ? undefined : () => navigate(`/gasto/nuevo?mes=${monthKey}&id=${e.id}`)}
            />
          ))}
        </RowGroup>
      )}
      <BudgetBars profile={profile} entries={entries} />
      <div className="h-2" />
    </Card>
  )
}
