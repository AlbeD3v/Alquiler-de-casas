"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property.types";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const mockMyProperties: Property[] = [
  {
    id: "PROP-001",
    title: "Mi Villa en La Habana Vieja",
    description: "Propiedad en alquiler",
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
    images: [{ id: "img-1", url: "/placeholder-property.jpg", alt: "Mi Villa", isPrimary: true, order: 1 }],
    owner: { id: "user-1", name: "Usuario Demo", email: "usuario@cubaprop.com", reputation: 4.8, totalProperties: 2, totalTransactions: 23, isVerified: true, role: "user", createdAt: new Date(), updatedAt: new Date() },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    isNew: true,
    isFeatured: true,
  },
];

export default function MyPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-playfair">Mis Propiedades</h1>
          <p className="text-muted-foreground">
            {mockMyProperties.length} {mockMyProperties.length === 1 ? "propiedad publicada" : "propiedades publicadas"}
          </p>
        </div>
        <Button variant="golden">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Propiedad
        </Button>
      </div>

      <div className="grid gap-4">
        {mockMyProperties.map((property) => (
          <Card key={property.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-48 h-32 rounded-lg bg-muted flex-shrink-0">
                  <div className="w-full h-full rounded-lg bg-gradient-to-br from-sol/20 to-oro/20 flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold font-playfair">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {property.location.municipality}, {property.location.province}
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      {property.status === "available" ? "Disponible" : property.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm mb-4">
                    <span>{property.bedrooms} hab.</span>
                    <span>{property.bathrooms} baños</span>
                    <span>{property.area} m²</span>
                    <span className="font-semibold text-sol">
                      ${property.price}/noche
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
