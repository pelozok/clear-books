import { useEffect, useState } from 'react'
import { CreditCard } from 'lucide-react'
import { AmountInput, Button, Field, Input, Sheet } from '../ui/index.js'
import { fmtAmount } from '../../lib/format.js'
import { looksLikeCard } from '../../lib/cards.js'
import { todayISO } from '../../lib/periods.js'

/**
 * Hoja de un fijo: Pagado (monto y fecha editables), Este mes no, Pasa al mes
 * siguiente, Pendiente. onMark({ status, paidAmount?, paidAt? }).
 */
export default function FixedSheet({ open, item, onClose, onMark, busy }) {
  const [amount, setAmount] = useState(null)
  const [date, setDate] = useState('')

  useEffect(() => {
    if (!open || !item) return
    setAmount(item.paidAmount ?? item.amount)
    setDate(item.paidAt || todayISO())
  }, [open, item])

  const currency = item?.currency || 'CRC'
  const status = item?.status || 'pending'
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={item?.name || 'Fijo'}
      footer={
        <Button
          full
          size="lg"
          loading={busy === 'paid'}
          disabled={!!busy || !(amount > 0)}
          onClick={() => onMark({ status: 'paid', paidAmount: amount, paidAt: date || todayISO() })}
        >
          {status === 'paid' ? 'Guardar pago' : 'Pagado'}
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <p className="tnum text-small text-ink-2">Monto del plan {fmtAmount(item?.amount, currency)}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <Field label="Monto pagado">
            <AmountInput value={amount} currency={currency} allowCurrencyToggle={false} onChange={(v) => setAmount(v.amount)} />
          </Field>
          <Field label="Fecha">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="tnum h-14" />
          </Field>
        </div>
        {looksLikeCard(item?.name) && (
          <p className="flex gap-2 rounded-xl bg-surface-2 p-3 text-small text-ink-2">
            <CreditCard size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0" />
            Parece el pago de una tarjeta. Si también anotás los gastos que hiciste con ella, ese dinero se cuenta dos veces.
          </p>
        )}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Button variant="secondary" loading={busy === 'skipped'} disabled={!!busy || status === 'skipped'} onClick={() => onMark({ status: 'skipped' })}>
            Este mes no
          </Button>
          <Button variant="secondary" loading={busy === 'deferred'} disabled={!!busy || status === 'deferred'} onClick={() => onMark({ status: 'deferred' })}>
            Pasa al mes siguiente
          </Button>
          <Button variant="ghost" loading={busy === 'pending'} disabled={!!busy || status === 'pending'} onClick={() => onMark({ status: 'pending' })}>
            Pendiente
          </Button>
        </div>
      </div>
    </Sheet>
  )
}
