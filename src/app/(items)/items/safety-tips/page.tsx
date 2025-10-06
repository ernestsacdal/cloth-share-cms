import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shirt, ArrowLeft, Shield, MapPin, Users, Clock, Phone, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

const safetyTips = [
  {
    icon: MapPin,
    title: "Meet in Public Places",
    description: "Always choose busy, well-lit public locations like coffee shops, malls, or community centers.",
    tips: ["Avoid private residences", "Choose locations with security cameras", "Pick places you're familiar with"],
  },
  {
    icon: Users,
    title: "Bring a Friend",
    description: "Consider bringing a friend along, especially for evening pickups or unfamiliar locations.",
    tips: ["Let someone know your plans", "Share your location with trusted contacts", "Trust your instincts"],
  },
  {
    icon: Clock,
    title: "Daytime Meetings",
    description: "Schedule pickups during daylight hours when possible for better visibility and safety.",
    tips: ["Avoid late night meetings", "Plan for busy times of day", "Allow extra time for the exchange"],
  },
  {
    icon: Phone,
    title: "Keep Communication on Platform",
    description: "Use ClothShare's messaging system to maintain a record of your conversations.",
    tips: [
      "Don't share personal phone numbers immediately",
      "Keep pickup details documented",
      "Report suspicious behavior",
    ],
  },
]

const redFlags = [
  "Requests to meet in isolated or private locations",
  "Pressure to complete the exchange quickly",
  "Asks for personal information beyond what's necessary",
  "Refuses to meet in public or during daytime",
  "Communication seems suspicious or inappropriate",
  "Requests payment for free items",
]

export default function SafetyPage() {
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
          {/* <Button variant="ghost" asChild>
            <Link href="/pickups">Back to Pickups</Link>
          </Button> */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/items"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Item Management
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Safety Guidelines</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Your safety is our top priority. Follow these guidelines to ensure safe and positive exchanges.
          </p>
        </div>

        {/* Safety Tips */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <tip.icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.tips.map((tipItem, tipIndex) => (
                      <li key={tipIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{tipItem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        <Card className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
              <AlertTriangle className="h-5 w-5" />
              Red Flags to Watch For
            </CardTitle>
            <CardDescription className="text-red-700 dark:text-red-300">
              Be cautious if you encounter any of these warning signs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {redFlags.map((flag, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-700 dark:text-red-300">{flag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Emergency & Reporting</CardTitle>
            <CardDescription>Know how to get help when you need it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">If You Feel Unsafe</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Trust your instincts and leave immediately</li>
                  <li>• Call emergency services if needed</li>
                  <li>• Report the incident to ClothShare</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Report Suspicious Behavior</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use the report button in messages</li>
                  <li>• Contact our support team</li>
                  <li>• Provide detailed information</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
            <CardDescription>Help us maintain a safe and welcoming community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-green-700 dark:text-green-300">Do</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Be respectful and courteous
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Communicate clearly about pickup details
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Show up on time or communicate delays
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Leave honest reviews
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-red-700 dark:text-red-300">Don't</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Share personal information unnecessarily
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Meet in private or isolated locations
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Engage in inappropriate behavior
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Ignore safety guidelines
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        {/* <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/pickups">
              Back to Pickups
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div> */}
      </div>
    </div>
  )
}
