export interface Product {
  _id?: string // Primary product identifier
  name: string
  description: string
  price: number | string
  category: string
  image: string
  brand_name: string
  stock_quantity: number
  color: string
  size: string
  tags: string
  sizes?: string[] | string
  colors?: Array<{ name: string; value: string }> | string
  material?: string
  care_instructions?: string
  features?: string[] | string
  is_new?: boolean
  is_active?: boolean
  brand_id?: string
  created_at?: string
  updated_at?: string
}

// Example of how the product data should look when coming from your API
export const exampleProductData: Product = {
  _id: "prod_123456",
  name: "Classic White T-Shirt",
  description:
    "A comfortable, versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear or layering.",
  price: 29.99,
  category: "tops",
  image: "https://example.com/images/white-tshirt.jpg",
  brand_name: "EcoWear",
  stock_quantity: 150,
  color: "White",
  size: "XS",
  tags: "Organic Cotton, Pre-shrunk, Reinforced Seams, Tagless",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
    { name: "Navy", value: "#1F2937" },
  ],
  material: "100% Organic Cotton",
  care_instructions: "Machine wash cold, tumble dry low, do not bleach",
  features: ["Organic cotton fabric", "Pre-shrunk", "Reinforced seams", "Tagless for comfort"],
  is_new: true,
  is_active: true,
  brand_id: "brand_789",
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-20T14:45:00Z",
}

export interface ProductApiResponse {
  success: boolean
  data: Product[]
  message?: string
}

export interface SingleProductApiResponse {
  success: boolean
  data: Product
  message?: string
}
