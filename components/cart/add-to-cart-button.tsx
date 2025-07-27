"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/types/product"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <Button onClick={handleAddToCart} className={className} disabled={product.stock_quantity === 0}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  )
}
