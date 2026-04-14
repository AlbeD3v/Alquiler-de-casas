"use client";

import { motion } from "framer-motion";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PROVINCIAS } from "@/config/cuba-locations";

interface HeroSearchProps {
  onSearch?: (params: SearchParams) => void;
}

interface SearchParams {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

export function HeroSection() {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    // In a real app, this would trigger a search
    console.log("Searching with params:", searchParams);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-noche via-noche/95 to-noche/90" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-sol rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-oro rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sol rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-arena mb-4 font-playfair">
              Encuentra tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro">
                hogar perfecto
              </span>{" "}
              en Cuba
            </h1>
            <p className="text-xl text-arena/80 max-w-2xl mx-auto">
              Descubre propiedades únicas en las mejores ubicaciones de Cuba. 
              Compra, vende o alquila con confianza.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            {/* Main Search */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Location */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <select
                  value={searchParams.location || ""}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, location: e.target.value })
                  }
                  className="flex h-12 w-full rounded-lg border border-input bg-background/50 pl-10 pr-10 text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol transition-all"
                >
                  <option value="">📍 ¿Dónde buscas?</option>
                  {PROVINCIAS.map((provincia) => (
                    <option key={provincia} value={provincia}>
                      {provincia}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
              </div>

              {/* Property Type */}
              <div className="flex-1 relative">
                <select
                  value={searchParams.propertyType || ""}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      propertyType: e.target.value,
                    })
                  }
                  className="flex h-12 w-full rounded-lg border border-input bg-background/50 px-3 pr-10 text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol transition-all"
                >
                  <option value="">🏠 Tipo de propiedad</option>
                  <option value="casa_particular">Casa Particular</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="villa">Villa</option>
                  <option value="habitacion">Habitación</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
              </div>

              {/* Price Range */}
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="💰 Precio máximo"
                  value={searchParams.maxPrice || ""}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      maxPrice: Number(e.target.value),
                    })
                  }
                  className="h-12"
                />
              </div>

              {/* Search Button */}
              <Button
                variant="golden"
                size="xl"
                onClick={handleSearch}
                className="md:w-auto"
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-arena/70 hover:text-sol transition-colors mx-auto"
            >
              {showFilters ? "Ocultar" : "Mostrar"} filtros avanzados
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-4 border-t border-arena/20 grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <div>
                  <label className="block text-sm text-arena/70 mb-2">
                    Habitaciones mín.
                  </label>
                  <select
                    value={searchParams.bedrooms || ""}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        bedrooms: Number(e.target.value),
                      })
                    }
                    className="flex h-10 w-full rounded-lg border border-input bg-background/50 px-3 text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
                  >
                    <option value="">Cualquiera</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-arena/70 mb-2">
                    Precio mínimo
                  </label>
                  <Input
                    type="number"
                    placeholder="$ Min"
                    value={searchParams.minPrice || ""}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        minPrice: Number(e.target.value),
                      })
                    }
                    className="h-10"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full border-arena/30 text-arena hover:bg-arena/10"
                    onClick={() => setSearchParams({})}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-sol">500+</p>
              <p className="text-sm text-arena/70">Propiedades</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-sol">15</p>
              <p className="text-sm text-arena/70">Provincias</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-sol">1000+</p>
              <p className="text-sm text-arena/70">Clientes felices</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-arena/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-sol rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
