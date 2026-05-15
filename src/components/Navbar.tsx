import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  cartCount?: number
  onCartClick?: () => void
}

export function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-black text-primary-foreground">P</span>
          </div>
          <span className="text-lg font-black tracking-tight text-foreground">
            PAW<span className="text-electric">LUX</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Beneficios
          </a>
          <a href="#reviews" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Reseñas
          </a>
          <a href="#bundle" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Precios
          </a>
          <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Ver carrito"
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>

          <Button
            size="sm"
            className="hidden bg-primary text-primary-foreground glow-electric-sm hover:opacity-90 md:flex"
            onClick={() => document.getElementById("bundle")?.scrollIntoView({ behavior: "smooth" })}
          >
            Comprar Ahora
          </Button>

          <button
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-secondary md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border/50 bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {["#features", "#reviews", "#bundle", "#faq"].map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {["Beneficios", "Reseñas", "Precios", "FAQ"][i]}
              </a>
            ))}
            <Button
              className="mt-2 bg-primary text-primary-foreground glow-electric-sm"
              onClick={() => {
                setMenuOpen(false)
                document.getElementById("bundle")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Comprar Ahora
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
