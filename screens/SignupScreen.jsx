
import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../ui/LoadingOverlay';

function SignupScreen() {

  const [isLoading, setIsLoading] = useState(false);

  async function signupHandler({ email, password }) {
    setIsLoading(true);
    try {
      const user = await createUser(email, password);
      console.log("User created:", user);
    } catch (error) {
      console.error(error.message);
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