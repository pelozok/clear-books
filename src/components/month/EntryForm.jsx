import { useState } from 'react'
import { ChevronDown, Trash2 } from 'lucide-react'
import { AmountInput, Button, Chip, Field, Input, Select, cx } from '../ui/index.js'
import { lastDayOfMonth } from '../../lib/periods.js'
import { activePlaces, categoriesOf, getLastCategory, useLastPlace } from './shared.js'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Formulario de gasto variable. onSubmit(data) con { date, amount, currency, categoryId,
 * description, source, placeId }. onDelete solo en edición.
 */
export default function EntryForm({ monthKey, entry, defaultDate, profile, places, onSubmit, onDelete, saving, deleting }) {
  const cats = categoriesOf(profile)
  const list = activePlaces(places)
  const [lastPlace, rememberPlace] = useLastPlace(places)
  const initialCat = entry?.categoryId || (cats.some((c) => c.id === getLastCategory()) ? getLastCategory() : 'otros')
  const [money, setMoney] = useState({ amount: entry?.amount ?? null, currency: entry?.currency || 'CRC' })
  const [categoryId, setCategoryId] = useState(initialCat)
  const [more, setMore] = useState(Boolean(entry?.description) || (entry && entry.date !== defaultDate))
  const [description, setDescription] = useState(entry?.description || '')
  const [date, setDate] = useState(entry?.date || defaultDate)
  const [fromSavings, setFromSavings] = useState(entry?.source === 'savings')
  const [placeId, setPlaceId] = useState(entry?.placeId || lastPlace)

  const valid = money.amount > 0 && date && (!fromSavings || placeId)
  const submit = (e) => {
    e.preventDefault()
    if (!valid || saving) return
    if (fromSavings) rememberPlace(placeId)
    onSubmit({
      date,
      amount: money.amount,
      currency: money.currency,
      categoryId,
      description: description.trim(),
      source: fromSavings ? 'savings' : null,
      placeId: fromSavings ? placeId : null,
    })
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6 pb-8">
      <Field label="Monto">
        <AmountInput autoFocus value={money.amount} currency={money.currency} onChange={setMoney} />
      </Field>

      <fieldset>
        <legend className="mb-2 text-small font-medium text-ink-2">Categoría</legend>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <Chip key={c.id} selected={categoryId === c.id} onClick={() => setCategoryId(c.id)}>
              {c.label}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <label className="flex min-h-11 cursor-pointer items-start gap-3">
          <input type="checkbox" checked={fromSavings} onChange={(e) => setFromSavings(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" />
          <span className="text-body text-ink">
            Lo pagué del ahorro
            <span className="block text-small text-muted">No baja lo que te queda: sale del lugar de ahorro.</span>
          </span>
        </label>
        {fromSavings && (
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

      <div className="flex flex-col gap-4">
        <button
          type="button"
          aria-expanded={more}
          onClick={() => setMore((v) => !v)}
          className="cb-press -mx-1 flex h-11 items-center gap-1.5 self-start rounded-xl px-1 text-body font-medium text-accent"
        >
          Más detalles
          <ChevronDown size={18} strokeWidth={1.75} aria-hidden="true" className={cx(more && 'rotate-180')} />
        </button>
        {more && (
          <>
            <Field label="Descripción (opcional)">
              <Input value={description} onChange={(e) => setDescription(e.target.value)} maxLength={80} />
            </Field>
            <Field label="Fecha">
              <Input
                type="date"
                className="tnum"
                value={date}
                min={`${monthKey}-01`}
                max={`${monthKey}-${pad(lastDayOfMonth(monthKey))}`}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" full size="lg" loading={saving} disabled={!valid || deleting}>
          Guardar
        </Button>
        {onDelete && (
          <Button variant="ghost" full icon={Trash2} loading={deleting} disabled={saving} onClick={onDelete} className="text-bad">
            Borrar gasto
          </Button>
        )}
      </div>
    </form>
  )
}
