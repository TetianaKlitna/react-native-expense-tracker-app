import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase.config';

async function createUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.getIdToken();
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(    
        auth,
        email,
        password
    );
    return userCredential.user.getIdToken();
  } catch (error) {
    throw error;
  }
}   

export { auth, createUser, loginUser };