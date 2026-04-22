'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { navigationConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Menu, X, Home } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sol to-oro">
              <Home className="h-6 w-6 text-noche" />
            </div>
            <span className="text-xl font-bold font-playfair text-foreground">AlmaCuba</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationConfig.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-sol',
                  pathname === item.href ? 'text-sol' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button variant="golden" size="sm" asChild>
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {navigationConfig.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted',
                  pathname === item.href ? 'bg-muted text-sol' : 'text-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button variant="golden" className="w-full" asChild>
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
