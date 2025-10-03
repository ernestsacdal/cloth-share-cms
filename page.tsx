"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shirt, Search, Filter, MapPin, Heart, User, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FavoriteButton } from "@/components/ui/favorite-button"

export default function BrowsePage() {
  const [isFavorited, setIsFavorited] = useState<{ [key: number]: boolean }>({})

    const clothingItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    size: "M",
    condition: "Like New",
    location: "Downtown",
    distance: "0.5 miles",
    postedBy: "Sarah M.",
    image: "/vintage-denim-jacket.png",
    category: "Jackets",
    description: "Classic vintage denim jacket in excellent condition. Perfect for layering!",
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    size: "S",
    condition: "Good",
    location: "Midtown",
    distance: "1.2 miles",
    postedBy: "Emma K.",
    image: "/floral-summer-dress.png",
    category: "Dresses",
    description: "Beautiful floral print dress, perfect for summer occasions.",
  },
  {
    id: 3,
    title: "Black Leather Boots",
    size: "8",
    condition: "Very Good",
    location: "Uptown",
    distance: "2.1 miles",
    postedBy: "Alex R.",
    image: "/black-leather-boots.png",
    category: "Shoes",
    description: "Stylish black leather boots, barely worn. Great for fall/winter.",
  },
  {
    id: 4,
    title: "Cozy Knit Sweater",
    size: "L",
    condition: "Like New",
    location: "Westside",
    distance: "1.8 miles",
    postedBy: "Maya P.",
    image: "/cozy-knit-sweater.jpg",
    category: "Sweaters",
    description: "Super soft and warm knit sweater in cream color.",
  },
  {
    id: 5,
    title: "Designer Handbag",
    size: "One Size",
    condition: "Good",
    location: "Downtown",
    distance: "0.8 miles",
    postedBy: "Lisa T.",
    image: "/luxury-quilted-handbag.png",
    category: "Accessories",
    description: "Authentic designer handbag with minor wear. Comes with dust bag.",
  },
  {
    id: 6,
    title: "Casual Button-Up Shirt",
    size: "M",
    condition: "Very Good",
    location: "Eastside",
    distance: "3.2 miles",
    postedBy: "David L.",
    image: "/casual-button-up-shirt.jpg",
    category: "Shirts",
    description: "Light blue casual shirt, perfect for work or weekend wear.",
  },
]

  const toggleFavorite = (id: number) => {
    setIsFavorited((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }


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
            <nav className="hidden md:flex items-center gap-6 ml-8">
              <Link href="/browse" className="text-foreground font-medium">
                Browse
              </Link>
              <Link href="/post" className="text-muted-foreground hover:text-foreground transition-colors">
                Post Item
              </Link>
              <Link href="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
                Messages
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="md:hidden">
              <Link href="/messages">
                <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/favorites">
                <Heart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Favorites</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Account</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Browse Clothes</h1>
          <p className="text-muted-foreground text-lg">Discover amazing clothes shared by your community</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for clothes, brands, or styles..." className="pl-10" />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Select>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="jackets">Jackets</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="sweaters">Sweaters</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="shirts">Shirts</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Distance</SelectItem>
                <SelectItem value="1">Within 1 mile</SelectItem>
                <SelectItem value="5">Within 5 miles</SelectItem>
                <SelectItem value="10">Within 10 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">

          <p className="text-muted-foreground">Showing {clothingItems.length} items near you</p>
          
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="distance">Closest First</SelectItem>
              <SelectItem value="condition">Best Condition</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clothing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clothingItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              <Link href={`/browse/${item.id}`}>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg?height=300&width=400"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(item.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${isFavorited[item.id] ? "fill-current text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                      {item.size}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {item.condition}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{item.location}</span>
                    </div>
                    <span className="text-xs">by {item.postedBy || "Anonymous"}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {/* {!isLoading && listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No listings found. Be the first to share!</p>
            <Button asChild className="mt-4">
              <Link href="/post">Post an Item</Link>
            </Button>
          </div>
        )} */}

        {/* Load More */}
        {/* {listings.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Items
            </Button>
          </div>
        )} */}
      </div>
    </div>
  )
}
