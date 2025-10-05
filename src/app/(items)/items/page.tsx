"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shirt, User, Check, X, Clock, ArrowLeft, ChevronRight, MessageSquare, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import Image from "next/image"

interface ItemWithRequests {
  id: string
  title: string
  images: string[]
  requestCount: number
  requests: Request[]
  status: "pending" | "active" | "completed"
  approvedUser?: string
}

interface Request {
  id: string
  requesterName: string
  requesterAvatar: string | null
  message: string
  requestedAt: string
}

const dummyItems: ItemWithRequests[] = [
  {
    id: "item-1",
    title: "Vintage Denim Jacket",
    images: ["/vintage-denim-jacket.png"],
    requestCount: 3,
    status: "pending",
    requests: [
      {
        id: "req-1",
        requesterName: "Sarah Mitchell",
        requesterAvatar: null,
        message: "Hi! I'd love to borrow this jacket for a photoshoot next week. I'll take great care of it!",
        requestedAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "req-2",
        requesterName: "John Doe",
        requesterAvatar: null,
        message: "This would be perfect for my upcoming event. Can I borrow it for the weekend?",
        requestedAt: "2024-01-15T10:45:00Z",
      },
      {
        id: "req-3",
        requesterName: "Emma Wilson",
        requesterAvatar: null,
        message: "I've been looking for a jacket like this! Would love to try it out.",
        requestedAt: "2024-01-15T11:00:00Z",
      },
    ],
  },
  {
    id: "item-2",
    title: "Floral Summer Dress",
    images: ["/floral-summer-dress.png"],
    requestCount: 1,
    status: "pending",
    requests: [
      {
        id: "req-4",
        requesterName: "Alex Johnson",
        requesterAvatar: null,
        message: "Would love to wear this for a summer party!",
        requestedAt: "2024-01-15T09:00:00Z",
      },
    ],
  },
]

const dummyMyRequests: ItemWithRequests[] = [
  {
    id: "item-3",
    title: "Black Leather Boots",
    images: ["/black-leather-boots.png"],
    requestCount: 1,
    status: "pending",
    requests: [
      {
        id: "req-5",
        requesterName: "Current User",
        requesterAvatar: null,
        message: "I'd love to borrow these boots for a concert!",
        requestedAt: "2024-01-14T15:00:00Z",
      },
    ],
  },
]

export default function ItemManagementPage() {
  const [items, setItems] = useState<ItemWithRequests[]>(dummyItems)
  const [myRequests] = useState<ItemWithRequests[]>(dummyMyRequests)
  const [selectedItem, setSelectedItem] = useState<ItemWithRequests | null>(null)
  const [activeTab, setActiveTab] = useState("incoming")

  function handleApprove(itemId: string, requestId: string, requesterName: string) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            status: "active",
            approvedUser: requesterName,
          }
        }
        return item
      }),
    )
    setSelectedItem(null)
  }

  function handleDecline(itemId: string, requestId: string) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updatedRequests = item.requests.filter((r) => r.id !== requestId)
          return {
            ...item,
            requests: updatedRequests,
            requestCount: updatedRequests.length,
          }
        }
        return item
      }),
    )
    if (selectedItem?.id === itemId) {
      const updatedItem = items.find((i) => i.id === itemId)
      if (updatedItem) {
        setSelectedItem({
          ...updatedItem,
          requests: updatedItem.requests.filter((r) => r.id !== requestId),
        })
      }
    }
  }

  function handleComplete(itemId: string) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, status: "completed" }
        }
        return item
      }),
    )
  }

  function handleSelectAnother(itemId: string) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, status: "pending", approvedUser: undefined }
        }
        return item
      }),
    )
  }

  const pendingItems = items.filter((i) => i.status === "pending" && i.requestCount > 0)
  const activeItems = items.filter((i) => i.status === "active")
  const completedItems = items.filter((i) => i.status === "completed")

  const pendingMy = myRequests.filter((i) => i.status === "pending")
  const activeMy = myRequests.filter((i) => i.status === "active")
  const completedMy = myRequests.filter((i) => i.status === "completed")

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
            <NotificationsDropdown />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                Account
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/browse"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Browse
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link href="items/safety-tips">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Safety Tips
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Item Management</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming">Incoming Requests ({pendingItems.length + activeItems.length})</TabsTrigger>
            <TabsTrigger value="my-requests">My Requests ({myRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-6">
            {/* Pending Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Pending ({pendingItems.length})</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {pendingItems.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">No pending requests</CardContent>
                  </Card>
                ) : selectedItem && selectedItem.status === "pending" ? (
                  // Detail View - Show all requests for selected item
                  <Card>
                    <CardContent className="p-6">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)} className="mb-4 -ml-2">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to items
                      </Button>

                      <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                        <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={selectedItem.images[0] || "/placeholder.svg"}
                            alt={selectedItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{selectedItem.title}</h3>
                          <p className="text-muted-foreground">
                            {selectedItem.requestCount} {selectedItem.requestCount === 1 ? "request" : "requests"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                          Requests (sorted by time)
                        </h4>
                        {selectedItem.requests.map((request, index) => (
                          <div key={request.id} className="border rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Badge variant="secondary" className="font-mono mt-1">
                                #{index + 1}
                              </Badge>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold">{request.requesterName}</p>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(request.requestedAt).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(selectedItem.id, request.id, request.requesterName)}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDecline(selectedItem.id, request.id)}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Decline
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // List View - Show items with request counts
                  <div className="grid gap-3">
                    {pendingItems.map((item) => (
                      <Card
                        key={item.id}
                        className="cursor-pointer hover:border-accent transition-colors"
                        onClick={() => setSelectedItem(item)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.requestCount} {item.requestCount === 1 ? "person" : "people"} waiting
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-lg px-3 py-1">
                                {item.requestCount}
                              </Badge>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Active ({activeItems.length})</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {activeItems.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">No active items</CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {activeItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">Approved for {item.approvedUser}</p>
                              <Badge variant="secondary" className="mt-2">
                                Active
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href="/messages">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Message
                                </Link>
                              </Button>
                              <Button size="sm" onClick={() => handleComplete(item.id)}>
                                <Check className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleSelectAnother(item.id)}>
                                Select Another
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Completed Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Completed ({completedItems.length})</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {completedItems.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">No completed items</CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {completedItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">Completed with {item.approvedUser}</p>
                              <Badge className="mt-2">Completed</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* My Requests Tab */}
          <TabsContent value="my-requests" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Pending ({pendingMy.length})</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {pendingMy.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">No pending requests</CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {pendingMy.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">Waiting for approval</p>
                              <Badge variant="outline" className="mt-2">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Approved ({activeMy.length})</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {activeMy.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">No approved requests</CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {activeMy.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">Request approved!</p>
                              <Badge variant="secondary" className="mt-2 bg-accent/10 text-accent">
                                Approved
                              </Badge>
                            </div>
                            <Button size="sm" asChild>
                              <Link href="/messages">Message Owner</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Completed ({completedMy.length})</h2>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                {completedMy.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">No completed requests</CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {completedMy.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={item.images[0] || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">Exchange completed</p>
                              <Badge className="mt-2">Completed</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
