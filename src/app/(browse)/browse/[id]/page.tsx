import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Shirt, ArrowLeft, MapPin, Calendar, Heart, MessageCircle, Flag, Share2, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for individual item
const clothingItem = {
  id: 1,
  title: "Vintage Denim Jacket",
  size: "M",
  condition: "Like New",
  location: "Downtown",
  distance: "0.5 miles",
  postedBy: "Sarah M.",
  postedDate: "2 days ago",
  image: "/vintage-denim-jacket.png",
  images: ["/vintage-denim-jacket-front.png", "/vintage-denim-jacket-back.png", "/vintage-denim-jacket-detail.png"],
  category: "Jackets",
  brand: "Levi's",
  description:
    "Classic vintage denim jacket in excellent condition. This beautiful piece has been well-maintained and shows minimal signs of wear. Perfect for layering during transitional seasons. The jacket features the classic Levi's styling with button closure and chest pockets. Originally purchased from a vintage boutique, it's been a favorite in my wardrobe but I'm moving and need to downsize. Would love to see it go to someone who will appreciate its timeless style!",
  measurements: {
    chest: "42 inches",
    length: "24 inches",
    sleeves: "25 inches",
  },
  pickupInstructions:
    "Available for pickup weekdays after 6pm or weekends. I live near the downtown metro station. Happy to meet at a public location if preferred.",
  user: {
    name: "Sarah M.",
    avatar: "/diverse-woman-avatar.png",
    rating: 4.8,
    itemsShared: 12,
    joinedDate: "March 2023",
  },
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shirt className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-foreground">ClothShare</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
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
                src={clothingItem.image || "/placeholder.svg"}
                alt={clothingItem.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {clothingItem.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${clothingItem.title} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{clothingItem.title}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{clothingItem.brand}</Badge>
                    <Badge variant="outline">{clothingItem.category}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{clothingItem.distance} away</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {clothingItem.postedDate}</span>
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
                  <Badge variant="secondary">{clothingItem.size}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition</span>
                  <Badge variant="outline">{clothingItem.condition}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand</span>
                  <span className="font-medium">{clothingItem.brand}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Measurements</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chest</span>
                      <span>{clothingItem.measurements.chest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Length</span>
                      <span>{clothingItem.measurements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sleeves</span>
                      <span>{clothingItem.measurements.sleeves}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{clothingItem.description}</p>
              </CardContent>
            </Card>

            {/* Pickup Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pickup Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{clothingItem.pickupInstructions}</p>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shared by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={clothingItem.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{clothingItem.user.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>★ {clothingItem.user.rating} rating</span>
                      <span>{clothingItem.user.itemsShared} items shared</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Member since {clothingItem.user.joinedDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Claim This Item
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Owner
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
