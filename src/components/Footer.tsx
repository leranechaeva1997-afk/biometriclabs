import Image from "next/image";
import Link from "next/link";
import { LOGO, FOOTER } from "@/lib/content";
import { asset } from "@/lib/asset";
import { WaveVideoBg } from "@/components/WaveVideoBg";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-paper">
      {/* фоновое видео-волны за стеклянной строкой */}
      <WaveVideoBg />

      <div className="relative mx-auto max-w-[1180px] px-6 py-6 lg:px-8">
        <div className="glass-panel flex flex-col gap-4 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src={asset(LOGO.src)}
            alt={LOGO.alt}
            width={150}
            height={34}
            className="h-7 w-auto object-contain"
          />
          <div className="flex flex-col gap-1.5 text-sm text-muted sm:flex-row sm:items-center sm:gap-6">
            <a
              href="https://biometric-labs.ru/catalog2026/#catalog-products"
              className="flex items-center gap-1 transition-colors hover:text-ink"
            >
              <span aria-hidden>←</span>
              <span>Вернуться</span>
            </a>
            <span>{FOOTER.copyright}</span>
            <Link
              href={FOOTER.privacyHref}
              className="transition-colors hover:text-ink"
            >
              {FOOTER.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
