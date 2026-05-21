import { Reveal } from "./Reveal";

export function Comparison() {
  return (
    <section className="section-shell bg-[var(--color-white)]">
      <div className="container-shell lg:px-6">
        <Reveal className="overflow-hidden rounded-3xl lg:mx-auto lg:max-w-[900px]">
          <picture className="block">
            <source media="(min-width: 1024px)" srcSet="/CompararD.png" />
            <img
              src="/Comparar.png"
              alt="Comparativa PaseoCan"
              className="h-auto w-full rounded-3xl lg:max-h-[760px] lg:object-contain"
              loading="lazy"
            />
          </picture>
        </Reveal>
      </div>
    </section>
  );
}
