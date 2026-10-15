import { Card } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { monthLabel } from '../../lib/periods.js'
import { cx } from '../ui/cx.js'

const TONE = { good: 'text-good', warn: 'text-warn', bad: 'text-bad' }
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** Un bloque por mes cerrado: terminaron con, apartaron, sacaron y resultado. */
export default function MonthHistoryList({ rows, couple }) {
  const v = couple ? { end: 'Terminaron con', save: 'Apartaron', out: 'Sacaron' } : { end: 'Terminaste con', save: 'Apartaste', out: 'Sacaste' }
  return (
    <Card title="Meses cerrados" padded={false}>
      <ul className="divide-y divide-line border-t border-line">
        {rows.map((r) => (
          <li key={r.key} className="px-4 py-3.5 sm:px-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-body font-semibold text-ink">
                {cap(monthLabel(r.key))}
                {r.partial && <span className="ml-1.5 text-small font-normal text-muted">(parcial)</span>}
              </h3>
              <span className={cx('shrink-0 text-small font-medium', TONE[r.result.tone])}>{r.result.text}</span>
            </div>
            {r.spent != null && (
              <p className="mt-1 text-body text-ink">
                {couple ? 'Gastaron' : 'Gastaste'} <span className="tnum font-medium">{fmt(r.spent)}</span>
              </p>
            )}
            <p className="mt-1 text-body text-ink">
              {v.end} <span className="tnum font-medium">{fmt(r.leftover)}</span>
            </p>
            <p className="text-small text-ink-2">
              {v.save} <span className="tnum">{fmt(r.saved)}</span> de <span className="tnum">{fmt(r.planned)}</span>
              {r.withdrawn > 0 && (
                <>
                  {' '}· {v.out.toLowerCase()} <span className="tnum">{fmt(r.withdrawn)}</span>
                  {r.reasons.length > 0 && ` (${r.reasons.join(', ')})`}
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
