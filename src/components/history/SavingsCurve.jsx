import { Card } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { monthLabel } from '../../lib/periods.js'

const W = 320
const H = 120
const PAD = 6

const shortLabel = (key) => (key === 'hoy' ? 'Hoy' : monthLabel(key).replace(/^(\w{3})\w*/, '$1'))

/** Curva del acumulado real. SVG inline, colores desde tokens (sirve en modo oscuro). */
export default function SavingsCurve({ series, total, couple }) {
  const values = series.map((p) => p.value)
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const span = max - min || 1
  const x = (i) => PAD + (i * (W - PAD * 2)) / Math.max(1, series.length - 1)
  const y = (v) => PAD + (1 - (v - min) / span) * (H - PAD * 2)
  const pts = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`)
  const line = `M${pts.join(' L')}`
  const area = `${line} L${x(series.length - 1).toFixed(1)},${H} L${x(0).toFixed(1)},${H} Z`
  const last = series[series.length - 1]

  return (
    <Card title={couple ? 'Lo que llevan ahorrado' : 'Lo que llevás ahorrado'} subtitle="Saldo real al cierre de cada mes.">
      <p className="tnum text-title text-ink">{fmt(total)}</p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="mt-3 block h-32 w-full"
        role="img"
        aria-label={`Acumulado: de ${fmt(series[0]?.value)} a ${fmt(last?.value)}`}
      >
        <line x1="0" x2={W} y1={H - 0.5} y2={H - 0.5} className="stroke-line" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={area} className="fill-accent/10" />
        <path d={line} fill="none" className="stroke-accent" strokeWidth="2" strokeLinejoin="round"
          strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-1.5 flex justify-between text-small text-muted">
        <span>{shortLabel(series[0]?.key)}</span>
        <span>{shortLabel(last?.key)}</span>
      </div>
    </Card>
  )
}
