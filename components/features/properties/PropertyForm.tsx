"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PROVINCIAS, MUNICIPIOS } from "@/config/cuba-locations";
import { Plus, X, Upload, CheckCircle } from "lucide-react";

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  currency: "USD" | "CUP" | "EUR" | "MLC";
  propertyType: "casa_particular" | "apartamento" | "villa" | "habitacion";
  transactionType: "alquiler" | "venta" | "compra";
  province: string;
  municipality: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  area: number;
  amenities: string[];
}

const AMENITIES_OPTIONS = [
  "WiFi", "A/C", "Cocina", "Parking", "Piscina", "TV",
  "Lavadora", "Terraza", "Jardín", "Vista al mar", "Desayuno",
  "Servicio de limpieza", "Caja fuerte", "Agua caliente"
];

export function PropertyForm() {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    price: 0,
    currency: "USD",
    propertyType: "casa_particular",
    transactionType: "alquiler",
    province: "",
    municipality: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    area: 0,
    amenities: [],
  });

  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const municipios = formData.province ? MUNICIPIOS[formData.province] || [] : [];

  const handleChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Property data:", formData);
    console.log("Images:", images);
    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair">Nueva Propiedad</CardTitle>
        <CardDescription>
          Completa la información de tu propiedad para publicar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Básica</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Título de la Publicación</label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Ej: Villa Colonial en La Habana Vieja"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol resize-none"
                placeholder="Describe tu propiedad..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Operación</label>
                <select
                  value={formData.transactionType}
                  onChange={(e) => handleChange("transactionType", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
                >
                  <option value="alquiler">Alquiler</option>
                  <option value="venta">Venta</option>
                  <option value="compra">Compra</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Propiedad</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleChange("propertyType", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
                >
                  <option value="casa_particular">Casa Particular</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="villa">Villa</option>
                  <option value="habitacion">Habitación</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Precio (USD)</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange("price", Number(e.target.value))}
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ubicación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Provincia</label>
                <select
                  value={formData.province}
                  onChange={(e) => handleChange("province", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
                  required
                >
                  <option value="">Selecciona una provincia</option>
                  {PROVINCIAS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Municipio</label>
                <select
                  value={formData.municipality}
                  onChange={(e) => handleChange("municipality", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
                  required
                  disabled={!municipios.length}
                >
                  <option value="">Selecciona un municipio</option>
                  {municipios.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección</label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Calle, número..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detalles</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Habitaciones</label>
                <Input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleChange("bedrooms", Number(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Baños</label>
                <Input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleChange("bathrooms", Number(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Huéspedes máx.</label>
                <Input
                  type="number"
                  value={formData.maxGuests}
                  onChange={(e) => handleChange("maxGuests", Number(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Área (m²)</label>
                <Input
                  type="number"
                  value={formData.area}
                  onChange={(e) => handleChange("area", Number(e.target.value))}
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Amenidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMENITIES_OPTIONS.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.amenities.includes(amenity)
                      ? "bg-sol/20 text-sol border-2 border-sol"
                      : "bg-muted text-muted-foreground border-2 border-transparent hover:border-border"
                  }`}
                >
                  {formData.amenities.includes(amenity) && <CheckCircle className="h-4 w-4" />}
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Imágenes</h3>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <Button type="button" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Imágenes
              </Button>
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <div className="w-full h-full bg-gradient-to-br from-sol/20 to-oro/20 flex items-center justify-center">
                      <span className="text-2xl">📷</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="golden"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publicando..." : "Publicar Propiedad"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
