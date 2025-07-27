import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import axios from "axios"

const API_BASE_URL = "https://nextstyle-601aa5fe000d.herokuapp.com/api"

interface User {
  id: string
  email: string
  role: "user" | "brand" | "admin"
  is_brand_approved: boolean // Relevant for 'brand' role
  access_token: string
  refresh_token: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signOut: () => void
  refreshToken: () => Promise<void>
  initializeAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      signUp: async (email: string, password: string, name: string) => {
        try {
          set({ isLoading: true })

          const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
            email,
            password,
            name,
            role: "shopper",
          })

          if (response.data.success) {
            const { user, access_token, refresh_token } = response.data.data
            set({
              user: { ...user, access_token, refresh_token },
              isAuthenticated: true,
              isLoading: false,
            })
            return { success: true, message: "Account created successfully!" }
          } else {
            set({ isLoading: false })
            return { success: false, message: response.data.message || "Sign up failed" }
          }
        } catch (error: any) {
          set({ isLoading: false })
          return {
            success: false,
            message: error.response?.data?.message || "An error occurred during sign up",
          }
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true })

          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
          })

          if (response.data.success) {
            const { user, access_token, refresh_token } = response.data.data
            set({
              user: { ...user, access_token, refresh_token },
              isAuthenticated: true,
              isLoading: false,
            })
            return { success: true, message: "Signed in successfully!" }
          } else {
            set({ isLoading: false })
            return { success: false, message: response.data.message || "Sign in failed" }
          }
        } catch (error: any) {
          set({ isLoading: false })
          return {
            success: false,
            message: error.response?.data?.message || "An error occurred during sign in",
          }
        }
      },

      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      refreshToken: async () => {
        try {
          const { user } = get()
          if (!user || !user.refresh_token) return

          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
              },
            },
          )

          if (response.data.success) {
            const { user: updatedUser, access_token: newAccessToken } = response.data.data
            set({
              user: { ...updatedUser, access_token: newAccessToken },
              isAuthenticated: true,
            })
          } else {
            get().signOut()
          }
        } catch (error) {
          console.error("Token refresh failed:", error)
          get().signOut()
        }
      },

      initializeAuth: async () => {
        const { user, refreshToken } = get()
        if (user && user.access_token) {
          await refreshToken()
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
