import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ChevronDown, RefreshCw, Download, Upload, X } from "lucide-react";
import { T, fontSans, fontBody, fontMono, DEFAULT_BUDGET_PCTS } from "../lib/constants.js";
import { fetchExchangeRate, fmt, fmtUSD, monthLabel, todayISO } from "../lib/helpers.js";
import { Field, SettingsSection } from "./ui.jsx";
import { CategoryEditor } from "./settings/CategoryEditor.jsx";

export function SettingsPage({ config, categories, expenses, currentMonth, onSave, onBack, onClearAll, onImport, onExportExcel }) {
  const monthIncome = config.incomeByMonth?.[currentMonth];
  const [incomeUSD,          setIncomeUSD]          = useState(((monthIncome !== undefined ? monthIncome.incomeUSD : config.incomeUSD) || 0).toString());
  const [incomeCRC,          setIncomeCRC]          = useState(((monthIncome !== undefined ? monthIncome.incomeCRC : config.incomeCRC) || 0).toString());
  const [localIncomeByMonth, setLocalIncomeByMonth] = useState(config.incomeByMonth || {});
  const [showIncomeHistory,  setShowIncomeHistory]  = useState(false);
  const [savingsBalanceUSD,  setSavingsBalanceUSD]  = useState((config.savingsBalanceUSD ?? "").toString());
  const [savingsRate,        setSavingsRate]        = useState(config.savingsRate);
  const [exchangeRate,       setExchangeRate]       = useState((config.exchangeRate || 515).toString());
  const [rateUpdatedAt,      setRateUpdatedAt]      = useState(config.exchangeRateUpdatedAt || null);
  const [fetchingRate,       setFetchingRate]       = useState(false);
  const [customBudgets,      setCustomBudgets]      = useState(
    Object.fromEntries(categories.map(c => [c.id, config.budgets?.[c.id]?.toString() ?? ""]))
  );
  const [localCategories,    setLocalCategories]    = useState(categories);
  const [payFrequency,       setPayFrequency]       = useState(config.payFrequency || "mensual");
  const [confirmClear,       setConfirmClear]       = useState(false);
  const [importError,        setImportError]        = useState(null);
  const [activeSection,      setActiveSection]      = useState("ingresos");
  const fileRef = useRef(null);

  const navSections = [
    { id: "ingresos",    label: "Ingresos"       },
    { id: "ahorro",      label: "Ahorro"         },
    { id: "tc",          label: "Tipo de cambio" },
    { id: "categorias",  label: "Categorías"     },
    { id: "presupuesto", label: "Presupuesto"    },
    { id: "datos",       label: "Datos"          },
  ];

  useEffect(() => {
    const ids = navSections.map(s => s.id);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleRefreshRate = async () => {
    setFetchingRate(true);
    try { const r = await fetchExchangeRate(); setExchangeRate(r.toString()); setRateUpdatedAt(new Date().toISOString()); }
    catch { /* keep current */ }
    finally { setFetchingRate(false); }
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

  const handleSave = () => {
    const finalBudgets = {};
    localCategories.forEach(cat => {
      const v = parseFloat(customBudgets[cat.id]);
      if (!isNaN(v) && v >= 0) finalBudgets[cat.id] = v;
    });

    const currentIds  = new Set(localCategories.map(c => c.id));
    const deletedIds  = categories.map(c => c.id).filter(id => !currentIds.has(id));
    let updatedExpenses = null;
    if (deletedIds.length > 0) {
      const fallbackId   = localCategories[localCategories.length - 1]?.id;
      const needsUpdate  = expenses.some(e => deletedIds.includes(e.category));
      if (needsUpdate) updatedExpenses = expenses.map(e => deletedIds.includes(e.category) ? { ...e, category: fallbackId } : e);
    }

    onSave({
      ...config,
      payFrequency,
      savingsBalanceUSD: savingsBalanceUSD !== "" ? parseFloat(savingsBalanceUSD) : config.savingsBalanceUSD,
      savingsRate,
      exchangeRate: parseFloat(exchangeRate) || 515,
      exchangeRateUpdatedAt: rateUpdatedAt,
      budgets: finalBudgets,
      categories: localCategories,
      incomeByMonth: { ...localIncomeByMonth, [currentMonth]: { incomeUSD: parseFloat(incomeUSD) || 0, incomeCRC: parseFloat(incomeCRC) || 0 } },
    }, updatedExpenses);
  };

  const inputCls = "flex-1 px-3 py-2.5 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition";
  const calcRate     = parseFloat(exchangeRate) || 515;
  const calcPerPeriod = (parseFloat(incomeCRC) || 0) + (parseFloat(incomeUSD) || 0) * calcRate;
  const calcTotal    = calcPerPeriod * (payFrequency === "quincenal" ? 2 : 1);

  return (
    <div className="min-h-screen" style={{ background: T.bg, color: T.ink, ...fontBody }}>
      <header className="sticky top-0 z-30 border-b" style={{ background: "white", borderColor: T.line }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
          <button onClick={onBack} style={{ color: T.ink2 }}
            className="flex items-center gap-2 text-sm font-semibold hover:text-indigo-600 transition shrink-0">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Inicio</span>
          </button>
          <div style={{ color: T.ink, ...fontSans, fontWeight: 700 }} className="text-sm tracking-tight">Ajustes</div>
          <button onClick={handleSave} style={{ background: T.accent, color: "white" }}
            className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm shrink-0">
            Guardar
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 pb-16">
        <div className="flex gap-10 items-start">
          <aside className="hidden md:block w-44 shrink-0 sticky top-20 self-start">
            <div style={{ color: T.muted }} className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 px-3">Secciones</div>
            <nav className="space-y-0.5">
              {navSections.map(s => (
                <a key={s.id} href={`#${s.id}`} onClick={() => setActiveSection(s.id)}
                  className="flex items-center px-3 py-2 rounded-md text-sm transition"
                  style={{
                    background: "transparent",
                    color: activeSection === s.id ? T.accent : T.ink2,
                    fontWeight: activeSection === s.id ? 600 : 400,
                    borderLeft: activeSection === s.id ? `2px solid ${T.accent}` : "2px solid transparent",
                    textDecoration: "none",
                  }}>
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <main className="flex-1 space-y-6 min-w-0">
            <SettingsSection id="ingresos" title="Ingresos" subtitle={`Ingreso de ${monthLabel(currentMonth)} · cada mes puede tener su propio valor`}>
              <Field label="Frecuencia de pago">
                <div className="flex gap-2">
                  {[["mensual", "Mensual"], ["quincenal", "Quincenal"]].map(([val, lbl]) => (
                    <button key={val} onClick={() => setPayFrequency(val)}
                      style={{
                        background: payFrequency === val ? T.accent : "white",
                        color: payFrequency === val ? "white" : T.ink2,
                        borderColor: payFrequency === val ? T.accent : T.line,
                      }}
                      className="flex-1 py-2.5 border rounded-xl text-sm font-semibold transition">
                      {lbl}
                    </button>
                  ))}
                </div>
                {payFrequency === "quincenal" && (
                  <div style={{ color: T.muted }} className="text-xs mt-2">
                    Ingresá lo que recibís cada quincena — el total mensual se calcula automáticamente (×2).
                  </div>
                )}
              </Field>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span style={{ ...fontMono, color: T.muted }} className="text-sm w-5 shrink-0">$</span>
                  <input type="number" value={incomeUSD} onChange={e => setIncomeUSD(e.target.value)}
                    placeholder="0" style={{ background: T.bg, borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
                  <span style={{ color: T.muted }} className="text-xs w-8 shrink-0">USD</span>
                </div>
                <div className="flex items-center gap-3">
                  <span style={{ ...fontMono, color: T.muted }} className="text-sm w-5 shrink-0">₡</span>
                  <input type="number" value={incomeCRC} onChange={e => setIncomeCRC(e.target.value)}
                    placeholder="0" style={{ background: T.bg, borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
                  <span style={{ color: T.muted }} className="text-xs w-8 shrink-0">CRC</span>
                </div>
              </div>
              <div style={{ borderColor: T.line }} className="border rounded-xl overflow-hidden">
                <button onClick={() => setShowIncomeHistory(!showIncomeHistory)} style={{ color: T.ink2 }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-slate-50 transition">
                  <span>Historial de ingresos</span>
                  <ChevronDown size={15} style={{ transition: "transform 200ms", transform: showIncomeHistory ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {showIncomeHistory && (
                  <div style={{ borderColor: T.line }} className="border-t px-4 pb-3 pt-2">
                    {Object.keys(localIncomeByMonth).length === 0 ? (
                      <p style={{ color: T.muted }} className="text-xs py-2">Aquí aparecerán los ingresos guardados por mes.</p>
                    ) : (
                      <div className="space-y-1 mt-1">
                        {Object.entries(localIncomeByMonth).sort(([a], [b]) => b.localeCompare(a)).map(([mk, inc]) => (
                          <div key={mk} className="flex items-center justify-between py-1.5">
                            <div>
                              <span style={{ color: mk === currentMonth ? T.accent : T.ink, fontWeight: mk === currentMonth ? 600 : 400 }} className="text-sm">
                                {monthLabel(mk)}{mk === currentMonth ? " (este mes)" : ""}
                              </span>
                              <div style={{ color: T.muted, ...fontMono }} className="text-xs mt-0.5">
                                {inc.incomeUSD > 0 && fmtUSD(inc.incomeUSD)}
                                {inc.incomeUSD > 0 && inc.incomeCRC > 0 && " + "}
                                {inc.incomeCRC > 0 && fmt(inc.incomeCRC)}
                              </div>
                            </div>
                            <button onClick={() => setLocalIncomeByMonth(prev => { const n = { ...prev }; delete n[mk]; return n; })}
                              style={{ color: T.muted }} className="p-1 rounded hover:text-red-500 transition">
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </SettingsSection>

            <SettingsSection id="ahorro" title="Metas de ahorro">
              <Field label="Meta de ahorro mensual" hint="% del ingreso total que querés ahorrar cada mes">
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="50" step="5" value={savingsRate}
                    onChange={e => setSavingsRate(+e.target.value)} className="flex-1" style={{ accentColor: T.accent }} />
                  <div style={{ ...fontMono, color: T.accent }} className="text-2xl font-bold w-16 text-right">{savingsRate}%</div>
                </div>
                <div style={{ color: T.muted }} className="text-xs mt-1">Recomendado: 20% (regla 50/30/20).</div>
              </Field>
              <Field label="Saldo cuenta USD" hint="Actualizalo cuando cambie tu balance">
                <div className="flex items-center gap-3">
                  <span style={{ ...fontMono, color: T.muted }} className="shrink-0">$</span>
                  <input type="number" value={savingsBalanceUSD} onChange={e => setSavingsBalanceUSD(e.target.value)}
                    style={{ background: T.bg, borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
                </div>
              </Field>
            </SettingsSection>

            <SettingsSection id="tc" title="Tipo de cambio">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2">
                  <span style={{ ...fontMono, color: T.muted }} className="text-sm shrink-0">₡</span>
                  <input type="number" value={exchangeRate} onChange={e => setExchangeRate(e.target.value)}
                    style={{ background: T.bg, borderColor: T.line, color: T.ink, ...fontMono }} className={inputCls} />
                  <span style={{ color: T.muted }} className="text-xs whitespace-nowrap shrink-0">por USD</span>
                </div>
                <button onClick={handleRefreshRate} disabled={fetchingRate}
                  style={{ borderColor: T.line, color: T.ink2, background: "white" }}
                  className="px-3 py-2.5 border rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 transition disabled:opacity-40 shrink-0">
                  <RefreshCw size={13} className={fetchingRate ? "animate-spin" : ""} />
                  <span className="hidden sm:inline">{fetchingRate ? "…" : "Actualizar"}</span>
                </button>
              </div>
              {rateUpdatedAt && (
                <div style={{ color: T.muted }} className="text-xs">
                  Actualizado: {new Date(rateUpdatedAt).toLocaleDateString("es-CR", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              )}
            </SettingsSection>

            <SettingsSection id="categorias" title="Categorías" subtitle="Personalizá las categorías de tus gastos">
              <CategoryEditor
                localCategories={localCategories}
                setLocalCategories={setLocalCategories}
                setCustomBudgets={setCustomBudgets}
                config={config}
                expenses={expenses} />
            </SettingsSection>

            <SettingsSection id="presupuesto" title="Presupuesto por categoría"
              subtitle={payFrequency === "quincenal" ? "Ingresá el monto por quincena — se muestra el doble en el dashboard mensual" : "Vacío = calculado automático según tu ingreso"}>
              <div className="space-y-5">
                {["necesidad", "deseo"].map(type => (
                  <div key={type}>
                    <div style={{ color: T.muted }} className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                      {type === "necesidad" ? "Necesidades" : "Deseos"}
                    </div>
                    <div className="space-y-2.5">
                      {localCategories.filter(c => c.type === type).map(cat => {
                        const autoMonthly = Math.round(calcTotal * (DEFAULT_BUDGET_PCTS[cat.id] || 0));
                        const auto = payFrequency === "quincenal" ? Math.round(autoMonthly / 2) : autoMonthly;
                        return (
                          <div key={cat.id} className="flex items-center gap-3">
                            <div style={{ color: cat.color, background: cat.color + "15" }}
                              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm">
                              {cat.emoji}
                            </div>
                            <span style={{ color: T.ink2 }} className="text-sm font-medium w-24 shrink-0 truncate">{cat.label}</span>
                            <input type="number"
                              value={customBudgets[cat.id] ?? ""}
                              onChange={e => setCustomBudgets(p => ({ ...p, [cat.id]: e.target.value }))}
                              placeholder={auto > 0 ? auto.toString() : "0"}
                              style={{ background: T.bg, borderColor: T.line, color: T.ink, ...fontMono }}
                              className="flex-1 px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
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
            </SettingsSection>

            <SettingsSection id="datos" title="Datos" danger>
              <div className="space-y-2.5">
                <button onClick={onExportExcel}
                  style={{ borderColor: T.line, color: T.ink2, background: "white" }}
                  className="w-full py-3 rounded-xl border text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2">
                  <Download size={15} /> Exportar a Excel (.xlsx)
                </button>
                <button onClick={() => {
                  const blob = new Blob([JSON.stringify({ config, expenses }, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = `finanzas-${todayISO()}.json`; a.click();
                  URL.revokeObjectURL(url);
                }}
                  style={{ borderColor: T.line, color: T.ink2, background: "white" }}
                  className="w-full py-3 rounded-xl border text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2">
                  <Download size={15} /> Exportar JSON (backup)
                </button>
                <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleFileChange} />
                <button onClick={() => { setImportError(null); fileRef.current?.click(); }}
                  style={{ borderColor: T.line, color: T.ink2, background: "white" }}
                  className="w-full py-3 rounded-xl border text-sm font-medium hover:bg-slate-50 transition flex items-center justify-center gap-2">
                  <Upload size={15} /> Importar datos (JSON)
                </button>
                {importError && <p style={{ color: T.bad }} className="text-xs px-1">{importError}</p>}
              </div>
              <div style={{ borderColor: "#fecaca" }} className="border-t pt-5">
                {!confirmClear ? (
                  <button onClick={() => setConfirmClear(true)} style={{ color: T.bad }}
                    className="w-full py-2 text-sm font-medium hover:underline">
                    Borrar todos los gastos
                  </button>
                ) : (
                  <div style={{ background: "#fef2f2", borderColor: "#fecaca" }} className="p-4 rounded-xl border space-y-3">
                    <div style={{ color: T.bad }} className="text-sm font-semibold">¿Seguro? Esto no se puede deshacer.</div>
                    <div className="flex gap-2">
                      <button onClick={onClearAll} style={{ background: T.bad, color: "white" }}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold">Sí, borrar todo</button>
                      <button onClick={() => setConfirmClear(false)} style={{ borderColor: "#fecaca", color: T.ink2 }}
                        className="flex-1 py-2.5 rounded-xl border text-sm font-medium">Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            </SettingsSection>
          </main>
        </div>
      </div>
    </div>
  );
}
