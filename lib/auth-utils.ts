/**
 * Extracts error message from URL query parameters
 */
export function getAuthErrorFromUrl(): string | null {
  if (typeof window === "undefined") return null

  const url = new URL(window.location.href)
  const errorParam = url.searchParams.get("error")

  return errorParam ? decodeURIComponent(errorParam) : null
}

/**
 * Formats user display name from user metadata
 */
export function getUserDisplayName(user: any): string {
  if (!user) return "User"

  // Try to get name from user metadata
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name
  if (fullName) return fullName

  // Fall back to email
  if (user.email) return user.email.split("@")[0]

  return "User"
}

/**
 * Gets user avatar URL from user metadata
 */
export function getUserAvatarUrl(user: any): string | null {
  if (!user) return null

  return user.user_metadata?.avatar_url || null
}

// This file is no longer needed as Supabase has been removed.
// It is kept here as a placeholder to indicate its previous existence.
// You can safely delete this file if it's not used elsewhere.
