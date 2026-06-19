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

export const metadata: Metadata = {
  title:
    "Обнаружение утечек на трубопроводах с точностью до метра — BiometricLabs",
  description:
    "Комплекс BiometricLabs находит скрытые протечки на трубопроводах за три минуты с точностью до одного метра. Нейросеть отсеивает шум насосов и техники. Пилот на вашем объекте.",
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
