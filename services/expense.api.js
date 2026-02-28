import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

const expensesCollection = collection(db, "expenses");

function mapExpenseDoc(expenseDoc) {
  const data = expenseDoc.data();
  const rawDate = data.date ?? data.Date;

  return {
    id: expenseDoc.id,
    description: data.description ?? data.Description ?? "",
    amount: Number(data.amount ?? data.Amount ?? 0),
    date: rawDate?.toDate ? rawDate.toDate() : new Date(rawDate),
  };
}

function buildFirestoreErrorMessage(action, error) {
  if (error?.code === "permission-denied") {
    return "Firestore denied access. Update Firestore Rules or sign in a user.";
  }

  return `Failed to ${action}: ${error.message}`;
}

export async function storeExpense(expenseData) {
    try {
    const res = await addDoc(expensesCollection, expenseData);
    return { id: res.id, ...expenseData };
    } catch (error) {
        console.error('Error storing expense:', error);
    throw new Error(buildFirestoreErrorMessage('store expense', error));
    }
}

export async function fetchExpenses() {
    try {
    const snapshot = await getDocs(expensesCollection);
    return snapshot.docs.map(mapExpenseDoc);
    } catch (error) {
        console.error('Error fetching expenses:', error);
    throw new Error(buildFirestoreErrorMessage('fetch expenses', error));
    }
}

export async function updateExpense(id, expenseData) {
    try {
    await updateDoc(doc(db, "expenses", id), expenseData);
        return { id, ...expenseData };
    } catch (error) {
        console.error('Error updating expense:', error);
    throw new Error(buildFirestoreErrorMessage('update expense', error));
    }
}

export async function deleteExpense(id) {
  if (!id) {
    throw new Error('Expense ID is required');
  }

  try {
    await deleteDoc(doc(db, "expenses", id));
    return id;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw new Error(buildFirestoreErrorMessage('delete expense', error));
  }
}

export function subscribeExpenses(onData, onError) {
  return onSnapshot(
    expensesCollection,
    (snapshot) => {
      const expenses = snapshot.docs.map(mapExpenseDoc);
      onData(expenses);
    },
    (error) => {
      if (onError) {
        onError(new Error(buildFirestoreErrorMessage('subscribe expenses', error)));
      }
    }
  );
}
