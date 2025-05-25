"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RestaurantCard } from "@/components/restaurant-card"
import { ArrowLeft, Search, MapPin } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"
import { searchRestaurants } from "@/lib/api"
import { reverseGeocode } from "@/lib/api"
import { RestaurantDetailDialog } from "@/components/restaurant-detail-dialog"

//Filter content: party_capacity (slider), free_drink, free_food, private_room, card, parking, non_smoking, pet, child, english
//I need filter feature, and be able to host this on github pages or something
//Do I want to filter the initial serach, or the serach result? I could do both but what does the timeline look like?
//Fix the open and close time?
function rangeToDistance(range: number) {
  const map: Record<number, string> = {
    1: "〜300m",
    2: "〜500m",
    3: "〜1km",
    4: "〜2km",
    5: "〜3km",
  }
  return map[range] || "N/A"
}

export default function SearchPage() {
  const [location, setLocation] = useState("")
  const [radius, setRadius] = useState(3)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleSearch = async () => {
    if (!location) return

    setLoading(true)
    setSearched(true)

    try {
      const results = await searchRestaurants(location, radius)
      setRestaurants(results)
      console.log(results)
    } catch (error) {
      console.error("Error searching restaurants:", error)
    } finally {
      setLoading(false)
    }
  }
  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setIsDetailOpen(true)
  }


const handleGetCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        // const latitude1 = 35.50993380751522
        // const longitude1 = 139.69878631892538

        try {
          const address = await reverseGeocode(latitude, longitude)
          setLocation(address)
        } catch (error) {
          console.error("Error reverse geocoding:", error)
          console.log(error)
          setLocation(`${latitude},${longitude}`)
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
        alert("Failed to get your location.")
      }
    )
  } else {
    alert("Geolocation not supported.")
  }
}

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-orange-600 dark:text-orange-400">
              <ArrowLeft className="h-10 w-10" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">近くのレストランを検索</h1>

          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="現在地ボタンをクリック"
                  value={location}
                  disabled
                  onChange={(e) => setLocation(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 text-orange-600 dark:text-orange-400"
                  onClick={handleGetCurrentLocation}
                >
                  <MapPin className="h-5 w-5" />
                  <span className="sr-only">現在地</span>
                </Button>
              </div>
              <Button
                onClick={handleSearch}
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white "
              >
                <Search className="h-7 w-7" />
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-700 dark:text-zinc-300 tracking-wide">検索範囲</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">
                  {rangeToDistance(radius)}
                </span>
              </div>
              <Slider
                defaultValue={[3]}
                max={5}
                step={1}
                onValueChange={(value) => setRadius(value[0])}
                className="py-4"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
              <p className="mt-4 text-zinc-700 dark:text-zinc-300">検索中...</p>
            </div>
          ) : searched ? (
            <div>
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
                {restaurants.length > 0
                  ? ` 約${rangeToDistance(radius)}以内に${restaurants.length}件リストアップ `
                  : "付近にレストランがありません。検索範囲を広くしてください。"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onClick={() => handleRestaurantClick(restaurant)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
              <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>現在地を入力し、検索範囲を決めてください</p>
              
            </div>
          )}
        </div>
      </div>
      <RestaurantDetailDialog restaurant={selectedRestaurant} isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} />
    </div>
  )
}
