'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import {
  User,
  Home,
  Heart,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Bell,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const MOCK_USER = {
  name: 'Carlos Pérez',
  email: 'carlos@example.com',
  verified: true,
}

const dashboardNav = [
  { label: 'Mi Perfil', href: '/dashboard/profile', icon: User },
  { label: 'Mis Propiedades', href: '/dashboard/my-properties', icon: Home },
  { label: 'Nueva Propiedad', href: '/dashboard/new-property', icon: Plus },
  { label: 'Favoritos', href: '/dashboard/favorites', icon: Heart },
  { label: 'Mensajes', href: '/dashboard/messages', icon: MessageCircle },
  { label: 'Configuración', href: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeLabel = dashboardNav.find((n) => n.href === pathname)?.label ?? 'Dashboard'

  return (
    <div className="flex h-screen bg-surface-container-low overflow-hidden">

      {/* ── Mobile overlay ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-noche/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-60 flex flex-col',
          'bg-surface-container-lowest border-r border-border/40',
          'shadow-[var(--shadow-card)] transition-transform duration-300',
          'md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sol to-oro shadow-sm">
              <Home className="h-4 w-4 text-noche" />
            </div>
            <span className="text-base font-bold font-playfair text-foreground truncate">AlmaCuba</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-muted transition-colors shrink-0"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {dashboardNav.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-sol/10 text-sol'
                    : 'text-muted-foreground hover:bg-surface-container hover:text-foreground'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0 transition-colors', isActive ? 'text-sol' : 'text-muted-foreground group-hover:text-foreground')} />
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && <ChevronRight className="h-3 w-3 text-sol/60 shrink-0" />}
              </Link>
            )
          })}
        </nav>

        <Separator />

        {/* User section */}
        <div className="px-3 py-3 space-y-1">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl">
            <Avatar size="sm" fallback={MOCK_USER.name} verified={MOCK_USER.verified} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{MOCK_USER.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{MOCK_USER.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/8 h-8 text-xs"
            asChild
          >
            <Link href="/">
              <LogOut className="h-3.5 w-3.5" />
              Cerrar sesión
            </Link>
          </Button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-60">

        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border/40 bg-surface-container-lowest/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm flex-1 min-w-0">
              <span className="text-muted-foreground hidden sm:block">Dashboard</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground hidden sm:block shrink-0" />
              <span className="font-semibold text-foreground truncate">{activeLabel}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-coral" />
              </button>
              <div className="ml-1">
                <Avatar size="sm" fallback={MOCK_USER.name} verified={MOCK_USER.verified} />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
