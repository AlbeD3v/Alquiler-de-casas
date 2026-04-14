"use client";

import { useEffect, useState } from "react";
import { PropertyCard } from "@/components/features/properties/PropertyCard";
import { Property } from "@/types/property.types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

// Mock data until MCP is fully integrated
const mockProperties: Property[] = [
  {
    id: "PROP-001",
    title: "Villa Colonial en La Habana Vieja",
    description: "Hermosa villa con vista al Malecón",
    price: 150,
    currency: "USD",
    propertyType: "villa",
    transactionType: "alquiler",
    location: {
      province: "La Habana",
      municipality: "La Habana Vieja",
      address: "Calle Obispo #123",
    },
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    area: 180,
    amenities: ["WiFi", "A/C", "Cocina", "Parking"],
    images: [
      {
        id: "img-1",
        url: "/placeholder-property.jpg",
        alt: "Villa Colonial",
        isPrimary: true,
        order: 1,
      },
    ],
    owner: {
      id: "user-1",
      name: "Carlos Pérez",
      email: "carlos@example.com",
      reputation: 4.8,
      totalProperties: 5,
      totalTransactions: 23,
      isVerified: true,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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
    location: {
      province: "La Habana",
      municipality: "Plaza de la Revolución",
      address: "Calle 23 #456, Vedado",
    },
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    area: 95,
    amenities: ["WiFi", "A/C", "TV"],
    images: [
      {
        id: "img-2",
        url: "/placeholder-property.jpg",
        alt: "Apartamento Moderno",
        isPrimary: true,
        order: 1,
      },
    ],
    owner: {
      id: "user-2",
      name: "María Rodríguez",
      email: "maria@example.com",
      reputation: 4.5,
      totalProperties: 3,
      totalTransactions: 15,
      isVerified: true,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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
    location: {
      province: "Sancti Spíritus",
      municipality: "Trinidad",
      address: "Calle Trinidad #789",
    },
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    area: 120,
    amenities: ["WiFi", "Desayuno", "Terraza"],
    images: [
      {
        id: "img-3",
        url: "/placeholder-property.jpg",
        alt: "Casa Particular",
        isPrimary: true,
        order: 1,
      },
    ],
    owner: {
      id: "user-3",
      name: "José Martínez",
      email: "jose@example.com",
      reputation: 4.9,
      totalProperties: 8,
      totalTransactions: 45,
      isVerified: true,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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
    location: {
      province: "Matanzas",
      municipality: "Varadero",
      address: "Sector Norte, Varadero",
    },
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    area: 250,
    amenities: ["WiFi", "A/C", "Piscina", "Playa", "Parking"],
    images: [
      {
        id: "img-4",
        url: "/placeholder-property.jpg",
        alt: "Villa Varadero",
        isPrimary: true,
        order: 1,
      },
    ],
    owner: {
      id: "user-4",
      name: "Ana García",
      email: "ana@example.com",
      reputation: 5.0,
      totalProperties: 12,
      totalTransactions: 67,
      isVerified: true,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    isFeatured: true,
  },
];

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading - In production, this would call the MCP search_properties
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-sol" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-playfair">
              Propiedades{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro">
                Destacadas
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra selección de propiedades premium en las mejores ubicaciones de Cuba
            </p>
          </motion.div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="golden" size="xl" asChild>
            <Link href="/search">
              Ver Todas las Propiedades
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
