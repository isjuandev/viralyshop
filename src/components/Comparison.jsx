import { CheckCircle, XCircle } from "lucide-react";
import { BASE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { Reveal } from "./Reveal";

const rows = [["Pasea 2 perros a la vez", false, true], ["Freno individual x perro", false, true], ["Giro 360° anti-enredo", false, true], ["Retráctil automática", false, true], ["3 metros de extensión", false, true], ["Garantía 30 días", false, true], ["Precio", "Variable", `$${formatPrice(BASE_PRICE)} COP`]];

export function Comparison() {
  return (
    <section className="section-shell bg-[var(--color-white)]">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-3xl text-center"><span className="kicker">PaseoCan vs competencia</span><h2 className="section-title mt-3 text-[28px] leading-tight md:text-[48px]">No es una correa común. Es una correa doble.</h2></Reveal>
        <Reveal className="card-surface mt-8 overflow-hidden md:mt-10">
          <div className="grid grid-cols-[1fr_76px_104px] gap-2 bg-[var(--color-dark)] px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white md:grid-cols-[1.4fr_1fr_1fr] md:px-5 md:text-sm">
            <span>Característica</span><span className="text-center text-white/70">Común</span><span className="text-center rounded bg-[var(--color-primary)] px-2 py-1">PaseoCan</span>
          </div>
          <div className="divide-y divide-[var(--color-border)] bg-white">
            {rows.map(([feature, common, paseoCan], i) => (
              <div key={feature} className={`grid grid-cols-[1fr_76px_104px] items-center gap-2 px-3 py-3 md:grid-cols-[1.4fr_1fr_1fr] md:px-5 md:py-4 ${i % 2 ? "bg-[var(--color-surface)]" : "bg-white"}`}>
                <p className="text-left text-[13px] font-extrabold leading-tight text-[var(--color-dark)] md:text-base">{feature}</p>
                <div className="flex justify-center">{renderValue(common, false)}</div>
                <div className="flex justify-center">{renderValue(paseoCan, true)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function renderValue(value, highlighted) {
  if (value === true) return <CheckCircle size={18} className="text-[var(--color-success)]" fill="currentColor" strokeWidth={2} />;
  if (value === false) return <XCircle size={18} className="text-[var(--color-urgency)]" strokeWidth={2} />;
  return <span className={`rounded-full px-2.5 py-1 text-center text-[12px] font-extrabold md:text-sm ${highlighted ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]" : "bg-slate-100 text-[var(--color-muted)]"}`}>{value}</span>;
}
