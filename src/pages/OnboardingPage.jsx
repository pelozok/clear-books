import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useHousehold } from '../data/HouseholdContext.jsx'
import { Button, ProgressBar, Skeleton, useToast } from '../components/ui/index.js'
import { monthKey, todayISO } from '../lib/periods.js'
import { loadState, saveState, clearState } from '../components/onboarding/defaults.js'
import { StepMode, StepFrequency, StepPeople, StepSavings } from '../components/onboarding/StepsBasics.jsx'
import StepFixed from '../components/onboarding/StepFixed.jsx'
import StepPlaces from '../components/onboarding/StepPlaces.jsx'
import StepAlready from '../components/onboarding/StepAlready.jsx'
import { finishOnboarding, isLateHalf } from '../components/onboarding/buildPayload.js'

const filled = (v) => Number(v) > 0

const STEPS = [
  { title: '¿Quiénes llevan las cuentas?', body: 'Podés cambiarlo después en Ajustes.', Comp: StepMode },
  { title: '¿Cada cuánto te pagan?', body: 'Así armamos el mes por quincenas o completo.', Comp: StepFrequency },
  {
    title: 'Ingresos netos',
    body: 'Lo que entra a la cuenta. Con esto calculamos cuánto te queda.',
    Comp: StepPeople,
    ok: (s) => s.people.every((p) => p.name.trim() && filled(p.income)),
  },
  { title: 'Ahorro', body: 'Cuánto querés apartar cada vez que te pagan.', Comp: StepSavings },
  {
    title: 'Gastos fijos',
    body: 'Tocá los que tenés y poné cuánto pagás al mes.',
    Comp: StepFixed,
    ok: (s) => s.fixed.every((f) => f.name.trim() && filled(f.amount)),
  },
  { title: 'Dónde guardás el ahorro', body: 'De 1 a 3 lugares, con el saldo que tienen hoy.', Comp: StepPlaces },
  { title: '¿Qué ya pasó este mes?', body: null, Comp: StepAlready },
]

export default function OnboardingPage() {
  const { hid, me, profile, loading } = useHousehold()
  const navigate = useNavigate()
  const toast = useToast()
  const [s, setS] = useState(loadState)
  const [saving, setSaving] = useState(false)

  useEffect(() => saveState(s), [s])

  if (loading) {
    return (
      <div className="mx-auto max-w-xl space-y-4 px-gutter pt-8">
        <Skeleton className="h-1.5 w-full" />
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }
  if (profile?.onboardingComplete && !saving) return <Navigate to={`/mes/${monthKey(todayISO())}`} replace />

  const set = (patch) => setS((prev) => ({ ...prev, ...patch }))
  const setPerson = (i, patch) =>
    setS((prev) => ({ ...prev, people: prev.people.map((p, j) => (j === i ? { ...p, ...patch } : p)) }))

  const step = Math.min(s.step, STEPS.length - 1)
  const { title, body, Comp, ok } = STEPS[step]
  const last = step === STEPS.length - 1
  const canNext = !ok || ok(s)
  const go = (d) => {
    set({ step: step + d })
    window.scrollTo({ top: 0 })
  }
  const stepBody =
    last && isLateHalf(s)
      ? 'Ya pasó la 1ra quincena. Elegí cómo arrancamos.'
      : last
        ? 'Marcá lo que ya salió de la cuenta, así el plan arranca al día.'
        : body

  const finish = async () => {
    if (!hid || !me) {
      toast.error('No hay sesión activa. Volvé a entrar con Google.')
      return
    }
    setSaving(true)
    try {
      const key = await finishOnboarding(hid, me, s)
      clearState()
      navigate(`/mes/${key}`, { replace: true })
    } catch (e) {
      setSaving(false)
      toast.error(`No pudimos guardar: ${e.message || e}`)
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-gutter">
      <header className="pt-6">
        <div className="flex items-center justify-between text-small text-muted">
          <span>Clear Books</span>
          <span className="tnum">Paso {step + 1} de {STEPS.length}</span>
        </div>
        <ProgressBar value={step + 1} max={STEPS.length} className="mt-3" />
        <h1 className="mt-8 text-title text-ink">{title}</h1>
        {stepBody && <p className="mt-1.5 text-body text-ink-2">{stepBody}</p>}
      </header>

      <main className="flex-1 py-6">
        <Comp s={s} set={set} setPerson={setPerson} />
      </main>

      <footer className="sticky bottom-0 -mx-gutter flex gap-3 border-t border-line bg-bg px-gutter pb-[calc(12px+env(safe-area-inset-bottom))] pt-3">
        {step > 0 && (
          <Button variant="secondary" icon={ArrowLeft} onClick={() => go(-1)} disabled={saving}>
            Atrás
          </Button>
        )}
        {last ? (
          <Button full loading={saving} onClick={finish}>
            Listo, ver mi mes
          </Button>
        ) : (
          <Button full disabled={!canNext} onClick={() => go(1)}>
            Siguiente
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Button>
        )}
      </footer>
    </div>
  )
}
