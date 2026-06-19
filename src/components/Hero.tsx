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
            BiometricLabs
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

          {/* статусы: Сколково + ОЗП — приглушённо, без плашек */}
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <span className="flex items-center gap-2.5">
                <Image
                  src={asset(STATUS.skolkovo.src)}
                  alt={STATUS.skolkovo.alt}
                  width={920}
                  height={492}
                  className="h-6 w-auto bg-transparent object-contain"
                />
                <span className="text-sm font-medium text-ink/75">
                  {STATUS.skolkovo.label}
                </span>
              </span>

              <span
                aria-hidden
                className="hidden h-8 w-px bg-gold/45 sm:block"
              />

              <span className="max-w-[340px] text-sm leading-snug">
                <span className="font-medium text-ink/75">
                  {STATUS.ozp.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {STATUS.ozp.note}
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-8 text-sm text-muted">{HERO.micro}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
