import type { Restaurant } from "@/types/restaurant"

// Mock data
const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Tasty Bites",
    address: "123 Main St, Anytown, USA",
    image: "/placeholder.svg?height=400&width=800&text=Tasty+Bites",
    website: "https://tastybites.example.com",
    phone: "(555) 123-4567",
    rating: 4.5,
    hours: ["Monday - Friday: 11:00 AM - 10:00 PM", "Saturday - Sunday: 10:00 AM - 11:00 PM"],
    description:
      "A cozy restaurant serving international cuisine with a modern twist. Our chefs use locally sourced ingredients to create memorable dining experiences.",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "2",
    name: "Burger Heaven",
    address: "456 Oak Ave, Somewhere, USA",
    image: "/placeholder.svg?height=400&width=800&text=Burger+Heaven",
    website: "https://burgerheaven.example.com",
    phone: "(555) 987-6543",
    rating: 4.2,
    hours: ["Monday - Sunday: 10:00 AM - 11:00 PM"],
    description:
      "Home of the famous double-stack burger and hand-cut fries. We've been serving the best burgers in town since 1985.",
    latitude: 40.7135,
    longitude: -74.0046,
  },
  {
    id: "3",
    name: "Pasta Paradise",
    address: "789 Elm St, Nowhere, USA",
    image: "/placeholder.svg?height=400&width=800&text=Pasta+Paradise",
    website: "https://pastaparadise.example.com",
    phone: "(555) 456-7890",
    rating: 4.7,
    hours: ["Tuesday - Sunday: 5:00 PM - 10:00 PM", "Monday: Closed"],
    description:
      "Authentic Italian pasta made fresh daily. Our recipes have been passed down through generations for an authentic taste of Italy.",
    latitude: 40.712,
    longitude: -74.008,
  },
  {
    id: "4",
    name: "Sushi Spot",
    address: "101 Pine St, Elsewhere, USA",
    image: "/placeholder.svg?height=400&width=800&text=Sushi+Spot",
    website: "https://sushispot.example.com",
    phone: "(555) 234-5678",
    rating: 4.8,
    hours: [
      "Monday - Thursday: 11:30 AM - 9:30 PM",
      "Friday - Saturday: 11:30 AM - 10:30 PM",
      "Sunday: 12:00 PM - 9:00 PM",
    ],
    description:
      "Premium sushi and Japanese cuisine. Our master chefs prepare each dish with precision and artistry for an unforgettable dining experience.",
    latitude: 40.714,
    longitude: -74.003,
  },
  {
    id: "5",
    name: "Taco Town",
    address: "222 Maple Dr, Anystate, USA",
    image: "/placeholder.svg?height=400&width=800&text=Taco+Town",
    website: "https://tacotown.example.com",
    phone: "(555) 876-5432",
    rating: 4.0,
    hours: ["Monday - Sunday: 11:00 AM - 12:00 AM"],
    description:
      "Street-style tacos with authentic Mexican flavors. Our salsa bar features six homemade salsas ranging from mild to extra hot.",
    latitude: 40.715,
    longitude: -74.007,
  },
  {
    id: "6",
    name: "Pizza Palace",
    address: "333 Cedar Ln, Somewhere, USA",
    image: "/placeholder.svg?height=400&width=800&text=Pizza+Palace",
    website: "https://pizzapalace.example.com",
    phone: "(555) 345-6789",
    rating: 4.3,
    hours: ["Sunday - Thursday: 11:00 AM - 10:00 PM", "Friday - Saturday: 11:00 AM - 12:00 AM"],
    description:
      "Wood-fired pizzas with artisanal toppings. Our dough is made fresh daily and fermented for 48 hours for the perfect crust.",
    latitude: 40.711,
    longitude: -74.009,
  },
]

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`)

  if (!res.ok) {
    throw new Error("Failed to reverse geocode location")
  }

  const data = await res.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return data.address
}
export async function searchRestaurants(location: string, range: number) {
  const res = await fetch(
    `/api/search-restaurant?location=${encodeURIComponent(location)}&range=${range}`
  )

  if (!res.ok) {
    throw new Error("Failed to search restaurants")
  }

  const data = await res.json()
  return data.restaurants
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  //I need to take the current id, 

  const restaurant = mockRestaurants.find((r) => r.id === id)
  return restaurant || null
}
