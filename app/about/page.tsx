import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, Shield, Heart, MapPin, Star, TrendingUp, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { icon: Home, label: "Propiedades", value: "500+" },
    { icon: Users, label: "Usuarios Activos", value: "1,200+" },
    { icon: MapPin, label: "Provincias", value: "15" },
    { icon: Star, label: "Satisfacción", value: "4.8/5" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Confianza",
      description: "Todas las propiedades son verificadas y los propietarios cuentan con sistema de reputación.",
    },
    {
      icon: Heart,
      title: "Compromiso",
      description: "Nos dedicamos a conectar personas con su hogar ideal en Cuba.",
    },
    {
      icon: TrendingUp,
      title: "Innovación",
      description: "Tecnología de punta para ofrecer la mejor experiencia de búsqueda inmobiliaria.",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-noche to-noche/90">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-arena font-playfair">
                Sobre{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sol to-oro">
                  CubaProp
                </span>
              </h1>
              <p className="text-xl text-arena/80">
                La plataforma líder para comprar, vender y alquilar propiedades en Cuba.
                Conectamos personas con su hogar ideal.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="pt-6 text-center space-y-2">
                      <Icon className="h-8 w-8 text-sol mx-auto" />
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gradient-to-b from-background to-arena/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-foreground mb-12 font-playfair">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <Icon className="h-10 w-10 text-sol mb-4" />
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto">
              <CardContent className="pt-12 text-center space-y-6">
                <Mail className="h-12 w-12 text-sol mx-auto" />
                <h2 className="text-3xl font-bold text-foreground font-playfair">
                  ¿Tienes preguntas?
                </h2>
                <p className="text-muted-foreground">
                  Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="golden" size="lg" asChild>
                    <Link href="/contact">Contactar</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/">Volver al Inicio</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
