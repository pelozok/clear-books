import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CalendarClock, Lock, RefreshCw } from 'lucide-react'
import { BigNumber, Button, Card, EmptyState, PageHeader, useToast } from '../components/ui/index.js'
import MonthSkeleton from '../components/layout/MonthSkeleton.jsx'
import { DeficitStep, FixedStep, LeftoverStep, SavingsStep, StepTitle } from '../components/close/CloseSteps.jsx'
import { CloseSummary } from '../components/close/CloseSummary.jsx'
import { errorText, isPareja, useLastPlace } from '../components/month/shared.js'
import { useHousehold } from '../data/HouseholdContext.jsx'
import { useEntries, useMonth, useSavingsPlaces } from '../data/hooks/index.js'
import { closeMonth } from '../data/actions/index.js'
import { applyClose, closeChecklist, resolveDeficit } from '../lib/close.js'
import { monthTotals } from '../lib/plan.js'
import { fmt } from '../lib/format.js'
import { monthKey as monthKeyOf, monthLabel, todayISO } from '../lib/periods.js'

const mesOf = (key) => monthLabel(key).split(' ')[0].toLowerCase()

/** Cierre del mes: fijos sin marcar, ahorro sin tocar, déficit, saldo real y resumen. */
export default function ClosePage() {
  const { key } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const today = todayISO()
  const { hid, me, profile } = useHousehold()
  const monthQ = useMonth(hid, key)
  const entriesQ = useEntries(hid, key)
  const placesQ = useSavingsPlaces(hid)
  const places = placesQ.data || []
  const [lastPlace, rememberPlace] = useLastPlace(places)

  const [fixed, setFixed] = useState({})
  const [choice, setChoice] = useState(null)
  const [reported, setReported] = useState(null)
  const [destination, setDestination] = useState('libre')
  const [placePick, setPlacePick] = useState(null)
  const [seen, setSeen] = useState(false)
  const [stepKey, setStepKey] = useState(null)
  const [closing, setClosing] = useState(false)

  const month = monthQ.data
  const entries = entriesQ.data
  const placeId = placePick ?? lastPlace
  const pareja = isPareja(profile)

  const calc = useMemo(() => {
    if (!month || !entries || month.status === 'closed') return null
    const totals = monthTotals(month, undefined, entries)
    const checklist = closeChecklist(month, totals)
    const base = applyClose({ month, decisions: { fixed }, today, placeId, totals })
    const planned = base.month.closing.leftoverPlanned ?? 0
    const deficit = Math.max(0, -planned)
    const less = deficit > 0 ? resolveDeficit(base.month, 'less_savings', deficit, { placeId, today }) : null
    const lessCovers = less ? deficit - less.remaining : 0
    const okChoice = deficit > 0 && choice && !(choice === 'less_savings' && lessCovers <= 0) ? choice : null
    const seenBy = [me?.email, seen ? profile?.partnerEmail : null].filter(Boolean)
    const decisions = {
      fixed,
      deficitResolution: okChoice ? { choice: okChoice, amount: okChoice === 'less_savings' ? lessCovers : deficit } : null,
      leftoverReported: reported,
      destination,
      seenBy,
    }
    const result = applyClose({ month, decisions, today, placeId: placeId || null, totals })
    return { checklist, planned, deficit, lessCovers, okChoice, result }
  }, [month, entries, fixed, choice, reported, destination, seen, placeId, today, me, profile])

  const header = <PageHeader title={`Cerrar ${mesOf(key)}`} back={`/mes/${key}`} />
  const blocked = (icon, title, body, label = 'Volver al mes') => (
    <>
      {header}
      <EmptyState icon={icon} title={title} body={body} action={<Button as={Link} to={`/mes/${key}`} variant="secondary">{label}</Button>} className="pt-16" />
    </>
  )

  if (monthQ.error || entriesQ.error) {
    return (
      <>
        {header}
        <EmptyState
          icon={RefreshCw}
          title="No pudimos cargar el mes"
          body={(monthQ.error || entriesQ.error).message}
          action={<Button variant="secondary" icon={RefreshCw} onClick={() => window.location.reload()}>Reintentar</Button>}
          className="pt-16"
        />
      </>
    )
  }
  if (monthQ.tooFar || monthQ.beforeStart || key > monthKeyOf(today)) {
    return blocked(CalendarClock, 'Todavía no se puede cerrar', 'Un mes se cierra cuando ya empezó.')
  }
  if (monthQ.loading || entriesQ.loading || !month) return <MonthSkeleton />
  if (month.status === 'closed') return blocked(Lock, `${monthLabel(key)} ya está cerrado`, 'Lo podés ver en el mes o en el historial.', 'Ver el mes')
  if (!calc) return <MonthSkeleton />

  const { checklist, planned, deficit, lessCovers, okChoice, result } = calc
  const steps = [
    checklist.pendingFixed.length ? 'fixed' : null,
    checklist.untouchedSavings.length ? 'savings' : null,
    deficit > 0 ? 'deficit' : null,
    'leftover',
    'summary',
  ].filter(Boolean)
  const idx = Math.max(0, steps.indexOf(stepKey))
  const step = steps[idx]
  const go = (d) => setStepKey(steps[Math.min(steps.length - 1, Math.max(0, idx + d))])
  const needsPlace = (okChoice === 'cover' || (destination === 'ahorro' && result.leftover > 0)) && !placeId
  const canNext = step === 'deficit' ? !!okChoice && !needsPlace : step === 'leftover' ? !needsPlace : true

  const close = async () => {
    setClosing(true)
    try {
      if (placeId) rememberPlace(placeId)
      await closeMonth(hid, me, month, result, { placeId: placeId || null })
      toast.success(`Cerraste ${mesOf(key)}. ${pareja ? 'Terminaron' : 'Terminaste'} con ${fmt(result.leftover)}`)
      navigate(`/mes/${key}`, { replace: true })
    } catch (e) {
      toast.error(errorText(e))
      setClosing(false)
    }
  }

  return (
    <>
      {header}
      <p className="tnum mb-3 text-small text-ink-2">
        Paso {idx + 1} de {steps.length}
      </p>
      <Card>
        {step === 'fixed' && <FixedStep items={checklist.pendingFixed} decisions={fixed} onChange={setFixed} />}
        {step === 'savings' && (
          <SavingsStep rows={checklist.untouchedSavings} profile={profile} frequency={month.frequency || profile?.frequency} />
        )}
        {step === 'deficit' && (
          <DeficitStep
            deficit={deficit}
            choice={okChoice}
            onChoice={setChoice}
            lessCovers={lessCovers}
            places={places}
            placeId={placeId}
            onPlace={setPlacePick}
          />
        )}
        {step === 'leftover' && (
          <LeftoverStep
            planned={result.month.closing.leftoverPlanned ?? planned}
            reported={reported}
            onReported={setReported}
            destination={destination}
            onDestination={setDestination}
            leftover={result.leftover}
            places={places}
            placeId={placeId}
            onPlace={setPlacePick}
            pareja={pareja}
          />
        )}
        {step === 'summary' && (
          <>
            <StepTitle title={pareja ? 'Terminaron con' : 'Terminaste con'} />
            <BigNumber amount={result.leftover} tone={result.leftover < 0 ? 'bad' : 'ink'} className="-mt-2 leading-[1.05]" />
            <CloseSummary result={result} pareja={pareja} seen={seen} onSeen={setSeen} />
          </>
        )}
      </Card>
      <div className="mt-4 flex gap-2">
        {idx > 0 && (
          <Button variant="secondary" size="lg" onClick={() => go(-1)} disabled={closing}>
            Atrás
          </Button>
        )}
        {step === 'summary' ? (
          <Button size="lg" full loading={closing} onClick={close}>
            Cerrar {mesOf(key)}
          </Button>
        ) : (
          <Button size="lg" full disabled={!canNext} onClick={() => go(1)}>
            Continuar
          </Button>
        )}
      </div>
    </>
  )
}
