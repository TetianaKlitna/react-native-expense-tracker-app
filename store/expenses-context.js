import { createContext, useReducer, useCallback } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    updateExpense: ({ id, description, amount, date }) => {},
    deleteExpense: ({ id }) => {},  
    setExpenses: (expenses) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [...state, { ...action.payload, id }];
        case 'UPDATE':
            return state.map(expense => {
                if (expense.id === action.payload.id) {
                    return { ...expense, ...action.payload };
                }
                return expense;
            });
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload.id);
        case 'SET':
            return action.payload;
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = useCallback(({ description, amount, date }) => {
        dispatch({ type: 'ADD', payload: { description, amount, date } });
    }, []);

    const updateExpense = useCallback((id, { description, amount, date }) => {
        dispatch({ type: 'UPDATE', payload: { id, description, amount, date } });
    }, []);

    const deleteExpense = useCallback((id) => {
        dispatch({ type: 'DELETE', payload: { id } });
    }, []);

    const setExpenses = useCallback((expenses) => {
        dispatch({ type: 'SET', payload: expenses });
    }, []);

    return (
        <ExpensesContext.Provider value={{
            expenses: expensesState,
            addExpense,
            updateExpense,
            deleteExpense,
            setExpenses,
        }}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;