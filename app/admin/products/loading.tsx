import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"

export default function AdminProductsLoading() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Skeleton className="h-10 w-full max-w-sm" />
            </div>
            <Button disabled>Search</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <Skeleton className="h-8 w-8 rounded-full animate-spin" />
            <p className="ml-2 text-muted-foreground">Loading products...</p>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[50px_1fr_100px_100px_80px_80px_80px_80px] items-center gap-4 py-2"
              >
                <Skeleton className="h-12 w-12 rounded-md" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
