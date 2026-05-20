import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Clock, ShieldCheck, Truck, Zap } from "lucide-react";
import { scrollToForm } from "../utils/scroll";
import { Countdown } from "./Countdown";

export function Urgency() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(true);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-shell bg-[#6F1515] py-8 text-center text-white md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 md:mb-4 md:size-12"><AlertTriangle size={20} strokeWidth={2} /></div>
        <h2 className="text-[24px] font-extrabold leading-tight !text-white md:text-[42px]">Última oportunidad al precio de oferta</h2>
        <p className="mt-2 text-[15px] font-bold text-white md:mt-3 md:text-[17px]">Solo quedan 11 unidades al precio de oferta</p>
        <p className="mt-1 text-[13px] font-medium text-white/90 md:text-[14px]">Cuando se acaben, el precio vuelve a $199.000 COP</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/25 ring-1 ring-white/15 md:mt-8 md:h-2.5">
          <div className="h-full rounded-full bg-[var(--color-warning)] transition-all duration-1000 ease-out" style={{ width: active ? "78%" : "0%" }} />
        </div>
        <p className="mt-2 text-[12px] font-extrabold text-white md:mt-3 md:text-[14px]">78 de 100 unidades vendidas esta semana</p>
        <p className="mt-4 inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white md:mt-6 md:text-[12px]"><Clock size={14} /> La oferta vence en:</p>
        <p className="mt-1 text-[20px] font-extrabold leading-none text-white md:mt-2 md:text-[24px]"><Countdown dark /></p>
        <button onClick={scrollToForm} className="btn-urgency mx-auto mt-5 text-[13px] md:mt-7 md:w-[390px]">ASEGURAR MI UNIDAD AHORA →</button>
        <p className="microcopy font-semibold !text-white/90"><ShieldCheck size={12} /> Sin tarjeta · Pago contra entrega · Sin riesgo</p>
        <div className="mx-auto mt-4 grid max-w-[520px] grid-cols-3 gap-1.5 text-[11px] font-semibold text-white md:mt-5 md:gap-2 md:text-[14px]">
          <span className="flex items-center justify-center gap-1.5 rounded-lg bg-white/10 px-2 py-2 ring-1 ring-white/15 md:gap-2 md:px-3"><Truck size={14} /> Envío gratis</span>
          <span className="flex items-center justify-center gap-1.5 rounded-lg bg-white/10 px-2 py-2 ring-1 ring-white/15 md:gap-2 md:px-3"><ShieldCheck size={14} /> Garantía 30 días</span>
          <span className="flex items-center justify-center gap-1.5 rounded-lg bg-white/10 px-2 py-2 ring-1 ring-white/15 md:gap-2 md:px-3"><Zap size={14} /> Despacho en 24h</span>
        </div>
      </div>
    </section>
  );
}
