"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bed,
  Bath,
  MapPin,
  Heart,
  Star,
  AreaChart,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { motion } from "framer-motion";
import { formatPrice } from "@/config/currencies";

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  className?: string;
}

export function PropertyCard({
  property,
  onFavorite,
  className,
}: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFavorited = isFavorite(property.id);

  const handleFavorite = () => {
    toggleFavorite(property.id);
    onFavorite?.(property.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card
        className={cn(
          "group overflow-hidden glass hover:shadow-2xl transition-all duration-300",
          className
        )}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.images[0]?.url || "/placeholder-property.jpg"}
            alt={property.images[0]?.alt || property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {property.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full bg-sol text-noche text-xs font-semibold shadow-lg"
              >
                Nuevo
              </motion.div>
            )}
            {property.isFeatured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full bg-oro text-noche text-xs font-semibold shadow-lg flex items-center gap-1"
              >
                <Star className="h-3 w-3" />
                Destacado
              </motion.div>
            )}
            <div className="px-3 py-1 rounded-full bg-noche/80 text-arena text-xs font-semibold backdrop-blur-sm">
              {property.transactionType === "alquiler"
                ? "Alquiler"
                : property.transactionType === "venta"
                ? "Venta"
                : "Compra"}
            </div>
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorited ? "fill-red-500 text-red-500" : "text-white"
              )}
            />
          </motion.button>

          {/* Price */}
          <div className="absolute bottom-3 left-3">
            <div className="px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm">
              <p className="text-2xl font-bold text-noche">
                {formatPrice(property.price, property.currency)}
              </p>
              {property.transactionType === "alquiler" && (
                <p className="text-xs text-muted-foreground">por noche</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5 space-y-4">
          {/* Title & Location */}
          <div>
            <h3 className="text-lg font-semibold text-foreground font-playfair line-clamp-1 group-hover:text-sol transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-sol" />
              <span>
                {property.location.municipality},{" "}
                {property.location.province}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-sol" />
              <span>{property.bedrooms} Hab.</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-sol" />
              <span>{property.bathrooms} Baños</span>
            </div>
            <div className="flex items-center gap-1">
              <AreaChart className="h-4 w-4 text-sol" />
              <span>{property.area} m²</span>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                  +{property.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button variant="golden" className="w-full" asChild>
            <Link href={`/properties/${property.id}`}>
              Ver Detalles
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
