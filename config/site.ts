// Configuración del sitio
export const siteConfig = {
  name: "CubaProp",
  description: "Compra, Venta y Alquiler de Casas en Cuba",
  url: "https://cubaprop.com",
  ogImage: "https://cubaprop.com/og.jpg",
  author: "@CubaProp",
  twitterHandle: "@CubaProp",
  githubHandle: "@CubaProp",
  email: "contacto@cubaprop.com",
  phone: "+53 7 123 4567",
} as const;

// Metadatos
export const metadataConfig = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "casas en cuba",
    "alquiler cuba",
    "propiedades cuba",
    "real estate cuba",
    "casas la habana",
    "alquiler varadero",
    "propiedades trinidad",
    "inmobiliaria cuba",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
} as const;

// Navegación
export const navigationConfig = {
  main: [
    { label: "Inicio", href: "/" },
    { label: "Buscar", href: "/search" },
    { label: "Acerca", href: "/about" },
    { label: "Contacto", href: "/contact" },
  ],
  auth: [
    { label: "Iniciar Sesión", href: "/login" },
    { label: "Registrarse", href: "/register" },
  ],
  dashboard: [
    { label: "Mi Perfil", href: "/dashboard/profile" },
    { label: "Mis Propiedades", href: "/dashboard/my-properties" },
    { label: "Favoritos", href: "/dashboard/favorites" },
    { label: "Mensajes", href: "/dashboard/messages" },
  ],
} as const;
