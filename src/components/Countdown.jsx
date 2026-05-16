import { useCountdown } from "../context/CountdownContext";

const pad = (n) => String(n).padStart(2, "0");

export function Countdown({ dark = false }) {
  const { hours, minutes, seconds } = useCountdown();
  return (
    <span className={`inline-flex items-center gap-1 align-middle ${dark ? "text-white" : "text-[var(--color-dark)]"}`} aria-label={`${hours} horas ${minutes} minutos ${seconds} segundos`}>
      {[pad(hours), pad(minutes), pad(seconds)].map((value, index) => (
        <span key={index} className="inline-flex min-w-[28px] justify-center rounded-md bg-black/20 px-1.5 py-0.5 font-extrabold leading-none text-current md:min-w-[32px]">
          {value}
        </span>
      )).reduce((acc, item, index) => (index === 0 ? [item] : [...acc, <span key={`sep-${index}`} className="font-extrabold">:</span>, item]), [])}
    </span>
  );
}
