import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/site/Reveal";
import portrait from "@/assets/justine_portrait.jpg";

const CALENDLY = "https://calendly.com/justine-desar/30min";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Justine Desardurats · Desar Courbin" },
      {
        name: "description",
        content:
          "Twenty years in B2B SaaS — from CEGID to a decade at SAP across EMEA, now a Fractional VP Sales, Operating Partner and Investor based in Barcelona.",
      },
      { property: "og:title", content: "About Justine Desardurats · Desar Courbin" },
      {
        property: "og:description",
        content: "Fractional VP Sales, Operating Partner and Investor based in Barcelona.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  const { t } = useTranslation();
  const bio = t("about.bio", { returnObjects: true }) as string[];

  return (
    <>
      {/* HERO */}
      <section id="about-hero" className="bg-bg" style={{ padding: "120px 0 80px 0" }}>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-5 gap-12">
          <Reveal className="md:col-span-2">
            <div
              className="overflow-hidden"
              style={{
                borderLeft: "3px solid #2E6B4F",
                minHeight: 520,
              }}
            >
              <img
                src={portrait}
                alt="Justine Desardurats portrait"
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(100%)",
                  objectPosition: "top center",
                  minHeight: 520,
                }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3 flex flex-col justify-center">
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#2E6B4F",
                marginBottom: 24,
              }}
            >
              {t("about.label")}
            </div>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(36px,5vw,48px)",
                color: "#1A1A18",
                marginBottom: 8,
                lineHeight: 1.05,
              }}
            >
              {t("about.name")}
            </h1>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 18,
                color: "#2E6B4F",
                fontStyle: "italic",
                marginBottom: 40,
              }}
            >
              {t("about.subtitle")}
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                lineHeight: 1.9,
                color: "#4A4A42",
              }}
            >
              {t("about.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* BIOGRAPHY */}
      <section id="about-bio" style={{ background: "#F5F7F4", padding: "100px 0" }}>
        <div className="mx-auto px-6" style={{ maxWidth: 720 }}>
          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#2E6B4F",
                marginBottom: 48,
              }}
            >
              {t("about.bioLabel")}
            </div>
          </Reveal>

          {bio.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <p
                className="font-serif"
                style={{
                  fontSize: 17,
                  lineHeight: 1.95,
                  color: "#1A1A18",
                  marginBottom: 32,
                }}
              >
                {i === 0 ? (
                  <>
                    <span
                      className="font-serif"
                      style={{
                        fontSize: 72,
                        float: "left",
                        lineHeight: 0.8,
                        marginRight: 8,
                        color: "#2E6B4F",
                      }}
                    >
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </>
                ) : (
                  p
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="about-cta"
        style={{ background: "#2E6B4F", padding: "80px 0", textAlign: "center" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(28px,4vw,36px)",
                color: "#FAFAF8",
                marginBottom: 12,
              }}
            >
              {t("about.cta.title")}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                color: "rgba(250,250,248,0.75)",
                marginBottom: 40,
              }}
            >
              {t("about.cta.sub")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#FAFAF8",
                  color: "#2E6B4F",
                  borderRadius: 2,
                  padding: "14px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {t("about.cta.primary")}
              </a>
              <a
                href="/#services"
                style={{
                  border: "1px solid rgba(250,250,248,0.5)",
                  color: "#FAFAF8",
                  borderRadius: 2,
                  padding: "14px 28px",
                  fontSize: 14,
                }}
              >
                {t("about.cta.secondary")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
