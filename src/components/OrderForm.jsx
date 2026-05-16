import { useMemo, useState } from "react";
import { BadgeCheck, Banknote, CheckCircle2, MapPin, MessageCircle, Minus, Package, Palette, Phone, Plus, ShieldCheck, Star, User } from "lucide-react";
import { BASE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { calculateDiscount, calculatePrice } from "../utils/pricing";
import { buildMessage, openWhatsApp } from "../utils/whatsapp";
import { Reveal } from "./Reveal";

const colors = [
  { name: "Negro", hex: "#1a1a1a" },
  { name: "Azul", hex: "#0066FF" },
  { name: "Rojo", hex: "#E53E3E" },
];

const packs = [
  { qty: 1, title: "1 unidad", badge: null, note: "Ideal si tienes tus 2 perros" },
  { qty: 2, title: "2 unidades", badge: "MÁS VENDIDO", note: "Para ti + regalo. Mejor conversión por envío" },
  { qty: 3, title: "3 unidades", badge: "MEJOR AHORRO", note: "Para ti + 2 regalos. El mayor ahorro" },
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
    <section id="order" className="section-shell scroll-mt-20 bg-[var(--color-surface)]">
      <Reveal className="mx-auto max-w-[620px]">
        <div className="mb-4 rounded-xl border border-[var(--color-success)]/20 bg-[var(--color-success-light)] px-4 py-3 text-center text-[13px] font-bold text-green-700">
          Respondemos en menos de 5 minutos · Envío en 24h hábiles
        </div>
        <div className="card-surface p-5 md:p-8">
          <div className="text-center">
            <span className="kicker">Pedido rápido</span>
            <h2 className="section-title mt-3">Completa tu pedido</h2>
            <p className="section-subtitle">Pagas en efectivo cuando llegue a tu puerta</p>
          </div>

          <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
            <Field label="Nombre completo" error={errors.nombre} icon={User}><input value={form.nombre} onChange={(e) => setField("nombre", e.target.value)} placeholder="Tu nombre completo" className={inputClass(errors.nombre)} /></Field>
            <Field label="Número de WhatsApp" error={errors.telefono} icon={Phone}><input value={form.telefono} onChange={(e) => setField("telefono", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="3XX XXX XXXX" inputMode="numeric" className={inputClass(errors.telefono)} /></Field>
            <Field label="Ciudad de entrega" error={errors.ciudad} icon={MapPin}><input value={form.ciudad} onChange={(e) => setField("ciudad", e.target.value)} placeholder="Ciudad donde enviamos" className={inputClass(errors.ciudad)} /></Field>

            <div>
              <p className="mb-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--color-dark)]"><Palette size={16} /> Color</p>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((item) => (
                  <button type="button" key={item.name} onClick={() => setColor(item.name)} className={`min-h-[68px] rounded-xl border bg-white p-3 text-[13px] font-semibold transition hover:border-[var(--color-primary)] ${color === item.name ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)]"}`}>
                    <span className="mx-auto block size-9 rounded-full border border-black/10" style={{ backgroundColor: item.hex }} />
                    <span className="mt-1 block">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--color-dark)]"><Package size={16} /> Elige tu pack</p>
              <div className="grid gap-3">
                {packs.map((pack) => {
                  const packTotal = calculatePrice(pack.qty);
                  const packDiscount = calculateDiscount(pack.qty);
                  return (
                    <button type="button" key={pack.qty} onClick={() => setCantidad(pack.qty)} className={`relative rounded-xl border p-4 text-left transition hover:border-[var(--color-primary)] ${cantidad === pack.qty ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)] bg-white"}`}>
                      {pack.badge && <span className={`absolute right-3 top-[-10px] rounded px-2 py-1 text-[11px] font-bold text-white ${pack.qty === 2 ? "bg-[var(--color-primary)]" : "bg-[var(--color-dark)]"}`}>{pack.badge}</span>}
                      <div className="flex items-center justify-between gap-4">
                        <div><p className="font-extrabold text-[var(--color-dark)]">{pack.title}</p><p className="text-[13px] font-medium text-[var(--color-muted)]">{pack.note}</p></div>
                        <div className="text-right"><p className="text-lg font-extrabold text-[var(--color-primary)]">${formatPrice(packTotal)}</p>{packDiscount > 0 && <p className="text-xs font-bold text-[var(--color-success)]">ahorro ${formatPrice(packDiscount)}</p>}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--color-border)] p-3">
                <button type="button" onClick={() => setCantidad((q) => Math.max(1, q - 1))} className="flex size-11 items-center justify-center rounded-lg bg-[var(--color-surface)]"><Minus size={20} /></button>
                <span className="text-xl font-extrabold text-[var(--color-dark)]">{cantidad}</span>
                <button type="button" onClick={() => setCantidad((q) => Math.min(3, q + 1))} className="flex size-11 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white"><Plus size={20} /></button>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-[var(--color-primary-light)] p-5 text-sm">
              <Summary label="Producto" value="Correa Retráctil Doble" /><Summary label="Color" value={color} /><Summary label="Cantidad" value={`${cantidad} unidades`} /><Summary label="Precio unitario" value={`$${formatPrice(BASE_PRICE)}`} />{discount > 0 && <Summary label="Descuento" value={`-$${formatPrice(discount)}`} />}
              <div className="my-3 border-t border-blue-200" />
              <div className="flex justify-between text-xl font-extrabold text-[var(--color-primary)]"><span>TOTAL:</span><span>${formatPrice(total)} COP</span></div>
              <p className="mt-3 inline-flex items-center gap-2 font-bold text-[var(--color-dark)]"><Banknote size={18} className="text-[var(--color-success)]" />Método de pago: Contra entrega</p>
            </div>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-3">
              <div className="mb-2 flex text-[var(--color-warning)]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
              <p className="text-[13px] leading-snug text-[var(--color-body)]">"Llegó en 4 días y funciona perfecto" — Camila R. <BadgeCheck size={14} className="inline text-[var(--color-success)]" /> Compra verificada</p>
            </div>

            <button className="btn-whatsapp" type="submit">ENVIAR PEDIDO POR WHATSAPP <MessageCircle size={20} /></button>
            <p className="text-center text-[12px] text-[var(--color-muted)]">Si haces tu pedido hoy antes de las 3pm, sale mañana</p>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-[var(--color-body)]">
              <span className="rounded-lg bg-[var(--color-surface)] p-2"><CheckCircle2 className="mx-auto mb-1 text-[var(--color-success)]" size={16} />Sin anticipo</span>
              <span className="rounded-lg bg-[var(--color-surface)] p-2"><Star className="mx-auto mb-1 text-[var(--color-warning)]" size={16} fill="currentColor" />4.9/5</span>
              <span className="rounded-lg bg-[var(--color-surface)] p-2"><ShieldCheck className="mx-auto mb-1 text-[var(--color-primary)]" size={16} />Confirmación</span>
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

function Field({ label, error, icon: Icon, children }) {
  return <label className="block"><span className="mb-2 block text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--color-dark)]">{label}</span><span className="relative block"><Icon size={16} className="input-icon" />{children}</span>{error && <span className="mt-1 block text-[13px] font-bold text-[var(--color-urgency)]">{error}</span>}</label>;
}

function Summary({ label, value }) {
  return <div className="mb-2 flex justify-between gap-4"><span className="text-[var(--color-body)]">{label}:</span><span className="text-right font-bold text-[var(--color-dark)]">{value}</span></div>;
}

function inputClass(error) {
  return `input-shell ${error ? "border-[var(--color-urgency)]" : ""}`;
}
