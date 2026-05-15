import { Star, ChevronDown, ShieldCheck, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroSectionProps {
  onCTAClick?: () => void
}

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-background">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 50%, oklch(0.62 0.22 253 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 sm:px-6 md:flex-row md:gap-12 md:py-24">
        {/* Left — Copy */}
        <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
          <Badge
            variant="outline"
            className="border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-electric"
          >
            ⚡ La correa que cambia todo
          </Badge>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Paseos{" "}
            <span className="text-gradient-electric">sin enredos.</span>
            <br />
            Control total.
            <br />
            Siempre.
          </h1>

          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            La primera correa retráctil de doble tracción con sistema anti-enredos. Diseñada para dueños que exigen lo mejor para sus perros — y para ellos mismos.
          </p>

          {/* Stars row */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9</span>
            <span className="text-sm text-muted-foreground">— +2,400 reseñas verificadas</span>
          </div>

          {/* CTA */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-14 w-full flex-1 bg-primary text-base font-bold text-primary-foreground glow-electric transition-all hover:scale-[1.02] hover:opacity-90 sm:w-auto"
              onClick={onCTAClick}
            >
              Conseguir mi PawLux — $49.99
            </Button>
            <p className="text-center text-xs text-muted-foreground sm:text-left">
              ✓ Stock limitado
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Truck className="size-3.5 text-electric" />
              Envío gratis +$60
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RotateCcw className="size-3.5 text-electric" />
              30 días garantía
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-electric" />
              Pago 100% seguro
            </div>
          </div>
        </div>

        {/* Right — Product Image */}
        <div className="relative flex flex-1 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, oklch(0.62 0.22 253 / 0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border/30 surface-1 sm:max-w-md">
            <img
              src="/hero-product.webp"
              alt="PawLux — Correa retráctil premium para perros"
              className="h-full w-full object-cover"
            />
            {/* Price badge floating */}
            <div className="absolute bottom-4 left-4 rounded-xl border border-border/50 bg-background/90 px-4 py-2.5 backdrop-blur-md">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-foreground">$49.99</span>
                <span className="text-sm text-muted-foreground line-through">$79.99</span>
                <span className="ml-1 rounded bg-primary/20 px-1.5 py-0.5 text-xs font-bold text-electric">-37%</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">Oferta por tiempo limitado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="size-5 text-muted-foreground" />
      </div>
    </section>
  )
}
