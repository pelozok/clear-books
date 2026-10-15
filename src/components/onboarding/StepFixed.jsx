import { Plus, X } from 'lucide-react'
import { AmountInput, Button, Chip, Field, IconButton, Input, Segmented } from '../ui/index.js'
import { FIXED_SUGGESTIONS, HALF_OPTIONS, tmpId } from './defaults.js'

/** Un fijo editable: nombre (solo si es propio), monto con moneda y quincena. */
export function FixedEditor({ item, quincenal, onChange, onRemove }) {
  return (
    <div className="space-y-3 py-4">
      <div className="flex items-center gap-2">
        {item.key ? (
          <p className="min-w-0 flex-1 text-body font-medium text-ink">{item.name}</p>
        ) : (
          <Field label="Nombre del fijo" className="min-w-0 flex-1">
            <Input value={item.name} onChange={(e) => onChange({ name: e.target.value })} />
          </Field>
        )}
        <IconButton label={`Quitar ${item.name || 'fijo'}`} icon={X} variant="ghost" onClick={onRemove} />
      </div>
      <Field label="Monto al mes">
        <AmountInput value={item.amount} currency={item.currency} onChange={({ amount, currency }) => onChange({ amount, currency })} />
      </Field>
      {quincenal && (
        <Field label="¿En qué quincena lo pagás?" hint={item.half === 'ambas' ? 'La mitad en cada quincena.' : undefined}>
          <Segmented options={HALF_OPTIONS} value={item.half} onChange={(half) => onChange({ half })} />
        </Field>
      )}
    </div>
  )
}

export default function StepFixed({ s, set }) {
  const quincenal = s.frequency === 'quincenal'
  const on = (key) => s.fixed.some((f) => f.key === key)
  const toggle = (sug) => {
    if (on(sug.key)) set({ fixed: s.fixed.filter((f) => f.key !== sug.key) })
    else set({ fixed: [...s.fixed, { id: tmpId('f'), key: sug.key, name: sug.name, amount: null, currency: sug.currency, half: 1 }] })
  }
  const patch = (id, p) => set({ fixed: s.fixed.map((f) => (f.id === id ? { ...f, ...p } : f)) })
  const remove = (id) => set({ fixed: s.fixed.filter((f) => f.id !== id) })
  const addOther = () => set({ fixed: [...s.fixed, { id: tmpId('f'), key: null, name: '', amount: null, currency: 'CRC', half: 1 }] })

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" aria-label="Sugerencias">
        {FIXED_SUGGESTIONS.map((sug) => (
          <Chip key={sug.key} selected={on(sug.key)} onClick={() => toggle(sug)}>
            {sug.name}
          </Chip>
        ))}
      </div>
      {s.fixed.length > 0 && (
        <div className="divide-y divide-line border-y border-line">
          {s.fixed.map((f) => (
            <FixedEditor key={f.id} item={f} quincenal={quincenal} onChange={(p) => patch(f.id, p)} onRemove={() => remove(f.id)} />
          ))}
        </div>
      )}
      <Button variant="secondary" icon={Plus} onClick={addOther}>
        Agregar otro
      </Button>
      <p className="text-small text-muted">Las tarjetas y préstamos los podés agregar después en Ajustes, marcados como deuda.</p>
    </div>
  )
}
