"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, X, Loader2 } from "lucide-react"
import { useFormState } from "react-dom"
import { updateBrandApproval } from "@/app/actions/brand-actions"
import { toast } from "@/components/ui/use-toast"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"

interface BrandRequest {
  id: string
  brandName: string
  contactEmail: string
  website?: string
  description: string
  logoUrl?: string
  status: "pending" | "approved" | "rejected"
  requestedAt: string
}

export default function AdminPendingPage() {
  const [pendingBrands, setPendingBrands] = useState<BrandRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [state, formAction] = useFormState(updateBrandApproval, { success: false, message: "" })
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You do not have permission to view this page.",
        variant: "destructive",
      })
      router.push("/admin/signin")
    }
  }, [user, router])

  useEffect(() => {
    fetchPendingBrands()
  }, [state]) // Re-fetch when approval status changes

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state])

  const fetchPendingBrands = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulate fetching pending brand requests from a backend
      // In a real app, this would be an API call, e.g., axios.get('/api/admin/pending-brands')
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

      const dummyPendingBrands: BrandRequest[] = [
        {
          id: "brand_req_1",
          brandName: "EcoThreads",
          contactEmail: "info@ecothreads.com",
          website: "https://www.ecothreads.com",
          description: "Sustainable fashion brand focusing on organic materials.",
          logoUrl: "/generic-brand-logo.png",
          status: "pending",
          requestedAt: "2024-07-20",
        },
        {
          id: "brand_req_2",
          brandName: "UrbanWear Co.",
          contactEmail: "support@urbanwear.co",
          website: "https://www.urbanwear.co",
          description: "Streetwear brand with unique designs.",
          logoUrl: "/generic-brand-logo.png",
          status: "pending",
          requestedAt: "2024-07-22",
        },
        // Add more dummy data as needed
      ]
      setPendingBrands(dummyPendingBrands)
    } catch (err) {
      setError("Failed to load pending brand requests.")
      console.error("Error fetching pending brands:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== "admin") {
    return null // Render nothing or a loading spinner while redirecting
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Pending Brand Approvals</h1>

      <Card>
        <CardHeader>
          <CardTitle>Brand Registration Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Loading requests...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchPendingBrands}>Try Again</Button>
            </div>
          ) : pendingBrands.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No pending brand requests</h3>
              <p className="text-muted-foreground mb-6">All brand registrations have been reviewed.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand Name</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingBrands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">{brand.brandName}</TableCell>
                    <TableCell>{brand.contactEmail}</TableCell>
                    <TableCell>
                      {brand.website ? (
                        <a href={brand.website} target="_blank" rel="noopener noreferrer" className="underline">
                          Visit Site
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{brand.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{brand.status}</Badge>
                    </TableCell>
                    <TableCell>{brand.requestedAt}</TableCell>
                    <TableCell className="text-right">
                      <form action={formAction} className="inline-flex gap-2">
                        <input type="hidden" name="brandId" value={brand.id} />
                        <Button
                          type="submit"
                          name="action"
                          value="approve"
                          size="icon"
                          variant="outline"
                          className="text-green-600 hover:text-green-600 bg-transparent"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          type="submit"
                          name="action"
                          value="reject"
                          size="icon"
                          variant="outline"
                          className="text-red-600 hover:text-red-600 bg-transparent"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
