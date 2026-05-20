import { Reveal } from "./Reveal";

export function Comparison() {
  return (
    <section className="section-shell bg-[var(--color-white)]">
      <div className="container-shell lg:px-6">
        <Reveal className="overflow-hidden rounded-3xl lg:mx-auto lg:max-w-[900px]">
          <img
            src="/Comparar.png"
            alt="Comparativa PaseoCan"
            className="h-auto w-full lg:max-h-[760px] lg:object-contain"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
