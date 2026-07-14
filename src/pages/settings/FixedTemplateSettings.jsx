import { useState } from "react";
import { Card, Btn, Input, Select } from "../../components/ui.jsx";
import { useFixedTemplate } from "../../data/useFixedTemplate.js";
import { fmt } from "../../lib/format.js";
import { sumCRC } from "../../lib/calc.js";

// CRUD de la plantilla de gastos fijos. Los cambios aparecen en los
// períodos que se creen a partir de ahora; los ya creados no cambian.
export default function FixedTemplateSettings({ uid, profile, showToast, rate }) {
  const { items, addItem, updateItem, removeItem } = useFixedTemplate(uid);
  const [nuevo, setNuevo] = useState({ name: "", amount: "", currency: "CRC", categoryId: "otros" });

  if (items === null) {
    return <Card title="Gastos fijos"><p className="text-sm text-muted">Cargando…</p></Card>;
  }

  const add = async () => {
    if (!nuevo.name.trim() || !(Number(nuevo.amount) > 0)) return;
    await addItem({ ...nuevo, name: nuevo.name.trim() });
    setNuevo({ name: "", amount: "", currency: "CRC", categoryId: "otros" });
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
              className="w-24 text-right font-mono"
              defaultValue={item.amount}
              onBlur={(e) => commit(item, "amount", e.target.value)}
            />
            <Select
              className="w-16 !px-1"
              value={item.currency}
              onChange={(e) => commit(item, "currency", e.target.value)}
            >
              <option value="CRC">₡</option>
              <option value="USD">$</option>
            </Select>
            <Select
              className="w-14 !px-1.5 text-center"
              value={item.categoryId}
              onChange={(e) => commit(item, "categoryId", e.target.value)}
              title="Categoría"
            >
              {profile.categories.map((c) => (
                <option key={c.id} value={c.id}>{c.emoji}</option>
              ))}
            </Select>
            <button
              type="button"
              onClick={() => removeItem(item.id).then(() => showToast("Gasto fijo eliminado"))}
              className="text-muted hover:text-bad text-lg px-1"
              title="Eliminar"
            >
              ×
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
          className="w-24 text-right font-mono"
          placeholder="Monto"
          value={nuevo.amount}
          onChange={(e) => setNuevo({ ...nuevo, amount: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <Select
          className="w-14 !px-1.5 text-center"
          value={nuevo.categoryId}
          onChange={(e) => setNuevo({ ...nuevo, categoryId: e.target.value })}
        >
          {profile.categories.map((c) => (
            <option key={c.id} value={c.id}>{c.emoji}</option>
          ))}
        </Select>
        <Btn variant="soft" onClick={add} disabled={!nuevo.name.trim() || !(Number(nuevo.amount) > 0)}>
          +
        </Btn>
      </div>
    </Card>
  );
}
