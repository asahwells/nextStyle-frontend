import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"

// Create axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
})

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "user" | "admin" | "brand"
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
  updateUser: (userData: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // Mock sign in - replace with actual API call
          const mockUser: User = {
            id: "1",
            email,
            name: email.split("@")[0],
            role: "user",
          }

          // Set auth token in cookie
          if (typeof document !== "undefined") {
            document.cookie = `auth-token=mock-token-${Date.now()}; path=/; max-age=86400`
          }

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signUp: async (email: string, password: string, name: string) => {
        set({ isLoading: true })
        try {
          // Mock sign up - replace with actual API call
          const mockUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role: "user",
          }

          // Set auth token in cookie
          if (typeof document !== "undefined") {
            document.cookie = `auth-token=mock-token-${Date.now()}; path=/; max-age=86400`
          }

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signOut: () => {
        // Remove auth token cookie
        if (typeof document !== "undefined") {
          document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
        }

        set({
          user: null,
          isAuthenticated: false,
        })
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

// Add request interceptor to include auth token
apiClient.interceptors.request.use((config) => {
  if (typeof document !== "undefined") {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="))
      ?.split("=")[1]

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }
  }

  return config
})

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on 401
      useAuthStore.getState().signOut()
    }
    return Promise.reject(error)
  },
)
