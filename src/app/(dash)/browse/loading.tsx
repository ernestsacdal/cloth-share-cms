import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Shirt } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shirt className="h-8 w-8 text-accent animate-pulse" />
            <span className="text-2xl font-bold text-foreground">ClothShare</span>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <Skeleton className="flex-1 h-10" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-[140px]" />
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[140px]" />
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-10 w-[160px]" />
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[4/3] w-full" />
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-8" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex gap-2 mb-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground animate-pulse">Loading amazing clothes for you...</p>
        </div>
      </div>
    </div>
  )
}
