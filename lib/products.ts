import axios from "axios"
import type { Product } from "@/types/product"

const API_BASE_URL = "https://nextstyle-601aa5fe000d.herokuapp.com/api"

// Get all products with optional filtering
export async function getAllProducts(options?: {
  category?: string
  brand_name?: string
  search?: string
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams()

    if (options?.category && options.category !== "all") {
      params.append("category", options.category)
    }
    if (options?.brand_name && options.brand_name !== "all") {
      params.append("brand_name", options.brand_name)
    }
    if (options?.search) {
      params.append("search", options.search)
    }

    const response = await axios.get(`${API_BASE_URL}/products?${params.toString()}`)

    // Handle different response formats
    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data
    }

    return []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Get a single product by _id
export async function getProduct(_id: string): Promise<Product | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${_id}`)

    if (response.data.success && response.data.data) {
      return response.data.data
    } else if (response.data && !response.data.success) {
      return response.data
    }

    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

// Get all brands
export async function getAllBrands(): Promise<string[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/brands`)

    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data
    }

    return []
  } catch (error) {
    console.error("Error fetching brands:", error)
    return []
  }
}

// Get related products
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/products?category=${product.category}`)

    let products: Product[] = []

    if (Array.isArray(response.data)) {
      products = response.data
    } else if (response.data.success && Array.isArray(response.data.data)) {
      products = response.data.data
    } else if (response.data.data && Array.isArray(response.data.data)) {
      products = response.data.data
    }

    return products.filter((p) => p._id !== product._id).slice(0, limit)
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`)

    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data
    }

    return []
  } catch (error) {
    console.error("Error searching products:", error)
    return []
  }
}
