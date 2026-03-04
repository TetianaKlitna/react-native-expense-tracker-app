import { createContext, useEffect, useState } from "react";
import { onIdTokenChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase.config";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    isAuthenticating: false,
    authenticate: (token) => { },
    logout: () => { }
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            try {
                if (user) {
                    const token = await user.getIdToken();
                    setAuthToken(token);
                } else {
                    setAuthToken(null);
                }
            } catch {
                setAuthToken(null);
            } finally {
                setIsAuthenticating(false);
            }
        });

        return unsubscribe;
    }, []);

    function authenticate(token) {
        setAuthToken(token);
        setIsAuthenticating(false);
    }

    async function logout() {
        try {
            await signOut(auth);
        } catch {
            setAuthToken(null);
        }
    }

    return (
        <AuthContext.Provider value={{
            token: authToken,
            isAuthenticated: !!authToken,
            isAuthenticating,
            authenticate,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;