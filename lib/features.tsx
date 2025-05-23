// import { Wifi , Bed, CreditCard, Ban, ParkingSquare, DoorClosed, Car, Wine, Utensils } from "lucide-react"


// export function getRestaurantFeatures(restaurant: Restaurant) {
//   return {
//     WiFi: restaurant.wifi === "あり",
//     個室: restaurant.private_room === "あり",
//     クレジットカード: restaurant.card === "利用可",
//     nonSmoking: restaurant.non_smoking === "あり",
//     パーキング: restaurant.parking === "あり",
//     // Add more mappings if needed
//   }
// }

// export const featureIconMap: Record<string, () => JSX.Element> = {
//   WiFi: () => <Wifi className="w-5 h-5 text-orange-600 dark:text-orange-400 " />,
//   クレジットカード: () => <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400 fill-current" />,
//   個室: () => <DoorClosed className="w-5 h-5 text-orange-600 dark:text-orange-400 "  />,
//   パーキング: () => <Car className="w-5 h-5 text-orange-600 dark:text-orange-400 " />,
//   smoking: () =>  <Smoking className="w-5 h-5 text-orange-600 dark:text-orange-400 " />,
//   freeDrink: () => <Wine className="w-5 h-5 text-orange-600 dark:text-orange-400 " />,
//   courseMenu: () => <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400 " />,
// }

// export function formatFeatureName(key: string): string {
//   const map: Record<string, string> = {
//     wifi: "Free Wi-Fi",
//     privateRoom: "Private Room",
//     parking: "Parking",
//     smoking: "Smoking Area",
//     freeDrink: "Free Drink",
//     courseMenu: "Course Menu",
//   }
//   return map[key] || key
// }