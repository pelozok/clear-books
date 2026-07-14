import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Card, Btn, Input, Select } from "../../components/ui.jsx";
import { useFixedTemplate } from "../../data/useFixedTemplate.js";
import { fmt } from "../../lib/format.js";
import { sumCRC } from "../../lib/calc.js";

// CRUD de la plantilla de gastos fijos. Los cambios aparecen en los
// períodos que se creen a partir de ahora; los ya creados no cambian.
export default function FixedTemplateSettings({ uid, showToast, rate }) {
  const { items, addItem, updateItem, removeItem } = useFixedTemplate(uid);
  const [nuevo, setNuevo] = useState({ name: "", amount: "", currency: "CRC" });

  if (items === null) {
    return <Card title="Gastos fijos"><p className="text-sm text-muted">Cargando…</p></Card>;
  }

  const add = async () => {
    if (!nuevo.name.trim() || !(Number(nuevo.amount) > 0)) return;
    await addItem({ ...nuevo, name: nuevo.name.trim() });
    setNuevo({ name: "", amount: "", currency: "CRC" });
    showToast("Gasto fijo agregado");
  };

  const commit = (item, field, raw) => {
    const value = field === "amount" ? Number(raw) || 0 : raw;
    if (value !== item[field]) updateItem(item.id, { [field]: value });
  };

  return (
    <Card
      title="Gastos fijos"
      subtitle="Se copian a cada período nuevo. Los períodos ya creados no cambian."
      action={<span className="text-sm font-bold font-mono text-ink">{fmt(sumCRC(items, rate))}</span>}
    >
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2 items-center">
            <Input
              className="flex-1"
              defaultValue={item.name}
              onBlur={(e) => commit(item, "name", e.target.value.trim() || item.name)}
            />
            <Input
              type="number" inputMode="numeric" min="0"
              className="!w-28 text-right font-mono"
              defaultValue={item.amount}
              onBlur={(e) => commit(item, "amount", e.target.value)}
            />
            <Select
              className="!w-16 !px-1"
              value={item.currency}
              onChange={(e) => commit(item, "currency", e.target.value)}
            >
              <option value="CRC">₡</option>
              <option value="USD">$</option>
            </Select>
            <button
              type="button"
              onClick={() => removeItem(item.id).then(() => showToast("Gasto fijo eliminado"))}
              className="text-muted hover:text-bad p-1"
              title="Eliminar"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted py-2">No hay gastos fijos todavía.</p>
        )}
      </div>

      <div className="flex gap-2 items-center border-t border-line pt-4">
        <Input
          className="flex-1"
          placeholder="Nuevo gasto fijo"
          value={nuevo.name}
          onChange={(e) => setNuevo({ ...nuevo, name: e.target.value })}
        />
        <Input
          type="number" inputMode="numeric" min="0"
          className="!w-28 text-right font-mono"
          placeholder="Monto"
          value={nuevo.amount}
          onChange={(e) => setNuevo({ ...nuevo, amount: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <Btn
          variant="soft"
          onClick={add}
          disabled={!nuevo.name.trim() || !(Number(nuevo.amount) > 0)}
          className="!px-3"
          title="Agregar"
        >
          <Plus size={16} />
        </Btn>
      </div>
    </Card>
  );
}
