import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2022-12-19') },
    { id: 'e2', description: 'A pair of trousers', amount: 89.29, date: new Date('2022-12-17') },
    { id: 'e3', description: 'A bunch of bananas', amount: 5.99, date: new Date('2022-12-01') },
    { id: 'e4', description: 'A book', amount: 1.29, date: new Date('2022-02-12') },
    { id: 'e5', description: 'Another book1', amount: 3.29, date: new Date('2025-12-22') },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    updateExpense: ({ id, description, amount, date }) => {},
    deleteExpense: ({ id }) => {},  
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
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = ({ description, amount, date }) => {
        dispatch({ type: 'ADD', payload: { description, amount, date } });
    };

    const updateExpense = ({ id, description, amount, date }) => {
        dispatch({ type: 'UPDATE', payload: { id, description, amount, date } });
    };

    const deleteExpense = ({ id }) => {
        dispatch({ type: 'DELETE', payload: { id } });
    };

    return (
        <ExpensesContext.Provider value={{
            expenses: expensesState,
            addExpense,
            updateExpense,
            deleteExpense
        }}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;