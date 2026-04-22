// Tipos para propiedades
import { User } from './user.types'

export interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: 'USD' | 'CUP' | 'EUR' | 'MLC'
  propertyType: 'casa_particular' | 'apartamento' | 'villa' | 'habitacion'
  transactionType: 'alquiler' | 'venta' | 'compra'
  location: {
    province: string
    municipality: string
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  bedrooms: number
  bathrooms: number
  maxGuests: number
  area: number // m²
  amenities: string[]
  images: PropertyImage[]
  owner: User
  status: 'available' | 'rented' | 'sold' | 'pending'
  createdAt: Date
  updatedAt: Date
  isNew?: boolean
  isFeatured?: boolean
}

export interface PropertyImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface PropertyFilters {
  location?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: Property['propertyType']
  transactionType?: Property['transactionType']
  amenities?: string[]
  minArea?: number
  maxArea?: number
}
