"use client";

import { useState, useCallback } from "react";
import { User } from "@/types/user.types";

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for saved session
  useState(() => {
    const savedUser = localStorage.getItem("cubaprop-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user
    const mockUser: User = {
      id: "user-1",
      name: "Usuario Demo",
      email,
      reputation: 4.8,
      totalProperties: 2,
      totalTransactions: 23,
      isVerified: true,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem("cubaprop-user", JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: "user-" + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      reputation: 0,
      totalProperties: 0,
      totalTransactions: 0,
      isVerified: false,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem("cubaprop-user", JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("cubaprop-user");
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data, updatedAt: new Date() };
      localStorage.setItem("cubaprop-user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };
}
