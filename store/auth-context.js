import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { }
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);

    function authenticate(token) {
        setAuthToken(token);
    }

    return (
        <AuthContext.Provider value={{
            token: authToken,
            isAuthenticated: !!authToken,
            authenticate,
            logout: () => setAuthToken(null),
        }}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;