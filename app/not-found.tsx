import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-arena/30 via-background to-arena/30">
      <div className="text-center space-y-8 px-4">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro select-none">
            404
          </h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-playfair">
            Página no Encontrada
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="golden" size="lg" asChild>
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/search">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Buscar Propiedades
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
