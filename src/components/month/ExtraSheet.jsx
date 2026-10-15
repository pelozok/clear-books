import { useEffect, useState } from 'react'
import { AmountInput, Button, Field, Input, Segmented, Select, Sheet } from '../ui/index.js'
import { todayISO } from '../../lib/periods.js'
import { activePlaces, isPareja, useLastPlace } from './shared.js'

const TYPES = [
  { value: 'gasto', label: 'Gasto' },
  { value: 'ingreso', label: 'Ingreso' },
]

const Check = ({ checked, onChange, children, hint }) => (
  <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" />
    <span className="text-body text-ink">
      {children}
      {hint && <span className="block text-small text-muted">{hint}</span>}
    </span>
  </label>
)

/** Hoja "Agregar extra": ingreso/gasto, etiqueta, monto ₡/$, persona, reparto, sale del ahorro. */
export default function ExtraSheet({ open, onClose, onSave, profile, places, busy }) {
  const pareja = isPareja(profile)
  const list = activePlaces(places)
  const [lastPlace, rememberPlace] = useLastPlace(places)
  const [type, setType] = useState('gasto')
  const [label, setLabel] = useState('')
  const [money, setMoney] = useState({ amount: null, currency: 'CRC' })
  const [personId, setPersonId] = useState('')
  const [inSplit, setInSplit] = useState(false)
  const [fromSavings, setFromSavings] = useState(false)
  const [placeId, setPlaceId] = useState('')

  useEffect(() => {
    if (!open) return
    setType('gasto')
    setLabel('')
    setMoney({ amount: null, currency: 'CRC' })
    setPersonId('')
    setInSplit(false)
    setFromSavings(false)
    setPlaceId(lastPlace)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const savingsOk = !(type === 'gasto' && fromSavings) || !!placeId
  const valid = label.trim() && money.amount > 0 && savingsOk
  const save = () => {
    const ahorro = type === 'gasto' && fromSavings
    if (ahorro) rememberPlace(placeId)
    onSave({
      type,
      label: label.trim(),
      amount: money.amount,
      currency: money.currency,
      date: todayISO(),
      personId: pareja ? personId || null : profile?.people?.[0]?.id ?? null,
      inSplit: pareja ? (personId ? inSplit : true) : false,
      source: ahorro ? 'ahorro' : 'corriente',
      placeId: ahorro ? placeId : null,
    })
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Agregar extra"
      footer={
        <Button full size="lg" loading={busy} disabled={!valid} onClick={save}>
          Agregar
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <Segmented options={TYPES} value={type} onChange={setType} aria-label="Tipo de extra" />
        <Field label="Qué es" hint={type === 'ingreso' ? 'Ej.: aguinaldo, un trabajo extra.' : 'Ej.: regalo, reparación del carro.'}>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} maxLength={60} />
        </Field>
        <Field label="Monto">
          <AmountInput value={money.amount} currency={money.currency} onChange={setMoney} />
        </Field>
        {pareja && (
          <>
            <Field label="De quién">
              <Select value={personId} onChange={(e) => setPersonId(e.target.value)}>
                <option value="">Del hogar (los dos)</option>
                {(profile.people || []).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </Field>
            {personId && (
              <Check checked={inSplit} onChange={setInSplit} hint="Si no, solo cambia lo que le queda a esa persona.">
                Entra al reparto
              </Check>
            )}
          </>
        )}
        {type === 'gasto' && (
          <Check checked={fromSavings} onChange={setFromSavings} hint="No toca la cuenta del mes: baja el saldo del lugar de ahorro.">
            Sale del ahorro
          </Check>
        )}
        {type === 'gasto' && fromSavings && (
          <Field label="De cuál lugar" hint={list.length ? undefined : 'Agregá un lugar de ahorro en Ajustes.'}>
            <Select value={placeId} onChange={(e) => setPlaceId(e.target.value)} disabled={!list.length}>
              {list.length === 0 && <option value="">Sin lugar</option>}
              {list.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>
        )}
      </div>
    </Sheet>
  )
}
