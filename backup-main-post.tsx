"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Shirt, ArrowLeft, ArrowRight, Upload, X, Camera, MapPin, Clock, Check, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { NotificationsDropdown } from "@/components/notifications-dropdown"


const steps = [
  { id: 1, title: "Item Details", description: "Tell us about your item" },
  { id: 2, title: "Photos", description: "Add photos of your item" },
  { id: 3, title: "Pickup Info", description: "Set pickup details" },
  { id: 4, title: "Review", description: "Review and publish" },
]

export default function PostPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    color: "",
    measurements: {
      chest: "",
      length: "",
      sleeves: "",
    },
    pickupLocation: "",
    pickupInstructions: "",
    availability: [] as string[],
    meetingPreference: "",
    photos: [] as string[],
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    console.log("[v0] Submitting item:", formData)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Item posted successfully")
    setIsSubmitting(false)

    window.location.href = "/post/success"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/browse" className="flex items-center gap-2">
              <Shirt className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-foreground">ClothShare</span>
            </Link>
          </div>
                    <div className="flex items-center gap-3">
            <NotificationsDropdown />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                Account
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/browse"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Browse
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Share Your Clothes</h1>
            <p className="text-muted-foreground">Help your clothes find a new home and make someone's day!</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center ${
                    step.id <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                      step.id < currentStep
                        ? "bg-accent text-accent-foreground"
                        : step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Item Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Vintage Denim Jacket"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
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
                    <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
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

                <div className="space-y-4">
                  <Label>Measurements (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chest" className="text-sm">
                        Chest/Bust
                      </Label>
                      <Input
                        id="chest"
                        placeholder="e.g., 42 inches"
                        value={formData.measurements.chest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurements: { ...formData.measurements, chest: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length" className="text-sm">
                        Length
                      </Label>
                      <Input
                        id="length"
                        placeholder="e.g., 24 inches"
                        value={formData.measurements.length}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurements: { ...formData.measurements, length: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sleeves" className="text-sm">
                        Sleeve Length
                      </Label>
                      <Input
                        id="sleeves"
                        placeholder="e.g., 25 inches"
                        value={formData.measurements.sleeves}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measurements: { ...formData.measurements, sleeves: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 hover:border-accent transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Photos</h3>
                    <p className="text-muted-foreground mb-4">
                      Add at least 3 photos showing different angles of your item
                    </p>
                    <Button>
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Photos
                    </Button>
                  </div>
                </div>

                {formData.photos.length > 0 && (
                  <div>
                    <Label className="text-base font-medium">Uploaded Photos ({formData.photos.length})</Label>
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
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newPhotos = formData.photos.filter((_, i) => i !== index)
                              setFormData({ ...formData, photos: newPhotos })
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Photo Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Take photos in good lighting</li>
                    <li>• Show the item from multiple angles</li>
                    <li>• Include close-ups of any details or flaws</li>
                    <li>• Use a clean, uncluttered background</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Pickup Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
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

                <div className="space-y-4">
                  <Label>When are you available? *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Weekday Mornings",
                      "Weekday Afternoons",
                      "Weekday Evenings",
                      "Weekend Mornings",
                      "Weekend Afternoons",
                      "Weekend Evenings",
                    ].map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Checkbox
                          id={time}
                          checked={formData.availability.includes(time)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                availability: [...formData.availability, time],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                availability: formData.availability.filter((t) => t !== time),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={time} className="text-sm">
                          {time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Meeting Preference</Label>
                  <Select
                    value={formData.meetingPreference}
                    onValueChange={(value) => setFormData({ ...formData, meetingPreference: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How do you prefer to meet?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public-place">Public place (coffee shop, mall, etc.)</SelectItem>
                      <SelectItem value="doorstep">My doorstep/building entrance</SelectItem>
                      <SelectItem value="workplace">Near my workplace</SelectItem>
                      <SelectItem value="flexible">I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Review Your Listing</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">ITEM DETAILS</h4>
                        <p className="font-medium text-lg">{formData.title || "Untitled Item"}</p>
                        <div className="flex gap-2 mt-2">
                          {formData.category && <Badge variant="secondary">{formData.category}</Badge>}
                          {formData.size && <Badge variant="outline">{formData.size}</Badge>}
                          {formData.condition && <Badge variant="outline">{formData.condition}</Badge>}
                        </div>
                      </div>

                      {formData.description && (
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">DESCRIPTION</h4>
                          <p className="text-sm">{formData.description}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">PICKUP</h4>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{formData.pickupLocation || "Location not set"}</span>
                        </div>
                        {formData.availability.length > 0 && (
                          <div className="flex items-center gap-1 text-sm mt-1">
                            <Clock className="h-3 w-3" />
                            <span>{formData.availability.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">PHOTOS</h4>
                      {formData.photos.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {formData.photos.slice(0, 3).map((photo, index) => (
                            <div key={index} className="aspect-square relative overflow-hidden rounded bg-muted">
                              <Image
                                src={photo || "/placeholder.svg"}
                                alt={`Photo ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No photos uploaded</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="font-medium text-sm">Ready to Share!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your item will be visible to the ClothShare community. You'll receive notifications when someone is
                    interested.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 || isSubmitting}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext} disabled={isSubmitting}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Publishing...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Publish Item
                </>
              )}
            </Button>
          )}
        </div>

        {isSubmitting && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Card className="p-8 max-w-md">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-accent border-t-transparent" />
                <h3 className="text-xl font-semibold">Posting Your Item...</h3>
                <p className="text-muted-foreground">
                  We're uploading your photos and creating your listing. This will only take a moment.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
