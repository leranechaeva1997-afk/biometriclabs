import { ECONOMY, RELIABILITY } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal, RevealX } from "@/components/effects";

export function EconomyReliability() {
  return (
    <Section tone="muted">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Экономика */}
        <RevealX className="lg:pr-16">
          <span className="text-[14px] font-bold uppercase tracking-[0.14em] text-gold">
            {ECONOMY.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {ECONOMY.h2}
          </h2>
          <p className="mt-4 text-ink/75">{ECONOMY.body}</p>
        </RevealX>

        {/* Надёжность — на десктопе отделена тонкой линией слева */}
        <Reveal delay={0.12} className="lg:border-l lg:border-line lg:pl-16">
          <span className="text-[14px] font-bold uppercase tracking-[0.14em] text-gold">
            {RELIABILITY.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {RELIABILITY.h2}
          </h2>
          <p className="mt-4 text-ink/75">{RELIABILITY.body}</p>
        </Reveal>
      </div>
    </Section>
  );
}
