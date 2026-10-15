import { useState } from 'react'
import { Card, Row, RowGroup, StatusPill, useToast } from '../ui/index.js'
import { fmt, fmtAmount, fmtDate } from '../../lib/format.js'
import { halfLabel, halvesFor, monthLabel } from '../../lib/periods.js'
import { detectCardDoubleCount } from '../../lib/cards.js'
import { markFixed } from '../../data/actions/index.js'
import { errorText } from './shared.js'
import FixedSheet from './FixedSheet.jsx'

const PILL = { paid: 'done', pending: 'pending', skipped: 'skipped', deferred: 'deferred' }
const PILL_LABEL = { paid: 'Pagado' }

// Grupos por quincena (quincenal) o uno solo (mensual). La quincena en curso va primero.
const groupsOf = (items, frequency, currentHalf) => {
  if (frequency !== 'quincenal') return [{ key: 'all', label: null, items }]
  const halves = halvesFor(frequency).sort((a, b) => (a === currentHalf ? -1 : b === currentHalf ? 1 : a - b))
  const groups = halves.map((h) => ({ key: h, label: halfLabel(h), items: items.filter((it) => (it.half === 2 ? 2 : it.half === 'ambas' ? null : 1) === h) }))
  groups.push({ key: 'ambas', label: halfLabel('ambas'), items: items.filter((it) => it.half === 'ambas') })
  return groups.filter((g) => g.items.length)
}

const subtitleOf = (it) => {
  const parts = []
  if (it.status === 'paid') {
    parts.push(fmtAmount(it.paidAmount ?? it.amount, it.currency))
    if (it.paidAt) parts.push(`pagado ${fmtDate(it.paidAt)}`)
  } else {
    parts.push(fmtAmount(it.amount, it.currency))
  }
  if (it.fromMonth) parts.push(`viene de ${monthLabel(it.fromMonth).split(' ')[0].toLowerCase()}`)
  return parts.join(' · ')
}

/** Fijos del mes agrupados por quincena, con estado y total "pagado / falta". */
export default function FixedSection({ hid, me, month, totals, entriesCount, currentHalf, readOnly }) {
  const toast = useToast()
  const [item, setItem] = useState(null)
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(null)
  const items = month.fixedItems || []
  if (!items.length) {
    return (
      <Card title="Fijos">
        <p className="text-body text-ink-2">No hay fijos este mes. Agregalos en Ajustes, en Fijos.</p>
      </Card>
    )
  }
  const groups = groupsOf(items, month.frequency, currentHalf)
  const card = detectCardDoubleCount(items, entriesCount)

  const mark = async (patch) => {
    setBusy(patch.status)
    try {
      await markFixed(hid, me, month, item.id, patch)
      setVisible(false)
    } catch (e) {
      toast.error(errorText(e))
    } finally {
      setBusy(null)
    }
  }

  return (
    <Card
      title="Fijos"
      subtitle={<span className="tnum">Pagado {fmt(totals.fixedPaid)} · Falta {fmt(totals.fixedPending)}</span>}
      padded={false}
    >
      {groups.map((g) => (
        <div key={g.key}>
          {g.label && <h3 className="px-4 pb-1 pt-3 text-small font-medium text-ink-2 sm:px-5">{g.label}</h3>}
          <RowGroup>
            {g.items.map((it) => (
              <Row
                key={it.id}
                title={it.name}
                subtitle={<span className="tnum">{subtitleOf(it)}</span>}
                onClick={readOnly ? undefined : () => { setItem(it); setVisible(true) }}
                trailing={<StatusPill state={PILL[it.status] || 'pending'} label={PILL_LABEL[it.status]} />}
              />
            ))}
          </RowGroup>
        </div>
      ))}
      {card.warn && !readOnly && (
        <p className="border-t border-line px-4 py-3 text-small text-ink-2 sm:px-5">
          Ojo con {card.item.name}: si ya anotaste gastos hechos con esa tarjeta, ese dinero se cuenta dos veces.
        </p>
      )}
      <div className="h-1" />
      {!readOnly && <FixedSheet open={visible} item={item} busy={busy} onClose={() => setVisible(false)} onMark={mark} />}
    </Card>
  )
}
