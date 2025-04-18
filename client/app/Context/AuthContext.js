'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/auth/me', {
        withCredentials: true
      });
      setUser(data);
      return data;
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('Error fetching user:', error);
      }
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', credentials, {
        withCredentials: true
      });
      const userData = await fetchUser();
      router.refresh();
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.delete('http://localhost:3000/api/auth/logout', {
        withCredentials: true
      });
      setUser(null);
      localStorage.removeItem('authForm');
      sessionStorage.clear();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error; 
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};