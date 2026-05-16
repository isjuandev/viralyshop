import { useState } from "react"
import { ShoppingCart, Zap, CircleCheck as CheckCircle2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUNDLE_PRICING } from "../utils/pricing"

const bundles = [
  {
    id: "single",
    name: "Pack Básico",
    qty: "1 PawLux",
    originalPrice: BUNDLE_PRICING.single.originalPrice,
    savingsPct: BUNDLE_PRICING.single.savingsPct,
    units: 1,
    popular: false,
    badge: null,
    perks: ["Sistema anti-enredos", "Freno instantáneo", "Garantía 30 días", "Envío en 24-48h"],
    color: "default" as const,
  },
  {
    id: "double",
    name: "Pack Doble",
    qty: "2 PawLux",
    originalPrice: BUNDLE_PRICING.double.originalPrice,
    savingsPct: BUNDLE_PRICING.double.savingsPct,
    units: 2,
    popular: true,
    badge: "MÁS VENDIDO",
    perks: [
      "2× Sistema anti-enredos",
      "2× Freno instantáneo",
      "Garantía 30 días",
      "Envío GRATIS express",
      "Funda protectora de regalo",
    ],
    color: "electric" as const,
  },
]

interface BundleSectionProps {
  onAddToCart?: (bundleId: string) => void
}

export function BundleSection({ onAddToCart }: BundleSectionProps) {
  const [selected, setSelected] = useState("double")

  const computedBundles = bundles.map((bundle) => {
    const price = Math.round(bundle.originalPrice * (1 - bundle.savingsPct / 100))
    const savings = bundle.originalPrice - price
    const perUnit = price / bundle.units
    return { ...bundle, price, savings, perUnit }
  })

  const selectedBundle = computedBundles.find((b) => b.id === selected)!

  return (
    <section id="bundle" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">Oferta especial</span>
        </div>
        <h2 className="mb-3 text-center text-3xl font-black tracking-tight text-balance sm:text-4xl">
          Elige tu pack y{" "}
          <span className="text-gradient-electric">ahorra más</span>
        </h2>
        <p className="mx-auto mb-12 max-w-md text-center text-base text-muted-foreground">
          Cuántos más pidas, más ahorras. El Pack Doble es lo que la mayoría elige — y con razón.
        </p>

        {/* Urgency bar */}
        <div className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-center">
          <Zap className="size-4 shrink-0 text-destructive" />
          <p className="text-sm font-medium text-foreground">
            <span className="font-bold text-destructive">¡Últimas 47 unidades disponibles!</span>{" "}
            Este precio termina hoy a medianoche.
          </p>
        </div>

        {/* Bundle options */}
        <div className="grid gap-4 sm:grid-cols-2">
          {computedBundles.map((bundle) => (
            <button
              key={bundle.id}
              onClick={() => setSelected(bundle.id)}
              className={`relative flex flex-col rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                selected === bundle.id
                  ? bundle.popular
                    ? "border-primary glow-electric surface-1"
                    : "border-primary/50 surface-1"
                  : "border-border/40 bg-background opacity-80 hover:border-border hover:opacity-100"
              }`}
            >
              {bundle.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                      bundle.popular
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {bundle.badge}
                  </span>
                </div>
              )}

              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {bundle.name}
                  </p>
                  <p className="mt-0.5 text-base font-bold text-foreground">{bundle.qty}</p>
                </div>
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected === bundle.id ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {selected === bundle.id && <div className="size-2 rounded-full bg-white" />}
                </div>
              </div>

              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-3xl font-black text-foreground">${bundle.price}</span>
                <span className="text-sm text-muted-foreground line-through">${bundle.originalPrice}</span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">
                ${bundle.perUnit.toFixed(2)} por unidad · Ahorras ${bundle.savings}
              </p>

              <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5">
                <Package className="size-3 text-electric" />
                <span className="text-xs font-semibold text-electric">-{bundle.savingsPct}% descuento</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected bundle perks + CTA */}
        <div className="mt-8 rounded-2xl border border-primary/30 surface-1 p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {selectedBundle.name} — {selectedBundle.qty}
              </h3>
              <p className="text-sm text-muted-foreground">Incluye todo esto:</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-foreground">${selectedBundle.price}</span>
                <span className="text-sm text-muted-foreground line-through">${selectedBundle.originalPrice}</span>
              </div>
              <p className="text-sm font-semibold text-electric">Ahorras ${selectedBundle.savings}</p>
            </div>
          </div>

          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {selectedBundle.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 shrink-0 text-electric" />
                {perk}
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="h-14 w-full bg-primary text-base font-bold text-primary-foreground glow-electric transition-all hover:scale-[1.01] hover:opacity-90"
            onClick={() => onAddToCart?.(selected)}
          >
            <ShoppingCart className="mr-2 size-5" />
            Agregar al Carrito — ${selectedBundle.price}
          </Button>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              🔒 Pago 100% seguro — SSL
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              🔄 30 días de devolución gratuita
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              ⚡ Despacho en 24-48h
            </p>
          </div>
        </div>

        {/* Bundle image */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/30">
          <img
            src="/product-bundle.webp"
            alt="Pack PawLux — Variantes disponibles"
            className="h-48 w-full object-cover sm:h-56"
          />
        </div>
      </div>
    </section>
  )
}
