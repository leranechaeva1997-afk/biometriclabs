import type { ReactNode } from "react";

/* Единый компонент секции. База всегда светлая, тёмных нет. */
const toneClass: Record<"light" | "muted", string> = {
  light: "bg-paper text-ink",
  muted: "bg-paper-2 text-ink",
};

export function Section({
  id,
  tone = "light",
  children,
}: {
  id?: string;
  tone?: "light" | "muted";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${toneClass[tone]} scroll-mt-28 py-24 sm:py-28 lg:py-32 relative overflow-hidden`}
    >
      <div className="mx-auto max-w-[1180px] px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* Маленький золотой eyebrow-ярлычок над заголовком секции */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[14px] font-bold uppercase tracking-[0.14em] text-gold">
      {children}
    </span>
  );
}
