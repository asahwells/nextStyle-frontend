"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Simulate API call for password reset
    try {
      // In a real application, you would send a request to your backend
      // For example: await axios.post('/api/auth/forgot-password', { email });
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      if (email === "test@example.com") {
        setMessage("If an account with that email exists, a password reset link has been sent.")
        toast({
          title: "Password Reset Email Sent",
          description: "Check your inbox for instructions.",
        })
      } else {
        setMessage("If an account with that email exists, a password reset link has been sent.")
        toast({
          title: "Password Reset Email Sent",
          description: "Check your inbox for instructions.",
        })
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      setMessage("Failed to send reset email. Please try again.")
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
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
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            {message && <p className="mt-4 text-center text-sm text-muted-foreground">{message}</p>}
            <div className="mt-4 text-center text-sm">
              Remember your password?{" "}
              <Link href="/auth/signin" className="underline" prefetch={false}>
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
