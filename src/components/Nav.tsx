"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { NAV, HERO, LOGO } from "@/lib/content";
import { asset } from "@/lib/asset";

export function Nav() {
  /* 5.5 полоса прогресса чтения */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  /* 5.7 прозрачная → плотная шапка */
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const s = document.getElementById("top-sentinel");
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), {
      threshold: 0,
    });
    if (s) io.observe(s);
    return () => io.disconnect();
  }, []);

  /* 5.6 scroll-spy навигация */
  const [active, setActive] = useState<string>(NAV[0].id);
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-paper/90 backdrop-blur-xl border-b border-line text-ink shadow-[0_4px_24px_-16px_rgba(10,10,10,0.4)]"
          : "bg-transparent text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5 lg:px-8">
        {/* левая группа: ссылка «Вернуться» + разделитель + логотип */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://biometric-labs.ru/catalog2026/#catalog-products"
            className="flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink shrink-0"
          >
            <span aria-hidden>←</span>
            <span className="hidden sm:inline">Вернуться</span>
          </a>
          <span aria-hidden className="h-4 w-px shrink-0 bg-line" />
          <a href="#top" className="flex items-center gap-2 shrink-0" aria-label="BiometricLabs">
            <Image
              src={asset(LOGO.src)}
              alt={LOGO.alt}
              width={150}
              height={34}
              priority
              className="h-7 w-auto object-contain"
            />
          </a>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="relative rounded-full px-3.5 py-1.5 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-paper-3"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
        >
          {HERO.cta}
        </a>
      </div>

      {/* полоса прогресса под шапкой */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gold"
      />
    </header>
  );
}
