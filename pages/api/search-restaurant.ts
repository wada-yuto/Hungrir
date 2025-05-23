import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location, range } = req.query

  if (!location || !range) {
    return res.status(400).json({ error: "Missing location or range" })
  }

  try {
    // Step 1: Get lat/lng from Google
    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location as string
      )}&key=${process.env.GOOGLE_API_KEY}&language=ja`
    )

    const geoData = await geoRes.json()

    if (geoData.status !== "OK") {
      return res.status(400).json({ error: geoData.error_message || "Invalid location" })
    }

    const { lat, lng } = geoData.results[0].geometry.location

    // Step 2: Use lat/lng with Hot Pepper API
    const hotPepperRes = await fetch(
      `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.HOT_PEPPER_API_KEY}&lat=${lat}&lng=${lng}&range=${range}&count=25&format=json`
    )

    const hotPepperData = await hotPepperRes.json()

    if (!hotPepperData.results || !hotPepperData.results.shop) {
      return res.status(200).json({ restaurants: [] })
    }

    return res.status(200).json({ restaurants: hotPepperData.results.shop })
  } catch (err) {
    console.error("Search API error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}