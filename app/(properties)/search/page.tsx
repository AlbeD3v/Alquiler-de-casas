'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SearchBar } from '@/components/features/search/SearchBar'
import { SearchFilters, SearchFiltersState } from '@/components/features/search/SearchFilters'
import { PropertyCard } from '@/components/features/properties/PropertyCard'
import { PropertyCardSkeletonGrid } from '@/components/features/properties/PropertyCardSkeleton'
import { Property } from '@/types/property.types'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid3X3, List, X, SearchX, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const mockProperties: Property[] = [
  { id: 'PROP-001', title: 'Villa Colonial en La Habana Vieja', description: 'Hermosa villa restaurada con vista al Malecón, techos altos y patio colonial privado.', price: 150, currency: 'USD', propertyType: 'villa', transactionType: 'alquiler', location: { province: 'La Habana', municipality: 'La Habana Vieja', address: 'Calle Obispo #123' }, bedrooms: 3, bathrooms: 2, maxGuests: 6, area: 180, amenities: ['WiFi', 'A/C', 'Cocina', 'Parking'], images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=75', alt: 'Villa Colonial', isPrimary: true, order: 1 }], owner: { id: 'user-1', name: 'Carlos Pérez', email: 'carlos@example.com', reputation: 4.8, totalProperties: 5, totalTransactions: 23, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-01-10'), updatedAt: new Date(), isNew: true, isFeatured: true },
  { id: 'PROP-002', title: 'Penthouse con Vista al Mar en Vedado', description: 'Apartamento de lujo en el Vedado con terraza privada y panorama del Caribe.', price: 220, currency: 'USD', propertyType: 'apartamento', transactionType: 'alquiler', location: { province: 'La Habana', municipality: 'Plaza de la Revolución', address: 'Calle 23 #456, Vedado' }, bedrooms: 2, bathrooms: 2, maxGuests: 4, area: 130, amenities: ['WiFi', 'A/C', 'Terraza', 'Gimnasio'], images: [{ id: 'img-2', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75', alt: 'Penthouse Vedado', isPrimary: true, order: 1 }], owner: { id: 'user-2', name: 'María Rodríguez', email: 'maria@example.com', reputation: 4.9, totalProperties: 3, totalTransactions: 15, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-02-15'), updatedAt: new Date(), isFeatured: true },
  { id: 'PROP-003', title: 'Casa Patrimonial en Trinidad', description: 'Joya colonial en el corazón de Trinidad, a pasos de la Plaza Mayor. Patio interior con jardín.', price: 75, currency: 'USD', propertyType: 'casa_particular', transactionType: 'alquiler', location: { province: 'Sancti Spíritus', municipality: 'Trinidad', address: 'Calle Trinidad #789' }, bedrooms: 2, bathrooms: 1, maxGuests: 4, area: 120, amenities: ['WiFi', 'Desayuno', 'Terraza', 'A/C'], images: [{ id: 'img-3', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=75', alt: 'Casa Trinidad', isPrimary: true, order: 1 }], owner: { id: 'user-3', name: 'José Martínez', email: 'jose@example.com', reputation: 5.0, totalProperties: 8, totalTransactions: 45, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-03-01'), updatedAt: new Date(), isNew: true },
  { id: 'PROP-004', title: 'Villa Frente al Mar en Varadero', description: 'Acceso directo a la playa con piscina privada, BBQ y jardines tropicales.', price: 280, currency: 'USD', propertyType: 'villa', transactionType: 'alquiler', location: { province: 'Matanzas', municipality: 'Varadero', address: 'Sector Norte, Varadero' }, bedrooms: 4, bathrooms: 3, maxGuests: 8, area: 280, amenities: ['WiFi', 'A/C', 'Piscina', 'Playa', 'Parking', 'BBQ'], images: [{ id: 'img-4', url: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&q=75', alt: 'Villa Varadero', isPrimary: true, order: 1 }], owner: { id: 'user-4', name: 'Ana García', email: 'ana@example.com', reputation: 5.0, totalProperties: 12, totalTransactions: 67, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-01-05'), updatedAt: new Date(), isFeatured: true },
  { id: 'PROP-005', title: 'Penthouse en Miramar', description: 'Espectacular penthouse con terraza panorámica en la zona diplomática de La Habana.', price: 200, currency: 'USD', propertyType: 'apartamento', transactionType: 'alquiler', location: { province: 'La Habana', municipality: 'Playa', address: '5ta Avenida #100, Miramar' }, bedrooms: 3, bathrooms: 2, maxGuests: 6, area: 150, amenities: ['WiFi', 'A/C', 'Terraza', 'Parking', 'Vista al mar'], images: [{ id: 'img-5', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=75', alt: 'Penthouse Miramar', isPrimary: true, order: 1 }], owner: { id: 'user-5', name: 'Roberto Sánchez', email: 'roberto@example.com', reputation: 4.7, totalProperties: 6, totalTransactions: 34, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-02-20'), updatedAt: new Date(), isNew: true },
  { id: 'PROP-006', title: 'Finca en Viñales', description: 'Rodeada de mogotes y cultivos de tabaco, con caballos y la paz del campo cubano.', price: 55, currency: 'USD', propertyType: 'casa_particular', transactionType: 'alquiler', location: { province: 'Pinar del Río', municipality: 'Viñales', address: 'Km 3, Carretera Viñales' }, bedrooms: 3, bathrooms: 2, maxGuests: 6, area: 200, amenities: ['WiFi', 'Desayuno', 'Caballos', 'Naturaleza'], images: [{ id: 'img-6', url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=75', alt: 'Finca Viñales', isPrimary: true, order: 1 }], owner: { id: 'user-6', name: 'Laura Fernández', email: 'laura@example.com', reputation: 4.6, totalProperties: 4, totalTransactions: 28, isVerified: false, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-03-10'), updatedAt: new Date() },
  { id: 'PROP-007', title: 'Residencia Histórica en Camagüey', description: 'Techos altos, patios interiores y detalles coloniales originales en el centro histórico.', price: 90, currency: 'USD', propertyType: 'casa_particular', transactionType: 'venta', location: { province: 'Camagüey', municipality: 'Camagüey', address: 'Calle Martí #45' }, bedrooms: 5, bathrooms: 3, maxGuests: 10, area: 320, amenities: ['Patio', 'Garaje', 'Cocina amplia'], images: [{ id: 'img-7', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75', alt: 'Residencia Camagüey', isPrimary: true, order: 1 }], owner: { id: 'user-7', name: 'Rosa Jiménez', email: 'rosa@example.com', reputation: 4.6, totalProperties: 1, totalTransactions: 5, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-01-20'), updatedAt: new Date(), isFeatured: true },
  { id: 'PROP-008', title: 'Habitación en Casa Particular — Santiago', description: 'Habitación privada con baño propio en el corazón de Santiago de Cuba, cerca de todo.', price: 25, currency: 'USD', propertyType: 'habitacion', transactionType: 'alquiler', location: { province: 'Santiago de Cuba', municipality: 'Santiago de Cuba', address: 'Calle Heredia #30' }, bedrooms: 1, bathrooms: 1, maxGuests: 2, area: 25, amenities: ['WiFi', 'A/C', 'Desayuno'], images: [{ id: 'img-8', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=75', alt: 'Habitación Santiago', isPrimary: true, order: 1 }], owner: { id: 'user-8', name: 'Mirta López', email: 'mirta@example.com', reputation: 4.9, totalProperties: 2, totalTransactions: 89, isVerified: true, role: 'user', createdAt: new Date(), updatedAt: new Date() }, status: 'available', createdAt: new Date('2024-02-01'), updatedAt: new Date(), isNew: true },
]

type SortKey = 'newest' | 'price_asc' | 'price_desc' | 'area'
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'area', label: 'Mayor superficie' },
]

function applySort(props: Property[], sort: SortKey): Property[] {
  return [...props].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    if (sort === 'area') return b.area - a.area
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

function applyFilters(props: Property[], filters: SearchFiltersState, query: string, location: string): Property[] {
  return props.filter((p) => {
    if (filters.transactionType && p.transactionType !== filters.transactionType) return false
    if (filters.location && p.location.province !== filters.location) return false
    if (filters.municipality && p.location.municipality !== filters.municipality) return false
    if (filters.propertyType && p.propertyType !== filters.propertyType) return false
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false
    if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false
    if (filters.bathrooms && p.bathrooms < filters.bathrooms) return false
    if (filters.minArea && p.area < filters.minArea) return false
    if (filters.maxArea && p.area > filters.maxArea) return false
    if (location && p.location.province !== location) return false
    if (query) {
      const q = query.toLowerCase()
      if (!p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.amenities.some((a) => a.toLowerCase().includes(q))) return false
    }
    return true
  })
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [allProperties] = useState<Property[]>(mockProperties)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(true)
  const [sort, setSort] = useState<SortKey>('newest')
  const [filters, setFilters] = useState<SearchFiltersState>({
    transactionType: searchParams.get('transaction') ?? undefined,
    location: searchParams.get('location') ?? undefined,
    propertyType: searchParams.get('type') ?? undefined,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') ?? '')

  const filtered = applySort(
    applyFilters(allProperties, filters, searchQuery, searchLocation),
    sort
  )

  const activeFiltersCount = Object.values(filters).filter((v) => v !== undefined && v !== '').length

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const handleSearch = useCallback((query: string, location: string) => {
    setSearchQuery(query)
    setSearchLocation(location)
  }, [])

  const handleFilterChange = useCallback((next: SearchFiltersState) => {
    setFilters(next)
  }, [])

  const handleReset = useCallback(() => {
    setFilters({})
    setSearchQuery('')
    setSearchLocation('')
  }, [])

  const removeFilter = (key: keyof SearchFiltersState) => {
    setFilters((prev) => ({ ...prev, [key]: undefined }))
  }

  const FILTER_LABELS: Partial<Record<keyof SearchFiltersState, string>> = {
    transactionType: 'Operación',
    location: 'Provincia',
    municipality: 'Municipio',
    propertyType: 'Tipo',
    minPrice: 'Precio mín',
    maxPrice: 'Precio máx',
    bedrooms: 'Habitaciones',
    bathrooms: 'Baños',
    minArea: 'Área mín',
    maxArea: 'Área máx',
  }

  const activeChips = Object.entries(filters).filter(([, v]) => v !== undefined && v !== '') as [keyof SearchFiltersState, string | number][]

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-low min-h-screen">
        <SearchBar
          onSearch={handleSearch}
          onToggleFilters={() => setShowFilters((prev) => !prev)}
          showFilters={showFilters}
          activeFiltersCount={activeFiltersCount}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6 items-start">

            {/* Sidebar */}
            <AnimatePresence initial={false}>
              {showFilters && (
                <motion.aside
                  key="filters"
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 288 }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 overflow-hidden"
                  style={{ width: 288 }}
                >
                  <SearchFilters
                    onFilterChange={handleFilterChange}
                    onReset={handleReset}
                    initialFilters={filters}
                  />
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Results */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* Active filter chips */}
              {activeChips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeChips.map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => removeFilter(key)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sol/10 text-sol border border-sol/20 hover:bg-coral/10 hover:text-coral hover:border-coral/20 transition-colors"
                    >
                      {FILTER_LABELS[key]}: {String(val)}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  <button
                    onClick={handleReset}
                    className="text-xs text-muted-foreground hover:text-coral transition-colors underline-offset-2 hover:underline"
                  >
                    Limpiar todo
                  </button>
                </div>
              )}

              {/* Results header */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <span className="inline-block w-24 h-4 bg-muted animate-pulse rounded" />
                  ) : (
                    <>
                      <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
                      {filtered.length === 1 ? 'propiedad' : 'propiedades'}
                    </>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortKey)}
                      className="h-8 rounded-lg border border-input bg-background pl-3 pr-7 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sol/50"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* View toggle */}
                  <div className="flex border border-input rounded-lg overflow-hidden">
                    {(['grid', 'list'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={cn(
                          'p-1.5 transition-colors',
                          viewMode === mode
                            ? 'bg-sol text-noche'
                            : 'bg-background text-muted-foreground hover:bg-muted'
                        )}
                      >
                        {mode === 'grid' ? <Grid3X3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              {isLoading ? (
                <PropertyCardSkeletonGrid count={6} columns={viewMode === 'grid' ? 3 : 1} />
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center">
                    <SearchX className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground font-playfair text-lg">Sin resultados</p>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                      No encontramos propiedades con esos criterios. Probá ampliando los filtros.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <X className="h-3.5 w-3.5" /> Limpiar filtros
                  </Button>
                </div>
              ) : (
                <motion.div
                  className={cn(
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                      : 'flex flex-col gap-4'
                  )}
                  layout
                >
                  {filtered.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      layout
                    >
                      <PropertyCard
                        property={property}
                        variant={viewMode === 'list' ? 'list' : 'card'}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  )
}
