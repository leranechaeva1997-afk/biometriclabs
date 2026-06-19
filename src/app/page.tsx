import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FrameSequence } from "@/components/FrameSequence";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />          {/* 1. Герой */}
        <FrameSequence /> {/* 2. Сквозная секция: раскадровка по скроллу, текст слева */}
        <Contact />       {/* 3. Финал: форма заявки + контакты */}
      </main>
      <Footer />
    </>
  );
}
