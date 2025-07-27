import { BrandRegistrationForm } from "@/components/admin/brand-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterBrandPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl">Register a New Brand</CardTitle>
          <CardDescription>Fill out the form below to register a new brand for the NextStyle platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <BrandRegistrationForm />
        </CardContent>
      </Card>
    </div>
  )
}
