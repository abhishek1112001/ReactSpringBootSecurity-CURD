import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get initial state from localStorage
  const initialToken = localStorage.getItem("token");
  const initialRole = localStorage.getItem("role");

  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);
  const [isAdmin, setIsAdmin] = useState(initialRole === "ADMIN");

  // This effect will update the state if the page is refreshed
  useEffect(() => {
    if (initialToken) {
      setIsAuthenticated(true);
      if (initialRole === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, [initialToken, initialRole]);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    if (role === "ADMIN") {
      setIsAdmin(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
