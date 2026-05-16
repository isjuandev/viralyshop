import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { scrollToForm } from "../utils/scroll";

const SESSION_KEY = "exit-intent-shown";
const MOBILE_MAX_WIDTH = 768;
const MOBILE_IDLE_MS = 45000;
const COUNTDOWN_SECONDS = 10 * 60;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);
  const idleTimeoutRef = useRef(null);

  const alreadyShown = useMemo(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }, []);

  useEffect(() => {
    if (alreadyShown || open) return;

    const isMobile = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;

    const showModal = () => {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    if (!isMobile) {
      const onMouseMove = (event) => {
        if (event.clientY <= 16) {
          showModal();
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      return () => document.removeEventListener("mousemove", onMouseMove);
    }

    const resetIdleTimer = () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(showModal, MOBILE_IDLE_MS);
    };

    const interactionEvents = ["scroll", "touchstart", "touchmove", "click", "keydown"];
    interactionEvents.forEach((eventName) => window.addEventListener(eventName, resetIdleTimer, { passive: true }));
    resetIdleTimer();

    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      interactionEvents.forEach((eventName) => window.removeEventListener(eventName, resetIdleTimer));
    };
  }, [alreadyShown, open]);

  useEffect(() => {
    if (!open) return;
    const tick = setInterval(() => {
      setRemaining((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => clearInterval(tick);
  }, [open]);

  const closeModal = () => setOpen(false);

  const handlePrimaryClick = () => {
    closeModal();
    scrollToForm();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/65 p-4">
      <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-6 text-center shadow-2xl md:p-8">
        <button
          aria-label="Cerrar"
          onClick={closeModal}
          className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#F3F4F6]"
        >
          <X className="size-5" />
        </button>

        <div className="text-5xl">🐾</div>
        <h3 className="mt-4 text-2xl font-extrabold leading-tight text-[#0A0A0A] md:text-[32px]">
          ¡Espera! Tu descuento está a punto de expirar
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4B5563] md:text-base">
          Tienes reservado un descuento de $15.000. Si sales ahora, lo pierdes.
        </p>

        <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.08em] text-[#DC2626]">
          Expira en {formatTime(remaining)}
        </p>

        <button
          onClick={handlePrimaryClick}
          className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-xl bg-[#1E90FF] px-4 text-[15px] font-extrabold uppercase tracking-[0.05em] text-white transition hover:scale-[1.01]"
        >
          QUIERO MI DESCUENTO → $34.900
        </button>

        <button
          onClick={closeModal}
          className="mt-3 text-xs font-semibold text-[#6B7280] underline-offset-2 transition hover:text-[#374151] hover:underline"
        >
          No, prefiero pagar más
        </button>
      </div>
    </div>
  );
}
