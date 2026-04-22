'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PropertyDetail } from '@/components/features/properties/PropertyDetail'
import { Property } from '@/types/property.types'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const mockProperty: Property = {
  id: 'PROP-001',
  title: 'Villa Colonial en La Habana Vieja',
  description:
    'Hermosa villa colonial completamente renovada con vista al Malecón habanero. Esta propiedad combina la arquitectura clásica cubana con todas las comodidades modernas. Cuenta con amplias habitaciones, techos altos con vigas de madera originales, y una terraza con vistas panorámicas al mar. Ubicada en el corazón de La Habana Vieja, a pocos pasos de museos, restaurantes y la vida nocturna habanera.',
  price: 150,
  currency: 'USD',
  propertyType: 'villa',
  transactionType: 'alquiler',
  location: {
    province: 'La Habana',
    municipality: 'La Habana Vieja',
    address: 'Calle Obispo #123',
    coordinates: { lat: 23.1352, lng: -82.3587 },
  },
  bedrooms: 3,
  bathrooms: 2,
  maxGuests: 6,
  area: 180,
  amenities: [
    'WiFi de alta velocidad',
    'Aire acondicionado',
    'Cocina completamente equipada',
    'Parking privado',
    'Terraza con vista al mar',
    'Lavadora y secadora',
    'TV de pantalla plana',
    'Caja fuerte',
    'Desayuno incluido',
    'Servicio de limpieza',
  ],
  images: [
    { id: 'img-1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80', alt: 'Villa Colonial - Vista principal', isPrimary: true, order: 1 },
    { id: 'img-2', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', alt: 'Villa Colonial - Sala', isPrimary: false, order: 2 },
    { id: 'img-3', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', alt: 'Villa Colonial - Habitación', isPrimary: false, order: 3 },
    { id: 'img-4', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', alt: 'Villa Colonial - Exterior', isPrimary: false, order: 4 },
    { id: 'img-5', url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', alt: 'Villa Colonial - Jardín', isPrimary: false, order: 5 },
  ],
  owner: {
    id: 'user-1',
    name: 'Carlos Pérez',
    email: 'carlos@example.com',
    phone: '+53 7 123 4567',
    location: { province: 'La Habana', municipality: 'La Habana Vieja' },
    bio: 'Propietario con más de 10 años de experiencia en alquiler de propiedades en La Habana Vieja. Superhost verificado con 98% de reseñas positivas.',
    reputation: 4.8,
    totalProperties: 5,
    totalTransactions: 23,
    isVerified: true,
    verificationBadge: 'gold',
    role: 'user',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date(),
  },
  status: 'available',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
  isNew: true,
  isFeatured: true,
}

function PropertyDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Gallery skeleton */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[480px] rounded-2xl overflow-hidden">
        <div className="col-span-2 row-span-2 bg-surface-container-high rounded-l-2xl" />
        {[0, 1, 2, 3].map((i) => <div key={i} className="bg-surface-container" />)}
      </div>
      <div className="md:hidden h-72 rounded-2xl bg-surface-container-high" />

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-surface-container-high" />
              <div className="h-6 w-20 rounded-full bg-surface-container-high" />
            </div>
            <div className="h-10 w-3/4 rounded-lg bg-surface-container-high" />
            <div className="h-4 w-1/2 rounded bg-surface-container" />
          </div>
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((i) => <div key={i} className="h-10 w-32 rounded-xl bg-surface-container" />)}
          </div>
          <div className="h-px bg-border" />
          <div className="space-y-2">
            <div className="h-6 w-32 rounded bg-surface-container-high" />
            <div className="h-4 w-full rounded bg-surface-container" />
            <div className="h-4 w-5/6 rounded bg-surface-container" />
            <div className="h-4 w-4/6 rounded bg-surface-container" />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-surface-container-lowest border border-border/40 p-6 space-y-4">
            <div className="h-10 w-36 rounded-lg bg-surface-container-high" />
            <div className="h-px bg-border" />
            <div className="h-10 w-full rounded-lg bg-surface-container" />
            <div className="h-10 w-full rounded-lg bg-surface-container" />
            <div className="h-12 w-full rounded-xl bg-surface-container-high" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProperty(mockProperty)
      setIsLoading(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [params.id])

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-surface-container-low">
          <div className="container mx-auto px-4 py-8">
            <div className="h-8 w-20 rounded-lg bg-surface-container-high animate-pulse mb-6" />
            <PropertyDetailSkeleton />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!property) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-surface-container-low">
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-md mx-auto text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-surface-container mx-auto flex items-center justify-center">
                <Home className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-playfair text-foreground mb-2">
                  Propiedad no encontrada
                </h1>
                <p className="text-muted-foreground text-sm">
                  Esta propiedad no existe o fue removida. Explorá otras opciones disponibles.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4" /> Volver
                </Button>
                <Button variant="golden" size="sm" asChild>
                  <Link href="/search">Explorar propiedades</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-low">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb / Back */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-sol transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/search" className="hover:text-sol transition-colors">Propiedades</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1 max-w-[200px]">{property.title}</span>
          </div>

          <PropertyDetail property={property} />
        </div>
      </main>
      <Footer />
    </>
  )
}
