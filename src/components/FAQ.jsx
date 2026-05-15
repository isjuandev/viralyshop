import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  ["¿Puedo pagar contra entrega?", "Sí. Pagas en efectivo cuando el paquete llega a tu puerta. Sin tarjeta, sin riesgo."],
  ["¿Cuánto tarda el envío?", "Entre 3 y 7 días hábiles. Te enviamos número de guía por WhatsApp para rastrear en tiempo real."],
  ["¿Para qué tamaño de perro es?", "Está diseñada para perros de hasta 11.4 kg (25 lb) cada uno. Máximo 2 perros simultáneamente."],
  ["¿Las dos correas se pueden usar independientemente?", "Sí. Cada correa tiene su propio botón de freno y se controla por separado, aunque compartan la misma agarradera."],
  ["¿Qué tan largas son las correas?", "Cada correa se extiende hasta 3 metros y se retrae automáticamente según el movimiento del perro."],
  ["¿Qué pasa si el producto llega dañado?", "Contáctanos por WhatsApp y te enviamos uno nuevo sin costo. Tienes 30 días de garantía desde que lo recibes."],
  ["¿Se puede usar con un solo perro?", "No es recomendable. La segunda correa suelta puede causar enredos o accidentes. Está diseñada para dos perros."],
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#F8F8F8] px-4 py-20">
      <div className="mx-auto max-w-[700px]">
        <Reveal><h2 className="text-center text-[28px] font-bold md:text-[42px]">Preguntas frecuentes</h2></Reveal>
        <div className="mt-8 space-y-3">{faqs.map(([q, a], i) => <Reveal key={q} delay={i * 50}><div className="rounded-xl bg-white shadow-sm"><button className="flex w-full items-center justify-between gap-4 p-4 text-left font-bold" onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><span>{open === i ? "−" : "+"}</span></button><div className={`grid transition-all duration-300 ease-in-out ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="px-4 pb-4 leading-relaxed text-[#6B7280]">{a}</p></div></div></div></Reveal>)}</div>
      </div>
    </section>
  );
}
