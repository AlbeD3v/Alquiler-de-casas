'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Property } from '@/types/property.types'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/config/currencies'
import { useFavorites } from '@/hooks/useFavorites'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bed, Bath, MapPin, Maximize2, Heart, Share2, Calendar, Users,
  CheckCircle2, Star, MessageCircle, Phone, ChevronLeft, ChevronRight,
  Minus, Plus, ShieldCheck, Award, Grid2X2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyDetailProps {
  property: Property
}

const TRANSACTION_LABEL: Record<string, string> = {
  alquiler: 'Alquiler',
  venta: 'Venta',
  compra: 'Compra',
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFavorited = isFavorite(property.id)

  const images = property.images.length > 0 ? property.images : [
    { id: 'f1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', alt: `${property.title} - Vista principal`, isPrimary: true, order: 1 },
    { id: 'f2', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', alt: `${property.title} - Sala`, isPrimary: false, order: 2 },
    { id: 'f3', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', alt: `${property.title} - Habitación`, isPrimary: false, order: 3 },
    { id: 'f4', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', alt: `${property.title} - Exterior`, isPrimary: false, order: 4 },
    { id: 'f5', url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', alt: `${property.title} - Jardín`, isPrimary: false, order: 5 },
  ]

  const prevImage = () => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length)
  const nextImage = () => setCurrentImageIndex((p) => (p + 1) % images.length)

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    const n = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return n > 0 ? n : 0
  }

  const nights = calculateNights()
  const subtotal = nights * property.price
  const serviceFee = subtotal * 0.1
  const total = subtotal + serviceFee

  const today = new Date().toISOString().split('T')[0]
  const isAlquiler = property.transactionType === 'alquiler'

  return (
    <div className="space-y-8">

      {/* ── Gallery ── */}
      <div>
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[480px] rounded-2xl overflow-hidden">
          {/* Hero image */}
          <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setCurrentImageIndex(0)}>
            <Image src={images[0]?.url} alt={images[0]?.alt} fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-noche/0 group-hover:bg-noche/10 transition-colors" />
          </div>
          {/* 4 thumbnails */}
          {images.slice(1, 5).map((img, i) => (
            <div
              key={img.id}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => setCurrentImageIndex(i + 1)}
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="25vw" />
              {/* "Ver todas" overlay on last visible thumb */}
              {i === 3 && images.length > 5 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowAllImages(true) }}
                  className="absolute inset-0 bg-noche/50 flex flex-col items-center justify-center text-arena gap-1"
                >
                  <Grid2X2 className="h-6 w-6" />
                  <span className="text-sm font-semibold">Ver todas</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative h-72 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image src={images[currentImageIndex]?.url} alt={images[currentImageIndex]?.alt} fill className="object-cover" sizes="100vw" />
            </motion.div>
          </AnimatePresence>
          <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow transition-opacity">
            <ChevronLeft className="h-5 w-5 text-noche" />
          </button>
          <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow transition-opacity">
            <ChevronRight className="h-5 w-5 text-noche" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrentImageIndex(i)}
                className={cn('h-1.5 rounded-full transition-all', i === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50')}
              />
            ))}
          </div>
        </div>

        {/* Action buttons floating */}
        <div className="flex gap-2 justify-end mt-3">
          <button
            onClick={() => toggleFavorite(property.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
              isFavorited
                ? 'bg-coral/10 border-coral/30 text-coral'
                : 'bg-background border-border text-muted-foreground hover:border-sol/40'
            )}
          >
            <Heart className={cn('h-3.5 w-3.5', isFavorited && 'fill-coral')} />
            {isFavorited ? 'Guardado' : 'Guardar'}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground hover:border-sol/40 bg-background transition-all">
            <Share2 className="h-3.5 w-3.5" />
            Compartir
          </button>
        </div>
      </div>

      {/* ── Layout principal ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* ── Columna principal ── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="bg-noche/8 text-foreground border-border/60">
                {TRANSACTION_LABEL[property.transactionType]}
              </Badge>
              {property.isNew && <Badge variant="nuevo">Nuevo</Badge>}
              {property.isFeatured && (
                <Badge variant="premium">
                  <Star className="h-3 w-3" /> Destacado
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-foreground leading-tight mb-2">
              {property.title}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-sol shrink-0" />
              {property.location.address}, {property.location.municipality}, {property.location.province}
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Bed, label: `${property.bedrooms} ${property.bedrooms === 1 ? 'habitación' : 'habitaciones'}` },
              { icon: Bath, label: `${property.bathrooms} ${property.bathrooms === 1 ? 'baño' : 'baños'}` },
              { icon: Maximize2, label: `${property.area} m²` },
              { icon: Users, label: `Hasta ${property.maxGuests} huéspedes` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container text-sm">
                <Icon className="h-4 w-4 text-sol" />
                <span className="text-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold font-playfair text-foreground">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold font-playfair text-foreground">Lo que incluye</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2.5 py-1.5">
                  <CheckCircle2 className="h-4 w-4 text-sol shrink-0" />
                  <span className="text-sm text-foreground">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Owner card */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold font-playfair text-foreground">Propietario</h2>
            <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-5">
              <div className="flex items-start gap-4">
                <Avatar
                  size="lg"
                  fallback={property.owner.name}
                  verified={property.owner.isVerified}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground font-playfair">{property.owner.name}</h3>
                    {property.owner.isVerified && (
                      <span className="flex items-center gap-1 text-xs text-sol font-medium">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verificado
                      </span>
                    )}
                    {property.owner.verificationBadge === 'gold' && (
                      <span className="flex items-center gap-1 text-xs text-oro font-medium">
                        <Award className="h-3.5 w-3.5" /> Gold
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-sol fill-sol" />
                      {property.owner.reputation}
                    </span>
                    <span className="w-px h-3 bg-border" />
                    <span>{property.owner.totalTransactions} transacciones</span>
                    <span className="w-px h-3 bg-border" />
                    <span>{property.owner.totalProperties} propiedades</span>
                  </div>

                  {property.owner.bio && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {property.owner.bio}
                    </p>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex gap-2">
                <Button variant="golden" size="sm" className="flex-1">
                  <MessageCircle className="h-4 w-4" />
                  Enviar mensaje
                </Button>
                {property.owner.phone && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4" />
                    Llamar
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Location placeholder */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold font-playfair text-foreground">Ubicación</h2>
            <div className="rounded-2xl bg-surface-container border border-border/40 h-48 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <MapPin className="h-8 w-8 text-sol" />
              <div className="text-center">
                <p className="font-medium text-foreground text-sm">
                  {property.location.municipality}, {property.location.province}
                </p>
                {property.location.address && (
                  <p className="text-xs mt-0.5">{property.location.address}</p>
                )}
                {property.location.coordinates && (
                  <p className="text-[10px] mt-1 font-mono text-muted-foreground/60">
                    {property.location.coordinates.lat.toFixed(4)}, {property.location.coordinates.lng.toFixed(4)}
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground/50">Mapa próximamente</p>
            </div>
          </div>
        </div>

        {/* ── Booking card ── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card-hover)] p-6 space-y-5">

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground font-playfair">
                  {formatPrice(property.price, property.currency)}
                </span>
                {isAlquiler && (
                  <span className="text-sm text-muted-foreground font-normal">/ noche</span>
                )}
              </div>
              {property.owner.reputation > 0 && (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-sol fill-sol" />
                  <span className="font-medium text-foreground">{property.owner.reputation}</span>
                  <span>·</span>
                  <span>{property.owner.totalTransactions} reseñas</span>
                </div>
              )}
            </div>

            <Separator />

            {isAlquiler ? (
              <>
                {/* Dates grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Check-in
                    </label>
                    <Input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={today}
                      className="h-10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Check-out
                    </label>
                    <Input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || today}
                      className="h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Guests stepper */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Huéspedes
                  </label>
                  <div className="flex items-center justify-between border border-input rounded-lg px-3 h-10">
                    <button
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      className="p-1 rounded-md hover:bg-muted transition-colors disabled:opacity-30"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-medium">
                      {guests} {guests === 1 ? 'huésped' : 'huéspedes'}
                    </span>
                    <button
                      onClick={() => setGuests((g) => Math.min(property.maxGuests, g + 1))}
                      disabled={guests >= property.maxGuests}
                      className="p-1 rounded-md hover:bg-muted transition-colors disabled:opacity-30"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price breakdown */}
                <AnimatePresence>
                  {nights > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <Separator />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatPrice(property.price, property.currency)} × {nights} {nights === 1 ? 'noche' : 'noches'}</span>
                        <span>{formatPrice(subtotal, property.currency)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Tarifa de servicio</span>
                        <span>{formatPrice(serviceFee, property.currency)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>{formatPrice(total, property.currency)}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button variant="golden" size="lg" className="w-full">
                  <Calendar className="h-4 w-4" />
                  {nights > 0 ? 'Confirmar reserva' : 'Seleccioná fechas'}
                </Button>
              </>
            ) : (
              <>
                {/* Venta / Compra */}
                <div className="rounded-xl bg-surface-container p-3 text-sm text-muted-foreground text-center">
                  Precio de {property.transactionType === 'venta' ? 'venta' : 'compra'} negociable. Contactá al propietario para más información.
                </div>
                <Button variant="golden" size="lg" className="w-full">
                  <Calendar className="h-4 w-4" />
                  Solicitar visita
                </Button>
              </>
            )}

            <Button variant="outline" size="sm" className="w-full">
              <MessageCircle className="h-4 w-4" />
              Contactar propietario
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              No se realizan cobros hasta confirmar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
