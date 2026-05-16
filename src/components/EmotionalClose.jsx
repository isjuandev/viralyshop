import { scrollToForm } from "../utils/scroll";

export function EmotionalClose() {
  return (
    <section className="bg-[#0A0A0A] px-4 py-10 text-center text-white md:py-[60px]">
      <div className="mx-auto max-w-3xl">
        <div className="text-5xl">🐾</div>
        <h2 className="mt-4 text-[24px] font-extrabold leading-tight md:text-[32px]">
          Tu próximo paseo puede ser completamente diferente.
        </h2>
        <p className="mt-3 text-white/80">
          Sin jalones. Sin enredos. Sin estrés. Solo tú y tus perros disfrutando.
        </p>
        <button
          onClick={scrollToForm}
          className="mt-7 inline-flex h-14 w-full items-center justify-center rounded-[10px] bg-[#1E90FF] px-4 text-[15px] font-extrabold uppercase tracking-[0.05em] text-white md:w-[360px]"
        >
          QUIERO ESE PASEO — $34.900 →
        </button>
        <p className="mt-3 text-xs text-white/60">Pago contra entrega · Envío gratis · Garantía 30 días</p>
      </div>
    </section>
  );
}
