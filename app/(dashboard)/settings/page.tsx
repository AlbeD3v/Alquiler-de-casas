import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Globe, DollarSign, Moon, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold font-playfair mb-6">Configuración</h1>
          
          <div className="max-w-3xl space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>Configura cómo recibes notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Notificaciones por Email", desc: "Recibe actualizaciones por correo" },
                  { label: "Notificaciones Push", desc: "Alertas en el navegador" },
                  { label: "Notificaciones SMS", desc: "Mensajes de texto" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx === 0} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sol/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sol"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Preferencias Regionales
                </CardTitle>
                <CardDescription>Idioma, moneda y zona horaria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Idioma</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option>Español</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Moneda</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option>USD ($)</option>
                      <option>CUP (₱)</option>
                      <option>EUR (€)</option>
                      <option>MLC</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Apariencia
                </CardTitle>
                <CardDescription>Personaliza la apariencia de la aplicación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {["Claro", "Oscuro", "Automático"].map((theme, idx) => (
                    <button
                      key={idx}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        idx === 2
                          ? "border-sol bg-sol/10"
                          : "border-border hover:border-sol/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${
                        idx === 0 ? "bg-arena" : idx === 1 ? "bg-noche" : "bg-gradient-to-br from-arena to-noche"
                      }`} />
                      <p className="text-sm font-medium">{theme}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="h-5 w-5" />
                  Zona de Peligro
                </CardTitle>
                <CardDescription>Acciones irreversibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10">
                  <p className="font-medium mb-2">Eliminar Cuenta</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Esta acción eliminará permanentemente tu cuenta y todos tus datos.
                  </p>
                  <Button variant="destructive" size="sm">
                    Eliminar mi cuenta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
