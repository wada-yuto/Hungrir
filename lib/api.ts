
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`)

  if (!res.ok) {
    throw new Error("リバースジオコード失敗")
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
    throw new Error("検索失敗")
  }

  const data = await res.json()
  return data.restaurants
}
