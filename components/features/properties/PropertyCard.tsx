'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Property } from '@/types/property.types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Bed, Bath, MapPin, Heart, Star, Maximize2, ArrowRight } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { motion } from 'framer-motion'
import { formatPrice } from '@/config/currencies'

interface PropertyCardProps {
  property: Property
  onFavorite?: (id: string) => void
  className?: string
  variant?: 'card' | 'featured'
}

const TRANSACTION_LABEL: Record<string, string> = {
  alquiler: 'Alquiler',
  venta: 'Venta',
  compra: 'Compra',
}

export function PropertyCard({ property, onFavorite, className, variant = 'card' }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFavorited = isFavorite(property.id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleFavorite(property.id)
    onFavorite?.(property.id)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn('group', className)}
    >
      <Link
        href={`/property/${property.id}`}
        className="block rounded-2xl overflow-hidden bg-surface-container-lowest shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
      >
        {/* Image */}
        <div className={cn('relative overflow-hidden', variant === 'featured' ? 'h-72' : 'h-56')}>
          <Image
            src={property.images[0]?.url || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75'}
            alt={property.images[0]?.alt || property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-[var(--overlay-image)]" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {property.isNew && (
              <Badge variant="nuevo" className="shadow-sm">Nuevo</Badge>
            )}
            {property.isFeatured && (
              <Badge variant="premium" className="shadow-sm">
                <Star className="h-3 w-3" />
                Destacado
              </Badge>
            )}
            <Badge variant="secondary" className="bg-noche/70 text-arena border-0 backdrop-blur-sm">
              {TRANSACTION_LABEL[property.transactionType] ?? property.transactionType}
            </Badge>
          </div>

          {/* Favorite */}
          <button
            onClick={handleFavorite}
            aria-label={isFavorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                isFavorited ? 'fill-coral text-coral' : 'text-white'
              )}
            />
          </button>

          {/* Price chip */}
          <div className="absolute bottom-3 left-3">
            <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm">
              <p className="text-lg font-bold text-noche leading-none">
                {formatPrice(property.price, property.currency)}
              </p>
              {property.transactionType === 'alquiler' && (
                <p className="text-[10px] text-muted-foreground mt-0.5">/ noche</p>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Title & location */}
          <div>
            <h3 className="font-semibold text-foreground font-playfair line-clamp-1 group-hover:text-sol transition-colors">
              {property.title}
            </h3>
            <p className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 text-sol shrink-0" />
              {property.location.municipality}, {property.location.province}
            </p>
          </div>

          {/* Features row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-sol" />
              {property.bedrooms} hab.
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-sol" />
              {property.bathrooms} baños
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-sol" />
              {property.area} m²
            </span>
          </div>

          {/* Divider + owner */}
          <div className="pt-2 border-t border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                size="xs"
                fallback={property.owner.name}
                verified={property.owner.isVerified}
              />
              <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                {property.owner.name}
              </span>
            </div>
            <span className="text-xs font-medium text-sol flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
              Ver más <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
