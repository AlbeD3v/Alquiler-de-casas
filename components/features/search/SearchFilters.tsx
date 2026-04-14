"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROVINCIAS, MUNICIPIOS } from "@/config/cuba-locations";
import { Filter, X } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFiltersState) => void;
  onReset: () => void;
}

export interface SearchFiltersState {
  location?: string;
  municipality?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  transactionType?: string;
  minArea?: number;
  maxArea?: number;
}

export function SearchFilters({ onFilterChange, onReset }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersState>({});
  const [showFilters, setShowFilters] = useState(true);

  const handleFilterChange = (key: keyof SearchFiltersState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  const municipios = filters.location ? MUNICIPIOS[filters.location] || [] : [];

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5 text-sol" />
            Filtros
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent className="space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Operación</label>
            <div className="grid grid-cols-3 gap-2">
              {["alquiler", "venta", "compra"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange("transactionType", type)}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-all ${
                    filters.transactionType === type
                      ? "bg-sol text-noche"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Provincia</label>
            <select
              value={filters.location || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
            >
              <option value="">Todas las provincias</option>
              {PROVINCIAS.map((provincia) => (
                <option key={provincia} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </div>

          {/* Municipality */}
          {municipios.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Municipio</label>
              <select
                value={filters.municipality || ""}
                onChange={(e) => handleFilterChange("municipality", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
              >
                <option value="">Todos los municipios</option>
                {municipios.map((municipio) => (
                  <option key={municipio} value={municipio}>
                    {municipio}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Propiedad</label>
            <select
              value={filters.propertyType || ""}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
            >
              <option value="">Todos los tipos</option>
              <option value="casa_particular">Casa Particular</option>
              <option value="apartamento">Apartamento</option>
              <option value="villa">Villa</option>
              <option value="habitacion">Habitación</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Rango de Precio</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                className="h-10"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                className="h-10"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium mb-2">Habitaciones</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleFilterChange("bedrooms", num)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    filters.bedrooms === num
                      ? "bg-sol text-noche"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {num}+
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium mb-2">Baños</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => handleFilterChange("bathrooms", num)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    filters.bathrooms === num
                      ? "bg-sol text-noche"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {num}+
                </button>
              ))}
            </div>
          </div>

          {/* Area Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Área (m²)</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min m²"
                value={filters.minArea || ""}
                onChange={(e) => handleFilterChange("minArea", Number(e.target.value))}
                className="h-10"
              />
              <Input
                type="number"
                placeholder="Max m²"
                value={filters.maxArea || ""}
                onChange={(e) => handleFilterChange("maxArea", Number(e.target.value))}
                className="h-10"
              />
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleReset}
          >
            Limpiar Filtros
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
