// Datos fijos y estado inicial del wizard de bienvenida.
import { todayISO } from '../../lib/periods.js'

export const STORAGE_KEY = 'cb-onboarding-v4'

// Las 9 sugerencias del machote (sin "Tarjeta": las deudas se agregan aparte).
export const FIXED_SUGGESTIONS = [
  { key: 'alquiler', name: 'Alquiler', currency: 'CRC' },
  { key: 'internet', name: 'Internet', currency: 'CRC' },
  { key: 'electricidad', name: 'Electricidad', currency: 'CRC' },
  { key: 'agua', name: 'Agua', currency: 'CRC' },
  { key: 'auto', name: 'Auto', currency: 'CRC' },
  { key: 'gasolina', name: 'Gasolina', currency: 'CRC' },
  { key: 'celulares', name: 'Celulares', currency: 'CRC' },
  { key: 'mercado', name: 'Mercado', currency: 'CRC' },
  { key: 'streaming', name: 'Streaming', currency: 'USD' },
]

export const PLACE_KINDS = [
  { value: 'cuenta', label: 'Cuenta de ahorro' },
  { value: 'cdp', label: 'CDP o inversión' },
  { value: 'cooperativa', label: 'Cooperativa o solidarista' },
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'otro', label: 'Otro' },
]

export const HALF_OPTIONS = [
  { value: 1, label: '1ra' },
  { value: 2, label: '2da' },
  { value: 'ambas', label: 'Ambas' },
]

export const ANNUAL_SUGGESTIONS = [
  { key: 'marchamo', name: 'Marchamo', month: 11 },
  { key: 'navidad', name: 'Navidad', month: 12 },
]

// Meta de ahorro sugerida (en ₡) con la que arranca el paso de ahorro.
export const SUGGESTED_SAVINGS = 50000

export const newPerson = (i) => ({
  id: `p${i + 1}`, name: '', income: null, incomeCurrency: 'CRC', savings: SUGGESTED_SAVINGS, savingsCurrency: 'CRC',
  payroll: false, payrollLabel: 'Solidarista', payrollAmount: null, payrollCurrency: 'CRC',
})

let seq = 0
export const tmpId = (p) => `${p}${Date.now().toString(36)}${(seq++).toString(36)}`

export const initialState = () => ({
  step: 0,
  mode: 'solo',
  frequency: 'quincenal',
  people: [newPerson(0)],
  fixed: [],
  places: [{ id: tmpId('pl'), name: 'Cuenta de ahorro', kind: 'cuenta', amount: null, currency: 'CRC' }],
  annual: ANNUAL_SUGGESTIONS.map((a) => ({ ...a, on: false, amount: null, currency: 'CRC', plan: null })),
  cleanStart: true,
  paidFixed: [],
  savedAlready: false,
  today: todayISO(),
})

export function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return { ...initialState(), ...JSON.parse(raw), today: todayISO() }
  } catch {
    /* sin sessionStorage: arrancamos de cero */
  }
  return initialState()
}

export function saveState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignorar */
  }
}

export function clearState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignorar */
  }
}
