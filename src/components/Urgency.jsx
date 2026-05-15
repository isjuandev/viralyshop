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
        <h2 className="inline-flex items-center justify-center gap-2 text-[28px] font-bold md:text-[42px]"><AlertTriangle className="size-8 md:size-10" />Stock muy limitado</h2>
        <p className="mt-2 text-lg">Solo quedan 11 unidades al precio de oferta</p>
        <div className="mt-8 h-5 overflow-hidden rounded-full bg-[#3F1111]">
          <div className="h-full rounded-full bg-[#DC2626] transition-all duration-1000" style={{ width: active ? "78%" : "0%" }} />
        </div>
        <p className="mt-2 text-sm font-bold">78 de 100 unidades vendidas esta semana</p>
        <p className="mt-5 text-sm">Oferta termina en: <Countdown dark /></p>
        <button onClick={scrollToForm} className="mt-7 rounded-[10px] bg-white px-6 py-4 text-[15px] font-extrabold uppercase tracking-[0.05em] text-[#7F1D1D] transition hover:scale-[1.02]">
          ASEGURAR MI UNIDAD AHORA →
        </button>
      </div>
    </section>
  );
}
