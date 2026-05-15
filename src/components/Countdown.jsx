import { useCountdown } from "../context/CountdownContext";

const pad = (n) => String(n).padStart(2, "0");

export function Countdown({ dark = false }) {
  const { hours, minutes, seconds } = useCountdown();
  return (
    <span className={dark ? "font-extrabold text-white" : "font-extrabold text-[#0A0A0A]"}>
      {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  );
}
