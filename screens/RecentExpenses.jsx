import { useEffect, useContext } from "react";
import { Text } from "react-native";
import LoadingSpinner from '../ui/LoadingSpinner';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useExpenses } from "../hooks";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { get, loading, error } = useExpenses();

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await get();
      expensesCtx.setExpenses(expenses);
    };

    fetchExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    return expense.date >= getDateMinusDays(today, 7) && expense.date <= today;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Text>Error loading expenses</Text>;
  }

  return <ExpensesOutput 
    expenses={recentExpenses} 
    expensesPeriod="Last 7 days:" 
    fallbackText="No recent expenses found for the last 7 days." 
  />;
}

export default RecentExpenses;