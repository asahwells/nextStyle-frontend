"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/auth-store"
import { toast } from "@/components/ui/use-toast"

export default function AdminSignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call for admin sign-in
      // In a real application, you would send credentials to your backend
      // For example: const response = await axios.post('/api/admin/signin', { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      if (email === "admin@example.com" && password === "adminpassword") {
        signIn({
          id: "admin_123",
          email: email,
          role: "admin",
          is_brand_approved: true, // Admins are always approved
          access_token: "dummy_admin_access_token",
          refresh_token: "dummy_admin_refresh_token",
        })
        toast({
          title: "Admin Sign-in Successful",
          description: "Welcome back, administrator!",
        })
        // Redirect to admin dashboard
        window.location.href = "/admin"
      } else {
        toast({
          title: "Sign-in Failed",
          description: "Invalid email or password for admin access.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Admin sign-in error:", error)
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
          <CardTitle className="text-2xl">Admin Sign In</CardTitle>
          <CardDescription>Access your brand administration dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
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
            <div className="mt-4 text-center text-sm">
              <Link href="/auth/forgot-password" className="underline" prefetch={false}>
                Forgot password?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
