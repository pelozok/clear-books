import { useMemo, useState } from 'react'
import { Card, Chip, Row, RowGroup } from '../ui/index.js'
import { fmtAmount, fmtDate } from '../../lib/format.js'

const MINUS = '−'
const LIMIT = 20

/** Libro de movimientos: últimos 20, con filtro por lugar. */
export default function LedgerCard({ ledger, places }) {
  const [placeId, setPlaceId] = useState(null)
  const names = useMemo(() => Object.fromEntries(places.map((p) => [p.id, p.name])), [places])
  const list = useMemo(
    () => ledger.filter((e) => !placeId || e.placeId === placeId).slice(0, LIMIT),
    [ledger, placeId],
  )

  return (
    <Card title="Movimientos" subtitle="Los últimos 20 del libro de ahorro." padded={false}>
      {places.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:px-5">
          <Chip selected={!placeId} onClick={() => setPlaceId(null)}>Todos</Chip>
          {places.map((p) => (
            <Chip key={p.id} selected={placeId === p.id} onClick={() => setPlaceId(p.id)}>
              {p.name}
            </Chip>
          ))}
        </div>
      )}
      {list.length === 0 ? (
        <p className="px-4 pb-5 text-body text-ink-2 sm:px-5">
          Todavía no hay movimientos. Cuando apartes el ahorro de la quincena aparece acá.
        </p>
      ) : (
        <RowGroup className="border-t border-line pb-1">
          {list.map((e) => {
            const out = e.type === 'retiro'
            return (
              <Row
                key={e.id}
                title={e.label || (out ? 'Retiro' : 'Aporte')}
                subtitle={[fmtDate(e.date), names[e.placeId]].filter(Boolean).join(' · ')}
                trailing={
                  <span className={out ? 'tnum text-ink-2' : 'tnum font-medium text-ink'}>
                    {out ? MINUS : '+'}
                    {fmtAmount(e.amount, e.currency)}
                  </span>
                }
              />
            )
          })}
        </RowGroup>
      )}
    </Card>
  )
}
