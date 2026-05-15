import { Check, X } from "lucide-react";
import { BASE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { Reveal } from "./Reveal";

const rows = [["Pasea 2 perros a la vez", false, true], ["Freno individual x perro", false, true], ["Giro 360° anti-enredo", false, true], ["Retráctil automática", false, true], ["3 metros de extensión", false, true], ["Garantía 30 días", false, true], ["Precio", "Variable", `$${formatPrice(BASE_PRICE)} COP`]];

export function Comparison() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="text-center text-[28px] font-bold md:text-[42px]">No es una correa común. Es una correa doble.</h2></Reveal>
        <Reveal className="mt-10 overflow-x-auto">
          <table className="min-w-[680px] w-full overflow-hidden rounded-xl border border-[#E5E7EB] text-center text-sm">
            <thead><tr className="bg-[#F8F8F8]"><th className="p-4 text-left">Característica</th><th className="p-4">Correa Común</th><th className="border-2 border-[#1E90FF] bg-[#DBEAFE] p-4">PaseoCan Doble <span className="ml-2 rounded-full bg-[#1E90FF] px-2 py-1 text-[10px] font-bold text-white">TÚ ELIGES</span></th></tr></thead>
            <tbody>{rows.map(([a, b, c]) => <tr key={a} className="border-t border-[#E5E7EB]"><td className="p-4 text-left font-bold">{a}</td><td className="p-4">{renderValue(b)}</td><td className="border-x-2 border-[#1E90FF] bg-[#EFF6FF] p-4 font-extrabold text-[#0A0A0A]">{renderValue(c)}</td></tr>)}</tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

function renderValue(value) {
  if (value === true) return <Check className="mx-auto size-5 text-[#16A34A]" />;
  if (value === false) return <X className="mx-auto size-5 text-[#DC2626]" />;
  return value;
}
