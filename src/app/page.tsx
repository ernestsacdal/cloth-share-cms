import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Recycle, Users, ArrowRight, Shirt, Package, MapPin } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shirt className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">ClothShare</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            Sustainable Fashion Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Share Clothes, <span className="text-accent">Save the Planet</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn your unused clothes into someone else's treasure. Join our community of conscious fashion lovers making
            a difference, one garment at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                Start Sharing <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/browse">Browse Clothes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">10,000+</div>
              <div className="text-muted-foreground">Clothes Shared</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">5,000+</div>
              <div className="text-muted-foreground">Happy Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50 Tons</div>
              <div className="text-muted-foreground">Waste Prevented</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-balance mb-4 text-foreground">How ClothShare Works</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Three simple steps to start sharing and discovering amazing clothes in your community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Post Your Clothes</CardTitle>
                <CardDescription>
                  Upload photos of clothes you no longer wear. Add details about size, condition, and pickup location.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Browse & Claim</CardTitle>
                <CardDescription>
                  Discover amazing clothes in your area. Found something you love? Claim it and arrange pickup.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Meet & Exchange</CardTitle>
                <CardDescription>
                  Coordinate pickup with the owner. Meet safely, exchange clothes, and make new connections.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="h-8 w-8 text-accent" />
            <h2 className="text-4xl font-bold text-foreground">Join Our Community</h2>
          </div>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Connect with like-minded people who care about sustainable fashion. Share stories, get styling tips, and
            make lasting friendships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <Recycle className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold mb-2">Environmental Impact</h3>
                <p className="text-muted-foreground text-sm">
                  Every shared garment reduces textile waste and carbon footprint
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold mb-2">Community Spirit</h3>
                <p className="text-muted-foreground text-sm">Build connections while giving clothes a second life</p>
              </CardContent>
            </Card>
          </div>
          <Button size="lg" asChild>
            <Link href="/signup">
              Join ClothShare Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shirt className="h-6 w-6 text-accent" />
                <span className="text-lg font-bold">ClothShare</span>
              </div>
              {/* <p className="text-muted-foreground text-sm">Making fashion sustainable, one share at a time.</p> */}
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/browse" className="hover:text-foreground">
                    Browse Clothes
                  </Link>
                </li>
                <li>
                  <Link href="/post" className="hover:text-foreground">
                    Post Items
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-foreground">
                    Safety Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ClothShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
