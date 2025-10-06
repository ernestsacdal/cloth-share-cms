"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp } from "lucide-react"
import {
  Shirt,
  Settings,
  MapPin,
  Calendar,
  Star,
  Package,
  Heart,
  MessageCircle,
  Edit,
  Eye,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

// Mock user data
const userData = {
  id: 1,
  name: "Sarah Mitchell",
  username: "sarah_m",
  email: "sarah@example.com",
  avatar: "/diverse-woman-avatar.png",
  location: "Downtown, Seattle",
  joinedDate: "March 2023",
  bio: "Sustainable fashion enthusiast who loves giving clothes a second life. Always happy to help others find great pieces!",
  stats: {
    itemsShared: 24,
    itemsClaimed: 18,
    rating: 4.9,
    reviews: 32,
  },
  badges: ["Eco Warrior", "Community Helper", "Top Sharer"],
}

// Mock posted items
const postedItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    image: "/vintage-denim-jacket.png",
    status: "available",
    views: 45,
    interested: 3,
    postedDate: "2 days ago",
    category: "Jackets",
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    image: "/floral-summer-dress.png",
    status: "claimed",
    views: 67,
    interested: 8,
    postedDate: "1 week ago",
    category: "Dresses",
  },
  {
    id: 3,
    title: "Black Leather Boots",
    image: "/black-leather-boots.png",
    status: "available",
    views: 23,
    interested: 1,
    postedDate: "3 days ago",
    category: "Shoes",
  },
]

// Mock claimed items
const claimedItems = [
  {
    id: 4,
    title: "Cozy Knit Sweater",
    image: "/cozy-knit-sweater.jpg",
    owner: "Maya P.",
    status: "pending-pickup",
    claimedDate: "1 day ago",
    category: "Sweaters",
  },
  {
    id: 5,
    title: "Designer Handbag",
    image: "/luxury-quilted-handbag.png",
    owner: "Lisa T.",
    status: "completed",
    claimedDate: "2 weeks ago",
    category: "Accessories",
  },
]

const mockReviews = [
  {
    id: 1,
    reviewer: {
      name: "Emma Johnson",
      avatar: "/diverse-woman-avatar-2.png",
    },
    rating: 5,
    comment: "Amazing experience! Sarah was very responsive and the item was exactly as described. Highly recommend!",
    date: "2 days ago",
    helpful: 12,
  },
  {
    id: 2,
    reviewer: {
      name: "Michael Chen",
      avatar: "/diverse-man-avatar.png",
    },
    rating: 5,
    comment: "Great communication and easy pickup. The jacket was in perfect condition. Thank you!",
    date: "1 week ago",
    helpful: 8,
  },
  {
    id: 3,
    reviewer: {
      name: "Lisa Thompson",
      avatar: "/placeholder.svg",
    },
    rating: 4,
    comment: "Good experience overall. Item was as described, though pickup took a bit longer to coordinate.",
    date: "2 weeks ago",
    helpful: 5,
  },
]


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Rating distribution
  const ratingDistribution = {
    5: 26,
    4: 4,
    3: 1,
    2: 1,
    1: 0,
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
            <nav className="hidden md:flex items-center gap-6 ml-8">

            </nav>
          </div>
          <div className="flex items-center gap-3">

            <Button variant="outline" asChild>
              <Link href="/profile/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
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

        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-1">{userData.name}</h1>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/profile/edit">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Link>
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {userData.joinedDate}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{userData.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {userData.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-accent/10 text-accent">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-accent" />
                    <span className="text-sm">Items Shared</span>
                  </div>
                  <span className="font-bold text-lg">{userData.stats.itemsShared}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-accent" />
                    <span className="text-sm">Items Claimed</span>
                  </div>
                  <span className="font-bold text-lg">{userData.stats.itemsClaimed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-lg">{userData.stats.rating}</span>
                    <span className="text-sm text-muted-foreground">({userData.stats.reviews})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Ratings</TabsTrigger>
            <TabsTrigger value="posted">My Items ({postedItems.length})</TabsTrigger>
            <TabsTrigger value="claimed">Claimed ({claimedItems.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold mb-2">{userData.stats.rating}</div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(userData.stats.rating) ? "fill-accent text-accent" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{userData.stats.reviews} reviews</p>
                    </div>

                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm w-8">{rating} ★</span>
                          <Progress
                            value={
                              (ratingDistribution[rating as keyof typeof ratingDistribution] / userData.stats.reviews) *
                              100
                            }
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground w-8">
                            {ratingDistribution[rating as keyof typeof ratingDistribution]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{review.reviewer.name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-3 w-3 ${star <= review.rating ? "fill-accent text-accent" : "text-muted"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

          </TabsContent>

          {/* Posted Items Tab */}
          <TabsContent value="posted" className="space-y-6">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postedItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <Badge
                      variant={item.status === "available" ? "secondary" : "outline"}
                      className="absolute top-3 left-3"
                    >
                      {item.status === "available" ? "Available" : "Claimed"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{item.category}</span>
                      <span>{item.postedDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{item.interested}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Claimed Items Tab */}
          <TabsContent value="claimed" className="space-y-6">


            <div className="space-y-4">
              {claimedItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative overflow-hidden rounded-lg bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">Shared by {item.owner}</p>
                          </div>
                          <Badge
                            variant={item.status === "completed" ? "secondary" : "outline"}
                            className={item.status === "pending-pickup" ? "bg-accent/10 text-accent" : ""}
                          >
                            {item.status === "pending-pickup" ? "Pending Pickup" : "Completed"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{item.category}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Claimed {item.claimedDate}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {item.status === "pending-pickup" && (
                              <Button size="sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message Owner
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
