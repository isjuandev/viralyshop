import { Gauge, RotateCw, Ruler, Zap } from "lucide-react";
import { PRODUCT_NAME } from "../constants";
import { Reveal } from "./Reveal";

const features = [
  [RotateCw, "Giro Automático 360°", "El mecanismo central rota sin límite para desenredar las correas sin que tengas que hacer nada."],
  [Gauge, "Freno Doble Independiente", "Botón de color diferente por cada perro. Controlas a cada uno sin afectar al otro."],
  [Ruler, "3 Metros de Libertad", "Cada correa se extiende hasta 3 metros y se retrae automáticamente con el movimiento del perro."],
  [Zap, "Ligera y Cómoda", "Solo 450 g totales. Agarradera ergonómica diseñada para paseos largos sin fatiga."],
];
const specs = [["Nombre", PRODUCT_NAME], ["Material", "Plástico ABS + herrajes + cinta poliéster"], ["Longitud", "3 metros por correa"], ["Peso neto", "450 g"], ["Embalaje", "21 × 19 cm"], ["Peso máx/perro", "11.4 kg (25 lb)"], ["Perros máx", "2 simultáneamente"], ["Colores", "Negro · Azul · Rojo"]];

export function ProductFeatures() {
  return (
    <section className="bg-[#F8F8F8] px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="text-center text-[28px] font-bold md:text-[42px]">Todo lo que incluye tu correa</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map(([Icon, title, text], i) => <Reveal key={title} delay={i * 100}><article className="card-hover rounded-xl bg-white p-6 shadow-sm"><Icon className="size-12 text-[#1E90FF]" /><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 leading-relaxed text-[#6B7280]">{text}</p></article></Reveal>)}
        </div>
        <Reveal className="mt-10 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <tbody>{specs.map(([k, v], i) => <tr key={k} className={i % 2 ? "bg-[#F8F8F8]" : "bg-white"}><th className="w-[42%] px-4 py-4 font-bold">{k}</th><td className="px-4 py-4 text-[#374151]">{v}</td></tr>)}</tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
