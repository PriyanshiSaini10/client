import { use } from "react";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [login, setLogin] = useState(true);
    const [profile, setProfile] = useState({});

    const value = {login , setLogin, profile, setProfile};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}