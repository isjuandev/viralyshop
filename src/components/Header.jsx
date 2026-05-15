import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";
import { BRAND } from "../constants";
import { scrollToForm } from "../utils/scroll";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur"}`}>
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-center px-4 md:justify-between">
        <button className="absolute right-4 rounded-[10px] bg-[#1E90FF] px-4 py-3 text-[15px] font-bold uppercase tracking-[0.05em] text-white shadow-sm transition hover:scale-[1.02] hover:shadow-lg md:static" onClick={scrollToForm}>
          Pedir ahora
        </button>
        <div className="flex items-center gap-2 text-lg font-extrabold md:order-first"><PawPrint className="size-5 text-[#1E90FF]" /> {BRAND}</div>
      </div>
    </header>
  );
}
