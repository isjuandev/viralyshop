import { ShieldCheck, CreditCard, Truck } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 surface-1">
      {/* Trust strip */}
      <div className="border-b border-border/30 bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-electric" />
            Pago 100% seguro — SSL
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="size-4 text-electric" />
            Tarjeta, PayPal, cuotas sin interés
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="size-4 text-electric" />
            Envío gratis en pedidos dobles
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-black text-primary-foreground">P</span>
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                PAW<span className="text-electric">LUX</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Transformamos los paseos de miles de dueños de perros. Diseñado con pasión para quienes exigen lo mejor.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 PawLux. Todos los derechos reservados.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">Producto</h4>
            <nav className="flex flex-col gap-2">
              {["Características", "Cómo funciona", "Comparación", "Reseñas"].map((item) => (
                <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Soporte */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">Soporte</h4>
            <nav className="flex flex-col gap-2">
              {["Preguntas frecuentes", "Política de devolución", "Seguimiento de pedido", "Contáctanos"].map((item) => (
                <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">Contacto</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>hola@pawlux.com</p>
              <p>Lun–Vie · 9am–7pm</p>
              <p>Respuesta en &lt;2 horas</p>
            </div>
            <div className="mt-2 flex gap-3">
              {["TikTok", "Instagram", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="rounded-lg border border-border/50 px-2.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-electric"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/30 pt-8">
          <p className="text-xs text-muted-foreground">
            Diseñado para dueños que quieren lo mejor para sus perros.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacidad</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
