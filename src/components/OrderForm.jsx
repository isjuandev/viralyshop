import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  CreditCard,
  Home,
  MapPin,
  LoaderCircle,
  Package,
  Phone,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PRODUCT_NAME, TENANT_ID, WHATSAPP_NUMBER } from "../constants";
import { formatPrice } from "../utils/format";
import {
  BUNDLE_PRICING,
  calculateDiscount,
  calculatePrice,
} from "../utils/pricing";
import { sendPreorder } from "../utils/preorder";
import { buildMessage } from "../utils/whatsapp";
import { Reveal } from "./Reveal";

const API_BASE = "https://api-colombia.com/api/v1";

const SINGLE_UNIT_PRICE = Math.round(
  BUNDLE_PRICING.single.originalPrice * (1 - BUNDLE_PRICING.single.savingsPct / 100),
);

const DOUBLE_UNIT_PRICE = Math.round(
  (BUNDLE_PRICING.double.originalPrice * (1 - BUNDLE_PRICING.double.savingsPct / 100)) / 2,
);

const PACKS = [
  { qty: 1, title: "1 correa", badge: null, note: "Ideal para 2 perros", unitPrice: SINGLE_UNIT_PRICE },
  { qty: 2, title: "Pack x 2", badge: "MÁS VENDIDO", note: "Para ti + regalo perfecto", unitPrice: DOUBLE_UNIT_PRICE },
];

function normalizeLocations(data) {
  const items = Array.isArray(data) ? data : data?.data;
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item?.id != null && item?.name)
    .map((item) => ({ id: String(item.id), name: String(item.name) }));
}

function Field({ label, error, icon: Icon, children, optional = false }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-wider text-slate-600">
        {label} {!optional && <span className="text-orange-500">*</span>}
      </span>
      <span className="relative block">
        {Icon && (
          <Icon size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        {children}
      </span>
      {error && <span className="mt-1 block text-[12px] font-semibold text-red-500">{error}</span>}
    </label>
  );
}

function SectionCard({ title, subtitle, icon: Icon, children }) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <legend className="sr-only">{title}</legend>
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon size={16} />
        </span>
        <div>
          <p className="text-[14px] font-extrabold text-slate-900">{title}</p>
          <p className="text-[12px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function SummaryRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-[13px] text-slate-500">{label}</span>
      <span className={`text-right text-[13px] font-semibold ${highlight ? "text-blue-700" : "text-slate-800"}`}>
        {value}
      </span>
    </div>
  );
}

function PackCard({ pack, selected, onSelect, total, discount }) {
  const isSelected = selected === pack.qty;
  return (
    <button
      type="button"
      onClick={() => onSelect(pack.qty)}
      className={`relative w-full cursor-pointer rounded-2xl border-2 p-4 text-left transition-colors duration-200 ${
        isSelected ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      {pack.badge && (
        <span className="absolute -top-3 right-4 rounded-full bg-orange-500 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
          {pack.badge}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-extrabold text-slate-900">{pack.title}</p>
          <p className="text-[12px] text-slate-500">{pack.note}</p>
        </div>
        <div className="text-right">
          <p className="text-[22px] font-extrabold leading-none text-blue-700">${formatPrice(total)}</p>
          <p className="mt-1 text-[11px] text-slate-400">${formatPrice(pack.unitPrice)}/u</p>
        </div>
      </div>
      {discount > 0 && (
        <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
          Ahorras ${formatPrice(discount)}
        </span>
      )}
    </button>
  );
}

function MobileTotalBar({ total, onSubmit, isSubmitting }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Total</p>
          <p className="text-[22px] font-extrabold leading-none text-slate-900">${formatPrice(total)} <span className="text-[13px] font-bold text-slate-400">COP</span></p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`btn-whatsapp flex flex-1 items-center justify-center gap-2 py-3.5 text-[14px] ${isSubmitting ? "cursor-not-allowed opacity-80" : ""}`}
        >
          {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <FaWhatsapp size={18} />}
          {isSubmitting ? "Enviando..." : "Pedir ahora"}
        </button>
      </div>
    </div>
  );
}

export function OrderForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    tipoEntrega: "domicilio",
    departamentoId: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    barrio: "",
    cedula: "",
  });
  const color = "Negro";
  const [cantidad, setCantidad] = useState(1);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = useMemo(() => calculatePrice(cantidad), [cantidad]);
  const discount = useMemo(() => calculateDiscount(cantidad), [cantidad]);
  const unitPrice = cantidad >= 2 ? DOUBLE_UNIT_PRICE : SINGLE_UNIT_PRICE;

  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    const controller = new AbortController();
    setLoadingDepts(true);
    fetch(`${API_BASE}/Department?sortBy=name&sortDirection=asc`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setDepartments(normalizeLocations(data)))
      .catch((e) => {
        if (e?.name !== "AbortError") setLocationError("No pudimos cargar los departamentos. Intenta recargar.");
      })
      .finally(() => setLoadingDepts(false));
    return () => controller.abort();
  }, []);

  const selectDepartment = async (e) => {
    const id = e.target.value;
    const dept = departments.find((d) => d.id === id);
    setCities([]);
    setLocationError("");
    setForm((prev) => ({ ...prev, departamentoId: id, departamento: dept?.name || "", ciudad: "" }));
    if (!id) return;
    setLoadingCities(true);
    try {
      const r = await fetch(`${API_BASE}/Department/${id}/cities?sortBy=name&sortDirection=asc`);
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
    if (!/^\d{10}$/.test(form.telefono.trim())) next.telefono = "Número de 10 dígitos (ej. 3001234567)";
    if (!form.departamento.trim()) next.departamento = "Selecciona tu departamento";
    if (!form.ciudad.trim()) next.ciudad = "Selecciona tu ciudad";
    if (form.tipoEntrega === "domicilio" && !form.direccion.trim()) next.direccion = "Ingresa tu dirección";
    if (form.tipoEntrega === "oficina" && !/^\d{6,12}$/.test(form.cedula.trim())) next.cedula = "Ingresa una cédula válida";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    if (isSubmitting) return;
    if (!validate()) return;
    setIsSubmitting(true);
    const message = buildMessage({ ...form, color, cantidad, total });
    const normalizedMessage = message.replace(/\n/g, "\r\n");
    const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(normalizedMessage)}`;
    const utmParams = new URLSearchParams(window.location.search);
    const address = form.tipoEntrega === "domicilio"
      ? [form.direccion, form.barrio].filter(Boolean).join(", ")
      : undefined;

    try {
      await sendPreorder({
        tenantId: TENANT_ID,
        phone: form.telefono,
        fullName: form.nombre,
        productName: PRODUCT_NAME,
        city: form.ciudad,
        address: address || undefined,
        paymentMethod: "cod",
        source: "landing",
        sourceRef: window.location.hostname,
        utm: {
          source: utmParams.get("utm_source") ?? undefined,
          medium: utmParams.get("utm_medium") ?? undefined,
          campaign: utmParams.get("utm_campaign") ?? undefined,
          content: utmParams.get("utm_content") ?? undefined,
          term: utmParams.get("utm_term") ?? undefined,
        },
      });
    } catch {
      // No bloquear conversión si falla el POST
    } finally {
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="section-shell scroll-mt-20 bg-gradient-to-b from-sky-50 to-white pb-28 lg:pb-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-blue-100 bg-white p-4 shadow-[0_20px_70px_rgba(37,99,235,0.12)] md:p-8">
          <div className="mb-6 text-center lg:mb-8">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700">Pedido seguro</span>
            <h2 className="mt-3 text-2xl font-black text-slate-900 md:text-3xl">Completa tu pedido en 1 minuto</h2>
            <p className="mt-2 text-[14px] text-slate-600">Pago contra entrega en Colombia. Confirmamos por WhatsApp antes del envío.</p>
          </div>

          <form onSubmit={submit} noValidate className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <SectionCard title="Tus datos" subtitle="A quién contactamos para confirmar" icon={User}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre completo" error={errors.nombre} icon={User}><input value={form.nombre} onChange={(e) => setField("nombre", e.target.value)} placeholder="Tu nombre completo" autoComplete="name" className={inputCls(errors.nombre)} /></Field>
                  <Field label="WhatsApp" error={errors.telefono} icon={Phone}><input value={form.telefono} onChange={(e) => setField("telefono", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="3XX XXX XXXX" inputMode="numeric" autoComplete="tel" className={inputCls(errors.telefono)} /></Field>
                </div>
              </SectionCard>

              <SectionCard title="Entrega" subtitle="Selecciona cómo quieres recibir tu pedido" icon={MapPin}>
                <div>
                  <p className="mb-2 block text-[12px] font-bold uppercase tracking-wider text-slate-600">Tipo de entrega <span className="text-orange-500">*</span></p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "domicilio", label: "Envío a domicilio", icon: Home },
                      { value: "oficina", label: "Recoger en oficina", icon: Building2 },
                    ].map((option) => {
                      const Icon = option.icon;
                      const selected = form.tipoEntrega === option.value;
                      return (
                        <button key={option.value} type="button" onClick={() => { setField("tipoEntrega", option.value); setErrors((prev) => ({ ...prev, direccion: "", cedula: "" })); }} className={`cursor-pointer rounded-xl border px-4 py-3 text-left font-semibold transition-colors duration-200 ${selected ? "border-blue-600 bg-blue-50 text-blue-800" : "border-slate-300 bg-white text-slate-700 hover:border-blue-300"}`}>
                          <span className="inline-flex items-center gap-2"><Icon size={17} />{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Departamento" error={errors.departamento} icon={MapPin}><select value={form.departamentoId} onChange={selectDepartment} disabled={loadingDepts} className={inputCls(errors.departamento)}><option value="">{loadingDepts ? "Cargando…" : "Selecciona"}</option>{departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></Field>
                  <Field label="Ciudad" error={errors.ciudad} icon={MapPin}><select value={form.ciudad} onChange={(e) => setField("ciudad", e.target.value)} disabled={!form.departamentoId || loadingCities} className={inputCls(errors.ciudad)}><option value="">{loadingCities ? "Cargando…" : !form.departamentoId ? "Primero el depto." : "Selecciona"}</option>{cities.map((c) => <option key={`${c.id}-${c.name}`} value={c.name}>{c.name}</option>)}</select></Field>
                  {form.tipoEntrega === "domicilio" && <Field label="Dirección" error={errors.direccion} icon={MapPin}><input value={form.direccion} onChange={(e) => setField("direccion", e.target.value)} placeholder="Calle, carrera, número, apto, etc." autoComplete="street-address" className={inputCls(errors.direccion)} /></Field>}
                  {form.tipoEntrega === "domicilio" && <Field label="Barrio" optional error={errors.barrio} icon={MapPin}><input value={form.barrio} onChange={(e) => setField("barrio", e.target.value)} placeholder="Ej. El Poblado" autoComplete="address-level3" className={inputCls(errors.barrio)} /></Field>}
                  {form.tipoEntrega === "oficina" && <Field label="Cédula" error={errors.cedula} icon={CreditCard}><input value={form.cedula} onChange={(e) => setField("cedula", e.target.value.replace(/\D/g, "").slice(0, 12))} placeholder="Número de cédula" inputMode="numeric" className={inputCls(errors.cedula)} /></Field>}
                </div>
                {locationError && <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-600">{locationError}</p>}
              </SectionCard>

              <SectionCard title="Elige tu pack" subtitle="Entre más llevas, más ahorras" icon={Package}>
                <div className="grid gap-3 sm:grid-cols-2">{PACKS.map((pack) => <PackCard key={pack.qty} pack={pack} selected={cantidad} onSelect={setCantidad} total={calculatePrice(pack.qty)} discount={calculateDiscount(pack.qty)} />)}</div>
              </SectionCard>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">Resumen del pedido</p>
                <SummaryRow label="Producto" value="Correa Retráctil Doble" />
                <SummaryRow label="Cantidad" value={`${cantidad} unidad${cantidad > 1 ? "es" : ""}`} />
                <SummaryRow label="Precio por unidad" value={`$${formatPrice(unitPrice)}`} />
                {discount > 0 && <SummaryRow label="Descuento" value={`-$${formatPrice(discount)}`} highlight />}
                <div className="my-3 border-t border-blue-200" />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[15px] font-extrabold text-slate-800">TOTAL</span>
                  <span className="text-[26px] font-extrabold text-blue-700">${formatPrice(total)} <span className="text-[14px] font-bold text-slate-400">COP</span></span>
                </div>
                <p className="mt-3 flex items-center gap-2 text-[13px] font-bold text-slate-700"><Banknote size={16} className="text-emerald-500" /> Pago contra entrega</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-whatsapp mt-4 flex !w-full items-center justify-center gap-2 py-4 text-[15px] font-extrabold ${isSubmitting ? "cursor-not-allowed opacity-80" : ""}`}
                >
                  {isSubmitting ? <LoaderCircle size={20} className="animate-spin" /> : <FaWhatsapp size={20} />}
                  {isSubmitting ? "ENVIANDO..." : "ENVIAR PEDIDO POR WHATSAPP"}
                </button>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4">
                <div className="flex shrink-0 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}</div>
                <p className="text-[13px] leading-snug text-slate-600"><span className="font-semibold text-slate-800">"Llegó en 2 días y funciona perfecto"</span> - Camila R. <BadgeCheck size={13} className="inline text-emerald-500" /> <span className="text-[11px] text-slate-400">Compra verificada</span></p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-600">
                {[{ icon: CheckCircle2, label: "Sin anticipo", color: "text-emerald-500" }, { icon: Star, label: "4.9 / 5", color: "text-amber-400", fill: true }, { icon: ShieldCheck, label: "Confirmación", color: "text-blue-600" }].map(({ icon: Icon, label, color, fill }) => (
                  <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 py-3"><Icon size={16} className={`${color} mx-auto mb-1.5`} fill={fill ? "currentColor" : "none"} strokeWidth={fill ? 0 : 2} />{label}</div>
                ))}
              </div>
            </aside>
          </form>
        </div>
      </Reveal>
      <MobileTotalBar total={total} onSubmit={submit} isSubmitting={isSubmitting} />
    </section>
  );
}

function inputCls(error) {
  return `input-shell pl-9 ${error ? "border-red-400 focus:ring-red-300" : "border-slate-300 focus:ring-blue-200"}`;
}
