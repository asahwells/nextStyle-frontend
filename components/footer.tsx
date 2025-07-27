import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">NextStyle</h3>
          <p className="text-sm text-muted-foreground">
            Experience the future of fashion with AI-powered virtual try-on.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <h4 className="text-md font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop/women" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Women
              </Link>
            </li>
            <li>
              <Link href="/shop/men" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Men
              </Link>
            </li>
            <li>
              <Link href="/shop/kids" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Kids
              </Link>
            </li>
            <li>
              <Link href="/shop/accessories" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Accessories
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-md font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary" prefetch={false}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Careers
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-md font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-primary" prefetch={false}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/size-guide" className="text-muted-foreground hover:text-primary" prefetch={false}>
                Size Guide
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="container text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} NextStyle. All rights reserved.
      </div>
    </footer>
  )
}
