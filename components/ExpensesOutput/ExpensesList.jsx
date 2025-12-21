import { View, FlatList, Text, StyleSheet } from 'react-native';
import ExpenseItem from './ExpenseItem';

function ExpensesList({ expenses }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => {
          return (
            <ExpenseItem {...item} />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});

export default ExpensesList;