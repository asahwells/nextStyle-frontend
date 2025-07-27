import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function ShopLoading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <div className="h-8 bg-muted animate-pulse rounded w-1/3 mb-2" />
          <div className="h-5 bg-muted animate-pulse rounded w-1/2" />
        </div>

        {/* Filters Loading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-[150px] bg-muted animate-pulse rounded" />
            <div className="h-10 w-[150px] bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Products Grid Loading */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="h-9 bg-muted animate-pulse rounded w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
