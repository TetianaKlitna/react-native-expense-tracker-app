import { useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import LoadingOverlay from '../ui/LoadingOverlay';
import ErrorOverlay from '../ui/ErrorOverlay';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useExpenses } from "../hooks";
import { ExpensesContext } from "../store/expenses-context";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { loading, error, setError, get } = useExpenses();
  const getExpenses = useCallback(get, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadExpenses = async () => {
        const expenses = await getExpenses();
        if (isActive) {
          expensesCtx.setExpenses(expenses);
        }
      };

      loadExpenses();

      return () => {
        isActive = false;
      };
    }, [getExpenses, expensesCtx.setExpenses])
  );

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    return expense.date >= getDateMinusDays(today, 7) && expense.date <= today;
  });

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message="Could not load expenses!" onConfirm={() => setError(null)} />;
  }

  return <ExpensesOutput 
    expenses={recentExpenses} 
    expensesPeriod="Last 7 days:" 
    fallbackText="No recent expenses found for the last 7 days." 
  />;
}

export default RecentExpenses;