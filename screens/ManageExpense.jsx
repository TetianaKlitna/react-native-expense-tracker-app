import { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from '../constants/styles';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import { ExpensesContext } from '../store/expenses-context';

function ManageExpense({ route, navigation }) {
    const { expenseId } = route.params || {};
    const isEditing = !!expenseId;
    const expensesCtx = useContext(ExpensesContext);

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

    const confirmHandler = () => {
        if (isEditing) {
            expensesCtx.updateExpense({
                id: expenseId,
                description: 'Updated!',
                amount: 99.99,
                date: new Date(),
            });
        } else {
            expensesCtx.addExpense({
                description: 'New Expense!',
                amount: 99.99,
                date: new Date(),
            });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button onPress={cancelHandler} mode="flat" style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Edit' : 'Add'}</Button>
            </View>
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
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