"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, Loader2 } from "lucide-react"
import {
  Shirt,
  Settings,
  MapPin,
  Calendar,
  Star,
  Package,
  Heart,
  Edit,
  Eye,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import * as usersApi from "@/lib/api/user"
import * as reviewsApi from "@/lib/api/reviews"
import * as itemsApi from "@/lib/api/items"

export default function ProfilePage() {
  const { isAuthenticated, user: authUser, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState<usersApi.User | null>(null)
  const [reviews, setReviews] = useState<reviewsApi.Review[]>([])
  const [postedItems, setPostedItems] = useState<itemsApi.Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // ✅ Wait for auth to load before checking authentication
    if (authLoading) return

    if (!isAuthenticated) {
      router.push('/login')
      return
    }


    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch user profile
        const userProfile = await usersApi.getCurrentUser()
        setUserData(userProfile)

        // Fetch user's reviews
        const userReviews = await reviewsApi.getUserReviews(userProfile.id)
        setReviews(userReviews.reviews)

        // Fetch user's items - ✅ USE getMyItems() instead
        const userItems = await itemsApi.getMyItems()
        setPostedItems(userItems)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }


    fetchProfileData()
  }, [isAuthenticated, router])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const formatReviewDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const ratingDistribution = getRatingDistribution()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || 'Profile not found'}</p>
          <Button onClick={() => router.push('/browse')}>Go to Browse</Button>
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
            <Button variant="outline" asChild>
              <Link href="/profile/edit">
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
                    <AvatarImage src={userData.avatar || "/diverse-woman-avatar.png"} />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-1">{userData.displayName}</h1>
                        {userData.username && (
                          <p className="text-muted-foreground">@{userData.username}</p>
                        )}
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/profile/edit">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Link>
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      {userData.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{userData.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDate(userData.createdAt)}</span>
                      </div>
                    </div>

                    {userData.bio && (
                      <p className="text-muted-foreground mb-4 leading-relaxed">{userData.bio}</p>
                    )}

                    {userData.badges && userData.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {userData.badges.map((badge) => (
                          <Badge key={badge} variant="secondary" className="bg-accent/10 text-accent">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
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
                  <span className="font-bold text-lg">{postedItems.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-accent" />
                    <span className="text-sm">Items Claimed</span>
                  </div>
                  <span className="font-bold text-lg">{userData.itemsClaimedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-lg">{Number(userData.averageRating).toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">({userData.reviewCount})</span>
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
            <TabsTrigger value="claimed">Claimed (0)</TabsTrigger>
          </TabsList>

          {/* Overview Tab - Ratings */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold mb-2">
                      {Number(userData.averageRating).toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= Math.round(Number(userData.averageRating))
                              ? "fill-accent text-accent"
                              : "text-muted"
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{userData.reviewCount} reviews</p>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm w-8">{rating} ★</span>
                        <Progress
                          value={
                            userData.reviewCount > 0
                              ? (ratingDistribution[rating as keyof typeof ratingDistribution] /
                                userData.reviewCount) *
                              100
                              : 0
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
              {reviews.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No reviews yet</p>
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review) => (
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
                              <h4 className="font-medium">{review.reviewer.displayName}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-3 w-3 ${star <= review.rating ? "fill-accent text-accent" : "text-muted"
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {formatReviewDate(review.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful ({review.helpfulCount})
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Posted Items Tab */}
          <TabsContent value="posted" className="space-y-6">
            {postedItems.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">No items posted yet</p>
                  <Button asChild>
                    <Link href="/post">Post Your First Item</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postedItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <Badge
                        variant={item.status === "AVAILABLE" ? "secondary" : "outline"}
                        className="absolute top-3 left-3"
                      >
                        {item.status === "AVAILABLE" ? "Available" : "Claimed"}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{item.category}</span>
                        <span>{formatReviewDate(item.createdAt)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{item.interestedCount}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/profile/items`}>Manage</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Claimed Items Tab */}
          <TabsContent value="claimed" className="space-y-6">
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No claimed items yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
