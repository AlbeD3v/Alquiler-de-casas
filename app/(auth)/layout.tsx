import Image from 'next/image'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* ── Panel editorial izquierdo (sólo desktop) ── */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80"
          alt="Cuba landscape"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-noche/80 via-noche/60 to-noche/40" />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2.5 w-fit">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sol to-oro shadow-md">
            <Home className="h-5 w-5 text-noche" />
          </div>
          <span className="text-lg font-bold font-playfair text-arena tracking-wide">AlmaCuba</span>
        </Link>

        {/* Headline */}
        <div className="relative z-10 space-y-4">
          <blockquote className="space-y-3">
            <p className="text-3xl font-bold font-playfair text-arena leading-snug">
              &ldquo;La isla más bella que<br />ojos humanos han visto.&rdquo;
            </p>
            <footer className="text-sm text-arena/60">— Cristóbal Colón, 1492</footer>
          </blockquote>

          <div className="flex gap-6 pt-2">
            {[
              { n: '2,400+', label: 'propiedades' },
              { n: '15', label: 'provincias' },
              { n: '98%', label: 'satisfacción' },
            ].map(({ n, label }) => (
              <div key={label}>
                <p className="text-xl font-bold text-sol">{n}</p>
                <p className="text-xs text-arena/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Panel de formulario ── */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-surface-container-low min-h-screen">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sol to-oro">
              <Home className="h-4 w-4 text-noche" />
            </div>
            <span className="font-bold font-playfair text-foreground">AlmaCuba</span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  )
}
