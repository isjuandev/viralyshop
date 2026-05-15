import { Check, X } from "lucide-react";
import { scrollToForm } from "../utils/scroll";
import { Reveal } from "./Reveal";

const before = ["Las dos correas se enredan constantemente", "Paras a uno y el otro sigue jalando", "3 metros de correa en cada mano — agotador", "Pierdes el control si jalan en sentidos distintos", "Correas convencionales que no fueron hechas para dos"];
const after = ["Giro 360° que desenreda solo — siempre", "Freno individual: para a uno sin mover al otro", "3 metros retráctiles — se ajustan solos al movimiento", "Una sola agarradera — control total con una mano", "Diseñada específicamente para pasear dos perros"];

export function ProblemSolution() {
  return (
    <section className="bg-[#0A0A0A] px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="text-center text-[28px] font-bold md:text-[42px]">¿Cuál es tu paseo hoy?</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="space-y-3">{before.map((item, i) => <Reveal key={item} delay={i * 80}><div className="flex gap-3 border-l-[3px] border-[#DC2626] bg-[#1A1A1A] p-4 text-sm font-semibold"><X className="mt-0.5 size-4 shrink-0 text-[#DC2626]" /> {item}</div></Reveal>)}</div>
          <div className="text-center text-4xl font-extrabold text-[#1E90FF]">VS</div>
          <div className="space-y-3">{after.map((item, i) => <Reveal key={item} delay={i * 80}><div className="flex gap-3 border-l-[3px] border-[#16A34A] bg-[#1A1A1A] p-4 text-sm font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-[#16A34A]" /> {item}</div></Reveal>)}</div>
        </div>
        <div className="mt-10 text-center"><button onClick={scrollToForm} className="rounded-[10px] border border-white px-6 py-4 text-[15px] font-bold uppercase tracking-[0.05em] transition hover:bg-white hover:text-[#0A0A0A]">QUIERO PASEOS SIN ESTRÉS →</button></div>
      </div>
    </section>
  );
}
