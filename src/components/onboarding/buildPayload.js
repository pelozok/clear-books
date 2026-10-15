// Arma lo que recibe createProfile a partir del estado del wizard y aplica
// "qué ya pasó este mes" (fijos pagados y ahorro apartado) sobre el mes recién creado.
import { getDoc } from 'firebase/firestore'
import { createProfile, markFixed, confirmSavings } from '../../data/actions/index.js'
import { monthRef, recurringCol, placesCol, newId } from '../../data/db.js'
import { docData } from '../../data/snap.js'
import { DEFAULT_CATEGORIES } from '../settings/categoryIcons.js'
import { planFields, suggestPlan } from './annualPlan.js'

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0)

// Ahorro base del hogar al mes (para la regla de primer año de las reservas).
export const baseSavingsMonthly = (s) =>
  s.people.reduce((t, p) => t + num(p.savings), 0) * (s.frequency === 'quincenal' ? 2 : 1)

export const effectivePlan = (a, mKey, base) => a.plan || suggestPlan(a, mKey, base)

// Quincenal y ya pasó el 15: se puede arrancar limpio en la 2da quincena.
export const isLateHalf = (s) => s.frequency === 'quincenal' && Number(s.today.slice(8, 10)) > 15

// ¿Arrancamos el 16 (parcial) o el mes completo?
export const startsClean = (s) => isLateHalf(s) && s.cleanStart

export const validFixed = (s) => s.fixed.filter((f) => f.name.trim() && num(f.amount) > 0)

export function buildPayload(s, hid) {
  const mKey = s.today.slice(0, 7)
  const startedAt = startsClean(s) ? `${mKey}-16` : `${mKey}-01`
  const base = baseSavingsMonthly(s)
  const perMonth = s.frequency === 'quincenal' ? 2 : 1
  const people = s.people.map((p, i) => ({
    id: `p${i + 1}`,
    name: p.name.trim() || `Persona ${i + 1}`,
    // El ingreso se pide por quincena (o por mes); el perfil guarda el mensual.
    incomeCRC: p.incomeCurrency === 'USD' ? 0 : num(p.income) * perMonth,
    incomeUSD: p.incomeCurrency === 'USD' ? num(p.income) * perMonth : 0,
    savingsPerPeriod: num(p.savings),
    payrollSavings: p.payroll && num(p.payrollAmount) > 0
      ? { label: p.payrollLabel, amount: num(p.payrollAmount), currency: p.payrollCurrency }
      : null,
  }))
  const recurring = validFixed(s).map((f, order) => ({
    id: newId(recurringCol(hid)),
    _tmp: f.id,
    name: f.name.trim(), amount: num(f.amount), currency: f.currency,
    half: s.frequency === 'quincenal' ? f.half : 1, isDebt: false, cuotasRestantes: null, order,
  }))
  const annual = s.annual
    .filter((a) => a.on && num(a.amount) > 0)
    .map((a) => ({
      name: a.name, amount: num(a.amount), currency: a.currency, month: a.month, lastPaidYear: null,
      ...planFields(effectivePlan(a, mKey, base), a, mKey),
    }))
  const places = s.places
    .filter((p) => p.name.trim())
    .map((p, order) => ({
      id: newId(placesCol(hid)),
      name: p.name.trim(), kind: p.kind, currency: p.currency,
      openingAmount: num(p.amount), openingAsOf: s.today, order,
    }))
  const profile = {
    schemaVersion: 3,
    mode: s.mode,
    frequency: s.frequency,
    people,
    partnerEmail: null,
    partnerOf: null,
    splitRule: 'igual_sobrante',
    categories: DEFAULT_CATEGORIES,
    onboardingComplete: true,
    startedAt,
  }
  // El saldo de hoy ya incluye el ahorro apartado: el aporte va al libro y el saldo
  // inicial queda sin él, para que el total siga cuadrando con el banco.
  const savedNow = !startsClean(s) && s.savedAlready && places[0]
  if (savedNow && places[0].currency === 'CRC') {
    const total = people.reduce((t, p) => t + p.savingsPerPeriod, 0)
    places[0].openingAmount = Math.max(0, places[0].openingAmount - total)
  }
  return { mKey, startedAt, profile, recurring, annual, places, savedNow }
}

const readMonth = async (hid, key) => docData(await getDoc(monthRef(hid, key)))

/** Crea el hogar y marca lo que ya pasó. Devuelve la clave del mes para navegar. */
export async function finishOnboarding(hid, me, s) {
  const { mKey, profile, recurring, annual, places, savedNow } = buildPayload(s, hid)
  const paidTmp = new Set(startsClean(s) ? [] : s.paidFixed)
  const paidIds = recurring.filter((r) => paidTmp.has(r._tmp)).map((r) => r.id)
  await createProfile(hid, me, {
    profile,
    recurring: recurring.map(({ _tmp, ...r }) => r),
    annual,
    places,
    today: s.today,
  })

  for (const templateId of paidIds) {
    const month = await readMonth(hid, mKey)
    const items = (month?.fixedItems || []).filter((it) => it.templateId === templateId)
    for (const it of items) {
      const fresh = await readMonth(hid, mKey)
      await markFixed(hid, me, fresh, it.id, { status: 'paid', paidAmount: it.amount, paidAt: s.today })
    }
  }

  if (savedNow) {
    for (const p of profile.people) {
      if (p.savingsPerPeriod <= 0) continue
      const month = await readMonth(hid, mKey)
      if (!month) break
      await confirmSavings(hid, me, month, { personId: p.id, half: 1, amount: p.savingsPerPeriod, placeId: places[0].id, date: s.today })
    }
  }
  return mKey
}
