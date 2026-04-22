import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollText } from 'lucide-react'

const SECTIONS = [
  {
    title: 'Aceptación de los términos',
    content: 'Al acceder y usar AlmaCuba, aceptás estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con alguna parte, no podrás acceder al servicio.',
    items: [],
  },
  {
    title: 'Descripción del servicio',
    content: 'AlmaCuba es una plataforma web que permite a los usuarios:',
    items: ['Publicar propiedades para venta, compra o alquiler', 'Buscar y filtrar propiedades según sus preferencias', 'Contactar a otros usuarios propietarios o interesados', 'Guardar propiedades favoritas', 'Calificar y reseñar transacciones'],
  },
  {
    title: 'Cuentas de usuario',
    content: 'Para usar ciertas funciones necesitás crear una cuenta. Sos responsable de:',
    items: ['Mantener la confidencialidad de tu contraseña', 'Toda actividad que ocurra bajo tu cuenta', 'Notificarnos inmediatamente de cualquier uso no autorizado'],
  },
  {
    title: 'Publicaciones de propiedades',
    content: 'Al publicar una propiedad, garantizás que:',
    items: ['Sos el propietario o tenés autorización para publicar', 'La información proporcionada es veraz y actualizada', 'Las fotografías corresponden a la propiedad real', 'El precio refleja el valor real de la transacción'],
  },
  {
    title: 'Conducta del usuario',
    content: 'No debés:',
    items: ['Publicar contenido falso o engañoso', 'Usar el servicio para actividades ilegales', 'Suplantar la identidad de otra persona', 'Interferir con el funcionamiento del servicio', 'Recopilar información de otros usuarios sin consentimiento'],
  },
  {
    title: 'Limitación de responsabilidad',
    content: 'AlmaCuba actúa como intermediario y no se hace responsable de:',
    items: ['La exactitud de las publicaciones de los usuarios', 'Disputas entre usuarios por transacciones', 'Daños indirectos, incidentales o consecuentes', 'Interrupciones temporales del servicio'],
  },
  {
    title: 'Terminación',
    content: 'Podemos suspender o terminar tu acceso al servicio inmediatamente, sin previo aviso, por conductas que violen estos Términos.',
    items: [],
  },
  {
    title: 'Contacto',
    content: 'Para preguntas sobre estos Términos escribinos a:',
    items: [],
    contact: true,
  },
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-low">
        <div className="container mx-auto px-4 py-14 max-w-3xl">

          {/* Header */}
          <div className="mb-10 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sol/10 flex items-center justify-center">
                <ScrollText className="h-4 w-4 text-sol" />
              </div>
              <p className="text-xs font-semibold tracking-widest text-sol uppercase">Legal</p>
            </div>
            <h1 className="text-4xl font-bold text-foreground font-playfair">Términos de Servicio</h1>
            <p className="text-sm text-muted-foreground">Última actualización: Abril 2026</p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {SECTIONS.map(({ title, content, items, contact }, i) => (
              <div key={title} className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sol/10 text-sol text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <h2 className="text-base font-semibold text-foreground font-playfair">{title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-9">{content}</p>
                {items.length > 0 && (
                  <ul className="pl-9 space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sol/60 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {contact && (
                  <p className="pl-9 text-sm">
                    <Link href="mailto:hola@almacuba.com" className="text-sol hover:underline font-medium">
                      hola@almacuba.com
                    </Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
