// Junta lo que necesita el plan del mes y llama a la lib (no calcula acá).
import { useEffect, useMemo, useRef } from 'react'
import { autoSavingsSync, monthTemplateSync } from '../../data/pure/monthOps.js'
import { syncAutoSavings, syncMonthTemplate } from '../../data/actions/index.js'
import { deriveMonth } from '../../lib/derive.js'
import { useHousehold } from '../../data/HouseholdContext.jsx'
import { useAnnual, useEntries, useLedger, useMonth, useMonthsIndex, useRecurring, useSavingsPlaces } from '../../data/hooks/index.js'
import { monthTotals, teQueda } from '../../lib/plan.js'
import { spendBudget } from '../../lib/budget.js'
import { monthSavingsSummary } from '../../lib/savings.js'
import { monthKey, shiftMonth, todayISO } from '../../lib/periods.js'
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
  const recurring = useRecurring(hid)
  const today = todayISO()

  // El mes abierto sigue al perfil (frecuencia) y a la plantilla (fijos nuevos, como un
  // diezmo agregado después). Se muestra ya y se guarda una vez.
  const tpl = useMemo(
    () => monthTemplateSync(month.data, recurring.loading ? null : recurring.data || [], profile, monthKey(today)),
    [month.data, recurring.data, recurring.loading, profile, today],
  )
  const base = useMemo(() => (tpl ? deriveMonth({ ...month.data, ...tpl }) : month.data), [tpl, month.data])
  const tplSynced = useRef(null)
  useEffect(() => {
    if (!tpl || !month.data) return
    const sig = `${month.data.id}:${JSON.stringify(tpl)}`
    if (tplSynced.current === sig) return
    tplSynced.current = sig
    syncMonthTemplate(hid, me, month.data, tpl).catch(() => {})
  }, [tpl, month.data, hid, me])

  // Ahorro automático: el perfil manda sobre el ahorro sin confirmar del mes abierto.
  const sync = useMemo(() => autoSavingsSync(base, profile), [base, profile])
  const doc = useMemo(() => (sync ? deriveMonth({ ...base, savings: sync }) : base), [sync, base])
  // Una sola escritura por cambio (si falla, no reintenta en bucle).
  const synced = useRef(null)
  useEffect(() => {
    if (!sync || !base || tpl) return
    const sig = `${base.id}:${JSON.stringify(sync)}`
    if (synced.current === sig) return
    synced.current = sig
    syncAutoSavings(hid, me, base, sync).catch(() => {})
  }, [sync, base, tpl, hid, me])
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
