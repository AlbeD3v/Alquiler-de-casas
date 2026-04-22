'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const locations = [
  {
    name: 'La Habana',
    tagline: 'La capital colonial del Caribe',
    description: 'Arquitectura barroca, Malecón interminable y el pulso de toda Cuba.',
    properties: 150,
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&q=80',
    featured: true,
  },
  {
    name: 'Varadero',
    tagline: 'La playa más larga de Cuba',
    description: 'Arena blanca, aguas turquesas y villas frente al mar.',
    properties: 85,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
  {
    name: 'Trinidad',
    tagline: 'Ciudad Patrimonio de la Humanidad',
    description: 'Calles empedradas, casas coloniales y Sierra del Escambray.',
    properties: 65,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    name: 'Viñales',
    tagline: 'El Valle del tabaco cubano',
    description: 'Mogotes, tabaco y la paz del campo más hermoso de la isla.',
    properties: 45,
    image: 'https://images.unsplash.com/photo-1599413987323-b2b8e69a8b35?w=600&q=80',
  },
  {
    name: 'Santiago de Cuba',
    tagline: 'Cuna de la salsa y el son',
    description: 'Historia, música y la segunda ciudad más importante de Cuba.',
    properties: 38,
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&q=80',
  },
]

function LocationCard({
  location,
  index,
  className,
}: {
  location: (typeof locations)[0]
  index: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn('group relative overflow-hidden rounded-2xl cursor-pointer', className)}
    >
      <Link href={`/search?location=${encodeURIComponent(location.name)}`} className="block h-full">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${location.image})` }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-noche/90 via-noche/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-noche/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative h-full p-5 flex flex-col justify-end gap-1">
          <div className="flex items-center gap-1.5 text-arena/60 text-xs mb-1">
            <MapPin className="h-3 w-3 text-sol" />
            <span>{location.properties} propiedades</span>
          </div>
          <h3 className="text-xl font-bold text-arena font-playfair leading-tight">
            {location.name}
          </h3>
          <p className="text-xs text-arena/70 line-clamp-2">{location.description}</p>

          {/* Arrow badge */}
          <div className="mt-2 flex items-center gap-1 text-xs text-sol font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
            Explorar <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function PopularLocations() {
  const [featured, ...rest] = locations

  return (
    <section className="py-24 bg-surface-container-low">
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
              Destinos
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              El alma de Cuba,<br />
              <span className="italic text-sol">lugar por lugar</span>
            </h2>
          </div>
          <Link
            href="/search"
            className="text-sm font-medium text-muted-foreground hover:text-sol transition-colors flex items-center gap-1 shrink-0"
          >
            Ver todos los destinos <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ gridTemplateRows: 'auto auto' }}>
          {/* Featured card — 2 columns, 2 rows */}
          <LocationCard
            location={featured}
            index={0}
            className="col-span-2 row-span-2 h-[480px]"
          />
          {/* 4 smaller cards */}
          {rest.map((loc, i) => (
            <LocationCard key={loc.name} location={loc} index={i + 1} className="h-[228px]" />
          ))}
        </div>
      </div>
    </section>
  )
}
