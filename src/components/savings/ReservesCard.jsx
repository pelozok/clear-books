import { Card, ProgressBar } from '../ui/index.js'
import { fmt, toCRC } from '../../lib/format.js'

/** Reservas anuales dentro del ahorro: apartado / meta, con progreso real. */
export default function ReservesCard({ annual, reservedByAnnual, rate }) {
  if (!annual.length) return null
  const byId = Object.fromEntries(reservedByAnnual.map((r) => [r.annualId, r.amount]))
  return (
    <Card title="Reservas" subtitle="Son parte del ahorro, no se suman aparte.">
      <ul className="flex flex-col gap-4">
        {annual.map((a) => {
          const goal = toCRC(a.amount, a.currency, rate)
          const have = byId[a.id] || 0
          return (
            <li key={a.id}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="truncate text-body font-medium text-ink">{a.name}</span>
                <span className="tnum shrink-0 text-small text-ink-2">
                  {fmt(have)} de {fmt(goal)}
                </span>
              </div>
              <ProgressBar value={have} max={goal} tone={have >= goal && goal > 0 ? 'good' : 'accent'} label={`Reserva ${a.name}`} />
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
