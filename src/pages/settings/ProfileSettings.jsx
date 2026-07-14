import { useState } from "react";
import { Card, Field, Input, Segmented, Btn } from "../../components/ui.jsx";
import { fetchExchangeRate } from "../../lib/exchange.js";

// Modo, frecuencia, salarios, ahorro y tipo de cambio.
// Los cambios aplican a períodos NUEVOS; los ya creados guardan su snapshot.
export default function ProfileSettings({ profile, saveProfile, showToast }) {
  const [draft, setDraft] = useState({
    mode: profile.mode,
    frequency: profile.frequency,
    people: profile.people.map((p) => ({ ...p })),
    savingsGoal: profile.savingsGoal || "",
    exchangeRate: profile.exchangeRate,
  });
  const [saving, setSaving] = useState(false);
  const [fetchingRate, setFetchingRate] = useState(false);

  const per = draft.frequency === "quincenal" ? "por quincena" : "por mes";

  const setMode = (mode) => {
    let people = draft.people;
    if (mode === "pareja" && people.length === 1) {
      people = [...people, { id: "p2", name: "", incomeCRC: 0, incomeUSD: 0 }];
    } else if (mode === "individual") {
      people = people.slice(0, 1);
    }
    setDraft({ ...draft, mode, people });
  };

  const setPerson = (i, field, value) =>
    setDraft({
      ...draft,
      people: draft.people.map((p, j) => (j === i ? { ...p, [field]: value } : p)),
    });

  const refreshRate = async () => {
    setFetchingRate(true);
    try {
      const rate = await fetchExchangeRate();
      setDraft((d) => ({ ...d, exchangeRate: rate }));
      showToast(`Tipo de cambio: ₡${rate}`);
    } catch {
      showToast("No se pudo obtener el tipo de cambio");
    }
    setFetchingRate(false);
  };

  const valid =
    draft.people.every((p) => p.name.trim()) && Number(draft.exchangeRate) > 0;

  const save = async () => {
    setSaving(true);
    await saveProfile({
      mode: draft.mode,
      frequency: draft.frequency,
      people: draft.people.map((p) => ({
        id: p.id,
        name: p.name.trim(),
        incomeCRC: Number(p.incomeCRC) || 0,
        incomeUSD: Number(p.incomeUSD) || 0,
      })),
      savingsGoal: Number(draft.savingsGoal) || 0,
      exchangeRate: Number(draft.exchangeRate),
      exchangeRateUpdatedAt: new Date().toISOString(),
    });
    setSaving(false);
    showToast("Perfil guardado");
  };

  return (
    <Card title="Perfil" subtitle="Los cambios aplican a los períodos nuevos; los pasados no se tocan.">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <p className="text-xs font-semibold text-ink2 mb-1.5">Modo</p>
            <Segmented
              value={draft.mode}
              onChange={setMode}
              options={[
                { value: "individual", label: "🧍 Individual" },
                { value: "pareja", label: "💑 Pareja" },
              ]}
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-ink2 mb-1.5">Frecuencia</p>
            <Segmented
              value={draft.frequency}
              onChange={(frequency) => setDraft({ ...draft, frequency })}
              options={[
                { value: "mensual", label: "Mensual" },
                { value: "quincenal", label: "Quincenal" },
              ]}
            />
          </div>
        </div>

        {draft.people.map((p, i) => (
          <div key={p.id} className="grid grid-cols-3 gap-3">
            <Field label={draft.mode === "pareja" ? `Persona ${i + 1}` : "Nombre"}>
              <Input value={p.name} onChange={(e) => setPerson(i, "name", e.target.value)} />
            </Field>
            <Field label={`Salario ₡ ${per}`}>
              <Input
                type="number" inputMode="numeric" min="0"
                value={p.incomeCRC}
                onChange={(e) => setPerson(i, "incomeCRC", e.target.value)}
              />
            </Field>
            <Field label={`Salario $ ${per}`}>
              <Input
                type="number" inputMode="numeric" min="0"
                value={p.incomeUSD}
                onChange={(e) => setPerson(i, "incomeUSD", e.target.value)}
              />
            </Field>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3">
          <Field label={`Meta de ahorro ₡ ${per}`} hint={draft.mode === "pareja" ? "Se divide 50/50." : null}>
            <Input
              type="number" inputMode="numeric" min="0"
              value={draft.savingsGoal}
              onChange={(e) => setDraft({ ...draft, savingsGoal: e.target.value })}
            />
          </Field>
          <Field label="Tipo de cambio (₡ por $)">
            <div className="flex gap-2">
              <Input
                type="number" inputMode="numeric" min="1"
                value={draft.exchangeRate}
                onChange={(e) => setDraft({ ...draft, exchangeRate: e.target.value })}
              />
              <Btn variant="ghost" onClick={refreshRate} disabled={fetchingRate} className="whitespace-nowrap">
                {fetchingRate ? "…" : "↻"}
              </Btn>
            </div>
          </Field>
        </div>

        <Btn onClick={save} disabled={!valid || saving}>
          {saving ? "Guardando…" : "Guardar perfil"}
        </Btn>
      </div>
    </Card>
  );
}
