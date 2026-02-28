import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Button from "./Button";

function ErrorOverlay({ message, onConfirm }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>An error occurred!</Text>
            <Text style={styles.message}>{message}</Text>
            <Button onPress={onConfirm}>
                Okey
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyles.colors.error500,
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
    },
});

export default ErrorOverlay;