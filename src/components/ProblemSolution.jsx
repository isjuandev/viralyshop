import { useEffect, useRef, useState } from "react";
import { Flashlight, Handbag, Move3D, Waypoints } from "lucide-react";
import { Reveal } from "./Reveal";

const heroVideo = "https://sqnqkv68isi215qp.private.blob.vercel-storage.com/videos/IMG_8881.mp4?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfU1FuUWtWNjhJc2kyMTVxUCIsIm93bmVySWQiOiJ0ZWFtX1FOQ1dsMzFocEFYRnp1dVhkWFhWMUp1QyIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzc5NTczMjA0NzEzLCJpYXQiOjE3Nzk1MzAwMDQ4OTh9.My8QUkm0ezt6vXta91m3REnXThBERlHQLB8I-Em982M&vercel-blob-signature=d_a0Mk4LOUGhUpW23y_lHeroxuWuC0AV9W_X4dwRguc";
const callouts = [
  {
    text: "Anti-enredo",
    description: "El giro 360 mantiene las dos correas separadas durante el paseo.",
    icon: Move3D,
    side: "left",
  },
  {
    text: "Linterna",
    description: "Más visibilidad cuando sales temprano o al final del día.",
    icon: Flashlight,
    side: "left",
  },
  {
    text: "Para 2 mascotas",
    description: "Una sola agarradera para coordinar dos perros sin cargar dos correas.",
    icon: Waypoints,
    side: "right",
  },
  {
    text: "Porta Bolsas",
    description: "Lleva lo necesario sin llenar tus bolsillos ni improvisar en la calle.",
    icon: Handbag,
    side: "right",
  },
];

export function ProblemSolution() {
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  const isVisible = (video) => {
    if (!video) return false;
    return video.offsetParent !== null;
  };

  const syncVideoAudio = () => {
    const mobile = mobileVideoRef.current;
    const desktop = desktopVideoRef.current;
    if (!mobile || !desktop) return;

    const mobileVisible = isVisible(mobile);
    const desktopVisible = isVisible(desktop);

    if (mobileVisible && !desktopVisible) {
      mobile.muted = !soundOn;
      desktop.muted = true;
      return;
    }

    if (desktopVisible && !mobileVisible) {
      desktop.muted = !soundOn;
      mobile.muted = true;
      return;
    }

    mobile.muted = true;
    desktop.muted = true;
  };

  const toggleSound = async () => {
    const nextSoundOn = !soundOn;
    setSoundOn(nextSoundOn);
    const mobile = mobileVideoRef.current;
    const desktop = desktopVideoRef.current;
    const activeVideo = isVisible(desktop) ? desktop : mobile;
    const inactiveVideo = activeVideo === desktop ? mobile : desktop;
    if (inactiveVideo) inactiveVideo.muted = true;
    if (!activeVideo) return;
    activeVideo.muted = !nextSoundOn;
    try {
      await activeVideo.play();
    } catch {}
  };

  useEffect(() => {
    syncVideoAudio();
    const handleResize = () => syncVideoAudio();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [soundOn]);

  return (
    <section className="section-shell bg-[var(--color-surface)] py-10">
      <div className="container-shell lg:max-w-[1200px] lg:px-6">
        <Reveal className="overflow-hidden rounded-3xl lg:hidden">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-[var(--color-dark)]">
            <video
              ref={mobileVideoRef}
              src={heroVideo}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
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
                <div className="space-y-3 lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:space-y-20">
                  {callouts
                    .filter((item) => item.side === "left")
                    .map(({ text, icon: Icon }) => (
                      <FloatingBadge
                        key={text}
                        icon={Icon}
                        text={text}
                        align="left"
                      />
                    ))}
                </div>
                <div className="space-y-3 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:space-y-20">
                  {callouts
                    .filter((item) => item.side === "right")
                    .map(({ text, icon: Icon }) => (
                      <FloatingBadge
                        key={text}
                        icon={Icon}
                        text={text}
                        align="right"
                      />
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
              <span className="kicker">Paseos sin estrés</span>
              <h2 className="mt-4 text-[42px] font-extrabold leading-tight text-[var(--color-dark)]">
                Controla dos perros sin enredos, jalones ni pausas incómodas.
              </h2>
              <p className="mt-4 max-w-[520px] text-[18px] leading-relaxed text-[var(--color-body)]">
                PaseoCan concentra el control en una sola mano: giro anti-enredo, freno individual y accesorios útiles para salir de día o de noche.
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
                src={heroVideo}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
              muted
              loop
              playsInline
              preload="auto"
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
  const alignment =
    align === "right" ? "justify-self-end" : "justify-self-start";
  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-white backdrop-blur-sm ${alignment}`}
    >
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
