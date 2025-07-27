"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, Home, ShoppingBag, BarChart, Settings, Factory, Upload, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function AdminNav() {
  const pathname = usePathname()
  const { signOut } = useAuthStore()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    })
    router.push("/admin/signin")
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/admin"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">NextStyle Admin</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname.startsWith("/admin/products") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/upload"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/upload" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <Upload className="h-5 w-5" />
                <span className="sr-only">Upload Product</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Upload Product</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/analytics"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/analytics" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <BarChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/register-brand"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/register-brand" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <Factory className="h-5 w-5" />
                <span className="sr-only">Register Brand</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Register Brand</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/settings" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign Out</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Sign Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}
