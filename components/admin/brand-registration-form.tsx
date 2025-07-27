"use client"

import { useFormState, useFormStatus } from "react-dom"
import { registerBrand } from "@/app/actions/brand-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useEffect } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Registering...
        </>
      ) : (
        "Register Brand"
      )}
    </Button>
  )
}

export function BrandRegistrationForm() {
  const [state, formAction] = useFormState(registerBrand, {
    success: false,
    message: "",
    errors: {},
  })

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
      <div className="space-y-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input id="brandName" name="brandName" placeholder="e.g., NextStyle Apparel" required defaultValue="" />
        {state.errors?.brandName && <p className="text-sm text-red-500">{state.errors.brandName}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          name="contactEmail"
          type="email"
          placeholder="contact@example.com"
          required
          defaultValue=""
        />
        {state.errors?.contactEmail && <p className="text-sm text-red-500">{state.errors.contactEmail}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input id="website" name="website" type="url" placeholder="https://www.yourbrand.com" defaultValue="" />
        {state.errors?.website && <p className="text-sm text-red-500">{state.errors.website}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Brand Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Tell us about your brand, its mission, and products."
          rows={4}
          required
          defaultValue=""
        />
        {state.errors?.description && <p className="text-sm text-red-500">{state.errors.description}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
        <Input
          id="logoUrl"
          name="logoUrl"
          type="url"
          placeholder="https://www.yourbrand.com/logo.png"
          defaultValue=""
        />
        {state.errors?.logoUrl && <p className="text-sm text-red-500">{state.errors.logoUrl}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}
