import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
    return numPrice.toFixed(2)
  }

  const getTagsArray = (tags: string) => {
    try {
      return tags ? tags.split(",").map((tag) => tag.trim()) : []
    } catch {
      return []
    }
  }

  return (
    <Card className="group overflow-hidden">
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400&query=product"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.stock_quantity < 10 && (
            <Badge className="absolute right-2 top-2" variant="destructive">
              Low Stock
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand_name}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">${formatPrice(product.price)}</p>
            <div className="text-sm text-muted-foreground">{product.color}</div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Size: {product.size}</span>
            <span className="text-muted-foreground">Stock: {product.stock_quantity}</span>
          </div>

          {getTagsArray(product.tags).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {getTagsArray(product.tags)
                .slice(0, 2)
                .map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              {getTagsArray(product.tags).length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{getTagsArray(product.tags).length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
