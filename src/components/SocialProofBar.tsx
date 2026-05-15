import { Star, Users, Package, Award } from "lucide-react"

const stats = [
  { icon: Star, value: "4.9/5", label: "Calificación promedio", sub: "+2,400 reseñas" },
  { icon: Users, value: "18,000+", label: "Dueños felices", sub: "En todo el país" },
  { icon: Package, value: "1 día", label: "Tiempo de entrega", sub: "Envío express" },
  { icon: Award, value: "30 días", label: "Garantía total", sub: "Sin preguntas" },
]

export function SocialProofBar() {
  return (
    <section className="border-y border-border/50 surface-1">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 text-center">
              <Icon className="size-5 text-electric" />
              <div className="text-2xl font-black text-foreground sm:text-3xl">{value}</div>
              <div className="text-xs font-semibold text-foreground sm:text-sm">{label}</div>
              <div className="text-xs text-muted-foreground">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
