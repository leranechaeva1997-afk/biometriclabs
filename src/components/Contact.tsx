import { CONTACT } from "@/lib/content";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/effects";
import { WaveVideoBg } from "@/components/WaveVideoBg";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
  return (
    <Section id="contact" tone="muted">
      {/* фоновое видео-волны на всю секцию, за текстом и формой */}
      <WaveVideoBg />

      <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* левая колонка: заголовок и лид */}
        <div>
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {CONTACT.h2}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-lg text-ink/75">{CONTACT.lead}</p>
          </Reveal>
        </div>

        {/* правая колонка: форма на стекле поверх видео-фона */}
        <div className="relative">
          <Reveal delay={0.1} className="relative">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
