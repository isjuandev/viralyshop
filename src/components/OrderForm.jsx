import { useMemo, useState } from "react";
import { Banknote, CheckCircle2, MessageCircle, Minus, Plus, Star } from "lucide-react";
import { BASE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { calculateDiscount, calculatePrice } from "../utils/pricing";
import { buildMessage, openWhatsApp } from "../utils/whatsapp";
import { Reveal } from "./Reveal";

const colors = [
  { name: "Negro", hex: "#1a1a1a" },
  { name: "Azul", hex: "#1E90FF" },
  { name: "Rojo", hex: "#DC2626" },
];

const packs = [
  { qty: 1, title: "1 unidad", badge: null, note: "Ideal si tienes tus 2 perros" },
  { qty: 2, title: "2 unidades", badge: "MÁS VENDIDO", note: "Regálale una a esa amiga que también tiene 2 perros 🎁" },
  { qty: 3, title: "3 unidades", badge: "MEJOR AHORRO", note: "Para ti + 2 regalos. El mayor ahorro posible 💰" },
];

export function OrderForm() {
  const [form, setForm] = useState({ nombre: "", telefono: "", ciudad: "" });
  const [color, setColor] = useState("Negro");
  const [cantidad, setCantidad] = useState(1);
  const [errors, setErrors] = useState({});
  const total = useMemo(() => calculatePrice(cantidad), [cantidad]);
  const discount = useMemo(() => calculateDiscount(cantidad), [cantidad]);

  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const validate = () => {
    const next = {};
    if (!form.nombre.trim()) next.nombre = "Ingresa tu nombre completo";
    if (!/^\d{10}$/.test(form.telefono.trim())) next.telefono = "Ingresa un número de 10 dígitos";
    if (!form.ciudad.trim()) next.ciudad = "Ingresa la ciudad de entrega";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    openWhatsApp(buildMessage({ ...form, color, cantidad, total }));
  };

  return (
    <section id="order" className="bg-[#F8F8F8] px-4 py-16 scroll-mt-20">
      <Reveal className="mx-auto max-w-[560px] rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <div className="mb-5 w-full rounded-lg bg-[#DCFCE7] px-3 py-3 text-center text-[13px] font-extrabold text-[#166534]">
          ⚡ Respondemos en menos de 5 minutos · Envío en 24h hábiles
        </div>
        <h2 className="text-center text-[28px] font-bold md:text-[42px]">Completa tu pedido</h2>
        <p className="mt-2 text-center text-[#6B7280]">Pagas en efectivo cuando llegue a tu puerta</p>
        <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
          <Field label="Nombre completo" error={errors.nombre}><input value={form.nombre} onChange={(e) => setField("nombre", e.target.value)} placeholder="Tu nombre completo" className={inputClass(errors.nombre)} /></Field>
          <Field label="Número de WhatsApp" error={errors.telefono}><input value={form.telefono} onChange={(e) => setField("telefono", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="3XX XXX XXXX" inputMode="numeric" className={inputClass(errors.telefono)} /></Field>
          <Field label="Ciudad de entrega" error={errors.ciudad}><input value={form.ciudad} onChange={(e) => setField("ciudad", e.target.value)} placeholder="Ciudad donde enviamos" className={inputClass(errors.ciudad)} /></Field>
          <div><p className="mb-2 text-sm font-bold">Color</p><div className="grid grid-cols-3 gap-3">{colors.map((item) => <button type="button" key={item.name} onClick={() => setColor(item.name)} className={`rounded-xl border p-3 text-sm font-bold transition ${color === item.name ? "border-[3px] border-[#1E90FF] bg-[#EFF6FF]" : "border-[#E5E7EB]"}`}><span className="mx-auto block size-8 rounded-full" style={{ backgroundColor: item.hex }} /><span className="mt-2 block">{item.name}</span></button>)}</div></div>
          <div>
            <p className="mb-2 text-sm font-bold">Elige tu pack</p>
            <div className="grid gap-3">
              {packs.map((pack) => {
                const packTotal = calculatePrice(pack.qty);
                const packDiscount = calculateDiscount(pack.qty);
                return (
                  <button type="button" key={pack.qty} onClick={() => setCantidad(pack.qty)} className={`relative min-h-[72px] rounded-xl border p-4 text-left transition ${cantidad === pack.qty ? "border-[3px] border-[#1E90FF] bg-[#EFF6FF]" : pack.qty === 2 ? "border-[2px] border-[#1E90FF] bg-[#F8FBFF]" : "border-[#E5E7EB] bg-white"}`}>
                    {pack.badge && <span className="absolute right-3 top-[-10px] rounded-full bg-[#16A34A] px-3 py-1 text-[10px] font-extrabold text-white">{pack.badge}</span>}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-extrabold">{pack.title}</p>
                        <p className="text-[13px] font-medium text-[#6B7280]">{pack.note}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-extrabold text-[#1E90FF]">${formatPrice(packTotal)}</p>
                        {packDiscount > 0 && <p className="text-xs font-bold text-[#16A34A]">ahorro ${formatPrice(packDiscount)}</p>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mb-2 mt-4 text-sm font-bold">Ajuste rápido</p>
            <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-3">
              <button type="button" onClick={() => setCantidad((q) => Math.max(1, q - 1))} className="flex size-10 items-center justify-center rounded-lg bg-[#F3F4F6]"><Minus className="size-5" /></button>
              <span className="text-xl font-extrabold">{cantidad}</span>
              <button type="button" onClick={() => setCantidad((q) => Math.min(3, q + 1))} className="flex size-10 items-center justify-center rounded-lg bg-[#1E90FF] text-white"><Plus className="size-5" /></button>
            </div>
            <p className="mt-2 text-sm font-bold">{cantidad} unidad{cantidad > 1 ? "es" : ""} → ${formatPrice(total)} COP {discount > 0 && <span className="rounded-full bg-[#16A34A] px-2 py-1 text-xs text-white">ahorro ${formatPrice(discount)}</span>}</p>
          </div>
          <div className="rounded-xl border border-[#BFDBFE] bg-[#F0F7FF] p-5 text-sm">
            <Summary label="Producto" value="Correa Retráctil Doble" /><Summary label="Color" value={color} /><Summary label="Cantidad" value={`${cantidad} unidades`} /><Summary label="Precio unitario" value={`$${formatPrice(BASE_PRICE)}`} />{discount > 0 && <Summary label="Descuento" value={`-$${formatPrice(discount)}`} />}
            <div className="my-3 border-t border-[#BFDBFE]" />
            <div className="flex justify-between text-xl font-extrabold text-[#1E90FF]"><span>TOTAL:</span><span>${formatPrice(total)} COP</span></div>
            <p className="mt-3 inline-flex items-center gap-2 font-bold"><Banknote className="size-5 text-[#16A34A]" />Método de pago: Contra entrega</p>
          </div>
          <div className="w-full max-w-[380px] rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-3">
            <div className="mb-2 text-[13px] leading-none text-[#F59E0B]">⭐⭐⭐⭐⭐</div>
            <div className="flex items-start gap-2.5">
              <img
                src="/reviews/image copy 2.png"
                alt="Avatar de cliente verificado"
                className="size-8 shrink-0 rounded-full object-cover"
              />
              <p className="text-[13px] leading-snug text-[#374151]">
                "Llegó en 4 días y funciona perfecto. Mis dos perros ya no se enredan." — Camila R., Bogotá ✅ Compra verificada
              </p>
            </div>
          </div>
          <button className="inline-flex h-[60px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#1E90FF] text-[15px] font-extrabold uppercase tracking-[0.05em] text-white transition hover:scale-[1.02]" type="submit">ENVIAR PEDIDO POR WHATSAPP <MessageCircle className="size-5" /></button>
          <p className="text-center text-[12px] text-[#6B7280]">📦 Si haces tu pedido hoy antes de las 3pm, sale mañana</p>
          <p className="text-center text-[13px] font-medium text-[#6B7280]">Al hacer click se abrirá WhatsApp con tu pedido listo. Solo confirma y nosotros hacemos el resto.</p>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-[#374151]">
            <span className="rounded-lg bg-[#F8F8F8] p-2"><CheckCircle2 className="mx-auto mb-1 size-4 text-[#16A34A]" />Sin anticipo</span>
            <span className="rounded-lg bg-[#F8F8F8] p-2"><Star className="mx-auto mb-1 size-4 text-[#F59E0B]" />4.9/5</span>
            <span className="rounded-lg bg-[#F8F8F8] p-2"><MessageCircle className="mx-auto mb-1 size-4 text-[#1E90FF]" />Confirmación WA</span>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

function Field({ label, error, children }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}{error && <span className="mt-1 block text-[13px] font-bold text-[#DC2626]">{error}</span>}</label>;
}

function Summary({ label, value }) {
  return <div className="mb-2 flex justify-between gap-4"><span className="text-[#374151]">{label}:</span><span className="text-right font-bold">{value}</span></div>;
}

function inputClass(error) {
  return `h-12 w-full rounded-[10px] border px-4 text-base outline-none transition focus:border-[#1E90FF] ${error ? "border-[#DC2626]" : "border-[#D1D5DB]"}`;
}
