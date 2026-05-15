import { Circle as XCircle, CircleCheck as CheckCircle2 } from "lucide-react"

const problems = [
  "Correas que se enredan a los 10 segundos de salir",
  "Tirones constantes que lastiman tu muñeca",
  "Pasear dos perros se convierte en un caos",
  "Correas baratas que se rompen sin aviso",
  "Sin control real cuando tu perro ve una ardilla",
  "Llegás a casa agotado en vez de relajado",
]

const solutions = [
  "Sistema anti-enredos patentado — nunca más un nudo",
  "Doble agarre ergonómico que absorbe el jalón",
  "Diseñada especialmente para dos perros al mismo tiempo",
  "Acero reforzado + nylon premium — dura años",
  "Freno de bloqueo instantáneo a 360° — tú mandes",
  "Paseos relajados que fortalecen el vínculo con tu perro",
]

export function ProblemSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section label */}
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">El Problema</span>
        </div>

        <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
          ¿Cansar de pasear a tu perro se siente así?
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
          Si alguna de estas situaciones te suena familiar, no estás solo. El 87% de los dueños de perros reporta al menos 3 de estos problemas a la semana.
        </p>

        {/* Lifestyle image */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-border/30">
          <img
            src="/lifestyle-walk.webp"
            alt="Dueños de perros disfrutando paseos organizados con PawLux"
            className="h-64 w-full object-cover sm:h-80 md:h-96"
          />
        </div>

        {/* Problem vs Solution grid */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {/* Problems */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
              <XCircle className="size-5 text-destructive" />
              Sin PawLux (lo que vives hoy)
            </h3>
            <ul className="flex flex-col gap-3">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-destructive/60" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
              <CheckCircle2 className="size-5 text-electric" />
              Con PawLux (lo que mereces)
            </h3>
            <ul className="flex flex-col gap-3">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-electric" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
