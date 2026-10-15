import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, WifiOff } from 'lucide-react'
import { AmountInput, Button, Chip, Field, IconButton, PageHeader, Sheet, useToast } from '../ui/index.js'
import { monthKey as monthKeyOf, monthLabel, shiftMonth, todayISO } from '../../lib/periods.js'
import { fmtAmountInput } from '../../lib/format.js'
import { updateMonthField } from '../../data/actions/index.js'
import { errorText, useOnline } from './shared.js'

/** Clave del último mes navegable: el actual + 1. */
export const maxMonthKey = () => shiftMonth(monthKeyOf(todayISO()), 1)

function NavArrow({ to, label, icon, disabled }) {
  if (disabled) return <IconButton label={label} icon={icon} disabled />
  return <IconButton as={Link} to={to} label={label} icon={icon} />
}

function RateSheet({ open, onClose, hid, me, month }) {
  const toast = useToast()
  const [value, setValue] = useState(month?.exchangeRate?.venta ?? null)
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    if (open) setValue(month?.exchangeRate?.venta ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  const save = async () => {
    if (!(value > 0)) return
    setSaving(true)
    try {
      await updateMonthField(hid, me, month, 'exchangeRate', { ...(month.exchangeRate || {}), venta: value, date: todayISO() })
      toast.success(`Tipo de cambio ₡${fmtAmountInput(value)}`)
      onClose()
    } catch (e) {
      toast.error(errorText(e))
    } finally {
      setSaving(false)
    }
  }
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Tipo de cambio del mes"
      footer={
        <Button full size="lg" loading={saving} disabled={!(value > 0)} onClick={save}>
          Guardar
        </Button>
      }
    >
      <Field label="Venta" hint="Los montos en dólares de este mes se convierten con este valor.">
        <AmountInput value={value} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setValue(amount)} />
      </Field>
    </Sheet>
  )
}

/** Header del mes: nombre, flechas ‹ › (hasta +1 mes), chip de TC tocable y chip sin conexión. */
export default function MonthHeader({ monthKey, hid, me, month, readOnly }) {
  const online = useOnline()
  const [rateOpen, setRateOpen] = useState(false)
  const next = shiftMonth(monthKey, 1)
  const venta = month?.exchangeRate?.venta
  const showChips = venta || !online
  return (
    <>
      <PageHeader
        title={monthLabel(monthKey)}
        settings
        actions={
          <>
            <NavArrow to={`/mes/${shiftMonth(monthKey, -1)}`} label="Mes anterior" icon={ChevronLeft} />
            <NavArrow to={`/mes/${next}`} label="Mes siguiente" icon={ChevronRight} disabled={next > maxMonthKey()} />
          </>
        }
      >
        {showChips ? (
          <div className="flex flex-wrap gap-2">
            {venta ? (
              <Chip onClick={readOnly ? undefined : () => setRateOpen(true)} aria-label="Tipo de cambio del mes">
                <span className="tnum">TC ₡{fmtAmountInput(venta)}</span>
              </Chip>
            ) : null}
            {!online && <Chip icon={WifiOff}>Sin conexión, se sincroniza al volver</Chip>}
          </div>
        ) : null}
      </PageHeader>
      {month && !readOnly && (
        <RateSheet open={rateOpen} onClose={() => setRateOpen(false)} hid={hid} me={me} month={month} />
      )}
    </>
  )
}
