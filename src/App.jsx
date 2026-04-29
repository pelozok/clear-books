import { useState, useEffect, useMemo, useRef } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Plus, Trash2, Pencil, LogOut,
  Wallet, PiggyBank, Settings, X, Download, Upload,
  TrendingDown, TrendingUp, Sparkles, RefreshCw, DollarSign,
  AlertCircle, ChevronDown
} from "lucide-react";
import { storage } from "./storage.js";
import * as XLSX from "xlsx";

// ── Paleta moderna ────────────────────────────────────
const T = {
  bg:         "#f8fafc",
  bg2:        "#f1f5f9",
  ink:        "#0f172a",
  ink2:       "#475569",
  muted:      "#94a3b8",
  line:       "#e2e8f0",
  accent:     "#4f46e5",
  accentSoft: "#eef2ff",
  good:       "#059669",
  warn:       "#d97706",
  bad:        "#dc2626",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
`;

const fontSans    = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
const fontDisplay = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontWeight: 700 };
const fontBody    = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
const fontMono    = { fontFamily: "'JetBrains Mono', monospace" };

// ── Datos maestros ────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { id: "vivienda",        label: "Vivienda",        emoji: "🏠", type: "necesidad", color: "#4f46e5" },
  { id: "alimentacion",   label: "Alimentación",    emoji: "🍽️", type: "necesidad", color: "#7c3aed" },
  { id: "transporte",     label: "Transporte",      emoji: "🚗", type: "necesidad", color: "#0891b2" },
  { id: "servicios",      label: "Servicios",       emoji: "⚡",  type: "necesidad", color: "#0369a1" },
  { id: "salud",          label: "Salud",           emoji: "❤️", type: "necesidad", color: "#0f766e" },
  { id: "educacion",      label: "Educación",       emoji: "📚", type: "deseo",     color: "#059669" },
  { id: "entretenimiento",label: "Entretenimiento", emoji: "🎬", type: "deseo",     color: "#d97706" },
  { id: "ropa",           label: "Ropa",            emoji: "👕", type: "deseo",     color: "#db2777" },
  { id: "otros",          label: "Otros",           emoji: "💰", type: "deseo",     color: "#64748b" },
];

const COLOR_PALETTE = [
  "#4f46e5","#7c3aed","#0891b2","#0369a1","#0f766e",
  "#059669","#d97706","#dc2626","#db2777","#64748b","#92400e","#1d4ed8",
];

const getCat = (id, cats) => cats.find(c => c.id === id) || cats[cats.length - 1];

const DEFAULT_BUDGET_PCTS = {
  vivienda: 0.25, alimentacion: 0.15, transporte: 0.05, servicios: 0.03, salud: 0.02,
  educacion: 0.08, entretenimiento: 0.10, ropa: 0.07, otros: 0.05,
};

const getBudgets = (config, totalIncomeCRC, cats) =>
  Object.fromEntries(
    cats.map(c => [
      c.id,
      config.budgets?.[c.id] ?? Math.round(totalIncomeCRC * (DEFAULT_BUDGET_PCTS[c.id] || 0)),
    ])
  );

// ── Helpers ───────────────────────────────────────────
const fetchExchangeRate = async () => {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("HTTP error");
  const data = await res.json();
  if (!data.rates?.CRC) throw new Error("No CRC in response");
  return Math.round(data.rates.CRC);
};

const toCRC = (amount, currency, rate) => currency === "USD" ? amount * rate : amount;

const fmt = (n) => {
  if (n == null || isNaN(n)) return "₡0";
  return `₡${Math.round(n).toLocaleString("es-CR")}`;
};

const fmtUSD = (n) => {
  if (n == null || isNaN(n)) return "$0";
  return `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

const fmtAmount = (amount, currency) => currency === "USD" ? fmtUSD(amount) : fmt(amount);

const todayISO   = () => new Date().toISOString().slice(0, 10);
const monthKey   = (iso) => iso.slice(0, 7);
const monthLabel = (key) => {
  const [y, m] = key.split("-");
  return `${["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][+m-1]} ${y}`;
};

const nextMonthKey = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return monthKey(d.toISOString());
};

// ── App ───────────────────────────────────────────────
export default function App({ user, onSignOut }) {
  const [loading,         setLoading]         = useState(true);
  const [config,          setConfig]          = useState(null);
  const [expenses,        setExpenses]        = useState([]);
  const [showSettings,    setShowSettings]    = useState(false);
  const [showOnboarding,  setShowOnboarding]  = useState(false);
  const [currentMonth,    setCurrentMonth]    = useState(nextMonthKey());

  useEffect(() => {
    (async () => {
      try {
        let cfg = null;
        try {
          const r = await storage.get("finance:config");
          cfg = r ? JSON.parse(r.value) : null;
        } catch { cfg = null; }

        if (cfg && cfg.income !== undefined && cfg.incomeUSD === undefined) {
          const wasUSD = cfg.currency === "USD";
          cfg = {
            savingsRate: cfg.savingsRate,
            createdAt: cfg.createdAt,
            incomeUSD: wasUSD ? cfg.income : 0,
            incomeCRC: wasUSD ? 0 : cfg.income,
            exchangeRate: 515,
            exchangeRateUpdatedAt: null,
          };
          await storage.set("finance:config", JSON.stringify(cfg));
        }

        let exps = [];
        try {
          const r = await storage.get("finance:expenses");
          exps = r ? JSON.parse(r.value) : [];
        } catch { exps = []; }

        if (!cfg) setShowOnboarding(true);
        else setConfig(cfg);
        setExpenses(exps);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveConfig = async (next) => {
    setConfig(next);
    try { await storage.set("finance:config", JSON.stringify(next)); }
    catch (e) { console.error(e); }
  };

  const saveExpenses = async (next) => {
    setExpenses(next);
    try { await storage.set("finance:expenses", JSON.stringify(next)); }
    catch (e) { console.error(e); }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ config, expenses }, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `finanzas-${todayISO()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportExcel = () => {
    const cats = config.categories?.length ? config.categories : DEFAULT_CATEGORIES;
    const rate = config.exchangeRate || 515;
    const wb = XLSX.utils.book_new();

    // Hoja 1: todos los gastos
    const gastoRows = [...expenses]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(e => {
        const cat = getCat(e.category, cats);
        return {
          Fecha:        e.date,
          Categoría:    cat.label,
          Tipo:         cat.type === "necesidad" ? "Necesidad" : "Deseo",
          Descripción:  e.description || "",
          Moneda:       e.currency || "CRC",
          Monto:        e.amount,
          "Monto CRC":  Math.round(toCRC(e.amount, e.currency || "CRC", rate)),
        };
      });
    const ws1 = XLSX.utils.json_to_sheet(gastoRows.length ? gastoRows : [{ Fecha: "", Categoría: "", Tipo: "", Descripción: "", Moneda: "", Monto: 0, "Monto CRC": 0 }]);
    ws1["!cols"] = [{ wch: 12 }, { wch: 18 }, { wch: 12 }, { wch: 28 }, { wch: 8 }, { wch: 12 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws1, "Gastos");

    // Hoja 2: resumen por mes
    const totalIncomeCRC = (config.incomeCRC || 0) + (config.incomeUSD || 0) * rate;
    const byMonth = {};
    expenses.forEach(e => {
      const mk = monthKey(e.date);
      if (!byMonth[mk]) byMonth[mk] = [];
      byMonth[mk].push(e);
    });
    const resumenRows = Object.entries(byMonth)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([mk, exps]) => {
        const total       = Math.round(exps.reduce((s, e) => s + toCRC(e.amount, e.currency || "CRC", rate), 0));
        const necesidades = Math.round(exps.filter(e => getCat(e.category, cats).type === "necesidad").reduce((s, e) => s + toCRC(e.amount, e.currency || "CRC", rate), 0));
        const deseos      = Math.round(exps.filter(e => getCat(e.category, cats).type === "deseo").reduce((s, e) => s + toCRC(e.amount, e.currency || "CRC", rate), 0));
        return {
          Mes:            monthLabel(mk),
          "Total gastos": total,
          Necesidades:    necesidades,
          Deseos:         deseos,
          Ingreso:        Math.round(totalIncomeCRC),
          "Meta ahorro":  Math.round(totalIncomeCRC * (config.savingsRate / 100)),
          Disponible:     Math.round(totalIncomeCRC - total),
        };
      });
    const ws2 = XLSX.utils.json_to_sheet(resumenRows.length ? resumenRows : [{}]);
    ws2["!cols"] = [{ wch: 18 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws2, "Resumen mensual");

    XLSX.writeFile(wb, `finanzas-${todayISO()}.xlsx`);
  };

  if (loading) {
    return (
      <div style={{ background: T.bg, ...fontBody }} className="min-h-screen flex items-center justify-center">
        <style>{FONTS}</style>
        <div style={{ color: T.muted }} className="text-sm font-medium tracking-wider uppercase">Cargando…</div>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onDone={async (cfg) => { await saveConfig(cfg); setShowOnboarding(false); }} />;
  }

  const categories = config.categories?.length ? config.categories : DEFAULT_CATEGORIES;

  return (
    <div style={{ background: T.bg, color: T.ink, ...fontBody }} className="min-h-screen">
      <style>{FONTS}</style>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <Header
          config={config}
          user={user}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          months={availableMonths(expenses, currentMonth)}
          onOpenSettings={() => setShowSettings(true)}
          onSignOut={onSignOut}
        />
        <Dashboard
          config={config}
          expenses={expenses}
          currentMonth={currentMonth}
          categories={categories}
          onAdd={(exp) => saveExpenses([exp, ...expenses])}
          onDelete={(id) => saveExpenses(expenses.filter(e => e.id !== id))}
          onExport={exportExcel}
        />
      </div>

      {showSettings && (
        <SettingsModal
          config={config}
          categories={categories}
          expenses={expenses}
          onSave={async (c, newExpenses) => {
            await saveConfig(c);
            if (newExpenses) await saveExpenses(newExpenses);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
          onClearAll={async () => { await saveExpenses([]); setShowSettings(false); }}
          onImport={async (cfg, exps) => {
            if (cfg) await saveConfig(cfg);
            if (exps) await saveExpenses(exps);
            setShowSettings(false);
          }}
        />
      )}
    </div>
  );
}

function availableMonths(expenses, currentKey) {
  const set = new Set(expenses.map(e => monthKey(e.date)));
  set.add(currentKey);
  set.add(monthKey(todayISO()));
  set.add(nextMonthKey());
  return Array.from(set).sort().reverse();
}

// ── Onboarding ────────────────────────────────────────
function Onboarding({ onDone }) {
  const [incomeUSD,        setIncomeUSD]        = useState("");
  const [incomeCRC,        setIncomeCRC]        = useState("");
  const [savingsBalanceUSD,setSavingsBalanceUSD] = useState("");
  const [savingsRate,      setSavingsRate]      = useState(20);
  const [exchangeRate,     setExchangeRate]     = useState("");
  const [fetchingRate,     setFetchingRate]     = useState(true);

  useEffect(() => {
    fetchExchangeRate()
      .then(r => setExchangeRate(r.toString()))
      .catch(() => setExchangeRate("515"))
      .finally(() => setFetchingRate(false));
  }, []);

  const refresh = async () => {
    setFetchingRate(true);
    try { const r = await fetchExchangeRate(); setExchangeRate(r.toString()); }
    catch { /* keep current */ }
    finally { setFetchingRate(false); }
  };

  const valid = (parseFloat(incomeUSD) > 0 || parseFloat(incomeCRC) > 0) && parseFloat(exchangeRate) > 0;

  return (
    <div style={{ background: T.bg, color: T.ink, ...fontBody }} className="min-h-screen flex items-center justify-center px-5 py-10">
      <style>{FONTS}</style>
      <div className="w-full max-w-lg">
        <div className="mb-10">
          <div style={{ color: T.accent }} className="text-xs font-semibold tracking-[0.2em] uppercase mb-4">Bienvenido</div>
          <h1 style={{ ...fontSans, fontWeight: 800, color: T.ink }} className="text-5xl sm:text-6xl leading-[1.05] tracking-tight">
            Tu libro de<br/><em style={{ color: T.accent, fontStyle: "italic", fontWeight: 700 }}>finanzas</em> personales.
          </h1>
          <p style={{ color: T.ink2 }} className="mt-5 text-base leading-relaxed">
            Todos los datos se guardan solo en este dispositivo.
          </p>
        </div>

        <div className="space-y-5">
          <Field label="Ingreso mensual en dólares" hint="Dejá en 0 si no tenés ingreso en USD">
            <div className="flex items-center gap-2">
              <span style={{ ...fontMono, color: T.muted }} className="text-lg w-5">$</span>
              <input type="number" value={incomeUSD} onChange={e => setIncomeUSD(e.target.value)}
                placeholder="0" autoFocus
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                className="flex-1 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
            </div>
          </Field>

          <Field label="Ingreso mensual en colones" hint="Dejá en 0 si no tenés ingreso en CRC">
            <div className="flex items-center gap-2">
              <span style={{ ...fontMono, color: T.muted }} className="text-lg w-5">₡</span>
              <input type="number" value={incomeCRC} onChange={e => setIncomeCRC(e.target.value)}
                placeholder="0"
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                className="flex-1 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
            </div>
          </Field>

          <Field label="Saldo cuenta USD" hint="Lo que tenés ahorrado ahora — podés actualizarlo en Ajustes cuando cambie">
            <div className="flex items-center gap-2">
              <span style={{ ...fontMono, color: T.muted }} className="text-lg w-5">$</span>
              <input type="number" value={savingsBalanceUSD} onChange={e => setSavingsBalanceUSD(e.target.value)}
                placeholder="0"
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                className="flex-1 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
            </div>
          </Field>

          <Field label="Tipo de cambio" hint="Colones por dólar · se usa para convertir gastos en USD">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span style={{ ...fontMono, color: T.muted }} className="text-sm">₡</span>
                <input type="number" value={exchangeRate} onChange={e => setExchangeRate(e.target.value)}
                  placeholder="515" disabled={fetchingRate}
                  style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                  className="flex-1 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
                <span style={{ color: T.muted }} className="text-xs whitespace-nowrap">por USD</span>
              </div>
              <button onClick={refresh} disabled={fetchingRate}
                style={{ borderColor: T.line, color: T.ink2, background: "white" }}
                className="px-4 py-3 border rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 transition disabled:opacity-40">
                <RefreshCw size={14} className={fetchingRate ? "animate-spin" : ""} />
                {fetchingRate ? "…" : "Actualizar"}
              </button>
            </div>
          </Field>

          <Field label="Meta de ahorro" hint="% del ingreso total que querés ahorrar cada mes">
            <div className="flex items-center gap-4">
              <input type="range" min="0" max="50" step="5" value={savingsRate}
                onChange={e => setSavingsRate(+e.target.value)}
                className="flex-1" style={{ accentColor: T.accent }} />
              <div style={{ ...fontMono, color: T.accent }} className="text-2xl font-semibold w-16 text-right">{savingsRate}%</div>
            </div>
            <div style={{ color: T.muted }} className="text-xs mt-2">
              Recomendado: 20% (regla 50/30/20). Si recién empezás, 10% ya es excelente.
            </div>
          </Field>

          <button
            disabled={!valid}
            onClick={() => onDone({
              incomeUSD: parseFloat(incomeUSD) || 0,
              incomeCRC: parseFloat(incomeCRC) || 0,
              savingsBalanceUSD: parseFloat(savingsBalanceUSD) || 0,
              savingsRate,
              exchangeRate: parseFloat(exchangeRate) || 515,
              exchangeRateUpdatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            })}
            style={{ background: valid ? T.accent : T.line, color: valid ? "white" : T.muted, cursor: valid ? "pointer" : "not-allowed" }}
            className="w-full py-4 rounded-xl text-sm tracking-[0.15em] uppercase font-semibold transition hover:opacity-90">
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label style={{ color: T.ink, ...fontSans, fontWeight: 600 }} className="block text-sm mb-1">{label}</label>
      {hint && <div style={{ color: T.muted }} className="text-xs mb-2">{hint}</div>}
      {children}
    </div>
  );
}

// ── Header ────────────────────────────────────────────
function Header({ config, user, currentMonth, setCurrentMonth, months, onOpenSettings, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "";

  return (
    <header className="flex items-start justify-between mb-10 sm:mb-14">
      <div>
        {firstName && (
          <div style={{ color: T.ink2 }} className="text-sm font-medium mb-2">
            Hola, {firstName}
          </div>
        )}
        <h1 style={{ ...fontSans, fontWeight: 800, color: T.ink }} className="text-4xl sm:text-5xl tracking-tight leading-none">
          Finanzas
        </h1>
        <div className="mt-4">
          <select value={currentMonth} onChange={e => setCurrentMonth(e.target.value)}
            style={{ background: "white", borderColor: T.line, color: T.ink2, ...fontBody }}
            className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition">
            {months.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
          </select>
        </div>
      </div>

      {/* User menu */}
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ borderColor: T.line, background: "white" }}
          className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 border rounded-xl hover:bg-slate-50 transition shadow-sm">
          {user?.photoURL ? (
            <img src={user.photoURL} referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full" alt={firstName} />
          ) : (
            <div style={{ background: T.accent, color: "white" }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
              {firstName?.[0]?.toUpperCase()}
            </div>
          )}
          <ChevronDown size={13} style={{ color: T.muted, transition: "transform 200ms", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
        </button>

        {menuOpen && (
          <div style={{ background: "white", borderColor: T.line }}
            className="absolute right-0 top-full mt-2 w-60 rounded-2xl border shadow-lg overflow-hidden z-40">
            {/* User info */}
            <div style={{ borderColor: T.line }} className="flex items-center gap-3 px-4 py-3 border-b">
              {user?.photoURL ? (
                <img src={user.photoURL} referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full shrink-0" alt={firstName} />
              ) : (
                <div style={{ background: T.accent + "20", color: T.accent }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0">
                  {firstName?.[0]?.toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <div style={{ color: T.ink }} className="text-sm font-semibold truncate">{user?.displayName}</div>
                <div style={{ color: T.muted }} className="text-xs truncate">{user?.email}</div>
              </div>
            </div>
            {/* Actions */}
            <button
              onClick={() => { onOpenSettings(); setMenuOpen(false); }}
              style={{ color: T.ink2 }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-slate-50 transition">
              <Settings size={14} /> Configuración
            </button>
            <button
              onClick={onSignOut}
              style={{ color: T.ink2, borderColor: T.line }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-slate-50 transition border-t">
              <LogOut size={14} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// ── Dashboard ─────────────────────────────────────────
function Dashboard({ config, expenses, currentMonth, categories, onAdd, onDelete, onExport }) {
  const [showAdd, setShowAdd] = useState(false);

  const rate           = config.exchangeRate || 515;
  const totalIncomeCRC = (config.incomeCRC || 0) + (config.incomeUSD || 0) * rate;
  const hasSavingsCard = config.savingsBalanceUSD !== undefined;

  const incomeSubtitle = (() => {
    const hasUSD = (config.incomeUSD || 0) > 0;
    const hasCRC = (config.incomeCRC || 0) > 0;
    if (hasUSD && hasCRC) return `${fmtUSD(config.incomeUSD)} + ${fmt(config.incomeCRC)}`;
    if (hasUSD) return `${fmtUSD(config.incomeUSD)} · T.C. ₡${rate.toLocaleString("es-CR")}`;
    return null;
  })();

  const monthExpenses = useMemo(
    () => expenses.filter(e => monthKey(e.date) === currentMonth),
    [expenses, currentMonth]
  );

  const totals = useMemo(() => {
    const total = monthExpenses.reduce((s, e) => s + toCRC(e.amount, e.currency || "CRC", rate), 0);
    const byCat = {}, byType = { necesidad: 0, deseo: 0 };
    monthExpenses.forEach(e => {
      const amtCRC = toCRC(e.amount, e.currency || "CRC", rate);
      byCat[e.category] = (byCat[e.category] || 0) + amtCRC;
      const catType = getCat(e.category, categories).type;
      byType[catType] = (byType[catType] || 0) + amtCRC;
    });
    return { total, byCat, byType };
  }, [monthExpenses, rate, categories]);

  const savingsGoal = totalIncomeCRC * (config.savingsRate / 100);
  const remaining   = totalIncomeCRC - totals.total;
  const disponible  = totalIncomeCRC - savingsGoal - totals.total;
  const budgets     = getBudgets(config, totalIncomeCRC, categories);

  const gridCols = hasSavingsCard
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    : "grid-cols-2 lg:grid-cols-4";

  return (
    <>
      <section className={`grid ${gridCols} gap-3 sm:gap-4 mb-8`}>
        <SummaryCard label="Ingreso" value={fmt(totalIncomeCRC)} subtitle={incomeSubtitle} icon={Wallet} tone="ink" />
        <SummaryCard
          label="Gastos del mes" value={fmt(totals.total)}
          subtitle={`${totalIncomeCRC > 0 ? Math.round(totals.total / totalIncomeCRC * 100) : 0}% del ingreso`}
          icon={TrendingDown} tone="bad" />
        <SummaryCard
          label="Disponible para gastar"
          value={fmt(disponible)}
          subtitle={disponible < 0 ? "Estás usando tus ahorros" : "Después de apartar el ahorro"}
          icon={TrendingUp} tone={disponible < 0 ? "bad" : "good"} />
        <SummaryCard
          label="Meta de ahorro" value={fmt(savingsGoal)}
          subtitle={`${config.savingsRate}% del ingreso`}
          icon={PiggyBank} tone="accent" />
        {hasSavingsCard && (
          <SummaryCard
            label="Cuenta USD"
            value={fmtUSD(config.savingsBalanceUSD)}
            subtitle={`≈ ${fmt((config.savingsBalanceUSD || 0) * rate)}`}
            icon={DollarSign} tone="accent" />
        )}
      </section>

      <SavingsAlertBanner remaining={remaining} savingsGoal={savingsGoal} savingsRate={config.savingsRate} />

      <SavingsBar progress={remaining} goal={savingsGoal} />

      <div className="my-8 flex items-center gap-3 flex-wrap">
        <button onClick={() => setShowAdd(true)}
          style={{ background: T.accent, color: "white" }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm tracking-wide font-semibold hover:opacity-90 transition shadow-sm">
          <Plus size={16} /> Agregar gasto
        </button>
        <button onClick={onExport}
          style={{ borderColor: T.line, color: T.ink2, background: "white" }}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border hover:bg-slate-50 transition shadow-sm">
          <Download size={15} /> Exportar datos
        </button>
      </div>

      <BudgetSection byCat={totals.byCat} budgets={budgets} categories={categories} />

      {monthExpenses.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
          <Card className="lg:col-span-2">
            <CardTitle>Por categoría</CardTitle>
            <CategoryChart byCat={totals.byCat} categories={categories} />
          </Card>
          <Card className="lg:col-span-3">
            <CardTitle>Necesidades vs. deseos</CardTitle>
            <NeedsVsWantsChart byType={totals.byType} income={totalIncomeCRC} />
          </Card>
        </section>
      ) : (
        <EmptyState onAdd={() => setShowAdd(true)} />
      )}

      <Suggestions income={totalIncomeCRC} totals={totals} config={config} expensesCount={monthExpenses.length} />

      {monthExpenses.length > 0 && (
        <section className="mt-10">
          <h2 style={{ ...fontDisplay, color: T.ink }} className="text-xl font-bold mb-5">Movimientos del mes</h2>
          <ExpenseList expenses={monthExpenses} exchangeRate={rate} onDelete={onDelete} categories={categories} />
        </section>
      )}

      {showAdd && (
        <AddExpenseModal
          currentMonth={currentMonth}
          categories={categories}
          onAdd={(exp) => { onAdd(exp); setShowAdd(false); }}
          onClose={() => setShowAdd(false)} />
      )}
    </>
  );
}

// ── UI primitives ─────────────────────────────────────
function SummaryCard({ label, value, subtitle, icon: Icon, tone }) {
  const toneColor = { ink: T.ink, good: T.good, bad: T.bad, accent: T.accent }[tone] || T.ink;
  return (
    <div style={{ background: "white", borderColor: T.line }} className="p-4 sm:p-5 rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div style={{ color: T.muted }} className="text-[10px] font-semibold tracking-[0.15em] uppercase">{label}</div>
        <div style={{ background: toneColor + "12", color: toneColor }} className="w-7 h-7 rounded-lg flex items-center justify-center">
          <Icon size={13} />
        </div>
      </div>
      <div style={{ ...fontMono, color: toneColor }} className="text-xl sm:text-2xl font-semibold tabular-nums">{value}</div>
      {subtitle && <div style={{ color: T.muted }} className="text-[11px] mt-1.5 font-medium">{subtitle}</div>}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div style={{ background: "white", borderColor: T.line }} className={`p-5 sm:p-6 rounded-2xl border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return <h3 style={{ ...fontDisplay, color: T.ink }} className="text-base font-bold mb-4 tracking-tight">{children}</h3>;
}

// ── SavingsBar ────────────────────────────────────────
function SavingsBar({ progress, goal }) {
  const pct     = goal > 0 ? Math.max(0, Math.min(100, (progress / goal) * 100)) : 0;
  const reached = progress >= goal && goal > 0;
  return (
    <div style={{ background: "white", borderColor: T.line }} className="border rounded-2xl shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <div style={{ color: T.muted }} className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">Progreso de ahorro</div>
          <div style={{ ...fontSans, fontWeight: 700, color: T.ink }} className="text-xl">
            {fmt(Math.max(0, progress))}
            <span style={{ color: T.muted }} className="text-sm font-medium ml-2">de {fmt(goal)}</span>
          </div>
        </div>
        <div style={{ ...fontMono, color: reached ? T.good : T.accent }} className="text-3xl font-bold">
          {Math.round(pct)}%
        </div>
      </div>
      <div style={{ background: T.bg2 }} className="h-2.5 rounded-full overflow-hidden">
        <div
          style={{ width: `${pct}%`, background: reached ? T.good : T.accent }}
          className="h-full rounded-full transition-all duration-700" />
      </div>
    </div>
  );
}

// ── Charts ────────────────────────────────────────────
function CategoryChart({ byCat, categories }) {
  const data  = Object.entries(byCat)
    .map(([id, value]) => ({ id, name: getCat(id, categories).label, value, color: getCat(id, categories).color }))
    .sort((a, b) => b.value - a.value);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-44 h-44 shrink-0">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={2} stroke="none">
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip
              contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 12, fontFamily: "'Plus Jakarta Sans'" }}
              labelStyle={{ color: "white" }} itemStyle={{ color: "white" }}
              formatter={(v) => fmt(v)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 w-full space-y-2">
        {data.map(d => (
          <div key={d.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <div style={{ background: d.color }} className="w-2 h-2 rounded-full shrink-0" />
              <span style={{ color: T.ink2 }} className="truncate text-xs font-medium">{d.name}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span style={{ color: T.muted, ...fontMono }} className="text-[11px]">{Math.round(d.value / total * 100)}%</span>
              <span style={{ ...fontMono, color: T.ink }} className="text-xs tabular-nums font-medium">{fmt(d.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeedsVsWantsChart({ byType, income }) {
  const data = [
    { name: "Necesidades", actual: byType.necesidad || 0, ideal: income * 0.5, color: T.accent },
    { name: "Deseos",      actual: byType.deseo || 0,     ideal: income * 0.3, color: "#7c3aed" },
    { name: "Ahorro",      actual: Math.max(0, income - (byType.necesidad || 0) - (byType.deseo || 0)), ideal: income * 0.2, color: T.good },
  ];
  return (
    <div>
      <div className="text-xs mb-3 font-medium" style={{ color: T.muted }}>
        Comparado con la regla 50/30/20 (necesidades / deseos / ahorro)
      </div>
      <div className="h-52">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: T.muted, fontFamily: "'Plus Jakarta Sans'" }} axisLine={{ stroke: T.line }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: T.muted }} axisLine={false} tickLine={false}
              tickFormatter={(v) => fmt(v).replace(/[^\d]/g, '').slice(0, -3) + 'K'} />
            <Tooltip
              contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 12, fontFamily: "'Plus Jakarta Sans'" }}
              labelStyle={{ color: "white" }} itemStyle={{ color: "white" }}
              formatter={(v) => fmt(v)} />
            <Bar dataKey="ideal" fill={T.bg2} radius={[6, 6, 0, 0]} name="Ideal" />
            <Bar dataKey="actual" radius={[6, 6, 0, 0]} name="Real">
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Suggestions ───────────────────────────────────────
function Suggestions({ income, totals, config, expensesCount }) {
  const tips = [];
  const idealSavings = income * (config.savingsRate / 100);
  const actualSavings = income - totals.total;

  if (expensesCount === 0) {
    tips.push({ tone: "neutral", title: "Empezá registrando tus gastos",
      text: "Aún no tenés gastos este mes. Registrá todo, hasta lo más pequeño — ahí está el aprendizaje." });
  } else {
    if (totals.byType.necesidad > income * 0.5 * 1.1)
      tips.push({ tone: "warn", title: "Tus necesidades pasan del 50%",
        text: `Estás gastando ${fmt(totals.byType.necesidad)} en necesidades. Lo recomendado serían ${fmt(income * 0.5)}.` });
    if (totals.byType.deseo > income * 0.3 * 1.1)
      tips.push({ tone: "warn", title: "Los gastos discrecionales están altos",
        text: `Has gastado ${fmt(totals.byType.deseo)} en deseos. El máximo recomendado este mes sería ${fmt(income * 0.3)}.` });
    if (actualSavings >= idealSavings && idealSavings > 0)
      tips.push({ tone: "good", title: "Vas por buen camino",
        text: `Llevás ${fmt(actualSavings)} disponibles. Si lo mantenés, alcanzás tu meta de ${fmt(idealSavings)}.` });
    if (actualSavings < 0)
      tips.push({ tone: "bad", title: "Estás gastando más de lo que ingresás",
        text: `Llevás ${fmt(Math.abs(actualSavings))} de sobregiro. Identificá el gasto más grande y preguntate si era esencial.` });
    if (actualSavings >= 0 && actualSavings < idealSavings)
      tips.push({ tone: "neutral", title: "Te falta poco para tu meta",
        text: `Necesitás ${fmt(idealSavings - actualSavings)} más para llegar al ${config.savingsRate}% de ahorro.` });
  }

  if (tips.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 style={{ ...fontDisplay, color: T.ink }} className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles size={16} style={{ color: T.accent }} /> Sugerencias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((t, i) => {
          const s = {
            good:    { bg: "#f0fdf4", border: "#bbf7d0", color: T.good },
            warn:    { bg: "#fffbeb", border: "#fde68a", color: T.warn },
            bad:     { bg: "#fef2f2", border: "#fecaca", color: T.bad },
            neutral: { bg: "white",   border: T.line,    color: T.ink2 },
          }[t.tone];
          return (
            <div key={i} style={{ background: s.bg, borderColor: s.border }} className="p-5 rounded-2xl border">
              <div className="flex items-center gap-2 mb-1.5">
                <div style={{ background: s.color }} className="w-2 h-2 rounded-full shrink-0" />
                <div style={{ color: s.color, ...fontSans, fontWeight: 700 }} className="text-sm">{t.title}</div>
              </div>
              <p style={{ color: T.ink2 }} className="text-sm leading-relaxed">{t.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── ExpenseList ───────────────────────────────────────
function ExpenseList({ expenses, exchangeRate, onDelete, categories }) {
  return (
    <div style={{ background: "white", borderColor: T.line }} className="border rounded-2xl shadow-sm overflow-hidden">
      {expenses.map((e, i) => {
        const cat    = getCat(e.category, categories);
        const expCur = e.currency || "CRC";
        const isUSD  = expCur === "USD";
        return (
          <div key={e.id}
            style={{ borderColor: i === expenses.length - 1 ? "transparent" : T.line }}
            className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b group hover:bg-slate-50 transition">
            <div className="flex items-center gap-3 min-w-0">
              <div style={{ background: cat.color + "15", color: cat.color }}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg">
                {cat.emoji}
              </div>
              <div className="min-w-0">
                <div style={{ color: T.ink }} className="text-sm font-semibold truncate">{e.description || cat.label}</div>
                <div style={{ color: T.muted }} className="text-xs flex items-center gap-1.5 mt-0.5">
                  <span>{cat.label}</span><span>·</span><span>{formatDate(e.date)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div style={{ ...fontMono, color: T.ink }} className="tabular-nums font-semibold text-sm">
                  {fmtAmount(e.amount, expCur)}
                </div>
                {isUSD && (
                  <div style={{ color: T.muted, ...fontMono }} className="text-[10px] tabular-nums">
                    ≈ {fmt(e.amount * exchangeRate)}
                  </div>
                )}
              </div>
              <button onClick={() => onDelete(e.id)} style={{ color: T.muted }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition p-1 rounded-lg" aria-label="Eliminar">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatDate(iso) {
  const [, m, d] = iso.split("-");
  return `${+d} ${["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"][+m-1]}`;
}

// ── EmptyState ────────────────────────────────────────
function EmptyState({ onAdd }) {
  return (
    <div style={{ borderColor: T.line, background: "white" }} className="border-2 border-dashed rounded-2xl p-10 text-center">
      <div style={{ background: T.accentSoft, color: T.accent }} className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <PiggyBank size={26} />
      </div>
      <h3 style={{ ...fontDisplay, color: T.ink }} className="text-xl font-bold mb-2">Sin movimientos este mes</h3>
      <p style={{ color: T.muted }} className="text-sm mb-6 max-w-sm mx-auto leading-relaxed">
        Registrá tu primer gasto para ver el dashboard completo con gráficas y sugerencias.
      </p>
      <button onClick={onAdd} style={{ background: T.accent, color: "white" }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm">
        <Plus size={15} /> Agregar el primero
      </button>
    </div>
  );
}

// ── AddExpenseModal ───────────────────────────────────
function AddExpenseModal({ onAdd, onClose, currentMonth, categories }) {
  const [amount,      setAmount]      = useState("");
  const [currency,    setCurrency]    = useState("CRC");
  const [category,    setCategory]    = useState(categories[0]?.id || "");
  const defaultDate = monthKey(todayISO()) === currentMonth ? todayISO() : `${currentMonth}-01`;
  const [date,        setDate]        = useState(defaultDate);
  const [description, setDescription] = useState("");

  const valid = parseFloat(amount) > 0;

  const submit = () => {
    if (!valid) return;
    onAdd({
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      amount: parseFloat(amount), currency, category, date,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Modal onClose={onClose} title="Nuevo gasto">
      <div className="space-y-5">
        <Field label="Monto">
          <div className="flex gap-2 mb-3">
            {["CRC", "USD"].map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                style={{
                  background: currency === c ? T.accent : "white",
                  color: currency === c ? "white" : T.ink2,
                  borderColor: currency === c ? T.accent : T.line,
                }}
                className="px-4 py-1.5 border rounded-lg text-xs font-semibold tracking-wide transition">
                {c === "CRC" ? "₡ Colones" : "$ Dólares"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span style={{ ...fontMono, color: T.muted }} className="text-2xl">{currency === "USD" ? "$" : "₡"}</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0" autoFocus
              style={{ background: "transparent", borderColor: T.line, color: T.ink, ...fontMono }}
              className="flex-1 px-3 py-2 border-b-2 text-2xl font-semibold focus:outline-none transition"
              onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
        </Field>

        <Field label="Categoría">
          <div className="grid grid-cols-3 gap-2">
            {categories.map(c => {
              const sel = category === c.id;
              return (
                <button key={c.id} onClick={() => setCategory(c.id)}
                  style={{ borderColor: sel ? c.color : T.line, background: sel ? c.color + "12" : "white", color: sel ? c.color : T.ink2 }}
                  className="flex flex-col items-center gap-1.5 p-3 border rounded-xl text-xs font-medium transition">
                  <span className="text-lg leading-none">{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Fecha">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ background: "white", borderColor: T.line, color: T.ink, ...fontBody }}
            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
        </Field>

        <Field label="Descripción" hint="Opcional">
          <input type="text" value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Supermercado, gasolina…"
            style={{ background: "white", borderColor: T.line, color: T.ink, ...fontBody }}
            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
            onKeyDown={e => e.key === "Enter" && submit()} />
        </Field>

        <button onClick={submit} disabled={!valid}
          style={{ background: valid ? T.accent : T.line, color: valid ? "white" : T.muted, cursor: valid ? "pointer" : "not-allowed" }}
          className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide hover:opacity-90 transition">
          Guardar gasto
        </button>
      </div>
    </Modal>
  );
}

// ── SettingsModal ─────────────────────────────────────
function SettingsModal({ config, categories, expenses, onSave, onClose, onClearAll, onImport }) {
  const [incomeUSD,            setIncomeUSD]            = useState((config.incomeUSD || 0).toString());
  const [incomeCRC,            setIncomeCRC]            = useState((config.incomeCRC || 0).toString());
  const [savingsBalanceUSD,    setSavingsBalanceUSD]    = useState((config.savingsBalanceUSD ?? "").toString());
  const [savingsRate,          setSavingsRate]          = useState(config.savingsRate);
  const [exchangeRate,         setExchangeRate]         = useState((config.exchangeRate || 515).toString());
  const [rateUpdatedAt,        setRateUpdatedAt]        = useState(config.exchangeRateUpdatedAt || null);
  const [fetchingRate,         setFetchingRate]         = useState(false);
  const [showBudgets,          setShowBudgets]          = useState(false);
  const [showCategories,       setShowCategories]       = useState(false);
  const [customBudgets,        setCustomBudgets]        = useState(
    Object.fromEntries(categories.map(c => [c.id, config.budgets?.[c.id]?.toString() ?? ""]))
  );
  const [localCategories,      setLocalCategories]      = useState(categories);
  const [editingCat,           setEditingCat]           = useState(null);
  const [confirmDeleteCat,     setConfirmDeleteCat]     = useState(null);
  const [confirmRestoreDefaults, setConfirmRestoreDefaults] = useState(false);
  const [confirmClear,         setConfirmClear]         = useState(false);
  const [importError,          setImportError]          = useState(null);
  const fileRef = useRef(null);

  const handleRefreshRate = async () => {
    setFetchingRate(true);
    try { const r = await fetchExchangeRate(); setExchangeRate(r.toString()); setRateUpdatedAt(new Date().toISOString()); }
    catch { /* keep current */ }
    finally { setFetchingRate(false); }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ config, expenses }, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `finanzas-${todayISO()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const hasConfig   = data.config && typeof data.config === "object";
        const hasExpenses = Array.isArray(data.expenses);
        if (!hasConfig && !hasExpenses) { setImportError("El archivo no contiene datos válidos."); return; }
        if (expenses.length > 0 && !window.confirm("Ya tenés gastos guardados. ¿Sobrescribir con los del archivo?")) return;
        onImport(hasConfig ? data.config : null, hasExpenses ? data.expenses : null);
      } catch { setImportError("Error al leer el archivo. Verificá que sea un JSON válido."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const saveCat = () => {
    if (!editingCat.label.trim() || !editingCat.emoji.trim()) return;
    if (editingCat.isNew) {
      const newId = "cat_" + Date.now().toString(36);
      const newCat = { id: newId, label: editingCat.label.trim(), emoji: editingCat.emoji.trim(), type: editingCat.type, color: editingCat.color };
      setLocalCategories(prev => [...prev, newCat]);
    } else {
      setLocalCategories(prev => prev.map(c =>
        c.id === editingCat.id
          ? { ...c, label: editingCat.label.trim(), emoji: editingCat.emoji.trim(), type: editingCat.type, color: editingCat.color }
          : c
      ));
    }
    setEditingCat(null);
  };

  const deleteCat = (id) => {
    if (localCategories.length <= 1) return;
    setLocalCategories(prev => prev.filter(c => c.id !== id));
    setCustomBudgets(prev => { const next = { ...prev }; delete next[id]; return next; });
    setConfirmDeleteCat(null);
  };

  const handleSave = () => {
    const finalBudgets = {};
    localCategories.forEach(cat => {
      const v = parseFloat(customBudgets[cat.id]);
      if (!isNaN(v) && v >= 0) finalBudgets[cat.id] = v;
    });

    const currentIds = new Set(localCategories.map(c => c.id));
    const deletedIds = categories.map(c => c.id).filter(id => !currentIds.has(id));
    let updatedExpenses = null;
    if (deletedIds.length > 0) {
      const fallbackId = localCategories[localCategories.length - 1]?.id;
      const needsUpdate = expenses.some(e => deletedIds.includes(e.category));
      if (needsUpdate) {
        updatedExpenses = expenses.map(e =>
          deletedIds.includes(e.category) ? { ...e, category: fallbackId } : e
        );
      }
    }

    onSave({
      ...config,
      incomeUSD: parseFloat(incomeUSD) || 0,
      incomeCRC: parseFloat(incomeCRC) || 0,
      savingsBalanceUSD: savingsBalanceUSD !== "" ? parseFloat(savingsBalanceUSD) : config.savingsBalanceUSD,
      savingsRate,
      exchangeRate: parseFloat(exchangeRate) || 515,
      exchangeRateUpdatedAt: rateUpdatedAt,
      budgets: finalBudgets,
      categories: localCategories,
    }, updatedExpenses);
  };

  const inputCls = "flex-1 px-3 py-2.5 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";

  return (
    <Modal onClose={onClose} title="Ajustes">
      <div className="space-y-4">

        <Field label="Ingreso mensual en dólares">
          <div className="flex items-center gap-2">
            <span style={{ ...fontMono, color: T.muted }}>$</span>
            <input type="number" value={incomeUSD} onChange={e => setIncomeUSD(e.target.value)}
              style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
          </div>
        </Field>

        <Field label="Ingreso mensual en colones">
          <div className="flex items-center gap-2">
            <span style={{ ...fontMono, color: T.muted }}>₡</span>
            <input type="number" value={incomeCRC} onChange={e => setIncomeCRC(e.target.value)}
              style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
          </div>
        </Field>

        <Field label="Saldo cuenta USD" hint="Actualizalo cuando cambie tu balance">
          <div className="flex items-center gap-2">
            <span style={{ ...fontMono, color: T.muted }}>$</span>
            <input type="number" value={savingsBalanceUSD} onChange={e => setSavingsBalanceUSD(e.target.value)}
              style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
          </div>
        </Field>

        <div>
          <label style={{ color: T.ink, ...fontSans, fontWeight: 600 }} className="block text-sm mb-2">Tipo de cambio</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2">
              <span style={{ ...fontMono, color: T.muted }} className="text-sm">₡</span>
              <input type="number" value={exchangeRate} onChange={e => setExchangeRate(e.target.value)}
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
              <span style={{ color: T.muted }} className="text-xs whitespace-nowrap">por USD</span>
            </div>
            <button onClick={handleRefreshRate} disabled={fetchingRate}
              style={{ borderColor: T.line, color: T.ink2, background: "white" }}
              className="px-3 py-2.5 border rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 transition disabled:opacity-40">
              <RefreshCw size={13} className={fetchingRate ? "animate-spin" : ""} />
              {fetchingRate ? "…" : "Actualizar"}
            </button>
          </div>
          {rateUpdatedAt && (
            <div style={{ color: T.muted }} className="text-xs mt-1.5">
              Actualizado: {new Date(rateUpdatedAt).toLocaleDateString("es-CR", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          )}
        </div>

        <Field label="Meta de ahorro">
          <div className="flex items-center gap-4">
            <input type="range" min="0" max="50" step="5" value={savingsRate}
              onChange={e => setSavingsRate(+e.target.value)} className="flex-1" style={{ accentColor: T.accent }} />
            <div style={{ ...fontMono, color: T.accent }} className="text-xl font-bold w-12 text-right">{savingsRate}%</div>
          </div>
        </Field>

        {/* Categorías */}
        <div style={{ borderColor: T.line }} className="border rounded-xl overflow-hidden">
          <button onClick={() => { setShowCategories(!showCategories); setEditingCat(null); setConfirmDeleteCat(null); }}
            style={{ color: T.ink2 }}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-slate-50 transition">
            <span>Gestionar categorías</span>
            <ChevronDown size={15} style={{ transition: "transform 200ms", transform: showCategories ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          {showCategories && (
            <div style={{ borderColor: T.line }} className="border-t px-4 pb-4 pt-3 space-y-3">

              {/* Lista de categorías */}
              <div className="space-y-1.5">
                {localCategories.map(cat => {
                  const expCount = expenses.filter(e => e.category === cat.id).length;
                  const isConfirming = confirmDeleteCat === cat.id;
                  const remaining = localCategories.filter(c => c.id !== cat.id);
                  const fallbackLabel = remaining[remaining.length - 1]?.label;
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center gap-2 py-1">
                        <div style={{ background: cat.color + "18" }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base">
                          {cat.emoji}
                        </div>
                        <span style={{ color: T.ink }} className="flex-1 text-sm font-medium">{cat.label}</span>
                        <span style={{
                          background: cat.type === "necesidad" ? T.accent + "18" : "#7c3aed18",
                          color: cat.type === "necesidad" ? T.accent : "#7c3aed",
                        }} className="text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {cat.type === "necesidad" ? "Necesidad" : "Deseo"}
                        </span>
                        <button
                          onClick={() => { setEditingCat({ isNew: false, ...cat }); setConfirmDeleteCat(null); }}
                          style={{ color: T.muted }}
                          className="p-1 rounded hover:text-indigo-500 transition">
                          <Pencil size={12} />
                        </button>
                        {localCategories.length > 1 && (
                          <button
                            onClick={() => setConfirmDeleteCat(isConfirming ? null : cat.id)}
                            style={{ color: isConfirming ? T.bad : T.muted }}
                            className="p-1 rounded hover:text-red-500 transition">
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                      {isConfirming && (
                        <div style={{ background: "#fef2f2", borderColor: "#fecaca" }} className="mt-1 mb-1 p-3 rounded-xl border text-xs space-y-2">
                          {expCount > 0 ? (
                            <p style={{ color: T.bad }}>
                              Hay {expCount} gasto{expCount !== 1 ? "s" : ""} con esta categoría. Se reasignarán a "{fallbackLabel}".
                            </p>
                          ) : (
                            <p style={{ color: T.ink2 }}>¿Eliminar "{cat.label}"?</p>
                          )}
                          <div className="flex gap-2">
                            <button onClick={() => deleteCat(cat.id)}
                              style={{ background: T.bad, color: "white" }}
                              className="flex-1 py-1.5 rounded-lg text-xs font-semibold">Eliminar</button>
                            <button onClick={() => setConfirmDeleteCat(null)}
                              style={{ borderColor: T.line, color: T.ink2 }}
                              className="flex-1 py-1.5 rounded-lg border text-xs">Cancelar</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Botón nueva categoría */}
              {editingCat === null && (
                <button
                  onClick={() => { setEditingCat({ isNew: true, id: "", label: "", emoji: "📦", type: "necesidad", color: "#4f46e5" }); setConfirmDeleteCat(null); }}
                  style={{ color: T.accent }}
                  className="flex items-center gap-1.5 text-xs font-semibold hover:underline py-1">
                  <Plus size={13} /> Nueva categoría
                </button>
              )}

              {/* Formulario editar / nueva */}
              {editingCat !== null && (
                <div style={{ background: T.bg2, borderColor: T.line }} className="border rounded-xl p-3.5 space-y-3">
                  <div style={{ color: T.ink, ...fontSans, fontWeight: 700 }} className="text-xs tracking-wide uppercase">
                    {editingCat.isNew ? "Nueva categoría" : "Editar categoría"}
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-1">Emoji</div>
                      <input
                        type="text"
                        value={editingCat.emoji}
                        onChange={e => setEditingCat(p => ({ ...p, emoji: e.target.value }))}
                        maxLength={4}
                        style={{ background: "white", borderColor: T.line, color: T.ink, textAlign: "center", fontSize: "1.25rem" }}
                        className="w-14 px-2 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                    <div className="flex-1">
                      <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-1">Nombre</div>
                      <input
                        type="text"
                        value={editingCat.label}
                        onChange={e => setEditingCat(p => ({ ...p, label: e.target.value }))}
                        placeholder="Ej: Mascotas"
                        autoFocus
                        style={{ background: "white", borderColor: T.line, color: T.ink, ...fontBody }}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                        onKeyDown={e => e.key === "Enter" && saveCat()}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-1.5">Tipo</div>
                    <div className="flex gap-2">
                      {["necesidad", "deseo"].map(t => (
                        <button key={t}
                          onClick={() => setEditingCat(p => ({ ...p, type: t }))}
                          style={{
                            background: editingCat.type === t ? (t === "necesidad" ? T.accent : "#7c3aed") : "white",
                            color: editingCat.type === t ? "white" : T.ink2,
                            borderColor: editingCat.type === t ? (t === "necesidad" ? T.accent : "#7c3aed") : T.line,
                          }}
                          className="flex-1 py-1.5 border rounded-lg text-xs font-semibold transition">
                          {t === "necesidad" ? "Necesidad" : "Deseo"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ color: T.muted }} className="text-[10px] font-semibold mb-1.5">Color</div>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_PALETTE.map(c => (
                        <button key={c}
                          onClick={() => setEditingCat(p => ({ ...p, color: c }))}
                          style={{
                            background: c,
                            outline: editingCat.color === c ? `2px solid ${c}` : "none",
                            outlineOffset: "2px",
                          }}
                          className="w-6 h-6 rounded-full transition hover:scale-110"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={saveCat}
                      disabled={!editingCat.label.trim() || !editingCat.emoji.trim()}
                      style={{
                        background: editingCat.label.trim() && editingCat.emoji.trim() ? T.accent : T.line,
                        color: editingCat.label.trim() && editingCat.emoji.trim() ? "white" : T.muted,
                      }}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold transition">
                      {editingCat.isNew ? "Agregar" : "Guardar"}
                    </button>
                    <button onClick={() => setEditingCat(null)}
                      style={{ borderColor: T.line, color: T.ink2 }}
                      className="flex-1 py-2 rounded-lg border text-xs font-medium hover:bg-slate-50 transition">
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Restaurar defaults */}
              {!confirmRestoreDefaults ? (
                <button onClick={() => setConfirmRestoreDefaults(true)}
                  style={{ color: T.muted }} className="text-xs hover:underline block pt-1">
                  Restaurar categorías por defecto
                </button>
              ) : (
                <div style={{ background: "#fffbeb", borderColor: "#fde68a" }} className="p-3 rounded-xl border text-xs space-y-2">
                  <p style={{ color: T.warn }} className="font-semibold">Las categorías personalizadas se perderán. ¿Continuar?</p>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      setLocalCategories(DEFAULT_CATEGORIES);
                      setCustomBudgets(Object.fromEntries(DEFAULT_CATEGORIES.map(c => [c.id, config.budgets?.[c.id]?.toString() ?? ""])));
                      setConfirmRestoreDefaults(false);
                      setEditingCat(null);
                    }}
                      style={{ background: T.warn, color: "white" }}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold">Restaurar</button>
                    <button onClick={() => setConfirmRestoreDefaults(false)}
                      style={{ borderColor: T.line, color: T.ink2 }}
                      className="flex-1 py-1.5 rounded-lg border text-xs">Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Presupuesto por categoría */}
        <div style={{ borderColor: T.line }} className="border rounded-xl overflow-hidden">
          <button onClick={() => setShowBudgets(!showBudgets)}
            style={{ color: T.ink2 }}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-slate-50 transition">
            <span>Personalizar presupuesto por categoría</span>
            <ChevronDown size={15} style={{ transition: "transform 200ms", transform: showBudgets ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          {showBudgets && (() => {
            const calcRate  = parseFloat(exchangeRate) || 515;
            const calcTotal = (parseFloat(incomeCRC) || 0) + (parseFloat(incomeUSD) || 0) * calcRate;
            return (
              <div style={{ borderColor: T.line }} className="border-t px-4 pb-4 pt-3 space-y-4">
                <p style={{ color: T.muted }} className="text-xs">
                  Vacío = calculado automático según tu ingreso.
                </p>
                {["necesidad", "deseo"].map(type => (
                  <div key={type}>
                    <div style={{ color: T.muted }} className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                      {type === "necesidad" ? "Necesidades" : "Deseos"}
                    </div>
                    <div className="space-y-2">
                      {localCategories.filter(c => c.type === type).map(cat => {
                        const auto = Math.round(calcTotal * (DEFAULT_BUDGET_PCTS[cat.id] || 0));
                        return (
                          <div key={cat.id} className="flex items-center gap-2">
                            <div style={{ color: cat.color, background: cat.color + "15" }}
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm">
                              {cat.emoji}
                            </div>
                            <span style={{ color: T.ink2 }} className="text-xs font-medium w-28 shrink-0">{cat.label}</span>
                            <input type="number"
                              value={customBudgets[cat.id] ?? ""}
                              onChange={e => setCustomBudgets(p => ({ ...p, [cat.id]: e.target.value }))}
                              placeholder={auto > 0 ? auto.toString() : "0"}
                              style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                              className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <button onClick={() => setCustomBudgets(Object.fromEntries(localCategories.map(c => [c.id, ""])))}
                  style={{ color: T.muted }} className="text-xs hover:underline">
                  Restaurar automático
                </button>
              </div>
            );
          })()}
        </div>

        <button
          onClick={handleSave}
          style={{ background: T.accent, color: "white" }}
          className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide hover:opacity-90 transition">
          Guardar cambios
        </button>

        <div style={{ borderColor: T.line }} className="border-t pt-4 space-y-2.5">
          <button onClick={exportData} style={{ borderColor: T.line, color: T.ink2 }}
            className="w-full py-2.5 rounded-xl border text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2">
            <Download size={14} /> Exportar mis datos (JSON)
          </button>

          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleFileChange} />
          <button onClick={() => { setImportError(null); fileRef.current?.click(); }}
            style={{ borderColor: T.line, color: T.ink2 }}
            className="w-full py-2.5 rounded-xl border text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2">
            <Upload size={14} /> Importar datos (JSON)
          </button>
          {importError && <p style={{ color: T.bad }} className="text-xs px-1">{importError}</p>}

          {!confirmClear ? (
            <button onClick={() => setConfirmClear(true)} style={{ color: T.bad }}
              className="w-full py-2 text-xs font-medium hover:underline">
              Borrar todos los gastos
            </button>
          ) : (
            <div style={{ background: "#fef2f2", borderColor: "#fecaca" }} className="p-3 rounded-xl border text-xs space-y-2">
              <div style={{ color: T.bad }} className="font-semibold">¿Seguro? Esto no se puede deshacer.</div>
              <div className="flex gap-2">
                <button onClick={onClearAll} style={{ background: T.bad, color: "white" }}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold">Sí, borrar</button>
                <button onClick={() => setConfirmClear(false)} style={{ borderColor: T.line, color: T.ink2 }}
                  className="flex-1 py-2 rounded-lg border text-xs font-medium">Cancelar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

// ── SavingsAlertBanner ────────────────────────────────
function SavingsAlertBanner({ remaining, savingsGoal, savingsRate }) {
  if (remaining >= savingsGoal) return null;
  const critical = remaining < 0;
  const styles = critical
    ? { bg: "#fef2f2", border: "#fecaca", color: T.bad }
    : { bg: "#fffbeb", border: "#fde68a", color: T.warn };
  const msg = critical
    ? `Sobregirado ${fmt(Math.abs(remaining))} — estás gastando más de lo que ingresás este mes`
    : `Te faltan ${fmt(savingsGoal - remaining)} para alcanzar tu meta de ahorro del ${savingsRate}%`;
  return (
    <div style={{ background: styles.bg, borderColor: styles.border, color: styles.color }}
      className="border rounded-2xl px-4 py-3 flex items-start gap-3 mb-4">
      <AlertCircle size={17} className="shrink-0 mt-0.5" />
      <p className="text-sm font-semibold leading-snug">{msg}</p>
    </div>
  );
}

// ── BudgetSection ─────────────────────────────────────
function BudgetSection({ byCat, budgets, categories }) {
  const nec = categories.filter(c => c.type === "necesidad");
  const des = categories.filter(c => c.type === "deseo");
  const sumSpent  = cats => cats.reduce((s, c) => s + (byCat[c.id]  || 0), 0);
  const sumBudget = cats => cats.reduce((s, c) => s + (budgets[c.id] || 0), 0);
  const sortPct   = cats => [...cats].sort((a, b) =>
    (byCat[b.id] || 0) / (budgets[b.id] || 1) - (byCat[a.id] || 0) / (budgets[a.id] || 1)
  );
  return (
    <Card className="mb-8">
      <CardTitle>Presupuesto del mes</CardTitle>
      <div className="space-y-5">
        <BudgetGroup label="Necesidades" cats={sortPct(nec)} byCat={byCat} budgets={budgets}
          totalSpent={sumSpent(nec)} totalBudget={sumBudget(nec)} />
        <BudgetGroup label="Deseos" cats={sortPct(des)} byCat={byCat} budgets={budgets}
          totalSpent={sumSpent(des)} totalBudget={sumBudget(des)} />
      </div>
    </Card>
  );
}

function BudgetGroup({ label, cats, byCat, budgets, totalSpent, totalBudget }) {
  const over = totalSpent > totalBudget;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span style={{ color: T.muted }} className="text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
        <span style={{ ...fontMono }} className="text-xs tabular-nums">
          <span style={{ color: over ? T.bad : T.ink }}>{fmt(totalSpent)}</span>
          <span style={{ color: T.muted }}> / {fmt(totalBudget)}</span>
        </span>
      </div>
      <div className="space-y-2.5">
        {cats.map(cat => (
          <BudgetItem key={cat.id} cat={cat} spent={byCat[cat.id] || 0} budget={budgets[cat.id] || 0} />
        ))}
      </div>
    </div>
  );
}

function BudgetItem({ cat, spent, budget }) {
  const pct      = budget > 0 ? Math.min(spent / budget * 100, 100) : 0;
  const over     = spent > budget;
  const barColor = over || pct >= 90 ? T.bad : pct >= 70 ? T.warn : T.good;
  return (
    <div className="flex items-center gap-3">
      <div style={{ color: cat.color, background: cat.color + "15" }}
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm">
        {cat.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ color: T.ink2 }} className="text-xs font-semibold">{cat.label}</span>
          <span style={{ ...fontMono }} className="text-[11px] tabular-nums ml-2 shrink-0">
            <span style={{ color: over ? T.bad : T.ink }}>{fmt(spent)}</span>
            <span style={{ color: T.muted }}> / {fmt(budget)}</span>
          </span>
        </div>
        <div style={{ background: T.bg2 }} className="h-1.5 rounded-full overflow-hidden">
          <div style={{ width: `${pct}%`, background: barColor }}
            className="h-full rounded-full transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────
function Modal({ children, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ background: "rgba(15,23,42,0.5)" }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5">
      <div onClick={e => e.stopPropagation()} style={{ background: T.bg, color: T.ink, ...fontBody }}
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div style={{ borderColor: T.line }} className="flex items-center justify-between px-5 py-4 border-b">
          <h2 style={{ ...fontSans, fontWeight: 700, color: T.ink }} className="text-xl">{title}</h2>
          <button onClick={onClose} style={{ color: T.muted, background: T.bg2 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 transition">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
