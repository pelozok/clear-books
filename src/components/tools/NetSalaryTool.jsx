import { useState } from 'react'
import { AmountInput, Button, Field, Segmented, Select, useToast } from '../ui/index.js'
import { saveProfile } from '../../data/actions/index.js'
import { netSalary } from '../../lib/calculators/netSalary.js'
import { CCSS_2026, RENTA_2026 } from '../../lib/constantsCR.js'
import { fmt } from '../../lib/format.js'
import { DataUsed, InputsCard, Lines, NumberField, ResultCard, pctText } from './parts.jsx'

const FREQ = [{ value: 'mensual', label: 'Mensual' }, { value: 'quincenal', label: 'Quincenal' }]
const YESNO = [{ value: false, label: 'No' }, { value: true, label: 'Sí' }]

export default function NetSalaryTool({ ctx }) {
  const toast = useToast()
  const people = ctx.profile?.people || []
  const [gross, setGross] = useState(null)
  const [frequency, setFrequency] = useState(ctx.profile?.frequency === 'quincenal' ? 'quincenal' : 'mensual')
  const [children, setChildren] = useState(0)
  const [spouse, setSpouse] = useState(false)
  const [other, setOther] = useState(null)
  const [personId, setPersonId] = useState(people[0]?.id || '')
  const [saving, setSaving] = useState(false)

  const args = { gross: gross || 0, frequency, children: children || 0, spouse, otherDeductions: other || 0 }
  const r = netSalary(args)
  const q = frequency === 'quincenal'
  // El ingreso del perfil es mensual: se recalcula con el bruto mensual.
  const monthlyNet = q ? netSalary({ ...args, gross: (gross || 0) * 2, otherDeductions: (other || 0) * 2, frequency: 'mensual' }).neto : r.neto
  const person = people.find((p) => p.id === personId)

  const useInPlan = async () => {
    if (!person || saving) return
    setSaving(true)
    try {
      await saveProfile(ctx.hid, ctx.me, { people: people.map((p) => (p.id === personId ? { ...p, incomeCRC: monthlyNet } : p)) })
      toast.success(`Listo: el ingreso de ${person.name} ahora es ${fmt(monthlyNet)} al mes. Aplica a los meses nuevos.`)
    } catch (e) {
      toast.error(e?.message || 'No se pudo guardar. Probá de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <InputsCard>
        <Field label="Frecuencia de pago">
          <Segmented options={FREQ} value={frequency} onChange={setFrequency} />
        </Field>
        <Field label={q ? 'Salario bruto por quincena' : 'Salario bruto mensual'}>
          <AmountInput value={gross} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setGross(amount)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Hijos">
            <NumberField value={children} onChange={(n) => setChildren(n ?? 0)} decimals={false} />
          </Field>
          <Field label="Cónyuge a cargo">
            <Segmented options={YESNO} value={spouse} onChange={setSpouse} />
          </Field>
        </div>
        <Field label="Otras deducciones (opcional)" hint="Solidarista, embargos u otras, en la misma frecuencia.">
          <AmountInput value={other} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setOther(amount)} />
        </Field>
      </InputsCard>

      <ResultCard
        label={q ? 'Te llega por quincena' : 'Te llega por mes'}
        amount={r.neto}
        sentence={r.deficit > 0 ? `Las deducciones superan el salario por ${fmt(r.deficit)}.` : undefined}
      >
        <Lines
          items={[
            { label: 'Bruto', value: fmt(r.gross) },
            ...r.breakdown.map((b) => ({ label: b.label, value: `−${fmt(b.amount)}` })),
            r.creditos > 0 && { label: 'Créditos aplicados al impuesto', value: fmt(r.creditos) },
            { label: 'Neto', value: fmt(r.neto), strong: true },
          ]}
        />
        {people.length > 0 && gross > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {people.length > 1 && (
              <Field label="Ingreso de">
                <Select value={personId} onChange={(e) => setPersonId(e.target.value)}>
                  {people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </Select>
              </Field>
            )}
            <Button full loading={saving} onClick={useInPlan}>
              Usar en mi plan ({fmt(monthlyNet)} al mes)
            </Button>
            <p className="text-small text-muted">Cambia el ingreso del perfil. Los meses ya abiertos no se tocan.</p>
          </div>
        )}
      </ResultCard>

      <DataUsed source={RENTA_2026.fuente}>
        <p>
          CCSS obrera {pctText(CCSS_2026.total)}: SEM {pctText(CCSS_2026.sem)}, IVM {pctText(CCSS_2026.ivm)}, Banco
          Popular {pctText(CCSS_2026.bp)}. Se calcula sobre el bruto.
        </p>
        <p>Impuesto al salario 2026 (Decreto 45333-H), tramos mensuales sobre el bruto:</p>
        <ul className="tnum list-inside list-disc">
          {RENTA_2026.tramos.map((t, i) => {
            const from = i === 0 ? 0 : RENTA_2026.tramos[i - 1].hasta
            return (
              <li key={i}>
                {t.hasta == null ? `Más de ${fmt(from)}` : `${fmt(from)} a ${fmt(t.hasta)}`}: {pctText(t.tasa, 0)}
              </li>
            )
          })}
        </ul>
        <p className="tnum">
          Crédito por hijo {fmt(RENTA_2026.creditoHijo)} y por cónyuge {fmt(RENTA_2026.creditoConyuge)} al mes. Vigente desde{' '}
          {RENTA_2026.vigenteDesde}.
        </p>
        <p className="text-muted">Fuente CCSS: {CCSS_2026.fuente}</p>
      </DataUsed>
    </>
  )
}
