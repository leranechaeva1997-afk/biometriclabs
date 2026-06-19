"use client";
import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

// Фоновое видео с золотыми частицами-волнами (бесшовный луп, бежевый фон).
// Лежит за текстом, приглушено + лёгкая бежевая подложка для читаемости.
export function WaveVideoBg() {
  const ref = useRef<HTMLVideoElement>(null);

  // подстраховка автоплея: пнуть play() на маунте и при возврате во вкладку
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const kick = () => v.play().catch(() => {});
    kick();
    const onVisible = () => {
      if (document.visibilityState === "visible") kick();
    };
    v.addEventListener("canplay", kick);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      v.removeEventListener("canplay", kick);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-paper"
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.55 }}
        src={asset("/media/waves-loop.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* бежевая полупрозрачная подложка между видео и текстом */}
      <div className="absolute inset-0 bg-paper/30" />
    </div>
  );
}
