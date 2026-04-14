"use client";

import { useState } from "react";
import Image from "next/image";
import { Property } from "@/types/property.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/config/currencies";
import {
  Bed,
  Bath,
  MapPin,
  AreaChart,
  Heart,
  Share2,
  Calendar,
  Users,
  CheckCircle,
  Star,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PropertyDetailProps {
  property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // Mock images
  const images = [
    { url: "/placeholder-property.jpg", alt: `${property.title} - Imagen 1` },
    { url: "/placeholder-property.jpg", alt: `${property.title} - Imagen 2` },
    { url: "/placeholder-property.jpg", alt: `${property.title} - Imagen 3` },
    { url: "/placeholder-property.jpg", alt: `${property.title} - Imagen 4` },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const totalPrice = calculateNights() * property.price;

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-muted">
        <div className="relative h-[500px]">
          <Image
            src={images[currentImageIndex].url}
            alt={images[currentImageIndex].alt}
            fill
            className="object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </button>
          <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-sol" />
                  <span>
                    {property.location.address}, {property.location.municipality},{" "}
                    {property.location.province}
                  </span>
                </div>
              </div>
              {property.isFeatured && (
                <div className="px-3 py-1 rounded-full bg-oro/20 text-oro font-semibold text-sm flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Destacado
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 py-4 border-y border-border">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-sol" />
                <span className="text-sm">
                  {property.bedrooms} {property.bedrooms === 1 ? "Habitación" : "Habitaciones"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-sol" />
                <span className="text-sm">
                  {property.bathrooms} {property.bathrooms === 1 ? "Baño" : "Baños"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AreaChart className="h-5 w-5 text-sol" />
                <span className="text-sm">{property.area} m²</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-sol" />
                <span className="text-sm">Hasta {property.maxGuests} huéspedes</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-sol" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Owner Info */}
          <Card>
            <CardHeader>
              <CardTitle>Propietario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sol to-oro flex items-center justify-center text-noche text-2xl font-bold">
                    {property.owner.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{property.owner.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-sol fill-sol" />
                      <span>{property.owner.reputation}</span>
                      <span>•</span>
                      <span>{property.owner.totalTransactions} transacciones</span>
                    </div>
                    {property.owner.isVerified && (
                      <div className="flex items-center gap-1 text-xs text-sol mt-1">
                        <CheckCircle className="h-3 w-3" />
                        Verificado
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Mensaje
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <div className="text-3xl font-bold text-foreground">
                {formatPrice(property.price, property.currency)}
                {property.transactionType === "alquiler" && (
                  <span className="text-base text-muted-foreground font-normal"> /noche</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Selection */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in</label>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out</label>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Huéspedes</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
                  >
                    {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "huésped" : "huéspedes"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Breakdown */}
              {calculateNights() > 0 && (
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {formatPrice(property.price, property.currency)} x {calculateNights()}{" "}
                      {calculateNights() === 1 ? "noche" : "noches"}
                    </span>
                    <span>{formatPrice(totalPrice, property.currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Servicio</span>
                    <span>{formatPrice(totalPrice * 0.1, property.currency)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice * 1.1, property.currency)}</span>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <Button variant="golden" size="lg" className="w-full">
                <Calendar className="h-5 w-5 mr-2" />
                Reservar Ahora
              </Button>

              {/* Contact Owner */}
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contactar Propietario
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
