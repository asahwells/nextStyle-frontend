"use client"

import React, { createContext, useContext } from "react"
import { useAuthStore } from "./auth-store"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: {
    id: string
    email: string
    role: "user" | "brand" | "admin"
    is_brand_approved: boolean
  } | null
  isAuthenticated: boolean
  signIn: (user: {
    id: string
    email: string
    role: "user" | "brand" | "admin"
    is_brand_approved: boolean
    access_token: string
    refresh_token: string
  }) => void
  signUp: (user: {
    id: string
    email: string
    role: "user" | "brand" | "admin"
    is_brand_approved: boolean
    access_token: string
    refresh_token: string
  }) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, signIn, signUp, signOut } = useAuthStore()
  const router = useRouter()

  // This effect can be used to handle initial authentication state or redirects
  // For example, if you want to redirect to login page if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated && !['/auth/signin', '/auth/signup', '/auth/forgot-password', '/auth/reset-password', '/auth/brand-signup'].includes(router.pathname)) {
  //     router.push('/auth/signin');
  //   }
  // }, [isAuthenticated, router]);

  const contextValue = React.useMemo(
    () => ({
      user,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
    }),
    [user, isAuthenticated, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
