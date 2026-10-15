import { useState } from 'react'
import { PiggyBank } from 'lucide-react'
import { AmountInput, Button, Field, Input, Row, Select, Sheet, useToast } from '../ui/index.js'
import { useSavingsPlaces } from '../../data/hooks/index.js'
import { addPlace, updatePlace, removePlace } from '../../data/actions/index.js'
import { fmtAmount, fmtDate } from '../../lib/format.js'
import { todayISO } from '../../lib/periods.js'
import { PLACE_KINDS } from '../onboarding/defaults.js'
import CrudList from './CrudList.jsx'

const kindLabel = (k) => PLACE_KINDS.find((x) => x.value === k)?.label || 'Otro'

export default function PlacesSection({ hid, me }) {
  const toast = useToast()
  const { data, loading, error } = useSavingsPlaces(hid)
  const items = (data || []).filter((p) => p.active !== false)
  const [edit, setEdit] = useState(null)
  const [busy, setBusy] = useState(false)
  const patch = (p) => setEdit((e) => ({ ...e, ...p }))
  const valid = edit && edit.name.trim()

  const run = async (fn, msg) => {
    setBusy(true)
    try {
      await fn()
      toast.success(msg)
      setEdit(null)
    } catch (e) {
      toast.error(`No se pudo guardar: ${e.message || e}`)
    } finally {
      setBusy(false)
    }
  }

  const save = () =>
    run(async () => {
      const item = { name: edit.name.trim(), kind: edit.kind, currency: edit.currency, openingAmount: Number(edit.openingAmount) || 0 }
      if (edit.id) await updatePlace(hid, me, edit.id, item)
      else await addPlace(hid, me, { ...item, openingAsOf: todayISO(), order: items.length })
    }, 'Guardado')

  return (
    <>
      <CrudList
        loading={loading}
        error={error}
        count={items.length}
        empty={{ icon: PiggyBank, title: 'Sin lugares de ahorro', body: 'Agregá la cuenta, el CDP o la cooperativa donde guardás la plata, con su saldo de hoy.' }}
        addLabel="Agregar lugar"
        onAdd={() => setEdit({ name: '', kind: 'cuenta', currency: 'CRC', openingAmount: null })}
        note="El saldo real de cada lugar se ve en Ahorro. Aquí solo se edita el saldo con el que arrancó."
      >
        {items.map((p) => (
          <Row
            key={p.id}
            onClick={() => setEdit({ ...p })}
            title={p.name}
            subtitle={`${kindLabel(p.kind)} · inicial al ${fmtDate(p.openingAsOf)}`}
            trailing={<span className="tnum">{fmtAmount(p.openingAmount, p.currency)}</span>}
          />
        ))}
      </CrudList>

      <Sheet
        open={!!edit}
        onClose={() => setEdit(null)}
        title={edit?.id ? 'Editar lugar' : 'Nuevo lugar de ahorro'}
        footer={
          <div className="flex gap-3">
            {edit?.id && (
              <Button variant="ghost" disabled={busy} onClick={() => run(() => removePlace(hid, me, edit.id), 'Lugar quitado')}>
                Quitar
              </Button>
            )}
            <Button full loading={busy} disabled={!valid} onClick={save}>Guardar</Button>
          </div>
        }
      >
        {edit && (
          <div className="space-y-4">
            <Field label="Nombre">
              <Input value={edit.name} onChange={(e) => patch({ name: e.target.value })} />
            </Field>
            <Field label="Tipo">
              <Select value={edit.kind} onChange={(e) => patch({ kind: e.target.value })}>
                {PLACE_KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
              </Select>
            </Field>
            <Field
              label={edit.id ? `Saldo inicial (al ${fmtDate(edit.openingAsOf)})` : 'Saldo hoy'}
              hint={edit.id ? 'Cambiarlo corrige el saldo total; los movimientos se mantienen.' : undefined}
            >
              <AmountInput
                value={edit.openingAmount}
                currency={edit.currency}
                allowCurrencyToggle={!edit.id}
                onChange={({ amount, currency }) => patch({ openingAmount: amount, currency })}
              />
            </Field>
          </div>
        )}
      </Sheet>
    </>
  )
}
