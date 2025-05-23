"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, MapPin, Globe, TramFront  } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"
import { RestaurantFeatures } from "@/components/restaurant-features"

interface RestaurantDetailDialogProps {
  restaurant: Restaurant | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function RestaurantDetailDialog({ restaurant, isOpen, onOpenChange }: RestaurantDetailDialogProps) {
  if (!restaurant) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-zinc-800 dark:text-zinc-100 text-center">
            &quot;{restaurant.catch}&quot; By {restaurant.name}
        </DialogTitle>
        </DialogHeader>

        <div className="h-80 relative mt-4 rounded-md overflow-hidden">
          <picture>
              <img
              src={restaurant.photo.pc.l || "/placeholder.svg?height=400&width=800"}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </picture>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            {restaurant.address && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200 hover: text">住所</h3>
                  <a className="text-zinc-800 dark:hover:text-zinc-100 dark:text-zinc-400" target="_blank" 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}> {restaurant.address}
                  </a>
                </div>
              </div>
            )}


            {restaurant.station_name && (
              <div className="flex items-start">
                <TramFront className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200">最寄駅名</h3>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {restaurant.station_name}駅
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="space-y-4">
            {restaurant.open && (
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200">営業時間</h3>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {restaurant.open}
                  </div>
                </div>
              </div>
            )}
            {restaurant.close && (
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200">定休日</h3>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {restaurant.close}
                  </div>
                </div>
              </div>
            )}
            {restaurant.budget.average && (
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-200">お値</h3>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {restaurant.budget.average}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <RestaurantFeatures restaurant={restaurant} />
        
        {restaurant.urls && (
          <div className="mt-6 text-center">
            <a href={restaurant.urls.pc} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white">
                <Globe className="mr-2 h-5 w-5" /> Visit Website
              </Button>
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
