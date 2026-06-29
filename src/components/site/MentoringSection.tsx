import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/site/Reveal";

const MENTORING = [
  { name: "eWorks / ESADE", url: "https://www.esade.edu/en/learning-innovation/rambla/eworks" },
  { name: "EDHEC Business School", url: "https://www.edhec.edu/en/news/edhec-entrepreneurs-incubator-accelerator" },
  { name: "AticcoLab", url: "https://aticcolab.com/" },
  { name: "Junior Achievement España", url: "https://fundacionjaes.org/programas-educativos/educacion-emprendedora/startup-programme/" },
  { name: "Start-up Turbo (ESADE)", url: "https://www.e3esade.com/startupturbo" },
  { name: "EWA Grow 2026", url: "https://www.eitfood.eu/open-calls/call-for-empowering-women-in-agrifood-ewa-grow-programme-2026-participants" },
];

interface MentoringSectionProps {
  id?: string;
}

export function MentoringSection({ id }: MentoringSectionProps) {
  const { t } = useTranslation();

  return (
    <section id={id} className="py-20 px-6 bg-bg border-t-hair border-border">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="font-serif text-3xl mb-4 text-text">{t("projects.mentoring.title")}</h2>
          <p className="text-text-muted leading-relaxed max-w-2xl mx-auto">
            {t("projects.mentoring.description")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className="flex flex-wrap justify-center"
            style={{ gap: 32, marginTop: 48 }}
          >
            {MENTORING.map((m) => (
              <a
                key={m.name}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mentoring-link"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#2E6B4F",
                  textDecoration: "none",
                  borderBottom: "1px solid #2E6B4F",
                  paddingBottom: 2,
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#1A1A18";
                  e.currentTarget.style.borderColor = "#1A1A18";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#2E6B4F";
                  e.currentTarget.style.borderColor = "#2E6B4F";
                }}
              >
                {m.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
