// app/api/search-restaurants/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const range = searchParams.get("range") || "3"

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat or lng" }, { status: 400 })
  }

  const apiKey = process.env.HOT_PEPPER_API_KEY

  const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=${range}&format=json`

  try {
    const hotPepperRes = await fetch(url)
    const hotPepperData = await hotPepperRes.json()

    const restaurants = hotPepperData.results.shop.map((shop: any) => ({
      id: shop.id,
      name: shop.name,
      address: shop.address,
      photo: shop.photo.pc.l,
      genre: shop.genre.name,
      url: shop.urls.pc,
    }))

    return NextResponse.json({ restaurants })
  } catch (error) {
    console.error("Hot Pepper API error:", error)
    return NextResponse.json({ error: "Failed to fetch from Hot Pepper API" }, { status: 500 })
  }
}