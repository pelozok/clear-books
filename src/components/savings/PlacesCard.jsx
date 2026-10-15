import { Landmark } from 'lucide-react'
import { Card, Row, RowGroup } from '../ui/index.js'
import { fmt, fmtAmount, toCRC } from '../../lib/format.js'

const KIND = { cuenta: 'Cuenta', cdp: 'CDP', cooperativa: 'Cooperativa', efectivo: 'Efectivo', otro: 'Otro' }

/** Lugares de ahorro con saldo en su moneda y, si es en $, su equivalente en ₡. */
export default function PlacesCard({ byPlace, rate }) {
  if (!byPlace.length) {
    return (
      <Card title="Lugares de ahorro">
        <p className="text-body text-ink-2">Agregá tus cuentas de ahorro en Ajustes para ver su saldo acá.</p>
      </Card>
    )
  }
  return (
    <Card title="Lugares de ahorro" padded={false}>
      <RowGroup className="pb-1">
        {byPlace.map(({ place, balance }) => (
          <Row
            key={place.id}
            leading={<Landmark size={20} strokeWidth={1.75} aria-hidden="true" />}
            title={place.name}
            subtitle={KIND[place.kind] || (place.currency === 'USD' ? 'En dólares' : 'En colones')}
            trailing={
              <div className="text-right">
                <div className="tnum font-medium">{fmtAmount(balance, place.currency)}</div>
                {place.currency === 'USD' && (
                  <div className="tnum text-small text-muted">≈ {fmt(toCRC(balance, 'USD', rate))}</div>
                )}
              </div>
            }
          />
        ))}
      </RowGroup>
    </Card>
  )
}
