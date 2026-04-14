"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyDetail } from "@/components/features/properties/PropertyDetail";
import { Property } from "@/types/property.types";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - Will be replaced with MCP get_property_details
const mockProperty: Property = {
  id: "PROP-001",
  title: "Villa Colonial en La Habana Vieja",
  description:
    "Hermosa villa colonial completamente renovada con vista al Malecón habanero. Esta propiedad combina la arquitectura clásica cubana con todas las comodidades modernas. Cuenta con amplias habitaciones, techos altos con vigas de madera originales, y una terraza con vistas panorámicas al mar. Ubicada en el corazón de La Habana Vieja, a pocos pasos de museos, restaurantes y la vida nocturna.",
  price: 150,
  currency: "USD",
  propertyType: "villa",
  transactionType: "alquiler",
  location: {
    province: "La Habana",
    municipality: "La Habana Vieja",
    address: "Calle Obispo #123",
    coordinates: { lat: 23.1352, lng: -82.3587 },
  },
  bedrooms: 3,
  bathrooms: 2,
  maxGuests: 6,
  area: 180,
  amenities: [
    "WiFi de alta velocidad",
    "Aire acondicionado",
    "Cocina completamente equipada",
    "Parking privado",
    "Terraza con vista al mar",
    "Lavadora y secadora",
    "TV de pantalla plana",
    "Caja fuerte",
    "Desayuno incluido",
    "Servicio de limpieza",
  ],
  images: [
    {
      id: "img-1",
      url: "/placeholder-property.jpg",
      alt: "Villa Colonial - Vista principal",
      isPrimary: true,
      order: 1,
    },
    {
      id: "img-2",
      url: "/placeholder-property.jpg",
      alt: "Villa Colonial - Sala",
      isPrimary: false,
      order: 2,
    },
    {
      id: "img-3",
      url: "/placeholder-property.jpg",
      alt: "Villa Colonial - Habitación",
      isPrimary: false,
      order: 3,
    },
    {
      id: "img-4",
      url: "/placeholder-property.jpg",
      alt: "Villa Colonial - Terraza",
      isPrimary: false,
      order: 4,
    },
  ],
  owner: {
    id: "user-1",
    name: "Carlos Pérez",
    email: "carlos@example.com",
    phone: "+53 7 123 4567",
    location: { province: "La Habana", municipality: "La Habana Vieja" },
    bio: "Propietario con más de 10 años de experiencia en alquiler de propiedades en La Habana",
    reputation: 4.8,
    totalProperties: 5,
    totalTransactions: 23,
    isVerified: true,
    verificationBadge: "gold",
    role: "user",
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date(),
  },
  status: "available",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date(),
  isNew: true,
  isFeatured: true,
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading property details
    // In production, this would call MCP get_property_details
    const timer = setTimeout(() => {
      setProperty(mockProperty);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="h-16 w-16 animate-spin text-sol" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Propiedad no encontrada
              </h1>
              <p className="text-muted-foreground mb-6">
                La propiedad que buscas no existe o ha sido removida.
              </p>
              <Button variant="golden" onClick={() => router.push("/search")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Búsqueda
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <PropertyDetail property={property} />
        </div>
      </main>
      <Footer />
    </>
  );
}
