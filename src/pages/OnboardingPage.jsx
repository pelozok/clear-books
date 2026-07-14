import { useState } from "react";
import { Btn } from "../components/ui.jsx";
import { DEFAULT_CATEGORIES, FIXED_SUGGESTIONS } from "../lib/constants.js";
import { DEFAULT_RATE, fetchExchangeRate } from "../lib/exchange.js";
import { personIncomeCRC } from "../lib/calc.js";
import { createProfile } from "../data/useProfile.js";
import StepMode from "./onboarding/StepMode.jsx";
import StepIncomes from "./onboarding/StepIncomes.jsx";
import StepFixed from "./onboarding/StepFixed.jsx";

const TITLES = [
  { title: "Empecemos", sub: "Contanos cómo manejás tu plata." },
  { title: "Ingresos y ahorro", sub: "Los salarios y lo que querés apartar." },
  { title: "Gastos fijos", sub: "Los que se repiten todos los períodos." },
];

export default function OnboardingPage({ uid }) {
  const [step, setStep] = useState(0);
  const [mode, setModeRaw] = useState(null);
  const [frequency, setFrequency] = useState("mensual");
  const [people, setPeople] = useState([{ id: "p1", name: "", incomeCRC: "", incomeUSD: "" }]);
  const [savingsGoal, setSavingsGoal] = useState("");
  const [fixed, setFixed] = useState(
    FIXED_SUGGESTIONS.map((s) => ({ ...s, amount: "", currency: "CRC" }))
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const setMode = (m) => {
    setModeRaw(m);
    if (m === "pareja" && people.length === 1) {
      setPeople([...people, { id: "p2", name: "", incomeCRC: "", incomeUSD: "" }]);
    } else if (m === "individual" && people.length === 2) {
      setPeople(people.slice(0, 1));
    }
  };

  const totalIncome = people.reduce((s, p) => s + personIncomeCRC(p, DEFAULT_RATE), 0);
  const canContinue =
    step === 0 ? mode && people.every((p) => p.name.trim()) :
    step === 1 ? totalIncome > 0 :
    true;

  const finish = async () => {
    setSaving(true);
    setError(null);
    let rate = DEFAULT_RATE;
    try { rate = await fetchExchangeRate(); } catch { /* offline: se usa el default */ }
    try {
      await createProfile(
        uid,
        {
          mode,
          frequency,
          people: people.map((p) => ({
            id: p.id,
            name: p.name.trim(),
            incomeCRC: Number(p.incomeCRC) || 0,
            incomeUSD: Number(p.incomeUSD) || 0,
          })),
          savingsGoal: Number(savingsGoal) || 0,
          categories: DEFAULT_CATEGORIES,
          exchangeRate: rate,
          exchangeRateSource: "bccr",
          exchangeRateUpdatedAt: new Date().toISOString(),
        },
        fixed.filter((f) => f.name.trim() && Number(f.amount) > 0)
      );
      // El onSnapshot del perfil en App hace el resto (pasa al dashboard).
    } catch (e) {
      setError("No se pudo guardar. Revisá tu conexión e intentá de nuevo.");
      setSaving(false);
    }
  };

  const { title, sub } = TITLES[step];

  return (
    <div className="min-h-screen bg-bg flex justify-center px-4 py-8 sm:py-14">
      <div className="w-full max-w-lg">
        <div className="flex gap-1.5 mb-8">
          {TITLES.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-accent" : "bg-line"}`} />
          ))}
        </div>

        <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
        <p className="text-sm text-ink2 mt-1 mb-6">{sub}</p>

        {step === 0 && (
          <StepMode
            mode={mode} setMode={setMode}
            frequency={frequency} setFrequency={setFrequency}
            people={people} setPeople={setPeople}
          />
        )}
        {step === 1 && (
          <StepIncomes
            people={people} setPeople={setPeople}
            savingsGoal={savingsGoal} setSavingsGoal={setSavingsGoal}
            frequency={frequency} rate={DEFAULT_RATE}
          />
        )}
        {step === 2 && (
          <StepFixed
            fixed={fixed} setFixed={setFixed}
            frequency={frequency} rate={DEFAULT_RATE}
          />
        )}

        {error && <p className="text-xs text-bad mt-4">{error}</p>}

        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <Btn variant="ghost" onClick={() => setStep(step - 1)} disabled={saving}>Atrás</Btn>
          ) : <span />}
          {step < 2 ? (
            <Btn onClick={() => setStep(step + 1)} disabled={!canContinue}>Continuar</Btn>
          ) : (
            <Btn onClick={finish} disabled={saving}>
              {saving ? "Guardando…" : "Empezar"}
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}
