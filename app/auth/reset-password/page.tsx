"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") // Assuming a token is passed in the URL
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isValidToken, setIsValidToken] = useState(false)

  useEffect(() => {
    // In a real application, you would validate the token with your backend
    // For simplicity, we'll assume any token makes the form visible
    if (token) {
      setIsValidToken(true)
    } else {
      setMessage("Invalid or missing reset token.")
      toast({
        title: "Error",
        description: "Invalid or missing password reset token.",
        variant: "destructive",
      })
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.")
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.")
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulate API call for password reset
    try {
      // In a real application, you would send a request to your backend
      // For example: await axios.post('/api/auth/reset-password', { token, password });
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      setMessage("Your password has been reset successfully. You can now sign in.")
      toast({
        title: "Password Reset Successful",
        description: "You can now sign in with your new password.",
      })
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Reset password error:", error)
      setMessage("Failed to reset password. Please try again.")
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isValidToken) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/40 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Invalid Link</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/forgot-password" className="underline" prefetch={false}>
              Request a new reset link
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
            {message && (
              <p
                className={`mt-4 text-center text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
