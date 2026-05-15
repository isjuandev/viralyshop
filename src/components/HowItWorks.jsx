import { Footprints, Link2, SlidersHorizontal } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  ["01", Link2, "Conecta", "Engancha cada correa retráctil al collar de cada perro por separado."],
  ["02", SlidersHorizontal, "Controla individualmente", "Usa el botón de color de cada correa para frenar o soltar a cada perro de forma independiente."],
  ["03", Footprints, "Disfruta", "El giro 360° evita los enredos automáticamente. Tú solo camina y disfruta."],
];

export function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="text-center text-[28px] font-bold md:text-[42px]">Listo en 3 pasos. Sin complicaciones.</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([n, Icon, title, text], i) => (
            <Reveal key={n} delay={i * 100}><article className="card-hover rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]"><div className="text-5xl font-extrabold text-[#1E90FF]">{n}</div><Icon className="mt-4 size-11 text-[#1E90FF]" /><h3 className="mt-3 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{text}</p></article></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
