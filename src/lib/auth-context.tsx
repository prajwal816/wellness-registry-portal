
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './db';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'startup' | 'official' | 'regulator';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, address: string, role: 'startup' | 'official' | 'regulator') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem('ayush_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const foundUser = await db.getUserByEmail(email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Create a safe user object without the password
      const safeUser = {
        id: foundUser.id,
        email: foundUser.email,
        fullName: foundUser.fullName,
        role: foundUser.role
      };
      
      setUser(safeUser);
      
      // Store user in localStorage
      localStorage.setItem('ayush_current_user', JSON.stringify(safeUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    fullName: string, 
    address: string, 
    role: 'startup' | 'official' | 'regulator'
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const existingUser = await db.getUserByEmail(email);
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      const newUser = await db.createUser({
        email,
        password,
        fullName,
        address,
        role
      });
      
      // Create a safe user object without the password
      const safeUser = {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      };
      
      setUser(safeUser);
      
      // Store user in localStorage
      localStorage.setItem('ayush_current_user', JSON.stringify(safeUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ayush_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
