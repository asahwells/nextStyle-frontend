"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Define a schema for product upload form data
const productUploadSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000, "Description too long."),
  price: z.preprocess((val) => Number(val), z.number().positive("Price must be a positive number.")),
  category: z.string().min(1, "Category is required."),
  image: z.string().url("Invalid image URL.").optional().or(z.literal("")),
  brand_name: z.string().min(1, "Brand name is required."),
  stock_quantity: z.preprocess((val) => Number(val), z.number().int().min(0, "Stock quantity cannot be negative.")),
  color: z.string().min(1, "Color is required."),
  size: z.string().min(1, "Size is required."),
  tags: z.string().optional(), // Comma-separated string
  material: z.string().optional(),
  care_instructions: z.string().optional(),
  features: z.string().optional(), // Comma-separated string
  is_new: z.preprocess((val) => val === "on", z.boolean().optional()),
  is_active: z.preprocess((val) => val === "on", z.boolean().optional()),
})

export async function uploadProduct(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    image: formData.get("image"),
    brand_name: formData.get("brand_name"),
    stock_quantity: formData.get("stock_quantity"),
    color: formData.get("color"),
    size: formData.get("size"),
    tags: formData.get("tags"),
    material: formData.get("material"),
    care_instructions: formData.get("care_instructions"),
    features: formData.get("features"),
    is_new: formData.get("is_new"),
    is_active: formData.get("is_active"),
  }

  const parsed = productUploadSchema.safeParse(data)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    return {
      success: false,
      message: "Validation failed.",
      errors,
    }
  }

  try {
    // Simulate API call to upload the product
    // In a real application, you would send this data to your backend
    // For example: const response = await axios.post('/api/products/upload', { ...parsed.data });
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

    console.log("Product upload data:", parsed.data)

    // Simulate success
    revalidatePath("/admin/products") // Revalidate the product list page
    redirect("/admin/products") // Redirect to product list
    return { success: true, message: "Product uploaded successfully!" }
  } catch (error) {
    console.error("Error uploading product:", error)
    return { success: false, message: "Failed to upload product. Please try again." }
  }
}
