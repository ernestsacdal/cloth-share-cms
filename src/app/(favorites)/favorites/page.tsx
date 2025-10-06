"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shirt, User, Heart, Trash2, ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import Image from "next/image"
import { AccountDropdown } from "@/components/account-dropdown"

interface FavoriteItem {
  id: string
  listing: {
    id: string
    title: string
    images: string[]
    category: string
    size: string
    condition: string
    status: string
    pickup_location: string
  }
}

const mockFavorites: FavoriteItem[] = [
  {
    id: "fav-1",
    listing: {
      id: "1",
      title: "Vintage Denim Jacket",
      images: ["/vintage-denim-jacket.png"],
      category: "Jackets",
      size: "M",
      condition: "Like New",
      status: "available",
      pickup_location: "Downtown",
    },
  },
  {
    id: "fav-2",
    listing: {
      id: "2",
      title: "Floral Summer Dress",
      images: ["/floral-summer-dress.png"],
      category: "Dresses",
      size: "S",
      condition: "Excellent",
      status: "available",
      pickup_location: "Midtown",
    },
  },
  {
    id: "fav-3",
    listing: {
      id: "3",
      title: "Black Leather Boots",
      images: ["/black-leather-boots.png"],
      category: "Shoes",
      size: "9",
      condition: "Good",
      status: "available",
      pickup_location: "Uptown",
    },
  },
  {
    id: "fav-4",
    listing: {
      id: "4",
      title: "Cozy Knit Sweater",
      images: ["/cozy-knit-sweater.jpg"],
      category: "Sweaters",
      size: "L",
      condition: "Like New",
      status: "available",
      pickup_location: "West Side",
    },
  },
  {
    id: "fav-5",
    listing: {
      id: "5",
      title: "White Silk Blouse",
      images: ["/white-silk-blouse.png"],
      category: "Tops",
      size: "M",
      condition: "Excellent",
      status: "claimed",
      pickup_location: "East Side",
    },
  },
  {
    id: "fav-6",
    listing: {
      id: "6",
      title: "Blue Denim Jeans",
      images: ["/blue-denim-jeans.png"],
      category: "Pants",
      size: "32",
      condition: "Good",
      status: "available",
      pickup_location: "Downtown",
    },
  },
  {
    id: "fav-7",
    listing: {
      id: "7",
      title: "Red Evening Gown",
      images: ["/red-evening-gown.jpg"],
      category: "Dresses",
      size: "M",
      condition: "Like New",
      status: "available",
      pickup_location: "Midtown",
    },
  },
  {
    id: "fav-8",
    listing: {
      id: "8",
      title: "Grey Hoodie",
      images: ["/grey-hoodie.png"],
      category: "Hoodies",
      size: "L",
      condition: "Good",
      status: "available",
      pickup_location: "North Side",
    },
  },
  {
    id: "fav-9",
    listing: {
      id: "9",
      title: "Black Leather Jacket",
      images: ["/black-leather-jacket.png"],
      category: "Jackets",
      size: "M",
      condition: "Excellent",
      status: "available",
      pickup_location: "South Side",
    },
  },
  {
    id: "fav-10",
    listing: {
      id: "10",
      title: "Nike Running Sneakers",
      images: ["/nike-running-sneakers.jpg"],
      category: "Shoes",
      size: "10",
      condition: "Like New",
      status: "available",
      pickup_location: "Downtown",
    },
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    // Load mock favorites on component mount
    setFavorites(mockFavorites)
  }, [])

  function removeFavorite(favoriteId: string) {
    // Filter out the removed favorite from state
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== favoriteId)
    )
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
          </div>
          <div className="flex items-center gap-3">
            <NotificationsDropdown />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/favorites">
                <Heart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Favorites</span>
              </Link>
            </Button>
            <AccountDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/browse"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold text-foreground">My Saved Items</h1>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {favorites.length} {favorites.length === 1 ? "item" : "items"}
          </Badge>
        </div>

        {favorites.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No saved items yet</h2>
              <p className="text-muted-foreground mb-6">Start browsing and save items you're interested in</p>
              <Button asChild>
                <Link href="/browse">Browse Items</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="group hover:shadow-lg transition-all duration-200">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <Image
                    src={favorite.listing.images[0] || "/placeholder.svg"}
                    alt={favorite.listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <Badge
                    variant={favorite.listing.status === "available" ? "secondary" : "outline"}
                    className="absolute top-3 left-3"
                  >
                    {favorite.listing.status === "available" ? "Available" : "Claimed"}
                  </Badge>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-3 right-3"
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{favorite.listing.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground mb-3">
                    <p>Category: {favorite.listing.category}</p>
                    <p>Size: {favorite.listing.size}</p>
                    <p>Condition: {favorite.listing.condition}</p>
                    <p className="line-clamp-1">📍 {favorite.listing.pickup_location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/browse/${favorite.listing.id}`}>View Details</Link>
                    </Button>
                    {favorite.listing.status === "available" && (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Request
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
