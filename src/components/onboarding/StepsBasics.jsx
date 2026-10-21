import { useState } from 'react'
import { CalendarDays, CalendarRange, User, Users } from 'lucide-react'
import { AmountInput, Chip, Field, Input, Segmented } from '../ui/index.js'
import Choice from './Choice.jsx'
import NetSalarySheet from './NetSalarySheet.jsx'
import { newPerson, SUGGESTED_SAVINGS } from './defaults.js'

const perLabel = (frequency) => (frequency === 'quincenal' ? 'por quincena' : 'por mes')

export function StepMode({ s, set }) {
  const pick = (mode) => {
    const people = mode === 'pareja'
      ? [s.people[0] || newPerson(0), s.people[1] || newPerson(1)]
      : [s.people[0] || newPerson(0)]
    set({ mode, people })
  }
  return (
    <div role="radiogroup" aria-label="Modo" className="space-y-3">
      <Choice icon={User} selected={s.mode === 'solo'} onClick={() => pick('solo')} title="Solo yo" body="Un salario, tu plan del mes." />
      <Choice icon={Users} selected={s.mode === 'pareja'} onClick={() => pick('pareja')} title="Somos dos" body="Dos salarios, un hogar. Les mostramos cuánto pone cada uno." />
    </div>
  )
}

export function StepFrequency({ s, set }) {
  return (
    <div role="radiogroup" aria-label="Frecuencia de pago" className="space-y-3">
      <Choice icon={CalendarRange} selected={s.frequency === 'quincenal'} onClick={() => set({ frequency: 'quincenal' })} title="Cada quincena" body="Te pagan el 15 y el 30. Confirmás fijos y ahorro por quincena." />
      <Choice icon={CalendarDays} selected={s.frequency === 'mensual'} onClick={() => set({ frequency: 'mensual' })} title="Una vez al mes" body="Un solo pago a fin de mes." />
    </div>
  )
}

export function StepPeople({ s, setPerson }) {
  const [calcFor, setCalcFor] = useState(null)
  return (
    <div className="space-y-6">
      {s.people.map((p, i) => (
        <div key={p.id} className="space-y-4">
          <Field label={s.mode === 'pareja' ? `Nombre de la persona ${i + 1}` : 'Tu nombre'}>
            <Input value={p.name} autoComplete="given-name" onChange={(e) => setPerson(i, { name: e.target.value })} />
          </Field>
          <Field label={`Ingreso neto ${perLabel(s.frequency)}`} hint="Lo que te cae en la cuenta, ya con rebajos.">
            <AmountInput
              value={p.income}
              currency={p.incomeCurrency}
              onChange={({ amount, currency }) => setPerson(i, { income: amount, incomeCurrency: currency })}
            />
          </Field>
          <button type="button" className="text-small font-medium text-accent underline" onClick={() => setCalcFor(i)}>
            ¿No sabés tu neto? Calculalo
          </button>
        </div>
      ))}
      <NetSalarySheet
        open={calcFor != null}
        onClose={() => setCalcFor(null)}
        frequency={s.frequency}
        onUse={(neto) => setPerson(calcFor, { income: neto, incomeCurrency: 'CRC' })}
      />
    </div>
  )
}

export function StepSavings({ s, set, setPerson, next }) {
  const quincenal = s.frequency === 'quincenal'
  // Saltar: sin meta de ahorro por ahora; se configura después en Ajustes → Perfil.
  const skip = () => {
    set({ people: s.people.map((p) => ({ ...p, savings: 0, payroll: false })) })
    next()
  }
  return (
    <div className="space-y-8">
      {s.people.map((p, i) => (
        <div key={p.id} className="space-y-4">
          <Field
            label={`${s.mode === 'pareja' ? `Ahorro de ${p.name || `persona ${i + 1}`}` : 'Tu ahorro'} ${perLabel(s.frequency)}`}
            hint={`Es una meta: ${quincenal ? 'cada quincena' : 'cada mes'} confirmás cuánto apartaste de verdad.`}
          >
            <AmountInput
              value={p.savings}
              currency={p.savingsCurrency || 'CRC'}
              onChange={({ amount, currency }) => {
                // La sugerencia está en ₡: al pasar a $ no se convierte en $50.000.
                const switched = currency !== (p.savingsCurrency || 'CRC') && Number(amount) === SUGGESTED_SAVINGS
                setPerson(i, { savings: switched ? null : amount, savingsCurrency: currency })
              }}
            />
          </Field>
          <div className="space-y-3">
            <Chip selected={p.payroll} onClick={() => setPerson(i, { payroll: !p.payroll })}>
              Tengo ahorro de planilla
            </Chip>
            {p.payroll && (
              <>
                <Field label="¿Dónde?">
                  <Segmented
                    options={[{ value: 'Solidarista', label: 'Solidarista' }, { value: 'Cooperativa', label: 'Cooperativa' }]}
                    value={p.payrollLabel}
                    onChange={(v) => setPerson(i, { payrollLabel: v })}
                  />
                </Field>
                <Field label={`Monto que te rebajan ${perLabel(s.frequency)}`} hint="Ya viene rebajado del neto; lo sumamos a lo ahorrado.">
                  <AmountInput
                    value={p.payrollAmount}
                    currency={p.payrollCurrency}
                    onChange={({ amount, currency }) => setPerson(i, { payrollAmount: amount, payrollCurrency: currency })}
                  />
                </Field>
              </>
            )}
          </div>
        </div>
      ))}
      <div className="space-y-1.5 border-t border-line pt-5">
        <button type="button" className="text-small font-medium text-accent underline" onClick={skip}>
          Saltar por ahora
        </button>
        <p className="text-small text-muted">
          Lo configurás después en Ajustes → Perfil, con más opciones: ahorro que se queda solo en una cuenta y límite de gasto.
        </p>
      </div>
    </div>
  )
}
