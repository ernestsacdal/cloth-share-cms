"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  listingId: string
  userId?: string
  variant?: "default" | "ghost" | "outline" | "secondary"
  showText?: boolean
  className?: string
}

export function FavoriteButton({
  listingId,
  userId,
  variant = "ghost",
  showText = false,
  className,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      checkFavoriteStatus()
    }
  }, [userId, listingId])

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`/api/favorites/check?item_ids=${listingId}`)
      const data = await response.json()
      setIsFavorited(data.favorites[listingId] || false)
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      router.push("/auth/login")
      return
    }

    setIsLoading(true)

    try {
      if (isFavorited) {
        // Remove favorite
        const response = await fetch(`/api/favorites?item_id=${listingId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setIsFavorited(false)
        }
      } else {
        // Add favorite
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_id: listingId }),
        })

        if (response.ok) {
          setIsFavorited(true)
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={cn("gap-2", className)}
    >
      <Heart className={cn("h-4 w-4 transition-all", isFavorited && "fill-accent text-accent")} />
      {showText && <span>{isFavorited ? "Favorited" : "Favorite"}</span>}
    </Button>
  )
}
