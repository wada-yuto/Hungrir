import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat or lng" })
  }

  const apiKey = process.env.GOOGLE_API_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ja`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch from Google API" })
    }

    const data = await response.json()

    if (data.status !== "OK") {
      return res.status(500).json({ error: data.error_message || "Google API returned an error" })
    }

    const address = data.results[0]?.formatted_address || "Address not found"
    return res.status(200).json({ address })
  } catch (err) {
    console.error("Reverse geocoding error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}