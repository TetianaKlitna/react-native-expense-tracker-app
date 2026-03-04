import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ExpensesContextProvider from './store/expenses-context';
import AuthStack from './navigation/AuthStack';
import AuthenticatedStack from './navigation/AuthenticatedStack';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext } from 'react';
import LoadingOverlay from './ui/LoadingOverlay';

function Navigation() {
  const authCtx = useContext(AuthContext);

  if (authCtx.isAuthenticating) {
    return <LoadingOverlay />;
  }

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ExpensesContextProvider>
          <Navigation />
        </ExpensesContextProvider>
      </AuthContextProvider>
    </>
  );
}

