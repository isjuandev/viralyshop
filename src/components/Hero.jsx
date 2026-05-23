import { useState } from "react";
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
} from "lucide-react";
import { BASE_PRICE, COMPARE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { scrollToForm } from "../utils/scroll";
import { Reveal } from "./Reveal";
import { ReviewsCarousel } from "./SocialProof";

const gallery = [
  { src: "/Carrusel-1.png", label: "Correa retráctil doble PaseoCan" },
  { src: "/Carrusel-2.png", label: "Antes y después del paseo sin enredos" },
  { src: "/Carrusel-3.png", label: "Paseo con dos perros usando PaseoCan" },
  { src: "/Carrusel-4.png", label: "Beneficios principales de la correa doble" },
  { src: "/Carrusel-5.png", label: "Sistema de giro 360 grados" },
  { src: "/Carrusel-6.png", label: "Cliente usando la correa PaseoCan" },
];

const TOP_BENEFITS = [
  { icon: "300°", title: "Sin enredos", text: "gracias al giro 360°" },
  { icon: ShieldCheck, title: "Freno de seguridad", text: "instantáneo" },
  { icon: Banknote, title: "Resistente hasta", text: "50 kg por perro" },
];

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

function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-[1000] bg-slate-950 px-4 py-2.5 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 text-center text-[12px] font-semibold tracking-wide md:text-[13px]">
        <span className="flex items-center gap-1.5">
          <Truck size={13} className="shrink-0 text-orange-300" />
          <span className="text-white/80">
            <span className="text-white">ENVÍO GRATIS</span> en todas las órdenes
          </span>
        </span>
        <span className="hidden text-white/30 sm:block">·</span>
        <span className="hidden items-center gap-1.5 text-white/80 sm:flex">
          <Banknote size={13} className="shrink-0 text-orange-300" />
          Pago contra entrega
        </span>
      </div>
    </div>
  );
}

function ProductGallery({ current, active, move, setActive }) {
  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-lg md:aspect-[4/3] lg:aspect-[16/11] lg:p-4">
        <img
          src={current.src}
          alt={current.label}
          className="h-full w-full rounded-xl object-contain transition-opacity duration-200"
          fetchPriority={active === 0 ? "high" : "auto"}
          loading={active === 0 ? "eager" : "lazy"}
        />
        <button
          aria-label="Imagen anterior"
          onClick={() => move(-1)}
          className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:shadow-lg lg:left-5 lg:size-11"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          aria-label="Imagen siguiente"
          onClick={() => move(1)}
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:shadow-lg lg:right-5 lg:size-11"
        >
          <ArrowRight size={18} />
        </button>

        {/* Mobile dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
          {gallery.map((_, i) => (
            <button
              key={i}
              aria-label={`Imagen ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === active ? "w-5 bg-slate-900" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-6 gap-2">
        {gallery.map((item, i) => (
          <button
            key={item.label}
            aria-label={item.label}
            onClick={() => setActive(i)}
            className={`aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border-2 bg-slate-50 transition-all duration-200 ${
              i === active
                ? "border-blue-600 shadow-sm"
                : "border-transparent opacity-60 hover:border-slate-200 hover:opacity-100"
            }`}
          >
            <img src={item.src} alt="" className="h-full w-full object-contain" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroHighlights() {
  const items = [
    { icon: Truck, label: "Envío gratis", text: "A todo el país" },
    { icon: Banknote, label: "Pago al recibir", text: "Sin pagos anticipados" },
    { icon: ShieldCheck, label: "30 días garantía", text: "Devoluciones fáciles" },
    { icon: Zap, label: "Despacho 24h", text: "En pedidos confirmados" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map(({ icon: Icon, label, text }) => (
        <div
          key={label}
          className="flex min-h-[126px] flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-4 text-center shadow-sm lg:min-h-[150px] lg:gap-3"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 lg:size-12">
            <Icon size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-[13px] font-extrabold leading-tight text-slate-700 lg:text-[15px]">{label}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-slate-500 lg:text-[13px]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TopBenefitStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:gap-5">
      {TOP_BENEFITS.map(({ icon, title, text }) => {
        const Icon = typeof icon === "string" ? null : icon;
        return (
          <div key={title} className="flex items-center gap-3 lg:gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 lg:size-13">
              {Icon ? <Icon size={22} strokeWidth={2.3} /> : <span className="text-[12px] font-black">{icon}</span>}
            </span>
            <span className="text-[12px] font-semibold leading-snug text-slate-700 lg:text-[14px]">
              {title}
              <br />
              <span className="font-medium text-slate-500">{text}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function OfferCard({ onCta }) {
  const discount = Math.round(((COMPARE_PRICE - BASE_PRICE) / COMPARE_PRICE) * 100);
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:p-6 lg:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[25px] font-black leading-none tracking-tight text-slate-900 md:text-[28px] lg:text-[32px]">
          ${formatPrice(BASE_PRICE)}
          <span className="ml-1.5 text-[13px] font-semibold text-slate-400 lg:text-[15px]">COP</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <p className="hidden text-[14px] font-semibold text-slate-400 line-through sm:block lg:text-[16px]">
            ${formatPrice(COMPARE_PRICE)} COP
          </p>
          <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-600 lg:text-[12px]">
            -{discount}% hoy
          </span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onCta}
          className="btn-primary cta-jump !w-full cursor-pointer rounded-xl py-4 text-[16px] font-extrabold tracking-wide transition-transform duration-150 active:scale-[0.98] lg:min-h-[62px] lg:text-[17px]"
          aria-label="Comprar ahora"
        >
          <ShoppingCart size={17} />
          COMPRAR AHORA
        </button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-slate-400 lg:text-[14px]">
          <Lock size={10} />
          Compra segura · Sin tarjeta
        </p>
      </div>
    </div>
  );
}

function ShippingTimeline() {
  const now = new Date();
  const steps = [
    { icon: ShoppingCart, date: fmtDate(now), label: "Pedido", active: true },
    { icon: Zap, date: fmtDate(addBusinessDays(now, 1)), label: "Procesamos", active: false },
    { icon: Truck, date: fmtDate(addBusinessDays(now, 2)), label: "Despacho", active: false },
    { icon: ShieldCheck, date: fmtDate(addBusinessDays(now, 4)), label: "Entrega", active: false },
  ];

  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 sm:p-5 lg:min-h-[150px] lg:p-6">
      <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-700 sm:text-[12px] lg:text-[14px]">
        <Truck size={13} />
        Estimado de entrega
      </p>
      <div className="relative grid grid-cols-4">
        {/* Connector line */}
        <span className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-amber-200 lg:top-6" />

        {steps.map(({ icon: Icon, date, label, active }, i) => (
          <div key={label} className="relative z-10 flex flex-col items-center gap-1 text-center">
            <span
              className={`flex size-10 items-center justify-center rounded-full border transition-colors lg:size-12 ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-amber-200 bg-white text-slate-400"
              }`}
            >
              <Icon size={17} />
            </span>
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-700 sm:text-[13px] lg:text-[16px]">{date}</p>
            <p className="text-[10px] text-slate-500 sm:text-[12px] lg:text-[14px]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const move = (step) => setActive((v) => (v + step + gallery.length) % gallery.length);

  return (
    <section id="product" className="scroll-mt-10 bg-slate-50">
      <AnnouncementBar />

      <div className="mx-auto max-w-[1500px] px-4 pb-8 pt-8 md:px-6 lg:px-8 lg:pb-12 lg:pt-12 xl:px-10">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12 xl:gap-16">
          {/* LEFT — Gallery */}
          <Reveal className="lg:w-full">
            <ProductGallery current={gallery[active]} active={active} move={move} setActive={setActive} />
          </Reveal>

          {/* RIGHT — Header + Offer */}
          <Reveal className="mt-8 space-y-6 lg:mt-4 lg:w-full xl:space-y-7">
            <div className="space-y-3 xl:space-y-4">
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-blue-700">
                PaseoCan Premium
              </span>

              <h1 className="max-w-[14ch] text-[28px] font-black leading-[1.05] text-slate-900 md:text-[42px] lg:text-[46px] xl:text-[54px]">
                Pasea 2 perros con control total y sin enredos
              </h1>

              <p className="max-w-[54ch] text-[15px] leading-relaxed text-slate-500 md:text-[17px] lg:text-[19px]">
                Correa retráctil doble con giro 360°, freno de seguridad y agarre cómodo para paseos diarios más seguros.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="text-[13px] text-slate-500 lg:text-[15px]">
                  <strong className="font-semibold text-slate-700">349</strong> valoraciones verificadas ·{" "}
                  <strong className="font-semibold text-slate-700">1.200</strong> ventas
                </span>
              </div>
            </div>

            <TopBenefitStrip />
            <OfferCard onCta={scrollToForm} />

            {/* Mobile/tablet keeps secondary blocks in flow */}
            <div className="space-y-4 lg:hidden">
              <HeroHighlights />
              <ShippingTimeline />
            </div>

            <div className="lg:hidden">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Clientes reales
              </p>
              <ReviewsCarousel cardClassName="min-w-0 w-full shrink-0 snap-center" insetControls />
            </div>
          </Reveal>
        </div>

        {/* Desktop band 2: secondary information */}
        <Reveal className="mt-9 hidden lg:block">
          <div className="grid grid-cols-[1.1fr_0.9fr] items-start gap-12 xl:gap-16">
            <HeroHighlights />
            <ShippingTimeline />
          </div>
        </Reveal>

        <Reveal className="mt-8 hidden justify-center lg:flex">
          <p className="flex items-center gap-2 text-[17px] font-medium text-slate-500">
            <ShieldCheck size={18} className="text-emerald-500" />
            Miles de dueños ya disfrutan paseos más seguros con PaseoCan.
          </p>
        </Reveal>
      </div>

      {/* Desktop reviews section */}
      <section className="hidden border-t border-slate-100 bg-white px-6 pb-28 pt-20 lg:block xl:px-10">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="mx-auto max-w-[860px] text-center">
            <p className="text-[13px] font-bold uppercase tracking-widest text-blue-700">
              Reseñas verificadas
            </p>
            <h2 className="mt-4 text-[44px] font-black leading-tight text-slate-900 xl:text-[52px]">
              Clientes que ya mejoraron sus paseos diarios
            </h2>
            <p className="mt-4 text-[19px] text-slate-500">
              Opiniones de dueños de perros en Colombia usando PaseoCan.
            </p>
          </Reveal>
          <ReviewsCarousel
            className="mt-14 overflow-hidden"
            cardClassName="min-w-[360px] flex-1 snap-center"
            insetControls
          />
        </div>
      </section>
    </section>
  );
}
