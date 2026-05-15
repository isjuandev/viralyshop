import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "María G.",
    location: "Buenos Aires",
    date: "Hace 3 días",
    rating: 5,
    title: "Cambió completamente mis paseos",
    text: "Tengo dos golden retrievers y antes los paseos eran un caos total. Con PawLux los llevo a los dos sin ningún enredo. El freno es increíble — reacciona al instante cuando uno quiere correr. Jamás vuelvo a comprar una correa barata.",
    verified: true,
    product: "PawLux Doble — Negro",
  },
  {
    name: "Carlos R.",
    location: "Medellín",
    date: "Hace 1 semana",
    rating: 5,
    title: "La mejor compra que hice para mi perro",
    text: "Mi pastor alemán pesa 45kg y jalaba muchísimo. Con esta correa el control es total. El cable no se enreda nunca, el mango no me lastima y se nota que es de buena calidad. Vale cada centavo. Lo recomiendo 100%.",
    verified: true,
    product: "PawLux XL — Negro",
  },
  {
    name: "Ana P.",
    location: "Ciudad de México",
    date: "Hace 2 semanas",
    rating: 5,
    title: "Finalmente paseos relajados",
    text: "Llevaba años luchando con correas baratas que se enredaban. Esta es completamente diferente. El sistema anti-enredos funciona de verdad. Mi perro y yo llegamos a casa relajados. El diseño también es muy elegante.",
    verified: true,
    product: "PawLux Standard — Negro",
  },
  {
    name: "Roberto M.",
    location: "Santiago de Chile",
    date: "Hace 3 semanas",
    rating: 5,
    title: "Superó todas mis expectativas",
    text: "Dudé al principio por el precio, pero después del primer paseo entendí por qué vale más. La diferencia con cualquier otra correa es brutal. El mecanismo de bloqueo me salva la vida cuando hay autos. 5 estrellas sin dudarlo.",
    verified: true,
    product: "PawLux Standard — Negro",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 surface-1 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">Reseñas reales</span>
        </div>
        <h2 className="mb-3 text-center text-3xl font-black tracking-tight text-balance sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>

        {/* Overall rating */}
        <div className="mb-12 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-black text-foreground">4.9</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Basado en 2,400+ reseñas verificadas</span>
            </div>
          </div>
          {/* Rating bars */}
          <div className="mt-2 flex w-full max-w-xs flex-col gap-1.5">
            {[
              { stars: 5, pct: 87 },
              { stars: 4, pct: 9 },
              { stars: 3, pct: 3 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 0 },
            ].map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 text-right">{stars}</span>
                <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-yellow-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-7 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/40 surface-2 p-6"
            >
              <Quote className="absolute right-4 top-4 size-8 text-primary/10" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-electric">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{review.name}</span>
                      {review.verified && (
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-electric">
                          ✓ Verificado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{review.location} · {review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <div>
                <p className="mb-1.5 text-sm font-semibold text-foreground">{review.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{review.text}</p>
              </div>
              <p className="text-xs text-muted-foreground">Producto: {review.product}</p>
            </div>
          ))}
        </div>

        {/* UGC prompt */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-border/30">
          <img
            src="/social-proof.webp"
            alt="Clientes satisfechos paseando con PawLux"
            className="h-48 w-full object-cover sm:h-64"
          />
          <div className="surface-2 p-6 text-center">
            <p className="text-sm font-semibold text-foreground">
              Más de 18,000 dueños ya disfrutan paseos perfectos con PawLux
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Únete a la comunidad — comparte tu experiencia con #PawLux
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
