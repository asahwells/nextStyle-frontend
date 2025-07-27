import { UserProfile } from "@/components/user-profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfilePage() {
  // Dummy user data for demonstration
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Fashion enthusiast and virtual try-on advocate.",
    joinedDate: "January 15, 2023",
    lastLogin: "July 26, 2024",
  }

  return (
    <div className="container py-8 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <div className="lg:col-span-2">
          <UserProfile user={userData} />
        </div>

        {/* Quick Actions / Other Info */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/reset-password">Change Password</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/orders">View Orders</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/wishlist">My Wishlist</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Account Type:</span>
                <span className="font-medium text-foreground">Standard User</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Email Verified:</span>
                <span className="font-medium text-green-500">Yes</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Brand Account:</span>
                <span className="font-medium text-red-500">No</span>
              </div>
              <Button asChild variant="link" className="p-0 h-auto mt-4">
                <Link href="/admin/brand-onboarding">Register as a Brand</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
