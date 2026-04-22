'use client'

import { useEffect, useState } from 'react'
import { PropertyCard } from '@/components/features/properties/PropertyCard'
import { PropertyCardSkeletonGrid } from '@/components/features/properties/PropertyCardSkeleton'
import { Property } from '@/types/property.types'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const mockProperties: Property[] = [
  {
    id: 'PROP-001',
    title: 'Villa Colonial en La Habana Vieja',
    description: 'Hermosa villa restaurada con vista al Malecón, techos altos y patio colonial.',
    price: 150,
    currency: 'USD',
    propertyType: 'villa',
    transactionType: 'alquiler',
    location: { province: 'La Habana', municipality: 'La Habana Vieja', address: 'Calle Obispo #123' },
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    area: 180,
    amenities: ['WiFi', 'A/C', 'Cocina', 'Parking'],
    images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=75', alt: 'Villa Colonial La Habana', isPrimary: true, order: 1 }],
    owner: { id: 'user-1', name: 'Carlos Pérez', email: 'carlos@example.com', reputation: 4.8, totalProperties: 5, totalTransactions: 23, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'PROP-002',
    title: 'Penthouse con Vista al Mar',
    description: 'Apartamento de lujo en el Vedado con terraza privada y panorama del Caribe.',
    price: 220,
    currency: 'USD',
    propertyType: 'apartamento',
    transactionType: 'alquiler',
    location: { province: 'La Habana', municipality: 'Plaza de la Revolución', address: 'Calle 23 #456, Vedado' },
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    area: 130,
    amenities: ['WiFi', 'A/C', 'Terraza', 'Gimnasio'],
    images: [{ id: 'img-2', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75', alt: 'Penthouse Vedado', isPrimary: true, order: 1 }],
    owner: { id: 'user-2', name: 'María Rodríguez', email: 'maria@example.com', reputation: 4.9, totalProperties: 3, totalTransactions: 15, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
    isFeatured: true,
  },
  {
    id: 'PROP-003',
    title: 'Casa Patrimonial en Trinidad',
    description: 'Joya colonial en el corazón de Trinidad, a pasos de la Plaza Mayor.',
    price: 75,
    currency: 'USD',
    propertyType: 'casa_particular',
    transactionType: 'alquiler',
    location: { province: 'Sancti Spíritus', municipality: 'Trinidad', address: 'Calle Trinidad #789' },
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    area: 120,
    amenities: ['WiFi', 'Desayuno', 'Terraza', 'A/C'],
    images: [{ id: 'img-3', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75', alt: 'Casa Trinidad', isPrimary: true, order: 1 }],
    owner: { id: 'user-3', name: 'José Martínez', email: 'jose@example.com', reputation: 5.0, totalProperties: 8, totalTransactions: 45, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
    isNew: true,
  },
  {
    id: 'PROP-004',
    title: 'Villa Frente al Mar en Varadero',
    description: 'Acceso directo a la playa con piscina privada y jardines tropicales.',
    price: 280,
    currency: 'USD',
    propertyType: 'villa',
    transactionType: 'alquiler',
    location: { province: 'Matanzas', municipality: 'Varadero', address: 'Sector Norte, Varadero' },
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    area: 280,
    amenities: ['WiFi', 'A/C', 'Piscina', 'Playa', 'Parking', 'BBQ'],
    images: [{ id: 'img-4', url: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&q=75', alt: 'Villa Varadero', isPrimary: true, order: 1 }],
    owner: { id: 'user-4', name: 'Ana García', email: 'ana@example.com', reputation: 5.0, totalProperties: 12, totalTransactions: 67, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
    isFeatured: true,
  },
  {
    id: 'PROP-005',
    title: 'Finca en Viñales',
    description: 'Rodeada de mogotes y cultivos de tabaco, con caballos y naturaleza pura.',
    price: 55,
    currency: 'USD',
    propertyType: 'casa_particular',
    transactionType: 'alquiler',
    location: { province: 'Pinar del Río', municipality: 'Viñales', address: 'Km 3, Carretera Viñales' },
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    area: 200,
    amenities: ['WiFi', 'Desayuno', 'Caballos', 'Naturaleza'],
    images: [{ id: 'img-5', url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=75', alt: 'Finca Viñales', isPrimary: true, order: 1 }],
    owner: { id: 'user-5', name: 'Pedro Alvarez', email: 'pedro@example.com', reputation: 4.7, totalProperties: 2, totalTransactions: 18, isVerified: false, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
    isNew: true,
  },
  {
    id: 'PROP-006',
    title: 'Residencia Histórica en Camagüey',
    description: 'Espectacular propiedad de techos altos, amplios patios y detalles originales preservados.',
    price: 90,
    currency: 'USD',
    propertyType: 'casa_particular',
    transactionType: 'venta',
    location: { province: 'Camagüey', municipality: 'Camagüey', address: 'Calle Martí #45' },
    bedrooms: 5,
    bathrooms: 3,
    maxGuests: 10,
    area: 320,
    amenities: ['Patio', 'Garaje', 'Cocina amplia'],
    images: [{ id: 'img-6', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75', alt: 'Residencia Camagüey', isPrimary: true, order: 1 }],
    owner: { id: 'user-6', name: 'Rosa Jiménez', email: 'rosa@example.com', reputation: 4.6, totalProperties: 1, totalTransactions: 5, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() },
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date(),
    isFeatured: true,
  },
]

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProperties(mockProperties)
      setIsLoading(false)
    }, 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-semibold text-sol tracking-widest uppercase mb-2">
              Selección Curada
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Propiedades <span className="italic text-sol">Destacadas</span>
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild className="shrink-0">
            <Link href="/search">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <PropertyCardSkeletonGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button variant="golden" size="lg" asChild>
              <Link href="/search">
                Explorar todas las propiedades
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
