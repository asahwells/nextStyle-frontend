"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Define a schema for brand registration form data
const brandRegistrationSchema = z.object({
  brandName: z.string().min(2, "Brand name must be at least 2 characters."),
  contactEmail: z.string().email("Invalid email address."),
  website: z.string().url("Invalid website URL.").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500, "Description too long."),
  logoUrl: z.string().url("Invalid logo URL.").optional().or(z.literal("")),
})

export async function registerBrand(prevState: any, formData: FormData) {
  const data = {
    brandName: formData.get("brandName"),
    contactEmail: formData.get("contactEmail"),
    website: formData.get("website"),
    description: formData.get("description"),
    logoUrl: formData.get("logoUrl"),
  }

  const parsed = brandRegistrationSchema.safeParse(data)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    return {
      success: false,
      message: "Validation failed.",
      errors,
    }
  }

  const { brandName, contactEmail, website, description, logoUrl } = parsed.data

  try {
    // Simulate API call to register the brand
    // In a real application, you would send this data to your backend
    // For example: const response = await axios.post('/api/brands/register', { ...parsed.data });
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

    console.log("Brand registration data:", { brandName, contactEmail, website, description, logoUrl })

    // Simulate success
    revalidatePath("/admin/pending") // Revalidate the pending brands page
    redirect("/admin/pending") // Redirect to a pending approval page
    return { success: true, message: "Brand registered successfully! Awaiting approval." }
  } catch (error) {
    console.error("Error registering brand:", error)
    return { success: false, message: "Failed to register brand. Please try again." }
  }
}

// Define a schema for brand approval/rejection
const brandApprovalSchema = z.object({
  brandId: z.string(),
  action: z.enum(["approve", "reject"]),
})

export async function updateBrandApproval(prevState: any, formData: FormData) {
  const data = {
    brandId: formData.get("brandId"),
    action: formData.get("action"),
  }

  const parsed = brandApprovalSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid action or brand ID.",
    }
  }

  const { brandId, action } = parsed.data

  try {
    // Simulate API call to update brand approval status
    // For example: await axios.post(`/api/admin/brands/${brandId}/status`, { action });
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    console.log(`Brand ${brandId} ${action}d (simulated)`)

    revalidatePath("/admin/pending") // Revalidate the pending brands page
    return { success: true, message: `Brand ${action}d successfully.` }
  } catch (error) {
    console.error(`Error ${action}ing brand:`, error)
    return { success: false, message: `Failed to ${action} brand. Please try again.` }
  }
}
