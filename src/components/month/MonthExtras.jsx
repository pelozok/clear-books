import { Link } from 'react-router-dom'
import { Lock, Plus } from 'lucide-react'
import { BigNumber, Button, Card, IconButton } from '../ui/index.js'
import { fmt, fmtDateLong } from '../../lib/format.js'
import { monthLabel } from '../../lib/periods.js'
import { isPareja } from './shared.js'

const mes = (key) => monthLabel(key).split(' ')[0].toLowerCase()

/** Aviso para cerrar el mes anterior que sigue abierto. */
export function CloseBanner({ prevKey }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-body text-ink">
          {monthLabel(prevKey).split(' ')[0]} sigue abierto. Cerrarlo toma 2 minutos.
        </p>
        <Button as={Link} to={`/cerrar/${prevKey}`} size="sm" variant="secondary">
          Cerrar {mes(prevKey)}
        </Button>
      </div>
    </Card>
  )
}

/** Botón flotante "+" para anotar un gasto. */
export function AddEntryFab({ monthKey }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--nav-h)+env(safe-area-inset-bottom)+16px)] z-20 lg:bottom-8 lg:pl-side">
      <div className="mx-auto flex max-w-3xl justify-end px-gutter">
        <IconButton
          as={Link}
          to={`/gasto/nuevo?mes=${monthKey}`}
          label="Anotar gasto"
          icon={Plus}
          variant="primary"
          size="lg"
          className="pointer-events-auto h-14 w-14 rounded-2xl shadow-card"
        />
      </div>
    </div>
  )
}

const RESOLUTION = {
  less_savings: 'El faltante se cubrió apartando menos ese mes.',
  cover: 'El faltante se cubrió con el ahorro.',
  carry: 'El faltante pasó al mes siguiente.',
}

/** Resumen de un mes cerrado (solo lectura). */
export function ClosedSummary({ month, profile, savings }) {
  const c = month.closing || {}
  const leftover = c.leftoverReported ?? c.leftoverPlanned ?? 0
  const pareja = isPareja(profile)
  return (
    <Card>
      <p className="flex items-center gap-1.5 text-small text-ink-2">
        <Lock size={14} strokeWidth={1.75} aria-hidden="true" />
        Cerrado{c.closedAt ? ` el ${fmtDateLong(c.closedAt)}` : ''}
      </p>
      <h2 className="mt-3 text-body text-ink-2">{pareja ? 'Terminaron con' : 'Terminaste con'}</h2>
      <BigNumber amount={leftover} tone={leftover < 0 ? 'bad' : 'ink'} className="mt-1 leading-[1.05]" />
      <ul className="tnum mt-3 flex flex-col gap-1 text-small text-ink-2">
        <li>
          {pareja ? 'Apartaron' : 'Apartaste'} {fmt(savings.actual)} de {fmt(savings.planned)}
        </li>
        {c.unlogged > 0 && <li>{fmt(c.unlogged)} se fueron en gastos sin anotar</li>}
        {c.deficitResolution && <li>{RESOLUTION[c.deficitResolution]}</li>}
        {c.destination === 'ahorro' && leftover > 0 && <li>El sobrante fue al ahorro.</li>}
      </ul>
    </Card>
  )
}
