import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product" // Changed from ClothingItem to Product

export default function MenPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Men's Collection</h1>
          <p className="text-muted-foreground">Explore our latest styles for men</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {menItems.map((item) => (
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

const menItems: Product[] = [
  {
    _id: "m1", // Changed to _id
    id: "m1", // Kept for compatibility with existing dummy data structure
    name: "Slim Fit Jeans",
    brand_name: "Denim Co", // Changed from brand to brand_name
    price: 59.99,
    image: "/classic-blue-jeans.png",
    category: "bottoms",
    description: "Comfortable slim fit jeans.",
    stock_quantity: 80,
    color: "Blue",
    size: "32",
    tags: "denim, casual",
  },
  {
    _id: "m2",
    id: "m2",
    name: "Leather Jacket",
    brand_name: "Urban Edge",
    price: 149.99,
    image: "/classic-leather-jacket.png",
    category: "outerwear",
    new: true,
    description: "A stylish leather jacket.",
    stock_quantity: 30,
    color: "Black",
    size: "L",
    tags: "leather, biker",
  },
  {
    _id: "m3",
    id: "m3",
    name: "Formal Shirt",
    brand_name: "Executive",
    price: 69.99,
    image: "/formal-shirt.png",
    category: "tops",
    description: "A crisp formal shirt.",
    stock_quantity: 70,
    color: "White",
    size: "M",
    tags: "formal, office",
  },
  {
    _id: "m4",
    id: "m4",
    name: "Khaki Chinos",
    brand_name: "Business Casual",
    price: 54.99,
    image: "/khaki-chinos.png",
    category: "bottoms",
    new: true,
    description: "Versatile khaki chinos.",
    stock_quantity: 90,
    color: "Khaki",
    size: "34",
    tags: "casual, smart",
  },
  {
    _id: "m5",
    id: "m5",
    name: "Casual Polo",
    brand_name: "Essentials",
    price: 39.99,
    image: "/casual-polo.png",
    category: "tops",
    description: "A comfortable casual polo shirt.",
    stock_quantity: 110,
    color: "Navy",
    size: "L",
    tags: "polo, summer",
  },
  {
    _id: "m6",
    id: "m6",
    name: "Wool Sweater",
    brand_name: "Winter Ready",
    price: 79.99,
    image: "/wool-sweater.png",
    category: "tops",
    description: "A warm wool sweater for winter.",
    stock_quantity: 45,
    color: "Grey",
    size: "XL",
    tags: "wool, warm",
  },
  {
    _id: "m7",
    id: "m7",
    name: "Denim Jacket",
    brand_name: "Denim Co",
    price: 89.99,
    image: "/mens-denim-jacket.png",
    category: "outerwear",
    description: "A classic men's denim jacket.",
    stock_quantity: 55,
    color: "Light Blue",
    size: "M",
    tags: "denim, jacket",
  },
  {
    _id: "m8",
    id: "m8",
    name: "Graphic Tee",
    brand_name: "Urban Edge",
    price: 34.99,
    image: "/graphic-tee.png",
    category: "tops",
    new: true,
    description: "A cool graphic t-shirt.",
    stock_quantity: 65,
    color: "Black",
    size: "L",
    tags: "graphic, street",
  },
]
