import { Plus, X } from 'lucide-react'
import { AmountInput, Button, Chip, Field, IconButton, Input, Segmented, Select } from '../ui/index.js'
import { PLACE_KINDS, tmpId } from './defaults.js'
import { planOptions } from './annualPlan.js'
import { baseSavingsMonthly, effectivePlan } from './buildPayload.js'

/** Elegir cómo arranca una reserva anual el primer año (con la sugerencia de la lib). */
export function AnnualPlanPicker({ item, mKey, plan, onChange }) {
  const opts = planOptions(item, mKey)
  const current = opts.find((o) => o.value === plan) || opts[0]
  return (
    <Field label="Este año" hint={current.hint}>
      <Segmented options={opts.map(({ value, label }) => ({ value, label }))} value={current.value} onChange={onChange} />
    </Field>
  )
}

export default function StepPlaces({ s, set }) {
  const mKey = s.today.slice(0, 7)
  const base = baseSavingsMonthly(s)
  const patchPlace = (id, p) => set({ places: s.places.map((x) => (x.id === id ? { ...x, ...p } : x)) })
  const patchAnnual = (key, p) => set({ annual: s.annual.map((a) => (a.key === key ? { ...a, ...p } : a)) })

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="divide-y divide-line border-y border-line">
          {s.places.map((pl, i) => (
            <div key={pl.id} className="space-y-3 py-4">
              <div className="flex items-end gap-2">
                <Field label="Nombre" className="min-w-0 flex-1">
                  <Input value={pl.name} onChange={(e) => patchPlace(pl.id, { name: e.target.value })} />
                </Field>
                {s.places.length > 1 && (
                  <IconButton label={`Quitar ${pl.name || 'lugar'}`} icon={X} variant="ghost" onClick={() => set({ places: s.places.filter((x) => x.id !== pl.id) })} />
                )}
              </div>
              <Field label="Tipo">
                <Select value={pl.kind} onChange={(e) => patchPlace(pl.id, { kind: e.target.value })}>
                  {PLACE_KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                </Select>
              </Field>
              <Field label="Saldo hoy" hint={i === 0 ? 'Lo que tiene hoy, aunque sea 0. Desde aquí cuadramos con el banco.' : undefined}>
                <AmountInput value={pl.amount} currency={pl.currency} onChange={({ amount, currency }) => patchPlace(pl.id, { amount, currency })} />
              </Field>
            </div>
          ))}
        </div>
        {s.places.length < 3 && (
          <Button variant="secondary" icon={Plus} onClick={() => set({ places: [...s.places, { id: tmpId('pl'), name: '', kind: 'cuenta', amount: null, currency: 'CRC' }] })}>
            Agregar otro lugar
          </Button>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-heading text-ink">Gastos de una vez al año</h2>
        <p className="text-small text-ink-2">Opcional. Apartamos un poquito cada mes para que no te agarren de sorpresa.</p>
        <div className="flex flex-wrap gap-2">
          {s.annual.map((a) => (
            <Chip key={a.key} selected={a.on} onClick={() => patchAnnual(a.key, { on: !a.on })}>
              {a.name}
            </Chip>
          ))}
        </div>
        {s.annual.filter((a) => a.on).map((a) => (
          <div key={a.key} className="space-y-3 border-t border-line pt-4">
            <Field label={`Monto de ${a.name.toLowerCase()}`}>
              <AmountInput value={a.amount} currency={a.currency} onChange={({ amount, currency }) => patchAnnual(a.key, { amount, currency })} />
            </Field>
            <AnnualPlanPicker item={a} mKey={mKey} plan={effectivePlan(a, mKey, base)} onChange={(plan) => patchAnnual(a.key, { plan })} />
          </div>
        ))}
      </section>
    </div>
  )
}
