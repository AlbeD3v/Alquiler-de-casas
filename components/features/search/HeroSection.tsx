'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, ChevronDown, Home, Building2, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { PROVINCIAS } from '@/config/cuba-locations'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type TransactionTab = 'alquiler' | 'venta' | 'compra'

interface SearchParams {
  location: string
  propertyType: string
  transaction: TransactionTab
}

const TABS: { id: TransactionTab; label: string }[] = [
  { id: 'alquiler', label: 'Alquilar' },
  { id: 'venta', label: 'Vender' },
  { id: 'compra', label: 'Comprar' },
]

const PROPERTY_TYPES = [
  { value: '', label: 'Cualquier tipo' },
  { value: 'casa_particular', label: 'Casa Particular' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'villa', label: 'Villa' },
  { value: 'habitacion', label: 'Habitación' },
]

const STATS = [
  { value: '500+', label: 'Propiedades' },
  { value: '15', label: 'Provincias' },
  { value: '1,200+', label: 'Familias felices' },
]

export function HeroSection() {
  const [params, setParams] = useState<SearchParams>({
    location: '',
    propertyType: '',
    transaction: 'alquiler',
  })

  const searchUrl = `/search?${new URLSearchParams({
    ...(params.location && { location: params.location }),
    ...(params.propertyType && { type: params.propertyType }),
    transaction: params.transaction,
  }).toString()}`

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-noche">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1570655652364-2e0a67455ac6?w=1800&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-noche/95 via-noche/80 to-noche/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-noche/60 via-transparent to-transparent" />

      {/* Decorative grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-3xl space-y-8">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="premium" className="text-xs tracking-widest uppercase px-4 py-1.5">
              Red Inmobiliaria de Cuba
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-arena leading-[1.05] font-playfair">
              Encuentra tu{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sol via-oro to-sol bg-[length:200%] animate-[gradient_4s_ease_infinite]">
                hogar ideal
              </span>
              <br />en Cuba
            </h1>
            <p className="text-lg md:text-xl text-arena/70 max-w-xl leading-relaxed">
              Curaduría experta de propiedades únicas en las mejores ubicaciones de la isla.
            </p>
          </motion.div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.3)]"
          >
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setParams({ ...params, transaction: tab.id })}
                  className={cn(
                    'flex-1 py-3.5 text-sm font-semibold transition-all duration-200',
                    params.transaction === tab.id
                      ? 'bg-sol text-noche'
                      : 'text-arena/60 hover:text-arena hover:bg-white/5'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div className="p-4 flex flex-col sm:flex-row gap-3">
              {/* Location */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-arena/50 pointer-events-none" />
                <select
                  value={params.location}
                  onChange={(e) => setParams({ ...params, location: e.target.value })}
                  className="w-full h-12 rounded-xl bg-white/10 border border-white/15 pl-9 pr-3 text-sm text-arena appearance-none focus:outline-none focus:ring-2 focus:ring-sol/60 transition-all"
                >
                  <option value="" className="text-foreground bg-noche">¿Dónde buscas?</option>
                  {PROVINCIAS.map((p) => (
                    <option key={p} value={p} className="text-foreground bg-noche">{p}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-arena/50 pointer-events-none" />
              </div>

              {/* Property Type */}
              <div className="flex-1 relative">
                <select
                  value={params.propertyType}
                  onChange={(e) => setParams({ ...params, propertyType: e.target.value })}
                  className="w-full h-12 rounded-xl bg-white/10 border border-white/15 px-3 text-sm text-arena appearance-none focus:outline-none focus:ring-2 focus:ring-sol/60 transition-all"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t.value} value={t.value} className="text-foreground bg-noche">{t.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-arena/50 pointer-events-none" />
              </div>

              {/* Search CTA */}
              <Button variant="golden" size="lg" className="shrink-0 h-12 px-6 font-semibold" asChild>
                <Link href={searchUrl}>
                  <Search className="h-4 w-4" />
                  Buscar
                </Link>
              </Button>
            </div>

            {/* Quick links */}
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              {['La Habana', 'Varadero', 'Trinidad', 'Viñales', 'Santiago'].map((place) => (
                <Link
                  key={place}
                  href={`/search?location=${place}`}
                  className="text-xs text-arena/50 hover:text-sol transition-colors flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {place}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex gap-8"
          >
            {STATS.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-sol font-playfair">{stat.value}</p>
                <p className="text-xs text-arena/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-9 border border-arena/30 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 bg-sol rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
