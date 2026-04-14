"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCard } from "@/components/features/properties/PropertyCard";
import { Property } from "@/types/property.types";
import { Heart } from "lucide-react";

const mockFavorites: Property[] = [
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
];

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-sol fill-sol" />
            Mis Favoritos
          </CardTitle>
          <CardDescription>
            {mockFavorites.length} {mockFavorites.length === 1 ? "propiedad guardada" : "propiedades guardadas"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFavorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
