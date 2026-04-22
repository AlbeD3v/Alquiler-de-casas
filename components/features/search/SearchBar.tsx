'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PROVINCIAS } from '@/config/cuba-locations'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onSearch: (query: string, location: string) => void
  onToggleFilters: () => void
  showFilters: boolean
  activeFiltersCount?: number
}

export function SearchBar({ onSearch, onToggleFilters, showFilters, activeFiltersCount = 0 }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = () => onSearch(query, location)

  const clearQuery = () => {
    setQuery('')
    onSearch('', location)
  }

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/40 py-3">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 items-center">

          {/* Filter toggle — visible on desktop too */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className={cn(
              'shrink-0 h-10 gap-2 relative',
              showFilters && 'border-sol text-sol bg-sol/5'
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-sol text-noche text-[9px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {/* Text search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Villa colonial, piscina, Miramar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-9 pr-8 h-10 text-sm"
            />
            {query && (
              <button
                onClick={clearQuery}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Province — hidden on mobile */}
          <div className="hidden sm:block w-44 relative">
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                onSearch(query, e.target.value)
              }}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sol/50 transition-all"
            >
              <option value="">Todas las provincias</option>
              {PROVINCIAS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <Button variant="golden" size="sm" onClick={handleSearch} className="shrink-0 h-10 px-4">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline ml-1.5">Buscar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
