"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/types/product"

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, newQuantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartItemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("nextstyle_cart")
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
      // Optionally clear corrupted cart or notify user
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("nextstyle_cart", JSON.stringify(cart))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [cart])

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item._id === product._id)

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        const existingItem = updatedCart[existingItemIndex]
        const newQuantity = existingItem.quantity + quantity

        if (newQuantity > product.stock_quantity) {
          toast({
            title: "Out of Stock",
            description: `Cannot add more than available stock (${product.stock_quantity}) for ${product.name}.`,
            variant: "destructive",
          })
          return prevCart
        }

        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
        }
        toast({
          title: "Cart Updated",
          description: `${quantity} x ${product.name} added to cart.`,
        })
        return updatedCart
      } else {
        if (quantity > product.stock_quantity) {
          toast({
            title: "Out of Stock",
            description: `Cannot add more than available stock (${product.stock_quantity}) for ${product.name}.`,
            variant: "destructive",
          })
          return prevCart
        }
        toast({
          title: "Item Added to Cart",
          description: `${product.name} added to cart.`,
        })
        return [...prevCart, { ...product, quantity }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId)
      toast({
        title: "Item Removed",
        description: "Product removed from cart.",
      })
      return updatedCart
    })
  }, [])

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item._id === productId) {
          if (newQuantity < 1) {
            toast({
              title: "Quantity Error",
              description: "Quantity cannot be less than 1.",
              variant: "destructive",
            })
            return item
          }
          if (newQuantity > item.stock_quantity) {
            toast({
              title: "Out of Stock",
              description: `Cannot exceed available stock (${item.stock_quantity}) for ${item.name}.`,
              variant: "destructive",
            })
            return item
          }
          return { ...item, quantity: newQuantity }
        }
        return item
      })
      return updatedCart
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart.",
    })
  }, [])

  const cartTotal = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0)
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  const value = React.useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
