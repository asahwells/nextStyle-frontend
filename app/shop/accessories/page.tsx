import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product" // Changed from ClothingItem to Product

export default function AccessoriesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Accessories</h1>
          <p className="text-muted-foreground">Complete your look with our stylish accessories</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {accessoryItems.map((item) => (
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

const accessoryItems: Product[] = [
  {
    _id: "a1", // Changed to _id
    id: "a1", // Kept for compatibility with existing dummy data structure
    name: "Summer Hat",
    brand_name: "Sunshine", // Changed from brand to brand_name
    price: 34.99,
    image: "/summer-hat.png",
    category: "accessories",
    new: true,
    description: "A stylish hat for summer.",
    stock_quantity: 80,
    color: "Straw",
    size: "One Size",
    tags: "beach, sun",
  },
  {
    _id: "a2",
    id: "a2",
    name: "Casual Sneakers",
    brand_name: "Step Up",
    price: 89.99,
    image: "/white-sneakers.png",
    category: "accessories",
    description: "Comfortable casual sneakers.",
    stock_quantity: 120,
    color: "White",
    size: "10",
    tags: "shoes, comfort",
  },
  {
    _id: "a3",
    id: "a3",
    name: "Leather Belt",
    brand_name: "Classic Accessories",
    price: 49.99,
    image: "/leather-belt.png",
    category: "accessories",
    description: "A durable leather belt.",
    stock_quantity: 90,
    color: "Brown",
    size: "34",
    tags: "leather, classic",
  },
  {
    _id: "a4",
    id: "a4",
    name: "Silk Scarf",
    brand_name: "Elegant",
    price: 39.99,
    image: "/silk-scarf.png",
    category: "accessories",
    new: true,
    description: "A luxurious silk scarf.",
    stock_quantity: 50,
    color: "Patterned",
    size: "One Size",
    tags: "silk, elegant",
  },
  {
    _id: "a5",
    id: "a5",
    name: "Tote Bag",
    brand_name: "Urban Carry",
    price: 59.99,
    image: "/tote-bag.png",
    category: "accessories",
    description: "A spacious tote bag for everyday use.",
    stock_quantity: 70,
    color: "Black",
    size: "One Size",
    tags: "bag, practical",
  },
  {
    _id: "a6",
    id: "a6",
    name: "Sunglasses",
    brand_name: "Shade",
    price: 79.99,
    image: "/sunglasses.png",
    category: "accessories",
    new: true,
    description: "Stylish sunglasses for sun protection.",
    stock_quantity: 60,
    color: "Black",
    size: "One Size",
    tags: "eyewear, fashion",
  },
  {
    _id: "a7",
    id: "a7",
    name: "Watch",
    brand_name: "Timepiece",
    price: 129.99,
    image: "/watch.png",
    category: "accessories",
    description: "A classic wristwatch.",
    stock_quantity: 40,
    color: "Silver",
    size: "One Size",
    tags: "watch, timeless",
  },
  {
    _id: "a8",
    id: "a8",
    name: "Beanie",
    brand_name: "Winter Ready",
    price: 29.99,
    image: "/beanie.png",
    category: "accessories",
    description: "A warm beanie for cold weather.",
    stock_quantity: 100,
    color: "Navy",
    size: "One Size",
    tags: "knit, winter",
  },
]
