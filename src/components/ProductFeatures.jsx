import { Feather, Gauge, RefreshCw, Ruler } from "lucide-react";
import { PRODUCT_NAME } from "../constants";
import { Reveal } from "./Reveal";

const features = [
  [RefreshCw, "Giro Automático 360°", "El mecanismo central rota sin límite para desenredar las correas sin que tengas que hacer nada."],
  [Gauge, "Freno Doble Independiente", "Botón de color diferente por cada perro. Controlas a cada uno sin afectar al otro."],
  [Ruler, "3 Metros de Libertad", "Cada correa se extiende hasta 3 metros y se retrae automáticamente con el movimiento del perro."],
  [Feather, "Ligera y Cómoda", "Solo 450 g totales. Agarradera ergonómica diseñada para paseos largos sin fatiga."],
];
const specs = [["Nombre", PRODUCT_NAME], ["Material", "Plástico ABS + herrajes + cinta poliéster"], ["Longitud", "3 metros por correa"], ["Peso neto", "450 g"], ["Embalaje", "21 × 19 cm"], ["Peso máx/perro", "11.4 kg (25 lb)"], ["Perros máx", "2 simultáneamente"], ["Colores", "Negro · Azul · Rojo"]];

export function ProductFeatures() {
  return (
    <section className="section-shell bg-[var(--color-surface)]">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-[720px] text-center"><span className="kicker">Características técnicas</span><h2 className="section-title mt-3">Todo lo que incluye tu correa</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          {features.map(([Icon, title, text], i) => <Reveal key={title} delay={i * 100}><article className="card-surface card-hover p-5 md:p-6"><span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]"><Icon size={22} /></span><h3 className="mt-4 text-[20px] font-bold">{title}</h3><p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">{text}</p></article></Reveal>)}
        </div>
        <Reveal className="card-surface mt-8 overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody>{specs.map(([k, v], i) => <tr key={k} className={i % 2 ? "bg-[var(--color-surface)]" : "bg-white"}><th className="w-[42%] px-4 py-4 font-bold text-[var(--color-dark)]">{k}</th><td className="px-4 py-4 text-[var(--color-body)]">{v}</td></tr>)}</tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
