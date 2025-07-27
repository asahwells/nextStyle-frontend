import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
    return numPrice.toFixed(2)
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="overflow-hidden group">
            <Link href={`/product/${product._id}`}>
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg?height=300&width=300&query=product"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand_name}</p>
                <p className="font-medium mt-2">${formatPrice(product.price)}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
