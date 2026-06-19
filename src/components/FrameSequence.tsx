"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { VIDEO } from "@/lib/content";
import { asset } from "@/lib/asset";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL = 460;
// текстовые блоки умещаются в первые TEXT_END прокрутки; после — чистый
// финальный кадр (логотип + волна) без текста слева
const TEXT_END = 0.86;
const FRAME_W = 1280;
const FRAME_H = 720;
const PAPER = "#f3eee3";

const frameSrc = (i: number) =>
  asset(`/media/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`);

export function FrameSequence() {
  const outerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetRef = useRef(0); // целевой кадр от прогресса скролла (float)
  const displayedRef = useRef(0); // текущий показываемый кадр (float, догоняет target)
  const lastDrawnRef = useRef(-1); // последний отрисованный целочисленный кадр
  const rafRef = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const blocks = VIDEO.blocks;
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // отрисовка кадра в канвас (object-contain, фон беж)
  const draw = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, cw, ch);
    const img = imagesRef.current[i];
    if (!img || !img.complete || img.naturalWidth === 0 || cw === 0) return;
    const scale = Math.min(cw / FRAME_W, ch / FRAME_H);
    const dw = FRAME_W * scale;
    const dh = FRAME_H * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    lastDrawnRef.current = -1; // форсируем перерисовку после ресайза
    draw(Math.round(displayedRef.current));
  };

  // rAF-цикл: показываемый кадр плавно догоняет целевой (lerp) —
  // смена кадров текучая даже при ступенчатом скролле
  const tick = () => {
    const t = targetRef.current;
    const d = displayedRef.current;
    const nd = d + (t - d) * 0.08;
    const settled = Math.abs(t - nd) < 0.25;
    displayedRef.current = settled ? t : nd;
    const idx = Math.round(displayedRef.current);
    if (idx !== lastDrawnRef.current) {
      lastDrawnRef.current = idx;
      draw(idx);
    }
    rafRef.current = settled ? null : requestAnimationFrame(tick);
  };

  const ensureLoop = () => {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  };

  // предзагрузка всех кадров
  useEffect(() => {
    let count = 0;
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(TOTAL);
    for (let i = 0; i < TOTAL; i++) {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        count++;
        setLoaded(count);
        if (i === 0) draw(0); // первый кадр — сразу под лоадером
        if (count === TOTAL) setReady(true);
      };
      img.src = frameSrc(i);
      imgs[i] = img;
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // размер канваса под DPR + перерисовка при ресайзе
  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // остановить rAF при размонтировании
  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // прогресс прокрутки → целевой кадр (сглаживается в tick) + активный блок
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const target = Math.min(TOTAL - 1, Math.max(0, v * (TOTAL - 1)));
    targetRef.current = target;
    if (reduce) {
      // без анимации — сразу нужный кадр
      displayedRef.current = target;
      const idx = Math.round(target);
      if (idx !== lastDrawnRef.current) {
        lastDrawnRef.current = idx;
        draw(idx);
      }
    } else {
      ensureLoop();
    }
    // блоки распределены по [0, TEXT_END]; на финальном участке текста нет (-1)
    const a =
      v >= TEXT_END
        ? -1
        : Math.min(blocks.length - 1, Math.floor((v / TEXT_END) * blocks.length));
    setActive(a);
  });

  const pct = Math.round((loaded / TOTAL) * 100);

  return (
    <section
      id="how"
      ref={outerRef}
      // моб — короче (без длинной пустоты после финального кадра);
      // десктоп — прежняя высота (9 блоков × 84vh = 756vh)
      className="relative h-[440vh] md:h-[756vh]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-paper">
        {/* МОБ: вертикальный стек (кадр сверху, текст снизу) с отступом под шапку.
            ДЕСКТОП: оверлей (отступ не нужен — кадр фоном). */}
        <div className="flex h-full flex-col pt-20 md:block md:pt-0">
          {/* КАДР: моб — своя зона сверху (кадр целиком, не обрезан);
              десктоп — фон на весь экран */}
          <div className="relative w-full shrink-0 basis-[42svh] md:absolute md:inset-0 md:basis-auto">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          </div>

          {/* ТЕКСТ: моб — отдельная карточка под кадром; десктоп — слева по центру */}
          <div className="pointer-events-none flex min-h-0 flex-1 items-center md:absolute md:inset-0 md:flex-none">
            <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
              <div className="relative mx-auto w-full max-w-[460px] md:mx-0">
                {blocks.map((b, i) => (
                  <motion.div
                    key={i}
                    className="glass-panel pointer-events-auto absolute inset-x-0 top-0 -translate-y-1/2 rounded-2xl p-5 sm:p-7"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                    style={{ zIndex: i === active ? 2 : 1 }}
                    aria-hidden={i === active ? undefined : true}
                  >
                    <span className="text-[14px] font-bold uppercase tracking-[0.14em] text-gold">
                      {b.k}
                    </span>
                    <h3 className="mt-2 text-2xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-3xl">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-ink/75">{b.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* индикатор загрузки кадров — поверх всего */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-paper">
            <div className="flex flex-col items-center gap-3 text-muted">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-gold" />
              <span className="text-sm tabular-nums">Загрузка… {pct}%</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
