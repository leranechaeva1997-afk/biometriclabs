import {
  Phone,
  EnvelopeSimple,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
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
        {/* левая колонка: заголовок, лид, контакты одной строкой */}
        <div>
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {CONTACT.h2}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-lg text-ink/75">{CONTACT.lead}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2.5 text-ink/80 transition-colors hover:text-ink"
              >
                <Phone size={20} className="text-gold" weight="fill" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2.5 text-ink/80 transition-colors hover:text-ink"
              >
                <EnvelopeSimple size={20} className="text-gold" weight="fill" />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-ink/80 transition-colors hover:text-ink"
              >
                <TelegramLogo size={20} className="text-gold" weight="fill" />
                {CONTACT.telegram}
              </a>
            </div>
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
