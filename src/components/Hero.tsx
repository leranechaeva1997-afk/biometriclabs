"use client";
import Image from "next/image";
import { HERO, STATUS } from "@/lib/content";
import { Reveal } from "@/components/effects";
import { WaveVideoBg } from "@/components/WaveVideoBg";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-paper pt-28 pb-20"
    >
      {/* сентинел для переключения шапки (5.7) */}
      <span id="top-sentinel" className="absolute top-0 h-px w-px" />

      <WaveVideoBg />

      <div className="relative mx-auto w-full max-w-[1180px] px-6 lg:px-8">
        <div className="max-w-[760px]">
          <Reveal as="span" className="mb-5 inline-block text-[14px] font-bold uppercase tracking-[0.14em] text-gold">
            БиометрикЛабс
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {HERO.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[560px] text-lg text-ink/75 sm:text-xl">
              {HERO.lead}
            </p>
          </Reveal>

          {/* статусы — приглушённо, без плашек */}
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <Image
                src={asset(STATUS.logo.src)}
                alt={STATUS.logo.alt}
                width={920}
                height={492}
                className="mr-0.5 h-6 w-auto bg-transparent object-contain"
              />
              {STATUS.items.map((it, i) => (
                <span key={it} className="flex items-center gap-x-3">
                  {i > 0 && (
                    <span aria-hidden className="h-3.5 w-px bg-gold/50" />
                  )}
                  <span className="font-medium text-ink/75">{it}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
