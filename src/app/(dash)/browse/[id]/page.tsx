"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Shirt, ArrowLeft, MapPin, Calendar, MessageCircle, Flag, Share2, User, Loader2, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import * as itemsApi from "@/lib/api/items"

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { isAuthenticated, user: authUser, isLoading: authLoading } = useAuth()
  const router = useRouter()
  
  // Unwrap params using React.use()
  const { id } = use(params)
  
  const [item, setItem] = useState<itemsApi.Item | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>("")

  // Check if current user is the owner
  const isOwner = authUser?.id === item?.userId

  // Fetch item data
  useEffect(() => {
    if (authLoading) return
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const fetchItem = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const itemData = await itemsApi.getItemById(id)
        setItem(itemData)
        setSelectedImage(itemData.images[0])
      } catch (err) {
        console.error('Error fetching item:', err)
        setError('Item not found')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [id, isAuthenticated, authLoading, router])

  const handleSubmitRequest = async () => {
    if (!message.trim()) return

    setIsSubmitting(true)

    // TODO: Implement claim/request API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsModalOpen(false)
    setMessage("")

    // Show success notification or redirect
    alert('Request sent successfully!')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading item details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || 'Item not found'}</p>
          <Button asChild>
            <Link href="/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>
    )
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
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/browse"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={selectedImage || item.images[0]}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            {item.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {item.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square relative overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity ${
                      selectedImage === image ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${item.title} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {item.brand && <Badge variant="secondary">{item.brand}</Badge>}
                    <Badge variant="outline">{item.category}</Badge>
                    {isOwner && <Badge variant="default" className="bg-accent">Your Item</Badge>}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{item.pickupLocation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {formatDate(item.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Key Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <Badge variant="secondary">{item.size}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition</span>
                  <Badge variant="outline">{item.condition.replace(/_/g, ' ')}</Badge>
                </div>
                {item.brand && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Brand</span>
                    <span className="font-medium">{item.brand}</span>
                  </div>
                )}
                {item.color && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color</span>
                    <span className="font-medium">{item.color}</span>
                  </div>
                )}

                {/* Measurements */}
                {(item.measurementChest || item.measurementLength || item.measurementSleeves) && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Measurements</h4>
                      <div className="text-sm space-y-1">
                        {item.measurementChest && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Chest/Bust</span>
                            <span>{item.measurementChest}</span>
                          </div>
                        )}
                        {item.measurementLength && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Length</span>
                            <span>{item.measurementLength}</span>
                          </div>
                        )}
                        {item.measurementSleeves && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sleeves</span>
                            <span>{item.measurementSleeves}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>

            {/* Pickup Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pickup Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{item.pickupLocation}</p>
                  </div>
                </div>

                {item.pickupInstructions && (
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Instructions</p>
                      <p className="text-sm text-muted-foreground">{item.pickupInstructions}</p>
                    </div>
                  </div>
                )}

                {item.availability && item.availability.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Availability</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.availability.map((time, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {item.meetingPreference && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Meeting Preference</p>
                      <p className="text-sm text-muted-foreground">
                        {item.meetingPreference.replace(/_/g, ' ')}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shared by</CardTitle>
              </CardHeader>
              <CardContent>
                {isOwner ? (
                  // If it's your item, show non-clickable "You"
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.user?.avatar || "/diverse-woman-avatar.png"} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">You</h4>
                      <p className="text-sm text-muted-foreground">
                        Member since {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  // If it's someone else's item, make it clickable
                  <Link
                    href={`/profile/${item.userId}`}
                    className="flex items-center gap-4 hover:bg-accent/5 p-2 rounded-lg transition-colors -m-2"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.user?.avatar || "/diverse-woman-avatar.png"} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium hover:text-accent transition-colors">
                        {item.user?.displayName || 'Anonymous'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Member since {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons - Conditional based on ownership */}
            <div className="flex gap-3">
              {isOwner ? (
                // Owner buttons
                <Button variant="outline" size="lg" className="flex-1">
                  <Link href={`/profile/items`}>Manage Item</Link>
                </Button>
              ) : (
                // Non-owner buttons
                <>
                  <Button className="flex-1" size="lg" onClick={() => setIsModalOpen(true)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Claim This Item
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link
                      href={`/messages?userId=${item.userId}&itemId=${item.id}&itemName=${encodeURIComponent(item.title)}`}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Claim Modal - Only show for non-owners */}
      {!isOwner && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Item</DialogTitle>
              <DialogDescription>
                Send a message to {item.user?.displayName || 'the owner'} to request this item. Include why
                you&apos;d like it and when you can pick it up.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Hi! I'm interested in this item. I can pick it up this weekend..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">{message.length}/500 characters</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest} disabled={!message.trim() || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Request"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
