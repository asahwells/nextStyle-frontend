"use client"

import Link from "next/link"
import { Package2, ShoppingCart, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuthStore()
  const { cartItemCount } = useCart()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    })
    router.push("/auth/signin")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
          <Package2 className="h-6 w-6" />
          <span className="sr-only">NextStyle</span>
          <span className="hidden md:inline">NextStyle</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/shop" className="hover:text-primary" prefetch={false}>
            Shop
          </Link>
          <Link href="/try-on" className="hover:text-primary" prefetch={false}>
            Try On
          </Link>
          <Link href="/community" className="hover:text-primary" prefetch={false}>
            Community
          </Link>
          <Link href="/about" className="hover:text-primary" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="hover:text-primary" prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              {user?.role === "admin" && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              {user?.role === "brand" && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin">Brand Dashboard</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/shop" className="text-lg font-semibold" prefetch={false}>
                  Shop
                </Link>
                <Link href="/try-on" className="text-lg font-semibold" prefetch={false}>
                  Try On
                </Link>
                <Link href="/community" className="text-lg font-semibold" prefetch={false}>
                  Community
                </Link>
                <Link href="/about" className="text-lg font-semibold" prefetch={false}>
                  About
                </Link>
                <Link href="/contact" className="text-lg font-semibold" prefetch={false}>
                  Contact
                </Link>
                <div className="flex flex-col gap-4 mt-4">
                  {isAuthenticated ? (
                    <>
                      <Link href="/profile" className="text-lg font-semibold" prefetch={false}>
                        Profile
                      </Link>
                      {user?.role === "admin" && (
                        <Link href="/admin" className="text-lg font-semibold" prefetch={false}>
                          Admin Dashboard
                        </Link>
                      )}
                      {user?.role === "brand" && (
                        <Link href="/admin" className="text-lg font-semibold" prefetch={false}>
                          Brand Dashboard
                        </Link>
                      )}
                      <Button variant="outline" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button asChild>
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
