import { Card, ProgressBar } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { monthLabel, shiftMonth } from '../../lib/periods.js'
import { categoryLabel } from './shared.js'

const pct = (x) => `${Math.round(x * 100)}%`

/** En qué se fue el gasto del día a día, por categoría, contra el mes anterior. */
export default function CategoryCard({ rows, profile, monthKey }) {
  if (!rows?.length) return null
  const prevName = monthLabel(shiftMonth(monthKey, -1)).split(' ')[0].toLowerCase()
  const compare = rows.some((r) => r.delta != null)
  return (
    <Card title="En qué gastaste" subtitle={compare ? `Comparado con ${prevName}` : 'Elegí una categoría al anotar para que esto sirva.'}>
      <ul className="flex flex-col gap-4">
        {rows.map((r) => (
          <li key={r.id}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-small">
              <span className="text-body text-ink">{categoryLabel(profile, r.id)}</span>
              <span className="tnum text-ink">
                {fmt(r.total)} <span className="text-ink-2">· {pct(r.share)}</span>
              </span>
            </div>
            <ProgressBar value={r.share} max={1} label={`${categoryLabel(profile, r.id)}: ${pct(r.share)} del gasto`} />
            {r.delta != null && r.delta !== 0 && (
              <p className={`tnum mt-1 text-small ${r.delta > 0 ? 'text-warn' : 'text-good'}`}>
                {r.prev > 0
                  ? `${r.delta > 0 ? '▲' : '▼'} ${fmt(Math.abs(r.delta))} ${r.delta > 0 ? 'más' : 'menos'} que en ${prevName}`
                  : `Nuevo: en ${prevName} no gastaste en esto`}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
