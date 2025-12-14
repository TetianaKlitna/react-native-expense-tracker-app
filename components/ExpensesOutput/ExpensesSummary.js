import { View, Text, StyleSheet } from 'react-native'

function ExpensesSummary({ periodName, expenses }) {

    const expensesTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return (
        <View>
            <Text>{periodName}</Text>
            <Text>${expensesTotal.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({});

export default ExpensesSummary;