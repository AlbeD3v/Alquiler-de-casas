'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Bell, Globe, Sun, Moon, Monitor, Trash2, Shield, Check } from 'lucide-react'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  id: string
}

function Toggle({ checked, onChange, id }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors',
        checked ? 'bg-sol' : 'bg-border'
      )}
    >
      <span className={cn(
        'pointer-events-none absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
        checked ? 'translate-x-4' : 'translate-x-0.5'
      )} />
    </button>
  )
}

function SectionPanel({ icon: Icon, title, desc, children }: {
  icon: React.ElementType; title: string; desc: string; children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-surface-container-lowest border border-border/40 shadow-[var(--shadow-card)] overflow-hidden">
      <div className="px-5 py-4 flex items-start gap-3 border-b border-border/40">
        <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground font-playfair">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

const THEMES = [
  { id: 'light', label: 'Claro', icon: Sun, bg: 'bg-arena border-border/60' },
  { id: 'dark', label: 'Oscuro', icon: Moon, bg: 'bg-noche border-border/60' },
  { id: 'system', label: 'Sistema', icon: Monitor, bg: 'bg-gradient-to-br from-arena to-noche border-border/60' },
]

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ email: true, push: false, sms: false })
  const [prefs, setPrefs] = useState({ lang: 'es', currency: 'USD' })
  const [theme, setTheme] = useState<string>('system')

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* ── Notificaciones ── */}
      <SectionPanel icon={Bell} title="Notificaciones" desc="Configurá cómo recibís alertas">
        <div className="space-y-0 divide-y divide-border/40">
          {([
            { key: 'email' as const, label: 'Email', desc: 'Actualizaciones por correo electrónico' },
            { key: 'push' as const, label: 'Push', desc: 'Alertas en el navegador' },
            { key: 'sms' as const, label: 'SMS', desc: 'Mensajes de texto al celular' },
          ]).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Toggle id={key} checked={notifs[key]} onChange={(v) => setNotifs((p) => ({ ...p, [key]: v }))} />
            </div>
          ))}
        </div>
      </SectionPanel>

      {/* ── Preferencias regionales ── */}
      <SectionPanel icon={Globe} title="Preferencias regionales" desc="Idioma y moneda">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" htmlFor="lang">
              Idioma
            </label>
            <select
              id="lang"
              value={prefs.lang}
              onChange={(e) => setPrefs((p) => ({ ...p, lang: e.target.value }))}
              className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" htmlFor="currency">
              Moneda
            </label>
            <select
              id="currency"
              value={prefs.currency}
              onChange={(e) => setPrefs((p) => ({ ...p, currency: e.target.value }))}
              className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol"
            >
              <option value="USD">USD ($)</option>
              <option value="CUP">CUP (₱)</option>
              <option value="EUR">EUR (€)</option>
              <option value="MLC">MLC</option>
            </select>
          </div>
        </div>
      </SectionPanel>

      {/* ── Apariencia ── */}
      <SectionPanel icon={Sun} title="Apariencia" desc="Personalizá el tema visual">
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map(({ id, label, icon: Icon, bg }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={cn(
                'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                theme === id
                  ? 'border-sol bg-sol/6'
                  : 'border-border/40 hover:border-border bg-surface-container'
              )}
            >
              <div className={cn('w-10 h-10 rounded-full border', bg)} />
              <p className="text-xs font-medium text-foreground">{label}</p>
              {theme === id && (
                <span className="absolute top-2 right-2 h-4 w-4 rounded-full bg-sol flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-noche" />
                </span>
              )}
            </button>
          ))}
        </div>
      </SectionPanel>

      {/* ── Privacidad ── */}
      <SectionPanel icon={Shield} title="Privacidad" desc="Control de tu información">
        <div className="space-y-0 divide-y divide-border/40">
          {([
            { label: 'Perfil público', desc: 'Otros usuarios pueden ver tu perfil' },
            { label: 'Mostrar teléfono', desc: 'Visible en tus listados' },
          ]).map(({ label, desc }, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Toggle id={`priv-${i}`} checked={i === 0} onChange={() => {}} />
            </div>
          ))}
        </div>
      </SectionPanel>

      {/* ── Zona de peligro ── */}
      <div className="rounded-2xl border border-destructive/30 bg-destructive/4 overflow-hidden">
        <div className="px-5 py-4 flex items-start gap-3 border-b border-destructive/20">
          <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
            <Trash2 className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-semibold text-destructive font-playfair">Zona de peligro</p>
            <p className="text-xs text-muted-foreground">Acciones irreversibles</p>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Eliminar cuenta</p>
            <p className="text-xs text-muted-foreground">Eliminá permanentemente tu cuenta y todos tus datos</p>
          </div>
          <Button variant="destructive" size="sm" className="shrink-0 ml-4">
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}
