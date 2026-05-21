import { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { scrollToForm } from "../utils/scroll";

const reviewSlides = [
  "/reviews/testimonio.png",
  "/reviews/testimonio3.png",
  "/reviews/testimonio4.png",
  "/reviews/testimonio2.png",
];

export function EmotionalClose() {
  const [active, setActive] = useState(0);
  const move = (step) =>
    setActive((value) => (value + step + reviewSlides.length) % reviewSlides.length);

  return (
    <section className="section-shell bg-[#FFFDF7]">
      <div className="container-shell">
        <div className="mx-auto mb-5 max-w-[680px] text-center md:mb-6 lg:max-w-[760px]">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-primary)]">
            Historias reales
          </p>
          <h2 className="mt-2 text-[28px] font-extrabold leading-tight text-[var(--color-dark)] md:text-[40px]">
            Así cambió la rutina de paseo para cientos de familias
          </h2>
          <p className="mt-2 text-[14px] text-[var(--color-muted)] md:text-[16px]">
            Clientes en Colombia que ya viven paseos más tranquilos, seguros y sin enredos.
          </p>
        </div>

        <div className="mx-auto max-w-[620px] md:max-w-[720px] lg:max-w-[860px]">
          <article className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
            <img
              src={reviewSlides[active]}
              alt={`Testimonio ${active + 1}`}
              className="h-auto w-full object-contain md:max-h-[560px] lg:max-h-[640px]"
              loading="lazy"
            />
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={() => move(-1)}
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-md"
            >
              <ArrowLeft size={18} strokeWidth={2.3} />
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              onClick={() => move(1)}
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-md"
            >
              <ArrowRight size={18} strokeWidth={2.3} />
            </button>
          </article>

          <div className="mt-3 flex items-center justify-center gap-2">
            {reviewSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir al testimonio ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2.5 rounded-full transition ${active === index ? "w-6 bg-[var(--color-primary)]" : "w-2.5 bg-[var(--color-border)]"}`}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[390px] text-center lg:max-w-[400px]">
          <button onClick={scrollToForm} className="btn-primary w-full lg:w-full cta-jump">
            Quiero el mío ahora →
          </button>
          <p className="microcopy">
            <ShieldCheck size={12} /> Pago contra entrega · Envío gratis ·
            Garantía 30 días
          </p>
        </div>
      </div>
    </section>
  );
}
