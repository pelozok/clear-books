import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Card, Btn, Input } from "../../components/ui.jsx";
import { COLOR_PALETTE } from "../../lib/constants.js";
import { CATEGORY_ICONS, CategoryIcon } from "../../lib/icons.jsx";

const ICON_NAMES = Object.keys(CATEGORY_ICONS);

// Editor de categorías: ícono, nombre, color y presupuesto por período.
export default function CategorySettings({ profile, saveProfile, showToast }) {
  const [cats, setCats] = useState(profile.categories.map((c) => ({ ...c })));
  const [pickingIcon, setPickingIcon] = useState(null); // índice con el picker abierto
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
        icon: "tag",
        color: COLOR_PALETTE[cats.length % COLOR_PALETTE.length],
        budget: 0,
      },
    ]);

  const valid = cats.length > 0 && cats.every((c) => c.label.trim());

  const save = async () => {
    setSaving(true);
    await saveProfile({
      categories: cats.map(({ emoji, ...c }) => ({
        ...c,
        icon: c.icon || "tag",
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
          <div key={c.id}>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={() => setPickingIcon(pickingIcon === i ? null : i)}
                className={`w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center hover:bg-bg2 ${
                  pickingIcon === i ? "border-accent bg-accent-soft" : "border-line"
                }`}
                title="Cambiar ícono"
              >
                <CategoryIcon category={c} size={17} />
              </button>
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
                className="!w-28 text-right font-mono"
                value={c.budget || ""}
                onChange={(e) => setCat(i, "budget", e.target.value)}
                placeholder="₡ ppto."
                title={`Presupuesto ${per}`}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-muted hover:text-bad p-1"
                title="Eliminar"
              >
                <X size={16} />
              </button>
            </div>
            {pickingIcon === i && (
              <div className="flex flex-wrap gap-1.5 mt-2 p-2.5 bg-bg2 rounded-xl">
                {ICON_NAMES.map((name) => {
                  const Icon = CATEGORY_ICONS[name];
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => { setCat(i, "icon", name); setPickingIcon(null); }}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white ${
                        (c.icon || "tag") === name ? "bg-white shadow-sm text-accent" : "text-ink2"
                      }`}
                    >
                      <Icon size={17} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Btn variant="ghost" onClick={add} className="flex items-center gap-1.5">
          <Plus size={15} /> Agregar categoría
        </Btn>
        <Btn onClick={save} disabled={!valid || saving}>
          {saving ? "Guardando…" : "Guardar categorías"}
        </Btn>
      </div>
    </Card>
  );
}
