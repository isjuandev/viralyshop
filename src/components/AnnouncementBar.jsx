import { useEffect, useState } from "react";
import { Lock, Star, Truck } from "lucide-react";

const messages = [
  { icon: Truck, text: "Envío gratis a toda Colombia" },
  { icon: Star, text: "+847 dueños de perros felices" },
  { icon: Lock, text: "Pagas contra entrega — sin riesgo" },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShow(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % messages.length);
        setShow(true);
      }, 220);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex h-10 items-center justify-center bg-[#0A0A0A] px-4 text-center text-[13px] font-semibold text-white">
      <span className={`inline-flex items-center gap-2 transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`}>
        {(() => {
          const Icon = messages[index].icon;
          return <Icon className="size-4" />;
        })()}
        {messages[index].text}
      </span>
    </div>
  );
}
