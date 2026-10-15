import { fmt } from '../../lib/format.js'
import { monthSavingsSummary } from '../../lib/savings.js'

const RESOLUTION = {
  less_savings: 'El faltante se cubre apartando menos este mes.',
  cover: 'El faltante se cubre con el ahorro.',
  carry: 'El faltante pasa al mes siguiente.',
}

/** Resumen final antes de cerrar: ahorro, fijos que pasan, faltante y destino. */
export function CloseSummary({ result, pareja, seen, onSeen }) {
  const m = result.month
  const c = m.closing || {}
  const savings = monthSavingsSummary(m)
  const deferred = (m.fixedItems || []).filter((it) => it.status === 'deferred')
  return (
    <div className="mt-4 flex flex-col gap-4">
      <ul className="tnum flex flex-col gap-1.5 text-body text-ink-2">
        <li>
          {pareja ? 'Apartaron' : 'Apartaste'} {fmt(savings.actual)} de {fmt(savings.planned)}
        </li>
        {deferred.length > 0 && (
          <li>
            Pasan al mes siguiente: {deferred.map((it) => it.name).join(', ')}
          </li>
        )}
        {c.unlogged > 0 && <li>{fmt(c.unlogged)} en gastos sin anotar</li>}
        {c.deficitResolution && <li>{RESOLUTION[c.deficitResolution]}</li>}
        {c.destination === 'ahorro' && result.leftover > 0 && <li>{fmt(result.leftover)} van al ahorro.</li>}
      </ul>
      {pareja && (
        <label className="flex min-h-11 cursor-pointer items-center gap-3">
          <input type="checkbox" checked={seen} onChange={(e) => onSeen(e.target.checked)} className="h-5 w-5 shrink-0" />
          <span className="text-body text-ink">Los dos lo vimos</span>
        </label>
      )}
      <p className="text-small text-muted">Después de cerrar, el mes queda de solo lectura. Las correcciones van en el mes en curso.</p>
    </div>
  )
}
