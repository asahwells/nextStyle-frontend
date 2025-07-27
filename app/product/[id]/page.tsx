"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { getProduct, getRelatedProducts } from "@/lib/products"
import type { Product } from "@/types/product"
import Link from "next/link"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (_id: string) => {
    // Changed parameter name to _id
    try {
      setLoading(true)
      const productData = await getProduct(_id) // Pass _id to getProduct

      if (productData) {
        setProduct(productData)
        const related = await getRelatedProducts(productData)
        setRelatedProducts(related)
      } else {
        setError("Product not found")
      }
    } catch (err) {
      setError("Failed to load product")
      console.error("Error fetching product:", err)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-20 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg?height=600&width=600&query=product"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-muted-foreground">{product.brand_name}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-3xl font-bold">${formatPrice(product.price)}</span>
              {product.stock_quantity < 10 && <Badge variant="destructive">Only {product.stock_quantity} left</Badge>}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Color</h4>
                <p className="text-sm text-muted-foreground">{product.color}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Size</h4>
                <p className="text-sm text-muted-foreground">{product.size}</p>
              </div>
            </div>

            {getTagsArray(product.tags).length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {getTagsArray(product.tags).map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  disabled={quantity >= product.stock_quantity}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="secondary" className="w-full" size="lg">
              Try On Virtually
            </Button>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">30-day return policy</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct._id} className="overflow-hidden group">
                <Link href={`/product/${relatedProduct._id}`}>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg?height=300&width=300&query=product"}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">{relatedProduct.brand_name}</p>
                    <p className="font-medium mt-2">${formatPrice(relatedProduct.price)}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
