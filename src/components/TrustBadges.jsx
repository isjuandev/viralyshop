import { Clock, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "./Reveal";

const badges = [
  { icon: Truck, title: "Envío Gratis", description: "A toda Colombia" },
  { icon: ShieldCheck, title: "Pago Seguro", description: "Pagas al recibir" },
  { icon: PackageCheck, title: "Satisfacción Garantizada", description: "30 días de respaldo" },
  { icon: Clock, title: "Despacho Rápido", description: "En 24 horas hábiles" },
];

export function TrustBadges() {
  return (
    <section className="bg-[#0A0A0A] px-4 py-12 text-white md:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {badges.map(({ icon: Icon, title, description }, index) => (
          <Reveal key={title} delay={index * 80}>
            <div className="flex flex-col items-center gap-3 text-center">
              <Icon className="size-10 text-[#1E90FF]" />
              <div>
                <h3 className="text-sm font-extrabold md:text-base">{title}</h3>
                <p className="mt-1 text-xs font-medium text-white/65 md:text-sm">{description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
