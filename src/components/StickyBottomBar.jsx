import { useEffect, useRef, useState } from "react";
import { scrollToForm } from "../utils/scroll";

export function StickyBottomBar() {
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [isInOrderSection, setIsInOrderSection] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsPastThreshold(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById("order");
    observerRef.current = new IntersectionObserver(([entry]) => setIsInOrderSection(entry.isIntersecting), { threshold: 0.25 });
    if (form) observerRef.current.observe(form);
    return () => observerRef.current?.disconnect();
  }, []);

  if (!isPastThreshold || isInOrderSection) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[999] md:hidden">
      <button
        onClick={scrollToForm}
        className="sticky-mobile-cta flex h-[60px] w-full items-center justify-center bg-[#1E90FF] px-4 text-center text-[15px] font-extrabold text-white"
      >
        🔥 $34.900 — PEDIR AHORA →
      </button>
    </div>
  );
}
