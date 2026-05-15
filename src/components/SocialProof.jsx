import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "./Reveal";

const reviews = [
  ["C", "Camila R.", "Bogotá", "Tengo dos perros pequeños y los controlo perfecto. Las 3 metros de correa les dan libertad pero sin perder control."],
  ["A", "Andrés M.", "Medellín", "El freno individual es genial — puedo parar a uno sin afectar al otro. Llegó en 5 días, muy bien empacado."],
  ["L", "Laura T.", "Cali", "Pagar contra entrega me dio confianza para comprar. El giro automático de verdad funciona, no se enredan."],
];

export function SocialProof() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let frame;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 1100);
        setCount(Math.floor(progress * 847));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
      return () => cancelAnimationFrame(frame);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F8F8F8] px-4 py-12 text-center">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="text-[72px] font-extrabold leading-none text-[#1E90FF]">{count}+</div>
        <p className="mx-auto mt-3 max-w-xl text-[#374151]">dueños de perros en Colombia que ya disfrutan los paseos</p>
        <div className="mt-5 flex items-center justify-center">
          {["C", "A", "L", "M", "S"].map((a, i) => <span key={a} className="-ml-2 flex size-10 items-center justify-center rounded-full border-2 border-white font-bold text-white first:ml-0" style={{ backgroundColor: ["#1E90FF", "#16A34A", "#DC2626", "#0A0A0A", "#7C3AED"][i] }}>{a}</span>)}
        </div>
        <p className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-bold">
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-[#F59E0B] text-[#F59E0B]" />)}
          <span className="ml-1">4.9/5 — 127 reseñas verificadas</span>
        </p>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map(([initial, name, city, text], i) => (
            <Reveal key={name} delay={i * 100} className="min-w-[280px] text-left">
              <article className="card-hover rounded-xl bg-white p-5 shadow-sm">
                <img src={["/social-proof.webp", "/lifestyle-walk.webp", "/product-bundle.webp"][i]} alt={`Reseña de ${name}`} className="mb-4 aspect-[4/3] w-full rounded-lg object-cover" loading="lazy" />
                <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[#1E90FF] font-bold text-white">{initial}</span><div><h3 className="text-lg font-semibold">{name}</h3><p className="text-[13px] font-medium text-[#6B7280]">{city}</p></div></div>
                <div className="mt-3 flex gap-0.5">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-[#F59E0B] text-[#F59E0B]" />)}</div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#374151]">"{text}"</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
