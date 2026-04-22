'use client'

import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  User, Mail, Phone, MapPin, Save, Camera,
  Star, ShieldCheck, Award, Lock, CheckCircle2,
} from 'lucide-react'

const MOCK_USER = {
  name: 'Carlos Pérez',
  email: 'carlos@almacuba.com',
  phone: '+53 7 123 4567',
  province: 'La Habana',
  municipality: 'Playa',
  bio: 'Propietario de casas particulares en La Habana con más de 10 años de experiencia. Superhost verificado con 98% de reseñas positivas.',
  reputation: 4.8,
  totalTransactions: 23,
  totalProperties: 5,
  isVerified: true,
  verificationBadge: 'gold',
  memberSince: '2020',
}

const STATS = [
  { label: 'Reputación', value: '4.8', icon: Star, iconClass: 'text-sol fill-sol' },
  { label: 'Transacciones', value: '23', icon: CheckCircle2, iconClass: 'text-palma' },
  { label: 'Propiedades', value: '5', icon: MapPin, iconClass: 'text-caribe' },
]

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    province: MOCK_USER.province,
    bio: MOCK_USER.bio,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ── Hero card ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-6">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Avatar con camera button */}
          <div className="relative shrink-0">
            <Avatar size="2xl" fallback={formData.name} verified={MOCK_USER.isVerified} />
            <button className="absolute bottom-1 right-1 p-1.5 rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors">
              <Camera className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold font-playfair text-foreground">{formData.name}</h2>
              {MOCK_USER.isVerified && (
                <span className="flex items-center gap-1 text-xs text-sol font-medium">
                  <ShieldCheck className="h-4 w-4" /> Verificado
                </span>
              )}
              {MOCK_USER.verificationBadge === 'gold' && (
                <Badge variant="premium"><Award className="h-3 w-3" /> Gold</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Miembro desde {MOCK_USER.memberSince}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{formData.bio}</p>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {STATS.map(({ label, value, icon: Icon, iconClass }) => (
            <div key={label} className="text-center space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Icon className={`h-4 w-4 ${iconClass}`} />
                <span className="text-lg font-bold text-foreground font-playfair">{value}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Información personal ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-6 space-y-5">
        <div>
          <h3 className="text-base font-semibold font-playfair text-foreground">Información personal</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Actualizá tus datos de perfil</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input id="name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="pl-9 h-10" />
            </div>
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className="pl-9 h-10" />
            </div>
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="pl-9 h-10" />
            </div>
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="province">Provincia</FieldLabel>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                id="province"
                value={formData.province}
                onChange={(e) => setFormData((p) => ({ ...p, province: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
              >
                {['La Habana', 'Matanzas', 'Pinar del Río', 'Villa Clara', 'Santiago de Cuba', 'Holguín', 'Camagüey'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="bio">Biografía</FieldLabel>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))}
            rows={3}
            className="flex w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol resize-none transition-colors"
            placeholder="Contanos sobre vos..."
          />
        </div>

        <Button variant="golden" onClick={handleSave} className="gap-2">
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? 'Guardado' : 'Guardar cambios'}
        </Button>
      </div>

      {/* ── Seguridad ── */}
      <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold font-playfair text-foreground flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Seguridad
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Contraseña y autenticación</p>
          </div>
          <Button variant="outline" size="sm" disabled className="text-xs">
            Próximamente
          </Button>
        </div>
      </div>
    </div>
  )
}
