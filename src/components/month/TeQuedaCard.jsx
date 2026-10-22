import { Link } from 'react-router-dom'
import { BigNumber, Card, ProgressBar } from '../ui/index.js'
import { fmt, fmtAmount, fmtDateLong, fmtRelative } from '../../lib/format.js'
import { transferToColones } from '../../lib/transfer.js'
import { halfLabel } from '../../lib/periods.js'
import { explainSplit } from '../../lib/split.js'
import { isPareja, personName } from './shared.js'

// splitByRule-shaped result a partir de lo que ya devolvió teQueda (para explainSplit).
const splitResultOf = (plan) => {
  const [a = {}, b = {}] = plan.perPerson
  return {
    aporte: { p1: a.aporte || 0, p2: b.aporte || 0 },
    restante: { p1: a.libre || 0, p2: b.libre || 0 },
    ahorro: { p1: a.ahorro || 0, p2: b.ahorro || 0 },
    share: { p1: a.share || 0, p2: b.share || 0 },
    deficit: plan.deficit > 0,
    desbalance: false,
  }
}

// Cuánto mover de dólares a colones al cobrar: fijos en ₡ + caja chica. El resto se
// queda en dólares como ahorro.
function TransferNote({ month, personId, cajaChica }) {
  const rows = transferToColones(month, personId, cajaChica)
  if (!rows.length) return null
  const quincenal = rows.length > 1
  const salaryUSD = Number(month?.incomes?.[personId]?.salaryUSD) || 0
  const keepUSD = Math.max(0, salaryUSD - rows.reduce((s, r) => s + r.usd, 0))
  return (
    <div className="mt-4 border-t border-line pt-3 text-small text-ink-2">
      <p className="text-body text-ink">Pasá a colones</p>
      {rows.map((r) => (
        <p key={r.half} className="tnum mt-1">
          {quincenal ? `${halfLabel(r.half)}: ` : ''}
          <span className="font-medium text-ink">{fmtAmount(r.usd, 'USD')}</span> ≈ {fmt(r.crc)}
          {r.fixedCRC > 0 ? ` (${fmt(r.cajaCRC)} caja chica + ${fmt(r.fixedCRC)} fijos en ₡)` : ''}
        </p>
      ))}
      <p className="tnum mt-1">
        El resto, <span className="font-medium text-ink">{fmtAmount(Math.round(keepUSD * 100) / 100, 'USD')}</span>, se queda en dólares como ahorro.
      </p>
    </div>
  )
}

function PersonFigure({ row, label, porQuincena, meta, quincenal, children }) {
  const negative = row.libre < 0
  return (
    <Card>
      <h2 className="text-body text-ink-2">{negative ? `${label.falta} este mes` : `${label.queda} este mes`}</h2>
      <BigNumber amount={Math.abs(row.libre)} tone={negative ? 'bad' : 'ink'} className="mt-1 leading-[1.05]" />
      <p className="tnum mt-2 text-small text-ink-2">
        {negative ? 'Pasa. Ajustemos: revisá los fijos o el ahorro de este mes.' : quincenal ? `≈ ${fmt(porQuincena)} por quincena` : null}
        {meta ? `${negative || quincenal ? ' · ' : ''}${meta}` : ''}
      </p>
      {children}
    </Card>
  )
}

const TONE = { ok: 'accent', near: 'warn', over: 'bad' }

/** Individual: la caja chica en colones (el límite de gasto del mes) y lo que queda de ella. */
function CajaChica({ budget, month, personId, meta }) {
  const over = budget.remaining < 0
  return (
    <Card>
      <h2 className="text-body text-ink-2">{over ? 'Te pasaste de la caja chica' : 'Caja chica: te queda para gastar'}</h2>
      <BigNumber amount={Math.abs(budget.remaining)} tone={over ? 'bad' : 'ink'} className="mt-1 leading-[1.05]" />
      <div className="mt-4">
        <ProgressBar value={budget.spent} max={budget.limit} tone={TONE[budget.level]} label="Gastado de la caja chica" />
        <p className={`tnum mt-2 text-small ${budget.level === 'ok' ? 'text-ink-2' : budget.level === 'near' ? 'text-warn' : 'text-bad'}`}>
          Gastaste {fmt(budget.spent)} de {fmt(budget.limit)}{budget.level === 'near' ? ' · ojo, ya vas por el 80%' : ''}
        </p>
        <p className="mt-1 text-small text-ink-2">
          {budget.custom ? 'Tu límite del mes' : 'Sugerido: 35% de tu ingreso'} ·{' '}
          <Link to="/ajustes" className="text-accent underline underline-offset-[3px]">cambiar</Link>
          {meta ? ` · ${meta}` : ''}
        </p>
      </div>
      {month?.status !== 'closed' && <TransferNote month={month} personId={personId} cajaChica={budget.limit} />}
    </Card>
  )
}

export default function TeQuedaCard({ plan, profile, month, today, budget }) {
  const pareja = isPareja(profile) && plan.perPerson.length === 2
  const updated = fmtRelative(month?.updatedAt, today) || 'hoy'
  const meta = [plan.isPartial && plan.since ? `desde el ${fmtDateLong(plan.since)}` : null, `actualizado ${updated}`]
    .filter(Boolean)
    .join(' · ')

  if (!pareja) {
    const row = plan.perPerson[0] || { libre: 0, porQuincena: 0 }
    if (budget) return <CajaChica budget={budget} month={month} personId={row.personId} meta={meta} />
    return <PersonFigure row={row} porQuincena={row.porQuincena} meta={meta} quincenal={month?.frequency === 'quincenal'} label={{ queda: 'Te queda', falta: 'Te falta' }} />
  }

  const people = plan.perPerson.map((r) => {
    const p = (profile.people || []).find((x) => x.id === r.personId) || {}
    return { id: r.personId, name: p.name || personName(profile, r.personId), incomeCRC: month?.incomes?.[r.personId]?.salaryCRC ?? p.incomeCRC }
  })
  const explained = explainSplit({
    rule: month?.splitRule || profile?.splitRule || 'igual_sobrante',
    people,
    result: splitResultOf(plan),
    frequency: month?.frequency || profile?.frequency,
  })

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {plan.perPerson.map((row, i) => (
          <PersonFigure
            key={row.personId}
            row={row}
            porQuincena={row.porQuincena}
            quincenal={month?.frequency === 'quincenal'}
            meta={i === 0 ? meta : null}
            label={{ queda: `A ${people[i].name} le queda`, falta: `A ${people[i].name} le falta` }}
          />
        ))}
      </div>
      <details className="group px-1 text-small text-ink-2">
        <summary className="tnum cursor-pointer list-none">
          {explained.sentences.join('. ')}.
          <span className="ml-1 text-accent underline underline-offset-[3px]">Ver la cuenta</span>
        </summary>
        <pre className="tnum mt-2 whitespace-pre-wrap rounded-xl bg-surface-2 p-3 font-sans text-small text-ink-2">
          {[...explained.notes, explained.equation].filter(Boolean).join('\n')}
        </pre>
      </details>
    </div>
  )
}
