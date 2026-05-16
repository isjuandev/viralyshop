import { Clock, Camera, Mail, MapPin, MessageCircle, PackageCheck, PawPrint, ShieldCheck, Truck } from "lucide-react";
import { BRAND } from "../constants";
import { scrollToForm } from "../utils/scroll";
import { openWhatsApp } from "../utils/whatsapp";

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] px-4 py-12 text-center text-white md:px-8">
      <div className="container-shell">
        <h2 className="inline-flex items-center justify-center gap-2 text-2xl font-extrabold text-white"><PawPrint size={24} className="text-[var(--color-primary)]" />{BRAND}</h2>
        <p className="mx-auto mt-2 max-w-xl text-white/70">El paseo que tus perros merecen. Y tú también.</p>
        <button onClick={scrollToForm} className="btn-secondary mx-auto mt-7 border-white text-white hover:bg-white/10 md:w-auto">HACER MI PEDIDO AHORA →</button>
        <div className="my-8 border-t border-white/10" />
        <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          <div><h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">Contáctanos</h3><button onClick={() => openWhatsApp()} className="mx-auto flex items-center gap-2 text-sm text-white/65 md:mx-0"><MessageCircle size={18} /> WhatsApp de atención</button><p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start"><MapPin size={14} /> Envíos a toda Colombia</p><p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start"><Clock size={14} /> Lun a Sáb, 8am a 8pm</p><p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start"><Mail size={16} /> Atención por WhatsApp</p></div>
          <div><h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">Compra segura</h3><p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start"><Truck size={16} /> Envío gratis</p><p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start"><ShieldCheck size={16} /> Pagas cuando recibes</p><p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start"><PackageCheck size={16} /> Garantía 30 días</p></div>
          <div><h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">Síguenos</h3><div className="flex justify-center gap-3 md:justify-start"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[var(--color-primary)]"><Camera size={18} /></a><button onClick={() => openWhatsApp()} aria-label="WhatsApp" className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[var(--color-success)]"><MessageCircle size={18} /></button></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-extrabold text-white/70">{["Interrapidísimo", "Coordinadora", "TCC"].map((name) => <span key={name} className="rounded bg-white/10 px-2 py-2">{name}</span>)}</div></div>
        </div>
        <div className="my-8 border-t border-white/10" />
        <div className="flex flex-wrap justify-center gap-5 text-[13px] font-medium text-white/50"><a>Política de privacidad</a><a>Devoluciones</a><a>Términos y condiciones</a></div>
        <p className="mt-6 text-xs text-white/35">© 2025 PaseoCan. Hecho para dueños de perros en Colombia.</p>
      </div>
    </footer>
  );
}
