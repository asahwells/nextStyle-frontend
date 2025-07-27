"use client"

import Link from "next/link"

import { useState } from "react"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import type { ClothingItem } from "@/types/clothing"

interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  website: string | null
  bio: string | null
}

interface UserProfileProps {
  initialProfile: Profile | null
  user: {
    id: string
    name: string
    email: string
    avatar: string
    bio: string
    joinedDate: string
    lastLogin: string
  }
}

export function UserProfile({ initialProfile, user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("saved")
  const [profile, setProfile] = useState<Profile>(
    initialProfile || {
      id: user.id,
      username: null,
      full_name: user.name || null,
      avatar_url: user.avatar || null,
      website: null,
      bio: user.bio || null,
    },
  )
  const [isUpdating, setIsUpdating] = useState(false)
  const [savedItems, setSavedItems] = useState<ClothingItem[]>([])
  const [tryOnHistory, setTryOnHistory] = useState<any[]>([])
  const [isLoadingSaved, setIsLoadingSaved] = useState(true)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)

  const { signOut } = useAuth()
  const { toast } = useToast()
  const supabase = createClient()

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdateProfile = async () => {
    setIsUpdating(true)

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username: profile.username,
        full_name: profile.full_name,
        website: profile.website,
        bio: profile.bio,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const loadSavedItems = async () => {
    setIsLoadingSaved(true)
    try {
      const { data, error } = await supabase.from("saved_items").select("product_id").eq("user_id", user.id)

      if (error) throw error

      // In a real app, you would fetch the product details for each saved item
      // For now, we'll use the mock data
      setSavedItems(savedItems)
    } catch (error) {
      console.error("Error loading saved items:", error)
    } finally {
      setIsLoadingSaved(false)
    }
  }

  const loadTryOnHistory = async () => {
    setIsLoadingHistory(true)
    try {
      const { data, error } = await supabase
        .from("try_on_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      // In a real app, you would fetch the product details for each history item
      // For now, we'll use the mock data
      setTryOnHistory(tryOnHistory)
    } catch (error) {
      console.error("Error loading try-on history:", error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Tabs defaultValue="saved" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full justify-start">
        <TabsTrigger value="saved">Saved Items</TabsTrigger>
        <TabsTrigger value="history">Try-On History</TabsTrigger>
        <TabsTrigger value="settings">Account Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="saved" className="mt-6">
        {isLoadingSaved ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin text-muted-foreground">Loading...</div>
          </div>
        ) : savedItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/product/${item.id}`}>View Details</Link>
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/try-on?item=${item.id}`}>Try On</Link>
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                    >
                      <div className="h-4 w-4">Remove</div>
                      <span className="sr-only">Remove from saved</span>
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <p className="mt-1 font-medium">${item.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="mb-2 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <div className="h-5 w-5 text-muted-foreground">Heart</div>
            </div>
            <h3 className="mb-1 text-lg font-medium">No saved items yet</h3>
            <p className="mb-4 text-muted-foreground">Items you save will appear here</p>
            <Button asChild>
              <Link href="/shop">Browse Collection</Link>
            </Button>
          </div>
        )}
      </TabsContent>
      <TabsContent value="history" className="mt-6">
        {isLoadingHistory ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin text-muted-foreground">Loading...</div>
          </div>
        ) : tryOnHistory.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tryOnHistory.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          Try Again
                        </Button>
                        <Button size="sm" variant="secondary">
                          <div className="mr-2 h-4 w-4">Share</div>
                          <span className="sr-only">Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <div className="h-4 w-4">Heart</div>
                        <span className="sr-only">Save to favorites</span>
                      </Button>
                    </div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <div className="mt-2 flex justify-between">
                      <p className="font-medium">${item.price}</p>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/product/${item.productId}`}>View Item</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="mb-2 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <div className="h-5 w-5 text-muted-foreground">SVG</div>
            </div>
            <h3 className="mb-1 text-lg font-medium">No try-on history yet</h3>
            <p className="mb-4 text-muted-foreground">Your virtual try-ons will appear here</p>
            <Button asChild>
              <Link href="/try-on">Try On Now</Link>
            </Button>
          </div>
        )}
      </TabsContent>
      <TabsContent value="settings" className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.full_name || user.email} />
              <AvatarFallback className="text-3xl">
                {profile.full_name?.charAt(0) || user.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile.full_name || user.email}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">About Me</h3>
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Joined On:</p>
                <p>{user.joinedDate}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Last Login:</p>
                <p>{user.lastLogin}</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=96&width=96&query=woman portrait"} />
                  <AvatarFallback>{profile.full_name?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={profile.full_name || ""}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={profile.username || ""} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={user.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" value={profile.website || ""} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" value={profile.bio || ""} onChange={handleProfileChange} rows={3} />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
              <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                {isUpdating && <div className="mr-2 h-4 w-4">Loading...</div>}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
