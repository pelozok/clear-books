import { useState } from 'react'
import { Button, Card, Row, StatusPill, useToast } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { clearReserve, confirmReserve } from '../../data/actions/index.js'
import { activePlaces, errorText, useLastPlace } from './shared.js'

/** Reserva anual: una línea con el desglose y el check de apartado. */
export default function ReserveSection({ hid, me, month, places, readOnly }) {
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const [placeId, rememberPlace] = useLastPlace(places)
  const reserve = month.annualReserve
  if (!reserve || !(reserve.quota > 0)) return null

  const place = activePlaces(places).find((p) => p.id === placeId)
  const breakdown = (reserve.breakdown || [])
    .filter((b) => b.quota > 0)
    .map((b) => `${b.name} ${fmt(b.quota)}`)
    .join(' · ')

  const run = async (fn, okMsg) => {
    setBusy(true)
    try {
      await fn()
      if (okMsg) toast.success(okMsg)
    } catch (e) {
      toast.error(errorText(e))
    } finally {
      setBusy(false)
    }
  }

  const confirm = () =>
    run(async () => {
      rememberPlace(placeId)
      await confirmReserve(hid, me, month, { placeId: placeId || null })
    }, `Apartaste ${fmt(reserve.quota)} para la reserva anual`)

  let trailing = <StatusPill state={reserve.done ? 'done' : 'pending'} label={reserve.done ? 'Apartado' : undefined} />
  if (!readOnly) {
    trailing = reserve.done ? (
      <>
        <StatusPill state="done" label="Apartado" />
        <Button variant="ghost" size="sm" disabled={busy} onClick={() => run(() => clearReserve(hid, me, month))}>
          Deshacer
        </Button>
      </>
    ) : (
      <Button size="sm" variant="secondary" loading={busy} onClick={confirm}>
        <span className="tnum">Apartar {fmt(reserve.quota)}</span>
      </Button>
    )
  }

  return (
    <Card title="Reserva anual" padded={false}>
      <Row
        title={<span className="tnum">{fmt(reserve.quota)} este mes</span>}
        subtitle={
          <span className="tnum">
            {breakdown}
            {!reserve.done && place ? ` · a ${place.name}` : ''}
          </span>
        }
        trailing={trailing}
        className="pb-3"
      />
    </Card>
  )
}
