"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import {
  Upload,
  Camera,
  Trash2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Share2,
  Download,
  Heart,
  Ruler,
  Sliders,
  Sparkles,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import type { ClothingItem } from "@/types/clothing"

interface TryOnInterfaceProps {
  personImage: string | null
  clothingImage: string | null
  isProcessing: boolean
}

export function TryOnInterface({ personImage, clothingImage, isProcessing }: TryOnInterfaceProps) {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null)
  const [tryOnResult, setTryOnResult] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState([100])
  const [isSaved, setIsSaved] = useState(false)
  const [showBodyMeasurements, setShowBodyMeasurements] = useState(false)
  const [enhancementLevel, setEnhancementLevel] = useState([50])
  const [showComparison, setShowComparison] = useState(false)
  const [bodyMeasurements, setBodyMeasurements] = useState({
    height: "170",
    weight: "65",
    chest: "90",
    waist: "75",
    hips: "95",
    bodyType: "hourglass",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [, setIsProcessingState] = useState<boolean>(false) // Declare setIsProcessing here

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to your server
      // For demo purposes, we'll use a placeholder
      setUserImage("/placeholder.svg?key=ac7a4")
    }
  }

  const handleCameraCapture = () => {
    // In a real app, you would access the camera
    // For demo purposes, we'll use a placeholder
    setUserImage("/placeholder.svg?key=8hs8j")
  }

  const handleSelectItem = (item: ClothingItem) => {
    setSelectedItem(item)
  }

  const handleTryOn = () => {
    if (userImage && selectedItem) {
      setIsProcessingState(true)

      // Simulate AI processing delay
      setTimeout(() => {
        // In a real app, this would be the result from your AI model
        setTryOnResult("/placeholder.svg?key=26wql" + selectedItem.name)
        setIsProcessingState(false)
      }, 2000)
    }
  }

  const handleReset = () => {
    setUserImage(null)
    setSelectedItem(null)
    setTryOnResult(null)
    setIsSaved(false)
  }

  const handleSaveBodyMeasurements = () => {
    setShowBodyMeasurements(false)
    // In a real app, you would save these measurements to the user's profile
    // and use them to improve the AI try-on experience
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Panel - User Image Upload */}
      <Card className="lg:col-span-1">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Photo</h2>
              <Button variant="outline" size="sm" onClick={() => setShowBodyMeasurements(true)}>
                <Ruler className="mr-2 h-4 w-4" />
                Body Measurements
              </Button>
            </div>
            {!userImage ? (
              <div className="flex flex-col gap-4">
                <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-4">
                  <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="mb-1 text-center font-medium">Upload your photo</p>
                  <p className="text-center text-sm text-muted-foreground">
                    For best results, use a full-body photo with a neutral background
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleCameraCapture}>
                    <Camera className="mr-2 h-4 w-4" />
                    Camera
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg border">
                  <Image
                    src={userImage || "/placeholder.svg"}
                    alt="User uploaded image"
                    fill
                    className="object-cover"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleReset}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleCameraCapture}>
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Middle Panel - Clothing Selection */}
      <Card className="lg:col-span-1">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Select Clothing</h2>
            <Tabs defaultValue="tops">
              <TabsList className="w-full">
                <TabsTrigger value="tops">Tops</TabsTrigger>
                <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                <TabsTrigger value="dresses">Dresses</TabsTrigger>
                <TabsTrigger value="outerwear">Outerwear</TabsTrigger>
              </TabsList>
              <TabsContent value="tops" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    {clothingItems
                      .filter((item) => item.category === "tops")
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`cursor-pointer overflow-hidden rounded-lg border transition-all hover:border-primary ${
                            selectedItem?.id === item.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => handleSelectItem(item)}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">${item.price}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="bottoms" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    {clothingItems
                      .filter((item) => item.category === "bottoms")
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`cursor-pointer overflow-hidden rounded-lg border transition-all hover:border-primary ${
                            selectedItem?.id === item.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => handleSelectItem(item)}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">${item.price}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="dresses" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    {clothingItems
                      .filter((item) => item.category === "dresses")
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`cursor-pointer overflow-hidden rounded-lg border transition-all hover:border-primary ${
                            selectedItem?.id === item.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => handleSelectItem(item)}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">${item.price}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="outerwear" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    {clothingItems
                      .filter((item) => item.category === "outerwear")
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`cursor-pointer overflow-hidden rounded-lg border transition-all hover:border-primary ${
                            selectedItem?.id === item.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => handleSelectItem(item)}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">${item.price}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            <Button className="w-full" disabled={!userImage || !selectedItem || isProcessing} onClick={handleTryOn}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try On
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Panel - Try-On Result */}
      <Card className="lg:col-span-1">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Try-On Result</h2>
              {tryOnResult && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowComparison(!showComparison)}>
                    {showComparison ? "Hide" : "Show"} Comparison
                  </Button>
                </div>
              )}
            </div>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <Loader2 className="h-10 w-10 animate-spin" />
                  <p>Generating your virtual try-on...</p>
                </div>
              ) : personImage && clothingImage ? (
                // In a real scenario, this would display the AI-generated image
                // For now, we'll show a combination or a placeholder
                <div className="relative w-full h-full">
                  <Image
                    src={personImage || "/placeholder.svg"}
                    alt="Person"
                    fill
                    className="object-contain" // Use contain to show full person
                  />
                  <Image
                    src={clothingImage || "/placeholder.svg"}
                    alt="Clothing"
                    width={200} // Adjust size as needed for overlay
                    height={200}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain opacity-70" // Overlay clothing
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-lg font-bold">
                    AI Result Placeholder
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Upload a photo and select clothing to see the magic!</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ZoomOut className="h-4 w-4 text-muted-foreground" />
                  <Slider value={zoomLevel} min={50} max={150} step={1} onValueChange={setZoomLevel} className="w-24" />
                  <ZoomIn className="h-4 w-4 text-muted-foreground" />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Sliders className="mr-2 h-4 w-4" />
                      Enhance
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">AI Enhancement</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Realism Level</Label>
                          <span className="text-sm">{enhancementLevel[0]}%</span>
                        </div>
                        <Slider
                          value={enhancementLevel}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={setEnhancementLevel}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="lighting">Adjust Lighting</Label>
                          <Switch id="lighting" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="shadows">Realistic Shadows</Label>
                          <Switch id="shadows" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="wrinkles">Fabric Texture</Label>
                          <Switch id="wrinkles" />
                        </div>
                      </div>
                      <Button className="w-full">Apply Changes</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCw className="mr-2 h-4 w-4" />
                Try Another
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant={isSaved ? "default" : "outline"} size="sm" onClick={() => setIsSaved(!isSaved)}>
                <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save to Favorites"}
              </Button>
            </div>

            {selectedItem && (
              <div className="mt-2 rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedItem.name}</h3>
                    <p className="text-sm text-muted-foreground">${selectedItem.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/product/${selectedItem.id}`}>View Details</Link>
                    </Button>
                    <AddToCartButton product={selectedItem} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Body Measurements Dialog */}
      <Dialog open={showBodyMeasurements} onOpenChange={setShowBodyMeasurements}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Body Measurements</DialogTitle>
            <DialogDescription>Enter your measurements to improve the accuracy of the virtual try-on</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={bodyMeasurements.height}
                  onChange={(e) => setBodyMeasurements({ ...bodyMeasurements, height: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={bodyMeasurements.weight}
                  onChange={(e) => setBodyMeasurements({ ...bodyMeasurements, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chest">Chest (cm)</Label>
                <Input
                  id="chest"
                  value={bodyMeasurements.chest}
                  onChange={(e) => setBodyMeasurements({ ...bodyMeasurements, chest: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waist">Waist (cm)</Label>
                <Input
                  id="waist"
                  value={bodyMeasurements.waist}
                  onChange={(e) => setBodyMeasurements({ ...bodyMeasurements, waist: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hips">Hips (cm)</Label>
                <Input
                  id="hips"
                  value={bodyMeasurements.hips}
                  onChange={(e) => setBodyMeasurements({ ...bodyMeasurements, hips: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Body Type</Label>
              <RadioGroup
                value={bodyMeasurements.bodyType}
                onValueChange={(value) => setBodyMeasurements({ ...bodyMeasurements, bodyType: value })}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourglass" id="hourglass" />
                    <Label htmlFor="hourglass">Hourglass</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pear" id="pear" />
                    <Label htmlFor="pear">Pear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rectangle" id="rectangle" />
                    <Label htmlFor="rectangle">Rectangle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apple" id="apple" />
                    <Label htmlFor="apple">Apple</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowBodyMeasurements(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBodyMeasurements}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const clothingItems: ClothingItem[] = [
  {
    id: "t1",
    name: "Classic White Tee",
    brand: "Essentials",
    price: 29.99,
    image: "/white-t-shirt.png",
    category: "tops",
  },
  {
    id: "t2",
    name: "Black V-Neck",
    brand: "Urban Edge",
    price: 34.99,
    image: "/placeholder.svg?key=axb0u",
    category: "tops",
  },
  {
    id: "t3",
    name: "Striped Polo",
    brand: "Casual Co",
    price: 39.99,
    image: "/casual-polo.png",
    category: "tops",
  },
  {
    id: "t4",
    name: "Floral Blouse",
    brand: "Bloom",
    price: 49.99,
    image: "/floral-blouse.png",
    category: "tops",
  },
  {
    id: "b1",
    name: "Slim Fit Jeans",
    brand: "Denim Co",
    price: 59.99,
    image: "/classic-blue-jeans.png",
    category: "bottoms",
  },
  {
    id: "b2",
    name: "Black Leggings",
    brand: "Active Wear",
    price: 44.99,
    image: "/black-leggings.png",
    category: "bottoms",
  },
  {
    id: "b3",
    name: "Khaki Chinos",
    brand: "Business Casual",
    price: 54.99,
    image: "/khaki-chinos.png",
    category: "bottoms",
  },
  {
    id: "b4",
    name: "Pleated Skirt",
    brand: "Modern Woman",
    price: 49.99,
    image: "/pleated-skirt.png",
    category: "bottoms",
  },
  {
    id: "d1",
    name: "Floral Summer Dress",
    brand: "Bloom",
    price: 79.99,
    image: "/floral-dress.png",
    category: "dresses",
  },
  {
    id: "d2",
    name: "Little Black Dress",
    brand: "Evening Elegance",
    price: 89.99,
    image: "/placeholder.svg?key=8mx7w",
    category: "dresses",
  },
  {
    id: "d3",
    name: "Maxi Dress",
    brand: "Coastal Vibes",
    price: 69.99,
    image: "/placeholder.svg?key=40t1v",
    category: "dresses",
  },
  {
    id: "d4",
    name: "Wrap Dress",
    brand: "Modern Woman",
    price: 74.99,
    image: "/wrap-dress.png",
    category: "dresses",
  },
  {
    id: "o1",
    name: "Leather Jacket",
    brand: "Urban Edge",
    price: 149.99,
    image: "/classic-leather-jacket.png",
    category: "outerwear",
  },
  {
    id: "o2",
    name: "Denim Jacket",
    brand: "Denim Co",
    price: 99.99,
    image: "/classic-denim-jacket.png",
    category: "outerwear",
  },
  {
    id: "o3",
    name: "Trench Coat",
    brand: "Classic Style",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "outerwear",
  },
  {
    id: "o4",
    name: "Puffer Jacket",
    brand: "Winter Ready",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "outerwear",
  },
]
