"use client"

import { useFormState, useFormStatus } from "react-dom"
import { uploadProduct } from "@/app/actions/product-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { getAllBrands } from "@/lib/products"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Uploading...
        </>
      ) : (
        "Upload Product"
      )}
    </Button>
  )
}

export function ProductUploadForm() {
  const [state, formAction] = useFormState(uploadProduct, {
    success: false,
    message: "",
    errors: {},
  })
  const [brands, setBrands] = useState<string[]>([])
  const [brandsLoading, setBrandsLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setBrandsLoading(true)
        const brandsData = await getAllBrands()
        setBrands(brandsData)
        if (brandsData.length > 0) {
          setSelectedBrand(brandsData[0]) // Set first brand as default
        }
      } catch (err) {
        console.error("Error fetching brands:", err)
        toast({
          title: "Error",
          description: "Failed to load brands for selection.",
          variant: "destructive",
        })
      } finally {
        setBrandsLoading(false)
      }
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" placeholder="e.g., Classic T-Shirt" required />
          {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand_name">Brand Name</Label>
          <Select name="brand_name" value={selectedBrand} onValueChange={setSelectedBrand} disabled={brandsLoading}>
            <SelectTrigger>
              <SelectValue placeholder={brandsLoading ? "Loading brands..." : "Select a brand"} />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.brand_name && <p className="text-sm text-red-500">{state.errors.brand_name}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Detailed description of the product..."
          rows={4}
          required
        />
        {state.errors?.description && <p className="text-sm text-red-500">{state.errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" step="0.01" placeholder="29.99" required />
          {state.errors?.price && <p className="text-sm text-red-500">{state.errors.price}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock_quantity">Stock Quantity</Label>
          <Input id="stock_quantity" name="stock_quantity" type="number" placeholder="100" required />
          {state.errors?.stock_quantity && <p className="text-sm text-red-500">{state.errors.stock_quantity}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" value={selectedCategory} onValueChange={setSelectedCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="kids">Kids</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
              <SelectItem value="outerwear">Outerwear</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.category && <p className="text-sm text-red-500">{state.errors.category}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input id="color" name="color" placeholder="e.g., Blue, Red, Black" required />
          {state.errors?.color && <p className="text-sm text-red-500">{state.errors.color}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Input id="size" name="size" placeholder="e.g., M, L, XL (or 32, 34)" required />
          {state.errors?.size && <p className="text-sm text-red-500">{state.errors.size}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL (Optional)</Label>
        <Input id="image" name="image" type="url" placeholder="https://example.com/product-image.jpg" />
        {state.errors?.image && <p className="text-sm text-red-500">{state.errors.image}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated, e.g., cotton, casual, summer)</Label>
        <Input id="tags" name="tags" placeholder="e.g., organic, breathable, unisex" />
        {state.errors?.tags && <p className="text-sm text-red-500">{state.errors.tags}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="material">Material (Optional)</Label>
          <Input id="material" name="material" placeholder="e.g., 100% Cotton" />
          {state.errors?.material && <p className="text-sm text-red-500">{state.errors.material}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="care_instructions">Care Instructions (Optional)</Label>
          <Input id="care_instructions" name="care_instructions" placeholder="e.g., Machine wash cold" />
          {state.errors?.care_instructions && <p className="text-sm text-red-500">{state.errors.care_instructions}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (comma-separated, e.g., quick-dry, anti-odor)</Label>
        <Input id="features" name="features" placeholder="e.g., UV protection, moisture-wicking" />
        {state.errors?.features && <p className="text-sm text-red-500">{state.errors.features}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="is_new" name="is_new" />
        <Label htmlFor="is_new">Mark as New Arrival</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="is_active" name="is_active" defaultChecked />
        <Label htmlFor="is_active">Product is Active (visible on shop)</Label>
      </div>

      <SubmitButton />
    </form>
  )
}
