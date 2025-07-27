"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminCatalog } from "./catalog"
import { AdminAnalytics } from "./analytics"
import { AdminSettings } from "./settings"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("catalog")

  return (
    <Tabs defaultValue="catalog" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full justify-start">
        <TabsTrigger value="catalog">Catalog</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="catalog" className="mt-6">
        <AdminCatalog />
      </TabsContent>
      <TabsContent value="analytics" className="mt-6">
        <AdminAnalytics />
      </TabsContent>
      <TabsContent value="settings" className="mt-6">
        <AdminSettings />
      </TabsContent>
    </Tabs>
  )
}
