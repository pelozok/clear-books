import { useEffect, useState } from 'react'
import { AmountInput, Button, Field, Input, Select, Sheet, useToast } from '../ui/index.js'
import { recordExtraContribution, recordWithdrawal } from '../../data/actions/index.js'
import { fmt, fmtAmount, toCRC } from '../../lib/format.js'
import { monthKey, todayISO } from '../../lib/periods.js'

/**
 * Hoja de aporte extra o retiro. mode: 'extra' | 'retiro'.
 * El retiro pide motivo (obligatorio) y puede salir de una reserva.
 */
export default function MoveSheet({ mode, open, onClose, hid, me, places, annual, totals, rate }) {
  const toast = useToast()
  const isOut = mode === 'retiro'
  const [placeId, setPlaceId] = useState('')
  const [amount, setAmount] = useState(null)
  const [label, setLabel] = useState('')
  const [reserveId, setReserveId] = useState('')
  const [date, setDate] = useState(todayISO())
  const [tried, setTried] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    setPlaceId(places[0]?.id || '')
    setAmount(null)
    setLabel('')
    setReserveId('')
    setDate(todayISO())
    setTried(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const place = places.find((p) => p.id === placeId)
  const currency = place?.currency || 'CRC'
  const errors = {
    place: !place ? 'Elegí un lugar.' : null,
    amount: !(amount > 0) ? 'Escribí un monto mayor a 0.' : null,
    label: isOut && !label.trim() ? 'Contanos para qué fue el retiro.' : null,
  }
  const invalid = Object.values(errors).some(Boolean)

  const submit = async (e) => {
    e?.preventDefault()
    setTried(true)
    if (invalid || saving) return
    setSaving(true)
    const data = {
      placeId, amount, currency, date, monthKey: monthKey(date),
      ...(label.trim() ? { label: label.trim() } : {}),
      ...(isOut && reserveId ? { reserveId } : {}),
    }
    try {
      await (isOut ? recordWithdrawal : recordExtraContribution)(hid, me, data)
      const delta = toCRC(amount, currency, rate) * (isOut ? -1 : 1)
      toast.success(`${isOut ? 'Sacaste' : 'Aportaste'} ${fmtAmount(amount, currency)} · Llevás ${fmt(totals.totalCRC + delta)}`)
      onClose()
    } catch (err) {
      toast.error(err?.message || 'No se pudo guardar. Probá de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={isOut ? 'Retiro del ahorro' : 'Aporte extra'}
      footer={
        <Button full size="lg" loading={saving} onClick={submit} disabled={!places.length}>
          {isOut ? 'Registrar retiro' : 'Registrar aporte'}
        </Button>
      }
    >
      {!places.length ? (
        <p className="text-body text-ink-2">Primero agregá un lugar de ahorro en Ajustes.</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Monto" error={tried ? errors.amount : null}>
            <AmountInput value={amount} currency={currency} allowCurrencyToggle={false} autoFocus
              onChange={({ amount: a }) => setAmount(a)} />
          </Field>
          <Field label={isOut ? 'Sale de' : 'Entra a'} error={tried ? errors.place : null}>
            <Select value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
              {places.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.currency === 'USD' ? '$' : '₡'})</option>
              ))}
            </Select>
          </Field>
          <Field
            label={isOut ? 'Motivo' : 'Nota (opcional)'}
            hint={isOut ? 'Ejemplo: reparación del carro, marchamo.' : 'Ejemplo: aguinaldo, sobrante.'}
            error={tried ? errors.label : null}
          >
            <Input value={label} onChange={(e) => setLabel(e.target.value)} maxLength={80} />
          </Field>
          {isOut && annual.length > 0 && (
            <Field label="¿Sale de una reserva?" hint="Si es para marchamo o Navidad, baja lo apartado de esa reserva.">
              <Select value={reserveId} onChange={(e) => setReserveId(e.target.value)}>
                <option value="">No, del ahorro libre</option>
                {annual.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </Select>
            </Field>
          )}
          <Field label="Fecha">
            <Input type="date" value={date} max={todayISO()} onChange={(e) => setDate(e.target.value || todayISO())} />
          </Field>
        </form>
      )}
    </Sheet>
  )
}
