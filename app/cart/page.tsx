"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
    return numPrice.toFixed(2)
  }

  return (
    <div className="container py-8 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart className="h-20 w-20 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <Card key={item._id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <Link href={`/product/${item._id}`} className="shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=100&width=100&query=product"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </Link>
                  <div className="flex-1 grid gap-1">
                    <Link href={`/product/${item._id}`} className="font-semibold hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.brand_name}</p>
                    <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item._id!, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item._id!, item.quantity + 1)}
                        disabled={item.quantity >= item.stock_quantity}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item._id!)}
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                  <div className="font-semibold text-lg">${formatPrice(Number(item.price) * item.quantity)}</div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="lg:col-span-1 h-fit sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$0.00</span> {/* Assuming free shipping for now */}
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>$0.00</span> {/* Assuming no tax for now */}
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${formatPrice(cartTotal)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
