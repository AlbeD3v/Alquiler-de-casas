'use client'

import Link from 'next/link'
import { PropertyCard } from '@/components/features/properties/PropertyCard'
import { Button } from '@/components/ui/button'
import { Property } from '@/types/property.types'
import { Heart, Search } from 'lucide-react'

const mockFavorites: Property[] = [
  {
    id: 'PROP-001',
    title: 'Villa Colonial en La Habana Vieja',
    description: 'Hermosa villa con vista al Malecón y techos altos coloniales',
    price: 150, currency: 'USD', propertyType: 'villa', transactionType: 'alquiler',
    location: { province: 'La Habana', municipality: 'La Habana Vieja', address: 'Calle Obispo #123' },
    bedrooms: 3, bathrooms: 2, maxGuests: 6, area: 180,
    amenities: ['WiFi', 'A/C', 'Cocina', 'Parking'],
    images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', alt: 'Villa Colonial', isPrimary: true, order: 1 }],
    owner: { id: 'user-1', name: 'Carlos Pérez', email: 'carlos@almacuba.com', reputation: 4.8, totalProperties: 5, totalTransactions: 23, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available', createdAt: new Date(), updatedAt: new Date(), isNew: true, isFeatured: true,
  },
  {
    id: 'PROP-002',
    title: 'Apartamento Moderno en Vedado',
    description: 'Apartamento renovado con todas las comodidades modernas',
    price: 85, currency: 'USD', propertyType: 'apartamento', transactionType: 'alquiler',
    location: { province: 'La Habana', municipality: 'Plaza de la Revolución', address: 'Calle 23 #456' },
    bedrooms: 2, bathrooms: 1, maxGuests: 4, area: 95,
    amenities: ['WiFi', 'A/C', 'TV'],
    images: [{ id: 'img-2', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80', alt: 'Apartamento Vedado', isPrimary: true, order: 1 }],
    owner: { id: 'user-2', name: 'María Rodríguez', email: 'maria@almacuba.com', reputation: 4.5, totalProperties: 3, totalTransactions: 15, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available', createdAt: new Date(), updatedAt: new Date(), isFeatured: true,
  },
  {
    id: 'PROP-003',
    title: 'Casa de Playa en Varadero',
    description: 'Frente al mar, arena blanca, acceso privado a la playa',
    price: 220, currency: 'USD', propertyType: 'villa', transactionType: 'alquiler',
    location: { province: 'Matanzas', municipality: 'Varadero', address: 'Av. Primera #88' },
    bedrooms: 4, bathrooms: 3, maxGuests: 8, area: 240,
    amenities: ['WiFi', 'Piscina', 'A/C', 'Cocina'],
    images: [{ id: 'img-3', url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80', alt: 'Casa de Playa', isPrimary: true, order: 1 }],
    owner: { id: 'user-3', name: 'Ana García', email: 'ana@almacuba.com', reputation: 4.9, totalProperties: 2, totalTransactions: 31, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available', createdAt: new Date(), updatedAt: new Date(), isNew: true, isFeatured: true,
  },
]

export default function FavoritesPage() {
  const count = mockFavorites.length

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
          <Heart className="h-4.5 w-4.5 text-coral fill-coral" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-playfair text-foreground">Mis Favoritos</h1>
          <p className="text-xs text-muted-foreground">
            {count} {count === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
          </p>
        </div>
      </div>

      {/* Content */}
      {count === 0 ? (
        <div className="rounded-2xl bg-surface-container-lowest border border-border/40 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-surface-container mx-auto flex items-center justify-center">
            <Heart className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground font-playfair">Todavía no guardaste propiedades</p>
            <p className="text-sm text-muted-foreground mt-1">
              Explorá el catálogo y guardá las que más te gusten
            </p>
          </div>
          <Button variant="golden" size="sm" asChild>
            <Link href="/search">
              <Search className="h-4 w-4" />
              Explorar propiedades
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {mockFavorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
