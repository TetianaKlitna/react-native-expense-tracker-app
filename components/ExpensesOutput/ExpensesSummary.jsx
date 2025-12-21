import { View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({ periodName, expenses }) {

    const expensesTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return (
        <View style = {[styles.container, GlobalStyles.shadow]}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesTotal.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    period: {
        fontSize: 14,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    }
})

export default ExpensesSummary;