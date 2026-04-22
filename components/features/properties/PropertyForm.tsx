'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PROVINCIAS, MUNICIPIOS } from '@/config/cuba-locations'
import { Plus, X, Upload, CheckCircle2, Loader2, MapPin, Home, DollarSign, Users, Maximize2 } from 'lucide-react'

interface PropertyFormData {
  title: string
  description: string
  price: number
  currency: 'USD' | 'CUP' | 'EUR' | 'MLC'
  propertyType: 'casa_particular' | 'apartamento' | 'villa' | 'habitacion'
  transactionType: 'alquiler' | 'venta' | 'compra'
  province: string
  municipality: string
  address: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  area: number
  amenities: string[]
}

const AMENITIES_OPTIONS = [
  'WiFi', 'A/C', 'Cocina', 'Parking', 'Piscina', 'TV',
  'Lavadora', 'Terraza', 'Jardín', 'Vista al mar',
  'Desayuno', 'Limpieza', 'Caja fuerte', 'Agua caliente',
]

const SELECT_CLASS = 'flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol transition-colors'

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" htmlFor={htmlFor}>
      {children}
    </label>
  )
}

function SectionHeader({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sol text-noche text-xs font-bold mt-0.5">
        {step}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground font-playfair">{title}</h3>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

export function PropertyForm() {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '', description: '', price: 0, currency: 'USD',
    propertyType: 'casa_particular', transactionType: 'alquiler',
    province: '', municipality: '', address: '',
    bedrooms: 1, bathrooms: 1, maxGuests: 2, area: 0, amenities: [],
  })
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const municipios = formData.province ? MUNICIPIOS[formData.province] || [] : []

  const handleChange = (field: keyof PropertyFormData, value: PropertyFormData[typeof field]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-palma/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-palma" />
        </div>
        <h2 className="text-xl font-bold font-playfair text-foreground">¡Propiedad publicada!</h2>
        <p className="text-sm text-muted-foreground">Tu propiedad ya está visible en AlmaCuba</p>
        <Button variant="golden" size="sm" onClick={() => setSubmitted(false)}>
          Publicar otra
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* ── 1. Información básica ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-5 space-y-4">
        <SectionHeader step={1} title="Información básica" desc="Nombre, descripción y tipo de operación" />

        <div className="space-y-1.5">
          <FieldLabel htmlFor="title">Título de la publicación</FieldLabel>
          <Input id="title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Ej: Villa Colonial en La Habana Vieja" required className="h-10" />
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="desc">Descripción</FieldLabel>
          <textarea id="desc" value={formData.description} onChange={(e) => handleChange('description', e.target.value)}
            className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol resize-none transition-colors"
            placeholder="Describí tu propiedad en detalle..." required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <FieldLabel>Operación</FieldLabel>
            <select value={formData.transactionType} onChange={(e) => handleChange('transactionType', e.target.value as PropertyFormData['transactionType'])} className={SELECT_CLASS}>
              <option value="alquiler">Alquiler</option>
              <option value="venta">Venta</option>
              <option value="compra">Compra</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <FieldLabel>Tipo de propiedad</FieldLabel>
            <select value={formData.propertyType} onChange={(e) => handleChange('propertyType', e.target.value as PropertyFormData['propertyType'])} className={SELECT_CLASS}>
              <option value="casa_particular">Casa Particular</option>
              <option value="apartamento">Apartamento</option>
              <option value="villa">Villa</option>
              <option value="habitacion">Habitación</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="price">Precio / noche</FieldLabel>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input id="price" type="number" value={formData.price} onChange={(e) => handleChange('price', Number(e.target.value))} min="0" required className="h-10 pl-9" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Ubicación ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-5 space-y-4">
        <SectionHeader step={2} title="Ubicación" desc="Provincia, municipio y dirección exacta" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <FieldLabel>Provincia</FieldLabel>
            <select value={formData.province} onChange={(e) => { handleChange('province', e.target.value); handleChange('municipality', '') }} className={SELECT_CLASS} required>
              <option value="">Seleccioná...</option>
              {PROVINCIAS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <FieldLabel>Municipio</FieldLabel>
            <select value={formData.municipality} onChange={(e) => handleChange('municipality', e.target.value)} className={SELECT_CLASS} required disabled={!municipios.length}>
              <option value="">Seleccioná...</option>
              {municipios.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <FieldLabel htmlFor="address">Dirección</FieldLabel>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input id="address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="Calle, número..." required className="h-10 pl-9" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Detalles ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-5 space-y-4">
        <SectionHeader step={3} title="Detalles" desc="Capacidad y dimensiones" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            { field: 'bedrooms' as const, label: 'Habitaciones', icon: Home },
            { field: 'bathrooms' as const, label: 'Baños', icon: Home },
            { field: 'maxGuests' as const, label: 'Huéspedes máx.', icon: Users },
            { field: 'area' as const, label: 'Área (m²)', icon: Maximize2 },
          ]).map(({ field, label, icon: Icon }) => (
            <div key={field} className="space-y-1.5">
              <FieldLabel>{label}</FieldLabel>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input type="number" value={formData[field] as number} onChange={(e) => handleChange(field, Number(e.target.value))} min="1" required className="h-10 pl-8 text-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Amenidades ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-5 space-y-4">
        <SectionHeader step={4} title="Amenidades" desc={`${formData.amenities.length} seleccionadas`} />
        <div className="flex flex-wrap gap-2">
          {AMENITIES_OPTIONS.map((amenity) => {
            const active = formData.amenities.includes(amenity)
            return (
              <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                  active
                    ? 'bg-sol/10 text-sol border-sol/40 shadow-sm'
                    : 'bg-surface-container text-muted-foreground border-border/40 hover:border-border'
                )}>
                {active && <CheckCircle2 className="h-3 w-3" />}
                {amenity}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 5. Imágenes ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-5 space-y-4">
        <SectionHeader step={5} title="Imágenes" desc="Mínimo 3 fotos recomendadas" />

        <div className="border-2 border-dashed border-border/60 rounded-xl p-8 text-center hover:border-sol/40 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mx-auto mb-3 group-hover:bg-sol/10 transition-colors">
            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-sol transition-colors" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Arrastrá imágenes aquí</p>
          <p className="text-xs text-muted-foreground mb-3">JPG, PNG · Máx. 10MB por imagen</p>
          <Button type="button" variant="outline" size="sm">
            <Plus className="h-3.5 w-3.5" />
            Seleccionar archivos
          </Button>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {images.map((_, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-surface-container">
                <div className="w-full h-full bg-gradient-to-br from-sol/20 to-oro/20" />
                <button type="button" onClick={() => setImages((p) => p.filter((_, i) => i !== idx))}
                  className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center shadow">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Submit ── */}
      <Button type="submit" variant="golden" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Publicando...</>
        ) : (
          'Publicar propiedad'
        )}
      </Button>
    </form>
  )
}
