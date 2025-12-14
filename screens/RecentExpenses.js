import { Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function RecentExpenses() {
  return <ExpensesOutput expenses={[]} expensesPeriod="Last 7 day" />;
}

const styles = StyleSheet.create({});

export default RecentExpenses;