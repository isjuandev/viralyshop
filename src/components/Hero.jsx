import { useState } from "react";
import { ArrowLeft, ArrowRight, Banknote, Flame, Lock, ShieldCheck, ShoppingCart, Star, Truck, Zap } from "lucide-react";
import { BASE_PRICE, COMPARE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { scrollToForm } from "../utils/scroll";
import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";
import { ReviewsCarousel } from "./SocialProof";

const colors = [
  { name: "Negro", hex: "#1a1a1a" },
  { name: "Azul", hex: "#0066FF" },
  { name: "Rojo", hex: "#E53E3E" },
];

const gallery = [
  { src: "/ChatGPT Image 15 may 2026, 02_40_51 a.m..png", label: "Correa retráctil doble PaseoCan" },
  { src: "/ChatGPT Image 15 may 2026, 02_07_56 a.m..png", label: "Paseo con dos perros usando PaseoCan" },
  { src: "/ChatGPT Image 15 may 2026, 02_10_16 a.m..png", label: "Beneficios principales de la correa doble" },
  { src: "/ChatGPT Image 15 may 2026, 02_09_34 a.m..png", label: "Antes y después del paseo sin enredos" },
  { src: "/ChatGPT Image 15 may 2026, 02_15_49 a.m..png", label: "Sistema de giro 360 grados" },
  { src: "/ChatGPT Image 15 may 2026, 02_49_19 a.m..png", label: "Cliente usando la correa PaseoCan" },
];

const trustItems = [
  { icon: Truck, text: "Envío gratis" },
  { icon: Banknote, text: "Pago contra entrega" },
  { icon: ShieldCheck, text: "30 días garantía" },
  { icon: Zap, text: "Despacho 24h" },
];

export function Hero() {
  const [selected, setSelected] = useState("Negro");
  const [active, setActive] = useState(0);
  const current = gallery[active];
  const move = (step) => setActive((value) => (value + step + gallery.length) % gallery.length);

  return (
    <section id="product" className="scroll-mt-10 bg-[var(--color-white)]">
      <div className="sticky top-0 z-[1000] flex h-10 items-center justify-center gap-2 bg-[var(--color-urgency)] px-3 text-center text-[13px] font-semibold text-white shadow-sm">
        <Flame size={14} strokeWidth={2} />
        <span>Oferta termina en:</span>
        <Countdown dark />
        <span className="hidden sm:inline">· Solo quedan 11 unidades</span>
      </div>

      <div className="container-shell grid max-w-full gap-6 overflow-hidden px-3 pb-12 pt-3 md:grid-cols-[55fr_45fr] md:items-center md:gap-10 md:px-8 md:py-12">
        <Reveal className="min-w-0">
          <ProductGallery current={current} active={active} move={move} setActive={setActive} />
        </Reveal>

        <Reveal className="min-w-0">
          <div className="kicker">Correa retráctil doble · control individual · 3 metros</div>
          <h1 className="mt-4 max-w-[12ch] text-[36px] font-extrabold leading-[0.98] text-[var(--color-dark)] md:text-[48px]">
            Control real para dos perros. En una sola mano.
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[14px] font-semibold text-[var(--color-body)]">
            <span className="inline-flex gap-0.5 text-[var(--color-warning)]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={2} />)}</span>
            <span>4.9/5 — 127 reseñas · 847 colombianos ya la tienen</span>
          </div>

          <div className="card-surface mt-5 p-5">
            <span className="inline-flex rounded px-2 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-black" style={{ background: "var(--color-warning)" }}>Oferta de lanzamiento</span>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <span className="pb-1 text-[22px] font-bold text-slate-400 line-through">${formatPrice(COMPARE_PRICE)}</span>
              <span className="text-[42px] font-extrabold leading-none text-[var(--color-primary)]">${formatPrice(BASE_PRICE)} COP</span>
              <span className="rounded bg-[var(--color-success-light)] px-2.5 py-1 text-[13px] font-bold text-[var(--color-success)]">Ahorras $15.000</span>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--color-dark)]">Elige tu color</p>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <button key={color.name} type="button" onClick={() => setSelected(color.name)} className="flex min-h-11 flex-col items-center gap-1 text-[11px] font-medium text-[var(--color-body)]" aria-pressed={selected === color.name}>
                    <span className={`block size-9 rounded-full border border-black/10 transition hover:scale-110 ${selected === color.name ? "ring-2 ring-[var(--color-primary)] ring-offset-2" : ""}`} style={{ backgroundColor: color.hex }} />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <button aria-label="Pedir PaseoCan ahora con pago contra entrega" onClick={scrollToForm} className="btn-primary mt-5 px-3 text-[13px] sm:text-[15px]">
              <span className="truncate">PEDIR AHORA — PAGO CONTRA ENTREGA</span> <ShoppingCart className="shrink-0" size={18} strokeWidth={2.5} />
            </button>
            <p className="microcopy"><ShieldCheck size={12} strokeWidth={2} /> Sin tarjeta · Pago contra entrega · Sin riesgo</p>
          </div>

          <div className="mt-4 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {trustItems.map(({ icon: Icon, text }) => (
              <span key={text} className="flex min-w-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-success-light)] px-3 py-3 text-[12px] font-medium text-[var(--color-muted)]">
                <Icon size={18} className="shrink-0 text-[var(--color-success)]" strokeWidth={2} /><span className="truncate">{text}</span>
              </span>
            ))}
          </div>

          <ReviewsCarousel className="mt-4 max-w-full overflow-hidden" cardClassName="min-w-0 w-full shrink-0 snap-center" insetControls />
        </Reveal>
      </div>
    </section>
  );
}

function ProductGallery({ current, active, move, setActive }) {
  return (
    <div className="card-surface overflow-hidden p-2 md:p-3">
      <div className="relative h-[360px] overflow-hidden rounded-xl bg-[var(--color-surface)] sm:h-[420px] md:aspect-square md:h-auto">
        <img src={current.src} alt={current.label} className="h-full w-full object-contain md:object-cover" fetchPriority={active === 0 ? "high" : "auto"} loading={active === 0 ? "eager" : "lazy"} />
        <button aria-label="Imagen anterior" onClick={() => move(-1)} className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-md"><ArrowLeft size={20} strokeWidth={2} /></button>
        <button aria-label="Imagen siguiente" onClick={() => move(1)} className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-md"><ArrowRight size={20} strokeWidth={2} /></button>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-2">
        {gallery.map((item, index) => (
          <button key={item.label} aria-label={item.label} onClick={() => setActive(index)} className={`aspect-square rounded-lg border bg-[var(--color-surface)] p-1 transition ${active === index ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-[var(--color-border)]"}`}>
            <img src={item.src} alt="" className="h-full w-full rounded-md object-contain" loading="lazy" />
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px] font-semibold text-[var(--color-body)]">
        <span className="rounded-lg bg-[var(--color-primary-light)] p-2"><Lock className="mx-auto mb-1 text-[var(--color-primary)]" size={18} />Control</span>
        <span className="rounded-lg bg-[var(--color-success-light)] p-2"><ShieldCheck className="mx-auto mb-1 text-[var(--color-success)]" size={18} />Garantía</span>
        <span className="rounded-lg bg-[var(--color-primary-light)] p-2"><Truck className="mx-auto mb-1 text-[var(--color-primary)]" size={18} />Envío Gratis</span>
      </div>
    </div>
  );
}
