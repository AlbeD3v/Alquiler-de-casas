import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* AlmaCuba dot */}
      <div className="mb-8 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-sol" />
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">AlmaCuba</span>
      </div>

      {/* 404 */}
      <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none select-none text-transparent bg-clip-text bg-gradient-to-br from-sol via-oro to-coral">
        404
      </h1>

      {/* Copy */}
      <div className="text-center space-y-3 mt-2 mb-10 max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-playfair">
          Esta página se fue a la playa
        </h2>
        <p className="text-muted-foreground">
          La ruta que buscás no existe o fue movida. Pero tranquilo — hay miles de propiedades esperándote.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60">
          <MapPin className="h-3 w-3" />
          <span>Varadero, Cuba · 2026</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="golden" size="lg" asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/search">
            <Search className="h-4 w-4" />
            Buscar propiedades
          </Link>
        </Button>
      </div>
    </div>
  )
}
