import { Check, X } from "lucide-react";
import { scrollToForm } from "../utils/scroll";
import { Reveal } from "./Reveal";

const before = ["Las dos correas se enredan constantemente", "Paras a uno y el otro sigue jalando", "3 metros de correa en cada mano: agotador", "Pierdes el control si jalan en sentidos distintos", "Correas convencionales que no fueron hechas para dos"];
const after = ["Giro 360° que desenreda solo, siempre", "Freno individual: paras a uno sin mover al otro", "3 metros retráctiles que se ajustan al movimiento", "Una sola agarradera para control total con una mano", "Diseñada específicamente para pasear dos perros"];

export function ProblemSolution() {
  return (
    <section className="section-shell bg-[var(--color-surface)]">
      <div className="container-shell">
        <Reveal className="text-center">
          <span className="kicker">Problema vs solución</span>
          <h2 className="section-title mt-3">¿Te identificas con esto?</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_48px_1fr] md:items-center">
          <ProblemColumn title="Tu paseo hoy" tone="bad" items={before} />
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-[var(--color-dark)] font-extrabold text-white">VS</div>
          <ProblemColumn title="Tu paseo con PaseoCan" tone="good" items={after} />
        </div>
        <p className="my-6 text-center text-[15px] italic text-[var(--color-muted)]">El problema no son tus perros. Es la correa equivocada.</p>
        <div className="mx-auto max-w-[420px] text-center">
          <button onClick={scrollToForm} className="btn-primary">QUIERO PASEOS SIN ESTRÉS → $109.000</button>
        </div>
      </div>
    </section>
  );
}

function ProblemColumn({ title, tone, items }) {
  const isGood = tone === "good";
  const Icon = isGood ? Check : X;
  return (
    <div className={`overflow-hidden rounded-2xl border ${isGood ? "border-[var(--color-success)]/25 bg-[var(--color-success-light)]" : "border-[var(--color-urgency)]/25 bg-[var(--color-urgency-light)]"}`}>
      <div className={`border-l-[3px] px-4 py-3 text-[13px] font-extrabold uppercase tracking-[0.05em] ${isGood ? "border-[var(--color-success)] text-[var(--color-success)]" : "border-[var(--color-urgency)] text-[var(--color-urgency)]"}`}>{title}</div>
      <div className="divide-y divide-black/5 bg-white/65">
        {items.map((item, i) => (
          <Reveal key={item} delay={i * 80}>
            <div className="flex gap-3 px-4 py-3.5 text-[14px] font-medium leading-snug text-[var(--color-body)]">
              <Icon size={14} className={isGood ? "mt-0.5 shrink-0 text-[var(--color-success)]" : "mt-0.5 shrink-0 text-[var(--color-urgency)]"} strokeWidth={2} />
              {item}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
