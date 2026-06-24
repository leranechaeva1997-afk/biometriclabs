import Image from "next/image";
import { CLIENTS } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/effects";
import { asset } from "@/lib/asset";

export function Clients() {
  return (
    <Section tone="light">
      <Reveal>
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted">
            {CLIENTS.title}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
            {CLIENTS.logos.map((l) => (
              <Image
                key={l.alt}
                src={asset(l.src)}
                alt={l.alt}
                width={l.width}
                height={l.height}
                style={{ height: `${l.h}px`, width: "auto" }}
                className="w-auto object-contain opacity-70"
              />
            ))}
          </div>
          <p className="text-sm text-muted">{CLIENTS.subtitle}</p>
        </div>
      </Reveal>
    </Section>
  );
}
