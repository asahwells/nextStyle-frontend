import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product" // Changed from ClothingItem to Product

export default function KidsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Kids' Collection</h1>
          <p className="text-muted-foreground">Explore our latest styles for children</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {kidsItems.map((item) => (
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

const kidsItems: Product[] = [
  {
    _id: "k1", // Changed to _id
    id: "k1", // Kept for compatibility with existing dummy data structure
    name: "Kids Colorful Tee",
    brand_name: "Little Stars", // Changed from brand to brand_name
    price: 24.99,
    image: "/kids-colorful-tee.png",
    category: "tops",
    new: true,
    description: "A vibrant colorful tee for kids.",
    stock_quantity: 150,
    color: "Rainbow",
    size: "S",
    tags: "cotton, playful",
  },
  {
    _id: "k2",
    id: "k2",
    name: "Denim Overalls",
    brand_name: "Tiny Denim",
    price: 39.99,
    image: "/kids-denim-overalls.png",
    category: "bottoms",
    description: "Cute denim overalls for toddlers.",
    stock_quantity: 70,
    color: "Blue",
    size: "2T",
    tags: "denim, play",
  },
  {
    _id: "k3",
    id: "k3",
    name: "Patterned Dress",
    brand_name: "Little Princess",
    price: 34.99,
    image: "/kids-patterned-dress.png",
    category: "dresses",
    new: true,
    description: "A lovely patterned dress for girls.",
    stock_quantity: 60,
    color: "Pink",
    size: "4T",
    tags: "floral, summer",
  },
  {
    _id: "k4",
    id: "k4",
    name: "Hooded Sweatshirt",
    brand_name: "Cozy Kids",
    price: 29.99,
    image: "/kids-hoodie.png",
    category: "tops",
    description: "A comfortable hooded sweatshirt.",
    stock_quantity: 90,
    color: "Grey",
    size: "M",
    tags: "fleece, warm",
  },
  {
    _id: "k5",
    id: "k5",
    name: "Cargo Shorts",
    brand_name: "Adventure Kids",
    price: 27.99,
    image: "/kids-cargo-shorts.png",
    category: "bottoms",
    description: "Durable cargo shorts for active kids.",
    stock_quantity: 85,
    color: "Green",
    size: "6",
    tags: "outdoor, durable",
  },
  {
    _id: "k6",
    id: "k6",
    name: "Winter Jacket",
    brand_name: "Warm Tots",
    price: 49.99,
    image: "/kids-winter-jacket.png",
    category: "outerwear",
    new: true,
    description: "A warm jacket for cold weather.",
    stock_quantity: 40,
    color: "Blue",
    size: "XS",
    tags: "waterproof, insulated",
  },
  {
    _id: "k7",
    id: "k7",
    name: "Pajama Set",
    brand_name: "Sleepy Kids",
    price: 32.99,
    image: "/kids-pajama-set.png",
    category: "sleepwear",
    description: "A soft and cozy pajama set.",
    stock_quantity: 100,
    color: "Striped",
    size: "S",
    tags: "cotton, comfortable",
  },
  {
    _id: "k8",
    id: "k8",
    name: "School Uniform",
    brand_name: "Scholar Kids",
    price: 44.99,
    image: "/kids-school-uniform.png",
    category: "sets",
    description: "A complete school uniform set.",
    stock_quantity: 50,
    color: "Navy",
    size: "M",
    tags: "school, formal",
  },
]
