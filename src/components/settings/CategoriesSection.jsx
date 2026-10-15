import { useState } from 'react'
import { Tags } from 'lucide-react'
import { AmountInput, Button, Field, Input, Row, Sheet, useToast } from '../ui/index.js'
import { saveProfile } from '../../data/actions/index.js'
import { fmt } from '../../lib/format.js'
import { cx } from '../ui/cx.js'
import { CATEGORY_COLORS, CATEGORY_ICONS, categoryIcon } from './categoryIcons.js'
import CrudList from './CrudList.jsx'

const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'cat'

export default function CategoriesSection({ hid, me, profile }) {
  const toast = useToast()
  const cats = profile?.categories || []
  const [edit, setEdit] = useState(null)
  const [busy, setBusy] = useState(false)
  const patch = (p) => setEdit((e) => ({ ...e, ...p }))
  const valid = edit && edit.label.trim()

  const persist = async (categories, msg) => {
    setBusy(true)
    try {
      await saveProfile(hid, me, { categories })
      toast.success(msg)
      setEdit(null)
    } catch (e) {
      toast.error(`No se pudo guardar: ${e.message || e}`)
    } finally {
      setBusy(false)
    }
  }

  const save = () => {
    const row = { ...edit, label: edit.label.trim(), budget: Number(edit.budget) > 0 ? Number(edit.budget) : null }
    if (edit.isNew) {
      const { isNew, ...clean } = row
      let id = slug(clean.label)
      while (cats.some((c) => c.id === id)) id = `${id}-2`
      return persist([...cats.filter((c) => c.id !== 'otros'), { ...clean, id }, ...cats.filter((c) => c.id === 'otros')], 'Categoría agregada')
    }
    return persist(cats.map((c) => (c.id === row.id ? row : c)), 'Categoría guardada')
  }

  const Icon = edit ? categoryIcon(edit.icon) : null

  return (
    <>
      <CrudList
        count={cats.length}
        empty={{ icon: Tags, title: 'Sin categorías', body: 'Las categorías ordenan los gastos del mes.' }}
        addLabel="Agregar categoría"
        onAdd={() => setEdit({ isNew: true, label: '', icon: 'Shapes', color: CATEGORY_COLORS[cats.length % CATEGORY_COLORS.length], budget: null })}
        note="El presupuesto es opcional. Si lo ponés, el mes muestra cuánto llevás de esa categoría."
      >
        {cats.map((c) => {
          const I = categoryIcon(c.icon)
          return (
            <Row
              key={c.id}
              onClick={() => setEdit({ ...c })}
              leading={<I size={20} strokeWidth={1.75} aria-hidden="true" />}
              title={c.label}
              subtitle={c.id === 'otros' ? 'Siempre está, no se puede borrar' : undefined}
              trailing={<span className="tnum text-ink-2">{c.budget ? fmt(c.budget) : 'Sin presupuesto'}</span>}
            />
          )
        })}
      </CrudList>

      <Sheet
        open={!!edit}
        onClose={() => setEdit(null)}
        title={edit?.isNew ? 'Nueva categoría' : 'Editar categoría'}
        footer={
          <div className="flex gap-3">
            {edit && !edit.isNew && edit.id !== 'otros' && (
              <Button variant="ghost" disabled={busy} onClick={() => persist(cats.filter((c) => c.id !== edit.id), 'Categoría borrada')}>
                Borrar
              </Button>
            )}
            <Button full loading={busy} disabled={!valid} onClick={save}>Guardar</Button>
          </div>
        }
      >
        {edit && (
          <div className="space-y-4">
            <Field label="Nombre">
              <Input value={edit.label} onChange={(e) => patch({ label: e.target.value })} />
            </Field>
            <fieldset>
              <legend className="mb-1.5 flex items-center gap-2 text-small font-medium text-ink-2">
                Ícono <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </legend>
              <div className="grid grid-cols-6 gap-2">
                {Object.entries(CATEGORY_ICONS).map(([name, I]) => (
                  <button
                    key={name}
                    type="button"
                    aria-label={name}
                    aria-pressed={edit.icon === name}
                    onClick={() => patch({ icon: name })}
                    className={cx(
                      'cb-press cb-hover flex h-11 items-center justify-center rounded-xl border',
                      edit.icon === name ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line text-ink-2',
                    )}
                  >
                    <I size={20} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>
            <Field label="Presupuesto al mes (opcional)">
              <AmountInput value={edit.budget} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => patch({ budget: amount })} />
            </Field>
          </div>
        )}
      </Sheet>
    </>
  )
}
