import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

interface ProductReviewsProps {
  reviews: {
    id: string
    author: string
    avatar: string
    rating: number
    comment: string
    date: string
  }[]
  averageRating: number
  totalReviews: number
}

export function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Customer Reviews ({totalReviews})
          <div className="flex items-center gap-0.5 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(averageRating) ? "fill-current" : "text-muted-foreground"}`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({averageRating.toFixed(1)})</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id}>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <div className="flex items-center gap-0.5 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">{review.comment}</p>
              <Separator className="mt-4" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
