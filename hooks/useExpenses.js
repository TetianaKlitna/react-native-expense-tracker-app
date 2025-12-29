import { useAsync } from './useAsync';
import {
  storeExpense,
  fetchExpenses,
  updateExpense,
  deleteExpense,
} from '../services/expense.api';

export function useExpenses() {
  const { loading, error, run } = useAsync();

  return {
    loading,
    error,

    create: (data) =>
      run(() => storeExpense(data)),

    get: () =>
      run(() => fetchExpenses()),

    update: (id, data) =>
      run(() => updateExpense(id, data)),

    remove: (id) =>
      run(() => deleteExpense(id)),
  };
}
