import React, { createContext, useContext, useState, useEffect } from "react";
import { apiLogin, apiRegister, apiLogout, apiGetMe } from "./service";

// Auth context for user state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session at load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userObj = await apiGetMe();
        setUser(userObj);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  // PUBLIC_INTERFACE
  async function login(credentials) {
    try {
      setLoading(true);
      await apiLogin(credentials);
      const userObj = await apiGetMe();
      setUser(userObj);
      setAuthError(null);
      setLoading(false);
      return true;
    } catch (err) {
      setAuthError("Invalid login. Please check your credentials.");
      setUser(null);
      setLoading(false);
      return false;
    }
  }

  // PUBLIC_INTERFACE
  async function register(data) {
    try {
      setLoading(true);
      await apiRegister(data);
      setAuthError(null);
      setLoading(false);
      return true;
    } catch (e) {
      setAuthError("Registration failed. Pick different username?");
      setLoading(false);
      return false;
    }
  }

  // PUBLIC_INTERFACE
  async function logout() {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  }

  // PUBLIC_INTERFACE
  function clearError() {
    setAuthError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
