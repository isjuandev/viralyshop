import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  MapPin,
  Package,
  Phone,
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

/* ─── Data ─────────────────────────────────────────────────── */

const API_BASE = "https://api-colombia.com/api/v1";

/**
 * Precio por unidad al comprar solo 1.
 * Lo calculamos una sola vez: originalPrice × (1 - savingsPct/100)
 */
const SINGLE_UNIT_PRICE = Math.round(
  BUNDLE_PRICING.single.originalPrice * (1 - BUNDLE_PRICING.single.savingsPct / 100),
);

/**
 * Precio por unidad al comprar pack de 2.
 * totalPack2 / 2 para mostrar el ahorro real por unidad.
 */
const DOUBLE_UNIT_PRICE = Math.round(
  (BUNDLE_PRICING.double.originalPrice * (1 - BUNDLE_PRICING.double.savingsPct / 100)) / 2,
);

const PACKS = [
  {
    qty: 1,
    title: "1 correa",
    badge: null,
    note: "Ideal para 2 perros",
    unitPrice: SINGLE_UNIT_PRICE,
  },
  {
    qty: 2,
    title: "Pack x 2",
    badge: "MÁS VENDIDO",
    note: "Para ti + regalo perfecto",
    unitPrice: DOUBLE_UNIT_PRICE,
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function normalizeLocations(data) {
  const items = Array.isArray(data) ? data : data?.data;
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item?.id != null && item?.name)
    .map((item) => ({ id: String(item.id), name: String(item.name) }));
}

/* ─── Sub-components ────────────────────────────────────────── */

/** Labeled input wrapper with icon and inline error */
function Field({ label, error, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className="relative block">
        {Icon && (
          <Icon
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        {children}
      </span>
      {error && (
        <span className="mt-1 block text-[12px] font-semibold text-red-500">
          {error}
        </span>
      )}
    </label>
  );
}

/** Single pack option card */
function PackCard({ pack, selected, onSelect, total, discount }) {
  const isSelected = selected === pack.qty;
  return (
    <button
      type="button"
      onClick={() => onSelect(pack.qty)}
      className={`relative flex w-full flex-col gap-1 rounded-2xl border-2 p-4 text-left transition-all ${
        isSelected
          ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      {/* Badge */}
      {pack.badge && (
        <span className="absolute -top-3 right-4 rounded-full bg-[var(--color-primary)] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow">
          {pack.badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Left: title + note */}
        <div>
          <p className="font-extrabold text-slate-900">{pack.title}</p>
          <p className="text-[12px] text-slate-500">{pack.note}</p>
        </div>

        {/* Right: price */}
        <div className="text-right shrink-0">
          <p className="text-[20px] font-extrabold leading-none text-[var(--color-primary)]">
            ${formatPrice(total)}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            ${formatPrice(pack.unitPrice)} / u
          </p>
        </div>
      </div>

      {/* Savings pill */}
      {discount > 0 && (
        <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
          Ahorras ${formatPrice(discount)}
        </span>
      )}

    </button>
  );
}

/** Order summary row */
function SummaryRow({ label, value, highlight = false, strikethrough = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-[13px] text-slate-500">{label}</span>
      <span
        className={`text-right text-[13px] font-semibold ${
          highlight ? "text-[var(--color-primary)]" : "text-slate-800"
        } ${strikethrough ? "line-through opacity-60" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

/** Sticky total bar shown on mobile at the bottom */
function MobileTotalBar({ total, onSubmit }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Total
          </p>
          <p className="text-[22px] font-extrabold leading-none text-slate-900">
            ${formatPrice(total)}{" "}
            <span className="text-[13px] font-bold text-slate-400">COP</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="btn-whatsapp flex flex-1 items-center justify-center gap-2 py-3.5 text-[14px]"
        >
          <FaWhatsapp size={18} />
          Pedir ahora
        </button>
      </div>
    </div>
  );
}

/* ─── Main Export ───────────────────────────────────────────── */

export function OrderForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    departamentoId: "",
    departamento: "",
    ciudad: "",
  });
  const color = "Negro";
  const [cantidad, setCantidad] = useState(1);
  const [errors, setErrors] = useState({});

  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [locationError, setLocationError] = useState("");

  const total = useMemo(() => calculatePrice(cantidad), [cantidad]);
  const discount = useMemo(() => calculateDiscount(cantidad), [cantidad]);
  const unitPrice = cantidad >= 2 ? DOUBLE_UNIT_PRICE : SINGLE_UNIT_PRICE;

  const setField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  /* Load departments on mount */
  useEffect(() => {
    const controller = new AbortController();
    setLoadingDepts(true);
    fetch(`${API_BASE}/Department?sortBy=name&sortDirection=asc`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setDepartments(normalizeLocations(data)))
      .catch((e) => {
        if (e?.name !== "AbortError")
          setLocationError("No pudimos cargar los departamentos. Intenta recargar.");
      })
      .finally(() => setLoadingDepts(false));
    return () => controller.abort();
  }, []);

  /* Load cities when department changes */
  const selectDepartment = async (e) => {
    const id = e.target.value;
    const dept = departments.find((d) => d.id === id);
    setCities([]);
    setLocationError("");
    setForm((prev) => ({
      ...prev,
      departamentoId: id,
      departamento: dept?.name || "",
      ciudad: "",
    }));
    if (!id) return;

    setLoadingCities(true);
    try {
      const r = await fetch(
        `${API_BASE}/Department/${id}/cities?sortBy=name&sortDirection=asc`,
      );
      if (!r.ok) throw new Error();
      setCities(normalizeLocations(await r.json()));
    } catch {
      setLocationError("No pudimos cargar las ciudades. Intenta seleccionar el departamento otra vez.");
    } finally {
      setLoadingCities(false);
    }
  };

  const validate = () => {
    const next = {};
    if (!form.nombre.trim()) next.nombre = "Ingresa tu nombre completo";
    if (!/^\d{10}$/.test(form.telefono.trim()))
      next.telefono = "Número de 10 dígitos (ej. 3001234567)";
    if (!form.departamento.trim()) next.departamento = "Selecciona tu departamento";
    if (!form.ciudad.trim()) next.ciudad = "Selecciona tu ciudad";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e?.preventDefault?.();
    if (!validate()) return;
    openWhatsApp(buildMessage({ ...form, color, cantidad, total }));
  };

  return (
    <section
      id="order"
      className="section-shell scroll-mt-20 bg-[var(--color-surface)] pb-28 md:pb-0"
    >
      <Reveal className="mx-auto max-w-[620px] lg:max-w-[680px]">
        <div className="card-surface p-5 md:p-8 lg:rounded-3xl lg:p-10 lg:shadow-[0_24px_70px_rgba(15,23,42,0.14)]">

          {/* ── Header ── */}
          <div className="text-center">
            <span className="kicker">Pedido rápido</span>
            <h2 className="section-title mt-3">Completa tu pedido</h2>
            <p className="section-subtitle">
              Pagas en efectivo cuando llegue a tu puerta
            </p>
          </div>

          <form onSubmit={submit} noValidate className="mt-8 space-y-7">

            {/* ── Section 1: Personal info ── */}
            <fieldset className="space-y-4">
              <SectionLabel icon={User} text="Tus datos de contacto" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre completo" error={errors.nombre} icon={User}>
                  <input
                    value={form.nombre}
                    onChange={(e) => setField("nombre", e.target.value)}
                    placeholder="Tu nombre completo"
                    autoComplete="name"
                    className={inputCls(errors.nombre)}
                  />
                </Field>
                <Field label="WhatsApp" error={errors.telefono} icon={Phone}>
                  <input
                    value={form.telefono}
                    onChange={(e) =>
                      setField("telefono", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="3XX XXX XXXX"
                    inputMode="numeric"
                    autoComplete="tel"
                    className={inputCls(errors.telefono)}
                  />
                </Field>
              </div>
            </fieldset>

            {/* ── Section 2: Location ── */}
            <fieldset className="space-y-4">
              <SectionLabel icon={MapPin} text="Dirección de entrega" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Departamento" error={errors.departamento} icon={MapPin}>
                  <select
                    value={form.departamentoId}
                    onChange={selectDepartment}
                    disabled={loadingDepts}
                    className={inputCls(errors.departamento)}
                  >
                    <option value="">
                      {loadingDepts ? "Cargando…" : "Selecciona"}
                    </option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Ciudad" error={errors.ciudad} icon={MapPin}>
                  <select
                    value={form.ciudad}
                    onChange={(e) => setField("ciudad", e.target.value)}
                    disabled={!form.departamentoId || loadingCities}
                    className={inputCls(errors.ciudad)}
                  >
                    <option value="">
                      {loadingCities
                        ? "Cargando…"
                        : !form.departamentoId
                        ? "Primero el depto."
                        : "Selecciona"}
                    </option>
                    {cities.map((c) => (
                      <option key={`${c.id}-${c.name}`} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              {locationError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-600">
                  {locationError}
                </p>
              )}
            </fieldset>

            {/* ── Section 3: Pack selection ── */}
            <fieldset className="space-y-3">
              <SectionLabel icon={Package} text="Elige tu pack" />
              <div className="grid gap-3 sm:grid-cols-2">
                {PACKS.map((pack) => (
                  <PackCard
                    key={pack.qty}
                    pack={pack}
                    selected={cantidad}
                    onSelect={setCantidad}
                    total={calculatePrice(pack.qty)}
                    discount={calculateDiscount(pack.qty)}
                  />
                ))}
              </div>
            </fieldset>

            {/* ── Section 4: Order summary ── */}
            <div className="rounded-2xl border border-blue-100 bg-[var(--color-primary-light)] px-5 py-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Resumen del pedido
              </p>
              <SummaryRow label="Producto" value="Correa Retráctil Doble" />
              <SummaryRow label="Cantidad" value={`${cantidad} unidad${cantidad > 1 ? "es" : ""}`} />
              <SummaryRow label="Precio por unidad" value={`$${formatPrice(unitPrice)}`} />
              {discount > 0 && (
                <SummaryRow
                  label="Descuento pack"
                  value={`-$${formatPrice(discount)}`}
                  strikethrough
                />
              )}
              <div className="my-3 border-t border-blue-200" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-[15px] font-extrabold text-slate-800">TOTAL</span>
                <span className="text-[22px] font-extrabold text-[var(--color-primary)]">
                  ${formatPrice(total)}{" "}
                  <span className="text-[14px] font-bold text-slate-400">COP</span>
                </span>
              </div>
              <p className="mt-3 flex items-center gap-2 text-[13px] font-bold text-slate-700">
                <Banknote size={16} className="text-emerald-500" />
                Pago contra entrega — sin tarjeta
              </p>
            </div>

            {/* ── Social proof snippet ── */}
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4">
              <div className="flex shrink-0 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[13px] leading-snug text-slate-600">
                <span className="font-semibold text-slate-800">"Llegó en 2 días y funciona perfecto"</span>
                {" "}— Camila R.{" "}
                <BadgeCheck size={13} className="inline text-emerald-500" />{" "}
                <span className="text-[11px] text-slate-400">Compra verificada</span>
              </p>
            </div>

            {/* ── CTA (desktop) ── */}
            <div className="hidden md:flex md:justify-center">
              <button
                type="submit"
                className="btn-whatsapp cta-jump items-center justify-center gap-2 px-8 py-4 text-[15px] font-extrabold md:w-auto"
              >
                <FaWhatsapp size={20} />
                ENVIAR PEDIDO POR WHATSAPP
              </button>
            </div>

            {/* ── Trust microbadges ── */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-600">
              {[
                { icon: CheckCircle2, label: "Sin anticipo", color: "text-emerald-500" },
                { icon: Star, label: "4.9 / 5 ★", color: "text-amber-400", fill: true },
                { icon: ShieldCheck, label: "Confirmación", color: "text-[var(--color-primary)]" },
              ].map(({ icon: Icon, label, color, fill }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 py-3"
                >
                  <Icon
                    size={16}
                    className={color}
                    fill={fill ? "currentColor" : "none"}
                    strokeWidth={fill ? 0 : 2}
                  />
                  {label}
                </div>
              ))}
            </div>
          </form>
        </div>
      </Reveal>

      {/* ── Sticky CTA bar (mobile only) ── */}
      <MobileTotalBar total={total} onSubmit={submit} />
    </section>
  );
}

/* ─── Utilities ─────────────────────────────────────────────── */

function SectionLabel({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} className="text-slate-400" strokeWidth={2} />
      <span className="text-[12px] font-bold uppercase tracking-widest text-slate-400">
        {text}
      </span>
    </div>
  );
}

function inputCls(error) {
  return `input-shell pl-9 ${error ? "border-red-400 focus:ring-red-300" : ""}`;
}
