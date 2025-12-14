import { View, FlatList } from 'react-native';

function ExpensesList({ expenses }) {
    return (
        <View>
            <FlatList 
              data={expenses} 
              renderItem={(itemData) => <Text>{itemData.item.description}</Text>}/>
        </View>
    );
}

export default ExpensesList;