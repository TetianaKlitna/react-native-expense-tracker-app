import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';  
import Input from './Input';

function ExpenseForm() {

    const [inputValues, setInputValues] = useState({
        amount: 0,
        date: '',
        description: ''
    });

    function handleAmountChange(text) {
        setInputValues(prevValues => ({
            ...prevValues,
            amount: text
        }));
    }

    function handleDateChange(text) {
        setInputValues(prevValues => ({
            ...prevValues,
            date: text
        }));
    }

    function handleDescriptionChange(text) {
        setInputValues(prevValues => ({
            ...prevValues,
            description: text
        }));
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense:</Text>
            <View style={styles.inputsRow}>
                <Input label="Amount" TextInputConfig={{ keyboardType: 'decimal-pad', onChangeText: handleAmountChange }} style={styles.rowInput} />
                <Input label="Date" TextInputConfig={{ placeholder: 'YYYY-MM-DD', maxLength: 10, onChangeText: handleDateChange }} style={styles.rowInput} />
            </View>
            <Input
                label="Description"
                TextInputConfig={{
                    multiline: true,
                    //autoCapitalize: 'sentences',
                    //autoCorrect: false, default - true
                    onChangeText: handleDescriptionChange
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex:1,
    },
    title: {
        color: GlobalStyles.colors.primary50,
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 12,
        textAlign: 'center',
    }
});

export default ExpenseForm;