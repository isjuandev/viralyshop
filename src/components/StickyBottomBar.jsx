import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { BASE_PRICE } from "../constants";
import { formatPrice } from "../utils/format";
import { scrollToForm } from "../utils/scroll";

export function StickyBottomBar() {
  const [hidden, setHidden] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const form = document.getElementById("formulario");
    observerRef.current = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.3 });
    if (form) observerRef.current.observe(form);
    return () => observerRef.current?.disconnect();
  }, []);

  if (hidden) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-[#E5E7EB] bg-white px-4 py-3 md:hidden">
      <div className="text-lg font-extrabold text-[#1E90FF]">${formatPrice(BASE_PRICE)}</div>
      <button onClick={scrollToForm} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#1E90FF] text-[15px] font-bold uppercase tracking-[0.05em] text-white">PEDIR AHORA <ShoppingCart className="size-4" /></button>
    </div>
  );
}
