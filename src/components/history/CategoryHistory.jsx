import { Card } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { monthLabel } from '../../lib/periods.js'
import { categoryTable } from '../../lib/categories.js'
import { categoryLabel } from '../month/shared.js'

const short = (key) => {
  const [m, y] = monthLabel(key).split(' ')
  return `${m.slice(0, 3).toLowerCase()} ${String(y).slice(2)}`
}

/** Gasto por categoría, mes a mes (los últimos 6 meses cerrados). */
export default function CategoryHistory({ closed, profile }) {
  const t = categoryTable(closed.slice(0, 6).map((m) => ({ id: m.id, byCategory: m.closing?.byCategory })))
  if (!t.months.length) return null
  return (
    <Card title="En qué gastaste, mes a mes" subtitle="Gasto del día a día por categoría. Se arma con los meses que cerrás." padded={false}>
      <div className="overflow-x-auto pb-2">
        <table className="tnum w-full min-w-max text-small">
          <thead>
            <tr className="text-left text-ink-2">
              <th className="px-4 py-2 font-medium sm:px-5">Categoría</th>
              {t.months.map((k) => <th key={k} className="px-3 py-2 text-right font-medium">{short(k)}</th>)}
              <th className="px-4 py-2 text-right font-medium sm:px-5">Promedio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line border-t border-line">
            {t.rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2.5 text-body text-ink sm:px-5">{categoryLabel(profile, r.id)}</td>
                {r.values.map((v, i) => {
                  const up = i > 0 && v > r.values[i - 1]
                  return <td key={i} className={`px-3 py-2.5 text-right ${up ? 'text-warn' : 'text-ink'}`}>{v ? fmt(v) : '—'}</td>
                })}
                <td className="px-4 py-2.5 text-right text-ink-2 sm:px-5">{fmt(r.avg)}</td>
              </tr>
            ))}
            <tr className="font-medium">
              <td className="px-4 py-2.5 text-ink sm:px-5">Total</td>
              {t.totals.map((v, i) => <td key={i} className="px-3 py-2.5 text-right text-ink">{fmt(v)}</td>)}
              <td className="px-4 py-2.5 text-right text-ink-2 sm:px-5">{fmt(t.totals.reduce((s, v) => s + v, 0) / t.totals.length)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  )
}
