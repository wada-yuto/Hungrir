export interface Restaurant {
  id: string
  name: string
  address: string
  description?: string
  latitude?: number
  longitude?: number
  features: {
    party_capacity?: number
    wifi?: string
    free_drink?: string
    free_food?: string
    private_room?: string
    non_smoking?: string
    card?: string
    parking?: string
    english?: string
    pet?: string
    child?: string
  }
}
