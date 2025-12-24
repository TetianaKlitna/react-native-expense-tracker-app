import { View, Pressable, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';

function Button({ children, onPress, mode = 'default', style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          mode === 'flat' && styles.flat,
          pressed && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            mode === 'flat' && styles.flatButtonText,
          ]}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.50,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: GlobalStyles.colors.primary50,
    textAlign: 'center',
    fontSize: 16,
  },
  flatButtonText: {
    color: GlobalStyles.colors.primary200,
  },
});

export default Button;