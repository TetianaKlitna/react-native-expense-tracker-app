import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ExpensesContextProvider from './store/expenses-context';
import AuthStack from './navigation/AuthStack';
import AuthenticatedStack from './navigation/AuthenticatedStack';

function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <AuthenticatedStack /> */}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Navigation />
      </ExpensesContextProvider>
    </>
  );
}

