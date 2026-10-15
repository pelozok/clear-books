import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CalendarX, Lock, RefreshCw, SearchX } from 'lucide-react'
import { Button, EmptyState, PageHeader, Skeleton, useToast } from '../components/ui/index.js'
import EntryForm from '../components/month/EntryForm.jsx'
import { errorText, isPareja, setLastCategory } from '../components/month/shared.js'
import { useHousehold } from '../data/HouseholdContext.jsx'
import { useEntries, useMonth, useSavingsPlaces } from '../data/hooks/index.js'
import { addEntry, removeEntry, updateEntry } from '../data/actions/index.js'
import { budgetMessage, spendBudget } from '../lib/budget.js'
import { monthTotals } from '../lib/plan.js'
import { defaultDateFor, monthKey as monthKeyOf, monthLabel, todayISO } from '../lib/periods.js'
import { teQueda } from '../lib/plan.js'
import { fmt } from '../lib/format.js'

const VALID_KEY = /^\d{4}-(0[1-9]|1[0-2])$/

function FormSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando" className="flex flex-col gap-6">
      <Skeleton className="h-14 w-full rounded-xl" />
      <div className="flex flex-wrap gap-2">
        {['w-20', 'w-24', 'w-16', 'w-28', 'w-20'].map((w, i) => (
          <Skeleton key={i} className={`h-8 ${w} rounded-full`} />
        ))}
      </div>
      <Skeleton className="h-[52px] w-full rounded-xl" />
    </div>
  )
}

/** Anotar (o editar con ?id=) un gasto variable. Pantalla completa. */
export default function NewEntryPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const toast = useToast()
  const today = todayISO()
  const raw = params.get('mes')
  const key = VALID_KEY.test(raw || '') ? raw : monthKeyOf(today)
  const id = params.get('id')
  const { hid, me, profile } = useHousehold()
  const month = useMonth(hid, key)
  const entries = useEntries(hid, key)
  const places = useSavingsPlaces(hid)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const list = entries.data || []
  const entry = id ? list.find((e) => e.id === id) : null
  const back = `/mes/${key}`
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate(back, { replace: true }))
  const header = <PageHeader title={id ? 'Editar gasto' : 'Anotar gasto'} back={back} />

  // Después de anotar: en individual avisa contra el límite del mes; en pareja, "Les quedan".
  const notify = (verb, nextList) => {
    const plan = teQueda({ month: month.data, profile, entries: nextList, today })
    const b = spendBudget({ month: month.data, profile, plan, totals: monthTotals(month.data, undefined, nextList) })
    if (b && b.limit > 0 && b.level !== 'ok') toast.error(`${verb} · Ojo, ${budgetMessage(b, fmt).replace(/^Te/, 'te')}`)
    else if (b && b.limit > 0) toast.success(`${verb} · ${budgetMessage(b, fmt)}`)
    else toast.success(`${verb} · ${leftMessage(nextList)}`)
  }

  const leftMessage = (nextList) => {
    const plan = teQueda({ month: month.data, profile, entries: nextList, today })
    const verb = isPareja(profile) ? 'Les quedan' : 'Te quedan'
    return plan.total < 0 ? `Faltan ${fmt(-plan.total)}` : `${verb} ${fmt(plan.total)}`
  }

  const submit = async (data) => {
    setSaving(true)
    const rate = month.data.exchangeRate
    const payload = { ...data, monthKey: monthKeyOf(data.date) }
    try {
      if (entry) {
        await updateEntry(hid, me, entry, payload, rate)
        notify('Guardado', list.map((e) => (e.id === entry.id ? { ...e, ...payload } : e)))
      } else {
        await addEntry(hid, me, payload, rate)
        notify('Anotado', [...list, payload])
      }
      setLastCategory(data.categoryId)
      goBack()
    } catch (e) {
      toast.error(errorText(e))
      setSaving(false)
    }
  }

  const remove = async () => {
    setDeleting(true)
    try {
      await removeEntry(hid, me, entry)
      toast.show('Borraste el gasto')
      goBack()
    } catch (e) {
      toast.error(errorText(e))
      setDeleting(false)
    }
  }

  let body
  if (month.error || entries.error) {
    body = (
      <EmptyState
        icon={RefreshCw}
        title="No pudimos cargar el mes"
        body={(month.error || entries.error).message}
        action={
          <Button variant="secondary" icon={RefreshCw} onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        }
      />
    )
  } else if (month.tooFar || month.beforeStart) {
    body = <EmptyState icon={CalendarX} title="No se puede anotar en ese mes" body="Elegí un mes entre el inicio de tu plan y el mes siguiente al actual." action={<Button as={Link} to={`/gasto/nuevo?mes=${monthKeyOf(today)}`} variant="secondary">Anotar en este mes</Button>} />
  } else if (month.loading || entries.loading || !month.data) {
    body = <FormSkeleton />
  } else if (month.data.status === 'closed') {
    body = (
      <EmptyState
        icon={Lock}
        title={`${monthLabel(key)} ya está cerrado`}
        body="Los meses cerrados no se editan. Anotalo en el mes en curso."
        action={<Button as={Link} to={`/gasto/nuevo?mes=${monthKeyOf(today)}`} variant="secondary">Anotar en este mes</Button>}
      />
    )
  } else if (id && !entry) {
    body = <EmptyState icon={SearchX} title="Ese gasto ya no está" body="Puede que lo hayan borrado desde otro teléfono." action={<Button as={Link} to={back} variant="secondary">Volver al mes</Button>} />
  } else {
    body = (
      <EntryForm
        key={entry?.id || 'new'}
        monthKey={key}
        entry={entry}
        defaultDate={defaultDateFor(key, today)}
        profile={profile}
        places={places.data || []}
        onSubmit={submit}
        onDelete={entry ? remove : null}
        saving={saving}
        deleting={deleting}
      />
    )
  }

  return (
    <>
      {header}
      {body}
    </>
  )
}
