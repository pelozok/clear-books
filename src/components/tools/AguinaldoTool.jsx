import { useState } from 'react'
import { AmountInput, Field, Segmented } from '../ui/index.js'
import { AGUINALDO_INFO, aguinaldo, aguinaldoEstimate } from '../../lib/calculators/aguinaldo.js'
import { DataUsed, InputsCard, NumberField, ResultCard } from './parts.jsx'

const MODES = [{ value: 'rapido', label: 'Salario fijo' }, { value: 'detalle', label: 'Mes a mes' }]
const MESES = ['Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre']

export default function AguinaldoTool() {
  const [mode, setMode] = useState('rapido')
  const [gross, setGross] = useState(null)
  const [months, setMonths] = useState(12)
  const [salaries, setSalaries] = useState(() => Array(12).fill(null))

  const amount = mode === 'rapido'
    ? aguinaldoEstimate({ monthlyGross: gross || 0, monthsWorked: months })
    : aguinaldo({ salaries: salaries.map((s) => s || 0) })

  const setSalary = (i, v) => setSalaries((list) => list.map((s, j) => (j === i ? v : s)))

  return (
    <>
      <InputsCard>
        <Segmented options={MODES} value={mode} onChange={setMode} />
        {mode === 'rapido' ? (
          <>
            <Field label="Salario bruto mensual">
              <AmountInput value={gross} currency="CRC" allowCurrencyToggle={false} onChange={({ amount: a }) => setGross(a)} />
            </Field>
            <Field label="Meses trabajados (de diciembre a noviembre)" hint="Si trabajaste el año completo, dejá 12.">
              <NumberField value={months} onChange={setMonths} />
            </Field>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MESES.map((m, i) => (
              <Field key={m} label={`${m} (bruto)`}>
                <AmountInput value={salaries[i]} currency="CRC" allowCurrencyToggle={false}
                  onChange={({ amount: a }) => setSalary(i, a)} />
              </Field>
            ))}
          </div>
        )}
      </InputsCard>

      <ResultCard
        label="Tu aguinaldo"
        amount={amount}
        sentence={`Llega completo: no paga impuesto al salario ni CCSS. Se paga antes del ${AGUINALDO_INFO.pagoAntesDe}.`}
      />

      <DataUsed source={AGUINALDO_INFO.fuente}>
        <p>Aguinaldo = suma de los salarios brutos del {AGUINALDO_INFO.periodo}, dividida entre 12.</p>
        <p>Los meses sin salario cuentan como 0. Incluye horas extra y comisiones si fueron parte del salario.</p>
      </DataUsed>
    </>
  )
}
