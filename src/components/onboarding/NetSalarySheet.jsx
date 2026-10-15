import { useState } from 'react'
import { AmountInput, Button, Field, Input, Sheet } from '../ui/index.js'
import { netSalary } from '../../lib/calculators/netSalary.js'
import { fmt } from '../../lib/format.js'
import { CheckRow } from './Choice.jsx'

/** Bruto → neto (CCSS + renta 2026). onUse(neto) rellena el ingreso. */
export default function NetSalarySheet({ open, onClose, frequency, onUse }) {
  const [gross, setGross] = useState(null)
  const [children, setChildren] = useState('0')
  const [spouse, setSpouse] = useState(false)
  const per = frequency === 'quincenal' ? 'por quincena' : 'por mes'
  const r = netSalary({ gross: gross || 0, frequency, children: Number(children) || 0, spouse })

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Calculá tu salario neto"
      footer={
        <Button full disabled={!gross} onClick={() => { onUse(r.neto); onClose() }}>
          Usar {fmt(r.neto)}
        </Button>
      }
    >
      <div className="space-y-4">
        <Field label={`Salario bruto ${per}`}>
          <AmountInput value={gross} currency="CRC" allowCurrencyToggle={false} onChange={({ amount }) => setGross(amount)} />
        </Field>
        <Field label="Hijos que declarás" hint="Cada hijo baja un poco el impuesto.">
          <Input type="number" inputMode="numeric" min="0" value={children} onChange={(e) => setChildren(e.target.value)} />
        </Field>
        <CheckRow checked={spouse} onChange={setSpouse} label="Declarás cónyuge" />
        <dl className="divide-y divide-line border-t border-line text-body">
          {r.breakdown.map((b) => (
            <div key={b.label} className="flex justify-between py-2">
              <dt className="text-ink-2">{b.label}</dt>
              <dd className="tnum text-ink">{fmt(b.amount)}</dd>
            </div>
          ))}
          <div className="flex justify-between py-2.5 font-semibold">
            <dt className="text-ink">Neto {per}</dt>
            <dd className="tnum text-ink">{fmt(r.neto)}</dd>
          </div>
        </dl>
      </div>
    </Sheet>
  )
}
