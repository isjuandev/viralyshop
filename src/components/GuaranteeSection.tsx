import { ShieldCheck, RotateCcw, Truck, Award } from "lucide-react"

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Garantía de 30 días",
    description: "Si no estás 100% satisfecho, te devolvemos cada centavo. Sin preguntas, sin trámites complicados.",
  },
  {
    icon: RotateCcw,
    title: "Devolución gratuita",
    description: "¿No es lo que esperabas? Te enviamos la etiqueta de devolución sin costo adicional.",
  },
  {
    icon: Truck,
    title: "Envío rápido garantizado",
    description: "Todos los pedidos salen en 24 horas. Recibes tu PawLux en 1-3 días hábiles.",
  },
  {
    icon: Award,
    title: "Garantía de calidad",
    description: "Cada PawLux pasa por 23 controles de calidad antes de llegar a tus manos.",
  },
]

export function GuaranteeSection() {
  return (
    <section className="py-20 surface-1 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero guarantee */}
        <div className="mb-16 flex flex-col items-center gap-6 rounded-2xl border border-primary/30 p-8 text-center sm:p-12"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.62 0.22 253 / 0.06) 0%, transparent 70%)" }}>
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/15 glow-electric-sm">
            <ShieldCheck className="size-10 text-electric" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-electric">Nuestra promesa</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl">
              Te devolvemos el dinero
              <br />
              si no quedas satisfecho
            </h2>
            <p className="mx-auto max-w-lg text-base text-muted-foreground sm:text-lg">
              Creemos tanto en PawLux que te damos 30 días completos para probarlo. Si no transforma tus paseos, te devolvemos el dinero al instante — sin complicaciones.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-black text-electric">30</div>
              <div className="text-sm text-muted-foreground">días de garantía</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-electric">100%</div>
              <div className="text-sm text-muted-foreground">reembolso</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-electric">0</div>
              <div className="text-sm text-muted-foreground">preguntas</div>
            </div>
          </div>
        </div>

        {/* Guarantee grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-3 rounded-2xl border border-border/40 surface-2 p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="size-6 text-electric" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
