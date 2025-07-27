import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({
    req,
    res,
    options: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  const isAuthenticated = !!session

  // Define protected routes
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/profile") || req.nextUrl.pathname.startsWith("/cart/checkout")

  // Define admin routes
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/signin")

  // Define admin auth routes
  const isAdminAuthRoute = req.nextUrl.pathname.startsWith("/admin/signin")

  // Skip auth check for callback route
  if (req.nextUrl.pathname.startsWith("/auth/callback")) {
    return res
  }

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/auth/signin"
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // For admin routes, check if user is authenticated and is a brand admin
  if (isAdminRoute) {
    if (!isAuthenticated) {
      // If not authenticated, redirect to admin signin
      return NextResponse.redirect(new URL("/admin/signin", req.url))
    }

    // Check if the user is a brand admin
    const { data: brandData } = await supabase
      .from("brands")
      .select("id, status")
      .eq("contact_email", session.user.email)
      .eq("status", "active")
      .single()

    if (!brandData) {
      // If not a brand admin or not active, redirect to admin signin
      return NextResponse.redirect(new URL("/admin/signin", req.url))
    }
  }

  // Redirect authenticated brand admins from admin signin to admin dashboard
  if (isAdminAuthRoute && isAuthenticated) {
    // Check if the user is a brand admin
    const { data: brandData } = await supabase
      .from("brands")
      .select("id, status")
      .eq("contact_email", session.user.email)
      .eq("status", "active")
      .single()

    if (brandData) {
      // If user is an active brand admin, redirect to admin dashboard
      return NextResponse.redirect(new URL("/admin", req.url))
    }
  }

  // Redirect authenticated users from auth pages to home
  if (
    isAuthenticated &&
    (req.nextUrl.pathname.startsWith("/auth/signin") || req.nextUrl.pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Example: Redirect unauthenticated users from admin pages
  // In a real application, you would check for a valid session token/cookie
  // For now, this is a placeholder.
  const adminAuthToken = req.cookies.get("admin_auth_token")?.value // Simulate checking for an admin auth token

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!adminAuthToken) {
      // Redirect to admin sign-in page if not authenticated
      return NextResponse.redirect(new URL("/admin/signin", req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/cart/checkout",
    "/admin/:path*",
    "/auth/signin",
    "/auth/signup",
    "/auth/callback",
    "/shop/:path*",
  ],
}
