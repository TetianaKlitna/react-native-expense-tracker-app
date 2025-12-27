import { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from '../constants/styles';
import IconButton from '../ui/IconButton';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpenses/ExpenseForm';

function ManageExpense({ route, navigation }) {
    const { expenseId } = route.params || {};
    const isEditing = !!expenseId;
    const expensesCtx = useContext(ExpensesContext);

    const expense = expensesCtx.expenses.find((expense) => expense.id === expenseId);

    const confirmLabel = isEditing ? 'Edit' : 'Add';

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        expensesCtx.deleteExpense({ id: expenseId });
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = ({ amount, date, description }) => {
        if (isEditing) {
            expensesCtx.updateExpense({
                id: expenseId,
                description: description,
                amount: amount,
                date: date,
            });
        } else {
            expensesCtx.addExpense({
                description: description,
                amount: amount,
                date: date,
            });
        }
    navigation.goBack();
}

return (
    <View style={styles.container}>
        <ExpenseForm defExpanses={expense} onCancel={cancelHandler} onConfirm={confirmHandler} confirmLabel={confirmLabel} />
        {isEditing && (
            <View style={styles.deleteContainer}>
                <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
            </View>
        )}
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});

export default ManageExpense;   