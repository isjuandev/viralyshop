import { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Lock, Package, PawPrint, ShieldCheck, ShoppingCart, Star, Truck, Undo2 } from "lucide-react";
import { BASE_PRICE, COMPARE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { scrollToForm } from "../utils/scroll";
import { Countdown } from "./Countdown";
import { Reveal } from "./Reveal";

const colors = [
  { name: "Negro", hex: "#1a1a1a" },
  { name: "Azul", hex: "#1E90FF" },
  { name: "Rojo", hex: "#DC2626" },
];

const gallery = [
  { src: "/ChatGPT Image 15 may 2026, 02_40_51 a.m..png", label: "Producto limpio" },
  { src: "/ChatGPT Image 15 may 2026, 02_07_56 a.m..png", label: "Paseo con dos perros" },
  { src: "/ChatGPT Image 15 may 2026, 02_10_16 a.m..png", label: "Beneficios principales" },
  { src: "/ChatGPT Image 15 may 2026, 02_09_34 a.m..png", label: "Antes y ahora" },
  { src: "/ChatGPT Image 15 may 2026, 02_15_49 a.m..png", label: "Sistema 360 grados" },
  { src: "/ChatGPT Image 15 may 2026, 02_49_19 a.m..png", label: "Cliente usando la correa" },
];

const trustItems = [
  { icon: Lock, text: "Compra segura" },
  { icon: Package, text: "Envío gratis" },
  { icon: Undo2, text: "30 días garantía" },
  { icon: Star, text: "4.9/5" },
];

export function Hero() {
  const [selected, setSelected] = useState("Negro");
  const [active, setActive] = useState(0);
  const current = gallery[active];
  const move = (step) => setActive((value) => (value + step + gallery.length) % gallery.length);

  return (
    <section id="product" className="scroll-mt-12 bg-[#FFF7ED]">
      <div className="sticky top-0 z-[900] bg-[#B91C1C] px-3 py-2 text-center text-[13px] font-extrabold text-white shadow-sm md:text-sm">
        <span>🔥 Oferta termina en: </span><Countdown dark /> <span>— Solo quedan 11 unidades</span>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-10 pt-4 md:grid-cols-[52fr_48fr] md:items-center md:gap-10 md:py-12">
        <Reveal className="md:order-1">
          <ProductGallery current={current} active={active} move={move} setActive={setActive} />
        </Reveal>

        <Reveal className="md:order-2">
          <p className="inline-flex rounded-full bg-[#111827] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white md:text-[11px]">
            CORREA RETRÁCTIL DOBLE · CONTROL INDIVIDUAL · 3 METROS
          </p>
          <h1 className="mt-4 text-[34px] font-black leading-[0.98] tracking-[-0.04em] text-[#111827] md:text-[58px]">
            Control real para dos perros. En una sola mano.
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[14px] font-bold text-[#374151]">
            <span className="text-[#F59E0B]">★★★★★</span>
            <span>4.9/5 — 127 reseñas · 847 colombianos ya la tienen</span>
          </div>

          <div className="mt-4 rounded-2xl border border-[#FED7AA] bg-white p-4 shadow-[0_18px_44px_rgba(154,52,18,0.10)]">
            <div className="flex flex-wrap items-end gap-3">
              <span className="pb-1 text-xl font-bold text-[#9CA3AF] line-through">${formatPrice(COMPARE_PRICE)}</span>
              <span className="text-[38px] font-black leading-none text-[#1E90FF]">${formatPrice(BASE_PRICE)} COP</span>
              <span className="rounded-full bg-[#16A34A] px-3 py-1 text-sm font-extrabold text-white">Ahorras $15.000</span>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-extrabold text-[#111827]">Elige tu color</p>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelected(color.name)}
                    className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-extrabold transition ${selected === color.name ? "border-[#1E90FF] bg-[#EFF6FF] ring-2 ring-[#1E90FF]/20" : "border-[#E5E7EB] bg-white"}`}
                  >
                    <span className="size-5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={scrollToForm} className="mt-5 inline-flex h-[60px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#1E90FF] px-4 text-[15px] font-black uppercase tracking-[0.03em] text-white shadow-[0_16px_34px_rgba(30,144,255,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_42px_rgba(30,144,255,0.42)]">
              PEDIR AHORA — PAGO CONTRA ENTREGA <ShoppingCart className="size-5" />
            </button>
            <p className="mt-3 text-center text-[13px] font-bold text-[#4B5563]">Sin tarjeta. Sin riesgo. Pagas en efectivo cuando lo recibes.</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] font-extrabold text-[#374151] sm:grid-cols-4">
            {trustItems.map(({ icon: Icon, text }) => <span key={text} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-2 py-3 shadow-sm"><Icon className="size-4 text-[#1E90FF]" />{text}</span>)}
          </div>

          <div className="mt-4 rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
            <p className="text-[13px] leading-relaxed text-[#374151]"><span className="font-bold text-[#F59E0B]">★★★★★</span> "Llegó en 4 días, mis perros ya no se enredan" — <span className="font-bold">Camila R., Bogotá</span> ✅ Compra verificada</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductGallery({ current, active, move, setActive }) {
  return (
    <div className="rounded-2xl border border-[#FED7AA] bg-white p-2 shadow-[0_24px_70px_rgba(154,52,18,0.16)] md:p-3">
      <div className="relative h-[280px] overflow-hidden rounded-xl bg-[#F8F8F8] md:aspect-square md:h-auto">
        <img src={current.src} alt={current.label} className="h-full w-full object-cover" fetchPriority={active === 0 ? "high" : "auto"} loading={active === 0 ? "eager" : "lazy"} />
        <button aria-label="Imagen anterior" onClick={() => move(-1)} className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"><ArrowLeft className="size-5" /></button>
        <button aria-label="Imagen siguiente" onClick={() => move(1)} className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"><ArrowRight className="size-5" /></button>
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#0A0A0A] shadow"><BadgeCheck className="size-3.5 text-[#16A34A]" /> Producto destacado</span>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-2">
        {gallery.map((item, index) => (
          <button key={item.label} aria-label={item.label} onClick={() => setActive(index)} className={`aspect-square rounded-lg border bg-[#F8F8F8] p-1 transition ${active === index ? "border-[3px] border-[#1E90FF]" : "border-[#E5E7EB]"}`}>
            <img src={item.src} alt="" className="h-full w-full rounded-md object-cover" loading="lazy" />
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold text-[#374151]">
        <span className="rounded-lg bg-[#EFF6FF] p-2"><PawPrint className="mx-auto mb-1 size-4 text-[#1E90FF]" />2 perros</span>
        <span className="rounded-lg bg-[#EFF6FF] p-2"><ShieldCheck className="mx-auto mb-1 size-4 text-[#16A34A]" />Garantía</span>
        <span className="rounded-lg bg-[#EFF6FF] p-2"><Truck className="mx-auto mb-1 size-4 text-[#1E90FF]" />Gratis</span>
      </div>
    </div>
  );
}
