import { Shield, Zap, Link2Off, Dumbbell, RotateCcw, Smartphone } from "lucide-react"

const features = [
  {
    icon: Link2Off,
    title: "Sistema Anti-Enredos",
    description: "Cable trenzado con guía de acero inoxidable. Nunca más nudos, nunca más interrupciones.",
    highlight: "Patentado",
  },
  {
    icon: Zap,
    title: "Freno Instantáneo 360°",
    description: "Un solo clic bloquea la correa al instante. Control total en menos de 0.3 segundos.",
    highlight: "0.3 seg",
  },
  {
    icon: Dumbbell,
    title: "Doble Tracción Reforzada",
    description: "Soporta hasta 80kg de fuerza. Diseñada para las razas más grandes y enérgicas.",
    highlight: "Hasta 80kg",
  },
  {
    icon: Shield,
    title: "Resistencia Premium",
    description: "Cuerpo en ABS militar + cable de acero recubierto. Aguanta lluvia, polvo y UV.",
    highlight: "Indestructible",
  },
  {
    icon: RotateCcw,
    title: "Para Dos Perros",
    description: "Sistema de doble clip independiente. Cada perro tiene su propio sistema de control.",
    highlight: "Único en el mercado",
  },
  {
    icon: Smartphone,
    title: "Agarre Ergonómico",
    description: "Mango anatómico con grip antideslizante. Paseos largos sin dolor de muñeca.",
    highlight: "Diseño ergonómico",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 surface-1 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">Por qué PawLux</span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Tecnología diseñada para{" "}
          <span className="text-gradient-electric">paseos perfectos</span>
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
          No es solo una correa. Es el sistema completo de control y seguridad que tú y tu perro merecen.
        </p>

        {/* Product detail image */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-border/30">
          <img
            src="/product-detail.webp"
            alt="Detalle técnico del sistema anti-enredos PawLux"
            className="h-56 w-full object-cover sm:h-72"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, highlight }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border/40 surface-2 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              style={{ "--tw-shadow-color": "oklch(0.62 0.22 253 / 0.1)" } as React.CSSProperties}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.62 0.22 253 / 0.06) 0%, transparent 70%)" }} />

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-electric" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-electric">
                    {highlight}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
