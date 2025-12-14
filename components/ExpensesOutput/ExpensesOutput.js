import { View, StyleSheet } from 'react-native';   
import ExpensesSummary from './ExpensesSummary'; 
import ExpensesList from './ExpensesList';

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2022-12-19') },
    { id: 'e2', description: 'A pair of trousers', amount: 89.29, date: new Date('2022-12-17') },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View>
            <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
            <ExpensesList expenses={expenses} />
        </View>
    );
}

const styles = StyleSheet.create({});

export default ExpensesOutput;