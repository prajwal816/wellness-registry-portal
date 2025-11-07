import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "./api";
import { registerWithRetry, loginWithRetry } from "./api-with-retry";

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
      // Use backend API for login with automatic retry
      const response = await loginWithRetry(
        { email, password },
        (attempt, maxAttempts) => {
          setError(
            `Backend is waking up... Retrying (attempt ${attempt}/${maxAttempts})`
          );
        }
      );
      const { token, user: backendUser } = response.data;

      // Save token
      localStorage.setItem("token", token);

      // Map backend user to frontend user shape
      const safeUser = {
        id: backendUser.id || backendUser._id,
        email: backendUser.email,
        fullName: backendUser.name || backendUser.fullName || "User",
        address: backendUser.address || "",
        role:
          backendUser.role === "admin" || backendUser.role === "reviewer"
            ? "official"
            : "startup",
        createdAt: backendUser.createdAt
          ? new Date(backendUser.createdAt)
          : new Date(),
      };

      setUser(safeUser);

      // Store user in localStorage
      localStorage.setItem("ayush_current_user", JSON.stringify(safeUser));
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "An unknown error occurred";

      if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
        errorMessage =
          "Cannot connect to server. The backend may be starting up (this can take 30-60 seconds on first request). Please try again in a moment.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw err;
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
      // Use backend API for registration with automatic retry
      const response = await registerWithRetry(
        {
          name: fullName,
          email,
          password,
        },
        (attempt, maxAttempts) => {
          setError(
            `Backend is waking up... Retrying (attempt ${attempt}/${maxAttempts}). Please wait...`
          );
        }
      );
      const { token, user: backendUser } = response.data;

      // Save token
      localStorage.setItem("token", token);

      // Map backend user to frontend user shape
      const safeUser = {
        id: backendUser.id || backendUser._id,
        email: backendUser.email,
        fullName: backendUser.name || fullName,
        address: address,
        role:
          backendUser.role === "admin" || backendUser.role === "reviewer"
            ? "official"
            : "startup",
        createdAt: backendUser.createdAt
          ? new Date(backendUser.createdAt)
          : new Date(),
      };

      setUser(safeUser);

      // Store user in localStorage
      localStorage.setItem("ayush_current_user", JSON.stringify(safeUser));
    } catch (err: any) {
      console.error("Signup error:", err);
      let errorMessage = "An unknown error occurred";

      if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
        errorMessage =
          "Cannot connect to server. The backend may be starting up (this can take 30-60 seconds on first request). Please try again in a moment.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw err;
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
