import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Shield } from 'lucide-react'

const SECTIONS = [
  {
    title: 'Información que recopilamos',
    content: 'En AlmaCuba recopilamos la información que nos proporcionás directamente cuando:',
    items: ['Creás una cuenta', 'Publicás una propiedad', 'Te comunicás con otros usuarios', 'Completás formularios de contacto'],
  },
  {
    title: 'Cómo usamos tu información',
    content: 'Utilizamos la información recopilada para:',
    items: ['Proporcionar y mejorar nuestros servicios', 'Procesar transacciones', 'Enviar comunicaciones relacionadas con el servicio', 'Prevenir actividades fraudulentas', 'Cumplir con obligaciones legales'],
  },
  {
    title: 'Compartir información',
    content: 'No vendemos tu información personal. Solo la compartimos con:',
    items: ['Proveedores de servicios que nos ayudan a operar', 'Autoridades cuando es requerido por ley', 'Otros usuarios (solo información de perfil pública)'],
  },
  {
    title: 'Seguridad de datos',
    content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.',
    items: [],
  },
  {
    title: 'Tus derechos',
    content: 'Tenés derecho a:',
    items: ['Acceder a tu información personal', 'Rectificar datos inexactos', 'Solicitar la eliminación de tu cuenta', 'Oponerte al procesamiento de tus datos', 'Exportar tus datos en formato portable'],
  },
  {
    title: 'Contacto',
    content: 'Si tenés preguntas sobre esta política de privacidad, escribinos a:',
    items: [],
    contact: true,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-low">
        <div className="container mx-auto px-4 py-14 max-w-3xl">

          {/* Header */}
          <div className="mb-10 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-caribe/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-caribe" />
              </div>
              <p className="text-xs font-semibold tracking-widest text-caribe uppercase">Legal</p>
            </div>
            <h1 className="text-4xl font-bold text-foreground font-playfair">Política de Privacidad</h1>
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
