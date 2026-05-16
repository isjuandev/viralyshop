import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "./Reveal";

const BASE_SOCIAL_PROOF = 847;
const STORAGE_KEY = "social-proof-count";

const reviews = [
  ["C", "Camila R.", "Bogotá", "Tengo dos perros pequeños y los controlo perfecto. Las 3 metros de correa les dan libertad pero sin perder control."],
  ["A", "Andrés M.", "Medellín", "El freno individual es genial — puedo parar a uno sin afectar al otro. Llegó en 5 días, muy bien empacado."],
  ["L", "Laura T.", "Cali", "Pagar contra entrega me dio confianza para comprar. El giro automático de verdad funciona, no se enredan."],
];

export function SocialProof() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(BASE_SOCIAL_PROOF);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY) || 0);
    const randomIncrease = Math.floor(Math.random() * 5) + 1;
    const nextValue = Math.max(stored, BASE_SOCIAL_PROOF) + randomIncrease;
    localStorage.setItem(STORAGE_KEY, String(nextValue));
    setFinalCount(nextValue);
  }, []);

  useEffect(() => {
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 1500);
        setCount(Math.floor(progress * finalCount));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [finalCount]);

  return (
    <section className="bg-[#F8F8F8] px-4 py-12 text-center">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="text-[72px] font-extrabold leading-none text-[#1E90FF]">{count}+</div>
        <p className="mx-auto mt-3 max-w-xl text-[#374151]">dueños de perros en Colombia que ya disfrutan los paseos</p>
        <p className="mt-2 text-[16px] text-[#374151]">y creciendo cada día 📦</p>
        <div className="mt-5 flex items-center justify-center">
          {["C", "A", "L", "M", "S"].map((a, i) => <span key={a} className="-ml-2 flex size-10 items-center justify-center rounded-full border-2 border-white font-bold text-white first:ml-0" style={{ backgroundColor: ["#1E90FF", "#16A34A", "#DC2626", "#0A0A0A", "#7C3AED"][i] }}>{a}</span>)}
        </div>
        <p className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-bold">
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-[#F59E0B] text-[#F59E0B]" />)}
          <span className="ml-1">4.9/5 — 127 reseñas verificadas</span>
        </p>
        <div className="mx-auto mt-7 w-full max-w-[400px] rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[#374151]">
            <span className="w-[86px] text-left">⭐⭐⭐⭐⭐</span><span className="w-[82px] text-left">5 estrellas</span><div className="h-2 flex-1 rounded bg-[#E5E7EB]"><div className="h-2 w-[89%] rounded bg-[#1E90FF]" /></div><span>89%</span>
          </div>
          <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[#374151]">
            <span className="w-[86px] text-left">⭐⭐⭐⭐</span><span className="w-[82px] text-left">4 estrellas</span><div className="h-2 flex-1 rounded bg-[#E5E7EB]"><div className="h-2 w-[8%] rounded bg-[#9CA3AF]" /></div><span>8%</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#374151]">
            <span className="w-[86px] text-left">⭐⭐⭐</span><span className="w-[82px] text-left">3 estrellas</span><div className="h-2 flex-1 rounded bg-[#E5E7EB]"><div className="h-2 w-[3%] rounded bg-[#9CA3AF]" /></div><span>3%</span>
          </div>
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map(([initial, name, city, text], i) => (
            <Reveal key={name} delay={i * 100} className="min-w-full snap-start text-left md:min-w-[280px]">
              <article className="card-hover rounded-xl bg-white p-5 shadow-sm">
                <img src={["/social-proof.webp", "/lifestyle-walk.webp", "/product-bundle.webp"][i]} alt={`Reseña de ${name}`} className="mb-4 aspect-[4/3] w-full rounded-lg object-cover" loading="lazy" />
                <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[#1E90FF] font-bold text-white">{initial}</span><div><h3 className="text-lg font-semibold">{name}</h3><p className="text-[13px] font-medium text-[#6B7280]">{city}</p><span className="mt-1 inline-flex rounded bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-bold text-[#166534]">✅ Compra verificada</span></div></div>
                <div className="mt-3 flex gap-0.5">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-[#F59E0B] text-[#F59E0B]" />)}</div>
                <p className={`${expanded[name] ? "mt-2 text-sm leading-relaxed text-[#374151]" : "mt-2 line-clamp-2 text-sm leading-relaxed text-[#374151]"}`}>"{text}"</p>
                {!expanded[name] && (
                  <button onClick={() => setExpanded((prev) => ({ ...prev, [name]: true }))} className="mt-1 text-sm font-semibold text-[#1E90FF]">
                    Leer más
                  </button>
                )}
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-7 text-center text-sm text-[#374151]">
          <a
            href="https://wa.me/?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20la%20correa%20PaseoCan%20antes%20de%20hacer%20mi%20pedido"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#1E90FF]"
          >
            ¿Tienes dudas? Escríbenos por WhatsApp antes de pedir →
          </a>
        </p>
      </div>
    </section>
  );
}
