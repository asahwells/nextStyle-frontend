"use client"

import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"
import { useAuthStore } from "@/lib/auth-store"
import { toast } from "@/components/ui/use-toast"

export function GoogleButton() {
  const { signIn } = useAuthStore()

  const handleGoogleSignIn = async () => {
    try {
      // Simulate Google sign-in process
      // In a real application, this would redirect to Google's OAuth flow
      // and then handle the callback.
      toast({
        title: "Google Sign-In Initiated",
        description: "Redirecting to Google for authentication...",
      })
      // Simulate a successful sign-in after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
      signIn({
        id: "google_user_123",
        email: "google.user@example.com",
        role: "user",
        is_brand_approved: false,
        access_token: "dummy_google_access_token",
        refresh_token: "dummy_google_refresh_token",
      })
      toast({
        title: "Signed in with Google",
        description: "You have successfully signed in with your Google account.",
      })
    } catch (error) {
      console.error("Google sign-in error:", error)
      toast({
        title: "Google Sign-In Failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleSignIn}>
      <Chrome className="mr-2 h-4 w-4" />
      Sign in with Google
    </Button>
  )
}
