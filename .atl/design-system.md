# Design System — AlmaCuba

> **Sprint 0 completado** — Tokens ampliados, componentes base creados.

## Filosofía Visual

Editorial caribeño. Elegante sin ser frío. Cálido sin ser folklorista. Cada pantalla debe sentirse como una publicación de lujo sobre Cuba — no como un portal de avisos.

**Reglas clave:**
- Sin borders explícitas entre secciones — usar cambios de `surface-container`
- Shadows tintadas con el color de marca (no negras)
- Glassmorphism solo en elementos flotantes (header sticky, modals)
- Playfair Display para headlines, Geist Sans para todo lo demás

## Paleta de Colores

| Token CSS | Hex | Nombre | Uso |
|-----------|-----|--------|-----|
| `--color-sol` | `#F9A03F` | Sol | Primary, CTAs, botones principales |
| `--color-noche` | `#1E3D58` | Noche | Texto, fondos dark, nav |
| `--color-arena` | `#F7F4EA` | Arena | Background light, superficies base |
| `--color-oro` | `#D4AF37` | Oro | Acentos, gradientes premium |
| `--color-coral` | `#E8604C` | Coral | Destructive, ofertas, urgencia |
| `--color-caribe` | `#0D9488` | Caribe | Verificado, éxito, badges |
| `--color-palma` | `#16A34A` | Palma | Nuevo, disponible, success |

## Surface Container Hierarchy

Capas de profundidad — sin usar borders, solo cambios de fondo:

| Token | Hex Light | Uso |
|-------|-----------|-----|
| `--surface` | `#F7F4EA` | Canvas base |
| `--surface-bright` | `#FFFFFF` | Máximo contraste |
| `--surface-container-lowest` | `#FFFFFF` | Cards interactivas |
| `--surface-container-low` | `#F2EFE6` | Secciones secundarias |
| `--surface-container` | `#ECE9DF` | Contenedores neutrales |
| `--surface-container-high` | `#E6E3D9` | Overlays suaves |
| `--surface-container-highest` | `#E0DDD3` | Elementos temporales |

## Shadows

| Variable | Uso |
|----------|-----|
| `--shadow-card` | Sombra base de cards (muy sutil) |
| `--shadow-card-hover` | Sombra al hacer hover (tintada con sol) |
| `--shadow-tinted` | CTAs y elementos premium (amber glow) |
| `--shadow-glass` | Headers flotantes y modales |

## Componentes UI (S0)

| Componente | Variantes | Archivo |
|------------|-----------|---------|
| `Button` | default · secondary · outline · ghost · destructive · link · golden · **premium** · **caribe** | `ui/button.tsx` |
| `Badge` | default · outline · success · warning · **premium** · **verified** · **nuevo** · **oferta** · **destacado** | `ui/badge.tsx` |
| `Avatar` | sizes: xs·sm·default·lg·xl·2xl · prop `verified` | `ui/avatar.tsx` |
| `Separator` | horizontal · vertical | `ui/separator.tsx` |
| `PropertyCardSkeleton` | card · list · `PropertyCardSkeletonGrid` | `features/properties/PropertyCardSkeleton.tsx` |

## Tipografía

- **Sans**: Geist (body, UI)
- **Display**: Playfair Display (títulos coloniales, hero)

## Componentes Visuales

- Cards con glassmorphism (`backdrop-blur`) + badge animado "Nuevo"/"Oferta"
- Hero con mapa 3D de Cuba — provincias clickeables
- Formulario de búsqueda flotante que se minimiza al scrollear
- Modo oscuro/claro con toggle persistente

## Variantes de Button (CVA)

`default` | `secondary` | `outline` | `ghost` | `destructive` | `link` | `golden`

## Microinteracciones

- Ripple en botones
- Skeletons en loading states
- Transiciones Framer Motion suaves

## Análisis de Competencia

| Sitio | Problema | Solución CubaProp |
|-------|----------|-------------------|
| Revolico | Diseño caótico, publicidad excesiva | Grid limpio, sin popups |
| Porlalivre | Fotos pequeñas, poca info | Carrusel grande, mapa integrado |
| Cubasita | Mensajería lenta (formularios) | Chat tiempo real con notificaciones |
| InmobiliariaCuba | Sin filtros avanzados | Filtros: precio, habs, baños, antigüedad |
