import { useRef, useState } from "react";
import { Crown, ShieldCheck, ShieldCog, ShoppingCart } from "lucide-react";
import { Reveal } from "./Reveal";

const featureVideo = "/reviews/IMG_8879.MP4";
const callouts = [
  {
    text: "Envío gratis",
    description: "Recibe tu pedido en casa sin pagar costos adicionales de entrega.",
    icon: ShoppingCart,
    side: "left",
  },
  {
    text: "Garantía de 30 días",
    description: "Compra con respaldo si el producto no cumple lo que esperabas.",
    icon: ShieldCog,
    side: "left",
  },
  {
    text: "Diseño innovador",
    description: "Una sola pieza reúne control, comodidad y funciones para paseos diarios.",
    icon: Crown,
    side: "right",
  },
  {
    text: "Seguro y resistente",
    description: "Materiales pensados para acompañar salidas frecuentes con dos perros.",
    icon: ShieldCheck,
    side: "right",
  },
];

export function ProductFeatures() {
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = async () => {
    const videos = [mobileVideoRef.current, desktopVideoRef.current].filter(Boolean);
    if (!videos.length) return;
    const nextMuted = !videos[0].muted;
    videos.forEach((video) => {
      video.muted = nextMuted;
    });
    setSoundOn(!nextMuted);
    try {
      await Promise.all(videos.map((video) => video.play()));
    } catch {}
  };

  return (
    <section className="section-shell bg-[var(--color-surface)]">
      <div className="container-shell lg:max-w-[1200px] lg:px-6">
        <Reveal className="overflow-hidden rounded-3xl lg:hidden">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-[var(--color-dark)]">
            <video
              ref={mobileVideoRef}
              src={featureVideo}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <button
              type="button"
              onClick={toggleSound}
              className="absolute right-3 top-1 z-20 rounded-full bg-black/65 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur-sm"
            >
              {soundOn ? "🔇 Silenciar" : "🔊 Activar sonido"}
            </button>

            <div className="relative z-10 flex min-h-[620px] flex-col justify-end p-5 sm:p-7 lg:min-h-[600px]">
              <div className="grid grid-cols-2 gap-3 lg:absolute lg:inset-0 lg:block">
                <div className="space-y-3 lg:absolute lg:left-8 lg:top-[10%] lg:space-y-72">
                  {callouts
                    .filter((item) => item.side === "left")
                    .map(({ text, icon: Icon }) => (
                      <FloatingBadge key={text} icon={Icon} text={text} align="left" />
                    ))}
                </div>
                <div className="space-y-3 lg:absolute lg:right-8 lg:top-[10%] lg:space-y-72">
                  {callouts
                    .filter((item) => item.side === "right")
                    .map(({ text, icon: Icon }) => (
                      <FloatingBadge key={text} icon={Icon} text={text} align="right" />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal className="hidden lg:block">
          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            <div className="flex min-h-[768px] min-w-0 flex-col justify-between rounded-3xl bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div>
              <span className="kicker">Detalles que importan</span>
              <h2 className="mt-4 text-[42px] font-extrabold leading-tight text-[var(--color-dark)]">
                Diseño resistente, compra protegida y listo para el paseo diario.
              </h2>
              <p className="mt-4 max-w-[520px] text-[18px] leading-relaxed text-[var(--color-body)]">
                La correa reúne practicidad, seguridad y respaldo para que el cambio se sienta desde el primer uso.
              </p>
              </div>
              <div className="mt-8 grid gap-4">
                {callouts.map(({ text, description, icon: Icon }) => (
                  <FeatureCallout
                    key={text}
                    icon={Icon}
                    title={text}
                    description={description}
                  />
                ))}
              </div>
            </div>
            <div className="relative min-h-[768px] overflow-hidden rounded-3xl bg-[var(--color-dark)] shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
              <video
                ref={desktopVideoRef}
                src={featureVideo}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              <button
                type="button"
                onClick={toggleSound}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/65 px-4 py-2 text-[12px] font-bold text-white backdrop-blur-sm"
              >
                {soundOn ? "🔇 Silenciar" : "🔊 Activar sonido"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FloatingBadge({ icon: Icon, text, align }) {
  const alignment = align === "right" ? "justify-self-end" : "justify-self-start";
  return (
    <div className={`flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-white backdrop-blur-sm ${alignment}`}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15">
        <Icon size={15} />
      </span>
      <span className="text-[12px] font-semibold leading-tight">{text}</span>
    </div>
  );
}

function FeatureCallout({ icon: Icon, title, description }) {
  return (
    <article className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
        <Icon size={20} />
      </span>
      <div>
        <h3 className="text-[17px] font-extrabold text-[var(--color-dark)]">
          {title}
        </h3>
        <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>
      </div>
    </article>
  );
}
