import { AlertTriangle } from 'lucide-react'
import { Card, ProgressBar } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { budgetMessage } from '../../lib/budget.js'
import { cx } from '../ui/cx.js'

const TONE = { ok: 'accent', near: 'warn', over: 'bad' }

/** Gasto del día a día contra el límite del mes. Avisa desde el 80%. */
export default function BudgetCard({ budget }) {
  if (!budget || !budget.custom || budget.limit <= 0) return null
  const alert = budget.level !== 'ok'
  return (
    <Card title="Gasto del día a día" subtitle={<span className="tnum">{fmt(budget.spent)} de {fmt(budget.limit)}{budget.custom ? '' : ' · según tu plan'}</span>}>
      <ProgressBar value={budget.spent} max={budget.limit} tone={TONE[budget.level]} label="Gasto del mes contra el límite" />
      <p className={cx('tnum mt-3 flex items-center gap-2 text-body', alert ? (budget.level === 'over' ? 'text-bad' : 'text-warn') : 'text-ink-2')}>
        {alert && <AlertTriangle size={18} aria-hidden />}
        {budgetMessage(budget, fmt)}
      </p>
    </Card>
  )
}
