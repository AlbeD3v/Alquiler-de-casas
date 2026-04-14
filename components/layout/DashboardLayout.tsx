"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/config/site";
import {
  LayoutDashboard,
  Home,
  Heart,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const dashboardNav = [
  { label: "Mi Perfil", href: "/dashboard/profile", icon: LayoutDashboard },
  { label: "Mis Propiedades", href: "/dashboard/my-properties", icon: Home },
  { label: "Nueva Propiedad", href: "/dashboard/new-property", icon: Plus },
  { label: "Favoritos", href: "/dashboard/favorites", icon: Heart },
  { label: "Mensajes", href: "/dashboard/messages", icon: MessageCircle },
  { label: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-300 md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sol to-oro">
              <Home className="h-6 w-6 text-noche" />
            </div>
            <span className="text-xl font-bold font-playfair">CubaProp</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {dashboardNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-sol/10 text-sol"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5 mr-3" />
                Cerrar Sesión
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold font-playfair">
              {dashboardNav.find((n) => n.href === pathname)?.label || "Dashboard"}
            </h1>
            <div className="flex items-center gap-4">
              {/* User Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sol to-oro text-noche font-semibold">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
