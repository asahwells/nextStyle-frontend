import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product" // Changed from ClothingItem to Product

export default function WomenPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Women's Collection</h1>
          <p className="text-muted-foreground">Explore our latest styles for women</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {womenItems.map((item) => (
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
                    <p className="text-sm text-muted-foreground">{item.brand_name}</p>
                    <p className="mt-1 font-medium">${item.price}</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const womenItems: Product[] = [
  {
    _id: "w1", // Changed to _id
    id: "w1", // Kept for compatibility with existing dummy data structure
    name: "Classic White Tee",
    brand_name: "Essentials", // Changed from brand to brand_name
    price: 29.99,
    image: "/white-t-shirt.png",
    category: "tops",
    new: true,
    description: "A classic white t-shirt.",
    stock_quantity: 100,
    color: "White",
    size: "M",
    tags: "cotton, basic",
  },
  {
    _id: "w2",
    id: "w2",
    name: "Floral Summer Dress",
    brand_name: "Bloom",
    price: 79.99,
    image: "/floral-dress.png",
    category: "dresses",
    description: "A beautiful floral summer dress.",
    stock_quantity: 50,
    color: "Floral",
    size: "S",
    tags: "summer, floral",
  },
  {
    _id: "w3",
    id: "w3",
    name: "Striped Sweater",
    brand_name: "Cozy",
    price: 49.99,
    image: "/striped-sweater.png",
    category: "tops",
    description: "A warm striped sweater.",
    stock_quantity: 75,
    color: "Navy/White",
    size: "L",
    tags: "knit, winter",
  },
  {
    _id: "w4",
    id: "w4",
    name: "Denim Jacket",
    brand_name: "Denim Co",
    price: 99.99,
    image: "/classic-denim-jacket.png",
    category: "outerwear",
    new: true,
    description: "A classic denim jacket.",
    stock_quantity: 60,
    color: "Blue",
    size: "M",
    tags: "denim, jacket",
  },
  {
    _id: "w5",
    id: "w5",
    name: "Black Leggings",
    brand_name: "Active Wear",
    price: 44.99,
    image: "/black-leggings.png",
    category: "bottoms",
    description: "Comfortable black leggings.",
    stock_quantity: 120,
    color: "Black",
    size: "S",
    tags: "sport, stretch",
  },
  {
    _id: "w6",
    id: "w6",
    name: "Pleated Skirt",
    brand_name: "Modern Woman",
    price: 49.99,
    image: "/pleated-skirt.png",
    category: "bottoms",
    new: true,
    description: "A stylish pleated skirt.",
    stock_quantity: 40,
    color: "Beige",
    size: "M",
    tags: "elegant, formal",
  },
  {
    _id: "w7",
    id: "w7",
    name: "Wrap Dress",
    brand_name: "Modern Woman",
    price: 74.99,
    image: "/wrap-dress.png",
    category: "dresses",
    description: "A versatile wrap dress.",
    stock_quantity: 30,
    color: "Red",
    size: "L",
    tags: "casual, elegant",
  },
  {
    _id: "w8",
    id: "w8",
    name: "Casual Blouse",
    brand_name: "Essentials",
    price: 39.99,
    image: "/casual-blouse.png",
    category: "tops",
    description: "A light and comfortable casual blouse.",
    stock_quantity: 90,
    color: "White",
    size: "S",
    tags: "summer, light",
  },
]
