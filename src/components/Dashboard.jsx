import { useState, useMemo } from "react";
import { Plus, Download, TrendingDown, TrendingUp, PiggyBank, Wallet, DollarSign } from "lucide-react";
import { T, fontBody } from "../lib/constants.js";
import { toCRC, fmt, fmtUSD, monthKey, getBudgets, getCat } from "../lib/helpers.js";
import { SummaryCard, SavingsAlertBanner, SavingsBar, Card, CardTitle, EmptyState } from "./ui.jsx";
import { BudgetSection } from "./BudgetSection.jsx";
import { CategoryChart, MonthComparisonChart } from "./Charts.jsx";
import { Suggestions } from "./Suggestions.jsx";
import { ExpenseList } from "./ExpenseList.jsx";
import { AddExpenseModal } from "./AddExpenseModal.jsx";

export function Dashboard({ config, expenses, currentMonth, categories, onAdd, onDelete, onExport }) {
  const [showAdd, setShowAdd] = useState(false);

  const rate = config.exchangeRate || 515;

  const monthIncome    = config.incomeByMonth?.[currentMonth];
  const incomeUSD      = monthIncome !== undefined ? monthIncome.incomeUSD : (config.incomeUSD || 0);
  const incomeCRC      = monthIncome !== undefined ? monthIncome.incomeCRC : (config.incomeCRC || 0);
  const totalIncomeCRC = incomeCRC + incomeUSD * rate;
  const hasSavingsCard = config.savingsBalanceUSD !== undefined;

  const incomeSubtitle = (() => {
    const hasUSD = incomeUSD > 0;
    const hasCRC = incomeCRC > 0;
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
        <SummaryCard label="Ingreso" value={fmt(totalIncomeCRC)} subtitle={incomeSubtitle} tone="ink" />
        <SummaryCard
          label="Gastos del mes" value={fmt(totals.total)}
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

      <Suggestions
        income={totalIncomeCRC} totals={totals} config={config} expensesCount={monthExpenses.length}
        categories={categories} budgets={budgets} expenses={expenses} currentMonth={currentMonth} rate={rate}
      />

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
