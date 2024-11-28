// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import { mockUsers } from '../data/mockData';
import { findUserRole } from '../utils/rbacUtils';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage on first load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();



  const login = (username, password) => {
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userWithRole = {
        ...foundUser,
        role: findUserRole(foundUser)
      };
      setUser(userWithRole);
      localStorage.setItem('user', JSON.stringify(userWithRole));
      return userWithRole;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Navigate to login page
    navigate('/login', { replace: true });

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};