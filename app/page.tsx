import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/search/HeroSection";
import { FeaturedProperties } from "@/components/features/properties/FeaturedProperties";
import { PopularLocations } from "@/components/features/locations/PopularLocations";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProperties />
        <PopularLocations />
        
        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-noche via-noche/95 to-noche">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-arena font-playfair">
                ¿Tienes una propiedad para{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro">
                  alquilar o vender?
                </span>
              </h2>
              <p className="text-lg text-arena/80">
                Publica tu propiedad en CubaProp y llega a miles de compradores e inquilinos potenciales.
                ¡Es gratis empezar!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/register"
                  className="px-8 py-4 bg-gradient-to-r from-sol to-oro text-noche font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Publicar Propiedad
                </a>
                <a
                  href="/about"
                  className="px-8 py-4 border-2 border-arena/30 text-arena font-semibold rounded-lg hover:bg-arena/10 transition-all"
                >
                  Saber Más
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
