import SummaryCard from "../components/SummaryCard.jsx";
import FixedExpensesCard from "../components/FixedExpensesCard.jsx";
import VariableExpensesCard from "../components/VariableExpensesCard.jsx";
import BudgetBars from "../components/BudgetBars.jsx";

// Página del modo individual: un salario, el flujo del machote tal cual.
export default function SoloDashboard({
  profile, period, expenses, rate, totals,
  onTogglePaid, onPatchItem, onAddExpense, onRemoveExpense,
}) {
  return (
    <div className="space-y-4">
      <SummaryCard
        income={totals.income}
        fixedTotal={totals.fixed}
        variableTotal={totals.variable}
        savings={period.savingsGoal || 0}
        frequency={profile.frequency}
      />
      <FixedExpensesCard
        items={period.fixedItems}
        categories={profile.categories}
        rate={rate}
        onTogglePaid={onTogglePaid}
        onPatchItem={onPatchItem}
      />
      <VariableExpensesCard
        expenses={expenses}
        categories={profile.categories}
        rate={rate}
        onAdd={onAddExpense}
        onRemove={onRemoveExpense}
      />
      <BudgetBars
        categories={profile.categories}
        fixedItems={period.fixedItems}
        expenses={expenses || []}
        rate={rate}
      />
    </div>
  );
}
