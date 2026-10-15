// Junta lo que necesita el plan del mes y llama a la lib (no calcula acá).
import { useMemo } from 'react'
import { useHousehold } from '../../data/HouseholdContext.jsx'
import { useAnnual, useEntries, useLedger, useMonth, useMonthsIndex, useSavingsPlaces } from '../../data/hooks/index.js'
import { monthTotals, teQueda } from '../../lib/plan.js'
import { spendBudget } from '../../lib/budget.js'
import { monthSavingsSummary } from '../../lib/savings.js'
import { todayISO } from '../../lib/periods.js'

export function useMonthPlan(key) {
  const { hid, me, profile } = useHousehold()
  const month = useMonth(hid, key)
  const entries = useEntries(hid, key)
  const places = useSavingsPlaces(hid)
  const ledger = useLedger(hid)
  const annual = useAnnual(hid)
  const index = useMonthsIndex(hid)
  const today = todayISO()

  const doc = month.data
  const list = useMemo(() => entries.data || [], [entries.data])
  const derived = useMemo(() => {
    if (!doc) return null
    const plan = teQueda({ month: doc, profile, entries: list, today })
    const totals = monthTotals(doc, undefined, list)
    return {
      plan,
      totals,
      budget: spendBudget({ month: doc, profile, plan, totals }),
      savings: monthSavingsSummary(doc),
    }
  }, [doc, profile, list, today])

  return {
    hid,
    me,
    profile,
    today,
    month: doc,
    entries: list,
    places: places.data || [],
    ledger: ledger.data || [],
    annual: annual.data || [],
    months: index.data || [],
    loading: month.loading || entries.loading,
    error: month.error || entries.error,
    tooFar: month.tooFar,
    beforeStart: month.beforeStart,
    ...(derived || {}),
  }
}
