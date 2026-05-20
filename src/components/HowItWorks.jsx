import { useRef, useState } from "react";
import { ArrowLeft, Battery, Handbag, Link2, SlidersHorizontal, Smile } from "lucide-react";
import { Reveal } from "./Reveal";
import { scrollToForm } from "../utils/scroll";

const howVideo = "/reviews/IMG_8880.MP4";
const callouts = [
  { text: "1. Desmonta", icon: ArrowLeft, side: "left" },
  { text: "2. Pon la batería", icon: Battery, side: "left" },
  { text: "3. Pon tus bolsas", icon: Handbag, side: "right" },
  { text: "4. Sal a pasear", icon: Smile, side: "right" },
];

export function HowItWorks() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const toggleSound = async () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setSoundOn(!nextMuted);
    try {
      await videoRef.current.play();
    } catch {}
  };

  return (
    <section className="section-shell bg-[var(--color-white)]">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <span className="kicker">Listo en menos de 5 pasos</span>
          <h2 className="section-title mt-3">Así de fácil es usar PaseoCan</h2>
          <p className="section-subtitle">En minutos lo armas, lo preparas y sales a caminar sin estrés: más control para ti, más libertad para tus peludos.</p>
        </Reveal>
        <Reveal className="mt-8 overflow-hidden rounded-3xl">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-[var(--color-dark)]">
            <video
              ref={videoRef}
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
