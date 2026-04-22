import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/features/search/HeroSection'
import { FeaturedProperties } from '@/components/features/properties/FeaturedProperties'
import { PopularLocations } from '@/components/features/locations/PopularLocations'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Search, FileText, HandshakeIcon } from 'lucide-react'

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Search,
    title: 'Busca y filtra',
    description:
      'Usa nuestro buscador con filtros avanzados por provincia, tipo, precio y características. Encuentra exactamente lo que necesitás.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Conecta con el dueño',
    description:
      'Cada anuncio muestra el perfil verificado del propietario. Contactá directamente sin intermediarios ni comisiones ocultas.',
  },
  {
    step: '03',
    icon: HandshakeIcon,
    title: 'Cerrá el trato',
    description:
      'Coordiná la visita, acordá los términos y finalizá la transacción con toda la confianza que da una plataforma curada.',
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProperties />

        {/* How it works */}
        <section className="py-24 bg-surface-container">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-sol tracking-widest uppercase mb-3">
                Simple y transparente
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
                ¿Cómo funciona <span className="italic text-sol">AlmaCuba</span>?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {HOW_IT_WORKS.map(({ step, icon: Icon, title, description }) => (
                <div key={step} className="flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-[var(--shadow-card)] flex items-center justify-center">
                      <Icon className="h-7 w-7 text-sol" />
                    </div>
                    <span className="absolute -top-2 -right-2 text-[10px] font-bold text-sol/40 font-playfair">
                      {step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-playfair mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PopularLocations />

        {/* CTA */}
        <section className="py-24 bg-noche relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1400&q=60)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-noche via-noche to-noche/80" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xs font-semibold text-sol tracking-widest uppercase">
                Publicá gratis
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-arena font-playfair">
                ¿Tenés una propiedad para{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro">
                  alquilar o vender?
                </span>
              </h2>
              <p className="text-lg text-arena/70 max-w-xl mx-auto">
                Publicá tu propiedad en AlmaCuba y llegá a miles de compradores e inquilinos
                potenciales en toda la isla.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button variant="golden" size="lg" asChild>
                  <Link href="/register">Publicar mi propiedad</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-arena/20 text-arena hover:bg-arena/10 hover:border-arena/40"
                  asChild
                >
                  <Link href="/about">Saber más</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
