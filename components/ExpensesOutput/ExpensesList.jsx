import { View, FlatList, Text} from 'react-native';

function ExpensesList({ expenses }) {
    return (
        <View>

            <FlatList 
              data={expenses} 
              renderItem={({item}) => {
                return (
                    <Text>{item.description}</Text>
                );
              }}
              keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default ExpensesList;