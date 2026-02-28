import { useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useExpenses } from "../hooks";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { get } = useExpenses();
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

  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total:" fallbackText="No expenses found." />
  );
} 

export default AllExpenses;