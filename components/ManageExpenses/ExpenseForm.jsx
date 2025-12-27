import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import Input from './Input';
import Button from '../../ui/Button';

function ExpenseForm({ defExpanses, onCancel, onConfirm, confirmLabel }) {

    const [inputValues, setInputValues] = useState({
        amount: {
            value: defExpanses ? defExpanses.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defExpanses ? getFormattedDate(defExpanses.date) : '',
            isValid: true,
        },
        description: {
            value: defExpanses ? defExpanses.description : '',
            isValid: true,
        },
    });

    function onSubmit() {


        const isAmountValid = !isNaN(inputValues.amount.value) && Number(inputValues.amount.value) > 0;
        const isDateValid = !inputValues.date.value.toString() !== 'Invalid Date' && !isNaN(new Date(inputValues.date.value).getTime());
        const isDescriptionValid = inputValues.description.value.trim().length > 0;

        if (!isAmountValid || !isDateValid || !isDescriptionValid) {
            setInputValues((prevState) => ({
                amount: { value: prevState.amount.value, isValid: isAmountValid },
                date: { value: prevState.date.value, isValid: isDateValid },
                description: { value: prevState.description.value, isValid: isDescriptionValid },
            }));
            return;
        }

        const formattedExpense = {
            amount: Number(inputValues.amount.value),
            date: new Date(inputValues.date.value),
            description: inputValues.description.value,
        };

        onConfirm(formattedExpense);

    }

    function inputValuesChange(key, value) {
        setInputValues(prevState => ({
            ...prevState,
            [key]: { value, isValid: true },
        }));
    }

    const isFormValid = inputValues.amount.isValid && inputValues.date.isValid && inputValues.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense:</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    invalid={!inputValues.amount.isValid}
                    TextInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: (text) => inputValuesChange('amount', text),
                        value: inputValues.amount.value
                    }}
                    style={styles.rowInput} />
                <Input
                    label="Date"
                    invalid={!inputValues.date.isValid}
                    TextInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: (text) => inputValuesChange('date', text),
                        value: inputValues.date.value
                    }}
                    style={styles.rowInput} />
            </View>
            <Input
                label="Description"
                invalid={!inputValues.description.isValid}
                TextInputConfig={{
                    multiline: true,
                    //autoCapitalize: 'sentences',
                    //autoCorrect: false, default - true
                    onChangeText: (text) => inputValuesChange('description', text),
                    value: inputValues.description.value
                }} />

            {!isFormValid && <Text style={styles.errorText}>Please enter a valid input!</Text>}

            <View style={styles.buttonsContainer}>
                <Button onPress={onCancel} mode="flat" style={styles.button}>Cancel</Button>
                <Button onPress={onSubmit} style={styles.button}>{confirmLabel}</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 10,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    title: {
        color: GlobalStyles.colors.primary50,
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 12,
        textAlign: 'center',
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
});

export default ExpenseForm;