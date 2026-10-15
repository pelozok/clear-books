import { useState } from 'react'
import { Button, Card, Row, RowGroup, StatusPill, useToast } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { halfLabel } from '../../lib/periods.js'
import { savingsTotals } from '../../lib/savings.js'
import { clearSavings, confirmSavings } from '../../data/actions/index.js'
import { errorText, isPareja, personName } from './shared.js'
import SaveSheet from './SaveSheet.jsx'

const rowTitle = (row, profile, frequency) => {
  const half = frequency === 'quincenal' ? halfLabel(row.half) : 'Este mes'
  return isPareja(profile) ? `${personName(profile, row.personId)} · ${half}` : half
}

/**
 * Ahorro del mes: una fila por persona y quincena. La quincena en curso va primero.
 * Confirmar abre la hoja; el toast dice cuánto llevan en total.
 */
export default function SavingsSection({ hid, me, month, profile, summary, currentHalf, places, ledger, annual, readOnly }) {
  const toast = useToast()
  const [open, setOpenRow] = useState(null) // fila elegida (se mantiene mientras la hoja sale)
  const [visible, setVisible] = useState(false)
  const setOpen = (row) => {
    if (row) setOpenRow(row)
    setVisible(!!row)
  }
  const [busy, setBusy] = useState(false)
  const frequency = month.frequency || profile?.frequency
  const rows = [...summary.rows].sort((a, b) => (a.half === currentHalf ? 0 : 1) - (b.half === currentHalf ? 0 : 1))
  if (!rows.length || summary.planned <= 0) return null

  const confirm = async ({ amount, placeId, note }) => {
    const row = open
    setBusy(true)
    try {
      await confirmSavings(hid, me, month, { personId: row.personId, half: row.half, amount, placeId, note })
      if (amount > 0) {
        const before = savingsTotals({ places, ledger, annual, rate: month.exchangeRate?.venta }).totalCRC
        const previous = row.ledgerId ? row.actual || 0 : 0
        toast.success(`Apartaste ${fmt(amount)} · Llevás ${fmt(before - previous + amount)}`)
      } else {
        toast.show('Listo, esta vez no. Sin problema.')
      }
      setOpen(null)
    } catch (e) {
      toast.error(errorText(e))
    } finally {
      setBusy(false)
    }
  }

  const undo = async () => {
    setBusy(true)
    try {
      await clearSavings(hid, me, month, { personId: open.personId, half: open.half })
      setOpen(null)
    } catch (e) {
      toast.error(errorText(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card
      title="Ahorro"
      subtitle={<span className="tnum">Apartado {fmt(summary.actual)} de {fmt(summary.planned)}</span>}
      padded={false}
    >
      <RowGroup className="pb-1">
        {rows.map((row) => {
          const key = `${row.personId}-${row.half}`
          const pending = row.state === 'pending'
          const subtitle = pending ? `${fmt(row.planned)} planeado` : `${fmt(row.actual)} de ${fmt(row.planned)}`
          if (pending && !readOnly) {
            return (
              <Row
                key={key}
                title={rowTitle(row, profile, frequency)}
                subtitle={<span className="tnum">{subtitle}</span>}
                trailing={
                  <Button size="sm" onClick={() => setOpen(row)}>
                    <span className="tnum">Apartar {fmt(row.planned)}</span>
                  </Button>
                }
              />
            )
          }
          return (
            <Row
              key={key}
              title={rowTitle(row, profile, frequency)}
              subtitle={<span className="tnum">{subtitle}</span>}
              onClick={readOnly ? undefined : () => setOpen(row)}
              trailing={<StatusPill state={row.state} label={row.label} />}
            />
          )
        })}
      </RowGroup>
      {!readOnly && (
        <SaveSheet
          open={visible}
          row={open}
          title={open ? `Ahorro, ${rowTitle(open, profile, frequency)}` : 'Ahorro'}
          places={places}
          busy={busy}
          onClose={() => setOpen(null)}
          onConfirm={confirm}
          onUndo={undo}
        />
      )}
    </Card>
  )
}

