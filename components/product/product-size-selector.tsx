"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ProductSizeSelectorProps {
  sizes: string[]
  onSizeChange: (size: string) => void
  selectedSize: string
}

export function ProductSizeSelector({ sizes, onSizeChange, selectedSize }: ProductSizeSelectorProps) {
  return (
    <div className="grid gap-2">
      <Label className="text-base">Size</Label>
      <RadioGroup defaultValue={selectedSize} onValueChange={onSizeChange} className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <div key={size} className="flex items-center space-x-2">
            <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
            <Label
              htmlFor={`size-${size}`}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium uppercase ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"
            >
              {size}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
