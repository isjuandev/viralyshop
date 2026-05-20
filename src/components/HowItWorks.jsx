import { useRef, useState } from "react";
import { ArrowLeft, Battery, Handbag, Smile } from "lucide-react";
import { Reveal } from "./Reveal";

const howVideo = "/reviews/IMG_8880.MP4";
const callouts = [
  {
    text: "1. Desmonta",
    description: "Abre el módulo inferior para preparar los accesorios antes de salir.",
    icon: ArrowLeft,
    side: "left",
  },
  {
    text: "2. Pon la batería",
    description: "Activa la linterna integrada para paseos con poca luz.",
    icon: Battery,
    side: "left",
  },
  {
    text: "3. Pon tus bolsas",
    description: "Carga las bolsas en el compartimento para tenerlas siempre a mano.",
    icon: Handbag,
    side: "right",
  },
  {
    text: "4. Sal a pasear",
    description: "Ajusta la correa y empieza el paseo con más control desde el primer minuto.",
    icon: Smile,
    side: "right",
  },
];

export function HowItWorks() {
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
    <section className="section-shell bg-[var(--color-white)]">
      <div className="container-shell lg:max-w-[1200px] lg:px-6">
        <Reveal className="mx-auto max-w-[720px] text-center lg:hidden">
          <span className="kicker">Listo en menos de 5 pasos</span>
          <h2 className="section-title mt-3">Así de fácil es usar PaseoCan</h2>
          <p className="section-subtitle">En minutos lo armas, lo preparas y sales a caminar sin estrés: más control para ti, más libertad para tus peludos.</p>
        </Reveal>
        <Reveal className="mt-8 overflow-hidden rounded-3xl lg:hidden">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-[var(--color-dark)]">
            <video
              ref={mobileVideoRef}
              src={howVideo}
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
            <div className="relative z-10 flex min-h-[620px] flex-col justify-end p-5 sm:p-7">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  {callouts
                    .filter((item) => item.side === "left")
                    .map(({ text, icon: Icon }) => (
                      <FloatingBadge key={text} icon={Icon} text={text} align="left" />
                    ))}
                </div>
                <div className="space-y-3">
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
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-w-0">
              <span className="kicker">Listo en menos de 5 pasos</span>
              <h2 className="mt-4 text-[42px] font-extrabold leading-tight text-[var(--color-dark)]">
                Así de fácil es preparar PaseoCan antes de salir.
              </h2>
              <p className="mt-4 max-w-[520px] text-[18px] leading-relaxed text-[var(--color-body)]">
                En minutos lo armas, activas sus accesorios y sales a caminar sin estrés: más control para ti, más libertad para tus peludos.
              </p>
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
                src={howVideo}
                className="absolute inset-0 h-full w-full object-contain"
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
