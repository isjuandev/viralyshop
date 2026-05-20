import { FaWhatsapp } from "react-icons/fa";
import { openWhatsApp } from "../utils/whatsapp";

export function WhatsAppButton() {
  return (
    <button aria-label="Abrir WhatsApp" onClick={() => openWhatsApp()} className="fixed bottom-20 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-2xl font-bold text-white shadow-lg transition hover:scale-105 md:bottom-8">
      <FaWhatsapp className="size-7" />
    </button>
  );
}
