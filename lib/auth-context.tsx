"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useAuthStore } from "./auth-store"

interface AuthContextType {
  user: any
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authStore = useAuthStore()

  useEffect(() => {
    // Check for existing auth token on mount
    if (typeof document !== "undefined") {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth-token="))
        ?.split("=")[1]

      if (authToken && !authStore.isAuthenticated) {
        // Restore user session if token exists
        const mockUser = {
          id: "1",
          email: "user@example.com",
          name: "User",
          role: "user" as const,
        }
        authStore.updateUser(mockUser)
      }
    }
  }, [authStore])

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
