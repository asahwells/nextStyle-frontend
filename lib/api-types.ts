// API Response structure for products
export interface ProductApiResponse {
  success: boolean
  data: any[] // Placeholder for Product type
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
}

// Single product API response
export interface SingleProductApiResponse {
  success: boolean
  data: any // Placeholder for Product type
  message?: string
}

// Product creation/update payload
export interface ProductPayload {
  name: string
  description?: string
  price: number
  category: string
  image_url?: string
  sizes?: string[] // Will be JSON stringified when sent to API
  colors?: Array<{ name: string; value: string }> // Will be JSON stringified
  material?: string
  care_instructions?: string
  features?: string[] // Will be JSON stringified
  is_new?: boolean
  is_active?: boolean
  brand_id: string
  stock_quantity?: number
}

// Categories enum for consistency
export enum ProductCategory {
  TOPS = "tops",
  BOTTOMS = "bottoms",
  DRESSES = "dresses",
  OUTERWEAR = "outerwear",
  SHOES = "shoes",
  ACCESSORIES = "accessories",
  ACTIVEWEAR = "activewear",
  UNDERWEAR = "underwear",
}

// Size options
export const AVAILABLE_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const
export type Size = (typeof AVAILABLE_SIZES)[number]

// Common color options
export const COMMON_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Navy", value: "#1F2937" },
  { name: "Gray", value: "#6B7280" },
  { name: "Red", value: "#DC2626" },
  { name: "Blue", value: "#2563EB" },
  { name: "Green", value: "#16A34A" },
  { name: "Pink", value: "#EC4899" },
  { name: "Purple", value: "#9333EA" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Orange", value: "#EA580C" },
  { name: "Brown", value: "#A16207" },
] as const

// Placeholder for Product type declaration
type Product = {}
