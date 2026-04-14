import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-playfair">
            Política de Privacidad
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Última actualización: Abril 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                1. Información que Recopilamos
              </h2>
              <p className="text-muted-foreground">
                En CubaProp recopilamos la información que nos proporcionas directamente cuando:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Creas una cuenta</li>
                <li>Publicas una propiedad</li>
                <li>Te comunicas con otros usuarios</li>
                <li>Completa formularios de contacto</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                2. Cómo Usamos tu Información
              </h2>
              <p className="text-muted-foreground">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Procesar transacciones</li>
                <li>Enviar comunicaciones relacionadas con el servicio</li>
                <li>Prevenir actividades fraudulentas</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                3. Compartir Información
              </h2>
              <p className="text-muted-foreground">
                No vendemos tu información personal. Solo compartimos información con:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Proveedores de servicios que nos ayudan a operar</li>
                <li>Autoridades cuando es requerido por ley</li>
                <li>Otros usuarios (solo información de perfil pública)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                4. Seguridad de Datos
              </h2>
              <p className="text-muted-foreground">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                5. Tus Derechos
              </h2>
              <p className="text-muted-foreground">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la eliminación de tu cuenta</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Exportar tus datos en formato portable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                6. Contacto
              </h2>
              <p className="text-muted-foreground">
                Si tienes preguntas sobre esta política de privacidad, contáctanos en:
              </p>
              <p className="text-muted-foreground mt-2">
                Email: <a href="mailto:contacto@cubaprop.com" className="text-sol hover:underline">contacto@cubaprop.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
