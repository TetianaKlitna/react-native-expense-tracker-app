import axios from "axios";

const instance = axios.create({
    baseURL: 'https://expense-tracker-34f0e-default-rtdb.firebaseio.com',
    timeout: 10000,
});

export async function storeExpense(expenseData) {
    try {
        const res = await instance.post('/expenses.json', expenseData);
        return { id: res.data.name, ...expenseData };
    } catch (error) {
        console.error('Error storing expense:', error);
        throw new Error('Failed to store expense: ' + error.message);
    }
}

export async function fetchExpenses() {
    try {
        const res = await instance.get('/expenses.json');

        if (!res.data) return [];

        return Object.keys(res.data).map((key) => ({
            id: key,
            ...res.data[key],
            date: new Date(res.data[key].date),
        }));
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('Failed to fetch expenses: ' + error.message);
    }
}

export async function updateExpense(id, expenseData) {
    try {
        await instance.put(`/expenses/${id}.json`, expenseData);
        return { id, ...expenseData };
    } catch (error) {
        console.error('Error updating expense:', error);
        throw new Error('Failed to update expense: ' + error.message);
    }
}

export async function deleteExpense(id) {
  if (!id) {
    throw new Error('Expense ID is required');
  }

  try {
    await instance.delete(`/expenses/${id}.json`);
    return id;
  } catch (error) {
    console.error(
      'Error deleting expense:',
      error.response?.status,
      error.response?.data
    );

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Failed to delete expense'
    );
  }
}
