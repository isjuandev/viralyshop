import { useState, useEffect } from "react"
import { ShoppingCart, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickyCartProps {
  onAddToCart?: () => void
}

export function StickyCart({ onAddToCart }: StickyCartProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed && window.scrollY > 600) {
        setVisible(true)
      } else if (window.scrollY <= 600) {
        setVisible(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [dismissed])

  if (dismissed || !visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 px-4 py-3 backdrop-blur-xl sm:hidden">
      <div className="mx-auto flex max-w-sm items-center gap-3">
        {/* Product mini info */}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-xs font-bold text-foreground">PawLux — Correa Retráctil</p>
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">4.9 (2,400+)</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-foreground">$49.99</span>
            <span className="text-xs text-muted-foreground line-through">$79.99</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="sm"
          className="h-10 shrink-0 bg-primary px-4 font-bold text-primary-foreground glow-electric-sm"
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-1.5 size-4" />
          Comprar
        </Button>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 opacity-50 hover:opacity-100"
          aria-label="Cerrar"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
