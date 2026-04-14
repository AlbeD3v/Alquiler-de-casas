"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/features/search/SearchBar";
import { SearchFilters, SearchFiltersState } from "@/components/features/search/SearchFilters";
import { PropertyCard } from "@/components/features/properties/PropertyCard";
import { Property } from "@/types/property.types";
import { motion } from "framer-motion";
import { Loader2, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - Will be replaced with MCP integration
const mockProperties: Property[] = [
  {
    id: "PROP-001",
    title: "Villa Colonial en La Habana Vieja",
    description: "Hermosa villa con vista al Malecón",
    price: 150,
    currency: "USD",
    propertyType: "villa",
    transactionType: "alquiler",
    location: { province: "La Habana", municipality: "La Habana Vieja", address: "Calle Obispo #123" },
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    area: 180,
    amenities: ["WiFi", "A/C", "Cocina", "Parking"],
    images: [{ id: "img-1", url: "/placeholder-property.jpg", alt: "Villa Colonial", isPrimary: true, order: 1 }],
    owner: { id: "user-1", name: "Carlos Pérez", email: "carlos@example.com", reputation: 4.8, totalProperties: 5, totalTransactions: 23, isVerified: true, role: "user", createdAt: new Date(), updatedAt: new Date() },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    isNew: true,
    isFeatured: true,
  },
  {
    id: "PROP-002",
    title: "Apartamento Moderno en Vedado",
    description: "Apartamento renovado con todas las comodidades",
    price: 85,
    currency: "USD",
    propertyType: "apartamento",
    transactionType: "alquiler",
    location: { province: "La Habana", municipality: "Plaza de la Revolución", address: "Calle 23 #456, Vedado" },
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    area: 95,
    amenities: ["WiFi", "A/C", "TV"],
    images: [{ id: "img-2", url: "/placeholder-property.jpg", alt: "Apartamento Moderno", isPrimary: true, order: 1 }],
    owner: { id: "user-2", name: "María Rodríguez", email: "maria@example.com", reputation: 4.5, totalProperties: 3, totalTransactions: 15, isVerified: true, role: "user", createdAt: new Date(), updatedAt: new Date() },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    isFeatured: true,
  },
  {
    id: "PROP-003",
    title: "Casa Particular en Trinidad",
    description: "Encantadora casa en el corazón de Trinidad",
    price: 60,
    currency: "USD",
    propertyType: "casa_particular",
    transactionType: "alquiler",
    location: { province: "Sancti Spíritus", municipality: "Trinidad", address: "Calle Trinidad #789" },
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    area: 120,
    amenities: ["WiFi", "Desayuno", "Terraza"],
    images: [{ id: "img-3", url: "/placeholder-property.jpg", alt: "Casa Particular", isPrimary: true, order: 1 }],
    owner: { id: "user-3", name: "José Martínez", email: "jose@example.com", reputation: 4.9, totalProperties: 8, totalTransactions: 45, isVerified: true, role: "user", createdAt: new Date(), updatedAt: new Date() },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    isNew: true,
  },
  {
    id: "PROP-004",
    title: "Villa Frente al Mar en Varadero",
    description: "Espectacular villa con acceso directo a la playa",
    price: 250,
    currency: "USD",
    propertyType: "villa",
    transactionType: "alquiler",
    location: { province: "Matanzas", municipality: "Varadero", address: "Sector Norte, Varadero" },
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    area: 250,
    amenities: ["WiFi", "A/C", "Piscina", "Playa", "Parking"],
    images: [{ id: "img-4", url: "/placeholder-property.jpg", alt: "Villa Varadero", isPrimary: true, order: 1 }],
    owner: { id: "user-4", name: "Ana García", email: "ana@example.com", reputation: 5.0, totalProperties: 12, totalTransactions: 67, isVerified: true, role: "user", createdAt: new Date(), updatedAt: new Date() },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    isFeatured: true,
  },
  {
    id: "PROP-005",
    title: "Penthouse en Miramar",
    description: "Espectacular penthouse con terraza panorámica",
    price: 200,
    currency: "USD",
    propertyType: "apartamento",
    transactionType: "alquiler",
    location: { province: "La Habana", municipality: "Playa", address: "5ta Avenida #100, Miramar" },
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    area: 150,
    amenities: ["WiFi", "A/C", "Terraza", "Parking", "Vista al mar"],
    images: [{ id: "img-5", url: "/placeholder-property.jpg", alt: "Penthouse", isPrimary: true, order: 1 }],
    owner: { id: "user-5", name: "Roberto Sánchez", email: "roberto@example.com", reputation: 4.7, totalProperties: 6, totalTransactions: 34, isVerified: true, role: "user", createdAt: new Date(), updatedAt: new Date() },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    isNew: true,
  },
  {
    id: "PROP-006",
    title: "Casona en Viñales",
    description: "Tranquila casona rodeada de naturaleza",
    price: 75,
    currency: "USD",
    propertyType: "casa_particular",
    transactionType: "alquiler",
    location: { province: "Pinar del Río", municipality: "Viñales", address: "Calle Principal #45" },
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    area: 140,
    amenities: ["WiFi", "Desayuno", "Jardín", "Parking"],
    images: [{ id: "img-6", url: "/placeholder-property.jpg", alt: "Casona Viñales", isPrimary: true, order: 1 }],
    owner: { id: "user-6", name: "Laura Fernández", email: "laura@example.com", reputation: 4.6, totalProperties: 4, totalTransactions: 28, isVerified: true, role: "user", createdAt: new Date(), updatedAt: new Date() },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function SearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: SearchFiltersState) => {
    let filtered = [...properties];

    if (filters.transactionType) {
      filtered = filtered.filter((p) => p.transactionType === filters.transactionType);
    }

    if (filters.location) {
      filtered = filtered.filter((p) => p.location.province === filters.location);
    }

    if (filters.municipality) {
      filtered = filtered.filter((p) => p.location.municipality === filters.municipality);
    }

    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!);
    }

    if (filters.bathrooms) {
      filtered = filtered.filter((p) => p.bathrooms >= filters.bathrooms!);
    }

    if (filters.minArea) {
      filtered = filtered.filter((p) => p.area >= filters.minArea!);
    }

    if (filters.maxArea) {
      filtered = filtered.filter((p) => p.area <= filters.maxArea!);
    }

    setFilteredProperties(filtered);
  };

  const handleResetFilters = () => {
    setFilteredProperties(properties);
  };

  const handleSearch = (query: string, location: string) => {
    let filtered = [...properties];

    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.description.toLowerCase().includes(searchQuery) ||
          p.amenities.some((a) => a.toLowerCase().includes(searchQuery))
      );
    }

    if (location) {
      filtered = filtered.filter((p) => p.location.province === location);
    }

    setFilteredProperties(filtered);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <SearchBar
          onSearch={handleSearch}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className={`w-80 flex-shrink-0 ${showFilters ? "block" : "hidden md:block"}`}>
              <SearchFilters onFilterChange={handleFilterChange} onReset={handleResetFilters} />
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredProperties.length}</span>{" "}
                  {filteredProperties.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <Loader2 className="h-12 w-12 animate-spin text-sol" />
                </div>
              ) : filteredProperties.length === 0 ? (
                /* Empty State */
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">
                    No se encontraron propiedades con esos filtros
                  </p>
                  <Button variant="golden" className="mt-4" onClick={handleResetFilters}>
                    Limpiar Filtros
                  </Button>
                </div>
              ) : (
                /* Properties Grid */
                <motion.div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                  layout
                >
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      layout
                    >
                      <PropertyCard property={property} />
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
  );
}
