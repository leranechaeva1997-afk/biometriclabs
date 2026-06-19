import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://leranechaeva1997-afk.github.io/biometriclabs/";
const OG_IMAGE = "https://leranechaeva1997-afk.github.io/biometriclabs/media/frames/frame_460.jpg";
const TITLE =
  "Обнаружение утечек на трубопроводах с точностью до метра — BiometricLabs";
const DESCRIPTION =
  "Комплекс BiometricLabs находит скрытые протечки на трубопроводах за три минуты с точностью до одного метра. Нейросеть отсеивает шум насосов и техники. Проведём диагностику на вашем объекте.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "BiometricLabs",
    locale: "ru_RU",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1280,
        height: 720,
        alt: "BiometricLabs — комплекс обнаружения утечек на трубопроводах",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
