import { ProductUploadForm } from "@/components/admin/product-upload-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductUploadPage() {
  return (
    <div className="p-6 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl">Upload New Product</CardTitle>
          <CardDescription>Fill out the form below to add a new product to your catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductUploadForm />
        </CardContent>
      </Card>
    </div>
  )
}
