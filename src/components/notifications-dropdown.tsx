"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const dummyNotifications = [
  {
    id: "1",
    type: "request",
    title: "New Request",
    message: "Sarah Mitchell wants to claim your Vintage Denim Jacket",
    time: "5 minutes ago",
    read: false,
    link: "/items",
  },
  {
    id: "2",
    type: "request",
    title: "New Request",
    message: "John Doe wants to claim your Vintage Denim Jacket",
    time: "15 minutes ago",
    read: false,
    link: "/items",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message: "Emma Wilson sent you a message",
    time: "1 hour ago",
    read: false,
    link: "/messages",
  },
]

export function NotificationsDropdown() {
  const unreadCount = dummyNotifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dummyNotifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {dummyNotifications.map((notification) => (
              <DropdownMenuItem key={notification.id} asChild>
                <Link href={notification.link} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-start justify-between w-full gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-accent mt-1" />}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
