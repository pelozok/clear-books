import { BigNumber, Card } from '../ui/index.js'
import { fmt, fmtDateLong, fmtRelative } from '../../lib/format.js'
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

function PersonFigure({ row, label, porQuincena, meta }) {
  const negative = row.libre < 0
  return (
    <Card>
      <h2 className="text-body text-ink-2">{negative ? `${label.falta} este mes` : `${label.queda} este mes`}</h2>
      <BigNumber amount={Math.abs(row.libre)} tone={negative ? 'bad' : 'ink'} className="mt-1 leading-[1.05]" />
      <p className="tnum mt-2 text-small text-ink-2">
        {negative ? 'Pasa. Ajustemos: revisá los fijos o el ahorro de este mes.' : `≈ ${fmt(porQuincena)} por quincena`}
        {meta ? ` · ${meta}` : ''}
      </p>
    </Card>
  )
}

/** La cifra protagonista: "Te queda ₡X este mes", por persona. Sin animación. */
export default function TeQuedaCard({ plan, profile, month, today }) {
  const pareja = isPareja(profile) && plan.perPerson.length === 2
  const updated = fmtRelative(month?.updatedAt, today) || 'hoy'
  const meta = [plan.isPartial && plan.since ? `desde el ${fmtDateLong(plan.since)}` : null, `actualizado ${updated}`]
    .filter(Boolean)
    .join(' · ')

  if (!pareja) {
    const row = plan.perPerson[0] || { libre: 0, porQuincena: 0 }
    return <PersonFigure row={row} porQuincena={row.porQuincena} meta={meta} label={{ queda: 'Te queda', falta: 'Te falta' }} />
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
