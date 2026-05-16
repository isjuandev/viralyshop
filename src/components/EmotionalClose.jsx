import { PawPrint, ShieldCheck, ShoppingCart } from "lucide-react";
import { scrollToForm } from "../utils/scroll";

export function EmotionalClose() {
  return (
    <section className="section-shell bg-[var(--color-dark-section)] text-center text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/10 text-white"><PawPrint size={28} strokeWidth={2} /></div>
        <h2 className="mt-4 text-[28px] font-extrabold leading-tight text-white md:text-[42px]">Tu próximo paseo puede ser completamente diferente.</h2>
        <p className="mt-3 text-[17px] text-white/70">Sin jalones. Sin enredos. Sin estrés.</p>
        <button onClick={scrollToForm} className="btn-primary mx-auto mt-7 md:w-[390px]">
          QUIERO ESE PASEO — $34.900 <ShoppingCart size={18} strokeWidth={2.5} />
        </button>
        <p className="microcopy text-white/50"><ShieldCheck size={12} /> Pago contra entrega · Envío gratis · Garantía 30 días</p>
      </div>
    </section>
  );
}
