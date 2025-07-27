"use client"

import { useEffect, useState } from "react"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { apiClient } from "@/lib/auth-store"
import { useToast } from "@/components/ui/use-toast"

interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist()
    }
  }, [isAuthenticated])

  const fetchWishlist = async () => {
    try {
      const response = await apiClient.get("/wishlist")
      setWishlistItems(response.data)
    } catch (error) {
      console.error("Failed to fetch wishlist:", error)
      // For demo purposes, set mock data
      setWishlistItems([
        {
          id: "1",
          name: "Classic Leather Jacket",
          brand: "StyleCo",
          price: 199.99,
          originalPrice: 249.99,
          image: "/classic-leather-jacket.png",
          category: "Outerwear",
          inStock: true,
        },
        {
          id: "2",
          name: "Floral Summer Dress",
          brand: "FloralFashion",
          price: 89.99,
          image: "/floral-dress.png",
          category: "Dresses",
          inStock: true,
        },
        {
          id: "3",
          name: "White Sneakers",
          brand: "ComfortWalk",
          price: 129.99,
          image: "/white-sneakers.png",
          category: "Shoes",
          inStock: false,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromWishlist = async (itemId: string) => {
    try {
      await apiClient.delete(`/wishlist/${itemId}`)
      setWishlistItems((items) => items.filter((item) => item.id !== itemId))
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      })
    } catch (error) {
      // For demo, just remove from local state
      setWishlistItems((items) => items.filter((item) => item.id !== itemId))
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      })
    }
  }

  const addToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast({
        title: "Out of stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "M", // Default size
      color: "Default",
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your wishlist</h1>
          <Button asChild>
            <a href="/auth/signin">Sign In</a>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          <Badge variant="secondary">{wishlistItems.length} items</Badge>
        </div>

        {wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-4">Save items you love to your wishlist</p>
              <Button asChild>
                <a href="/shop">Start Shopping</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button className="w-full" onClick={() => addToCart(item)} disabled={!item.inStock}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={`/product/${item.id}`}>View Details</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
