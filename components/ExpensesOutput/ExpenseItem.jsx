import { Text, StyleSheet, Pressable, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';

function ExpenseItem({ id, description, date, amount }) {

    const navigation = useNavigation();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpense', {
            expenseId: id,
        });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => [
            GlobalStyles.shadow,
            pressed && { opacity: 0.7 },
        ]}>
            <View style={styles.item}>
                <View>
                    <Text style={[styles.text, styles.description]}>{description}</Text>
                    <Text style={styles.text}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: GlobalStyles.colors.primary700,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary700,
    }, 
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    }, 
    amount: {
        color: GlobalStyles.colors.primary700,
        fontWeight: 'bold',
    }
});

export default ExpenseItem;