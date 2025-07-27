"use client"
import { BrandRegistrationForm } from "@/components/admin/brand-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BrandOnboardingPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl">Become a NextStyle Brand Partner</CardTitle>
          <CardDescription>
            Register your brand to showcase your products with our virtual try-on technology.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BrandRegistrationForm />
        </CardContent>
      </Card>
    </div>
  )
}
