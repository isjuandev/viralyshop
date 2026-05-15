import { Camera, Clock, MapPin, MessageCircle, PackageCheck, PawPrint, ShieldCheck, Truck } from "lucide-react";
import { BRAND } from "../constants";
import { scrollToForm } from "../utils/scroll";
import { openWhatsApp } from "../utils/whatsapp";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] px-4 py-12 text-center text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="inline-flex items-center justify-center gap-2 text-2xl font-extrabold"><PawPrint className="size-6 text-[#1E90FF]" />{BRAND}</h2>
        <p className="mt-2 text-[#D1D5DB]">El paseo que tus perros merecen. Y tú también.</p>
        <button onClick={scrollToForm} className="mt-7 rounded-[10px] border border-white px-6 py-4 text-[15px] font-bold uppercase tracking-[0.05em] transition hover:bg-white hover:text-[#0A0A0A]">HACER MI PEDIDO AHORA →</button>
        <div className="my-8 border-t border-[#1F2937]" />
        <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">Contáctanos</h3>
            <button onClick={() => openWhatsApp()} className="mx-auto flex items-center gap-2 text-sm text-[#9CA3AF] md:mx-0"><MessageCircle className="size-4" /> WhatsApp de atención</button>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[#9CA3AF] md:justify-start"><MapPin className="size-4" /> Envíos a toda Colombia</p>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[#9CA3AF] md:justify-start"><Clock className="size-4" /> Atención: Lun a Sáb, 8am a 8pm</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">Compra segura</h3>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[#9CA3AF] md:justify-start"><Truck className="size-4" /> Envío gratis a toda Colombia</p>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[#9CA3AF] md:justify-start"><ShieldCheck className="size-4" /> Pagas cuando lo recibes</p>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[#9CA3AF] md:justify-start"><PackageCheck className="size-4" /> Garantía 30 días</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">Síguenos</h3>
            <div className="flex justify-center gap-3 md:justify-start">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full bg-[#1F2937] transition hover:bg-[#1E90FF]"><Camera className="size-5" /></a>
              <button onClick={() => openWhatsApp()} aria-label="WhatsApp" className="flex size-10 items-center justify-center rounded-full bg-[#1F2937] transition hover:bg-[#25D366]"><MessageCircle className="size-5" /></button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-extrabold text-[#D1D5DB]">
              {["Interrapidísimo", "Coordinadora", "TCC"].map((name) => <span key={name} className="rounded bg-[#1F2937] px-2 py-2">{name}</span>)}
            </div>
          </div>
        </div>
        <div className="my-8 border-t border-[#1F2937]" />
        <div className="flex flex-wrap justify-center gap-5 text-[13px] font-medium text-[#9CA3AF]"><a>Política de privacidad</a><a>Devoluciones</a><a>Términos y condiciones</a></div>
        <p className="mt-6 text-xs text-[#4B5563]">© 2025 PaseoCan. Hecho para dueños de perros en Colombia.</p>
      </div>
    </footer>
  );
}
