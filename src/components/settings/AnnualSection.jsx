import { useState } from 'react'
import { CalendarClock } from 'lucide-react'
import { AmountInput, Button, Field, Input, Row, Select, Sheet, useToast } from '../ui/index.js'
import { useAnnual } from '../../data/hooks/index.js'
import { addAnnual, updateAnnual, removeAnnual } from '../../data/actions/index.js'
import { fmtAmount } from '../../lib/format.js'
import { monthKey, monthLabel, todayISO } from '../../lib/periods.js'
import { MONTH_NAMES, planFields, suggestPlan } from '../onboarding/annualPlan.js'
import { AnnualPlanPicker } from '../onboarding/StepPlaces.jsx'
import CrudList from './CrudList.jsx'

const BLANK = { name: '', amount: null, currency: 'CRC', month: 12, plan: null }

export default function AnnualSection({ hid, me, profile }) {
  const toast = useToast()
  const { data, loading, error } = useAnnual(hid)
  const mKey = monthKey(todayISO())
  const items = (data || []).filter((a) => a.active !== false)
  const [edit, setEdit] = useState(null)
  const [busy, setBusy] = useState(false)
  const base = (profile?.people || []).reduce((t, p) => t + (Number(p.savingsPerPeriod) || 0), 0) *
    (profile?.frequency === 'quincenal' ? 2 : 1)

  const patch = (p) => setEdit((e) => ({ ...e, ...p }))
  const valid = edit && edit.name.trim() && Number(edit.amount) > 0
  const plan = edit && !edit.id ? edit.plan || suggestPlan(edit, mKey, base) : null

  const run = async (fn, msg) => {
    setBusy(true)
    try {
      await fn()
      toast.success(msg)
      setEdit(null)
    } catch (e) {
      toast.error(`No se pudo guardar: ${e.message || e}`)
    } finally {
      setBusy(false)
    }
  }

  const save = () =>
    run(async () => {
      const item = { name: edit.name.trim(), amount: Number(edit.amount), currency: edit.currency, month: Number(edit.month) }
      if (edit.id) await updateAnnual(hid, me, edit.id, item)
      else await addAnnual(hid, me, { ...item, ...planFields(plan, item, mKey) })
    }, 'Guardado')

  const subtitle = (a) => {
    const parts = [`Se paga en ${MONTH_NAMES[a.month - 1] || '?'}`]
    if (a.startsFrom && a.startsFrom > mKey) parts.push(`reservamos desde ${monthLabel(a.startsFrom)}`)
    return parts.join(' · ')
  }

  return (
    <>
      <CrudList
        loading={loading}
        error={error}
        count={items.length}
        empty={{ icon: CalendarClock, title: 'Sin gastos anuales', body: 'Marchamo, Navidad, seguros: apartamos un poco cada mes para que no te agarren de sorpresa.' }}
        addLabel="Agregar gasto anual"
        onAdd={() => setEdit({ ...BLANK })}
        note="La cuota mensual de cada reserva se calcula sola con lo que falta y los meses que quedan."
      >
        {items.map((a) => (
          <Row
            key={a.id}
            onClick={() => setEdit({ ...a })}
            title={a.name}
            subtitle={subtitle(a)}
            trailing={<span className="tnum">{fmtAmount(a.amount, a.currency)}</span>}
          />
        ))}
      </CrudList>

      <Sheet
        open={!!edit}
        onClose={() => setEdit(null)}
        title={edit?.id ? 'Editar gasto anual' : 'Nuevo gasto anual'}
        footer={
          <div className="flex gap-3">
            {edit?.id && (
              <Button variant="ghost" disabled={busy} onClick={() => run(() => removeAnnual(hid, me, edit.id), 'Gasto anual quitado')}>
                Quitar
              </Button>
            )}
            <Button full loading={busy} disabled={!valid} onClick={save}>Guardar</Button>
          </div>
        }
      >
        {edit && (
          <div className="space-y-4">
            <Field label="Nombre">
              <Input value={edit.name} onChange={(e) => patch({ name: e.target.value })} />
            </Field>
            <Field label="Monto">
              <AmountInput value={edit.amount} currency={edit.currency} onChange={({ amount, currency }) => patch({ amount, currency })} />
            </Field>
            <Field label="Mes en que se paga">
              <Select value={edit.month} onChange={(e) => patch({ month: Number(e.target.value) })}>
                {MONTH_NAMES.map((n, i) => <option key={n} value={i + 1}>{n[0].toUpperCase() + n.slice(1)}</option>)}
              </Select>
            </Field>
            {!edit.id && <AnnualPlanPicker item={edit} mKey={mKey} plan={plan} onChange={(p) => patch({ plan: p })} />}
          </div>
        )}
      </Sheet>
    </>
  )
}
