import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
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
    <section ref={ref} className="bg-[#7F1D1D] px-4 py-14 text-center text-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="inline-flex items-center justify-center gap-2 text-[28px] font-bold md:text-[42px]"><AlertTriangle className="size-8 md:size-10" />Última oportunidad al precio de oferta</h2>
        <p className="mt-2 text-lg">Solo quedan 11 unidades al precio de oferta</p>
        <p className="mt-1 text-[14px] text-white/80">Cuando se acaben, el precio vuelve a $49.000 COP</p>
        <div className="mt-8 h-5 overflow-hidden rounded-full bg-[#3F1111]">
          <div className="h-full rounded-full bg-[#DC2626] transition-all duration-1000" style={{ width: active ? "78%" : "0%" }} />
        </div>
        <p className="mt-2 text-sm font-bold">78 de 100 unidades vendidas esta semana</p>
        <p className="mt-5 text-sm font-semibold text-white/90">La oferta vence en:</p>
        <p className="mt-1 text-[24px] font-extrabold leading-none"><Countdown dark /></p>
        <button onClick={scrollToForm} className="mt-7 h-[60px] w-full rounded-[10px] bg-white px-6 py-4 text-[15px] font-extrabold uppercase tracking-[0.05em] text-[#7F1D1D] transition hover:scale-[1.02] md:w-auto">
          ASEGURAR MI UNIDAD AHORA →
        </button>
        <p className="mt-2 text-[12px] text-white/70">🔒 Pago contra entrega · Sin tarjeta · Sin riesgo</p>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-[12px] text-white sm:flex-row sm:gap-6">
          <span>📦 Envío gratis</span>
          <span>🛡️ Garantía 30 días</span>
          <span>⚡ Despacho en 24h</span>
        </div>
      </div>
    </section>
  );
}
