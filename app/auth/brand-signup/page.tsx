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
import { GoogleButton } from "@/components/auth/google-button"

export default function BrandSignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Sign-up Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      // Simulate API call for brand sign-up
      // In a real application, you would send credentials to your backend
      // For example: const response = await axios.post('/api/auth/brand-signup', { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      // Simulate successful sign-up and set user in store
      signUp({
        id: `brand_user_${Date.now()}`,
        email: email,
        role: "brand",
        is_brand_approved: false, // Brands need approval
        access_token: "dummy_brand_access_token",
        refresh_token: "dummy_brand_refresh_token",
      })
      toast({
        title: "Brand Account Created",
        description: "Your brand account has been created. Awaiting admin approval.",
      })
      // Redirect to a pending approval page
      window.location.href = "/admin/pending"
    } catch (error) {
      console.error("Brand sign-up error:", error)
      toast({
        title: "Sign-up Failed",
        description: "Could not create brand account. Please try again.",
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
          <CardTitle className="text-2xl">Brand Sign Up</CardTitle>
          <CardDescription>Create an account to register your brand.</CardDescription>
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up as Brand"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/signin" className="underline" prefetch={false}>
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
