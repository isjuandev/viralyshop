import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CountdownContext = createContext(null);
const DURATION = 24 * 60 * 60 - 1;
const KEY = "paseocan_countdown_start";

function getRemaining() {
  const now = Math.floor(Date.now() / 1000);
  let start = Number(sessionStorage.getItem(KEY));
  if (!start || now - start >= DURATION) {
    start = now;
    sessionStorage.setItem(KEY, String(start));
  }
  return Math.max(0, DURATION - (now - start));
}

function split(total) {
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function CountdownProvider({ children }) {
  const [remaining, setRemaining] = useState(() => getRemaining());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          sessionStorage.setItem(KEY, String(Math.floor(Date.now() / 1000)));
          return DURATION;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const value = useMemo(() => split(remaining), [remaining]);
  return <CountdownContext.Provider value={value}>{children}</CountdownContext.Provider>;
}

export function useCountdown() {
  return useContext(CountdownContext);
}
