"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shirt, Search, Filter, MapPin, Heart, User, ArrowLeft, MessageCircle, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

const mockListings = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition",
    images: ["/classic-denim-jacket.png"],
    size: "M",
    condition: "Like New",
    category: "Jackets",
    pickup_location: "Downtown",
    profiles: { display_name: "Sarah", user_id: "sarah-123" },
  },
  {
    id: "2",
    title: "Summer Floral Dress",
    description: "Beautiful floral pattern, perfect for summer",
    images: ["/floral-dress.png"],
    size: "S",
    condition: "Good",
    category: "Dresses",
    pickup_location: "Midtown",
    profiles: { display_name: "Emma", user_id: "emma-456" },
  },
  {
    id: "3",
    title: "Leather Boots",
    description: "Brown leather boots, barely worn",
    images: ["/leather-boots.jpg"],
    size: "9",
    condition: "Excellent",
    category: "Shoes",
    pickup_location: "Uptown",
    profiles: { display_name: "Mike", user_id: "mike-789" },
  },
  {
    id: "4",
    title: "Cozy Wool Sweater",
    description: "Warm and comfortable, perfect for winter",
    images: ["/cozy-wool-sweater.jpg"],
    size: "L",
    condition: "Very Good",
    category: "Sweaters",
    pickup_location: "East Side",
    profiles: { display_name: "Jessica", user_id: "jessica-101" },
  },
  {
    id: "5",
    title: "Black Leather Jacket",
    description: "Stylish motorcycle-style leather jacket",
    images: ["/black-leather-jacket.png"],
    size: "M",
    condition: "Like New",
    category: "Jackets",
    pickup_location: "Downtown",
    profiles: { display_name: "Alex", user_id: "alex-202" },
  },
  {
    id: "6",
    title: "Running Sneakers",
    description: "Nike running shoes, lightly used",
    images: ["/nike-running-sneakers.jpg"],
    size: "10",
    condition: "Good",
    category: "Shoes",
    pickup_location: "West End",
    profiles: { display_name: "Chris", user_id: "chris-303" },
  },
  {
    id: "7",
    title: "Silk Blouse",
    description: "Elegant white silk blouse for formal occasions",
    images: ["/white-silk-blouse.png"],
    size: "S",
    condition: "Excellent",
    category: "Tops",
    pickup_location: "Midtown",
    profiles: { display_name: "Olivia", user_id: "olivia-404" },
  },
  {
    id: "8",
    title: "Denim Jeans",
    description: "Classic blue jeans, straight fit",
    images: ["/blue-denim-jeans.png"],
    size: "32",
    condition: "Very Good",
    category: "Bottoms",
    pickup_location: "Downtown",
    profiles: { display_name: "David", user_id: "david-505" },
  },
  {
    id: "9",
    title: "Yoga Pants",
    description: "Comfortable black yoga pants",
    images: ["/black-yoga-pants.jpg"],
    size: "M",
    condition: "Like New",
    category: "Activewear",
    pickup_location: "North Side",
    profiles: { display_name: "Rachel", user_id: "rachel-606" },
  },
  {
    id: "10",
    title: "Wool Coat",
    description: "Long grey wool coat, very warm",
    images: ["/grey-wool-coat.jpg"],
    size: "L",
    condition: "Excellent",
    category: "Jackets",
    pickup_location: "Uptown",
    profiles: { display_name: "Tom", user_id: "tom-707" },
  },
  {
    id: "11",
    title: "Striped T-Shirt",
    description: "Casual striped cotton t-shirt",
    images: ["/striped-t-shirt.png"],
    size: "M",
    condition: "Good",
    category: "Tops",
    pickup_location: "East Side",
    profiles: { display_name: "Lisa", user_id: "lisa-808" },
  },
  {
    id: "12",
    title: "Leather Handbag",
    description: "Brown leather handbag with gold hardware",
    images: ["/brown-leather-handbag.jpg"],
    size: "One Size",
    condition: "Very Good",
    category: "Accessories",
    pickup_location: "Midtown",
    profiles: { display_name: "Sophie", user_id: "sophie-909" },
  },
  {
    id: "13",
    title: "Red Evening Gown",
    description: "Stunning red dress for special occasions",
    images: ["/red-evening-gown.jpg"],
    size: "M",
    condition: "Like New",
    category: "Dresses",
    pickup_location: "Downtown",
    profiles: { display_name: "Isabella", user_id: "isabella-111" },
  },
  {
    id: "14",
    title: "Casual Hoodie",
    description: "Grey pullover hoodie, super comfy",
    images: ["/grey-hoodie.png"],
    size: "L",
    condition: "Good",
    category: "Tops",
    pickup_location: "West End",
    profiles: { display_name: "Jake", user_id: "jake-222" },
  },
  {
    id: "15",
    title: "White Tennis Shoes",
    description: "Classic white sneakers, minimal wear",
    images: ["/white-tennis-shoes.jpg"],
    size: "8",
    condition: "Very Good",
    category: "Shoes",
    pickup_location: "Midtown",
    profiles: { display_name: "Mia", user_id: "mia-333" },
  },
  {
    id: "16",
    title: "Plaid Flannel Shirt",
    description: "Cozy red and black flannel",
    images: ["/plaid-flannel-shirt.png"],
    size: "L",
    condition: "Excellent",
    category: "Tops",
    pickup_location: "North Side",
    profiles: { display_name: "Noah", user_id: "noah-444" },
  },
  {
    id: "17",
    title: "Black Skinny Jeans",
    description: "Trendy black jeans, skinny fit",
    images: ["/black-skinny-jeans.jpg"],
    size: "30",
    condition: "Like New",
    category: "Bottoms",
    pickup_location: "Downtown",
    profiles: { display_name: "Ava", user_id: "ava-555" },
  },
  {
    id: "18",
    title: "Beige Trench Coat",
    description: "Classic trench coat, timeless style",
    images: ["/beige-trench-coat.png"],
    size: "M",
    condition: "Excellent",
    category: "Jackets",
    pickup_location: "Uptown",
    profiles: { display_name: "Ethan", user_id: "ethan-666" },
  },
  {
    id: "19",
    title: "Floral Kimono",
    description: "Beautiful floral print kimono",
    images: ["/floral-kimono.jpg"],
    size: "One Size",
    condition: "Good",
    category: "Tops",
    pickup_location: "East Side",
    profiles: { display_name: "Sophia", user_id: "sophia-777" },
  },
  {
    id: "20",
    title: "Blue Blazer",
    description: "Professional navy blue blazer",
    images: ["/navy-blazer.png"],
    size: "M",
    condition: "Very Good",
    category: "Jackets",
    pickup_location: "Midtown",
    profiles: { display_name: "Liam", user_id: "liam-888" },
  },
  {
    id: "21",
    title: "Graphic T-Shirt",
    description: "Cool vintage band tee",
    images: ["/vintage-band-t-shirt.jpg"],
    size: "L",
    condition: "Good",
    category: "Tops",
    pickup_location: "West End",
    profiles: { display_name: "Emma", user_id: "emma-999" },
  },
  {
    id: "22",
    title: "Khaki Cargo Pants",
    description: "Practical cargo pants with multiple pockets",
    images: ["/khaki-cargo-pants.jpg"],
    size: "32",
    condition: "Very Good",
    category: "Bottoms",
    pickup_location: "North Side",
    profiles: { display_name: "Oliver", user_id: "oliver-1010" },
  },
  {
    id: "23",
    title: "Pink Cardigan",
    description: "Soft pink knit cardigan",
    images: ["/pink-cardigan.jpg"],
    size: "S",
    condition: "Like New",
    category: "Sweaters",
    pickup_location: "Downtown",
    profiles: { display_name: "Charlotte", user_id: "charlotte-1111" },
  },
  {
    id: "24",
    title: "Brown Suede Boots",
    description: "Stylish ankle boots in suede",
    images: ["/brown-suede-ankle-boots.jpg"],
    size: "7",
    condition: "Excellent",
    category: "Shoes",
    pickup_location: "Uptown",
    profiles: { display_name: "James", user_id: "james-1212" },
  },
  {
    id: "25",
    title: "White Button-Up Shirt",
    description: "Classic white dress shirt",
    images: ["/white-dress-shirt.jpg"],
    size: "M",
    condition: "Very Good",
    category: "Tops",
    pickup_location: "Midtown",
    profiles: { display_name: "Amelia", user_id: "amelia-1313" },
  },
  {
    id: "26",
    title: "Green Parka",
    description: "Warm winter parka with fur hood",
    images: ["/green-winter-parka.jpg"],
    size: "L",
    condition: "Good",
    category: "Jackets",
    pickup_location: "East Side",
    profiles: { display_name: "Benjamin", user_id: "benjamin-1414" },
  },
  {
    id: "27",
    title: "Polka Dot Dress",
    description: "Cute retro polka dot dress",
    images: ["/polka-dot-dress.jpg"],
    size: "S",
    condition: "Like New",
    category: "Dresses",
    pickup_location: "West End",
    profiles: { display_name: "Harper", user_id: "harper-1515" },
  },
  {
    id: "28",
    title: "Grey Sweatpants",
    description: "Comfortable jogger-style sweatpants",
    images: ["/grey-sweatpants.jpg"],
    size: "M",
    condition: "Good",
    category: "Activewear",
    pickup_location: "North Side",
    profiles: { display_name: "Lucas", user_id: "lucas-1616" },
  },
  {
    id: "29",
    title: "Denim Skirt",
    description: "Classic A-line denim skirt",
    images: ["/denim-skirt.png"],
    size: "M",
    condition: "Very Good",
    category: "Bottoms",
    pickup_location: "Downtown",
    profiles: { display_name: "Evelyn", user_id: "evelyn-1717" },
  },
  {
    id: "30",
    title: "Leather Belt",
    description: "Brown leather belt with silver buckle",
    images: ["/brown-leather-belt.png"],
    size: "One Size",
    condition: "Excellent",
    category: "Accessories",
    pickup_location: "Uptown",
    profiles: { display_name: "Henry", user_id: "henry-1818" },
  },
]

export default function BrowsePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedDistance, setSelectedDistance] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const [allListings] = useState(mockListings)
  const [filteredListings, setFilteredListings] = useState<any[]>([])
  const [displayedListings, setDisplayedListings] = useState<any[]>([])
  const [itemsToShow, setItemsToShow] = useState(12)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const observerTarget = useRef(null)

  useEffect(() => {
    let filtered = [...allListings]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
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

    setFilteredListings(filtered)
    setItemsToShow(12) // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedSize, allListings])

  useEffect(() => {
    setDisplayedListings(filteredListings.slice(0, itemsToShow))
  }, [filteredListings, itemsToShow])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && displayedListings.length < filteredListings.length) {
          handleLoadMore()
        }
      },
      { threshold: 0.1 },
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
    }, 800)
  }, [displayedListings.length, filteredListings.length])

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
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
              {/* <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link> */}
            </nav>
          </div>
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        {/* <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div> */}

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
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="32">32</SelectItem>
                <SelectItem value="one size">One Size</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDistance} onValueChange={setSelectedDistance}>
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
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `Showing ${displayedListings.length} of ${filteredListings.length} items near you`}
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
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
          {displayedListings.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border-2 hover:border-accent/50 hover:scale-[1.02]"
            >
              <Link href={`/browse/${item.id}`} className="block">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.images?.[0] || "/placeholder.svg?height=300&width=400"}
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
                      {item.condition}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{item.pickup_location}</span>
                    </div>
                    <span
                      className="text-xs hover:text-accent transition-colors flex items-center gap-1 z-10 relative hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        router.push(`/profile/${item.profiles?.user_id}`)
                      }}
                    >
                      <User className="h-3 w-3" />
                      {item.profiles?.display_name || "Anonymous"}
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
              </Link>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && displayedListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery || selectedCategory !== "all" || selectedSize !== "all"
                ? "No items match your search. Try adjusting your filters."
                : "No listings found. Be the first to share!"}
            </p>
            <Button asChild className="mt-4">
              <Link href="/post">Post an Item</Link>
            </Button>
          </div>
        )}

        {hasMoreItems && !isLoading && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="min-w-[200px] bg-transparent"
            >
              {isLoadingMore ? "Loading..." : "Load More Items"}
            </Button>
          </div>
        )}

        <div ref={observerTarget} className="h-4" />
      </div>
    </div>
  )
}
