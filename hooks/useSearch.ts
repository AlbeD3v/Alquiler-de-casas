"use client";

import { useState, useCallback } from "react";
import { Property, PropertyFilters } from "@/types/property.types";
import { SearchResult } from "@/types/search.types";

interface UseSearchReturn {
  results: SearchResult<Property> | null;
  isLoading: boolean;
  error: Error | null;
  search: (filters: PropertyFilters) => Promise<void>;
  reset: () => void;
}

// Mock properties for search
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
];

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchResult<Property> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (filters: PropertyFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual MCP search_properties call
      await new Promise((resolve) => setTimeout(resolve, 800));

      let filtered = [...mockProperties];

      if (filters.location) {
        filtered = filtered.filter((p) => p.location.province === filters.location);
      }

      if (filters.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
      }

      if (filters.bedrooms !== undefined) {
        filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!);
      }

      if (filters.propertyType) {
        filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
      }

      const result: SearchResult<Property> = {
        data: filtered,
        total: filtered.length,
        page: 1,
        limit: 20,
        totalPages: Math.ceil(filtered.length / 20),
        hasMore: false,
      };

      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Search failed"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    results,
    isLoading,
    error,
    search,
    reset,
  };
}
