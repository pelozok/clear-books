import { useState } from 'react'
import { Receipt } from 'lucide-react'
import { AmountInput, Button, Field, Input, Row, Segmented, Sheet, useToast } from '../ui/index.js'
import { useMonth, useRecurring } from '../../data/hooks/index.js'
import { addRecurring, updateRecurring, removeRecurring, applyToCurrentMonth } from '../../data/actions/index.js'
import { fmtAmount } from '../../lib/format.js'
import { halfLabel, monthKey, monthLabel, todayISO } from '../../lib/periods.js'
import { HALF_OPTIONS } from '../onboarding/defaults.js'
import { CheckRow } from '../onboarding/Choice.jsx'
import CrudList from './CrudList.jsx'

const BLANK = { name: '', amount: null, currency: 'CRC', half: 1, isDebt: false, cuotasRestantes: null, percent: null }
const KIND_OPTIONS = [
  { value: 'monto', label: 'Monto fijo' },
  { value: 'percent', label: '% del ingreso' },
]
const isPercent = (r) => Number(r?.percent) > 0

export default function FixedSection({ hid, me, profile }) {
  const toast = useToast()
  const { data, loading, error } = useRecurring(hid)
  const curKey = monthKey(todayISO())
  const { data: month } = useMonth(hid, curKey)
  const canApply = !!month && month.status !== 'closed'
  const quincenal = profile?.frequency === 'quincenal'
  const items = (data || []).filter((r) => r.active !== false)
  const [edit, setEdit] = useState(null)
  const [apply, setApply] = useState(false)
  const [busy, setBusy] = useState(false)

  const open = (item) => {
    setEdit(item ? { ...item, kind: isPercent(item) ? 'percent' : 'monto' } : { ...BLANK, kind: 'monto', order: items.length })
    setApply(false)
  }
  const patch = (p) => setEdit((e) => ({ ...e, ...p }))
  const valid = edit && edit.name.trim() && (edit.kind === 'percent' ? Number(edit.percent) > 0 && Number(edit.percent) <= 100 : Number(edit.amount) > 0)

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
      const pct = edit.kind === 'percent'
      const item = {
        name: edit.name.trim(), amount: pct ? 0 : Number(edit.amount), currency: edit.currency,
        percent: pct ? Number(edit.percent) : null,
        half: quincenal ? edit.half : edit.half ?? 1, isDebt: !!edit.isDebt,
        cuotasRestantes: edit.isDebt && Number(edit.cuotasRestantes) > 0 ? Number(edit.cuotasRestantes) : null,
        order: edit.order ?? 0,
      }
      const id = edit.id || (await addRecurring(hid, me, item))
      if (edit.id) await updateRecurring(hid, me, id, item)
      if (apply && canApply) await applyToCurrentMonth(hid, me, month, { ...item, id, active: true })
    }, apply ? 'Guardado, también en el mes en curso' : 'Guardado para los meses nuevos')

  const remove = () =>
    run(async () => {
      await removeRecurring(hid, me, edit.id)
      if (apply && canApply) await applyToCurrentMonth(hid, me, month, { ...edit, active: false })
    }, 'Fijo quitado')

  return (
    <>
      <CrudList
        loading={loading}
        error={error}
        count={items.length}
        empty={{ icon: Receipt, title: 'Sin gastos fijos', body: 'Agregá alquiler, servicios o cuotas: lo que pagás todos los meses.' }}
        addLabel="Agregar fijo"
        onAdd={() => open(null)}
        note="Los cambios aplican a los meses nuevos. Al guardar podés pedir que también cambien el mes en curso."
      >
        {items.map((r) => (
          <Row
            key={r.id}
            onClick={() => open(r)}
            title={r.name}
            subtitle={[quincenal ? halfLabel(r.half) : null, r.isDebt ? `Deuda${r.cuotasRestantes ? `, ${r.cuotasRestantes} cuotas` : ''}` : null].filter(Boolean).join(' · ') || undefined}
            trailing={<span className="tnum">{isPercent(r) ? `${r.percent}% del ingreso` : fmtAmount(r.amount, r.currency)}</span>}
          />
        ))}
      </CrudList>

      <Sheet
        open={!!edit}
        onClose={() => setEdit(null)}
        title={edit?.id ? 'Editar fijo' : 'Nuevo fijo'}
        footer={
          <div className="flex gap-3">
            {edit?.id && <Button variant="ghost" onClick={remove} disabled={busy}>Quitar</Button>}
            <Button full loading={busy} disabled={!valid} onClick={save}>Guardar</Button>
          </div>
        }
      >
        {edit && (
          <div className="space-y-4">
            <Field label="Nombre">
              <Input value={edit.name} onChange={(e) => patch({ name: e.target.value })} />
            </Field>
            <Field label="Cómo se calcula">
              <Segmented options={KIND_OPTIONS} value={edit.kind} onChange={(kind) => patch({ kind })} />
            </Field>
            {edit.kind === 'percent' ? (
              <>
                <Field label="Porcentaje" hint="Se calcula cada mes sobre tu salario más los ingresos extra (aguinaldo, bonos). Ej: diezmo 10%.">
                  <Input type="number" inputMode="decimal" min="0" max="100" step="0.5" value={edit.percent ?? ''} onChange={(e) => patch({ percent: e.target.value })} />
                </Field>
                <Field label="Moneda en que lo pagás">
                  <Segmented options={[{ value: 'CRC', label: '₡' }, { value: 'USD', label: '$' }]} value={edit.currency} onChange={(currency) => patch({ currency })} />
                </Field>
              </>
            ) : (
              <Field label="Monto al mes">
                <AmountInput value={edit.amount} currency={edit.currency} onChange={({ amount, currency }) => patch({ amount, currency })} />
              </Field>
            )}
            {quincenal && (
              <Field label="Quincena" hint={edit.half === 'ambas' ? 'La mitad en cada quincena.' : undefined}>
                <Segmented options={HALF_OPTIONS} value={edit.half} onChange={(half) => patch({ half })} />
              </Field>
            )}
            <CheckRow checked={edit.isDebt} onChange={(isDebt) => patch({ isDebt })} label="Es una deuda" hint="Tarjeta, préstamo o cuota con fin." />
            {edit.isDebt && (
              <Field label="Cuotas que faltan (opcional)">
                <Input type="number" inputMode="numeric" min="0" value={edit.cuotasRestantes ?? ''} onChange={(e) => patch({ cuotasRestantes: e.target.value })} />
              </Field>
            )}
            {canApply && (
              <CheckRow
                checked={apply}
                onChange={setApply}
                label={`Aplicar al mes en curso (${monthLabel(curKey)})`}
                hint="Si no, el cambio empieza el mes que viene."
              />
            )}
          </div>
        )}
      </Sheet>
    </>
  )
}
