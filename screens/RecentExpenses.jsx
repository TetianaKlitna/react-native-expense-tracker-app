import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    return expense.date >= getDateMinusDays(today, 7) && expense.date <= today;
  });
  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days:" fallbackText="No recent expenses found for the last 7 days." />;
}

export default RecentExpenses;