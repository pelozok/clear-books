import { useEffect, useState } from 'react'
import { AmountInput, Button, Field, Input, Select, Sheet } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { activePlaces, useLastPlace } from './shared.js'

/**
 * Hoja "Apartar ahorro": monto prellenado, "Otro monto", lugar (último usado), nota.
 * onConfirm({ amount, placeId, note }) ; onUndo() si la fila ya estaba confirmada.
 */
export default function SaveSheet({ open, onClose, row, title, places, onConfirm, onUndo, busy }) {
  const list = activePlaces(places)
  const [lastPlace, rememberPlace] = useLastPlace(places)
  const [custom, setCustom] = useState(false)
  const [amount, setAmount] = useState(null)
  const [placeId, setPlaceId] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (!open || !row) return
    const touched = row.actual != null
    setCustom(touched && row.actual !== row.planned)
    setAmount(touched ? row.actual : row.planned)
    setPlaceId(lastPlace)
    setNote('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, row])

  const value = custom ? amount ?? 0 : row?.planned ?? 0
  const submit = (amt) => {
    rememberPlace(placeId)
    onConfirm({ amount: amt, placeId: placeId || null, note: note.trim() || null })
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <div className="flex flex-col gap-2">
          <Button full size="lg" loading={busy} disabled={!(value > 0)} onClick={() => submit(value)}>
            <span className="tnum">Confirmar {fmt(value)}</span>
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" full disabled={busy} onClick={() => submit(0)}>
              Esta vez no
            </Button>
            {row?.actual != null && (
              <Button variant="ghost" full disabled={busy} onClick={onUndo}>
                Volver a pendiente
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {custom ? (
          <Field label="Monto">
            <AmountInput autoFocus value={amount} currency="CRC" allowCurrencyToggle={false} onChange={(v) => setAmount(v.amount)} />
          </Field>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <p className="text-body text-ink-2">
              Planeado <span className="tnum font-medium text-ink">{fmt(row?.planned)}</span>
            </p>
            <Button variant="secondary" size="sm" onClick={() => { setCustom(true); setAmount(row?.planned ?? null) }}>
              Otro monto
            </Button>
          </div>
        )}
        <Field
          label="Lugar de ahorro"
          hint={list.length ? undefined : 'Todavía no tenés lugares de ahorro. Agregalos en Ajustes.'}
        >
          <Select value={placeId} onChange={(e) => setPlaceId(e.target.value)} disabled={!list.length}>
            {list.length === 0 && <option value="">Sin lugar</option>}
            {list.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Nota (opcional)">
          <Input value={note} onChange={(e) => setNote(e.target.value)} maxLength={80} />
        </Field>
      </div>
    </Sheet>
  )
}
