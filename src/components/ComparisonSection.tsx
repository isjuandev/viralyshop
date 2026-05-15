import { CircleCheck as CheckCircle2, Circle as XCircle } from "lucide-react"

const rows = [
  { feature: "Sistema anti-enredos", pawlux: true, normal: false },
  { feature: "Doble tracción (2 perros)", pawlux: true, normal: false },
  { feature: "Freno de bloqueo instantáneo", pawlux: true, normal: false },
  { feature: "Resistencia 80kg", pawlux: true, normal: false },
  { feature: "Cable de acero reforzado", pawlux: true, normal: false },
  { feature: "Agarre ergonómico anti-slip", pawlux: true, normal: false },
  { feature: "Resistente al agua y UV", pawlux: true, normal: false },
  { feature: "Garantía 30 días", pawlux: true, normal: false },
  { feature: "Precio justo", pawlux: true, normal: true },
]

export function ComparisonSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">Comparación</span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-balance sm:text-4xl">
          PawLux vs. Correa Normal
        </h2>
        <p className="mx-auto mb-12 max-w-md text-center text-base text-muted-foreground">
          La diferencia es obvia. Pero son los detalles los que hacen que miles de dueños no vuelvan atrás.
        </p>

        <div className="overflow-hidden rounded-2xl border border-border/40">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-border/40 surface-2">
            <div className="p-4 text-sm font-semibold text-muted-foreground">Característica</div>
            <div className="flex items-center justify-center border-l border-border/40 p-4">
              <span className="rounded-lg bg-primary/15 px-3 py-1 text-sm font-black text-electric">PawLux</span>
            </div>
            <div className="flex items-center justify-center border-l border-border/40 p-4">
              <span className="text-sm font-medium text-muted-foreground">Correa normal</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map(({ feature, pawlux, normal }, idx) => (
            <div
              key={feature}
              className={`grid grid-cols-3 border-b border-border/30 last:border-b-0 transition-colors ${
                idx % 2 === 0 ? "surface-1" : "bg-background"
              }`}
            >
              <div className="p-4 text-sm text-foreground">{feature}</div>
              <div className="flex items-center justify-center border-l border-border/30 p-4">
                {pawlux ? (
                  <CheckCircle2 className="size-5 text-electric" />
                ) : (
                  <XCircle className="size-5 text-destructive/60" />
                )}
              </div>
              <div className="flex items-center justify-center border-l border-border/30 p-4">
                {normal ? (
                  <CheckCircle2 className="size-5 text-muted-foreground" />
                ) : (
                  <XCircle className="size-5 text-destructive/60" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border/30">
          <img
            src="/comparison.webp"
            alt="Comparación visual: correa enredada vs PawLux organizada"
            className="h-48 w-full object-cover sm:h-64"
          />
        </div>
      </div>
    </section>
  )
}
