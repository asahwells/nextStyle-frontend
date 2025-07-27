"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleButton } from "@/components/auth/google-button"
import { useAuthStore } from "@/lib/auth-store"
import { toast } from "@/components/ui/use-toast"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call for sign-in
      // In a real application, you would send credentials to your backend
      // For example: const response = await axios.post('/api/auth/signin', { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      if (email === "user@example.com" && password === "password123") {
        signIn({
          id: "user_123",
          email: email,
          role: "user",
          is_brand_approved: false,
          access_token: "dummy_user_access_token",
          refresh_token: "dummy_user_refresh_token",
        })
        toast({
          title: "Sign-in Successful",
          description: "Welcome back!",
        })
        // Redirect to home or dashboard
        window.location.href = "/"
      } else {
        toast({
          title: "Sign-in Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Sign-in error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your email below to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <GoogleButton />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline" prefetch={false}>
                Sign up
              </Link>
            </div>
            <div className="text-center text-sm">
              <Link href="/auth/forgot-password" className="underline" prefetch={false}>
                Forgot password?
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
