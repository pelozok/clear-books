import { useState } from "react";
import { Modal, Field, Input, Select, Segmented, Btn } from "./ui.jsx";
import { periodDateRange, defaultDateFor } from "../lib/periods.js";

export default function AddExpenseModal({ periodKey, categories, onSave, onClose }) {
  const range = periodDateRange(periodKey);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    currency: "CRC",
    categoryId: categories[0]?.id || "otros",
    date: defaultDateFor(periodKey),
  });
  const [saving, setSaving] = useState(false);
  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  const valid = Number(form.amount) > 0 && form.date >= range.start && form.date <= range.end;

  const save = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch {
      setSaving(false);
    }
  };

  return (
    <Modal title="Agregar gasto" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex gap-3 items-end">
          <Field label="Monto">
            <Input
              type="number" inputMode="decimal" min="0" autoFocus
              value={form.amount}
              onChange={(e) => set("amount")(e.target.value)}
              placeholder="0"
            />
          </Field>
          <Segmented
            value={form.currency}
            onChange={set("currency")}
            options={[{ value: "CRC", label: "₡" }, { value: "USD", label: "$" }]}
          />
        </div>

        <Field label="Descripción" hint="Opcional">
          <Input
            value={form.description}
            onChange={(e) => set("description")(e.target.value)}
            placeholder="Ej: Farmacia"
          />
        </Field>

        <Field label="Categoría">
          <Select value={form.categoryId} onChange={(e) => set("categoryId")(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
            ))}
          </Select>
        </Field>

        <Field label="Fecha" hint="Dentro del período actual">
          <Input
            type="date"
            min={range.start} max={range.end}
            value={form.date}
            onChange={(e) => set("date")(e.target.value)}
          />
        </Field>

        <Btn className="w-full" onClick={save} disabled={!valid || saving}>
          {saving ? "Guardando…" : "Guardar gasto"}
        </Btn>
      </div>
    </Modal>
  );
}
