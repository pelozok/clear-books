import { useEffect, useRef, useState } from "react";
import { useProfile } from "./data/useProfile.js";
import { fetchExchangeRate, shouldRefreshRate } from "./lib/exchange.js";
import { Toast } from "./components/ui.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-muted text-sm font-medium tracking-widest uppercase">Cargando…</div>
    </div>
  );
}

export default function App({ user, onSignOut }) {
  const { profile, saveProfile } = useProfile(user.uid);
  const [page, setPage] = useState("dashboard"); // "dashboard" | "settings"
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  // Refresca el tipo de cambio una vez al día.
  const rateStale = profile && shouldRefreshRate(profile.exchangeRateUpdatedAt);
  useEffect(() => {
    if (!rateStale) return;
    fetchExchangeRate()
      .then((rate) => saveProfile({ exchangeRate: rate, exchangeRateUpdatedAt: new Date().toISOString() }))
      .catch(() => {});
  }, [rateStale]); // eslint-disable-line react-hooks/exhaustive-deps

  if (profile === undefined) return <Loading />;
  if (profile === null || !profile.onboardingComplete) return <OnboardingPage uid={user.uid} />;

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-sm text-ink2">
        <p>Perfil creado: modo <b>{profile.mode}</b>, frecuencia <b>{profile.frequency}</b>.</p>
        <p className="mt-2 text-muted">Dashboard en construcción…</p>
        <button onClick={onSignOut} className="mt-4 text-accent font-semibold">Cerrar sesión</button>
      </div>
      <Toast message={toast} />
    </div>
  );
}
