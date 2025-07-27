"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function AdminSettings() {
  const [brandSettings, setBrandSettings] = useState({
    name: "Urban Edge",
    description: "Contemporary fashion for the modern individual.",
    website: "https://urbanedge.example.com",
    email: "contact@urbanedge.example.com",
    phone: "+1 (555) 123-4567",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newTryOns: true,
    analytics: true,
    productUpdates: false,
  })

  const [apiSettings, setApiSettings] = useState({
    apiKey: "sk_test_urbanedge_12345",
    webhookUrl: "https://urbanedge.example.com/api/webhook",
  })

  const handleBrandSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBrandSettings({
      ...brandSettings,
      [e.target.name]: e.target.value,
    })
  }

  const handleNotificationToggle = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings],
    })
  }

  const handleApiSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiSettings({
      ...apiSettings,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Tabs defaultValue="brand">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="brand">Brand Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="api">API & Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="brand" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Brand Information</CardTitle>
            <CardDescription>Update your brand details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Brand Name</Label>
              <Input id="name" name="name" value={brandSettings.name} onChange={handleBrandSettingsChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Brand Description</Label>
              <Textarea
                id="description"
                name="description"
                value={brandSettings.description}
                onChange={handleBrandSettingsChange}
                rows={4}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" value={brandSettings.website} onChange={handleBrandSettingsChange} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={brandSettings.email}
                  onChange={handleBrandSettingsChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={brandSettings.phone} onChange={handleBrandSettingsChange} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={() => handleNotificationToggle("emailNotifications")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newTryOns">New Try-Ons</Label>
                <p className="text-sm text-muted-foreground">Get notified when users try on your items</p>
              </div>
              <Switch
                id="newTryOns"
                checked={notificationSettings.newTryOns}
                onCheckedChange={() => handleNotificationToggle("newTryOns")}
                disabled={!notificationSettings.emailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics">Analytics Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly analytics reports</p>
              </div>
              <Switch
                id="analytics"
                checked={notificationSettings.analytics}
                onCheckedChange={() => handleNotificationToggle("analytics")}
                disabled={!notificationSettings.emailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="productUpdates">Product Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
              </div>
              <Switch
                id="productUpdates"
                checked={notificationSettings.productUpdates}
                onCheckedChange={() => handleNotificationToggle("productUpdates")}
                disabled={!notificationSettings.emailNotifications}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="api" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>Manage your API keys and integration settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  name="apiKey"
                  value={apiSettings.apiKey}
                  onChange={handleApiSettingsChange}
                  type="password"
                />
                <Button variant="outline">Regenerate</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key provides access to your brand data. Keep it secure.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                name="webhookUrl"
                value={apiSettings.webhookUrl}
                onChange={handleApiSettingsChange}
              />
              <p className="text-xs text-muted-foreground">
                We'll send events to this URL when users interact with your items.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Connected Services</h3>
              <div className="rounded-md border p-4">
                <p className="text-sm">No services connected yet.</p>
                <Button variant="outline" className="mt-2">
                  Connect Service
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save API Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
