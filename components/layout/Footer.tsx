import Link from "next/link";
import { Home, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, navigationConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-noche text-arena">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sol to-oro">
                <Home className="h-6 w-6 text-noche" />
              </div>
              <span className="text-xl font-bold font-playfair">
                CubaProp
              </span>
            </Link>
            <p className="text-sm text-arena/70">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {navigationConfig.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-arena/70 hover:text-sol transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-arena/70 hover:text-sol transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-arena/70 hover:text-sol transition-colors"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-arena/70 hover:text-sol transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-sol" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-arena/70 hover:text-sol transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-sol" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-arena/70 hover:text-sol transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-sol" />
                <span className="text-sm text-arena/70">
                  La Habana, Cuba
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-arena/20 text-center">
          <p className="text-sm text-arena/70">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
