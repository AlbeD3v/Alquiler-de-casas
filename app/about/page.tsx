import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Home, Users, Shield, Heart, MapPin, Star, TrendingUp, Mail, CheckCircle2 } from 'lucide-react'

const STATS = [
  { icon: Home, label: 'Propiedades', value: '2,400+', color: 'text-sol' },
  { icon: Users, label: 'Usuarios activos', value: '8,500+', color: 'text-caribe' },
  { icon: MapPin, label: 'Provincias', value: '15', color: 'text-palma' },
  { icon: Star, label: 'Satisfacción', value: '4.9/5', color: 'text-oro' },
]

const VALUES = [
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Todas las propiedades son verificadas. Los propietarios cuentan con sistema de reputación y badge de verificación.',
    accent: 'bg-caribe/10 text-caribe',
  },
  {
    icon: Heart,
    title: 'Compromiso',
    description: 'Nos dedicamos a conectar personas con su hogar ideal en Cuba, con atención personalizada en cada paso.',
    accent: 'bg-coral/10 text-coral',
  },
  {
    icon: TrendingUp,
    title: 'Innovación',
    description: 'Tecnología de punta para ofrecer la mejor experiencia de búsqueda inmobiliaria en la isla.',
    accent: 'bg-sol/10 text-sol',
  },
]

const TEAM = [
  { name: 'Ana García', role: 'CEO & Co-fundadora', initials: 'AG' },
  { name: 'Luis Martínez', role: 'CTO & Co-fundador', initials: 'LM' },
  { name: 'Rosa Herrera', role: 'Head of Operations', initials: 'RH' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative py-24 overflow-hidden bg-noche">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=75"
            alt="Cuba landscape"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 text-center space-y-6 max-w-3xl">
            <p className="text-xs font-semibold tracking-widest text-sol/80 uppercase">Sobre nosotros</p>
            <h1 className="text-5xl md:text-6xl font-bold text-arena font-playfair leading-tight">
              Conectamos Cuba con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro">
                su hogar ideal
              </span>
            </h1>
            <p className="text-lg text-arena/70 max-w-xl mx-auto">
              AlmaCuba es la plataforma líder para comprar, vender y alquilar propiedades en Cuba. Nacimos en La Habana en 2020.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-14 bg-background border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden">
              {STATS.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-background py-8 px-6 text-center space-y-2">
                  <Icon className={`h-6 w-6 mx-auto ${color}`} />
                  <p className={`text-3xl font-bold font-playfair ${color}`}>{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Misión ── */}
        <section className="py-20 bg-surface-container-low">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-widest text-sol uppercase">Nuestra misión</p>
                <h2 className="text-3xl font-bold font-playfair text-foreground leading-snug">
                  Hacer el mercado inmobiliario cubano accesible y transparente
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Creemos que cada cubano merece encontrar su hogar con confianza. Por eso construimos una plataforma donde propietarios y compradores se conectan de forma directa, sin intermediarios innecesarios.
                </p>
                <ul className="space-y-2">
                  {['Verificación de propietarios', 'Precios transparentes', 'Soporte en español', 'Sin comisiones ocultas'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-palma shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80"
                  alt="La Habana colonial"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Valores ── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest text-sol uppercase mb-3">Valores</p>
              <h2 className="text-3xl font-bold font-playfair text-foreground">Lo que nos define</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map(({ icon: Icon, title, description, accent }) => (
                <div key={title} className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-6 space-y-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold font-playfair text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Equipo ── */}
        <section className="py-20 bg-surface-container-low">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-widest text-sol uppercase mb-3">El equipo</p>
            <h2 className="text-3xl font-bold font-playfair text-foreground mb-10">Detrás de AlmaCuba</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {TEAM.map(({ name, role, initials }) => (
                <div key={name} className="space-y-3 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sol to-oro flex items-center justify-center text-noche text-xl font-bold font-playfair mx-auto shadow-md">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground font-playfair">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-noche">
          <div className="container mx-auto px-4 text-center max-w-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-sol/20 flex items-center justify-center mx-auto">
              <Mail className="h-6 w-6 text-sol" />
            </div>
            <h2 className="text-3xl font-bold text-arena font-playfair">¿Tenés preguntas?</h2>
            <p className="text-arena/70">
              Estamos para ayudarte. Contactanos y te respondemos a la brevedad.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="golden" size="lg" asChild>
                <Link href="/contact">Contactar</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-arena/20 text-arena hover:bg-arena/10" asChild>
                <Link href="/">Volver al inicio</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
