// Junta lo que necesita el plan del mes y llama a la lib (no calcula acá).
import { useEffect, useMemo, useRef } from 'react'
import { autoSavingsSync } from '../../data/pure/monthOps.js'
import { syncAutoSavings } from '../../data/actions/index.js'
import { deriveMonth } from '../../lib/derive.js'
import { useHousehold } from '../../data/HouseholdContext.jsx'
import { useAnnual, useEntries, useLedger, useMonth, useMonthsIndex, useSavingsPlaces } from '../../data/hooks/index.js'
import { monthTotals, teQueda } from '../../lib/plan.js'
import { spendBudget } from '../../lib/budget.js'
import { monthSavingsSummary } from '../../lib/savings.js'
import { shiftMonth, todayISO } from '../../lib/periods.js'
import { categoryBreakdown, totalsByCategory } from '../../lib/categories.js'

export function useMonthPlan(key) {
  const { hid, me, profile } = useHousehold()
  const month = useMonth(hid, key)
  const entries = useEntries(hid, key)
  const prevEntries = useEntries(hid, key ? shiftMonth(key, -1) : null)
  const places = useSavingsPlaces(hid)
  const ledger = useLedger(hid)
  const annual = useAnnual(hid)
  const index = useMonthsIndex(hid)
  const today = todayISO()

  // Ahorro automático: el perfil manda sobre el ahorro sin confirmar del mes abierto.
  const sync = useMemo(() => autoSavingsSync(month.data, profile), [month.data, profile])
  const doc = useMemo(() => (sync ? deriveMonth({ ...month.data, savings: sync }) : month.data), [sync, month.data])
  // Una sola escritura por cambio (si falla, no reintenta en bucle).
  const synced = useRef(null)
  useEffect(() => {
    if (!sync || !month.data) return
    const sig = `${month.data.id}:${JSON.stringify(sync)}`
    if (synced.current === sig) return
    synced.current = sig
    syncAutoSavings(hid, me, month.data, sync).catch(() => {})
  }, [sync, month.data, hid, me])
  const list = useMemo(() => entries.data || [], [entries.data])
  const derived = useMemo(() => {
    if (!doc) return null
    const plan = teQueda({ month: doc, profile, entries: list, today })
    const totals = monthTotals(doc, undefined, list)
    return {
      plan,
      totals,
      budget: spendBudget({ month: doc, profile, plan, totals }),
      categories: categoryBreakdown(list, prevEntries.data?.length ? totalsByCategory(prevEntries.data) : null),
      savings: monthSavingsSummary(doc),
    }
  }, [doc, profile, list, today, prevEntries.data])

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
