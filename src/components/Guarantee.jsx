import { Headphones, PackageCheck, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  [ShieldCheck, "Garantía 30 Días", "Si no te convence por cualquier razón, devolvemos el 100% de tu dinero. Sin preguntas."],
  [PackageCheck, "Envío Asegurado", "Si el paquete llega dañado o se pierde, te enviamos otro completamente gratis."],
  [Headphones, "Soporte por WhatsApp", "Una persona real responde antes y después de tu compra. Sin bots. Sin esperas largas."],
];

export function Guarantee() {
  return (
    <section className="section-shell bg-[var(--color-white)]">
      <div className="container-shell text-center">
        <Reveal><span className="kicker">Compra protegida</span><h2 className="section-title mt-3">Compra sin miedo. En serio.</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">{items.map(([Icon, title, text], i) => <Reveal key={title} delay={i * 100}><article className="card-surface card-hover p-5 md:p-6"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-success-light)] text-[var(--color-success)]"><Icon size={28} /></span><h3 className="mt-4 text-[20px] font-bold">{title}</h3><p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{text}</p></article></Reveal>)}</div>
      </div>
    </section>
  );
}
