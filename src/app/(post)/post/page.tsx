"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Shirt, ArrowLeft, ArrowRight, MapPin, Check, User, Loader2, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import ImageUpload from "@/components/ImageUpload"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import * as itemsApi from "@/lib/api/items"
import { AccountDropdown } from "@/components/account-dropdown"


const steps = [
  { id: 1, title: "Item Details", description: "Tell us about your item" },
  { id: 2, title: "Photos", description: "Add photos of your item" },
  { id: 3, title: "Pickup Info", description: "Set pickup details" },
  { id: 4, title: "Review", description: "Review and publish" },
]

export default function PostPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
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

  // Auth protection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Validation for each step
  const canProceedStep1 = formData.title && formData.description.length >= 20 && formData.category && formData.size && formData.condition
  const canProceedStep2 = formData.photos.length >= 1
  const canProceedStep3 = formData.pickupLocation && formData.availability.length > 0

  const handleNext = () => {
    if (currentStep === 1 && !canProceedStep1) {
      setError("Please fill in all required fields in Step 1 (Description must be at least 20 characters)")
      return
    }
    if (currentStep === 2 && !canProceedStep2) {
      setError("Please upload at least 1 photo")
      return
    }
    if (currentStep === 3 && !canProceedStep3) {
      setError("Please fill in pickup location and select at least one availability time")
      return
    }
    
    setError(null)
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setError(null)
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

 const handleSubmit = async () => {
  try {
    setIsSubmitting(true)
    setError(null)

    // Prepare data for API
    const itemData: itemsApi.CreateItemData = {
      title: formData.title,
      brand: formData.brand || undefined,
      description: formData.description,
      category: formData.category,
      size: formData.size,
      condition: formData.condition,
      color: formData.color || undefined,
      measurementChest: formData.measurements.chest || undefined,
      measurementLength: formData.measurements.length || undefined,
      measurementSleeves: formData.measurements.sleeves || undefined,
      images: formData.photos,
      pickupLocation: formData.pickupLocation,
      pickupInstructions: formData.pickupInstructions || undefined,
      availability: formData.availability,
      meetingPreference: formData.meetingPreference || undefined,
    }

    // Create item
    const createdItem = await itemsApi.createItem(itemData)

    // Redirect to success page with item data
    router.push(`/post/success?itemId=${createdItem.id}`)
  } catch (err: any) {
    console.error('Error creating item:', err)
    const errorMessage = err.response?.data?.message || err.message || 'Failed to create item'
    setError(errorMessage)
  } finally {
    setIsSubmitting(false)
  }
}


  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Main page content
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
            <AccountDropdown />

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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
            {error}
          </div>
        )}

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
                  <Label htmlFor="description">Description * (min 20 characters)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the item, its condition, why you're sharing it, and any special details..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">{formData.description.length} characters</p>
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
                        <SelectItem value="JACKETS">Jackets & Coats</SelectItem>
                        <SelectItem value="DRESSES">Dresses</SelectItem>
                        <SelectItem value="TOPS">Tops & Shirts</SelectItem>
                        <SelectItem value="BOTTOMS">Pants & Skirts</SelectItem>
                        <SelectItem value="SHOES">Shoes</SelectItem>
                        <SelectItem value="ACCESSORIES">Accessories</SelectItem>
                        <SelectItem value="SWEATERS">Sweaters & Knitwear</SelectItem>
                        <SelectItem value="ACTIVEWEAR">Activewear</SelectItem>
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
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                        <SelectItem value="ONE_SIZE">One Size</SelectItem>
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
                        <SelectItem value="LIKE_NEW">Like New</SelectItem>
                        <SelectItem value="EXCELLENT">Excellent</SelectItem>
                        <SelectItem value="VERY_GOOD">Very Good</SelectItem>
                        <SelectItem value="GOOD">Good</SelectItem>
                        <SelectItem value="FAIR">Fair</SelectItem>
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
              <ImageUpload
                maxFiles={5}
                onUploadComplete={(urls) => setFormData({ ...formData, photos: urls })}
                existingImages={formData.photos}
              />
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
                      <SelectItem value="PUBLIC_PLACE">Public place (coffee shop, mall, etc.)</SelectItem>
                      <SelectItem value="DOORSTEP">My doorstep/building entrance</SelectItem>
                      <SelectItem value="WORKPLACE">Near my workplace</SelectItem>
                      <SelectItem value="FLEXIBLE">I'm flexible</SelectItem>
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
                        <div className="flex gap-2 mt-2 flex-wrap">
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
                          {formData.photos.slice(0, 6).map((photo, index) => (
                            <div key={index} className="aspect-square relative overflow-hidden rounded bg-muted">
                              <Image
                                src={photo}
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
                    Your item will be visible to the ClothShare community. You&apos;ll receive notifications when someone is
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
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
      </div>
    </div>
  )
}
