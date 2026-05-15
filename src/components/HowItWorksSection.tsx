import { ShoppingCart, PackageOpen, Dog } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: ShoppingCart,
    title: "Pide tu PawLux",
    description: "Elige tu pack, paga de forma segura y tu pedido sale en menos de 24 horas.",
  },
  {
    step: "02",
    icon: PackageOpen,
    title: "Recíbelo en casa",
    description: "Llega en 1-3 días hábiles. Unboxing premium con manual de uso y configuración rápida.",
  },
  {
    step: "03",
    icon: Dog,
    title: "Disfruta el paseo perfecto",
    description: "Desde el primer paseo notarás la diferencia. Sin enredos, sin tirones, solo disfrute.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">Proceso</span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-balance sm:text-4xl">
          3 pasos para el paseo{" "}
          <span className="text-gradient-electric">que mereces</span>
        </h2>
        <p className="mx-auto mb-16 max-w-md text-center text-base text-muted-foreground">
          Sin complicaciones. En menos de 5 minutos ya estarás configurado y listo para salir.
        </p>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line for desktop */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />

          {steps.map(({ step, icon: Icon, title, description }) => (
            <div key={step} className="relative flex flex-col items-center gap-4 text-center">
              {/* Step number bubble */}
              <div className="relative">
                <div className="flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 glow-electric-sm">
                  <Icon className="size-7 text-electric" />
                </div>
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                  {step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
