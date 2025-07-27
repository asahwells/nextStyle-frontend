import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FeaturedBrands } from "@/components/featured-brands"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background/20" />
        <div className="container relative flex flex-col items-center justify-center gap-4 py-20 text-center md:py-32">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Try Before You Buy with <span className="text-primary">AI</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Experience virtual clothing try-on with our cutting-edge AI technology. See how clothes look on you before
            making a purchase.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/try-on">Try On Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">Browse Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tighter">Categories</h2>
            <p className="text-muted-foreground">Browse our collection by category</p>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="women">Women</TabsTrigger>
              <TabsTrigger value="men">Men</TabsTrigger>
              <TabsTrigger value="kids">Kids</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {clothingItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Link href={`/product/${item.id}`}>
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                          {item.new && <Badge className="absolute right-2 top-2">New</Badge>}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <p className="mt-1 font-medium">${item.price}</p>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Other tabs would have similar content but filtered by category */}
            <TabsContent value="women" className="mt-0">
              {/* Women's clothing items */}
            </TabsContent>
            <TabsContent value="men" className="mt-0">
              {/* Men's clothing items */}
            </TabsContent>
            <TabsContent value="kids" className="mt-0">
              {/* Kids' clothing items */}
            </TabsContent>
            <TabsContent value="accessories" className="mt-0">
              {/* Accessories */}
            </TabsContent>
          </Tabs>
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Brands Section */}
      <FeaturedBrands />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-primary/5">
        <div className="container py-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Transform Your Shopping Experience?
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Join thousands of users who are already enjoying the benefits of virtual try-on technology.
            </p>
            <Button size="lg" asChild>
              <Link href="/try-on">Try On Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const clothingItems = [
  {
    id: "1",
    name: "Classic White Tee",
    brand: "Essentials",
    price: 29.99,
    image: "/white-t-shirt.png",
    new: true,
    category: "women",
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    brand: "Denim Co",
    price: 59.99,
    image: "/classic-blue-jeans.png",
    new: false,
    category: "men",
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    brand: "Bloom",
    price: 79.99,
    image: "/floral-dress.png",
    new: true,
    category: "women",
  },
  {
    id: "4",
    name: "Leather Jacket",
    brand: "Urban Edge",
    price: 149.99,
    image: "/classic-leather-jacket.png",
    new: false,
    category: "men",
  },
  {
    id: "5",
    name: "Striped Sweater",
    brand: "Cozy",
    price: 49.99,
    image: "/wool-sweater.png", // Corrected image path
    new: false,
    category: "women",
  },
  {
    id: "6",
    name: "Casual Sneakers",
    brand: "Step Up",
    price: 89.99,
    image: "/white-sneakers.png",
    new: true,
    category: "accessories",
  },
  {
    id: "7",
    name: "Denim Jacket",
    brand: "Denim Co",
    price: 99.99,
    image: "/classic-denim-jacket.png",
    new: false,
    category: "women",
  },
  {
    id: "8",
    name: "Formal Shirt",
    brand: "Executive",
    price: 69.99,
    image: "/formal-shirt.png",
    new: false,
    category: "men",
  },
  {
    id: "9",
    name: "Summer Hat",
    brand: "Sunshine",
    price: 34.99,
    image: "/summer-hat.png",
    new: true,
    category: "accessories",
  },
  {
    id: "10",
    name: "Kids Colorful Tee",
    brand: "Little Stars",
    price: 24.99,
    image: "/kids-colorful-tee.png", // Corrected image path
    new: false,
    category: "kids",
  },
]
