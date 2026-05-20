import { Headphones, PackageCheck, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  [
    ShieldCheck,
    "Garantía 30 Días",
    "Si no te convence por cualquier razón, devolvemos el 100% de tu dinero. Sin preguntas.",
  ],
  [
    PackageCheck,
    "Envío Asegurado",
    "Si el paquete llega dañado o se pierde, te enviamos otro completamente gratis.",
  ],
  [
    Headphones,
    "Soporte por WhatsApp",
    "Una persona real responde antes y después de tu compra. Sin bots. Sin esperas largas.",
  ],
];

export function Guarantee() {
  return (
    <section className="section-shell bg-[var(--color-white)] py-4 md:py-8">
      <div className="container-shell text-center">
        <Reveal className="rounded-3xl bg-[var(--color-surface)] p-4 md:p-8 lg:mx-auto lg:max-w-[800px] lg:p-10">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/Aliados.png"
              alt="Mensajeros entregando pedido PaseoCan"
              className="h-auto w-full object-contain md:h-72 lg:max-h-[400px] lg:object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <span className="kicker">Compra protegida</span>
          <h2 className="section-title mt-2 text-[28px] md:mt-3">
            Compra sin miedo. En serio.
          </h2>
        </Reveal>
        <div className="mx-auto mt-5 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-6 lg:max-w-[1000px] lg:gap-6">
          {items.map(([Icon, title, text], i) => (
            <Reveal key={title} delay={i * 100}>
              <article className="card-surface card-hover p-4 md:p-6">
                <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-[var(--color-success-light)] text-[var(--color-success)] md:size-14">
                  <Icon size={22} className="md:size-7" />
                </span>
                <h3 className="mt-3 text-[18px] font-bold md:mt-4 md:text-[20px]">
                  {title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--color-muted)] md:mt-2 md:text-[15px]">
                  {text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
