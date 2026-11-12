import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(
    () => localStorage.getItem("userToken") || null
  );
  const [user, setUser] = useState(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("userId");
    const bio = localStorage.getItem("bio");
    const avatar = localStorage.getItem("avatar");
    return name || email ? { name, email, id, bio, avatar } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("userId");
    const bio = localStorage.getItem("bio");
    const avatar = localStorage.getItem("avatar");

    if (token) setUserToken(token);
    if (name || email) {
      setUser({ name, email, id, bio, avatar });
    }
  }, []);

  const login = (userData) => {
    if (userData?.token) {
      localStorage.setItem("userToken", userData.token);
      setUserToken(userData.token);
    }
    if (userData?.id) localStorage.setItem("userId", userData.id);
    if (userData?.name) localStorage.setItem("name", userData.name);
    if (userData?.email) localStorage.setItem("email", userData.email);
    if (userData?.role) localStorage.setItem("role", userData.role);

    setUser({
      name: userData?.name || localStorage.getItem("name"),
      email: userData?.email || localStorage.getItem("email"),
      id: userData?.id || localStorage.getItem("userId"),
      role: userData?.role || localStorage.getItem("role"),
    });
  };

  const logout = () => {
    localStorage.clear();
    setUserToken(null);
    setUser(null);
  };

  const updateUser = (updatedData) => {
    if (updatedData?.name) localStorage.setItem("name", updatedData.name);
    if (updatedData?.bio) localStorage.setItem("bio", updatedData.bio);
    if (updatedData?.avatar) localStorage.setItem("avatar", updatedData.avatar);

    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const value = {
    userToken,
    user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}