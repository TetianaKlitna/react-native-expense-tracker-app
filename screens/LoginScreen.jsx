import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { loginUser } from '../util/auth';
import LoadingOverlay from '../ui/LoadingOverlay';

function LoginScreen() {

  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const user = await loginUser(email, password);
      console.log("User logged in:", user);
    } catch (error) {
      console.error(error.message);
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