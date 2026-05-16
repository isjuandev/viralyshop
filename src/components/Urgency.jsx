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
    <section ref={ref} className="section-shell bg-[var(--color-urgency-section)] text-center text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-white/10"><AlertTriangle size={24} strokeWidth={2} /></div>
        <h2 className="text-[28px] font-extrabold leading-tight text-white md:text-[42px]">Última oportunidad al precio de oferta</h2>
        <p className="mt-3 text-[17px] font-semibold">Solo quedan 11 unidades al precio de oferta</p>
        <p className="mt-1 text-[14px] text-white/75">Cuando se acaben, el precio vuelve a $49.000 COP</p>
        <div className="mt-8 h-2.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-[var(--color-warning)] transition-all duration-1000 ease-out" style={{ width: active ? "78%" : "0%" }} />
        </div>
        <p className="mt-2 text-[13px] font-bold">78 de 100 unidades vendidas esta semana</p>
        <p className="mt-6 inline-flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80"><Clock size={16} /> La oferta vence en:</p>
        <p className="mt-2 text-[24px] font-extrabold leading-none"><Countdown dark /></p>
        <button onClick={scrollToForm} className="btn-urgency mx-auto mt-7 md:w-[390px]">ASEGURAR MI UNIDAD AHORA →</button>
        <p className="microcopy text-white/70"><ShieldCheck size={12} /> Sin tarjeta · Pago contra entrega · Sin riesgo</p>
        <div className="mt-5 grid grid-cols-1 gap-2 text-[13px] font-medium text-white/85 sm:grid-cols-3">
          <span className="flex items-center justify-center gap-2"><Truck size={16} /> Envío gratis</span>
          <span className="flex items-center justify-center gap-2"><ShieldCheck size={16} /> Garantía 30 días</span>
          <span className="flex items-center justify-center gap-2"><Zap size={16} /> Despacho en 24h</span>
        </div>
      </div>
    </section>
  );
}
