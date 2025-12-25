import { View } from 'react-native';
import Input from './Input';

function ExpenseForm() {
    function handleAmountChange(text) {
        // Handle amount input changes
    }

    function handleDateChange(text) {
        // Handle date input changes
    }

    function handleDescriptionChange(text) {
        // Handle description input changes
    }

    return (
        <View>
            <Input label="Amount" TextInputConfig={{ keyboardType: 'decimal-pad', onChangeText: handleAmountChange }} />
            <Input label="Date" TextInputConfig={{ placeholder: 'YYYY-MM-DD', maxLength: 10, onChangeText: handleDateChange }} />
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

export default ExpenseForm;