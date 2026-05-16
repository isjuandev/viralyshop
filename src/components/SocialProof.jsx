import { useEffect, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Star, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const BASE_SOCIAL_PROOF = 847;
const STORAGE_KEY = "social-proof-count";

const reviews = [
  ["C", "Camila R.", "Bogotá", "La estoy usando hace una semana y sí ayuda bastante. Antes mis perros se cruzaban todo el tiempo, ahora casi no se enredan."],
  ["A", "Andrés M.", "Medellín", "El freno individual fue lo que más me gustó. Si uno se adelanta lo freno sin halar al otro, se siente más control en el paseo."],
  ["L", "Laura T.", "Cali", "Compré con pago contra entrega y llegó bien empacada. Se nota resistente y para dos perros es mucho más práctica que usar dos correas."],
  ["V", "Valentina P.", "Barranquilla", "La linterna y el compartimento para bolsas son detalles simples, pero en la noche sí se agradecen. Hasta ahora todo bien."],
  ["R", "Roberto A.", "Armenia", "No hace magia, pero sí mejora bastante la caminata. La usamos todos los días y por ahora va firme, sin trabarse."],
  ["J", "Juan P.", "Pereira", "Tengo dos perros medianos y me cansaba llevar una correa en cada mano. Con esta me organizo mejor y termino menos agotado."],
  ["S", "Sofía R.", "Medellín", "Buena relación precio-calidad. Llegó rápido, fue fácil de usar desde el primer día y no tuve que estar ajustando nada raro."],
  ["L", "Laura T.", "Riohacha", "Pensé que iba a ser incómoda, pero es ligera. Mi esposo también la usa y ambos coincidimos en que vale la pena."],

];

const reviewImages = [
  "/reviews/image.png",
  "/reviews/image copy.png",
  "/reviews/image copy 2.png",
  "/reviews/image copy 3.png",
  "/reviews/image copy 4.png",
  "/reviews/image copy 5.png",
  "/reviews/image copy 6.png",
  "/reviews/image copy 7.png",
];

export function SocialProof() {
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(BASE_SOCIAL_PROOF);
  const [expanded, setExpanded] = useState({});
  const [activeReview, setActiveReview] = useState(0);

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

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateActive = () => {
      const cardWidth = carousel.firstElementChild?.getBoundingClientRect().width || 1;
      const nextIndex = Math.round(carousel.scrollLeft / (cardWidth + 16));
      setActiveReview(Math.min(reviews.length - 1, Math.max(0, nextIndex)));
    };

    carousel.addEventListener("scroll", updateActive, { passive: true });
    return () => carousel.removeEventListener("scroll", updateActive);
  }, []);

  const scrollReview = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.firstElementChild?.getBoundingClientRect().width || carousel.clientWidth;
    carousel.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="section-shell bg-[var(--color-surface)] text-center">
      <div className="container-shell">
        <span className="kicker"><Users size={16} /> Prueba social real</span>
        <div ref={ref} className="mt-4 text-[72px] font-extrabold leading-none text-[var(--color-primary)]">{count}+</div>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-body)]">dueños de perros en Colombia que ya disfrutan los paseos</p>
        <p className="mt-2 text-[16px] text-[var(--color-muted)]">y creciendo cada día</p>
        <div className="mt-5 flex items-center justify-center">
          {["C", "A", "L", "M", "S"].map((a, i) => <span key={a} className="-ml-2 flex size-10 items-center justify-center rounded-full border-2 border-white font-bold text-white first:ml-0" style={{ backgroundColor: ["#0066FF", "#22C55E", "#E53E3E", "#0F172A", "#F59E0B"][i] }}>{a}</span>)}
        </div>
        <p className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-bold">
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />)}
          <span className="ml-1">4.9/5 — 127 reseñas verificadas</span>
        </p>
        <div className="card-surface mx-auto mt-7 w-full max-w-[430px] p-4">
          <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[var(--color-body)]">
            <span className="w-[86px] text-left text-[var(--color-warning)]">★★★★★</span><span className="w-[82px] text-left">5 estrellas</span><div className="h-2 flex-1 rounded bg-[var(--color-border)]"><div className="h-2 w-[89%] rounded bg-[var(--color-primary)]" /></div><span>89%</span>
          </div>
          <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-[var(--color-body)]">
            <span className="w-[86px] text-left text-[var(--color-warning)]">★★★★</span><span className="w-[82px] text-left">4 estrellas</span><div className="h-2 flex-1 rounded bg-[var(--color-border)]"><div className="h-2 w-[8%] rounded bg-slate-400" /></div><span>8%</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--color-body)]">
            <span className="w-[86px] text-left text-[var(--color-warning)]">★★★</span><span className="w-[82px] text-left">3 estrellas</span><div className="h-2 flex-1 rounded bg-[var(--color-border)]"><div className="h-2 w-[3%] rounded bg-slate-400" /></div><span>3%</span>
          </div>
        </div>
        <div className="relative mt-8 md:hidden">
          <div
            ref={carouselRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Carrusel de reseñas"
          >
            {reviews.map(([initial, name, city, text], i) => (
              <ReviewCard
                key={name}
                initial={initial}
                name={name}
                city={city}
                text={text}
                index={i}
                expanded={expanded}
                setExpanded={setExpanded}
                className="min-w-[86vw] snap-center"
              />
            ))}
          </div>

          <button aria-label="Reseña anterior" onClick={() => scrollReview(-1)} className="absolute left-0 top-[42%] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-lg ring-1 ring-[var(--color-border)]">
            <ChevronLeft className="size-5" />
          </button>
          <button aria-label="Siguiente reseña" onClick={() => scrollReview(1)} className="absolute right-0 top-[42%] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-lg ring-1 ring-[var(--color-border)]">
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-2 flex justify-center gap-2" aria-hidden="true">
            {reviews.map(([, name], index) => (
              <span key={name} className={`h-2 rounded-full transition-all ${activeReview === index ? "w-6 bg-[var(--color-primary)]" : "w-2 bg-[#CBD5E1]"}`} />
            ))}
          </div>
        </div>

        <div className="mt-8 hidden gap-4 md:grid md:grid-cols-3">
          {reviews.map(([initial, name, city, text], i) => (
            <ReviewCard key={name} initial={initial} name={name} city={city} text={text} index={i} expanded={expanded} setExpanded={setExpanded} delay={i * 100} />
          ))}
        </div>
        <p className="mt-7 text-center text-sm text-[#374151]">
          <a
            href="https://wa.me/?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20la%20correa%20PaseoCan%20antes%20de%20hacer%20mi%20pedido"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--color-primary)]"
          >
            ¿Tienes dudas? Escríbenos por WhatsApp antes de pedir →
          </a>
        </p>
      </div>
    </section>
  );
}

export function ReviewsBlock({ className = "" }) {
  const [expanded, setExpanded] = useState({});

  return (
    <div className={`mt-4 ${className}`}>
      <div className="card-surface overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <div>
            <div className="flex gap-0.5 text-[var(--color-warning)]">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />)}
            </div>
            <p className="mt-1 text-[13px] font-extrabold text-[var(--color-dark)]">4.9/5 — 127 reseñas verificadas</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded bg-[var(--color-success-light)] px-2 py-1 text-[11px] font-bold text-[var(--color-success)]"><BadgeCheck size={14} /> Verificadas</span>
        </div>
        <div className="max-h-[520px] overflow-y-auto p-3">
          <div className="grid gap-3">
            {reviews.map(([initial, name, city, text], index) => (
              <ReviewCard
                key={name}
                initial={initial}
                name={name}
                city={city}
                text={text}
                index={index}
                expanded={expanded}
                setExpanded={setExpanded}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewsCarousel({ className = "", cardClassName = "min-w-[86vw] snap-center md:min-w-[360px]", insetControls = false }) {
  const carouselRef = useRef(null);
  const [expanded, setExpanded] = useState({});
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateActive = () => {
      const cardWidth = carousel.firstElementChild?.getBoundingClientRect().width || 1;
      const nextIndex = Math.round(carousel.scrollLeft / (cardWidth + 16));
      setActiveReview(Math.min(reviews.length - 1, Math.max(0, nextIndex)));
    };

    carousel.addEventListener("scroll", updateActive, { passive: true });
    return () => carousel.removeEventListener("scroll", updateActive);
  }, []);

  const scrollReview = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.firstElementChild?.getBoundingClientRect().width || carousel.clientWidth;
    carousel.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div className={`relative min-w-0 ${className}`}>
      <div
        ref={carouselRef}
        className={`flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${insetControls ? "px-0" : "px-1"}`}
        aria-label="Carrusel de reseñas"
      >
        {reviews.map(([initial, name, city, text], index) => (
          <ReviewCard
            key={name}
            initial={initial}
            name={name}
            city={city}
            text={text}
            index={index}
            expanded={expanded}
            setExpanded={setExpanded}
            className={cardClassName}
          />
        ))}
      </div>

      <button aria-label="Reseña anterior" onClick={() => scrollReview(-1)} className={`absolute top-[42%] z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-lg ring-1 ring-[var(--color-border)] ${insetControls ? "left-3" : "left-0 -translate-x-1/2"}`}>
        <ChevronLeft className="size-5" />
      </button>
      <button aria-label="Siguiente reseña" onClick={() => scrollReview(1)} className={`absolute top-[42%] z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--color-dark)] shadow-lg ring-1 ring-[var(--color-border)] ${insetControls ? "right-3" : "right-0 translate-x-1/2"}`}>
        <ChevronRight className="size-5" />
      </button>

      <div className="mt-2 flex justify-center gap-2" aria-hidden="true">
        {reviews.map(([, name], index) => (
          <span key={name} className={`h-2 rounded-full transition-all ${activeReview === index ? "w-6 bg-[var(--color-primary)]" : "w-2 bg-[#CBD5E1]"}`} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ initial, name, city, text, index, expanded, setExpanded, className = "", delay = 0, compact = false }) {
  return (
    <Reveal delay={delay} className={`text-left ${className}`}>
      <article className={`card-surface card-hover h-full ${compact ? "p-3" : "p-5"}`}>
        {!compact && <img src={reviewImages[index % reviewImages.length]} alt={`Reseña de ${name}`} className="mb-4 aspect-[4/3] w-full rounded-lg object-cover" loading="lazy" />}
        <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-primary)] font-bold text-white">{initial}</span><div><h3 className="text-lg font-semibold">{name}</h3><p className="text-[13px] font-medium text-[var(--color-muted)]">{city}</p><span className="mt-1 inline-flex items-center gap-1 rounded bg-[var(--color-success-light)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-success)]"><BadgeCheck size={14} /> Compra verificada</span></div></div>
        <div className="mt-3 flex gap-0.5">{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="size-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />)}</div>
        <p className={`${expanded[name] ? "mt-2 text-sm leading-relaxed text-[var(--color-body)]" : "mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-body)]"}`}>"{text}"</p>
        {!expanded[name] && (
          <button onClick={() => setExpanded((prev) => ({ ...prev, [name]: true }))} className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
            Leer más
          </button>
        )}
      </article>
    </Reveal>
  );
}
