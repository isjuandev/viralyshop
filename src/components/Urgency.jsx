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
    <section ref={ref} className="section-shell bg-[#6F1515] text-center text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20"><AlertTriangle size={24} strokeWidth={2} /></div>
        <h2 className="text-[28px] font-extrabold leading-tight !text-white md:text-[42px]">Última oportunidad al precio de oferta</h2>
        <p className="mt-3 text-[17px] font-bold text-white">Solo quedan 11 unidades al precio de oferta</p>
        <p className="mt-1 text-[14px] font-medium text-white/90">Cuando se acaben, el precio vuelve a $49.000 COP</p>
        <div className="mt-8 h-2.5 overflow-hidden rounded-full bg-black/25 ring-1 ring-white/15">
          <div className="h-full rounded-full bg-[var(--color-warning)] transition-all duration-1000 ease-out" style={{ width: active ? "78%" : "0%" }} />
        </div>
        <p className="mt-3 text-[14px] font-extrabold text-white">78 de 100 unidades vendidas esta semana</p>
        <p className="mt-6 inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-white"><Clock size={16} /> La oferta vence en:</p>
        <p className="mt-2 text-[24px] font-extrabold leading-none text-white"><Countdown dark /></p>
        <button onClick={scrollToForm} className="btn-urgency mx-auto mt-7 md:w-[390px]">ASEGURAR MI UNIDAD AHORA →</button>
        <p className="microcopy font-semibold !text-white/90"><ShieldCheck size={12} /> Sin tarjeta · Pago contra entrega · Sin riesgo</p>
        <div className="mx-auto mt-5 grid max-w-[520px] grid-cols-1 gap-2 text-[14px] font-semibold text-white sm:grid-cols-3">
          <span className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/15"><Truck size={16} /> Envío gratis</span>
          <span className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/15"><ShieldCheck size={16} /> Garantía 30 días</span>
          <span className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/15"><Zap size={16} /> Despacho en 24h</span>
        </div>
      </div>
    </section>
  );
}
