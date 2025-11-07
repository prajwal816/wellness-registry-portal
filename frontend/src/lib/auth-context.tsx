import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./db";
import { authAPI } from "./api";

interface User {
  id: string;
  email: string;
  fullName: string;
  address: string;
  role: "startup" | "official" | "regulator";
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    fullName: string,
    address: string,
    role: "startup" | "official" | "regulator"
  ) => Promise<void>;
  logout: () => void;
  googleLogin: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem("ayush_current_user");
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
        throw new Error("Invalid email or password");
      }

      // Create a safe user object without the password
      const safeUser = {
        id: foundUser.id,
        email: foundUser.email,
        fullName: foundUser.fullName,
        address: foundUser.address,
        role: foundUser.role,
        createdAt: foundUser.createdAt,
      };

      setUser(safeUser);

      // Store user in localStorage
      localStorage.setItem("ayush_current_user", JSON.stringify(safeUser));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string,
    address: string,
    role: "startup" | "official" | "regulator"
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const existingUser = await db.getUserByEmail(email);

      if (existingUser) {
        throw new Error("Email already in use");
      }

      const newUser = await db.createUser({
        email,
        password,
        fullName,
        address,
        role,
      });

      // Create a safe user object without the password
      const safeUser = {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        address: newUser.address,
        role: newUser.role,
        createdAt: newUser.createdAt,
      };

      setUser(safeUser);

      // Store user in localStorage
      localStorage.setItem("ayush_current_user", JSON.stringify(safeUser));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ayush_current_user");
    localStorage.removeItem("token");
  };

  const refreshUser = () => {
    const storedUser = localStorage.getItem("ayush_current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        signup,
        logout,
        googleLogin: () => authAPI.googleLogin(),
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
