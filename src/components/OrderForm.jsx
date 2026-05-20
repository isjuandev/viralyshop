import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatPrice } from "../utils/format";
import {
  BUNDLE_PRICING,
  calculateDiscount,
  calculatePrice,
} from "../utils/pricing";
import { buildMessage, openWhatsApp } from "../utils/whatsapp";
import { Reveal } from "./Reveal";

const packs = [
  {
    qty: 1,
    title: "1 unidad",
    badge: null,
    note: "Ideal si tienes tus 2 perros",
  },
  {
    qty: 2,
    title: "2 unidades",
    badge: "MÁS VENDIDO",
    note: "Para ti + regalo",
  },
];
const UNIT_PRICE = Math.round(
  BUNDLE_PRICING.single.originalPrice *
    (1 - BUNDLE_PRICING.single.savingsPct / 100),
);

export function OrderForm() {
  const [form, setForm] = useState({ nombre: "", telefono: "", ciudad: "" });
  const color = "Negro";
  const [cantidad, setCantidad] = useState(1);
  const [errors, setErrors] = useState({});
  const total = useMemo(() => calculatePrice(cantidad), [cantidad]);
  const discount = useMemo(() => calculateDiscount(cantidad), [cantidad]);

  const setField = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  const validate = () => {
    const next = {};
    if (!form.nombre.trim()) next.nombre = "Ingresa tu nombre completo";
    if (!/^\d{10}$/.test(form.telefono.trim()))
      next.telefono = "Ingresa un número de 10 dígitos";
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
    <section
      id="order"
      className="section-shell scroll-mt-20 bg-[var(--color-surface)]"
    >
      <Reveal className="mx-auto max-w-[620px] lg:max-w-[680px]">
        <div className="card-surface p-5 md:p-8 lg:rounded-3xl lg:p-10 lg:shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
          <div className="text-center">
            <span className="kicker">Pedido rápido</span>
            <h2 className="section-title mt-3">Completa tu pedido</h2>
            <p className="section-subtitle">
              Pagas en efectivo cuando llegue a tu puerta
            </p>
          </div>

          <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-4">
              <Field label="Nombre completo" error={errors.nombre} icon={User}>
                <input
                  value={form.nombre}
                  onChange={(e) => setField("nombre", e.target.value)}
                  placeholder="Tu nombre completo"
                  className={inputClass(errors.nombre)}
                />
              </Field>
              <Field
                label="Número de WhatsApp"
                error={errors.telefono}
                icon={Phone}
              >
                <input
                  value={form.telefono}
                  onChange={(e) =>
                    setField(
                      "telefono",
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  placeholder="3XX XXX XXXX"
                  inputMode="numeric"
                  className={inputClass(errors.telefono)}
                />
              </Field>
            </div>
            <Field
              label="Ciudad de entrega"
              error={errors.ciudad}
              icon={MapPin}
            >
              <input
                value={form.ciudad}
                onChange={(e) => setField("ciudad", e.target.value)}
                placeholder="Ciudad donde enviamos"
                className={inputClass(errors.ciudad)}
              />
            </Field>

            <div>
              <p className="mb-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--color-dark)]">
                <Package size={16} /> Elige tu pack
              </p>
              <div className="grid gap-3 lg:grid-cols-2">
                {packs.map((pack) => {
                  const packTotal = calculatePrice(pack.qty);
                  const packDiscount = calculateDiscount(pack.qty);
                  return (
                    <button
                      type="button"
                      key={pack.qty}
                      onClick={() => setCantidad(pack.qty)}
                      className={`relative rounded-xl border p-4 text-left transition hover:border-[var(--color-primary)] lg:flex lg:min-h-[132px] lg:items-center ${cantidad === pack.qty ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)] bg-white"}`}
                    >
                      {pack.badge && (
                        <span
                          className={`absolute right-3 top-[-10px] rounded px-2 py-1 text-[11px] font-bold text-white ${pack.qty === 2 ? "bg-[var(--color-primary)]" : "bg-[var(--color-dark)]"}`}
                        >
                          {pack.badge}
                        </span>
                      )}
                      <div className="flex w-full items-center justify-between gap-4">
                        <div>
                          <p className="font-extrabold text-[var(--color-dark)]">
                            {pack.title}
                          </p>
                          <p className="text-[13px] font-medium text-[var(--color-muted)]">
                            {pack.note}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-extrabold text-[var(--color-primary)]">
                            ${formatPrice(packTotal)}
                          </p>
                          {packDiscount > 0 && (
                            <p className="text-xs font-bold text-[var(--color-success)] line-through opacity-80">
                              ahorro ${formatPrice(packDiscount)}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--color-border)] p-3">
                <button
                  type="button"
                  onClick={() => setCantidad((q) => Math.max(1, q - 1))}
                  className="flex size-11 items-center justify-center rounded-lg bg-[var(--color-surface)]"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-extrabold text-[var(--color-dark)]">
                  {cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => setCantidad((q) => Math.min(2, q + 1))}
                  className="flex size-11 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-[var(--color-primary-light)] p-5 text-sm lg:p-6">
              <Summary label="Producto" value="Correa Retráctil Doble" />
              <Summary label="Cantidad" value={`${cantidad} unidades`} />
              <Summary
                label="Precio unitario"
                value={`$${formatPrice(UNIT_PRICE)}`}
              />
              {discount > 0 && (
                <Summary
                  label="Descuento"
                  value={`-$${formatPrice(discount)}`}
                  strikeValue
                />
              )}
              <div className="my-3 border-t border-blue-200" />
              <div className="flex justify-between gap-4 text-xl font-extrabold text-[var(--color-primary)] lg:items-center">
                <span>TOTAL:</span>
                <span>${formatPrice(total)} COP</span>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 font-bold text-[var(--color-dark)]">
                <Banknote size={18} className="text-[var(--color-success)]" />
                Método de pago: Contra entrega
              </p>
            </div>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-3">
              <div className="mb-2 flex text-[var(--color-warning)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-[13px] leading-snug text-[var(--color-body)]">
                "Llegó en 4 días y funciona perfecto" — Camila R.{" "}
                <BadgeCheck
                  size={14}
                  className="inline text-[var(--color-success)]"
                />{" "}
                Compra verificada
              </p>
            </div>

            <button className="btn-whatsapp lg:w-full" type="submit">
              ENVIAR PEDIDO POR WHATSAPP <FaWhatsapp size={20} />
            </button>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-[var(--color-body)]">
              <span className="rounded-lg bg-[var(--color-surface)] p-2">
                <CheckCircle2
                  className="mx-auto mb-1 text-[var(--color-success)]"
                  size={16}
                />
                Sin anticipo
              </span>
              <span className="rounded-lg bg-[var(--color-surface)] p-2">
                <Star
                  className="mx-auto mb-1 text-[var(--color-warning)]"
                  size={16}
                  fill="currentColor"
                />
                4.9/5
              </span>
              <span className="rounded-lg bg-[var(--color-surface)] p-2">
                <ShieldCheck
                  className="mx-auto mb-1 text-[var(--color-primary)]"
                  size={16}
                />
                Confirmación
              </span>
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

function Field({ label, error, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-bold uppercase tracking-[0.05em] text-[var(--color-dark)]">
        {label}
      </span>
      <span className="relative block">
        <Icon size={16} className="input-icon" />
        {children}
      </span>
      {error && (
        <span className="mt-1 block text-[13px] font-bold text-[var(--color-urgency)]">
          {error}
        </span>
      )}
    </label>
  );
}

function Summary({ label, value, strikeValue = false }) {
  return (
    <div className="mb-2 flex justify-between gap-4">
      <span className="text-[var(--color-body)]">{label}:</span>
      <span
        className={`text-right font-bold text-[var(--color-dark)] ${strikeValue ? "line-through opacity-80" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function inputClass(error) {
  return `input-shell ${error ? "border-[var(--color-urgency)]" : ""}`;
}
