import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { RefreshCw, WifiOff } from 'lucide-react'
import AuthGate from './AuthGate.jsx'
import { HouseholdProvider, useHousehold } from './data/HouseholdContext.jsx'
import { Button, EmptyState, ToastProvider } from './components/ui/index.js'
import AppShell from './components/layout/AppShell.jsx'
import MonthSkeleton from './components/layout/MonthSkeleton.jsx'
import UpdatePrompt from './components/layout/UpdatePrompt.jsx'
import { monthKey, todayISO } from './lib/periods.js'
import MonthPage from './pages/MonthPage.jsx'
import NewEntryPage from './pages/NewEntryPage.jsx'
import SavingsPage from './pages/SavingsPage.jsx'
import ClosePage from './pages/ClosePage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import ToolsPage from './pages/ToolsPage.jsx'
import ToolPage from './pages/ToolPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'

const CurrentMonth = () => <Navigate to={`/mes/${monthKey(todayISO())}`} replace />

/** Espera el hogar: skeleton mientras carga, error con reintentar, onboarding si falta. */
function RequireHousehold() {
  const { loading, error, profile } = useHousehold()
  if (loading) {
    return (
      <AppShell>
        <MonthSkeleton />
      </AppShell>
    )
  }
  if (error) {
    return (
      <AppShell>
        <EmptyState
          icon={WifiOff}
          title="No pudimos cargar tus datos"
          body={error.message || String(error)}
          action={
            <Button variant="secondary" icon={RefreshCw} onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          }
          className="pt-24"
        />
      </AppShell>
    )
  }
  if (!profile?.onboardingComplete) return <Navigate to="/onboarding" replace />
  return <Outlet />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route element={<RequireHousehold />}>
        <Route element={<AppShell />}>
          <Route index element={<CurrentMonth />} />
          <Route path="mes" element={<CurrentMonth />} />
          <Route path="mes/:key" element={<MonthPage />} />
          <Route path="gasto/nuevo" element={<NewEntryPage />} />
          <Route path="ahorro" element={<SavingsPage />} />
          <Route path="cerrar/:key" element={<ClosePage />} />
          <Route path="historial" element={<HistoryPage />} />
          <Route path="herramientas" element={<ToolsPage />} />
          <Route path="herramientas/:tool" element={<ToolPage />} />
          <Route path="ajustes" element={<SettingsPage />} />
          <Route path="ajustes/:section" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthGate>
      <HouseholdProvider>
        <ToastProvider>
          <UpdatePrompt />
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </ToastProvider>
      </HouseholdProvider>
    </AuthGate>
  )
}
