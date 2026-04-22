# Sprints Frontend — AlmaCuba

**Objetivo**: Elevar el frontend existente (funcional pero básico) al nivel de los diseños en Stitch.
**App**: AlmaCuba (antes CubaProp)
**Referencia visual**: Proyecto Stitch `9228106374165777641` — "Remix of Cuba Property Hub"
**Stack**: Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · Framer Motion 12

---

## Estado Base

El proyecto tiene estructura y rutas completas (17 páginas, 35+ componentes) pero los componentes actuales son esqueletos funcionales. Los diseños de Stitch muestran una app significativamente más sofisticada.

---

## Sprint 0 — Design System (Fundación)

**Objetivo**: Establecer los tokens y componentes base que todos los sprints van a usar.
**Pantallas Stitch de referencia**: PRD · Discovery & Filters (Desktop)

### Tareas

- [ ] Auditar `globals.css` y actualizar tokens CSS con la paleta exacta de Stitch
- [ ] Refactorizar `button.tsx` — variantes golden, ghost, outline con estados hover precisos
- [ ] Crear `badge.tsx` — "Nuevo", "Oferta", "Destacado", "Verificado"
- [ ] Crear `avatar.tsx` — con fallback y badge de verificación
- [ ] Crear `separator.tsx` — componente para divisores sutiles
- [ ] Actualizar tipografía — Playfair Display para headlines, Geist para body
- [ ] Crear `PropertyCardSkeleton.tsx` — skeleton preciso por card
- [ ] Documentar tokens en `.atl/design-system.md`

**Criterio de done**: Storybook mental — cada componente tiene sus variantes y estados correctos.

---

## Sprint 1 — Home & Hero

**Objetivo**: Landing page de nivel competitivo internacional.
**Pantallas Stitch de referencia**: Home & Búsqueda (Mobile)
**Archivo**: `app/page.tsx` · `components/features/search/HeroSection.tsx`

### Tareas

- [ ] Rediseñar `HeroSection.tsx` — imagen de fondo Cuba, overlay gradiente, búsqueda flotante
- [ ] Implementar barra de búsqueda inteligente — tipo, provincia, precio, con autocompletar desde `cuba-locations.ts`
- [ ] Rediseñar `PropertyCard.tsx` — imagen grande, glassmorphism, badges animados, precio en CUP/USD
- [ ] Rediseñar `FeaturedProperties.tsx` — grid responsive con animación staggered Framer Motion
- [ ] Rediseñar `PopularLocations.tsx` — cards de provincias con foto y contador de propiedades
- [ ] Agregar sección "¿Cómo funciona?" — 3 pasos con iconos animados
- [ ] Agregar sección "Stats" — número de propiedades, usuarios, provincias
- [ ] Asegurar responsive perfecto — mobile primero, desktop a 1280px+

**Criterio de done**: Home carga en < 3s, score Lighthouse > 90, responsive sin scroll horizontal.

---

## Sprint 2 — Explorar Propiedades

**Objetivo**: Página de búsqueda y listado de nivel profesional.
**Pantallas Stitch de referencia**: Explorar Propiedades Cuba · Explorar Propiedades Pro · Discovery & Filters (Desktop) · Explorar Propiedades (Desktop) · Filtros Avanzados
**Archivos**: `app/(properties)/search/` · `components/features/search/`

### Tareas

- [ ] Rediseñar layout — sidebar de filtros colapsable (desktop) / drawer (mobile)
- [ ] Refactorizar `SearchFilters.tsx` — filtros: tipo, provincia, municipio, precio (slider), habitaciones, baños, amenities
- [ ] Implementar toggle vista Grid / Lista en resultados
- [ ] Agregar ordenamiento — precio ↑↓, fecha, relevancia
- [ ] Crear `PropertyListItem.tsx` — variante horizontal para vista lista
- [ ] Crear `FilterChip.tsx` — chips activos con X para remover filtro
- [ ] Implementar `useSearch.ts` — sincronizar filtros con URL params
- [ ] Agregar mapa placeholder — área reservada para cuando se integre Mapbox
- [ ] Paginación — infinite scroll o paginación numérica

**Criterio de done**: Filtros funcionan en tiempo real, URL refleja el estado, mobile drawer se cierra al aplicar.

---

## Sprint 3 — Detalle de Propiedad

**Objetivo**: Página de detalle que vende la propiedad.
**Pantallas Stitch de referencia**: Detalle de Propiedad · Detalle de Propiedad Pro · Detalle Auténtico · Detalle de Propiedad (Desktop) · Detalle Editorial (Desktop)
**Archivos**: `app/(properties)/property/[id]/` · `components/features/properties/PropertyDetail.tsx`

### Tareas

- [ ] Galería de imágenes — carrusel fullscreen con miniaturas
- [ ] Header sticky con precio y CTA "Contactar" al hacer scroll
- [ ] Sección de amenities — iconos con grid responsive
- [ ] Calculadora de booking — check-in/check-out, número de huéspedes, total
- [ ] Widget de ubicación — mapa estático con placeholder
- [ ] Sección del gestor/anunciante — avatar, badge verificado, rating, botón chat
- [ ] Propiedades similares — carrusel horizontal al final
- [ ] Breadcrumb — Home > Search > Propiedad
- [ ] Share — copiar link, compartir

**Criterio de done**: Detalle carga con skeleton, galería funciona en mobile con swipe, CTA siempre visible.

---

## Sprint 4 — Comparador de Propiedades

**Objetivo**: Feature diferenciadora — ninguna plataforma cubana tiene esto.
**Pantallas Stitch de referencia**: Comparador de Propiedades · Selección para Comparar · Comparador Técnico (Desktop) · Comparador Premium (Desktop) · Listado y Comparación
**Archivos**: `app/(properties)/compare/` (nuevo) · `components/features/properties/`

### Tareas

- [ ] Crear ruta `app/(properties)/compare/page.tsx`
- [ ] Crear `PropertyComparator.tsx` — tabla comparativa hasta 3 propiedades
- [ ] Crear `CompareSelector.tsx` — modal para seleccionar propiedades a comparar
- [ ] Agregar botón "Comparar" en `PropertyCard.tsx` con estado seleccionado
- [ ] Crear `useComparator.ts` hook — gestión de hasta 3 propiedades seleccionadas
- [ ] Bar flotante "Comparar (N)" — aparece al seleccionar ≥ 2 propiedades
- [ ] Vista comparativa — columnas lado a lado: precio, m², habitaciones, baños, amenities
- [ ] Highlight de mejor valor por categoría

**Criterio de done**: Usuario puede comparar 2-3 propiedades, la tabla es legible en mobile (scroll horizontal), highlight funciona.

---

## Sprint 5 — Perfiles de Gestor

**Objetivo**: Credibilidad y profesionalismo para los anunciantes.
**Pantallas Stitch de referencia**: Perfil de Gestor / Grupo · Perfil de Gestor Profesional (Desktop) · Portfolio de Gestor (Desktop)
**Archivos**: `app/(properties)/agent/[id]/` (nuevo) · `components/features/`

### Tareas

- [ ] Crear ruta `app/(properties)/agent/[id]/page.tsx`
- [ ] Crear `AgentProfile.tsx` — foto, nombre, bio, stats, propiedades activas
- [ ] Crear `AgentStats.tsx` — propiedades publicadas, tiempo en plataforma, rating
- [ ] Crear `AgentPropertyGrid.tsx` — grid de propiedades del gestor
- [ ] Badge de verificación — gestor verificado vs. particular
- [ ] Botón "Contactar gestor" — abre chat o formulario
- [ ] Vincular desde `PropertyDetail.tsx` — sección del gestor clickeable

**Criterio de done**: Perfil de gestor accesible desde detalle, datos consistentes, responsive.

---

## Sprint 6 — Dashboard Refinado

**Objetivo**: Área privada funcional y profesional para gestores/usuarios.
**Archivos**: `app/(dashboard)/` · `components/layout/DashboardLayout.tsx`

### Tareas

- [ ] Rediseñar `DashboardLayout.tsx` — sidebar con iconos, collapsed en mobile
- [ ] Refactorizar `app/(dashboard)/my-properties/` — tabla de propiedades con estado (activa/pausada/borrador)
- [ ] Refactorizar `app/(dashboard)/profile/` — avatar upload placeholder, formulario completo
- [ ] Rediseñar `app/(dashboard)/favorites/` — grid igual que search
- [ ] Rediseñar `app/(dashboard)/messages/` — lista de conversaciones + chat window
- [ ] Refactorizar `PropertyForm.tsx` — wizard de 3 pasos (datos básicos, fotos, detalles)
- [ ] Estadísticas básicas — vistas, contactos recibidos, favoritos por propiedad

**Criterio de done**: Dashboard navegable, forms no pierden estado al navegar entre pasos, mobile usable.

---

## Sprint 7 — Auth UI

**Objetivo**: Flujos de autenticación pulidos, listos para conectar con NextAuth.
**Archivos**: `app/(auth)/` · `components/features/auth/`

### Tareas

- [ ] Rediseñar `/login` — split screen (imagen Cuba izquierda, form derecha en desktop)
- [ ] Rediseñar `/register` — mismo split, wizard de 2 pasos (cuenta + perfil)
- [ ] Agregar "Continuar con Google" — botón placeholder
- [ ] Validación en tiempo real — feedback inmediato por campo
- [ ] Estado loading en botones de submit
- [ ] Redirect lógico — después de login va al dashboard o a donde intentaba ir

**Criterio de done**: Login/register pasan Lighthouse accesibilidad > 95, funciona con teclado.

---

## Sprint 8 — Performance & Polish

**Objetivo**: Prod-ready. Animaciones refinadas, métricas, detalles finales.

### Tareas

- [ ] Auditar animaciones — revisar que todas usen `will-change` correcto, no causen layout shift
- [ ] Lazy loading en imágenes — Next.js `Image` con blur placeholder
- [ ] Optimizar fuentes — `next/font` con `display: swap`
- [ ] Revisar accesibilidad — aria-labels, focus visible, contraste
- [ ] Agregar `not-found.tsx` con diseño consistente
- [ ] Error boundaries en rutas críticas
- [ ] Pruebas de smoke — verificar que todas las rutas cargan sin errores
- [ ] Actualizar `PROJECT_STATUS.md`

**Criterio de done**: Lighthouse > 90 en todas las categorías, 0 errores de consola en producción.

---

## Orden de Ejecución Recomendado

```
S0 → S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8
```

**S4 (Comparador)** puede paralelizarse con S5 si hay capacidad.

---

## Archivos Stitch por Sprint

| Sprint | IDs de Pantallas Stitch |
|--------|------------------------|
| S1 | `616c19cb3d1c442b8b684961213de394` |
| S2 | `41f2788490e24fb0821c44fd775bd55b` · `c2871597a3594356aeaca1dd1f0e9d75` · `938d1d7ae7e24d97929ded5de1790e47` · `93a9d9f4fe904ebfb6b13cf6ac38b386` · `9ce0343235224e5fba6123df39c03199` |
| S3 | `115c1d645b7441d293291aa6f3cbfe2c` · `d50cc582d6f0410ba2a965b595fedb2a` · `d089fac4586649d4a8fbfa58a57c7237` · `ca3fe96beeca4945bdab1966f50ab859` · `7fb67a7cd4344a6bb3d9aad62aa1809e` |
| S4 | `80ec660c36ed49a084114ef745e0cc37` · `5b558847dfb247ba876b87d0203cff5e` · `a5ae0325decc48148e538b91c23af324` · `aa1b22ff286f40a283951e4a0bb62a01` · `8d8add7d69da48eaa38b74fec0b69e1e` |
| S5 | `6c312c2fa59341619aff0d29b667dac5` · `58662c4b9d4e42dcb9a437f8a9ee84fe` · `aee2aadb87a94de69c55693f07170f08` |
