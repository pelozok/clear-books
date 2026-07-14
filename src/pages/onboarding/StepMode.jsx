import { Field, Input, Segmented } from "../../components/ui.jsx";

const MODES = [
  { value: "individual", emoji: "🧍", title: "Individual", desc: "Un salario. Tu presupuesto personal." },
  { value: "pareja",     emoji: "💑", title: "Pareja",     desc: "Dos salarios. El presupuesto del hogar." },
];

export default function StepMode({ mode, setMode, frequency, setFrequency, people, setPeople }) {
  const setName = (i, name) =>
    setPeople(people.map((p, j) => (j === i ? { ...p, name } : p)));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-ink2 mb-2">¿Cómo es tu presupuesto?</p>
        <div className="grid grid-cols-2 gap-3">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              className={`text-left p-4 rounded-2xl border-2 transition ${
                mode === m.value ? "border-accent bg-accent-soft" : "border-line bg-white hover:border-muted"
              }`}
            >
              <div className="text-2xl mb-1.5">{m.emoji}</div>
              <div className="text-sm font-bold text-ink">{m.title}</div>
              <div className="text-xs text-ink2 mt-0.5 leading-snug">{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-ink2 mb-2">¿Cada cuánto recibís el salario?</p>
        <Segmented
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: "mensual",   label: "Mensual" },
            { value: "quincenal", label: "Quincenal" },
          ]}
        />
        <p className="text-[11px] text-muted mt-1.5">
          {frequency === "quincenal"
            ? "Todo se organiza por quincena: del 1 al 15 y del 16 a fin de mes."
            : "Todo se organiza por mes calendario."}
        </p>
      </div>

      {mode && (
        <div className="space-y-3">
          {people.map((p, i) => (
            <Field key={p.id} label={mode === "pareja" ? `Nombre de la persona ${i + 1}` : "Tu nombre"}>
              <Input
                value={p.name}
                onChange={(e) => setName(i, e.target.value)}
                placeholder={i === 0 ? "Ej: Kevin" : "Ej: Ale"}
              />
            </Field>
          ))}
        </div>
      )}
    </div>
  );
}
