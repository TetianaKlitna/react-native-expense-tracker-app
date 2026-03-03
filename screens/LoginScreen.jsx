import { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../util/auth';
import LoadingOverlay from '../ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <LoadingOverlay message="Logging in..." />
    );
  }

  return <AuthContent onAuthenticate={loginHandler} isLogin={true} />;
}

export default LoginScreen;