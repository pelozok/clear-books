// Primer año de una reserva anual: usa firstYearSuggestion de la lib y traduce la
// decisión a { firstYear, startsFrom } para guardar en annual/{id}.
import { firstYearSuggestion } from '../../lib/reserve.js'
import { shiftMonth } from '../../lib/periods.js'

export const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
]

// Próximo mes de pago (este año si todavía no pasó, si no el siguiente).
const nextPayKey = (month, mKey) => {
  const y = Number(mKey.slice(0, 4))
  const m = Number(mKey.slice(5, 7))
  const year = Number(month) >= m ? y : y + 1
  return `${year}-${String(month).padStart(2, '0')}`
}

// Si este año se cubre aparte, la reserva arranca después del pago (enero si paga en nov/dic).
export const coveredStart = (month, mKey) => {
  const pay = nextPayKey(month, mKey)
  return Number(month) >= 11 ? `${Number(pay.slice(0, 4)) + 1}-01` : shiftMonth(pay, 1)
}

export const suggestPlan = (item, mKey, baseSavingsMonthly) =>
  firstYearSuggestion(item, mKey, baseSavingsMonthly)

export const planFields = (plan, item, mKey) =>
  plan === 'reservar'
    ? { firstYear: 'reservar', startsFrom: mKey }
    : { firstYear: 'cubierto-aparte', startsFrom: coveredStart(item.month, mKey) }

export const planOptions = (item, mKey) => {
  const start = coveredStart(item.month, mKey)
  const startName = `${MONTH_NAMES[Number(start.slice(5, 7)) - 1]} de ${start.slice(0, 4)}`
  return [
    { value: 'cubierto-aparte', label: 'Este año aparte', hint: `Este año sale del aguinaldo o de otro lado; reservamos desde ${startName}.` },
    { value: 'reservar', label: 'Reservar ya', hint: 'Empezamos a apartar desde este mes; la cuota mensual sale más alta.' },
  ]
}
