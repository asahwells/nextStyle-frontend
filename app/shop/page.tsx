"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { getAllProducts, getAllBrands } from "@/lib/products"
import type { Product } from "@/types/product"

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "kids", label: "Kids" },
  { value: "accessories", label: "Accessories" },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [brandsLoading, setBrandsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")

  useEffect(() => {
    fetchBrands()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, selectedBrand])

  const fetchBrands = async () => {
    try {
      setBrandsLoading(true)
      const brandsData = await getAllBrands()
      setBrands(brandsData)
    } catch (err) {
      console.error("Error fetching brands:", err)
    } finally {
      setBrandsLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getAllProducts({
        category: selectedCategory === "all" ? undefined : selectedCategory,
        brand_name: selectedBrand === "all" ? undefined : selectedBrand,
        search: searchQuery || undefined,
      })
      setProducts(data)
      setError(null)
    } catch (err) {
      setError("Failed to load products")
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchProducts()
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

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Shop</h1>
          <p className="text-muted-foreground">Browse our collection of clothing and accessories</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand} disabled={brandsLoading}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={brandsLoading ? "Loading..." : "Brand"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
            {(selectedCategory !== "all" || selectedBrand !== "all" || searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedBrand("all")
                  fetchProducts()
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
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
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchProducts}>Try Again</Button>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Card key={product._id} className="overflow-hidden group">
                <Link href={`/product/${product._id}`}>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg?height=400&width=400&query=product"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand_name}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Color: {product.color}</span>
                        <span className="text-muted-foreground">Size: {product.size}</span>
                      </div>
                      {getTagsArray(product.tags).length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {getTagsArray(product.tags)
                            .slice(0, 2)
                            .map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          {getTagsArray(product.tags).length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{getTagsArray(product.tags).length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                      {product.stock_quantity < 10 && (
                        <Badge variant="destructive" className="text-xs">
                          Only {product.stock_quantity} left
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <p className="font-medium text-lg">${formatPrice(product.price)}</p>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedBrand("all")
                  fetchProducts()
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
