import { useState } from 'react'
import { AmountInput, Field, Segmented } from '../ui/index.js'
import { cardCost, convert } from '../../lib/calculators/fx.js'
import { fmt, fmtAmountInput, fmtDateLong } from '../../lib/format.js'
import { DataUsed, InputsCard, Lines, NumberField, ResultCard } from './parts.jsx'

const MODES = [{ value: 'convertir', label: 'Convertir' }, { value: 'tarjeta', label: 'Pago con tarjeta' }]

export default function FxTool({ ctx }) {
  const [mode, setMode] = useState('convertir')
  const [venta, setVenta] = useState(Number(ctx.rateObj?.venta) || null)
  const [compra, setCompra] = useState(Number(ctx.rateObj?.compra) || null)
  const [amount, setAmount] = useState(null)
  const [from, setFrom] = useState('USD')
  const [usd, setUsd] = useState(null)
  const [spread, setSpread] = useState(2)
  const [fee, setFee] = useState(0)

  const to = from === 'USD' ? 'CRC' : 'USD'
  const converted = convert({ amount: amount || 0, from, to, venta: venta || 0, compra: compra || 0 })
  const card = cardCost({ usd: usd || 0, venta: venta || 0, spread: spread || 0, feePct: fee || 0 })
  const usedRate = from === 'USD' ? 'compra' : 'venta'

  return (
    <>
      <InputsCard>
        <Segmented options={MODES} value={mode} onChange={setMode} />
        {mode === 'convertir' ? (
          <Field label="Monto" hint="Tocá ₡ o $ para cambiar la moneda de origen.">
            <AmountInput value={amount} currency={from} onChange={({ amount: a, currency }) => { setAmount(a); setFrom(currency) }} />
          </Field>
        ) : (
          <>
            <Field label="Cobro en dólares">
              <AmountInput value={usd} currency="USD" allowCurrencyToggle={false} onChange={({ amount: a }) => setUsd(a)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Recargo del banco" hint="Sobre el TC venta.">
                <NumberField value={spread} onChange={setSpread} suffix="%" />
              </Field>
              <Field label="Comisión extra">
                <NumberField value={fee} onChange={setFee} suffix="%" />
              </Field>
            </div>
          </>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="TC venta">
            <NumberField value={venta} onChange={setVenta} />
          </Field>
          <Field label="TC compra">
            <NumberField value={compra} onChange={setCompra} />
          </Field>
        </div>
      </InputsCard>

      {mode === 'convertir' ? (
        <ResultCard
          label={to === 'CRC' ? 'En colones' : 'En dólares'}
          amount={converted}
          currency={to}
          sentence={`Con el TC de ${usedRate} (${fmtAmountInput(usedRate === 'venta' ? venta || 0 : compra || 0)}): ${
            from === 'USD' ? 'vendés dólares al banco' : 'le comprás dólares al banco'}.`}
        />
      ) : (
        <ResultCard
          label="Te cuesta en realidad"
          amount={card.costCRC}
          sentence={card.vsBCCR > 0 ? `${fmt(card.vsBCCR)} más que al TC del BCCR (${fmtAmountInput(Math.round(card.pct * 100) / 100)} %).` : undefined}
        >
          <Lines items={[
            { label: 'Al TC del BCCR', value: fmt(card.bccrCRC) },
            { label: 'TC que usa el banco', value: fmtAmountInput(Math.round(card.tcBanco * 100) / 100) },
            { label: 'Costo real', value: fmt(card.costCRC), strong: true },
          ]} />
        </ResultCard>
      )}

      <DataUsed title="Datos usados (TC del mes)" source="BCCR vía api.hacienda.go.cr">
        <p className="tnum">
          TC del mes: venta {fmtAmountInput(Number(ctx.rateObj?.venta) || 0)}, compra {fmtAmountInput(Number(ctx.rateObj?.compra) || 0)}
          {ctx.rateObj?.date ? `, del ${fmtDateLong(ctx.rateObj.date)}` : ''}. Podés cambiarlo arriba para probar.
        </p>
        <p>Al pasar de $ a ₡ el banco te compra los dólares (TC compra); de ₡ a $ te los vende (TC venta).</p>
        <p>Con tarjeta, el banco suele cobrar el TC venta más un recargo; revisá tu estado de cuenta para saber el tuyo.</p>
      </DataUsed>
    </>
  )
}
