import { useState, useMemo } from "react";
import { Plus, Download, Settings } from "lucide-react";
import { T, fontBody } from "../lib/constants.js";
import { toCRC, fmt, fmtUSD, monthKey, getBudgets, getCat } from "../lib/helpers.js";
import { SummaryCard, SavingsAlertBanner, SavingsBar, Card, CardTitle, EmptyState } from "./ui.jsx";
import { BudgetSection } from "./BudgetSection.jsx";
import { CategoryChart, MonthComparisonChart } from "./Charts.jsx";
import { Suggestions } from "./Suggestions.jsx";
import { ExpenseList } from "./ExpenseList.jsx";
import { AddExpenseModal } from "./AddExpenseModal.jsx";

export function Dashboard({ config, expenses, currentMonth, categories, onAdd, onDelete, onExport, onOpenSettings }) {
  const [showAdd, setShowAdd] = useState(false);

  const rate       = config.exchangeRate || 515;
  const multiplier = config.payFrequency === "quincenal" ? 2 : 1;

  const monthIncome    = config.incomeByMonth?.[currentMonth];
  const incomeUSD      = monthIncome !== undefined ? monthIncome.incomeUSD : (config.incomeUSD || 0);
  const incomeCRC      = monthIncome !== undefined ? monthIncome.incomeCRC : (config.incomeCRC || 0);
  const totalIncomeCRC = (incomeCRC + incomeUSD * rate) * multiplier;
  const hasSavingsCard = config.savingsBalanceUSD !== undefined;

  const freqLabel = config.payFrequency === "quincenal" ? "quincena" : "mes";

  const incomeSubtitle = (() => {
    const hasUSD = incomeUSD > 0;
    const hasCRC = incomeCRC > 0;
    if (config.payFrequency === "quincenal") {
      if (hasUSD && hasCRC) return `Quincenal: ${fmtUSD(incomeUSD)} + ${fmt(incomeCRC)}`;
      if (hasUSD) return `Quincenal: ${fmtUSD(incomeUSD)} · T.C. ₡${rate.toLocaleString("es-CR")}`;
      if (hasCRC) return `Quincenal: ${fmt(incomeCRC)}`;
    }
    if (hasUSD && hasCRC) return `${fmtUSD(incomeUSD)} + ${fmt(incomeCRC)}`;
    if (hasUSD) return `${fmtUSD(incomeUSD)} · T.C. ₡${rate.toLocaleString("es-CR")}`;
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
      const catType = categories.length ? getCat(e.category, categories).type : "otros";
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

  if (categories.length === 0) {
    return (
      <div style={{ borderColor: T.line, background: "white" }} className="border-2 border-dashed rounded-lg p-10 text-center mt-4">
        <div style={{ background: T.accentSoft, color: T.accent }} className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Settings size={26} />
        </div>
        <h3 style={{ color: T.ink, fontWeight: 700 }} className="text-xl font-bold mb-2">Sin categorías aún</h3>
        <p style={{ color: T.muted }} className="text-sm mb-6 max-w-sm mx-auto leading-relaxed">
          Agregá tus categorías de gastos para empezar a registrar movimientos y ver tu dashboard completo.
        </p>
        <button onClick={onOpenSettings} style={{ background: T.accent, color: "white" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition">
          <Settings size={15} /> Agregar categorías
        </button>
      </div>
    );
  }

  return (
    <>
      <section className={`grid ${gridCols} gap-3 sm:gap-4 mb-8`}>
        <SummaryCard label="Ingreso mensual" value={fmt(totalIncomeCRC)} subtitle={incomeSubtitle} tone="ink" />
        <SummaryCard
          label={`Gastos del ${freqLabel}`} value={fmt(totals.total)}
          subtitle={`${totalIncomeCRC > 0 ? Math.round(totals.total / totalIncomeCRC * 100) : 0}% del ingreso`}
          tone="bad" />
        <SummaryCard
          label="Disponible para gastar"
          value={fmt(disponible)}
          subtitle={disponible < 0 ? "Estás usando tus ahorros" : "Después de apartar el ahorro"}
          tone={disponible < 0 ? "bad" : "good"} />
        <SummaryCard
          label="Meta de ahorro" value={fmt(savingsGoal)}
          subtitle={`${config.savingsRate}% del ingreso`}
          tone="accent" />
        {hasSavingsCard && (
          <SummaryCard
            label="Cuenta USD"
            value={fmtUSD(config.savingsBalanceUSD)}
            subtitle={`≈ ${fmt((config.savingsBalanceUSD || 0) * rate)}`}
            tone="accent" />
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

      <Suggestions
        income={totalIncomeCRC} totals={totals} config={config} expensesCount={monthExpenses.length}
        categories={categories} budgets={budgets} expenses={expenses} currentMonth={currentMonth} rate={rate}
      />

      <BudgetSection byCat={totals.byCat} budgets={budgets} categories={categories} />

      {monthExpenses.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
          <Card className="lg:col-span-2">
            <CardTitle>Por categoría</CardTitle>
            <CategoryChart byCat={totals.byCat} categories={categories} />
          </Card>
          <Card className="lg:col-span-3">
            <CardTitle>Este mes vs mes anterior</CardTitle>
            <MonthComparisonChart expenses={expenses} currentMonth={currentMonth} categories={categories} rate={rate} />
          </Card>
        </section>
      ) : (
        <EmptyState onAdd={() => setShowAdd(true)} />
      )}

      {monthExpenses.length > 0 && (
        <section className="mt-10">
          <h2 style={{ color: T.ink, fontWeight: 700 }} className="text-xl font-bold mb-5">Movimientos del mes</h2>
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
