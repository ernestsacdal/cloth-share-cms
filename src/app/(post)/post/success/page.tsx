import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shirt, Check, Share2, Eye, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PostSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shirt className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">ClothShare</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-accent" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-foreground mb-4">Item Posted Successfully!</h1>
        {/* <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Your item is now live on ClothShare. The community can discover and claim it right away.
        </p> */}

        {/* Item Preview Card */}
        <Card className="mb-8 text-left">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Your Posted Item</CardTitle>
                <CardDescription>Now visible to the community</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <Shirt className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Vintage Denim Jacket</h3>
                <p className="text-sm text-muted-foreground">Size M • Like New • Jackets</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>0 views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>0 interested</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center p-4">
            <Eye className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-medium mb-2">Get Discovered</h3>
            <p className="text-sm text-muted-foreground">
              Your item will appear in search results and category browsing
            </p>
          </Card>
          <Card className="text-center p-4">
            <MessageCircle className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-medium mb-2">Receive Messages</h3>
            <p className="text-sm text-muted-foreground">Interested users will message you to arrange pickup</p>
          </Card>
          <Card className="text-center p-4">
            <Check className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-medium mb-2">Complete Exchange</h3>
            <p className="text-sm text-muted-foreground">Meet up and give your item a new home</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/browse">
              Browse More Items
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-4 w-4 mr-2" />
            Share Your Listing
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/post">Post Another Item</Link>
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg text-left">
          <h3 className="font-medium mb-3">Tips for Success</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Respond quickly to messages to build trust</li>
            <li>• Be flexible with pickup times and locations</li>
            <li>• Update your listing if the item is no longer available</li>
            <li>• Consider posting more items to help more people</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
