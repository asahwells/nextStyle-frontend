"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Minus, Plus } from "lucide-react"

interface ProductQuantityProps {
  quantity: number
  onQuantityChange: (newQuantity: number) => void
  maxQuantity?: number
}

export function ProductQuantity({ quantity, onQuantityChange, maxQuantity = 99 }: ProductQuantityProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onQuantityChange(value)
    } else if (e.target.value === "") {
      onQuantityChange(1) // Or 0, depending on desired behavior for empty input
    }
  }

  return (
    <div className="grid gap-2">
      <Label className="text-base">Quantity</Label>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDecrease} disabled={quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className="w-16 text-center"
          min={1}
          max={maxQuantity}
        />
        <Button variant="outline" size="icon" onClick={handleIncrease} disabled={quantity >= maxQuantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
