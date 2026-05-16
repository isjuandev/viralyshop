import { useEffect, useRef, useState } from "react";
import { PawPrint } from "lucide-react";

const SESSION_KEY = "sales-toast-count";
const MAX_TOASTS = 4;
const FIRST_DELAY_MS = 8000;
const MIN_NEXT_MS = 25000;
const MAX_NEXT_MS = 40000;
const VISIBLE_MS = 5000;

const MESSAGES = [
  "🐾 Valentina de Medellín acaba de pedir · hace 2 min",
  "🐾 Carlos de Bogotá pidió 2 unidades · hace 5 min",
  "🐾 Luisa de Cali aseguró su unidad · hace 8 min",
  "🐾 Andrés de Barranquilla ordenó · hace 1 min",
];

function emphasizeName(message) {
  const withoutEmoji = message.replace(/^🐾\s*/, "");
  const [namePart, ...rest] = withoutEmoji.split(" de ");
  if (!rest.length) return { name: withoutEmoji, rest: "" };
  return { name: namePart.trim(), rest: `de ${rest.join(" de ")}` };
}

export function SalesToast() {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef([]);

  useEffect(() => {
    const pushTimeout = (id) => timeoutRef.current.push(id);
    const clearAll = () => {
      timeoutRef.current.forEach((id) => clearTimeout(id));
      timeoutRef.current = [];
    };

    const randomDelay = () => Math.floor(Math.random() * (MAX_NEXT_MS - MIN_NEXT_MS + 1)) + MIN_NEXT_MS;

    const scheduleNext = (delay) => {
      const timer = setTimeout(() => {
        const shown = Number(sessionStorage.getItem(SESSION_KEY) || 0);
        if (shown >= MAX_TOASTS) return;

        const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setToast(message);
        setVisible(true);
        sessionStorage.setItem(SESSION_KEY, String(shown + 1));

        const hideTimer = setTimeout(() => setVisible(false), VISIBLE_MS - 300);
        const clearTimer = setTimeout(() => {
          setToast(null);
          scheduleNext(randomDelay());
        }, VISIBLE_MS);

        pushTimeout(hideTimer);
        pushTimeout(clearTimer);
      }, delay);

      pushTimeout(timer);
    };

    if (Number(sessionStorage.getItem(SESSION_KEY) || 0) < MAX_TOASTS) {
      scheduleNext(FIRST_DELAY_MS);
    }

    return clearAll;
  }, []);

  if (!toast) return null;

  const { name, rest } = emphasizeName(toast);

  return (
    <div
      className={`fixed bottom-[88px] left-4 z-[998] max-w-[280px] rounded-lg border-l-[3px] border-[#1E90FF] bg-white p-3 shadow-[0_10px_30px_rgba(10,10,10,0.12)] transition-all duration-300 md:bottom-4 md:max-w-[320px] ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2.5">
        <span className="mt-[1px] inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#1E90FF]">
          <PawPrint className="size-3.5" />
        </span>
        <p className="text-[13px] leading-snug text-[#374151]">
          <span className="font-bold">{name}</span> <span>{rest}</span>
        </p>
      </div>
    </div>
  );
}
