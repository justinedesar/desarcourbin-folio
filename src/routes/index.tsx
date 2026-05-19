import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import barcelona from "@/assets/barcelona_hero.jpg";
import portrait from "@/assets/justine_portrait.jpg";

const CALENDLY = "https://calendly.com/justine-desar/30min";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Desar Courbin · Operating and Strategic Advisory" },
      {
        name: "description",
        content:
          "Justine Desardurats — Fractional VP Sales, Operating Partner and Business Angel based in Barcelona. I help B2B tech scale-ups build structured, predictable revenue engines.",
      },
      { property: "og:title", content: "Desar Courbin · Operating and Strategic Advisory" },
      { property: "og:description", content: "Fractional VP Sales, Operating Partner & Business Angel based in Barcelona." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const { t } = useTranslation();
  const cards = t("services.cards", { returnObjects: true }) as any[];
  const companies = t("experience.companies", { returnObjects: true }) as any[];
  const expertise = t("experience.expertise", { returnObjects: true }) as string[];
  const investorCards = t("investor.cards", { returnObjects: true }) as any[];
  const faq = t("faq.items", { returnObjects: true }) as any[];
  const whatItems = t("what.items", { returnObjects: true }) as string[];
  const whenItems = t("services.when", { returnObjects: true }) as string[];
  const strengthsLeft = t("strengths.left", { returnObjects: true }) as string[];
  const strengthsRight = t("strengths.right", { returnObjects: true }) as string[];


  return (
    <>
      {/* HERO + WHAT I DO (shared background) */}
      <div className="relative overflow-hidden">
        <img
          src={barcelona}
          alt="Aerial view of Barcelona"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(1) contrast(0.9) brightness(1.1)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(60,60,60,0.65) 0%, rgba(80,80,80,0.35) 55%, rgba(120,120,120,0.15) 100%)",
          }}
        />
        <img
          src={portrait}
          alt="Justine Desardurats"
          className="hidden lg:block absolute right-0 top-0 h-[85vh] object-cover object-top grayscale z-10"
          style={{
            maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)",
          }}
        />

        {/* HERO */}
        <section className="relative z-20" style={{ minHeight: "100vh" }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-32 pb-24 min-h-screen flex flex-col justify-center">
            <Reveal>
              <div className="text-[10px] md:text-[11px] tracking-[0.15em] text-accent-light mb-6 font-medium">
                {t("hero.label")}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="text-white font-serif font-normal leading-[1.05]"
                style={{ fontSize: "clamp(44px, 7vw, 80px)" }}
              >
                {t("hero.h1_1")}
                <br />
                <span className="text-accent-light italic">{t("hero.h1_2")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-white/85 text-base md:text-lg max-w-xl leading-relaxed">
                {t("hero.tagline")}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white px-7 py-3.5 rounded-md text-sm font-medium hover:bg-accent-light transition-colors"
                >
                  {t("hero.primary")}
                </a>
                <a href="#services" className="text-white text-sm hover:text-accent-light transition-colors">
                  {t("hero.secondary")}
                </a>
              </div>
            </Reveal>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
            <ChevronDown size={22} />
          </div>
        </section>

        {/* WHAT I DO */}
        <section id="what_i_do" className="relative z-20 text-white py-20 px-6">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {whatItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="font-serif text-accent-light text-sm">{String(i + 1).padStart(2, "0")}</div>
                <div className="h-[2px] w-8 bg-accent my-3" />
                <p className="text-sm md:text-base text-white leading-relaxed">{item}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 px-6 bg-bg">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="label-eyebrow mb-3">{t("services.label")}</div>
            <h2 className="text-4xl md:text-5xl mb-16 text-text">{t("services.title")}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <article className="bg-card border-hair border-border rounded-lg p-8 h-full hover:border-accent transition-colors">
                  <div className="label-eyebrow">{String(i + 1).padStart(2, "0")}</div>
                  <div className="h-[2px] w-8 bg-accent my-4" />
                  <h3 className="font-serif text-2xl mb-2 text-text">{c.title}</h3>
                  <div className="label-eyebrow mb-5">{c.subtitle}</div>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">{c.description}</p>
                  <div className="border-t-hair border-border pt-5 space-y-2 mb-6">
                    {c.includes.map((inc: string) => (
                      <div key={inc} className="flex items-start gap-2 text-[13px] text-text">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-hair border-border pt-4">
                    <div className="label-eyebrow mb-1">{t("services.outcomeLabel")}</div>
                    <p className="text-sm italic text-text-muted">{c.outcome}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-20 bg-dark text-bg py-12 px-6 -mx-6">
          <div className="mx-auto max-w-7xl">
            <div className="label-eyebrow text-accent-light mb-6">{t("services.whenLabel")}</div>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {whenItems.map((w, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-bg">
                  <ArrowRight size={14} className="text-accent-light" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRENGTHS */}
      <section id="strengths" style={{ background: "#F5F7F4", padding: "100px 0" }}>
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#2E6B4F",
                marginBottom: 56,
              }}
            >
              {t("strengths.label")}
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-4">
              {strengthsLeft.map((s, i) => (
                <Reveal key={s} delay={i * 0.06}>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      color: "#1A1A18",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "#2E6B4F", marginRight: 12 }}>✦</span>
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="space-y-4">
              {strengthsRight.map((s, i) => (
                <Reveal key={s} delay={(i + strengthsLeft.length) * 0.06}>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      color: "#1A1A18",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "#2E6B4F", marginRight: 12 }}>✦</span>
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 md:py-32 px-6 bg-bg">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="label-eyebrow mb-3">{t("experience.label")}</div>
            <h2 className="text-4xl md:text-5xl mb-10 text-text">{t("experience.title")}</h2>
          </Reveal>
          <Reveal>
            <div
              id="experience-lead"
              style={{ maxWidth: 760, margin: "0 auto 64px auto", textAlign: "center" }}
            >
              <div
                style={{
                  width: 48,
                  height: 1,
                  background: "#2E6B4F",
                  margin: "0 auto 32px auto",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  lineHeight: 1.85,
                  color: "#4A4A42",
                  fontStyle: "italic",
                }}
              >
                {t("experience.lead")}
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-10 relative">
              <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-border" />
              {companies.map((co, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="pl-8 relative">
                    <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-accent" />
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#2E6B4F",
                        fontWeight: 600,
                      }}
                    >
                      {co.name}
                    </div>
                    <div className="text-xs text-text-muted mt-1 mb-3">{co.period}</div>
                    <ul className="space-y-1 text-[13px] text-text-muted">
                      {co.roles.map((r: string) => <li key={r}>{r}</li>)}
                    </ul>
                    {co.highlights?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {co.highlights.map((h: string) => (
                          <span key={h} className="text-[11px] bg-accent/10 text-accent px-2.5 py-1 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="md:col-span-3">
              <Reveal>
                <div className="label-eyebrow mb-5">{t("experience.expertiseLabel")}</div>
                <div className="flex flex-wrap gap-3">
                  {expertise.map((e) => (
                    <span
                      key={e}
                      className="border-hair border-accent text-accent px-4 py-2 rounded-full text-sm hover:bg-accent hover:text-white transition-colors cursor-default"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTOR */}
      <section id="investment" className="bg-dark text-bg py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="label-eyebrow text-accent-light mb-3">{t("investment.label")}</div>
            <h2 className="text-4xl md:text-5xl mb-16 text-bg font-serif">{t("investor.section.title")}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {investorCards.map((inv, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article
                  className="h-full transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E8E8E4",
                    borderRadius: 4,
                    padding: "40px 36px",
                  }}
                >
                  <span
                    className="inline-block"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      padding: "4px 10px",
                      background: inv.active ? "#2E6B4F" : "#E8E8E4",
                      color: inv.active ? "#FFFFFF" : "#4A4A42",
                    }}
                  >
                    {inv.tag}
                  </span>
                  <h3
                    className="font-serif"
                    style={{ fontSize: 22, color: "#1A1A18", marginTop: 16 }}
                  >
                    {inv.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "#2E6B4F",
                      marginBottom: 12,
                    }}
                  >
                    {inv.role}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "#4A4A42",
                    }}
                  >
                    {inv.description}
                  </p>
                  {inv.linkHref && (
                    <a
                      href={inv.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 16,
                        fontFamily: "var(--font-sans)",
                        fontSize: 12,
                        color: "#2E6B4F",
                        textDecoration: "underline",
                      }}
                    >
                      {inv.linkText}
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-bg">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="label-eyebrow mb-3">{t("faq.label")}</div>
            <h2 className="text-4xl md:text-5xl mb-12 text-text">{t("faq.title")}</h2>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b-hair border-border">
                  <AccordionTrigger className="text-left text-base font-medium py-6 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-muted text-sm leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-bg">
        <div className="mx-auto max-w-7xl grid md:grid-cols-5 gap-12">
          <Reveal className="md:col-span-2">
            <div className="label-eyebrow mb-3">{t("contact.label")}</div>
            <h2 className="font-serif text-4xl md:text-[42px] leading-tight mb-6 text-text">
              {t("contact.title")}
            </h2>
            <p className="text-text-muted mb-8">{t("contact.body")}</p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-accent text-white text-center py-3.5 rounded-md text-sm font-medium hover:bg-accent-light transition-colors"
            >
              {t("contact.bookCta")}
            </a>
            <div className="my-8 flex items-center gap-4 text-xs text-text-muted">
              <div className="flex-1 h-[0.5px] bg-border" />
              <span>{t("contact.or")}</span>
              <div className="flex-1 h-[0.5px] bg-border" />
            </div>
            <ul className="text-sm space-y-2 text-text-muted">
              <li><a href="mailto:contact@desarcourbin.com" className="hover:text-accent">contact@desarcourbin.com</a></li>
              <li><a href="https://linkedin.com/in/justinedesardurats" target="_blank" rel="noopener noreferrer" className="hover:text-accent">linkedin.com/in/justinedesardurats</a></li>
              <li><a href="tel:+34606846541" className="hover:text-accent">+34 606 846 541</a></li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
