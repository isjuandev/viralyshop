import { Clock, Mail, MapPin, PawPrint } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BRAND } from "../constants";
import { scrollToForm } from "../utils/scroll";
import { openWhatsApp } from "../utils/whatsapp";

export function Footer() {
  return (
    <>
      <footer className="bg-[var(--color-dark)] px-4 py-12 text-center text-white md:px-8">
        <div className="container-shell lg:max-w-[1200px] lg:px-6">
          <div className="lg:grid lg:grid-cols-[1.25fr_1fr_1fr] lg:items-start lg:gap-10 lg:text-left">
            <div>
              <h2 className="inline-flex items-center justify-center gap-2 text-2xl font-extrabold text-white lg:justify-start">
                <PawPrint size={24} className="text-[var(--color-primary)]" />
                {BRAND}
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-white/70 lg:mx-0">
                El paseo que tus perros merecen. Y tú también.
              </p>
              <button
                onClick={scrollToForm}
                className="btn-secondary mx-auto mt-7 border-white text-white hover:bg-white/10 md:w-auto lg:mx-0"
              >
                HACER MI PEDIDO AHORA →
              </button>
            </div>
          <div className="my-8 border-t border-white/10 lg:hidden" />
          <div className="grid gap-8 text-center md:grid-cols-3 md:text-left lg:contents">
            <div>
              <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">
                Contáctanos
              </h3>
              <button
                onClick={() => openWhatsApp()}
                className="mx-auto flex items-center gap-2 text-sm text-white/65 md:mx-0"
              >
                <FaWhatsapp size={18} /> WhatsApp de atención
              </button>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start">
                <MapPin size={14} /> Envíos a toda Colombia
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start">
                <Clock size={14} /> Lun a Sáb, 8am a 8pm
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/65 md:justify-start">
                <Mail size={16} /> Atención por WhatsApp
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-extrabold uppercase tracking-widest text-white">
                Síguenos
              </h3>
              <div className="flex justify-center gap-3 md:justify-start">
                <a
                  href="https://www.instagram.com/viralyshop"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[var(--color-primary)]"
                >
                  <FaInstagram size={18} />
                </a>
                <button
                  onClick={() => openWhatsApp()}
                  aria-label="WhatsApp"
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[var(--color-success)]"
                >
                  <FaWhatsapp size={18} />
                </button>
              </div>
            </div>
          </div>
          </div>
          <div className="my-8 border-t border-white/10" />
          <div className="flex flex-wrap justify-center gap-5 text-[13px] font-medium text-white/50">
            <a>Política de privacidad</a>
            <a>Devoluciones</a>
            <a>Términos y condiciones</a>
          </div>
          <p className="mt-6 text-xs text-white/35">
            © 2025 PaseoCan. Hecho para dueños de perros en Colombia.
          </p>
        </div>
      </footer>
    </>
  );
}
