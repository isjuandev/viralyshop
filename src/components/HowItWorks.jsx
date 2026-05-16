import { Link2, SlidersHorizontal, Smile } from "lucide-react";
import { Reveal } from "./Reveal";
import { scrollToForm } from "../utils/scroll";

const steps = [
  ["01", Link2, "Conecta", "Engancha cada correa retráctil al collar de cada perro por separado."],
  ["02", SlidersHorizontal, "Controla individualmente", "Usa el botón de cada correa para frenar o soltar a cada perro sin afectar al otro."],
  ["03", Smile, "Disfruta", "El giro 360° evita los enredos solo. Tú solo camina y disfruta."],
];

export function HowItWorks() {
  return (
    <section className="section-shell bg-[var(--color-white)]">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <span className="kicker">Listo en 3 pasos</span>
          <h2 className="section-title mt-3">Así de fácil es usar PaseoCan</h2>
          <p className="section-subtitle">No necesitas experiencia. No necesitas dos manos. Solo conecta y camina.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          {steps.map(([n, Icon, title, text], i) => (
            <Reveal key={n} delay={i * 100}>
              <article className="card-surface card-hover p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[32px] font-extrabold leading-none text-[var(--color-primary)]">{n}</span>
                  <span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]"><Icon size={28} strokeWidth={2} /></span>
                </div>
                <h3 className="mt-4 text-[20px] font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button onClick={scrollToForm} className="inline-flex flex-col items-center text-[var(--color-primary)]">
            <span className="bounce-arrow text-3xl leading-none">↓</span>
            <span className="text-[13px] font-bold">Ve el precio de lanzamiento →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
