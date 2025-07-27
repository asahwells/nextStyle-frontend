"use client"

import type React from "react"

import { AdminNav } from "@/components/admin/admin-nav"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      // If no user, redirect to sign-in
      router.push("/admin/signin")
      return
    }

    if (user.role !== "admin") {
      // If user is not an admin, redirect to pending page or home
      if (user.role === "brand" && !user.is_brand_approved) {
        router.push("/admin/pending")
      } else {
        toast({
          title: "Access Denied",
          description: "You do not have administrative privileges.",
          variant: "destructive",
        })
        router.push("/") // Redirect non-admin users to home
      }
    }
  }, [user, router, signOut])

  if (!user || user.role !== "admin") {
    // Optionally render a loading state or nothing while redirecting
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading or redirecting...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  )
}
