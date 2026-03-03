
import { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <LoadingOverlay message="Creating user..." />
    );
  }

  return <AuthContent onAuthenticate={signupHandler} isLogin={false} />;
}

export default SignupScreen;