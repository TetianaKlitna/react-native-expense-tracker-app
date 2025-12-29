import { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../ui/IconButton';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpenses/ExpenseForm';
import { useExpenses } from '../hooks';
import LoadingSpinner from '../ui/LoadingSpinner';

function ManageExpense({ route, navigation }) {
    const { expenseId } = route.params || {};
    const isEditing = !!expenseId;

    const expensesCtx = useContext(ExpensesContext);
    const { create, remove, update, loading, error } = useExpenses();

    const expense = expensesCtx.expenses.find(
        (expense) => expense.id === expenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async () => {
            await remove(expenseId);
            expensesCtx.deleteExpense(expenseId);
            navigation.goBack();
    };

    const confirmHandler = async (expenseData) => {
        if (isEditing) {
            const updatedExpense = await update(expenseId, expenseData);
            expensesCtx.updateExpense(expenseId, updatedExpense);
        } else {
            const createdExpense = await create(expenseData);
            expensesCtx.addExpense(createdExpense);
        }

        navigation.goBack();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                defaultExpense={expense}
                onCancel={() => navigation.goBack()}
                onConfirm={confirmHandler}
                confirmLabel={isEditing ? 'Edit' : 'Add'}
            />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
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
