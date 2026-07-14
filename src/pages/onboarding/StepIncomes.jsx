import { Card, Field, Input } from "../../components/ui.jsx";
import { fmt } from "../../lib/format.js";
import { personIncomeCRC } from "../../lib/calc.js";

export default function StepIncomes({ people, setPeople, savingsGoal, setSavingsGoal, frequency, rate }) {
  const per = frequency === "quincenal" ? "por quincena" : "por mes";
  const setField = (i, field, value) =>
    setPeople(people.map((p, j) => (j === i ? { ...p, [field]: value } : p)));

  const total = people.reduce((s, p) => s + personIncomeCRC(p, rate), 0);

  return (
    <div className="space-y-5">
      {people.map((p, i) => (
        <Card key={p.id} title={p.name || `Persona ${i + 1}`} subtitle={`Salario ${per}`}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="En colones (₡)">
              <Input
                type="number" inputMode="numeric" min="0"
                value={p.incomeCRC}
                onChange={(e) => setField(i, "incomeCRC", e.target.value)}
                placeholder="0"
              />
            </Field>
            <Field label="En dólares ($)" hint="Opcional, si parte del salario es en USD">
              <Input
                type="number" inputMode="numeric" min="0"
                value={p.incomeUSD}
                onChange={(e) => setField(i, "incomeUSD", e.target.value)}
                placeholder="0"
              />
            </Field>
          </div>
        </Card>
      ))}

      <Field
        label={`Meta de ahorro ${per} (₡)`}
        hint={people.length === 2 ? "Se divide 50/50 entre los dos." : "Lo que querés apartar antes de gastar."}
      >
        <Input
          type="number" inputMode="numeric" min="0"
          value={savingsGoal}
          onChange={(e) => setSavingsGoal(e.target.value)}
          placeholder="0"
        />
      </Field>

      <div className="flex items-center justify-between bg-bg2 rounded-xl px-4 py-3">
        <span className="text-xs font-semibold text-ink2">Ingresos totales {per}</span>
        <span className="text-sm font-bold text-ink font-mono">{fmt(total)}</span>
      </div>
    </div>
  );
}
