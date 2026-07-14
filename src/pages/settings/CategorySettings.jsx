import { useState } from "react";
import { Card, Btn, Input } from "../../components/ui.jsx";
import { COLOR_PALETTE } from "../../lib/constants.js";

// Editor de categorías: emoji, nombre, color y presupuesto por período.
export default function CategorySettings({ profile, saveProfile, showToast }) {
  const [cats, setCats] = useState(profile.categories.map((c) => ({ ...c })));
  const [saving, setSaving] = useState(false);

  const per = profile.frequency === "quincenal" ? "por quincena" : "por mes";

  const setCat = (i, field, value) =>
    setCats(cats.map((c, j) => (j === i ? { ...c, [field]: value } : c)));

  const cycleColor = (i) => {
    const idx = COLOR_PALETTE.indexOf(cats[i].color);
    setCat(i, "color", COLOR_PALETTE[(idx + 1) % COLOR_PALETTE.length]);
  };

  const remove = (i) => setCats(cats.filter((_, j) => j !== i));

  const add = () =>
    setCats([
      ...cats,
      {
        id: "cat_" + Date.now().toString(36),
        label: "",
        emoji: "🏷️",
        color: COLOR_PALETTE[cats.length % COLOR_PALETTE.length],
        budget: 0,
      },
    ]);

  const valid = cats.length > 0 && cats.every((c) => c.label.trim());

  const save = async () => {
    setSaving(true);
    await saveProfile({
      categories: cats.map((c) => ({
        ...c,
        label: c.label.trim(),
        budget: Number(c.budget) || 0,
      })),
    });
    setSaving(false);
    showToast("Categorías guardadas");
  };

  return (
    <Card
      title="Categorías"
      subtitle={`El presupuesto es ${per}. Los gastos de una categoría borrada se muestran en la última.`}
    >
      <div className="space-y-2 mb-4">
        {cats.map((c, i) => (
          <div key={c.id} className="flex gap-2 items-center">
            <Input
              className="!w-12 text-center !px-1"
              value={c.emoji}
              onChange={(e) => setCat(i, "emoji", e.target.value)}
              title="Emoji"
            />
            <Input
              className="flex-1"
              value={c.label}
              onChange={(e) => setCat(i, "label", e.target.value)}
              placeholder="Nombre"
            />
            <button
              type="button"
              onClick={() => cycleColor(i)}
              className="w-8 h-8 shrink-0 rounded-lg border border-line"
              style={{ background: c.color }}
              title="Cambiar color"
            />
            <Input
              type="number" inputMode="numeric" min="0"
              className="w-28 text-right font-mono"
              value={c.budget || ""}
              onChange={(e) => setCat(i, "budget", e.target.value)}
              placeholder="₡ ppto."
              title={`Presupuesto ${per}`}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-muted hover:text-bad text-lg px-1"
              title="Eliminar"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Btn variant="ghost" onClick={add}>+ Agregar categoría</Btn>
        <Btn onClick={save} disabled={!valid || saving}>
          {saving ? "Guardando…" : "Guardar categorías"}
        </Btn>
      </div>
    </Card>
  );
}
