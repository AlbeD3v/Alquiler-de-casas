# 🏠 CubaProp - Plataforma Inmobiliaria Cubana

![CubaProp](https://img.shields.io/badge/CubaProp-v1.0.0-orange)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## 🌟 Descripción

**CubaProp** es una plataforma web moderna y profesional para la compra, venta y alquiler de propiedades en Cuba. Diseñada para destacar frente a las opciones existentes (Revolico, Porlalivre, Cubasita, InmobiliariaCuba) con una experiencia de usuario impecable.

## ✨ Características Principales

### 🎨 **Diseño Premium**
- **Glassmorphism** en tarjetas y componentes
- **Animaciones fluidas** con Framer Motion
- **Modo Claro/Oscuro** con toggle
- **Paleta de colores CubaProp**: Sol, Noche, Arena, Oro
- **Tipografía profesional**: Inter + Playfair Display

### 🔍 **Búsqueda Avanzada**
- Filtros por ubicación, precio, tipo, habitaciones, área
- Búsqueda por texto en títulos y amenidades
- Vista en grid o lista
- Resultados en tiempo real

### 🏡 **Propiedades**
- Galería de imágenes con navegación
- Detalle completo de propiedades
- Sistema de favoritos
- Información del propietario con reputación

### 💬 **Mensajería**
- Chat en tiempo real entre usuarios
- Lista de conversaciones
- Mensajes no leídos

### 👤 **Dashboard de Usuario**
- Gestión de perfil
- Mis propiedades
- Favoritos guardados
- Mensajes

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+ 
pnpm (recomendado) o npm
```

### Installation

```bash
# Clonar el repositorio
git clone <repo-url>
cd Casa_Alquiler_Cubano

# Instalar dependencias
pnpm install

# Copiar archivo de variables de entorno
cp .env.example .env.local
```

### Development

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Abrir http://localhost:3000
```

### Production Build

```bash
# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## 📁 Estructura del Proyecto

```
Casa_Alquiler_Cubano/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Autenticación
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/            # Área privada
│   │   ├── profile/
│   │   ├── my-properties/
│   │   ├── favorites/
│   │   └── messages/
│   ├── (properties)/           # Búsqueda y detalles
│   │   ├── search/
│   │   └── property/[id]/
│   ├── about/
│   ├── contact/
│   ├── privacy/
│   ├── terms/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/                     # Componentes base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Skeleton.tsx
│   ├── features/               # Por funcionalidad
│   │   ├── auth/
│   │   ├── properties/
│   │   ├── search/
│   │   └── locations/
│   └── layout/                 # Estructurales
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── DashboardLayout.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useFavorites.ts
│   ├── useSearch.ts
│   └── useTheme.ts
│
├── config/
│   ├── cuba-locations.ts
│   ├── site.ts
│   └── currencies.ts
│
├── types/
│   ├── property.types.ts
│   ├── user.types.ts
│   ├── chat.types.ts
│   └── search.types.ts
│
└── lib/
    └── utils.ts
```

## 🎨 Design System

### Colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Sol | `#F9A03F` | Primary, CTAs, acentos |
| Noche | `#1E3D58` | Texto, fondos oscuros |
| Arena | `#F7F4EA` | Background, áreas claras |
| Oro | `#D4AF37` | Gradientes, destacados |

### Tipografía

- **Sans-serif**: Geist (Inter alternative)
- **Display**: Playfair Display (títulos, headers)

### Componentes UI

- **Button**: 7 variantes (default, secondary, outline, ghost, destructive, link, golden)
- **Card**: Sistema completo (Card, Header, Title, Content, Footer)
- **Input**: Con estados de foco y validación
- **Dialog**: Modal con animaciones

## 🗺️ Rutas Disponibles

### Públicas
- `/` - Landing page
- `/search` - Búsqueda de propiedades
- `/property/[id]` - Detalle de propiedad
- `/about` - Acerca de
- `/contact` - Contacto
- `/privacy` - Política de privacidad
- `/terms` - Términos de servicio

### Autenticación
- `/login` - Iniciar sesión
- `/register` - Crear cuenta

### Dashboard (Requiere auth)
- `/dashboard/profile` - Mi perfil
- `/dashboard/my-properties` - Mis propiedades
- `/dashboard/favorites` - Favoritos
- `/dashboard/messages` - Mensajes

## 🔧 Tecnologías

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilos
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos

### Arquitectura
- **App Router** - Next.js routing
- **Server Components** - Rendimiento
- **Client Components** - Interactividad

## 🌐 MCP Integration

El proyecto está diseñado para integrarse con el MCP `casa-alquiler-cubano`:

- `search_properties` - Búsqueda de propiedades
- `get_property_details` - Detalles por ID
- `calculate_booking_cost` - Calculadora de costos
- `get_cuba_travel_info` - Información turística
- `get_availability_calendar` - Calendario de disponibilidad

## 📝 Próximos Pasos (Roadmap)

### Fase 1: Backend ✅
- [ ] Integración con MongoDB
- [ ] NextAuth.js configuración
- [ ] API routes para propiedades
- [ ] Upload de imágenes

### Fase 2: Features Avanzadas 🚧
- [ ] WebSockets para chat en tiempo real
- [ ] Sistema de reputación
- [ ] Notificaciones push
- [ ] PWA para móvil

### Fase 3: Optimización ⏳
- [ ] Tests unitarios
- [ ] Tests E2E con Playwright
- [ ] Optimización de imágenes
- [ ] Caching strategies

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propietario.

## 📞 Contacto

- **Email**: contacto@cubaprop.com
- **Teléfono**: +53 7 123 4567
- **Ubicación**: La Habana, Cuba

---

Hecho con ❤️ para Cuba
