# AGENTS.md - CubaProp (Compra, Venta y Alquiler de Casas en Cuba)

**Regla prioritaria:** Antes de responder cualquier pregunta sobre el proyecto, el asistente DEBE leer este archivo AGENTS.md completo, analizar el proyecto y basar sus respuestas en él y en los archivos mencionados en este documento, evitando instalaciones inecesarias. 

⚠️ **ANTES DE CODIFICAR**: El asistente debe verificar que existen los siguientes archivos. Si faltan, crearlos en este orden: (1) MCP client, (2) WebSockets, (3) Mapa 3D, (4) Upload images.

## 🎯 Objetivo del Proyecto
Desarrollar una plataforma web cubana de compra, venta y alquiler de propiedades que **destaque visualmente** frente a las opciones existentes (Revolico, Porlalivre, Cubasita, InmobiliariaCuba, etc.) con una experiencia de usuario impecable, autenticación, mensajería entre usuarios y subida de publicaciones.

## 🧠 Stack Tecnológico
- **Frontend**: Next.js 14+ (App Router)
- **Backend**: Next.js API Routes + Server Actions
- **Base de Datos**: MongoDB + Prisma ORM
- **Autenticación**: NextAuth.js (email/contraseña + Google)
- **Estilos**: Tailwind CSS + Shadcn/ui + Framer Motion (microinteracciones)
- **Estado Global**: Zustand (UI, filtros, favoritos) + React Query (cache de datos)
- **Mensajería en Tiempo Real**: WebSockets (Socket.io) o Pusher
- **Imágenes**: Uploadthing o Cloudinary (optimización y lazy loading)
- **Mapa Interactivo**: Mapbox o Leaflet (mapa 3D de Cuba clickeable)
- **Validaciones**: Zod (formularios de publicación y registro)
- **Internacionalización**: next-intl (español cubano + jerga local)
- **Gráficos**: Recharts o Chart.js (mapa de calor de precios por municipio)
- **PWA**: next-pwa (instalable en móvil - 70% tráfico Cuba es Android)
- **MCPs Integrados**: 5 servicios de `casa-alquiler-cubano`
  - `search_properties` - Búsqueda con filtros
  - `get_property_details` - Detalle por ID
  - `calculate_booking_cost` - Costo total de reserva
  - `get_cuba_travel_info` - Información turística
  - `get_availability_calendar` - Calendario de disponibilidad

## 📁 Estructura de Carpetas (Type + Feature)

src/
├── app/ # Next.js App Router
│ ├── (landing)/ # Rutas públicas (home, acerca, contacto)
│ │ └── page.tsx
│ ├── (auth)/ # Autenticación
│ │ ├── login/
│ │ ├── register/
│ │ └── layout.tsx
│ ├── (dashboard)/ # Área privada de usuarios
│ │ ├── profile/
│ │ ├── my-properties/
│ │ ├── favorites/
│ │ ├── messages/
│ │ └── layout.tsx
│ ├── (properties)/ # Búsqueda y detalles públicos
│ │ ├── search/
│ │ ├── property/[id]/
│ │ └── layout.tsx
│ └── layout.tsx
│
├── components/
│ ├── ui/ # Componentes base (Shadcn/ui)
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── input.tsx
│ │ ├── dialog.tsx
│ │ └── ...
│ │
│ ├── features/ # Componentes por funcionalidad
│ │ ├── auth/
│ │ │ ├── LoginForm.tsx
│ │ │ ├── RegisterForm.tsx
│ │ │ └── PhoneVerification.tsx
│ │ │
│ │ ├── properties/
│ │ │ ├── PropertyCard.tsx
│ │ │ ├── PropertyGrid.tsx
│ │ │ ├── PropertyForm.tsx
│ │ │ ├── PropertyDetail.tsx
│ │ │ └── ImageUploader.tsx
│ │ │
│ │ ├── search/
│ │ │ ├── SearchFilters.tsx
│ │ │ ├── SearchBar.tsx
│ │ │ ├── PriceRangeFilter.tsx
│ │ │ └── LocationFilter.tsx
│ │ │
│ │ ├── chat/
│ │ │ ├── ChatList.tsx
│ │ │ ├── ChatWindow.tsx
│ │ │ ├── MessageBubble.tsx
│ │ │ └── ContactShare.tsx
│ │ │
│ │ ├── profile/
│ │ │ ├── UserProfile.tsx
│ │ │ ├── ReputationStars.tsx
│ │ │ └── VerificationBadge.tsx
│ │ │
│ │ ├── favorites/
│ │ │ └── FavoriteButton.tsx
│ │ │
│ │ └── reports/
│ │ └── ReportModal.tsx
│ │
│ └── layout/ # Componentes estructurales
│ ├── Header.tsx
│ ├── Footer.tsx
│ ├── Sidebar.tsx
│ └── MobileNav.tsx
│
├── lib/
│ ├── MongoDB/ # Cliente de MongoDB
│ │ ├── client.ts
│ │ ├── auth.ts
│ │ ├── database.types.ts
│ │ └── realtime.ts
│ │
│ ├── cache/ # Estrategias de caché
│ │ ├── imageCache.ts
│ │ └── searchCache.ts
│ │
│ └── utils/
│ ├── currency.ts # Conversión CUP/USD/MLC
│ ├── formatDate.ts
│ ├── formatPhone.ts
│ └── validators.ts
│
├── hooks/
│ ├── useAuth.ts
│ ├── useProperties.ts
│ ├── useSearch.ts
│ ├── useChat.ts
│ ├── useFavorites.ts
│ └── useLocalStorage.ts
│
├── types/
│ ├── property.types.ts
│ ├── user.types.ts
│ ├── chat.types.ts
│ └── search.types.ts
│
├── styles/
│ ├── globals.css
│ └── theme.css
│
├── config/
│ ├── municipios.ts # Municipios de La Habana
│ ├── provincias.ts # Provincias de Cuba
│ ├── currencies.ts # Configuración de monedas
│ └── site.ts # Metadatos del sitio
│
├── tests/ # Tests unitarios
│ ├── components/
│ ├── hooks/
│ ├── utils/
│ └── setup.ts
│
├── e2e/ # Tests end-to-end (Playwright)
│ ├── home.spec.ts
│ ├── auth.spec.ts
│ ├── search.spec.ts
│ └── chat.spec.ts
│
└── middleware.ts # Protección de rutas

---

## 🔐 Variables de Entorno (.env.local)

<!-- Las variables solo configuralas con se ven a continuacion, despues yo me encargo de completarlas -->

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_aqui

# Google OAuth
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# Base de Datos (MongoDB)
DATABASE_URL="mongodb+srv://usuario:contraseña@cluster.mongodb.net/cubaprop"

# MCPs
NEXT_PUBLIC_MCP_BASE_URL=https://api.casa-alquiler-cubano.com
MCP_API_KEY=tu_api_key

# Upload (Cloudinary/Uploadthing)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
UPLOADTHING_SECRET=xxx

# Pusher (WebSockets)
PUSHER_APP_ID=xxx
PUSHER_KEY=xxx
PUSHER_SECRET=xxx

## 📝 Convenciones de Código

### TypeScript
- **Modo estricto habilitado:** `strict: true` en `tsconfig.json`
- **Tipos explícitos:** Siempre definir tipos para props, state y funciones
- **Interfaces vs Types:** Usar `interface` para objetos/componentes, `type` para uniones y utilitarios
- **Nombres:** PascalCase para componentes, camelCase para funciones/variables, UPPER_CASE para constantes
- **Sin `any`:** Usar `unknown` y type guards cuando sea necesario

```typescript
// Correcto
interface PropertyCardProps {
  property: Property
  onFavorite?: (id: string) => void
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onFavorite }) => {
  const [isLiked, setIsLiked] = useState(false)
  return <div>...</div>
}

// Incorrecto
const propertyCard = (props: any) => { ... }

## 🗺️ Datos de Cuba (Provincias y Municipios)

Incluir archivo `config/cuba-locations.ts` con:

```typescript
export const PROVINCIAS = [
  "Pinar del Río", "Artemisa", "La Habana", "Mayabeque", "Matanzas",
  "Cienfuegos", "Villa Clara", "Sancti Spíritus", "Ciego de Ávila",
  "Camagüey", "Las Tunas", "Holguín", "Granma", "Santiago de Cuba",
  "Guantánamo", "Isla de la Juventud"
]

export const MUNICIPIOS: Record<string, string[]> = {
  "La Habana": ["Playa", "Plaza", "Centro Habana", "La Habana Vieja", "Regla", "Habana del Este", "Guanabacoa", "San Miguel del Padrón", "Diez de Octubre", "Cerro", "Marianao", "La Lisa", "Boyeros", "Arroyo Naranjo", "Cotorro"],
  // ... completar con los 168 municipios de Cuba
}
```

## 🎨 Diseño UI/UX - Diferenciadores frente a webs cubanas

Basado en análisis de competencia (Revolico, Porlalivre, Cubasita, InmobiliariaCuba):

| Sitio | Problema | Solución CubaProp |
|-------|----------|-------------------|
| Revolico | Diseño caótico, publicidad excesiva | Grid limpio, sin popups, cards con gradientes suaves |
| Porlalivre | Fotos pequeñas, poca información | Carrusel grande en detalle, mapa integrado |
| Cubasita | Mensajería lenta (formularios) | Chat en tiempo real con notificaciones |
| InmobiliariaCuba | Sin filtros avanzados | Filtros: precio, habs, baños, antigüedad |

**Elementos visuales obligatorios:**
- Hero con mapa 3D de Cuba (Three.js/Mapbox) - provincias clickeables
- Cards con glassmorphism (backdrop-blur) + badge animado "Nuevo"/"Oferta"
- Paleta: `#F9A03F` (sol), `#1E3D58` (noche), `#F7F4EA` (arena), `#D4AF37` (oro)
- Tipografía: Inter (sans) + Playfair Display (títulos coloniales)
- Microinteracciones: ripple en botones, skeletons, transiciones suaves
- Modo oscuro/claro con toggle
- Formulario de búsqueda flotante que se minimiza al scrollear

## 🔌 MCPs Integrados (leer antes de codificar)

**MCPs disponibles y su función exacta:**

1. `mcp__casa-alquiler-cubano__search_properties`
   - **Función:** Buscar propiedades en alquiler con filtros
   - **Parámetros:** location, minPrice, maxPrice, bedrooms, propertyType
   - **Uso en app:** Página principal de búsqueda + sidebar de filtros

2. `mcp__casa-alquiler-cubano__get_property_details`
   - **Función:** Obtener información detallada de una propiedad por ID
   - **Parámetros:** propertyId (string)
   - **Uso en app:** Página `/properties/[id]` - mostrar descripción, fotos, amenities

3. `mcp__casa-alquiler-cubano__calculate_booking_cost`
   - **Función:** Calcular costo total de reserva (impuestos y tarifas incluidas)
   - **Parámetros:** propertyId, checkIn, checkOut, guests
   - **Uso en app:** Modal de reserva en detalle de propiedad

4. `mcp__casa-alquiler-cubano__get_cuba_travel_info`
   - **Función:** Obtener información turística de destinos cubanos
   - **Parámetros:** destination (provincia o ciudad)
   - **Uso en app:** Widget lateral en landing + tips por provincia

5. `mcp__casa-alquiler-cubano__get_availability_calendar`
   - **Función:** Verificar disponibilidad del calendario por fechas
   - **Parámetros:** propertyId, startDate, endDate
   - **Uso en app:** Calendario interactivo en página de detalle

**Prioridad de ejecución para la IA:**
1. 📖 LEER este archivo completo antes de cualquier respuesta
2. 🔌 Usar los MCPs según la función definida arriba
3. 🎨 Aplicar los elementos de diseño especificados
4. 🇨🇺 Mantener coherencia con el análisis de competencia cubana