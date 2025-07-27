"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface ProductColorSelectorProps {
  colors: Array<{ name: string; value: string }>
  onColorChange: (color: string) => void
  selectedColor: string
}

export function ProductColorSelector({ colors, onColorChange, selectedColor }: ProductColorSelectorProps) {
  return (
    <div className="grid gap-2">
      <Label className="text-base">Color</Label>
      <RadioGroup defaultValue={selectedColor} onValueChange={onColorChange} className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <div key={color.name} className="flex items-center space-x-2">
            <RadioGroupItem value={color.name} id={`color-${color.name}`} className="peer sr-only" />
            <Label
              htmlFor={`color-${color.name}`}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border-2 border-input bg-background text-sm font-medium uppercase ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2",
                selectedColor === color.name && "border-primary",
              )}
              style={{ backgroundColor: color.value }}
            >
              <span className="sr-only">{color.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
