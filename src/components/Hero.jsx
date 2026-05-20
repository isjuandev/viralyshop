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

const trustItems = [
  { icon: Truck, text: "Envío gratis" },
  { icon: Banknote, text: "Pago contra entrega" },
  { icon: ShieldCheck, text: "30 días garantía" },
  { icon: Zap, text: "Despacho 24h" },
];

function addBusinessDays(date, businessDays) {
  const result = new Date(date);
  let remaining = businessDays;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return result;
}

function formatShippingDate(date) {
  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
}

export function Hero() {
  const [active, setActive] = useState(0);
  const current = gallery[active];
  const move = (step) =>
    setActive((value) => (value + step + gallery.length) % gallery.length);

  return (
    <section id="product" className="scroll-mt-10 bg-[var(--color-white)]">
      <div className="sticky top-0 z-[1000] flex h-11 items-center justify-center bg-black px-3 text-center text-[13px] font-bold text-white shadow-sm">
        <span>🐾 ENVÍO GRATIS en todas las órdenes</span>
      </div>

      <div className="container-shell max-w-full overflow-hidden px-3 pb-12 pt-3 md:px-8 md:py-12 lg:grid lg:max-w-[1200px] lg:grid-cols-[55%_45%] lg:items-start lg:gap-8 lg:px-6 lg:py-16">
        <Reveal className="min-w-0 lg:sticky lg:top-16">
          <ProductGallery
            current={current}
            active={active}
            move={move}
            setActive={setActive}
          />
        </Reveal>

        <Reveal className="min-w-0 mt-6 lg:mt-0">
          <h1 className="text-[34px] font-extrabold leading-[1.02] text-[var(--color-dark)] md:text-[46px] lg:text-[clamp(2.5rem,3.4vw,3.5rem)]">
            Correa retráctil doble PaseoCan
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[14px] font-semibold">
            <span className="inline-flex gap-0.5 text-[var(--color-warning)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={2} />
              ))}
            </span>
            <span className="text-slate-500">
              349 Valoraciones | 1.200 Ventas
            </span>
          </div>

          <div className="card-surface mt-4 p-4 md:mt-5 md:p-5">
            <div className="flex flex-wrap items-end gap-2.5 md:gap-3">
              <span className="text-[30px] font-extrabold leading-none text-black md:text-[40px]">
                ${formatPrice(BASE_PRICE)} COP
              </span>
              <span className="pb-0.5 text-[16px] font-bold text-slate-400 line-through md:pb-1 md:text-[20px]">
                ${formatPrice(COMPARE_PRICE)}
              </span>
              <span
                className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[0.03em] text-white md:px-2.5 md:text-[11px]"
                style={{ background: "var(--color-primary)" }}
              >
                OFERTA HOY
              </span>
            </div>

            <button
              aria-label="Compra ahora PaseoCan con envío gratis"
              onClick={scrollToForm}
              className="btn-primary mt-4 flex w-full items-center justify-center gap-1.5 px-3 py-2.5 text-[14px] md:mt-5 md:gap-2 md:py-3 md:text-[15px] lg:w-full"
            >
              <ShoppingCart className="shrink-0" size={17} strokeWidth={2.5} />
              <span className="flex flex-col items-start leading-tight text-left">
                <span className="font-extrabold">COMPRA AHORA</span>
                <span className="text-[10px] font-medium opacity-90 md:text-[11px]">
                  Llévalo con envío gratis
                </span>
              </span>
            </button>
            <p className="microcopy mt-2 text-[11px] md:text-[12px]">
              <ShieldCheck size={11} strokeWidth={2} /> Sin tarjeta · Pago
              contra entrega · Sin riesgo
            </p>
          </div>

          <Reveal className="mt-6">
            <ShippingTimeline />
          </Reveal>

          <ReviewsCarousel
            className="mt-4 max-w-full overflow-hidden lg:hidden"
            cardClassName="min-w-0 w-full shrink-0 snap-center"
            insetControls
          />
        </Reveal>
      </div>
      <HeroReviewsSection />
    </section>
  );
}

function HeroReviewsSection() {
  return (
    <section className="hidden bg-[var(--color-white)] px-6 pb-16 lg:block">
      <div className="container-shell max-w-[1000px]">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <span className="kicker">Reseñas verificadas</span>
          <h2 className="mt-3 text-[32px] font-extrabold leading-tight text-[var(--color-dark)]">
            Dueños de perros que ya pasean con más control
          </h2>
          <p className="mt-2 text-[16px] text-[var(--color-muted)]">
            Historias reales de clientes en Colombia usando PaseoCan en su rutina diaria.
          </p>
        </Reveal>
        <ReviewsCarousel
          className="mx-auto mt-8 max-w-[900px] overflow-hidden"
          cardClassName="min-w-[280px] flex-1 snap-center"
          insetControls
        />
      </div>
    </section>
  );
}

function ProductGallery({ current, active, move, setActive }) {
  return (
    <div className="card-surface overflow-hidden p-2 md:p-3 lg:grid lg:grid-cols-[82px_1fr] lg:gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[var(--color-surface)] md:max-h-[500px] lg:order-2 lg:max-h-none lg:min-h-[640px]">
        <img
          src={current.src}
          alt={current.label}
          className="h-full w-full object-contain md:object-cover lg:object-contain"
          fetchPriority={active === 0 ? "high" : "auto"}
          loading={active === 0 ? "eager" : "lazy"}
        />
        <button
          aria-label="Imagen anterior"
          onClick={() => move(-1)}
          className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-md"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <button
          aria-label="Imagen siguiente"
          onClick={() => move(1)}
          className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-md"
        >
          <ArrowRight size={20} strokeWidth={2} />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-2 lg:order-1 lg:mt-0 lg:grid-cols-1 lg:self-start">
        {gallery.map((item, index) => (
          <button
            key={item.label}
            aria-label={item.label}
            onClick={() => setActive(index)}
            className={`aspect-square rounded-lg border bg-[var(--color-surface)] p-1 transition lg:size-[70px] ${active === index ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20" : "border-[var(--color-border)]"}`}
          >
            <img
              src={item.src}
              alt=""
              className="h-full w-full rounded-md object-contain"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px] font-semibold text-[var(--color-body)] lg:col-span-2">
        <span className="rounded-lg bg-[var(--color-primary-light)] p-2">
          <Lock
            className="mx-auto mb-1 text-[var(--color-primary)]"
            size={18}
          />
          Control
        </span>
        <span className="rounded-lg bg-[var(--color-success-light)] p-2">
          <ShieldCheck
            className="mx-auto mb-1 text-[var(--color-success)]"
            size={18}
          />
          Garantía
        </span>
        <span className="rounded-lg bg-[var(--color-primary-light)] p-2">
          <Truck
            className="mx-auto mb-1 text-[var(--color-primary)]"
            size={18}
          />
          Envío Gratis
        </span>
      </div>
    </div>
  );
}

function ShippingTimeline() {
  const now = new Date();
  const orderDate = formatShippingDate(now);
  const dispatchDate = formatShippingDate(addBusinessDays(now, 2));
  const deliveryDate = formatShippingDate(addBusinessDays(now, 4));

  const steps = [
    { icon: ShoppingCart, date: orderDate, label: "Recibimos tu pedido" },
    { icon: Truck, date: dispatchDate, label: "Despachamos" },
    { icon: ShieldCheck, date: deliveryDate, label: "Lo entregamos" },
  ];

  return (
    <div className="card-surface p-4 lg:p-5">
      <div className="grid grid-cols-3 items-start gap-2 text-center lg:gap-5">
        {steps.map(({ icon: Icon, date, label }, index) => (
          <div key={label} className="relative px-1">
            {index < steps.length - 1 ? (
              <span className="absolute left-[58%] top-5 h-px w-[84%] border-t-2 border-dashed border-slate-300" />
            ) : null}
            <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-slate-900 text-white lg:size-12">
              <Icon className="lg:size-6" size={18} strokeWidth={2.2} />
            </span>
            <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--color-dark)]">
              {date}
            </p>
            <p className="mt-1 text-[12px] font-medium text-[var(--color-body)]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
