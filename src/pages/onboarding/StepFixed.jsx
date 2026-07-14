import { Plus, X } from "lucide-react";
import { Btn, Input } from "../../components/ui.jsx";
import { fmt } from "../../lib/format.js";
import { sumCRC } from "../../lib/calc.js";

export default function StepFixed({ fixed, setFixed, frequency, rate }) {
  const per = frequency === "quincenal" ? "por quincena" : "por mes";

  const setField = (i, field, value) =>
    setFixed(fixed.map((f, j) => (j === i ? { ...f, [field]: value } : f)));
  const remove = (i) => setFixed(fixed.filter((_, j) => j !== i));
  const add = () => setFixed([...fixed, { name: "", amount: "", currency: "CRC" }]);

  const valid = fixed.filter((f) => f.name.trim() && Number(f.amount) > 0);

  return (
    <div className="space-y-4">
      <p className="text-xs text-ink2 leading-relaxed">
        Estos son los gastos que se repiten cada período (alquiler, internet, luz…).
        Aparecerán automáticamente en cada {frequency === "quincenal" ? "quincena" : "mes"} para
        que solo los marqués como pagados. Dejá el monto vacío en los que no apliquen, o borralos.
      </p>

      <div className="space-y-2">
        {fixed.map((f, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              className="flex-1"
              value={f.name}
              onChange={(e) => setField(i, "name", e.target.value)}
              placeholder="Nombre del gasto"
            />
            <Input
              type="number" inputMode="numeric" min="0"
              className="!w-32 text-right font-mono"
              value={f.amount}
              onChange={(e) => setField(i, "amount", e.target.value)}
              placeholder="₡ monto"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-muted hover:text-bad p-1"
              title="Quitar"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <Btn variant="ghost" onClick={add} className="flex items-center gap-1.5">
        <Plus size={15} /> Agregar otro
      </Btn>

      <div className="flex items-center justify-between bg-bg2 rounded-xl px-4 py-3">
        <span className="text-xs font-semibold text-ink2">Total de gastos fijos {per}</span>
        <span className="text-sm font-bold text-ink font-mono">{fmt(sumCRC(valid, rate))}</span>
      </div>
    </div>
  );
}
