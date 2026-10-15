// Datos derivados del ahorro para Ahorro, Historial y Herramientas.
// Solo junta hooks y llama a la lib (savings.js, plan.js); no hace matemática propia.
import { useMemo } from 'react'
import { useHousehold } from '../../data/HouseholdContext.jsx'
import { useAnnual, useLedger, useMonth, useMonthsIndex, useSavingsPlaces } from '../../data/hooks/index.js'
import { monthKey, todayISO } from '../../lib/periods.js'
import { DEFAULT_RATE } from '../../lib/exchange.js'
import { monthTotals } from '../../lib/plan.js'
import { monthsCovered, nextMilestone, payrollSavingsCRC, savingsTotals } from '../../lib/savings.js'

const mean = (list) => (list.length ? list.reduce((s, x) => s + x, 0) / list.length : 0)

export function useSavingsOverview() {
  const { hid, me, profile } = useHousehold()
  const month = useMonth(hid, monthKey(todayISO()))
  const places = useSavingsPlaces(hid)
  const ledger = useLedger(hid)
  const annual = useAnnual(hid)
  const months = useMonthsIndex(hid)

  const rateObj = month.data?.exchangeRate || DEFAULT_RATE
  const rate = Number(rateObj.venta) || DEFAULT_RATE.venta

  const derived = useMemo(() => {
    const placeList = places.data || []
    const ledgerList = ledger.data || []
    const annualList = (annual.data || []).filter((a) => a.active !== false)
    const closed = (months.data || []).filter((m) => m.status === 'closed')
    const full = closed.filter((m) => !m.partial)
    const avgFixed = mean(full.map((m) => monthTotals(m).fixedPlanned))
    const totals = savingsTotals({ places: placeList, ledger: ledgerList, annual: annualList, rate })
    const payroll = payrollSavingsCRC(profile, closed.length, rate)
    return {
      places: placeList.filter((p) => p.active !== false),
      ledger: ledgerList,
      annual: annualList,
      closed,
      avgFixed,
      totals,
      payroll,
      covered: avgFixed > 0 ? monthsCovered(totals.totalCRC, avgFixed) : null,
      milestone: avgFixed > 0 ? nextMilestone(totals.totalCRC, avgFixed) : null,
    }
  }, [places.data, ledger.data, annual.data, months.data, profile, rate])

  const loading = places.loading || ledger.loading || annual.loading || months.loading
  const error = places.error || ledger.error || annual.error || months.error || null
  return { hid, me, profile, rate, rateObj, loading, error, ...derived }
}

// "1,5" con coma decimal (es-CR).
export const fmtDec = (n) => String(n).replace('.', ',')
