import { Headphones, PackageCheck, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  [ShieldCheck, "Garantía 30 Días", "Si no te convence por cualquier razón, devolvemos el 100% de tu dinero. Sin preguntas."],
  [PackageCheck, "Envío Asegurado", "Si el paquete llega dañado o se pierde, te enviamos otro completamente gratis."],
  [Headphones, "Soporte por WhatsApp", "Una persona real responde antes y después de tu compra. Sin bots. Sin esperas largas."],
];

export function Guarantee() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal><h2 className="text-[28px] font-bold md:text-[42px]">Compra sin miedo. En serio.</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{items.map(([Icon, title, text], i) => <Reveal key={title} delay={i * 100}><article className="card-hover p-4"><Icon className="mx-auto size-16 text-[#16A34A]" /><h3 className="mt-2 text-lg font-semibold">{title}</h3><p className="mt-2 leading-relaxed text-[#6B7280]">{text}</p></article></Reveal>)}</div>
      </div>
    </section>
  );
}
