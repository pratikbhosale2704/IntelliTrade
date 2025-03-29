// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the Auth context
const AuthContext = createContext();

// Provider component to wrap your app and make the auth object available to any child component
export const AuthProvider = ({ children }) => {
  // State to hold user info; initialize from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Stored user from localStorage:", storedUser); // Debugging
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login function that sets the user object and saves it to localStorage
  const login = (userData) => {
    console.log("Logging in user:", userData); // Debugging
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function that clears the user object and removes it from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext easily
export const useAuth = () => useContext(AuthContext);

export default AuthContext;