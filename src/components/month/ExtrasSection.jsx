import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button, Card, IconButton, Row, RowGroup, useToast } from '../ui/index.js'
import { fmtAmount, fmtDate } from '../../lib/format.js'
import { addExtra, removeExtra } from '../../data/actions/index.js'
import { errorText, isPareja, personName } from './shared.js'
import ExtraSheet from './ExtraSheet.jsx'

const MINUS = '−'

const subtitleOf = (x, profile) =>
  [
    x.type === 'ingreso' ? 'Ingreso' : 'Gasto',
    isPareja(profile) ? (x.personId ? personName(profile, x.personId) : 'Hogar') : null,
    x.source === 'ahorro' ? 'del ahorro' : null,
    x.date ? fmtDate(x.date) : null,
  ]
    .filter(Boolean)
    .join(' · ')

/** Extras del mes: ingresos o gastos fuera del plan. */
export default function ExtrasSection({ hid, me, month, profile, places, readOnly }) {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [removing, setRemoving] = useState(null)
  const extras = month.extras || []
  if (readOnly && !extras.length) return null

  const save = async (extra) => {
    setBusy(true)
    try {
      await addExtra(hid, me, month, extra)
      toast.success(`Agregaste ${extra.label}`)
      setOpen(false)
    } catch (e) {
      toast.error(errorText(e))
    } finally {
      setBusy(false)
    }
  }

  const remove = async (x) => {
    setRemoving(x.id)
    try {
      await removeExtra(hid, me, month, x.id)
      toast.show(`Quitaste ${x.label || 'el extra'}`)
    } catch (e) {
      toast.error(errorText(e))
    } finally {
      setRemoving(null)
    }
  }

  return (
    <Card
      title="Extras"
      subtitle={extras.length ? null : 'Aguinaldo, un regalo, una reparación: lo que no está en el plan.'}
      action={
        readOnly ? null : (
          <Button variant="ghost" size="sm" icon={Plus} onClick={() => setOpen(true)}>
            Agregar extra
          </Button>
        )
      }
      padded={false}
    >
      {extras.length > 0 && (
        <RowGroup className="pb-1">
          {extras.map((x) => (
            <Row
              key={x.id}
              title={x.label || (x.type === 'ingreso' ? 'Ingreso' : 'Gasto')}
              subtitle={subtitleOf(x, profile)}
              trailing={
                <>
                  <span className={x.type === 'ingreso' ? 'tnum text-good' : 'tnum text-ink'}>
                    {x.type === 'ingreso' ? '+' : MINUS}
                    {fmtAmount(x.amount, x.currency)}
                  </span>
                  {!readOnly && (
                    <IconButton
                      size="sm"
                      label={`Quitar ${x.label || 'extra'}`}
                      icon={Trash2}
                      disabled={removing === x.id}
                      onClick={() => remove(x)}
                      className="-mr-2"
                    />
                  )}
                </>
              }
            />
          ))}
        </RowGroup>
      )}
      {!extras.length && <div className="h-2" />}
      {!readOnly && <ExtraSheet open={open} onClose={() => setOpen(false)} onSave={save} profile={profile} places={places} busy={busy} />}
    </Card>
  )
}
