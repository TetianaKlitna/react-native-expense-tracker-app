import { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../ui/IconButton';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpenses/ExpenseForm';
import { useExpenses } from '../hooks';
import LoadingOverlay from '../ui/LoadingOverlay';
import ErrorOverlay from '../ui/ErrorOverlay';

function ManageExpense({ route, navigation }) {
    const { expenseId } = route.params || {};
    const isEditing = !!expenseId;

    const expensesCtx = useContext(ExpensesContext);
    const { create, remove, update, get, loading, error, setError } = useExpenses();

    const expense = expensesCtx.expenses.find(
        (expense) => expense.id === expenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async () => {
            if (loading) return;
            await remove(expenseId);
            const expenses = await get();
            expensesCtx.setExpenses(expenses);
            navigation.goBack();
    };

    const confirmHandler = async (expenseData) => {
        if (loading) return;

        if (isEditing) {
            await update(expenseId, expenseData);
        } else {
            await create(expenseData);
        }

        const expenses = await get();
        expensesCtx.setExpenses(expenses);

        navigation.goBack();
    };

    if (loading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return <ErrorOverlay message="An error occurred while processing your data!" onConfirm={() => setError(null)} />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                defaultExpense={expense}
                onCancel={() => navigation.goBack()}
                onConfirm={confirmHandler}
                confirmLabel={isEditing ? 'Edit' : 'Add'}
                disabled={loading}
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
