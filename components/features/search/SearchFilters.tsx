'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { PROVINCIAS, MUNICIPIOS } from '@/config/cuba-locations'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchFiltersState {
  location?: string
  municipality?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  propertyType?: string
  transactionType?: string
  minArea?: number
  maxArea?: number
}

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFiltersState) => void
  onReset: () => void
  initialFilters?: SearchFiltersState
}

const TRANSACTION_TYPES = [
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'venta', label: 'Venta' },
  { value: 'compra', label: 'Compra' },
]

const PROPERTY_TYPES = [
  { value: 'casa_particular', label: 'Casa Particular' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'villa', label: 'Villa' },
  { value: 'habitacion', label: 'Habitación' },
]

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
      {children}
    </div>
  )
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150',
        active
          ? 'bg-sol text-noche border-sol shadow-sm'
          : 'bg-transparent text-muted-foreground border-border hover:border-sol/40 hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

export function SearchFilters({ onFilterChange, onReset, initialFilters = {} }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersState>(initialFilters)

  const update = (key: keyof SearchFiltersState, value: unknown) => {
    const next = { ...filters, [key]: value || undefined }
    setFilters(next)
    onFilterChange(next)
  }

  const toggle = (key: keyof SearchFiltersState, value: string | number) => {
    const next = {
      ...filters,
      [key]: filters[key] === value ? undefined : value,
    }
    setFilters(next)
    onFilterChange(next)
  }

  const handleReset = () => {
    setFilters({})
    onReset()
  }

  const activeCount = Object.values(filters).filter((v) => v !== undefined && v !== '').length
  const municipios = filters.location ? (MUNICIPIOS[filters.location] ?? []) : []

  return (
    <div className="sticky top-24 rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Filtros</span>
          {activeCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-sol text-noche text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-coral transition-colors flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Limpiar
          </button>
        )}
      </div>

      <Separator />

      {/* Transaction type */}
      <FilterSection title="Operación">
        <div className="flex flex-wrap gap-1.5">
          {TRANSACTION_TYPES.map(({ value, label }) => (
            <ToggleButton
              key={value}
              active={filters.transactionType === value}
              onClick={() => toggle('transactionType', value)}
            >
              {label}
            </ToggleButton>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Location */}
      <FilterSection title="Ubicación">
        <div className="relative">
          <select
            value={filters.location ?? ''}
            onChange={(e) => {
              update('location', e.target.value)
              update('municipality', undefined)
            }}
            className="w-full h-9 rounded-lg border border-input bg-background px-3 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sol/50 transition-all"
          >
            <option value="">Todas las provincias</option>
            {PROVINCIAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        </div>

        {municipios.length > 0 && (
          <div className="relative mt-2">
            <select
              value={filters.municipality ?? ''}
              onChange={(e) => update('municipality', e.target.value)}
              className="w-full h-9 rounded-lg border border-input bg-background px-3 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sol/50 transition-all"
            >
              <option value="">Todos los municipios</option>
              {municipios.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
        )}
      </FilterSection>

      <Separator />

      {/* Property type */}
      <FilterSection title="Tipo de propiedad">
        <div className="flex flex-wrap gap-1.5">
          {PROPERTY_TYPES.map(({ value, label }) => (
            <ToggleButton
              key={value}
              active={filters.propertyType === value}
              onClick={() => toggle('propertyType', value)}
            >
              {label}
            </ToggleButton>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Price */}
      <FilterSection title="Precio (USD / noche)">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Mín"
            value={filters.minPrice ?? ''}
            onChange={(e) => update('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="h-9 text-sm"
          />
          <Input
            type="number"
            placeholder="Máx"
            value={filters.maxPrice ?? ''}
            onChange={(e) => update('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            className="h-9 text-sm"
          />
        </div>
      </FilterSection>

      <Separator />

      {/* Bedrooms */}
      <FilterSection title="Habitaciones mín.">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <ToggleButton key={n} active={filters.bedrooms === n} onClick={() => toggle('bedrooms', n)}>
              {n}+
            </ToggleButton>
          ))}
        </div>
      </FilterSection>

      {/* Bathrooms */}
      <FilterSection title="Baños mín.">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((n) => (
            <ToggleButton key={n} active={filters.bathrooms === n} onClick={() => toggle('bathrooms', n)}>
              {n}+
            </ToggleButton>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Area */}
      <FilterSection title="Área (m²)">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Mín m²"
            value={filters.minArea ?? ''}
            onChange={(e) => update('minArea', e.target.value ? Number(e.target.value) : undefined)}
            className="h-9 text-sm"
          />
          <Input
            type="number"
            placeholder="Máx m²"
            value={filters.maxArea ?? ''}
            onChange={(e) => update('maxArea', e.target.value ? Number(e.target.value) : undefined)}
            className="h-9 text-sm"
          />
        </div>
      </FilterSection>

      {activeCount > 0 && (
        <Button variant="outline" size="sm" className="w-full" onClick={handleReset}>
          <X className="h-3.5 w-3.5" />
          Limpiar {activeCount} {activeCount === 1 ? 'filtro' : 'filtros'}
        </Button>
      )}
    </div>
  )
}
