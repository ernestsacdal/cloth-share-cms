"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shirt, Search, Filter, MapPin, Heart, User, ArrowLeft, MessageCircle, Package, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { useAuth } from "@/contexts/AuthContext"
import * as itemsApi from "@/lib/api/items"

export default function BrowsePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const [allListings, setAllListings] = useState<itemsApi.Item[]>([])
  const [filteredListings, setFilteredListings] = useState<itemsApi.Item[]>([])
  const [displayedListings, setDisplayedListings] = useState<itemsApi.Item[]>([])
  const [itemsToShow, setItemsToShow] = useState(12)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const observerTarget = useRef(null)

  const requireAuth = (callback: () => void) => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    callback()
  }

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const items = await itemsApi.getItems()
        setAllListings(items)
      } catch (err) {
        console.error('Error fetching items:', err)
        setError('Failed to load items. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [])

  // Filter items
  useEffect(() => {
    let filtered = [...allListings]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.brand && item.brand.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Size filter
    if (selectedSize !== "all") {
      filtered = filtered.filter((item) => item.size.toLowerCase() === selectedSize.toLowerCase())
    }

    // Condition filter
    if (selectedCondition !== "all") {
      filtered = filtered.filter((item) => item.condition.toLowerCase().replace(/_/g, ' ') === selectedCondition.toLowerCase())
    }

    setFilteredListings(filtered)
    setItemsToShow(12)
  }, [searchQuery, selectedCategory, selectedSize, selectedCondition, allListings])

  // Update displayed items
  useEffect(() => {
    setDisplayedListings(filteredListings.slice(0, itemsToShow))
  }, [filteredListings, itemsToShow])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && displayedListings.length < filteredListings.length) {
          handleLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [displayedListings, filteredListings, isLoadingMore])

  const handleLoadMore = useCallback(() => {
    if (displayedListings.length >= filteredListings.length) return

    setIsLoadingMore(true)
    setTimeout(() => {
      setItemsToShow((prev) => prev + 12)
      setIsLoadingMore(false)
    }, 500)
  }, [displayedListings.length, filteredListings.length])

  const toggleFavorite = (itemId: string) => {
    requireAuth(() => {
      setFavorites((prev) => {
        const newFavorites = new Set(prev)
        if (newFavorites.has(itemId)) {
          newFavorites.delete(itemId)
        } else {
          newFavorites.add(itemId)
        }
        return newFavorites
      })
    })
  }

  const hasMoreItems = displayedListings.length < filteredListings.length

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
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-6 ml-8">
                <Link href="/browse" className="text-foreground font-medium">
                  Browse
                </Link>
                <Link href="/post" className="text-muted-foreground hover:text-foreground transition-colors">
                  Post
                </Link>
                <Link href="/items" className="text-muted-foreground hover:text-foreground transition-colors">
                  Items
                </Link>
                <Link href="/messages" className="text-muted-foreground hover:text-foreground transition-colors">
                  Messages
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <NotificationsDropdown />
                <Button variant="ghost" size="sm" asChild className="md:hidden">
                  <Link href="/messages">
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="md:hidden">
                  <Link href="/items">
                    <Package className="h-4 w-4" />
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
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
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
            <Input
              placeholder="Search for clothes, brands, or styles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                <SelectItem value="tops">Tops</SelectItem>
                <SelectItem value="bottoms">Bottoms</SelectItem>
                <SelectItem value="activewear">Activewear</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
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
                <SelectItem value="xxl">XXL</SelectItem>
                <SelectItem value="one_size">One Size</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="like new">Like New</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="very good">Very Good</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `Showing ${displayedListings.length} of ${filteredListings.length} items`}
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}

        {/* Clothing Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedListings.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border-2 hover:border-accent/50 hover:scale-[1.02]"
                onClick={() => requireAuth(() => router.push(`/browse/${item.id}`))}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.images?.[0] || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 h-9 w-9 rounded-full shadow-lg z-10 hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleFavorite(item.id)
                    }}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(item.id) ? "fill-accent text-accent" : ""}`} />
                  </Button>
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
                      {item.condition.replace(/_/g, ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{item.pickupLocation}</span>
                    </div>
                    <span
                      className="text-xs hover:text-accent transition-colors flex items-center gap-1 z-10 relative hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        requireAuth(() => router.push(`/profile/${item.userId}`))
                      }}
                    >
                      <User className="h-3 w-3" />
                      {item.user?.displayName || "Anonymous"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                    size="sm"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && displayedListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              {searchQuery || selectedCategory !== "all" || selectedSize !== "all" || selectedCondition !== "all"
                ? "No items match your search. Try adjusting your filters."
                : "No listings found. Be the first to share!"}
            </p>
            {isAuthenticated && (
              <Button asChild>
                <Link href="/post">Post an Item</Link>
              </Button>
            )}
          </div>
        )}

        {/* Load More */}
        {hasMoreItems && !isLoading && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="min-w-[200px]"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Items"
              )}
            </Button>
          </div>
        )}

        <div ref={observerTarget} className="h-4" />
      </div>
    </div>
  )
}
