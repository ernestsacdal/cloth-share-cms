"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shirt, Upload, X, MapPin, Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Toaster } from "sonner"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { AccountDropdown } from "@/components/account-dropdown"

export default function EditItemPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "Vintage Denim Jacket",
    description: "Classic vintage denim jacket in excellent condition. Perfect for layering!",
    category: "jackets",
    brand: "Levi's",
    size: "m",
    condition: "very-good",
    pickupLocation: "Downtown, Seattle",
    pickupInstructions: "Available for pickup near Pike Place Market. Flexible with timing!",
    photos: ["/placeholder.svg?height=400&width=400"],
  })
  const [newPhoto, setNewPhoto] = useState("")

  const handleAddPhoto = () => {
    if (newPhoto.trim()) {
      setFormData({ ...formData, photos: [...formData.photos, newPhoto] })
      setNewPhoto("")
      toast.success("Photo added!")
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    setFormData({ ...formData, photos: newPhotos })
    toast.success("Photo removed")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Item updated successfully!", {
      description: "Your changes have been saved.",
    })

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with working navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shirt className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-foreground">ClothShare</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-8">
              <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse
              </Link>
              <Link href="/post" className="text-muted-foreground hover:text-foreground transition-colors">
                Post Item
              </Link>
              <Link href="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
                Messages
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <NotificationsDropdown />
            <AccountDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Item</h1>
          <p className="text-muted-foreground">Update your item details and photos</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Item Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Update the basic information about your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Levi's, H&M, Zara"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item, its condition, why you're sharing it, and any special details..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jackets">Jackets & Coats</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="tops">Tops & Shirts</SelectItem>
                      <SelectItem value="bottoms">Pants & Skirts</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="sweaters">Sweaters & Knitwear</SelectItem>
                      <SelectItem value="activewear">Activewear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Size *</Label>
                  <Select
                    value={formData.size}
                    onValueChange={(value) => setFormData({ ...formData, size: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                      <SelectItem value="one-size">One Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Condition *</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="very-good">Very Good</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>Update or add new photos of your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.photos.length > 0 && (
                <div>
                  <Label className="text-base font-medium">Current Photos ({formData.photos.length})</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`Photo ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemovePhoto(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="newPhoto">Add New Photo (URL)</Label>
                <div className="flex gap-2">
                  <Input
                    id="newPhoto"
                    placeholder="Enter image URL or use /placeholder.svg?height=400&width=400"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddPhoto}>
                    <Upload className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Photo Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Take photos in good lighting</li>
                  <li>• Show the item from multiple angles</li>
                  <li>• Include close-ups of any details or flaws</li>
                  <li>• Use a clean, uncluttered background</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pickup Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pickup Information</CardTitle>
              <CardDescription>Update pickup location and instructions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., Downtown, Near Metro Station"
                    className="pl-10"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Pickup Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Let people know when you're available, preferred meeting spots, any special instructions..."
                  value={formData.pickupInstructions}
                  onChange={(e) => setFormData({ ...formData, pickupInstructions: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <Toaster position="top-right" />
    </div>
  )
}
