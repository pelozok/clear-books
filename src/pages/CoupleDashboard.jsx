import SummaryCard from "../components/SummaryCard.jsx";
import FixedExpensesCard from "../components/FixedExpensesCard.jsx";
import VariableExpensesCard from "../components/VariableExpensesCard.jsx";
import BudgetBars from "../components/BudgetBars.jsx";
import ContributionCard from "./couple/ContributionCard.jsx";

// Página del modo pareja: dos salarios y el reparto proporcional del hogar.
export default function CoupleDashboard({
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
      <ContributionCard
        people={profile.people}
        incomes={period.incomes}
        gastos={totals.fixed + totals.variable}
        ahorro={period.savingsGoal || 0}
        rate={rate}
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
