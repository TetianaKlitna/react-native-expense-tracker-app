
import { View, StyleSheet, Text } from 'react-native';   
import ExpensesSummary from './ExpensesSummary'; 
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {

    if (expenses.length === 0) {
        return (
            <View style={styles.container}>
               <Text style={styles.infoText}>{fallbackText}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
            <ExpensesList expenses={expenses} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});

export default ExpensesOutput;