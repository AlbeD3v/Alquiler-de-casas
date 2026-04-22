'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return { score, label: 'Débil', color: 'bg-coral' }
  if (score <= 3) return { score, label: 'Regular', color: 'bg-sol' }
  return { score, label: 'Fuerte', color: 'bg-palma' }
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    setIsLoading(true)
    setError('')
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard/profile')
    }, 1500)
  }

  const strength = getPasswordStrength(formData.password)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-playfair text-foreground">Creá tu cuenta</h1>
        <p className="text-sm text-muted-foreground">Unite a AlmaCuba y encontrá tu propiedad ideal</p>
      </div>

      {/* Social first */}
      <Button variant="outline" className="w-full gap-2.5" disabled={isLoading}>
        <GoogleIcon />
        Continuar con Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">o con email</span>
        <Separator className="flex-1" />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/8 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input id="name" type="text" placeholder="Tu nombre completo" value={formData.name} onChange={handleChange} className="pl-9 h-10" required autoComplete="name" />
          </div>
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input id="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} className="pl-9 h-10" required autoComplete="email" />
          </div>
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="phone">Teléfono <span className="normal-case font-normal">(opcional)</span></FieldLabel>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input id="phone" type="tel" placeholder="+53 7 123 4567" value={formData.phone} onChange={handleChange} className="pl-9 h-10" autoComplete="tel" />
          </div>
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" value={formData.password} onChange={handleChange} className="pl-9 pr-10 h-10" required autoComplete="new-password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle contraseña">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {/* Strength bar */}
          {formData.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={cn('h-1 flex-1 rounded-full transition-all', i <= strength.score ? strength.color : 'bg-border')} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{strength.label}</p>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="confirmPassword">Confirmá tu contraseña</FieldLabel>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Repetí tu contraseña" value={formData.confirmPassword} onChange={handleChange} className="pl-9 pr-10 h-10" required autoComplete="new-password" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle contraseña">
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Al registrarte aceptás nuestros{' '}
          <Link href="/terms" className="text-sol hover:underline underline-offset-2">Términos de Servicio</Link>
          {' '}y{' '}
          <Link href="/privacy" className="text-sol hover:underline underline-offset-2">Política de Privacidad</Link>.
        </p>

        <Button type="submit" variant="golden" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{' '}
        <Link href="/login" className="text-sol font-medium hover:underline underline-offset-2">
          Iniciá sesión
        </Link>
      </p>
    </motion.div>
  )
}
