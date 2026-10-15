import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { BigNumber, Button, Card } from '../ui/index.js'
import { fmt } from '../../lib/format.js'
import { fmtDec } from './useSavingsOverview.js'

/** Cifra protagonista del ahorro + meses cubiertos + accesos a aporte y retiro. */
export default function SavingsHero({ couple, totals, covered, milestone, payroll, payrollLabel, onExtra, onWithdraw }) {
  return (
    <Card>
      <p className="text-body text-ink-2">{couple ? 'Llevamos ahorrado' : 'Llevás ahorrado'}</p>
      <BigNumber amount={totals.totalCRC} className="mt-1" />
      {covered != null && (
        <p className="mt-2 text-body text-ink">
          <span className="tnum">{fmtDec(covered)}</span> {covered === 1 ? 'mes' : 'meses'} de fijos cubiertos
          {milestone?.missing > 0 && (
            <span className="text-ink-2">
              {' '}· te faltan <span className="tnum">{fmt(milestone.missing)}</span> para {milestone.months}{' '}
              {milestone.months === 1 ? 'mes' : 'meses'}
            </span>
          )}
        </p>
      )}
      {totals.reservedCRC > 0 && (
        <p className="mt-1 text-small text-ink-2">
          De eso, <span className="tnum">{fmt(totals.reservedCRC)}</span> está apartado para reservas y{' '}
          <span className="tnum">{fmt(totals.freeCRC)}</span> queda libre.
        </p>
      )}
      {payroll > 0 && (
        <p className="mt-1 text-small text-ink-2">
          Incluyendo planilla{payrollLabel ? ` (${payrollLabel})` : ''}: <span className="tnum">{fmt(totals.totalCRC + payroll)}</span>.
          La planilla suma <span className="tnum">{fmt(payroll)}</span> y crece sola con cada mes cerrado.
        </p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="secondary" icon={ArrowDownToLine} onClick={onExtra}>Aporte extra</Button>
        <Button variant="secondary" icon={ArrowUpFromLine} onClick={onWithdraw}>Retiro</Button>
      </div>
      <p className="mt-3 text-small text-muted">
        La app no mueve dinero. Configurá el ahorro programado en tu banco y usá la app para marcarlo.
      </p>
    </Card>
  )
}
