import { useEffect, useRef, useState } from "react";
import { useProfile } from "./data/useProfile.js";
import { useFixedTemplate } from "./data/useFixedTemplate.js";
import { usePeriod } from "./data/usePeriod.js";
import { useExpenses } from "./data/useExpenses.js";
import { currentPeriodKey } from "./lib/periods.js";
import { sumCRC } from "./lib/calc.js";
import { DEFAULT_RATE, fetchExchangeRate, shouldRefreshRate } from "./lib/exchange.js";
import { Toast } from "./components/ui.jsx";
import Header from "./components/Header.jsx";
import AddExpenseModal from "./components/AddExpenseModal.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import SoloDashboard from "./pages/SoloDashboard.jsx";
import CoupleDashboard from "./pages/CoupleDashboard.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

function Loading({ text = "Cargando…" }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-muted text-sm font-medium tracking-widest uppercase">{text}</div>
    </div>
  );
}

function DashboardShell({ uid, profile, onOpenHistory, onOpenSettings, onSignOut, showToast }) {
  const [periodKey, setPeriodKey] = useState(() => currentPeriodKey(profile.frequency));
  useEffect(() => {
    setPeriodKey(currentPeriodKey(profile.frequency));
  }, [profile.frequency]);

  const { items: template } = useFixedTemplate(uid);
  const { period, togglePaid, patchFixedItem, updatePeriod } = usePeriod(uid, periodKey, profile, template);
  const { expenses, addExpense, removeExpense } = useExpenses(uid, periodKey);
  const [adding, setAdding] = useState(false);

  const rate = period?.exchangeRate ?? profile.exchangeRate ?? DEFAULT_RATE;

  // El período EN CURSO sigue el tipo de cambio del día; los pasados
  // conservan el snapshot con el que se vivieron.
  useEffect(() => {
    if (!period || periodKey !== currentPeriodKey(profile.frequency)) return;
    const today = Number(profile.exchangeRate);
    if (today > 0 && period.exchangeRate !== today) {
      updatePeriod({ exchangeRate: today });
    }
  }, [period?.exchangeRate, profile.exchangeRate, profile.frequency, periodKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const body = (() => {
    if (!period) {
      return <div className="text-center text-muted text-sm py-16">Preparando el período…</div>;
    }
    const income = profile.people.reduce((s, p) => {
      const inc = period.incomes?.[p.id] || {};
      return s + (Number(inc.crc) || 0) + (Number(inc.usd) || 0) * rate;
    }, 0);
    const totals = {
      income,
      fixed: sumCRC(period.fixedItems, rate),
      variable: sumCRC(expenses || [], rate),
    };
    const Dash = profile.mode === "pareja" ? CoupleDashboard : SoloDashboard;
    return (
      <Dash
        profile={profile}
        period={period}
        expenses={expenses}
        rate={rate}
        totals={totals}
        onTogglePaid={togglePaid}
        onPatchItem={patchFixedItem}
        onAddExpense={() => setAdding(true)}
        onRemoveExpense={(id) => removeExpense(id).then(() => showToast("Gasto borrado"))}
      />
    );
  })();

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-16">
      <Header
        profile={profile}
        rate={rate}
        periodKey={periodKey}
        setPeriodKey={setPeriodKey}
        onOpenHistory={onOpenHistory}
        onOpenSettings={onOpenSettings}
        onSignOut={onSignOut}
      />
      {body}
      {adding && (
        <AddExpenseModal
          periodKey={periodKey}
          categories={profile.categories}
          onSave={(data) => addExpense(data).then(() => showToast("Gasto agregado"))}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  );
}

export default function App({ user, onSignOut }) {
  const { profile, saveProfile } = useProfile(user.uid);
  const [page, setPage] = useState("dashboard"); // "dashboard" | "settings" | "history"
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  // Refresca el tipo de cambio una vez al día (y una vez al migrar a la fuente BCCR).
  const rateStale =
    !!profile &&
    (profile.exchangeRateSource !== "bccr" || shouldRefreshRate(profile.exchangeRateUpdatedAt));
  useEffect(() => {
    if (!rateStale) return;
    fetchExchangeRate()
      .then((rate) =>
        saveProfile({
          exchangeRate: rate,
          exchangeRateSource: "bccr",
          exchangeRateUpdatedAt: new Date().toISOString(),
        })
      )
      .catch(() => {});
  }, [rateStale]); // eslint-disable-line react-hooks/exhaustive-deps

  if (profile === undefined) return <Loading />;
  if (profile === null || !profile.onboardingComplete) return <OnboardingPage uid={user.uid} />;

  return (
    <div className="min-h-screen bg-bg">
      {page === "settings" ? (
        <SettingsPage
          uid={user.uid}
          profile={profile}
          saveProfile={saveProfile}
          onBack={() => setPage("dashboard")}
          showToast={showToast}
        />
      ) : page === "history" ? (
        <HistoryPage uid={user.uid} profile={profile} onBack={() => setPage("dashboard")} />
      ) : (
        <DashboardShell
          uid={user.uid}
          profile={profile}
          onOpenHistory={() => setPage("history")}
          onOpenSettings={() => setPage("settings")}
          onSignOut={onSignOut}
          showToast={showToast}
        />
      )}
      <Toast message={toast} />
    </div>
  );
}
