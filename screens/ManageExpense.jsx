import { useLayoutEffect } from 'react';
import { Text, View, StyleSheet } from "react-native";
import IconButton from '../ui/IconButton';
import { GlobalStyles } from '../constants/styles';

function ManageExpense({ route, navigation }) {
    const { expenseId } = route.params || {};
    const isEditing = !!expenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        console.log('Deleting expense with id:', expenseId); 
    }

    return (
        <View style={styles.container}>
            { isEditing && (
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