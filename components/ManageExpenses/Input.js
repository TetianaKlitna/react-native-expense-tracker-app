import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, TextInputConfig, style }) {

    let inputStyle = [styles.input];

    if (TextInputConfig && TextInputConfig.multiline) {
        inputStyle.push(styles.inputMultiline);
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...TextInputConfig} style={inputStyle} />
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
});

export default Input;