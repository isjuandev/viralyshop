import { useState } from "react"
import { X, Zap } from "lucide-react"

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white sm:text-sm"
      style={{ background: "linear-gradient(90deg, oklch(0.45 0.2 253), oklch(0.62 0.22 253), oklch(0.45 0.2 253))" }}>
      <Zap className="size-3.5 shrink-0 fill-white" />
      <span className="text-center">
        <span className="font-bold">OFERTA LIMITADA:</span>{" "}
        Envío gratis + 20% OFF en pedidos dobles — Solo hoy
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 transition-opacity hover:opacity-100"
        aria-label="Cerrar"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
