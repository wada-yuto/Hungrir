"use client"

import { useState, useEffect, use } from "react";
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, MapPin, Globe, Phone, Star } from "lucide-react"
import type { Restaurant } from "@/types/restaurant"
import { getRestaurantById } from "@/lib/api"

export default function RestaurantDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurantById(params.id)
        setRestaurant(data)
      } catch (error) {
        console.error("Error fetching restaurant details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurant()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-orange-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/search">
              <Button variant="ghost" className="text-orange-600 dark:text-orange-400">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Search
              </Button>
            </Link>
            <ThemeToggle />
          </div>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">Restaurant not found</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              The restaurant you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/search">
              <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white">
                Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/search">
            <Button variant="ghost" className="text-orange-600 dark:text-orange-400">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Search
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 relative">
              <img
                src={restaurant.photo.pc.l || "/placeholder.svg?height=400&width=800"}
                alt={restaurant.sub_genre.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2 md:mb-0">{restaurant.name}</h1>
                {restaurant.rating && (
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{restaurant.rating} / 5</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  {restaurant.address && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-800 dark:text-zinc-200">Address</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">{restaurant.address}</p>
                      </div>
                    </div>
                  )}

                  {restaurant.phone && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-800 dark:text-zinc-200">Phone</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">{restaurant.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {restaurant.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-800 dark:text-zinc-200">Website</h3>
                        <a
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 dark:text-orange-400 hover:underline"
                        >
                          {restaurant.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}

                  {restaurant.hours && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-zinc-800 dark:text-zinc-200">Hours</h3>
                        <div className="text-zinc-600 dark:text-zinc-400">
                          {restaurant.hours.map((hour, index) => (
                            <p key={index}>{hour}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {restaurant.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">About</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{restaurant.description}</p>
                </div>
              )}

              {restaurant.website && (
                <div className="text-center">
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white">
                      <Globe className="mr-2 h-5 w-5" /> Visit Website
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
