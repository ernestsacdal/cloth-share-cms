"use client"

import { Shirt } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Shirt className="h-16 w-16 text-accent mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-foreground">ClothShare</h2>
        <div className="h-1 w-48 bg-muted rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-accent animate-[loading_1.5s_ease-in-out_infinite]"
            style={{
              animation: "loading 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 75%; margin-left: 12.5%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
