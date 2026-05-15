import { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Lock, Package, PawPrint, Ruler, RotateCw, ShieldCheck, ShoppingCart, Star, Target, Truck, Undo2, Weight } from "lucide-react";
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
  { type: "image", src: "/ChatGPT Image 15 may 2026, 02_40_51 a.m..png", label: "Producto limpio" },
  { type: "image", src: "/ChatGPT Image 15 may 2026, 02_07_56 a.m..png", label: "Paseo con dos perros" },
  { type: "image", src: "/ChatGPT Image 15 may 2026, 02_10_16 a.m..png", label: "Beneficios principales" },
  { type: "image", src: "/ChatGPT Image 15 may 2026, 02_09_34 a.m..png", label: "Antes y ahora" },
  { type: "image", src: "/ChatGPT Image 15 may 2026, 02_15_49 a.m..png", label: "Sistema 360 grados" },
  { type: "image", src: "/ChatGPT Image 15 may 2026, 02_49_19 a.m..png", label: "Cliente usando la correa" },
];

const chips = [
  { icon: Ruler, text: "3 metros por correa" },
  { icon: Weight, text: "Hasta 11.4 kg por perro" },
  { icon: RotateCw, text: "Giro 360° anti-enredo" },
  { icon: Target, text: "Freno individual x2" },
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
    <section className="bg-white">
      <div className="relative min-h-[calc(100svh-104px)] overflow-hidden md:min-h-[720px]">
        <img src="/ChatGPT Image 15 may 2026, 02_19_04 a.m..png" alt="" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white/35 md:bg-gradient-to-r md:from-white md:via-white/90 md:to-white/10" />
        <div className="relative mx-auto flex min-h-[calc(100svh-104px)] max-w-6xl items-start px-4 py-10 md:min-h-[720px] md:items-center md:py-16">
          <Reveal className="max-w-[620px] pt-2 md:pt-0">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.45em] text-[#0A0A0A] md:text-sm">PASEA 2 PERROS</p>
            <h1 className="text-[52px] font-extrabold leading-[0.95] md:text-[92px]">
              Sin Enredos<span className="text-[#1E90FF]">.</span>
            </h1>
            <div className="mt-7 h-1 w-16 rounded-full bg-[#1E90FF]" />
            <p className="mt-8 max-w-[500px] text-lg leading-relaxed text-[#1F2937] md:text-2xl">
              Sistema 360° anti-enredos, control individual y hasta 3 metros de libertad para paseos más cómodos y seguros.
            </p>
            <button onClick={scrollToForm} className="mt-9 inline-flex h-16 w-full max-w-[300px] items-center justify-center gap-2 rounded-[18px] bg-[#1E90FF] text-[15px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_34px_rgba(30,144,255,0.3)] transition hover:scale-[1.02]">
              Ver producto <ShoppingCart className="size-5" />
            </button>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[55fr_45fr] md:items-center md:py-16">
        <Reveal className="order-2 md:order-1">
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-widest text-[#1E90FF]">CORREA RETRÁCTIL DOBLE · CONTROL INDIVIDUAL · 3 METROS</p>
          <h2 className="text-[34px] font-extrabold leading-[1.05] md:text-[52px]">Control real para dos perros. En una sola mano.</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#374151]">Dos correas retráctiles de 3 metros con freno independiente por perro y giro automático de 360°. Una sola mano. Cero caos.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F6] px-3 py-2 text-xs font-bold text-[#0A0A0A]"><Icon className="size-3.5 text-[#1E90FF]" />{text}</span>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xl font-bold text-[#9CA3AF] line-through">${formatPrice(COMPARE_PRICE)}</span>
              <span className="text-[34px] font-extrabold text-[#1E90FF]">${formatPrice(BASE_PRICE)} COP</span>
              <span className="rounded-full bg-[#16A34A] px-3 py-1 text-sm font-bold text-white">Ahorras $15.000</span>
            </div>
            <p className="mt-1 text-[13px] font-medium text-[#6B7280]">Oferta termina en: <Countdown /></p>
          </div>
          <div className="mt-5 flex items-center gap-4">
            {colors.map((color) => (
              <button key={color.name} aria-label={color.name} onClick={() => setSelected(color.name)} className={`size-10 rounded-full transition ${selected === color.name ? "scale-110 border-[3px] border-[#1E90FF]" : "border border-[#D1D5DB]"}`} style={{ backgroundColor: color.hex }} />
            ))}
          </div>
          <button onClick={scrollToForm} className="mt-6 inline-flex h-14 w-full max-w-[380px] items-center justify-center gap-2 rounded-[10px] bg-[#1E90FF] text-[15px] font-bold uppercase tracking-[0.05em] text-white transition hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(30,144,255,0.35)]">
            PEDIR AHORA — PAGO CONTRA ENTREGA <ShoppingCart className="size-5" />
          </button>
          <p className="mt-3 max-w-[380px] text-center text-[13px] font-medium text-[#6B7280]">Sin tarjeta. Sin riesgo. Pagas en efectivo cuando lo recibes.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-[#374151]">
            {trustItems.map(({ icon: Icon, text }) => <span key={text} className="inline-flex items-center gap-1"><Icon className="size-3.5 text-[#1E90FF]" />{text}</span>)}
          </div>
          <div className="mt-6 max-w-[420px] rounded-xl border border-[#E5E7EB] bg-white p-4">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.05em] text-[#6B7280]">Enviamos con transportadoras nacionales</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-extrabold text-[#0A0A0A]">
              {["Interrapidísimo", "Coordinadora", "TCC"].map((name) => <span key={name} className="rounded-lg bg-[#F8F8F8] px-2 py-3">{name}</span>)}
            </div>
          </div>
        </Reveal>
        <Reveal className="order-1 md:order-2">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-xl">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F8F8F8]">
              {current.type === "video" ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <RotateCw className="size-16 text-[#1E90FF]" />
                  <p className="text-xl font-extrabold">Demo visual 360°</p>
                  <p className="text-sm font-medium text-[#6B7280]">Aquí puedes reemplazar por un video real del paseo sin enredos.</p>
                </div>
              ) : (
                <img src={current.src} alt={current.label} className="h-full w-full object-cover" />
              )}
              <button aria-label="Imagen anterior" onClick={() => move(-1)} className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"><ArrowLeft className="size-5" /></button>
              <button aria-label="Imagen siguiente" onClick={() => move(1)} className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"><ArrowRight className="size-5" /></button>
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#0A0A0A] shadow"><BadgeCheck className="size-3.5 text-[#16A34A]" /> Producto destacado</span>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {gallery.map((item, index) => (
                <button key={item.label} aria-label={item.label} onClick={() => setActive(index)} className={`aspect-square rounded-lg border bg-[#F8F8F8] p-1 transition ${active === index ? "border-[3px] border-[#1E90FF]" : "border-[#E5E7EB]"}`}>
                  {item.type === "video" ? <div className="flex h-full items-center justify-center"><RotateCw className="size-6 text-[#1E90FF]" /></div> : <img src={item.src} alt="" className="h-full w-full object-cover rounded-md" />}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-[#374151]">
              <span className="rounded-lg bg-[#EFF6FF] p-2"><PawPrint className="mx-auto mb-1 size-4 text-[#1E90FF]" />2 perros</span>
              <span className="rounded-lg bg-[#EFF6FF] p-2"><ShieldCheck className="mx-auto mb-1 size-4 text-[#16A34A]" />Garantía</span>
              <span className="rounded-lg bg-[#EFF6FF] p-2"><Truck className="mx-auto mb-1 size-4 text-[#1E90FF]" />Gratis</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
