import { useState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import { storage } from "./storage.js";
import * as XLSX from "xlsx";
import { T, FONTS, fontSans, fontBody, fontMono, DEFAULT_CATEGORIES } from "./lib/constants.js";
import { fetchExchangeRate, toCRC, fmt, fmtUSD, getCat, getBudgets, todayISO, monthKey, monthLabel, nextMonthKey } from "./lib/helpers.js";
import { Field } from "./components/ui.jsx";
import { Header } from "./components/Header.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { SettingsPage } from "./components/SettingsPage.jsx";

export default function App({ user, onSignOut }) {
  const [loading,        setLoading]        = useState(true);
  const [config,         setConfig]         = useState(null);
  const [expenses,       setExpenses]       = useState([]);
  const [page,           setPage]           = useState("dashboard");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentMonth,   setCurrentMonth]   = useState(nextMonthKey());

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
            savingsRate: cfg.savingsRate, createdAt: cfg.createdAt,
            incomeUSD: wasUSD ? cfg.income : 0, incomeCRC: wasUSD ? 0 : cfg.income,
            exchangeRate: 515, exchangeRateUpdatedAt: null,
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

  const exportExcel = () => {
    const cats = config.categories?.length ? config.categories : DEFAULT_CATEGORIES;
    const rate = config.exchangeRate || 515;
    const wb   = XLSX.utils.book_new();

    const gastoRows = [...expenses]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(e => {
        const cat = getCat(e.category, cats);
        return {
          Fecha: e.date, Categoría: cat.label, Tipo: cat.type === "necesidad" ? "Necesidad" : "Deseo",
          Descripción: e.description || "", Moneda: e.currency || "CRC", Monto: e.amount,
          "Monto CRC": Math.round(toCRC(e.amount, e.currency || "CRC", rate)),
        };
      });
    const ws1 = XLSX.utils.json_to_sheet(gastoRows.length ? gastoRows : [{ Fecha: "", Categoría: "", Tipo: "", Descripción: "", Moneda: "", Monto: 0, "Monto CRC": 0 }]);
    ws1["!cols"] = [{ wch: 12 }, { wch: 18 }, { wch: 12 }, { wch: 28 }, { wch: 8 }, { wch: 12 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws1, "Gastos");

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
          Mes: monthLabel(mk), "Total gastos": total, Necesidades: necesidades, Deseos: deseos,
          Ingreso: Math.round(totalIncomeCRC), "Meta ahorro": Math.round(totalIncomeCRC * (config.savingsRate / 100)),
          Disponible: Math.round(totalIncomeCRC - total),
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

  const categories = config.categories || [];

  return (
    <div style={{ background: T.bg, color: T.ink, ...fontBody }} className="min-h-screen">
      <style>{FONTS}</style>
      {page === "settings" ? (
        <SettingsPage
          config={config} categories={categories} expenses={expenses} currentMonth={currentMonth}
          onSave={async (c, newExpenses) => { await saveConfig(c); if (newExpenses) await saveExpenses(newExpenses); setPage("dashboard"); }}
          onBack={() => setPage("dashboard")}
          onClearAll={async () => { await saveExpenses([]); setPage("dashboard"); }}
          onImport={async (cfg, exps) => { if (cfg) await saveConfig(cfg); if (exps) await saveExpenses(exps); setPage("dashboard"); }}
          onExportExcel={exportExcel}
          onSignOut={onSignOut}
          user={user}
        />
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <Header
            config={config} user={user} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}
            months={availableMonths(expenses, currentMonth)}
            onOpenSettings={() => setPage("settings")} onSignOut={onSignOut}
          />
          <Dashboard
            config={config} expenses={expenses} currentMonth={currentMonth} categories={categories}
            onAdd={(exp) => saveExpenses([exp, ...expenses])}
            onDelete={(id) => saveExpenses(expenses.filter(e => e.id !== id))}
            onExport={exportExcel}
            onOpenSettings={() => setPage("settings")}
          />
        </div>
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

function Onboarding({ onDone }) {
  const [payFrequency,      setPayFrequency]      = useState("mensual");
  const [incomeUSD,         setIncomeUSD]         = useState("");
  const [incomeCRC,         setIncomeCRC]         = useState("");
  const [savingsBalanceUSD, setSavingsBalanceUSD]  = useState("");
  const [savingsRate,       setSavingsRate]       = useState(20);
  const [exchangeRate,      setExchangeRate]      = useState("");
  const [fetchingRate,      setFetchingRate]      = useState(true);

  const freqLabel = payFrequency === "quincenal" ? "por quincena" : "mensual";

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
            Todos los datos se guardan en la nube, asociados a tu cuenta.
          </p>
        </div>
        <div className="space-y-5">
          <Field label="Frecuencia de pago">
            <div className="flex gap-2">
              {[["mensual", "Mensual"], ["quincenal", "Quincenal"]].map(([val, lbl]) => (
                <button key={val} onClick={() => setPayFrequency(val)}
                  style={{
                    background: payFrequency === val ? T.accent : "white",
                    color: payFrequency === val ? "white" : T.ink2,
                    borderColor: payFrequency === val ? T.accent : T.line,
                  }}
                  className="flex-1 py-3 border rounded-xl text-sm font-semibold transition">
                  {lbl}
                </button>
              ))}
            </div>
            {payFrequency === "quincenal" && (
              <div style={{ color: T.muted }} className="text-xs mt-2">
                Ingresá lo que recibís cada quincena — calculamos el total mensual automáticamente (×2).
              </div>
            )}
          </Field>

          <Field label={`Ingreso ${freqLabel} en dólares`} hint="Dejá en 0 si no tenés ingreso en USD">
            <div className="flex items-center gap-2">
              <span style={{ ...fontMono, color: T.muted }} className="text-lg w-5">$</span>
              <input type="number" value={incomeUSD} onChange={e => setIncomeUSD(e.target.value)}
                placeholder="0" autoFocus
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                className="flex-1 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
            </div>
          </Field>
          <Field label={`Ingreso ${freqLabel} en colones`} hint="Dejá en 0 si no tenés ingreso en CRC">
            <div className="flex items-center gap-2">
              <span style={{ ...fontMono, color: T.muted }} className="text-lg w-5">₡</span>
              <input type="number" value={incomeCRC} onChange={e => setIncomeCRC(e.target.value)}
                placeholder="0"
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                className="flex-1 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
            </div>
          </Field>
          <Field label="Saldo cuenta USD" hint="Lo que tenés ahorrado ahora">
            <div className="flex items-center gap-2">
              <span style={{ ...fontMono, color: T.muted }} className="text-lg w-5">$</span>
              <input type="number" value={savingsBalanceUSD} onChange={e => setSavingsBalanceUSD(e.target.value)}
                placeholder="0"
                style={{ background: "white", borderColor: T.line, color: T.ink, ...fontMono }}
                className="flex-1 px-4 py-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
            </div>
          </Field>
          <Field label="Tipo de cambio" hint="Colones por dólar">
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
                onChange={e => setSavingsRate(+e.target.value)} className="flex-1" style={{ accentColor: T.accent }} />
              <div style={{ ...fontMono, color: T.accent }} className="text-2xl font-semibold w-16 text-right">{savingsRate}%</div>
            </div>
            <div style={{ color: T.muted }} className="text-xs mt-2">
              Recomendado: 20% (regla 50/30/20). Si recién empezás, 10% ya es excelente.
            </div>
          </Field>
          <button
            disabled={!valid}
            onClick={() => onDone({
              payFrequency,
              incomeUSD: parseFloat(incomeUSD) || 0, incomeCRC: parseFloat(incomeCRC) || 0,
              savingsBalanceUSD: parseFloat(savingsBalanceUSD) || 0, savingsRate,
              exchangeRate: parseFloat(exchangeRate) || 515,
              exchangeRateUpdatedAt: new Date().toISOString(), createdAt: new Date().toISOString(),
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
