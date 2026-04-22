# Roadmap Backend — CubaProp

## Estado actual: Frontend completo ✅

17 páginas funcionales, 35+ componentes, TypeScript strict, tests configurados.

## Pendiente (en orden de prioridad)

### 1. Base de datos — MongoDB + Prisma
- Schema de propiedades, usuarios, mensajes
- `DATABASE_URL` en `.env.local`

### 2. Autenticación — NextAuth.js
- Email/contraseña + Google OAuth
- `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Tests E2E de auth ya escritos en `e2e/auth/` — se activarán automáticamente

### 3. Upload de imágenes — Uploadthing o Cloudinary
- `UPLOADTHING_SECRET` o `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

### 4. Mensajería en tiempo real — Pusher (WebSockets)
- `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`

### 5. Integración MCPs
- Ver `.atl/mcps.md` para detalles

### 6. Features adicionales
- Mapa 3D de Cuba (Mapbox/Leaflet)
- next-intl (internacionalización)
- next-pwa (PWA / instalable en Android)
- Recharts (mapa de calor precios)
- middleware.ts (protección de rutas)

## Packages a instalar (cuando corresponda)

```bash
# Auth + DB
pnpm add next-auth @prisma/client
pnpm add -D prisma

# Estado global
pnpm add zustand @tanstack/react-query

# Upload
pnpm add uploadthing

# WebSockets
pnpm add pusher pusher-js

# Mapa
pnpm add mapbox-gl

# i18n
pnpm add next-intl

# PWA
pnpm add next-pwa
```
