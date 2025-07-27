"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Shirt, Scissors, Palette, Ruler, Save } from "lucide-react"
import { TryOnInterface } from "@/components/try-on-interface"

export default function TryOnPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null)
  const [clothingColor, setClothingColor] = useState("#000000")
  const [clothingSize, setClothingSize] = useState("M")
  const [clothingFit, setClothingFit] = useState(50) // 0-100 for loose to tight
  const [isTryingOn, setIsTryingOn] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClothingSelect = (clothingUrl: string) => {
    setSelectedClothing(clothingUrl)
  }

  const handleTryOn = () => {
    if (selectedImage && selectedClothing) {
      setIsTryingOn(true)
      // In a real application, you would send these to an AI backend
      console.log("Trying on:", {
        image: selectedImage,
        clothing: selectedClothing,
        color: clothingColor,
        size: clothingSize,
        fit: clothingFit,
      })
      // Simulate AI processing time
      setTimeout(() => {
        // After AI processing, you'd get a new image with the clothing on
        // For now, we'll just show a placeholder or a success message
        console.log("Try-on complete!")
        // setIsTryingOn(false); // Uncomment if you want to show results and then allow new try-ons
      }, 3000)
    } else {
      alert("Please upload your photo and select a clothing item first.")
    }
  }

  const dummyClothingItems = [
    { id: "tshirt", name: "T-Shirt", image: "/white-t-shirt.png" },
    { id: "jeans", name: "Jeans", image: "/classic-blue-jeans.png" },
    { id: "dress", name: "Dress", image: "/floral-dress.png" },
    { id: "jacket", name: "Jacket", image: "/classic-leather-jacket.png" },
    { id: "sneakers", name: "Sneakers", image: "/white-sneakers.png" },
    { id: "denim-jacket", name: "Denim Jacket", image: "/classic-denim-jacket.png" },
    { id: "formal-shirt", name: "Formal Shirt", image: "/formal-shirt.png" },
    { id: "summer-hat", name: "Summer Hat", image: "/summer-hat.png" },
  ]

  return (
    <div className="container py-8 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Virtual Try-On Studio</h1>
      <p className="text-muted-foreground mb-8">
        Upload your photo, select an item, and see how it looks on you instantly!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Image Upload & Clothing Selection */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Your Photo
                </TabsTrigger>
                <TabsTrigger value="clothing">
                  <Shirt className="mr-2 h-4 w-4" />
                  Select Clothing
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="mt-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center hover:border-primary transition-colors">
                      {selectedImage ? (
                        <Image
                          src={selectedImage || "/placeholder.svg"}
                          alt="Uploaded Photo"
                          width={200}
                          height={200}
                          className="max-h-64 object-contain"
                        />
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-muted-foreground" />
                          <span className="text-muted-foreground">Click to upload your full-body photo</span>
                        </>
                      )}
                    </div>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {selectedImage && (
                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                      Remove Photo
                    </Button>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="clothing" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {dummyClothingItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer overflow-hidden ${selectedClothing === item.image ? "border-primary ring-2 ring-primary" : ""}`}
                      onClick={() => handleClothingSelect(item.image)}
                    >
                      <CardContent className="p-2">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={150}
                          height={150}
                          className="aspect-square object-cover rounded-md"
                        />
                        <p className="text-center text-sm mt-2">{item.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right Panel: Controls & Try-On Result */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                Adjust Clothing
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="color-picker" className="flex items-center gap-2 mb-2">
                    <Palette className="h-4 w-4" />
                    Color
                  </Label>
                  <Input
                    id="color-picker"
                    type="color"
                    value={clothingColor}
                    onChange={(e) => setClothingColor(e.target.value)}
                    className="w-full h-10 p-1"
                  />
                </div>
                <div>
                  <Label htmlFor="size-select" className="flex items-center gap-2 mb-2">
                    <Ruler className="h-4 w-4" />
                    Size
                  </Label>
                  <Select value={clothingSize} onValueChange={setClothingSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fit-slider" className="flex items-center gap-2 mb-2">
                    <Shirt className="h-4 w-4" />
                    Fit ({clothingFit}%)
                  </Label>
                  <Slider
                    id="fit-slider"
                    min={0}
                    max={100}
                    step={1}
                    value={[clothingFit]}
                    onValueChange={(val) => setClothingFit(val[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Loose</span>
                    <span>Tight</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleTryOn}
                className="w-full"
                disabled={!selectedImage || !selectedClothing || isTryingOn}
              >
                {isTryingOn ? "Processing..." : "Try On Now"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Save className="h-5 w-5" />
                Your Virtual Try-On
              </h2>
              <TryOnInterface personImage={selectedImage} clothingImage={selectedClothing} isProcessing={isTryingOn} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
