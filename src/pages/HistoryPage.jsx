import { useMemo } from 'react'
import { History } from 'lucide-react'
import { EmptyState, PageHeader } from '../components/ui/index.js'
import SavingsCurve from '../components/history/SavingsCurve.jsx'
import MonthHistoryList from '../components/history/MonthHistoryList.jsx'
import ExportCard from '../components/history/ExportCard.jsx'
import CategoryHistory from '../components/history/CategoryHistory.jsx'
import { accumulatedSeries, monthRows } from '../components/history/historyData.js'
import { PageError, PageSkeleton } from '../components/savings/PageStates.jsx'
import { useSavingsOverview } from '../components/savings/useSavingsOverview.js'

const MIN_CLOSED = 2

export default function HistoryPage() {
  const s = useSavingsOverview()
  const couple = s.profile?.mode === 'pareja'
  const ready = !s.loading && !s.error && s.closed.length >= MIN_CLOSED
  const rows = useMemo(() => (ready ? monthRows(s.closed, s.ledger, s.rate) : []), [ready, s.closed, s.ledger, s.rate])
  const series = useMemo(
    () => (ready ? accumulatedSeries(s.closed, s.places, s.ledger, s.rate, s.totals.totalCRC) : []),
    [ready, s.closed, s.places, s.ledger, s.rate, s.totals.totalCRC],
  )

  return (
    <>
      <PageHeader title="Historial" settings />
      {s.error ? (
        <PageError error={s.error} />
      ) : s.loading ? (
        <PageSkeleton />
      ) : (
        <div className="flex flex-col gap-6 pb-6">
          {ready ? (
            <>
              <SavingsCurve series={series} total={s.totals.totalCRC} couple={couple} />
              <CategoryHistory closed={s.closed} profile={s.profile} />
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start">
                <MonthHistoryList rows={rows} couple={couple} />
                <ExportCard hid={s.hid} />
              </div>
            </>
          ) : (
            <EmptyState
              icon={History}
              title="El historial aparece con 2 meses cerrados"
              body={`Cerrá cada mes desde el plan (toma 2 minutos). ${
                s.closed.length === 1 ? 'Ya tenés uno; con el próximo' : 'Con dos'
              } vas a ver cómo terminó cada mes y cuánto llevás ahorrado de verdad.`}
            />
          )}
          {!ready && <ExportCard hid={s.hid} />}
        </div>
      )}
    </>
  )
}
