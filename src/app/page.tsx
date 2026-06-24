import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FrameSequence } from "@/components/FrameSequence";
import { EconomyReliability } from "@/components/EconomyReliability";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />              {/* 1. Герой */}
        <FrameSequence />     {/* 2. Видеосекция: 9 блоков по скроллу */}
        <EconomyReliability />{/* 3. Экономика + Надёжность — две колонки */}
        <Clients />           {/* 4. Нам доверяют — логотипы клиентов */}
        <Contact />           {/* 5. Финал: форма заявки */}
      </main>
      <Footer />
    </>
  );
}
