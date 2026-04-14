import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-playfair">
            Términos de Servicio
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Última actualización: Abril 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                1. Aceptación de los Términos
              </h2>
              <p className="text-muted-foreground">
                Al acceder y usar CubaProp, aceptas estar sujeto por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                2. Descripción del Servicio
              </h2>
              <p className="text-muted-foreground">
                CubaProp es una plataforma web que permite a los usuarios:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Publicar propiedades para venta, compra o alquiler</li>
                <li>Buscar y filtrar propiedades según sus preferencias</li>
                <li>Contactar a otros usuarios propietarios o interesados</li>
                <li>Guardar propiedades favoritas</li>
                <li>Calificar y reseñar transacciones</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                3. Cuentas de Usuario
              </h2>
              <p className="text-muted-foreground">
                Para usar ciertas funciones del servicio, debes crear una cuenta. Eres responsable de:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Mantener la confidencialidad de tu contraseña</li>
                <li>Toda actividad que ocurra bajo tu cuenta</li>
                <li>Notificarnos inmediatamente de cualquier uso no autorizado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                4. Publicaciones de Propiedades
              </h2>
              <p className="text-muted-foreground">
                Al publicar una propiedad, garantizas que:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Eres el propietario o tienes autorización para publicar</li>
                <li>La información proporcionada es veraz y actualizada</li>
                <li>Las fotografías corresponden a la propiedad real</li>
                <li>El precio refleba el valor real de la transacción</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                5. Conducta del Usuario
              </h2>
              <p className="text-muted-foreground">
                No debes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Publicar contenido falso o engañoso</li>
                <li>Usar el servicio para actividades ilegales</li>
                <li>Suplantar la identidad de otra persona</li>
                <li>Interferir con el funcionamiento del servicio</li>
                <li>Recopilar información de otros usuarios sin consentimiento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                6. Limitación de Responsabilidad
              </h2>
              <p className="text-muted-foreground">
                CubaProp actúa como intermediario y no se hace responsable de:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>La exactitud de las publicaciones de los usuarios</li>
                <li>Disputas entre usuarios por transacciones</li>
                <li>Daños indirectos, incidentales o consecuentes</li>
                <li>Interrupciones temporales del servicio</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                7. Terminación
              </h2>
              <p className="text-muted-foreground">
                Podemos suspender o terminar tu acceso al servicio inmediatamente, sin previo aviso, por conductas que violen estos Términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">
                8. Contacto
              </h2>
              <p className="text-muted-foreground">
                Para preguntas sobre estos Términos:
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
