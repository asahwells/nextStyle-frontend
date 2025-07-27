"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("error")
        setMessage("No verification token provided.")
        return
      }

      try {
        // Simulate API call to verify the token
        // In a real application, you would send this token to your backend for verification
        // For example: const response = await axios.post('/api/auth/verify-email', { token });
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

        // Simulate success or failure based on a dummy token value
        if (token === "valid_token_123") {
          setStatus("success")
          setMessage("Your email has been successfully verified!")
        } else {
          setStatus("error")
          setMessage("Invalid or expired verification token.")
        }
      } catch (error) {
        console.error("Email verification error:", error)
        setStatus("error")
        setMessage("An error occurred during verification. Please try again.")
      }
    }

    verifyToken()
  }, [token])

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-1">
          {status === "loading" && <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />}
          {status === "success" && <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />}
          {status === "error" && <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />}
          <CardTitle className="text-2xl">
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "success" && (
            <Button asChild className="w-full">
              <Link href="/auth/signin">Go to Sign In</Link>
            </Button>
          )}
          {status === "error" && (
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/auth/signup">Try Signing Up Again</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
