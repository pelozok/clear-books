import { Sparkles, CalendarCheck } from 'lucide-react'
import { fmtAmount, fmtDateLong } from '../../lib/format.js'
import { halfLabel } from '../../lib/periods.js'
import Choice, { CheckRow } from './Choice.jsx'
import { hasSavings, isLateHalf, validFixed } from './buildPayload.js'

export default function StepAlready({ s, set }) {
  const late = isLateHalf(s)
  const quincenal = s.frequency === 'quincenal'
  const mKey = s.today.slice(0, 7)
  const fixed = validFixed(s)
  const togglePaid = (id, on) =>
    set({ paidFixed: on ? [...new Set([...s.paidFixed, id])] : s.paidFixed.filter((x) => x !== id) })
  const showChecklist = !late || !s.cleanStart

  return (
    <div className="space-y-6">
      {late && (
        <div role="radiogroup" aria-label="Cómo arrancamos" className="space-y-3">
          <Choice
            icon={Sparkles}
            selected={s.cleanStart}
            onClick={() => set({ cleanStart: true })}
            title="Empezamos limpio en la 2da quincena"
            body={`Contamos desde el ${fmtDateLong(`${mKey}-16`)}. La 1ra quincena ya pasó y no la anotamos.`}
          />
          <Choice
            icon={CalendarCheck}
            selected={!s.cleanStart}
            onClick={() => set({ cleanStart: false })}
            title="Contar el mes completo"
            body="Marcás lo que ya pagaste y apartaste desde el 1."
          />
        </div>
      )}

      {showChecklist && (
        <>
          <section>
            <h2 className="text-heading text-ink">¿Qué fijos ya pagaste este mes?</h2>
            {fixed.length === 0 ? (
              <p className="mt-1 text-small text-muted">No agregaste fijos. Los podés sumar después en Ajustes.</p>
            ) : (
              <div className="mt-2 divide-y divide-line">
                {fixed.map((f) => (
                  <CheckRow
                    key={f.id}
                    checked={s.paidFixed.includes(f.id)}
                    onChange={(on) => togglePaid(f.id, on)}
                    label={<span className="flex justify-between gap-3"><span>{f.name}</span><span className="tnum text-ink-2">{fmtAmount(f.amount, f.currency)}</span></span>}
                    hint={quincenal ? halfLabel(f.half) : undefined}
                  />
                ))}
              </div>
            )}
          </section>
          {hasSavings(s) && (
            <section>
              <h2 className="text-heading text-ink">{quincenal ? '¿Ya apartaste el ahorro de la 1ra quincena?' : '¿Ya apartaste el ahorro de este mes?'}</h2>
              <CheckRow
                checked={s.savedAlready}
                onChange={(v) => set({ savedAlready: v })}
                label="Sí, ya lo aparté"
                hint={s.places[0]?.name ? `Lo anotamos como aporte en ${s.places[0].name}; ya está contado en el saldo de hoy.` : 'Agregá un lugar de ahorro en el paso anterior para anotarlo.'}
              />
            </section>
          )}
        </>
      )}
      <p className="text-small text-muted">Nada de esto es definitivo: todo se corrige después desde el plan del mes.</p>
    </div>
  )
}
