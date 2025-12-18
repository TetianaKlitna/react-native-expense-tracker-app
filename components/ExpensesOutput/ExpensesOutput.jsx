import { View, StyleSheet } from 'react-native';   
import ExpensesSummary from './ExpensesSummary'; 
import ExpensesList from './ExpensesList';

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2022-12-19') },
    { id: 'e2', description: 'A pair of trousers', amount: 89.29, date: new Date('2022-12-17') },
    { id: 'e3', description: 'A bunch of bananas', amount: 5.99, date: new Date('2022-12-01') },
    { id: 'e4', description: 'A book', amount: 1.29, date: new Date('2022-02-12') },
    { id: 'e5', description: 'Another book', amount: 3.29, date: new Date('2022-02-17') },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View>
            <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
}

export default ExpensesOutput;