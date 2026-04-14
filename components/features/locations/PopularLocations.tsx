"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const locations = [
  {
    name: "La Habana",
    description: "La vibrante capital con arquitectura colonial y vida nocturna",
    properties: 150,
    image: "/placeholder-habana.jpg",
  },
  {
    name: "Varadero",
    description: "Playas de arena blanca y aguas cristalinas",
    properties: 85,
    image: "/placeholder-varadero.jpg",
  },
  {
    name: "Trinidad",
    description: "Ciudad museo con calles empedradas y historia",
    properties: 65,
    image: "/placeholder-trinidad.jpg",
  },
  {
    name: "Viñales",
    description: "Paisaje natural impresionante y tabaco cubano",
    properties: 45,
    image: "/placeholder-vinales.jpg",
  },
];

export function PopularLocations() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-arena/30">
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
              Destinos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro">
                Populares
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora las ubicaciones más buscadas por nuestros usuarios
            </p>
          </motion.div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-noche to-noche/70 group-hover:from-sol/80 group-hover:to-oro/80 transition-all duration-300" />
              
              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-arena/80 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{location.properties} propiedades</span>
                  </div>
                  <h3 className="text-2xl font-bold text-arena font-playfair mb-2">
                    {location.name}
                  </h3>
                  <p className="text-sm text-arena/80">
                    {location.description}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  className="text-arena self-start group-hover:text-noche transition-colors"
                  asChild
                >
                  <Link href={`/search?location=${location.name}`}>
                    Explorar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
