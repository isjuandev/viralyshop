import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Lock,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { BASE_PRICE, COMPARE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { scrollToForm } from "../utils/scroll";
import { Reveal } from "./Reveal";
import { ReviewsCarousel } from "./SocialProof";

/* ─── Data ─────────────────────────────────────────────────── */

const gallery = [
  {
    src: "/ChatGPT Image 15 may 2026, 02_40_51 a.m..png",
    label: "Correa retráctil doble PaseoCan",
  },
  {
    src: "/ChatGPT Image 15 may 2026, 02_07_56 a.m..png",
    label: "Paseo con dos perros usando PaseoCan",
  },
  {
    src: "/ChatGPT Image 15 may 2026, 02_10_16 a.m..png",
    label: "Beneficios principales de la correa doble",
  },
  {
    src: "/ChatGPT Image 15 may 2026, 02_09_34 a.m..png",
    label: "Antes y después del paseo sin enredos",
  },
  {
    src: "/ChatGPT Image 15 may 2026, 02_15_49 a.m..png",
    label: "Sistema de giro 360 grados",
  },
  {
    src: "/ChatGPT Image 15 may 2026, 02_49_19 a.m..png",
    label: "Cliente usando la correa PaseoCan",
  },
];

const BULLET_POINTS = [
  "Sin enredos gracias al giro 360°",
  "Freno de seguridad instantáneo",
  "Resistente hasta 50 kg por perro",
];

/* ─── Helpers ───────────────────────────────────────────────── */

function addBusinessDays(date, days) {
  const result = new Date(date);
  let remaining = days;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    const dow = result.getDay();
    if (dow !== 0 && dow !== 6) remaining--;
  }
  return result;
}

function fmtDate(date) {
  return date.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
}

/* ─── Sub-components ────────────────────────────────────────── */

function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-[1000] flex h-10 items-center justify-center gap-2 bg-black px-4 text-[12px] font-bold tracking-wide text-white md:text-[13px]">
      <Truck size={14} className="shrink-0" />
      <span>ENVÍO GRATIS en todas las órdenes · Pago contra entrega</span>
    </div>
  );
}

function StarRating({ count = 5, reviews, sales }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex gap-0.5 text-amber-400">
        {Array.from({ length: count }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span className="text-[13px] text-slate-500">
        {reviews} valoraciones · {sales} ventas
      </span>
    </div>
  );
}

function TrustBadges() {
  const items = [
    { icon: Truck, label: "Envío gratis" },
    { icon: Banknote, label: "Contra entrega" },
    { icon: ShieldCheck, label: "30 días garantía" },
    { icon: Zap, label: "Despacho 24h" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 py-3 text-center"
        >
          <Icon size={18} className="text-slate-700" strokeWidth={1.8} />
          <span className="text-[11px] font-semibold leading-tight text-slate-600">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PriceBlock({ onCta }) {
  const discount = Math.round(
    ((COMPARE_PRICE - BASE_PRICE) / COMPARE_PRICE) * 100
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      {/* Price row */}
      <div className="flex items-end gap-3">
        <span className="text-[32px] font-extrabold leading-none text-slate-900 md:text-[38px]">
          ${formatPrice(BASE_PRICE)}
          <span className="ml-1 text-[18px] font-bold text-slate-500">COP</span>
        </span>
        <div className="mb-1 flex flex-col items-start">
          <span className="text-[13px] text-slate-400 line-through">
            ${formatPrice(COMPARE_PRICE)}
          </span>
          <span className="rounded-md bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-600">
            -{discount}% HOY
          </span>
        </div>
      </div>

      {/* Bullet points */}
      <ul className="mt-4 space-y-2">
        {BULLET_POINTS.map((pt) => (
          <li key={pt} className="flex items-center gap-2 text-[13px] text-slate-700">
            <CheckCircle2
              size={15}
              className="shrink-0 text-emerald-500"
              strokeWidth={2.5}
            />
            {pt}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        aria-label="Compra ahora PaseoCan con envío gratis"
        onClick={onCta}
        className="btn-primary cta-jump mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-extrabold tracking-wide transition-transform active:scale-[0.98]"
      >
        <ShoppingCart size={18} strokeWidth={2.5} />
        COMPRA AHORA · ENVÍO GRATIS
      </button>

      <p className="mt-2.5 flex items-center justify-center gap-1 text-center text-[11px] text-slate-400">
        <Lock size={10} strokeWidth={2} />
        Sin tarjeta · Pago contra entrega · Sin riesgo
      </p>
    </div>
  );
}

function ShippingTimeline() {
  const now = new Date();
  const steps = [
    { icon: ShoppingCart, date: fmtDate(now), label: "Pedido recibido" },
    { icon: Zap, date: fmtDate(addBusinessDays(now, 1)), label: "Procesamos" },
    { icon: Truck, date: fmtDate(addBusinessDays(now, 2)), label: "Despachamos" },
    { icon: ShieldCheck, date: fmtDate(addBusinessDays(now, 4)), label: "Entregamos" },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Estimado de entrega
      </p>
      <div className="relative grid grid-cols-4 gap-1">
        {/* connector line */}
        <span className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-slate-200" />
        {steps.map(({ icon: Icon, date, label }, i) => (
          <div key={label} className="relative z-10 flex flex-col items-center text-center">
            <span
              className={`flex size-8 items-center justify-center rounded-full ${
                i === 0
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-400 border border-slate-200"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
            </span>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
              {date}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductGallery({ current, active, move, setActive }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 md:aspect-[4/3] lg:aspect-square">
        <img
          src={current.src}
          alt={current.label}
          className="h-full w-full object-contain transition-opacity duration-200"
          fetchPriority={active === 0 ? "high" : "auto"}
          loading={active === 0 ? "eager" : "lazy"}
        />

        {/* Nav arrows */}
        <button
          aria-label="Imagen anterior"
          onClick={() => move(-1)}
          className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <button
          aria-label="Imagen siguiente"
          onClick={() => move(1)}
          className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          <ArrowRight size={18} strokeWidth={2} />
        </button>

        {/* Dot indicator (mobile only) */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
          {gallery.map((_, i) => (
            <button
              key={i}
              aria-label={`Imagen ${i + 1}`}
              onClick={() => setActive(i)}
              className={`size-2 rounded-full transition-all ${
                i === active ? "w-5 bg-slate-800" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails grid */}
      <div className="grid grid-cols-6 gap-2 lg:grid-cols-6">
        {gallery.map((item, i) => (
          <button
            key={item.label}
            aria-label={item.label}
            onClick={() => setActive(i)}
            className={`aspect-square overflow-hidden rounded-lg border-2 bg-slate-50 transition ${
              i === active
                ? "border-slate-800"
                : "border-transparent hover:border-slate-300"
            }`}
          >
            <img
              src={item.src}
              alt=""
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Feature badges — desktop only, inside gallery column */}
      <div className="hidden grid-cols-3 gap-2 lg:grid">
        {[
          { icon: Lock, label: "Control total", color: "text-blue-600 bg-blue-50" },
          { icon: ShieldCheck, label: "30 días garantía", color: "text-emerald-600 bg-emerald-50" },
          { icon: Truck, label: "Envío gratis", color: "text-violet-600 bg-violet-50" },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-1 rounded-xl py-3 text-center text-[11px] font-semibold ${color}`}
          >
            <Icon size={16} strokeWidth={2} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ───────────────────────────────────────────── */

export function Hero() {
  const [active, setActive] = useState(0);
  const move = (step) =>
    setActive((v) => (v + step + gallery.length) % gallery.length);

  return (
    <section id="product" className="scroll-mt-10">
      <AnnouncementBar />

      {/* ── Main hero grid ── */}
      <div className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6 md:pt-8 lg:grid lg:grid-cols-[52%_48%] lg:items-start lg:gap-10 lg:px-8 lg:pt-10 lg:pb-16">

        {/* Left: Gallery */}
        <Reveal className="lg:sticky lg:top-[56px]">
          <ProductGallery
            current={gallery[active]}
            active={active}
            move={move}
            setActive={setActive}
          />
        </Reveal>

        {/* Right: Product info */}
        <Reveal className="mt-6 flex flex-col gap-5 lg:mt-0">

          {/* Header */}
          <div>
            <p className="mb-2 text-[12px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
              PaseoCan · Correa Premium
            </p>
            <h1 className="text-[30px] font-extrabold leading-[1.05] text-slate-900 md:text-[40px] lg:text-[36px] xl:text-[42px]">
              Correa retráctil doble para dos perros
            </h1>
            <div className="mt-3">
              <StarRating reviews="349" sales="1.200" />
            </div>
          </div>

          {/* Price + CTA */}
          <PriceBlock onCta={scrollToForm} />

          {/* Trust badges */}
          <TrustBadges />

          {/* Shipping timeline */}
          <ShippingTimeline />

          {/* Reviews carousel — mobile only */}
          <div className="lg:hidden">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Lo que dicen nuestros clientes
            </p>
            <ReviewsCarousel
              cardClassName="min-w-0 w-full shrink-0 snap-center"
              insetControls
            />
          </div>
        </Reveal>
      </div>

      {/* Reviews section — desktop only */}
      <DesktopReviewsSection />
    </section>
  );
}

function DesktopReviewsSection() {
  return (
    <section className="hidden border-t border-slate-100 bg-slate-50 px-6 pb-20 pt-16 lg:block">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
            Reseñas verificadas
          </p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight text-slate-900">
            Dueños de perros que ya pasean con más control
          </h2>
          <p className="mt-2 text-[16px] text-slate-500">
            Historias reales de clientes en Colombia usando PaseoCan a diario.
          </p>
        </Reveal>
        <ReviewsCarousel
          className="mt-10 overflow-hidden"
          cardClassName="min-w-[280px] flex-1 snap-center"
          insetControls
        />
      </div>
    </section>
  );
}
