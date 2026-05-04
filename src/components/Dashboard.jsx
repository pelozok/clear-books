import { useState, useMemo } from "react";
import { Plus, Download, Settings } from "lucide-react";
import { T, fontBody, fontMono, DEFAULT_BUDGET_PCTS } from "../lib/constants.js";
import { toCRC, fmt, fmtUSD, monthKey, getCat, isFirstQ, quincenaLabel, prevQuincena } from "../lib/helpers.js";
import { SummaryCard, SavingsAlertBanner, SavingsBar, Card, CardTitle, EmptyState } from "./ui.jsx";
import { BudgetSection } from "./BudgetSection.jsx";
import { CategoryChart, MonthComparisonChart } from "./Charts.jsx";
import { Suggestions } from "./Suggestions.jsx";
import { ExpenseList } from "./ExpenseList.jsx";
import { AddExpenseModal } from "./AddExpenseModal.jsx";

export function Dashboard({ config, expenses, currentMonth, currentHalf, categories, onAdd, onDelete, onExport, onOpenSettings }) {
  const [showAdd, setShowAdd] = useState(false);

  const rate = config.exchangeRate || 515;
  const isQ  = config.payFrequency === "quincenal";

  const monthIncome    = config.incomeByMonth?.[currentMonth];
  const incomeUSD      = monthIncome !== undefined ? monthIncome.incomeUSD : (config.incomeUSD || 0);
  const incomeCRC      = monthIncome !== undefined ? monthIncome.incomeCRC : (config.incomeCRC || 0);
  const totalIncomeCRC = incomeCRC + incomeUSD * rate;
  const hasSavingsCard = config.savingsBalanceUSD != null && config.savingsBalanceUSD > 0;
  const hasSavingsGoal = config.savingsRate > 0;

  const incomeSubtitle = (() => {
    if (incomeUSD > 0 && incomeCRC > 0) return `${fmtUSD(incomeUSD)} + ${fmt(incomeCRC)}`;
    if (incomeUSD > 0) return `${fmtUSD(incomeUSD)} · T.C. ₡${rate.toLocaleString("es-CR")}`;
    return null;
  })();

  const periodExpenses = useMemo(() => {
    return expenses.filter(e => {
      if (monthKey(e.date) !== currentMonth) return false;
      if (!isQ) return true;
      return currentHalf === 1 ? isFirstQ(e.date) : !isFirstQ(e.date);
    });
  }, [expenses, currentMonth, currentHalf, isQ]);

  const prevPeriodExpenses = useMemo(() => {
    if (isQ) {
      const { month: pm, half: ph } = prevQuincena(currentMonth, currentHalf);
      return expenses.filter(e => {
        if (monthKey(e.date) !== pm) return false;
        return ph === 1 ? isFirstQ(e.date) : !isFirstQ(e.date);
      });
    }
    const [y, m] = currentMonth.split("-").map(Number);
    const prevMk = monthKey(new Date(y, m - 2, 1).toISOString());
    return expenses.filter(e => monthKey(e.date) === prevMk);
  }, [expenses, currentMonth, currentHalf, isQ]);

  const totals = useMemo(() => {
    const total = periodExpenses.reduce((s, e) => s + toCRC(e.amount, e.currency || "CRC", rate), 0);
    const byCat = {}, byType = { necesidad: 0, deseo: 0 };
    periodExpenses.forEach(e => {
      const amtCRC = toCRC(e.amount, e.currency || "CRC", rate);
      byCat[e.category] = (byCat[e.category] || 0) + amtCRC;
      const catType = categories.length ? getCat(e.category, categories).type : "otros";
      byType[catType] = (byType[catType] || 0) + amtCRC;
    });
    return { total, byCat, byType };
  }, [periodExpenses, rate, categories]);

  const budgets = Object.fromEntries(
    categories.map(c => [
      c.id,
      config.budgets?.[c.id] != null
        ? config.budgets[c.id]
        : Math.round(totalIncomeCRC * (DEFAULT_BUDGET_PCTS[c.id] || 0)),
    ])
  );

  const savingsGoal = totalIncomeCRC * (config.savingsRate / 100);
  const remaining   = totalIncomeCRC - totals.total;
  const disponible  = totalIncomeCRC - savingsGoal - totals.total;
  const periodLabel = isQ ? quincenaLabel(currentMonth, currentHalf) : null;
  const spentPct    = totalIncomeCRC > 0 ? Math.round(totals.total / totalIncomeCRC * 100) : 0;

  if (categories.length === 0) {
    return (
      <div style={{ borderColor: T.line, background: "white" }}
        className="border-2 border-dashed rounded-2xl p-10 text-center mt-4">
        <div style={{ background: T.accentSoft, color: T.accent }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Settings size={28} />
        </div>
        <h3 style={{ color: T.ink, fontWeight: 700 }} className="text-xl font-bold mb-2">Sin categorías aún</h3>
        <p style={{ color: T.muted }} className="text-sm mb-6 max-w-sm mx-auto leading-relaxed">
          Agregá tus categorías de gastos para empezar a registrar movimientos y ver el dashboard completo.
        </p>
        <button onClick={onOpenSettings} style={{ background: T.accent, color: "white" }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:opacity-80 transition">
          <Settings size={15} /> Agregar categorías
        </button>
      </div>
    );
  }

  const heroTone = disponible < 0
    ? { bg: "#fef2f2", border: "#fecaca", color: T.bad }
    : { bg: "#f0fdf4", border: "#bbf7d0", color: T.good };

  return (
    <>
      {/* Banner: ingreso no configurado */}
      {totalIncomeCRC === 0 && (
        <div style={{ background: "#fffbeb", borderColor: "#fde68a" }}
          className="border-2 rounded-2xl p-4 mb-4 flex items-center justify-between gap-3">
          <div>
            <div style={{ color: T.warn, fontWeight: 700 }} className="text-sm">Sin ingreso configurado</div>
            <div style={{ color: T.ink2 }} className="text-xs mt-0.5">
              Ingresá tu salario para ver presupuestos y métricas reales.
            </div>
          </div>
          <button onClick={onOpenSettings} style={{ background: T.warn, color: "white" }}
            className="px-3 py-2 rounded-xl text-xs font-semibold shrink-0 hover:opacity-90 active:opacity-80 transition">
            Configurar
          </button>
        </div>
      )}

      {/* Hero — disponible */}
      <div style={{ background: heroTone.bg, borderColor: heroTone.border }}
        className="border-2 rounded-2xl p-5 sm:p-7 mb-4">
        <div style={{ color: T.muted }} className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2">
          {hasSavingsGoal ? "Disponible · apartado el ahorro" : "Disponible este período"}
        </div>
        <div style={{ ...fontMono, color: heroTone.color }}
          className="text-4xl sm:text-5xl font-bold tabular-nums leading-none">
          {fmt(disponible)}
        </div>
        {disponible < 0 ? (
          <div style={{ color: T.bad }} className="text-sm mt-3 font-medium">
            Estás usando más de lo que ingresás este período
          </div>
        ) : hasSavingsGoal ? (
          <div style={{ color: T.good }} className="text-sm mt-3">
            Meta de ahorro: {fmt(savingsGoal)} ({config.savingsRate}%)
          </div>
        ) : null}
      </div>

      {/* Supporting cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <SummaryCard label="Ingreso" value={fmt(totalIncomeCRC)} subtitle={incomeSubtitle} tone="ink" />
        <SummaryCard label="Gastos" value={fmt(totals.total)}
          subtitle={`${spentPct}% del ingreso`} tone={spentPct > 90 ? "bad" : "ink"} />
        {hasSavingsGoal && (
          <SummaryCard label="Meta ahorro" value={fmt(savingsGoal)}
            subtitle={`${config.savingsRate}% del ingreso`} tone="accent" />
        )}
        {hasSavingsCard && (
          <SummaryCard label="Cuenta USD" value={fmtUSD(config.savingsBalanceUSD)}
            subtitle={`≈ ${fmt((config.savingsBalanceUSD || 0) * rate)}`} tone="accent" />
        )}
      </section>

      {hasSavingsGoal && (
        <>
          <SavingsAlertBanner remaining={remaining} savingsGoal={savingsGoal} savingsRate={config.savingsRate} />
          <SavingsBar progress={remaining} goal={savingsGoal} />
        </>
      )}

      {/* Desktop action bar */}
      <div className="hidden sm:flex items-center gap-3 my-8 flex-wrap">
        <button onClick={() => setShowAdd(true)} style={{ background: T.accent, color: "white" }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm tracking-wide font-semibold hover:opacity-90 transition shadow-sm">
          <Plus size={16} /> Agregar gasto
        </button>
        <button onClick={onExport} style={{ borderColor: T.line, color: T.ink2, background: "white" }}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border hover:bg-slate-50 transition shadow-sm">
          <Download size={15} /> Exportar datos
        </button>
      </div>

      <Suggestions
        income={totalIncomeCRC} totals={totals} config={config} expensesCount={periodExpenses.length}
        categories={categories} budgets={budgets} prevPeriodExpenses={prevPeriodExpenses} rate={rate} />

      <BudgetSection byCat={totals.byCat} budgets={budgets} categories={categories} />

      {periodExpenses.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="md:col-span-2">
            <CardTitle>Por categoría</CardTitle>
            <CategoryChart byCat={totals.byCat} categories={categories} />
          </Card>
          <Card className="md:col-span-3">
            <CardTitle>{isQ ? "Esta quincena vs quincena anterior" : "Este mes vs mes anterior"}</CardTitle>
            <MonthComparisonChart
              currentExpenses={periodExpenses} prevExpenses={prevPeriodExpenses}
              categories={categories} rate={rate}
              prevLabel={isQ ? quincenaLabel(...Object.values(prevQuincena(currentMonth, currentHalf))) : null} />
          </Card>
        </section>
      ) : (
        <EmptyState onAdd={() => setShowAdd(true)} />
      )}

      {periodExpenses.length > 0 && (
        <section className="mt-10">
          <h2 style={{ color: T.ink, fontWeight: 700 }} className="text-xl font-bold mb-5">
            {isQ ? `Movimientos · ${periodLabel}` : "Movimientos del mes"}
          </h2>
          <ExpenseList expenses={periodExpenses} exchangeRate={rate} onDelete={onDelete} categories={categories} />
        </section>
      )}

      {/* Mobile FAB */}
      <button onClick={() => setShowAdd(true)}
        style={{ background: T.accent, color: "white" }}
        className="sm:hidden fixed bottom-6 right-5 z-40 flex items-center gap-2 pl-4 pr-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold active:opacity-80 transition">
        <Plus size={18} /> Agregar
      </button>
      <div className="sm:hidden h-28" />

      {showAdd && (
        <AddExpenseModal
          currentMonth={currentMonth} currentHalf={isQ ? currentHalf : null}
          categories={categories}
          onAdd={(exp) => { onAdd(exp); setShowAdd(false); }}
          onClose={() => setShowAdd(false)} />
      )}
    </>
  );
}
