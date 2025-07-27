"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Upload, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { ClothingItem } from "@/types/clothing"

export function AdminCatalog() {
  const [items, setItems] = useState<ClothingItem[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<Partial<ClothingItem>>({
    category: "tops",
  })

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddItem = () => {
    if (newItem.name && newItem.brand && newItem.price && newItem.category && newItem.image) {
      const item: ClothingItem = {
        id: `new-${Date.now()}`,
        name: newItem.name,
        brand: newItem.brand,
        price: newItem.price,
        category: newItem.category,
        image: newItem.image,
        new: true,
      }
      setItems([item, ...items])
      setNewItem({ category: "tops" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleImageUpload = () => {
    // In a real app, you would upload to your server
    // For demo purposes, we'll use a placeholder
    setNewItem({
      ...newItem,
      image: `/placeholder.svg?height=300&width=300&query=${newItem.name?.toLowerCase() || "clothing item"}`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Clothing Item</DialogTitle>
              <DialogDescription>
                Add a new clothing item to your catalog. Fill in all the required fields.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name || ""}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={newItem.brand || ""}
                    onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.price || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tops">Tops</SelectItem>
                      <SelectItem value="bottoms">Bottoms</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="outerwear">Outerwear</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Item Image</Label>
                <div className="flex items-center gap-4">
                  {newItem.image ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                      <Image
                        src={newItem.image || "/placeholder.svg"}
                        alt="Item preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-md border">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <Button type="button" onClick={handleImageUpload}>
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddItem}>
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell className="capitalize">{item.category}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {item.new ? <Badge>New</Badge> : <Badge variant="outline">Active</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const initialItems: ClothingItem[] = [
  {
    id: "t1",
    name: "Classic White Tee",
    brand: "Essentials",
    price: 29.99,
    image: "/white-t-shirt.png",
    category: "tops",
  },
  {
    id: "t2",
    name: "Black V-Neck",
    brand: "Urban Edge",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300&query=black v-neck shirt",
    category: "tops",
  },
  {
    id: "b1",
    name: "Slim Fit Jeans",
    brand: "Denim Co",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300&query=slim fit jeans",
    category: "bottoms",
  },
  {
    id: "d1",
    name: "Floral Summer Dress",
    brand: "Bloom",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300&query=floral summer dress",
    category: "dresses",
  },
  {
    id: "o1",
    name: "Leather Jacket",
    brand: "Urban Edge",
    price: 149.99,
    image: "/classic-leather-jacket.png",
    category: "outerwear",
  },
]
