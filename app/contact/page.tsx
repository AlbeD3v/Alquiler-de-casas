'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Clock } from 'lucide-react'
import { siteConfig } from '@/config/site'

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" htmlFor={htmlFor}>
      {children}
    </label>
  )
}

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hola@almacuba.com', href: 'mailto:hola@almacuba.com', color: 'bg-sol/10 text-sol' },
  { icon: Phone, label: 'Teléfono', value: '+53 7 860 1234', href: 'tel:+5378601234', color: 'bg-caribe/10 text-caribe' },
  { icon: MapPin, label: 'Ubicación', value: 'La Habana, Cuba', href: undefined, color: 'bg-palma/10 text-palma' },
  { icon: Clock, label: 'Horario', value: 'Lun–Vie, 9 am – 6 pm', href: undefined, color: 'bg-oro/10 text-oro' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setSent(true)
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-low">
        <div className="container mx-auto px-4 py-14 max-w-5xl">

          {/* Header */}
          <div className="mb-10 space-y-2">
            <p className="text-xs font-semibold tracking-widest text-sol uppercase">Contacto</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">Hablemos</h1>
            <p className="text-muted-foreground max-w-lg">
              Tenés alguna pregunta o necesitás ayuda con una propiedad. Escribinos y te respondemos en menos de 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Info panel */}
            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-4 flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-foreground hover:text-sol transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form panel */}
            <div className="lg:col-span-2 rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-6">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-palma/10 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-palma" />
                  </div>
                  <h3 className="text-xl font-bold font-playfair text-foreground">¡Mensaje enviado!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Te respondemos en menos de 24 horas hábiles. Gracias por contactarnos.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => { setSent(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}>
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <h2 className="text-base font-semibold font-playfair text-foreground">Envianos un mensaje</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Completá el formulario y te contactamos pronto</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <FieldLabel htmlFor="name">Nombre</FieldLabel>
                        <Input id="name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} placeholder="Tu nombre" required className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} placeholder="tu@email.com" required className="h-10" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <FieldLabel htmlFor="subject">Asunto</FieldLabel>
                      <Input id="subject" value={formData.subject} onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))} placeholder="¿En qué podemos ayudarte?" required className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                      <FieldLabel htmlFor="message">Mensaje</FieldLabel>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        rows={5}
                        className="flex w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol resize-none transition-colors"
                        placeholder="Contanos todo lo que necesitás..."
                        required
                      />
                    </div>
                    <Button type="submit" variant="golden" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</> : <><Send className="h-4 w-4" /> Enviar mensaje</>}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
