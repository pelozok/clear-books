import { Link, useParams } from 'react-router-dom'
import { CalendarClock, CalendarX, RefreshCw, WifiOff } from 'lucide-react'
import { Button, EmptyState } from '../components/ui/index.js'
import MonthSkeleton from '../components/layout/MonthSkeleton.jsx'
import MonthHeader from '../components/month/MonthHeader.jsx'
import TeQuedaCard from '../components/month/TeQuedaCard.jsx'
import MonthSummaryCard from '../components/month/MonthSummaryCard.jsx'
import CategoryCard from '../components/month/CategoryCard.jsx'
import SavingsSection from '../components/month/SavingsSection.jsx'
import FixedSection from '../components/month/FixedSection.jsx'
import ExtrasSection from '../components/month/ExtrasSection.jsx'
import ReserveSection from '../components/month/ReserveSection.jsx'
import EntriesSection from '../components/month/EntriesSection.jsx'
import { AddEntryFab, CloseBanner, ClosedSummary } from '../components/month/MonthExtras.jsx'
import { useMonthPlan } from '../components/month/useMonthPlan.js'
import { halfOf, monthKey as monthKeyOf, monthLabel, shiftMonth } from '../lib/periods.js'

const VALID_KEY = /^\d{4}-(0[1-9]|1[0-2])$/

function Blocked({ monthKey, icon, title, body }) {
  return (
    <>
      <MonthHeader monthKey={monthKey} readOnly />
      <EmptyState
        icon={icon}
        title={title}
        body={body}
        action={
          <Button as={Link} to="/" variant="secondary">
            Ir al mes actual
          </Button>
        }
        className="pt-16"
      />
    </>
  )
}

/** Plan del mes: "Te queda", ahorro, fijos, extras, reserva y gastos. */
export default function MonthPage() {
  const { key } = useParams()
  const valid = VALID_KEY.test(key || '')
  const d = useMonthPlan(valid ? key : null)

  if (!valid) return <Blocked monthKey={monthKeyOf(d.today)} icon={CalendarX} title="Ese mes no existe" body="Revisá el enlace o volvé al mes actual." />
  if (d.tooFar) {
    return <Blocked monthKey={key} icon={CalendarClock} title="Todavía es muy pronto" body="Podés planear hasta el mes siguiente al actual." />
  }
  if (d.beforeStart) {
    return <Blocked monthKey={key} icon={CalendarX} title="Antes de empezar" body="Empezaste a usar la app después de este mes, así que no hay plan acá." />
  }
  if (d.error) {
    return (
      <>
        <MonthHeader monthKey={key} readOnly />
        <EmptyState
          icon={WifiOff}
          title="No pudimos cargar el mes"
          body={d.error.message || String(d.error)}
          action={
            <Button variant="secondary" icon={RefreshCw} onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          }
          className="pt-16"
        />
      </>
    )
  }
  if (d.loading || !d.month || !d.plan) return <MonthSkeleton />

  const { hid, me, profile, month, today } = d
  const closed = month.status === 'closed'
  const isCurrent = key === monthKeyOf(today)
  const currentHalf = isCurrent ? halfOf(today) : key < monthKeyOf(today) ? 2 : 1
  const prevKey = shiftMonth(key, -1)
  const prevOpen = !closed && d.months.some((m) => m.id === prevKey && m.status !== 'closed')
  const canClose = !closed && key <= monthKeyOf(today)
  const common = { hid, me, month, profile, places: d.places, readOnly: closed }

  return (
    <>
      <MonthHeader monthKey={key} hid={hid} me={me} month={month} readOnly={closed} />
      {/* Móvil: una columna. Escritorio: arriba las dos cifras (caja chica, resumen);
          abajo, a la izquierda lo que se marca (fijos, ahorro) y a la derecha lo que se anota. */}
      <div className="flex flex-col gap-6 pb-16">
        {prevOpen && <CloseBanner prevKey={prevKey} />}
        <div className={`flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-stretch lg:*:h-full`}>
          {closed ? (
            <ClosedSummary month={month} profile={profile} savings={d.savings} />
          ) : (
            <TeQuedaCard plan={d.plan} profile={profile} month={month} today={today} budget={d.budget} />
          )}
          <MonthSummaryCard month={month} totals={d.totals} />
        </div>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <FixedSection {...common} totals={d.totals} entriesCount={d.entries.length} currentHalf={currentHalf} />
            <SavingsSection {...common} summary={d.savings} currentHalf={currentHalf} ledger={d.ledger} annual={d.annual} />
            <CategoryCard rows={d.categories} profile={profile} monthKey={key} />
            <ReserveSection {...common} />
            <ExtrasSection {...common} />
          </div>
          <div className="flex flex-col gap-6">
            <EntriesSection monthKey={key} profile={profile} entries={d.entries} totals={d.totals} readOnly={closed} />
            {canClose && (
              <Button as={Link} to={`/cerrar/${key}`} variant="secondary" full>
                Cerrar {monthLabel(key).split(' ')[0].toLowerCase()}
              </Button>
            )}
          </div>
        </div>
      </div>
      {!closed && <AddEntryFab monthKey={key} />}
    </>
  )
}
