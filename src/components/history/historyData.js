// Arma las filas del historial con la lib (savings.js, format.js). Sin matemática nueva:
// solo agrupa lo que la lib ya calcula por mes cerrado.
import { monthSavingsSummary, savingsTotals } from '../../lib/savings.js'
import { toCRC } from '../../lib/format.js'
import { lastDayOfMonth } from '../../lib/periods.js'

const pad = (n) => String(n).padStart(2, '0')
const endOf = (key) => `${key}-${pad(lastDayOfMonth(key))}`

const RESULT = {
  cover: { tone: 'bad', text: 'En rojo, cubierto del ahorro' },
  carry: { tone: 'bad', text: 'En rojo, pasa al mes siguiente' },
  less_savings: { tone: 'warn', text: 'En rojo, se apartó menos' },
}

export function resultOf(closing) {
  const r = RESULT[closing?.deficitResolution]
  if (r) return r
  const left = closing?.leftoverReported ?? closing?.leftoverPlanned ?? 0
  return left >= 0 ? { tone: 'good', text: 'En positivo' } : { tone: 'bad', text: 'En rojo' }
}

/** Una fila por mes cerrado (más reciente primero). */
export function monthRows(closed, ledger, rate) {
  return closed.map((m) => {
    const sav = monthSavingsSummary(m)
    const outs = ledger.filter((e) => e.type === 'retiro' && (e.monthKey || String(e.date).slice(0, 7)) === m.id)
    const reasons = [...new Set(outs.map((e) => e.label).filter(Boolean))]
    return {
      key: m.id,
      partial: !!m.partial,
      leftover: m.closing?.leftoverReported ?? m.closing?.leftoverPlanned ?? 0,
      spent: m.closing?.spent ?? null,
      saved: sav.actual,
      planned: sav.planned,
      withdrawn: outs.reduce((s, e) => s + toCRC(e.amount, e.currency, rate), 0),
      reasons,
      result: resultOf(m.closing),
    }
  })
}

/** Acumulado real al cierre de cada mes (ascendente) más el punto de hoy. */
export function accumulatedSeries(closed, places, ledger, rate, todayTotal) {
  const points = [...closed]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((m) => {
      const end = endOf(m.id)
      const upTo = ledger.filter((e) => String(e.date) <= end)
      return { key: m.id, value: savingsTotals({ places, ledger: upTo, rate }).totalCRC }
    })
  return [...points, { key: 'hoy', value: todayTotal }]
}
