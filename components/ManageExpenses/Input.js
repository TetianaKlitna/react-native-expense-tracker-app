import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, invalid, TextInputConfig, style }) {

    let inputStyle = [styles.input];

    if (TextInputConfig && TextInputConfig.multiline) {
        inputStyle.push(styles.inputMultiline);
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput {...TextInputConfig} style={[inputStyle, invalid && styles.invalidInput]} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
        color: GlobalStyles.colors.primary100,
    },
    input: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        borderRadius: 6,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },  
    invalidInput: {
        borderColor: GlobalStyles.colors.error500,
        backgroundColor: GlobalStyles.colors.error50,
        borderWidth: 1,
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
});

export default Input;