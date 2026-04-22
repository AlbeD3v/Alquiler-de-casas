'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Property } from '@/types/property.types'
import { formatPrice } from '@/config/currencies'
import { Plus, Edit, Trash2, Eye, Bed, Bath, Maximize2, MapPin, Home } from 'lucide-react'

const STATUS_BADGE: Record<string, { label: string; variant: 'nuevo' | 'destacado' | 'oferta' }> = {
  available: { label: 'Disponible', variant: 'nuevo' },
  rented: { label: 'Alquilada', variant: 'destacado' },
  unavailable: { label: 'No disponible', variant: 'oferta' },
}

const mockMyProperties: Property[] = [
  {
    id: 'PROP-001',
    title: 'Villa Colonial en La Habana Vieja',
    description: 'Hermosa villa colonial con vista al Malecón',
    price: 150,
    currency: 'USD',
    propertyType: 'villa',
    transactionType: 'alquiler',
    location: { province: 'La Habana', municipality: 'La Habana Vieja', address: 'Calle Obispo #123' },
    bedrooms: 3, bathrooms: 2, maxGuests: 6, area: 180,
    amenities: ['WiFi', 'A/C', 'Cocina', 'Parking'],
    images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80', alt: 'Villa Colonial', isPrimary: true, order: 1 }],
    owner: { id: 'user-1', name: 'Carlos Pérez', email: 'carlos@almacuba.com', reputation: 4.8, totalProperties: 3, totalTransactions: 23, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available', createdAt: new Date('2024-01-15'), updatedAt: new Date(), isNew: false, isFeatured: true,
  },
  {
    id: 'PROP-002',
    title: 'Apartamento Moderno en Vedado',
    description: 'Apartamento renovado con todas las comodidades',
    price: 85,
    currency: 'USD',
    propertyType: 'apartamento',
    transactionType: 'alquiler',
    location: { province: 'La Habana', municipality: 'Plaza de la Revolución', address: 'Calle 23 #456' },
    bedrooms: 2, bathrooms: 1, maxGuests: 4, area: 95,
    amenities: ['WiFi', 'A/C', 'TV'],
    images: [{ id: 'img-2', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80', alt: 'Apartamento Vedado', isPrimary: true, order: 1 }],
    owner: { id: 'user-1', name: 'Carlos Pérez', email: 'carlos@almacuba.com', reputation: 4.8, totalProperties: 3, totalTransactions: 23, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'rented', createdAt: new Date('2024-03-10'), updatedAt: new Date(),
  },
]

export default function MyPropertiesPage() {
  const count = mockMyProperties.length

  return (
    <div className="max-w-4xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-playfair text-foreground">Mis Propiedades</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {count} {count === 1 ? 'propiedad publicada' : 'propiedades publicadas'}
          </p>
        </div>
        <Button variant="golden" size="sm" asChild>
          <Link href="/dashboard/new-property">
            <Plus className="h-4 w-4" />
            Nueva propiedad
          </Link>
        </Button>
      </div>

      {/* List */}
      {count === 0 ? (
        <div className="rounded-2xl bg-surface-container-lowest border border-border/40 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-surface-container mx-auto flex items-center justify-center">
            <Home className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground font-playfair">Todavía no tenés propiedades</p>
            <p className="text-sm text-muted-foreground mt-1">Publicá tu primera propiedad y empezá a recibir consultas</p>
          </div>
          <Button variant="golden" size="sm" asChild>
            <Link href="/dashboard/new-property"><Plus className="h-4 w-4" /> Publicar propiedad</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {mockMyProperties.map((property, idx) => {
            const status = STATUS_BADGE[property.status] ?? STATUS_BADGE.available
            const img = property.images[0]
            return (
              <div key={property.id}>
                <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-surface-container">
                    {img?.url && (
                      <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="144px" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="min-w-0">
                        <h3 className="font-semibold font-playfair text-foreground truncate">{property.title}</h3>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {property.location.municipality}, {property.location.province}
                        </p>
                      </div>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{property.bedrooms} hab.</span>
                      <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{property.bathrooms} baños</span>
                      <span className="flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" />{property.area} m²</span>
                      <span className="font-semibold text-sol">{formatPrice(property.price, property.currency)}/noche</span>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5" asChild>
                        <Link href={`/property/${property.id}`}><Eye className="h-3.5 w-3.5" />Ver</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                        <Edit className="h-3.5 w-3.5" />Editar
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 text-destructive hover:bg-destructive/8 hover:border-destructive/30">
                        <Trash2 className="h-3.5 w-3.5" />Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
                {idx < mockMyProperties.length - 1 && <div className="h-px" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
