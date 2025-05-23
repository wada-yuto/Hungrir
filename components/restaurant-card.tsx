"use client"


import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, MapPin, JapaneseYen  } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantCardProps {
  restaurant: Restaurant
  onClick: () => void
}



export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <Card
      className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
          <picture>
              <img
              src={restaurant.photo?.pc?.l ?? "/placeholder.svg?height=400&width=800"}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </picture>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-2 line-clamp-1">{restaurant.name}</h3>

        <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>

        {restaurant.budget.name && (
          <div className="flex items-center text-sm text-orange-600 dark:text-orange-400 mb-2">
            <JapaneseYen className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{restaurant.budget.name}</span>
          </div>
        )}

        {restaurant.urls && (
          <div className="mt-6 text-center">
            <a href={restaurant.urls.pc} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white">
                <Globe className="mr-2 h-5 w-5" /> ウェブサイトへ
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
