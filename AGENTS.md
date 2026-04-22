# AGENTS.md — AlmaCuba

**Regla prioritaria:** Leer este archivo antes de codificar. No instalar paquetes ya existentes. Verificar siempre la estructura real del proyecto.

## Objetivo

Plataforma cubana de compra, venta y alquiler de propiedades. Referencia de diseño: `.atl/design-system.md`.

> Nombre anterior: CubaProp

## Stack

### Instalado ✅

| Paquete | Versión | Uso |
|---------|---------|-----|
| Next.js | 16.2.3 | Framework (App Router) |
| React | 19.2.4 | UI |
| TypeScript | 5 | Tipado estricto |
| Tailwind CSS | 4 | Estilos |
| Framer Motion | 12 | Animaciones |
| Radix UI | latest | Componentes base |
| Lucide React | latest | Iconos |
| Vitest | 4 | Tests unit/integration |
| Playwright | 1.59 | Tests E2E |
| Prettier | 3.8 | Formatter |
| ESLint | 9 | Linter |

### Pendiente ⏳ (ver `.atl/roadmap.md`)

MongoDB + Prisma · NextAuth.js · Zustand · React Query · Pusher · Uploadthing · Mapbox · next-intl · next-pwa

## Estructura Real del Proyecto

```
app/
  (auth)/           login/ · register/ · layout.tsx
  (dashboard)/      profile/ · my-properties/ · new-property/
                    favorites/ · messages/ · settings/ · layout.tsx
  (properties)/     search/ · property/[id]/
  about/ · contact/ · privacy/ · terms/
  page.tsx · layout.tsx · globals.css · not-found.tsx

components/
  ui/               button · card · input · dialog · skeleton · toast · ThemeToggle
  features/
    auth/           LoginForm · RegisterForm
    properties/     PropertyCard · PropertyDetail · PropertyForm · FeaturedProperties
    search/         SearchBar · SearchFilters · HeroSection
    locations/      PopularLocations
  layout/           Header · Footer · DashboardLayout

config/
  cuba-locations.ts   PROVINCIAS + MUNICIPIOS (168 municipios completos)
  currencies.ts       CUP · USD · MLC
  site.ts             Metadatos del sitio

types/              property · user · chat · search
hooks/              useAuth · useFavorites · useSearch · useTheme

lib/
  utils.ts
  __tests__/        Tests unitarios

e2e/
  auth/             login.spec.ts · register.spec.ts  ← fallan hasta implementar auth

openspec/           config.yaml  ← SDD configurado, Strict TDD: true
.atl/               skill-registry.md · design-system.md · mcps.md · roadmap.md
```

## Convenciones de Código

- **TypeScript strict** — sin `any`, usar `unknown` + type guards
- `interface` para props/objetos · `type` para uniones y utilitarios
- PascalCase componentes · camelCase funciones · UPPER_CASE constantes
- Imports absolutos con `@/` (alias configurado en `tsconfig.json`)
- Sin punto y coma · comillas simples · 2 espacios (Prettier)

## Variables de Entorno

Ver `.env.example`. Las llaves sensibles las completa el usuario.

```bash
NEXTAUTH_URL · NEXTAUTH_SECRET
GOOGLE_CLIENT_ID · GOOGLE_CLIENT_SECRET
DATABASE_URL
NEXT_PUBLIC_MCP_BASE_URL · MCP_API_KEY
UPLOADTHING_SECRET
PUSHER_APP_ID · PUSHER_KEY · PUSHER_SECRET
```

## Referencias

| Archivo | Contenido |
|---------|-----------|
| `.atl/design-system.md` | Paleta, tipografía, componentes visuales, análisis competencia |
| `.atl/mcps.md` | 5 herramientas MCP con parámetros y ejemplos |
| `.atl/roadmap.md` | Backend pendiente + comandos de instalación |
| `.atl/skill-registry.md` | Skills disponibles para agentes |
| `openspec/config.yaml` | Config SDD con testing capabilities |
| `PROJECT_STATUS.md` | Estado del frontend completado |
