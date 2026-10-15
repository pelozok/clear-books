import { useState } from 'react'
import { AmountInput, Button, Card, Chip, Field, Input, Segmented, Select, useToast } from '../ui/index.js'
import { useSavingsPlaces } from '../../data/hooks/index.js'
import { saveProfile } from '../../data/actions/index.js'
import Choice from '../onboarding/Choice.jsx'
import NetSalarySheet from '../onboarding/NetSalarySheet.jsx'

const MODE = [{ value: 'solo', label: 'Solo yo' }, { value: 'pareja', label: 'Somos dos' }]
const FREQ = [{ value: 'quincenal', label: 'Quincenal' }, { value: 'mensual', label: 'Mensual' }]
const PAYROLL = [{ value: 'Solidarista', label: 'Solidarista' }, { value: 'Cooperativa', label: 'Cooperativa' }]

const blankPerson = (i) => ({ id: `p${i + 1}`, name: '', incomeCRC: 0, incomeUSD: 0, savingsPerPeriod: 50000, payrollSavings: null })

// Persona del perfil → borrador editable (un ingreso con su moneda).
// El perfil guarda el ingreso mensual; el formulario lo muestra por quincena o por mes.
const factorOf = (frequency) => (frequency === 'quincenal' ? 2 : 1)
const toDraft = (p, f = 1) => ({
  ...p,
  income: (p.incomeUSD > 0 ? p.incomeUSD / f : (p.incomeCRC || 0) / f) || null,
  incomeCurrency: p.incomeUSD > 0 ? 'USD' : 'CRC',
})
const fromDraft = ({ income, incomeCurrency, ...p }, f = 1) => ({
  ...p,
  name: (p.name || '').trim(),
  incomeCRC: incomeCurrency === 'USD' ? 0 : (Number(income) || 0) * f,
  incomeUSD: incomeCurrency === 'USD' ? (Number(income) || 0) * f : 0,
  savingsPerPeriod: Number(p.savingsPerPeriod) || 0,
  savingsCurrency: p.savingsCurrency === 'USD' ? 'USD' : 'CRC',
})

export default function ProfileSection({ hid, me, profile }) {
  const toast = useToast()
  const [d, setD] = useState(() => ({
    mode: profile?.mode || 'solo',
    frequency: profile?.frequency || 'mensual',
    splitRule: profile?.splitRule || 'igual_sobrante',
    people: (profile?.people?.length ? profile.people : [blankPerson(0)]).map((p) => toDraft(p, factorOf(profile?.frequency))),
  }))
  const places = (useSavingsPlaces(hid).data || []).filter((x) => x.active !== false)
  const [calcFor, setCalcFor] = useState(null)
  const [saving, setSaving] = useState(false)
  const per = d.frequency === 'quincenal' ? 'por quincena' : 'por mes'

  const set = (patch) => setD((x) => ({ ...x, ...patch }))
  const setPerson = (i, patch) => setD((x) => ({ ...x, people: x.people.map((p, j) => (j === i ? { ...p, ...patch } : p)) }))
  const setMode = (mode) =>
    setD((x) => ({ ...x, mode, people: mode === 'pareja' && x.people.length < 2 ? [...x.people, toDraft(blankPerson(1))] : x.people }))
  const visible = d.mode === 'pareja' ? d.people.slice(0, 2) : d.people.slice(0, 1)
  const valid = visible.every((p) => (p.name || '').trim())

  const save = async () => {
    setSaving(true)
    try {
      await saveProfile(hid, me, { mode: d.mode, frequency: d.frequency, splitRule: d.splitRule, people: visible.map((p) => fromDraft(p, factorOf(d.frequency))) })
      toast.success('Perfil guardado. Aplica desde el próximo mes.')
    } catch (e) {
      toast.error(`No se pudo guardar: ${e.message || e}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card title="Hogar">
        <div className="space-y-4">
          <Field label="Modo">
            <Segmented options={MODE} value={d.mode} onChange={setMode} />
          </Field>
          <Field label="Frecuencia de pago" hint="Cambiarla afecta a los meses nuevos, no al que está abierto.">
            <Segmented options={FREQ} value={d.frequency} onChange={(frequency) => set({ frequency })} />
          </Field>
        </div>
      </Card>

      {visible.map((p, i) => (
        <Card key={p.id} title={d.mode === 'pareja' ? p.name || `Persona ${i + 1}` : 'Vos'}>
          <div className="space-y-4">
            <Field label="Nombre">
              <Input value={p.name} onChange={(e) => setPerson(i, { name: e.target.value })} />
            </Field>
            <Field label={`Ingreso neto ${per}`}>
              <AmountInput value={p.income} currency={p.incomeCurrency} onChange={({ amount, currency }) => setPerson(i, { income: amount, incomeCurrency: currency })} />
            </Field>
            <button type="button" className="text-small font-medium text-accent underline" onClick={() => setCalcFor(i)}>
              ¿No sabés tu neto? Calculalo
            </button>
            <Field label={`Ahorro ${per}`}>
              <AmountInput value={p.savingsPerPeriod} currency={p.savingsCurrency || 'CRC'} onChange={({ amount, currency }) => setPerson(i, { savingsPerPeriod: amount, savingsCurrency: currency })} />
            </Field>
            <Field
              label="Cómo apartás el ahorro"
              hint={p.autoSavingsPlaceId ? 'Sin botón Apartar: el ahorro se queda en esa cuenta y al cerrar el mes se cuenta solo.' : 'Cada mes tocás Apartar cuando mueves la plata.'}
            >
              <Select value={p.autoSavingsPlaceId || ''} onChange={(e) => setPerson(i, { autoSavingsPlaceId: e.target.value || null })}>
                <option value="">Lo aparto yo (botón Apartar)</option>
                {places.map((pl) => (
                  <option key={pl.id} value={pl.id}>Se queda solo en {pl.name}</option>
                ))}
              </Select>
            </Field>
            <Chip
              selected={!!p.payrollSavings}
              onClick={() => setPerson(i, { payrollSavings: p.payrollSavings ? null : { label: 'Solidarista', amount: 0, currency: 'CRC' } })}
            >
              Tengo ahorro de planilla
            </Chip>
            {p.payrollSavings && (
              <>
                <Segmented options={PAYROLL} value={p.payrollSavings.label} onChange={(label) => setPerson(i, { payrollSavings: { ...p.payrollSavings, label } })} />
                <Field label={`Monto de planilla ${per}`}>
                  <AmountInput
                    value={p.payrollSavings.amount}
                    currency={p.payrollSavings.currency}
                    onChange={({ amount, currency }) => setPerson(i, { payrollSavings: { ...p.payrollSavings, amount: amount || 0, currency } })}
                  />
                </Field>
              </>
            )}
          </div>
        </Card>
      ))}

      {d.mode === 'pareja' && (
        <Card title="Cómo se reparten los gastos">
          <div role="radiogroup" aria-label="Regla de reparto" className="space-y-3">
            <Choice
              selected={d.splitRule === 'igual_sobrante'}
              onClick={() => set({ splitRule: 'igual_sobrante' })}
              title="A los dos les queda lo mismo"
              body="Cada uno pone lo necesario para que, después de gastos y ahorro, les sobre la misma plata. El ahorro va mitad y mitad."
            />
            <Choice
              selected={d.splitRule === 'proporcional'}
              onClick={() => set({ splitRule: 'proporcional' })}
              title="Mismo % del salario"
              body="Cada uno pone según lo que gana: quien gana más pone más. Gastos y ahorro van en proporción al ingreso."
            />
          </div>
        </Card>
      )}

      <div className="space-y-2">
        <Button full loading={saving} disabled={!valid} onClick={save}>
          Guardar perfil
        </Button>
        <p className="text-small text-muted">Aplica a los meses nuevos. Para el mes en curso, ajustá ingresos y ahorro desde su pantalla.</p>
      </div>

      <NetSalarySheet
        open={calcFor != null}
        onClose={() => setCalcFor(null)}
        frequency={d.frequency}
        onUse={(neto) => setPerson(calcFor, { income: neto, incomeCurrency: 'CRC' })}
      />
    </div>
  )
}
