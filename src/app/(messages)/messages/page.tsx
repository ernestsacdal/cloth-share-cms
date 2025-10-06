"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shirt, User, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { AccountDropdown } from "@/components/account-dropdown"


interface Message {
  id: string
  content: string
  sender_id: string
  receiver_id: string
  created_at: string
  is_item_reference?: boolean
  item_id?: string
}

interface Conversation {
  user_id: string
  user_name: string
  user_avatar: string | null
  last_message: string
  last_message_time: string
  unread_count: number
}

const mockConversations = [
  {
    user_id: "user-1",
    user_name: "Sarah Mitchell",
    user_avatar: "/diverse-woman-avatar.png",
    last_message: "Hi! Is the denim jacket still available?",
    last_message_time: "2 hours ago",
    unread_count: 1,
  },
  {
    user_id: "user-2",
    user_name: "Emma Johnson",
    user_avatar: null,
    last_message: "Thanks for the dress! It's perfect!",
    last_message_time: "1 day ago",
    unread_count: 0,
  },
  {
    user_id: "user-3",
    user_name: "Michael Chen",
    user_avatar: null,
    last_message: "When can I pick up the boots?",
    last_message_time: "3 days ago",
    unread_count: 0,
  },
]

const mockMessagesByUser: Record<string, Message[]> = {
  "user-1": [
    {
      id: "msg-1",
      content: "Regarding your item: Vintage Denim Jacket",
      sender_id: "current-user",
      receiver_id: "user-1",
      created_at: new Date(Date.now() - 7200000).toISOString(),
      is_item_reference: true,
      item_id: "1",
    },
    {
      id: "msg-2",
      content: "Hi! Is the denim jacket still available?",
      sender_id: "user-1",
      receiver_id: "current-user",
      created_at: new Date(Date.now() - 7100000).toISOString(),
    },
    {
      id: "msg-3",
      content: "Yes, it's still available! Would you like to pick it up?",
      sender_id: "current-user",
      receiver_id: "user-1",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "msg-4",
      content: "That would be great! When are you available?",
      sender_id: "user-1",
      receiver_id: "current-user",
      created_at: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: "msg-5",
      content: "I'm free this weekend. How about Saturday at 2pm?",
      sender_id: "current-user",
      receiver_id: "user-1",
      created_at: new Date(Date.now() - 900000).toISOString(),
    },
  ],
  "user-2": [
    {
      id: "msg-6",
      content: "Regarding your item: Floral Summer Dress",
      sender_id: "current-user",
      receiver_id: "user-2",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      is_item_reference: true,
      item_id: "2",
    },
    {
      id: "msg-7",
      content: "I'd love to get this dress!",
      sender_id: "user-2",
      receiver_id: "current-user",
      created_at: new Date(Date.now() - 86300000).toISOString(),
    },
    {
      id: "msg-8",
      content: "Great! When would you like to pick it up?",
      sender_id: "current-user",
      receiver_id: "user-2",
      created_at: new Date(Date.now() - 86200000).toISOString(),
    },
    {
      id: "msg-9",
      content: "Thanks for the dress! It's perfect!",
      sender_id: "user-2",
      receiver_id: "current-user",
      created_at: new Date(Date.now() - 86100000).toISOString(),
    },
  ],
  "user-3": [
    {
      id: "msg-10",
      content: "Regarding your item: Black Leather Boots",
      sender_id: "current-user",
      receiver_id: "user-3",
      created_at: new Date(Date.now() - 259200000).toISOString(),
      is_item_reference: true,
      item_id: "3",
    },
    {
      id: "msg-11",
      content: "Are these boots still available?",
      sender_id: "user-3",
      receiver_id: "current-user",
      created_at: new Date(Date.now() - 259100000).toISOString(),
    },
    {
      id: "msg-12",
      content: "Yes they are! Size 9.",
      sender_id: "current-user",
      receiver_id: "user-3",
      created_at: new Date(Date.now() - 259000000).toISOString(),
    },
    {
      id: "msg-13",
      content: "When can I pick up the boots?",
      sender_id: "user-3",
      receiver_id: "current-user",
      created_at: new Date(Date.now() - 258900000).toISOString(),
    },
  ],
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const currentUserId = "current-user"
  const [itemsDiscussed, setItemsDiscussed] = useState<Set<string>>(new Set())

  const userIdFromUrl = searchParams.get("userId")
  const itemIdFromUrl = searchParams.get("itemId")
  const itemNameFromUrl = searchParams.get("itemName")

  useEffect(() => {
    if (userIdFromUrl) {
      const existingConv = conversations.find((c) => c.user_id === userIdFromUrl)

      if (existingConv) {
        setSelectedConversation(userIdFromUrl)
        loadMessages(userIdFromUrl)

        if (itemIdFromUrl && itemNameFromUrl && !itemsDiscussed.has(itemIdFromUrl)) {
          setTimeout(() => {
            sendItemReferenceMessage(userIdFromUrl, itemIdFromUrl, itemNameFromUrl)
            setItemsDiscussed((prev) => new Set(prev).add(itemIdFromUrl))
          }, 100)
        }
      } else {
        setSelectedConversation(userIdFromUrl)
        const newConv: Conversation = {
          user_id: userIdFromUrl,
          user_name: "User",
          user_avatar: null,
          last_message: "",
          last_message_time: "Just now",
          unread_count: 0,
        }
        setConversations((prev) => [newConv, ...prev])
        setMessages([])

        if (itemIdFromUrl && itemNameFromUrl) {
          setTimeout(() => {
            sendItemReferenceMessage(userIdFromUrl, itemIdFromUrl, itemNameFromUrl)
            setItemsDiscussed((prev) => new Set(prev).add(itemIdFromUrl))
          }, 100)
        }
      }
    }
  }, [userIdFromUrl, itemIdFromUrl, itemNameFromUrl])

  function loadMessages(userId: string) {
    const userMessages = mockMessagesByUser[userId] || []
    setMessages(userMessages)
  }

  function sendItemReferenceMessage(receiverId: string, itemId: string, itemName: string) {
    const itemReferenceMsg: Message = {
      id: `msg-item-${Date.now()}`,
      content: `Regarding your item: ${itemName}`,
      sender_id: currentUserId,
      receiver_id: receiverId,
      created_at: new Date().toISOString(),
      is_item_reference: true,
      item_id: itemId,
    }

    setMessages((prev) => [...prev, itemReferenceMsg])

    setConversations((prev) =>
      prev.map((conv) =>
        conv.user_id === receiverId
          ? { ...conv, last_message: itemReferenceMsg.content, last_message_time: "Just now" }
          : conv,
      ),
    )
  }

  function sendMessage() {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender_id: currentUserId,
      receiver_id: selectedConversation,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMsg])

    setConversations((prev) =>
      prev.map((conv) =>
        conv.user_id === selectedConversation
          ? { ...conv, last_message: newMessage, last_message_time: "Just now" }
          : conv,
      ),
    )

    setNewMessage("")
  }

  return (
    <div className="min-h-screen bg-background">
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3">
            <Link
              href="/browse"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Browse
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        </div>

        <div className="flex gap-4 h-[600px]">
          {/* Conversations List - 1/4 width */}
          <div className="w-1/4 bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden flex-shrink-0">
            <div className="p-6 border-b">
              <h2 className="font-semibold">Conversations</h2>
            </div>
            <div className="divide-y overflow-y-auto" style={{ maxHeight: "calc(600px - 73px)" }}>
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No conversations yet</div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.user_id}
                    onClick={() => {
                      setSelectedConversation(conv.user_id)
                      loadMessages(conv.user_id)
                    }}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left ${
                      selectedConversation === conv.user_id ? "bg-muted" : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={conv.user_avatar || undefined} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{conv.user_name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {conv.last_message || "Start a conversation"}
                      </p>
                    </div>
                    {conv.unread_count > 0 && (
                      <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs text-white flex-shrink-0">
                        {conv.unread_count}
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area - 3/4 width */}
          <div className="w-3/4 bg-card text-card-foreground rounded-xl border shadow-sm flex flex-col overflow-hidden flex-shrink-0">
            {selectedConversation ? (
              <>
                <div className="p-6 border-b">
                  <h2 className="font-semibold">
                    {conversations.find((c) => c.user_id === selectedConversation)?.user_name || "Chat"}
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.is_item_reference
                            ? "bg-muted border-2 border-accent/50"
                            : message.sender_id === currentUserId
                              ? "bg-accent text-white"
                              : "bg-muted"
                        }`}
                      >
                        {message.is_item_reference && (
                          <p className="text-xs font-semibold text-accent mb-1">📦 Item Reference</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{new Date(message.created_at).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}