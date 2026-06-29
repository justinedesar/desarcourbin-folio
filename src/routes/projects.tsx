import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects & Engagements · Desar Courbin" },
      { name: "description", content: "Mentoring, investment collective and active engagements by Justine Desardurats." },
      { property: "og:title", content: "Projects & Engagements · Desar Courbin" },
      { property: "og:description", content: "Beyond advisory — mentoring, Hervest Club and active projects." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
});

function getGridCols(n: number): number {
  if (n <= 3) return Math.max(n, 1);
  if (n % 3 === 0) return 3;
  if (n % 2 === 0) return 2;
  return 3; // 5, 7, 11 → 3 cols, last row centered
}

const MENTORING = [
  { name: "eWorks / ESADE", url: "https://www.esade.edu/en/learning-innovation/rambla/eworks" },
  { name: "EDHEC Business School", url: "https://www.edhec.edu/en/news/edhec-entrepreneurs-incubator-accelerator" },
  { name: "AticcoLab", url: "https://aticcolab.com/" },
  { name: "Junior Achievement España", url: "https://fundacionjaes.org/programas-educativos/educacion-emprendedora/startup-programme/" },
  { name: "Start-up Turbo (ESADE)", url: "https://www.e3esade.com/startupturbo" },
  { name: "EWA Grow 2026", url: "https://www.eitfood.eu/open-calls/call-for-empowering-women-in-agrifood-ewa-grow-programme-2026-participants" },
];

function ProjectsPage() {
  const { t } = useTranslation();

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("active", true)
        .order("order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <>
      <section className="pt-24 pb-16 px-6 bg-bg">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="label-eyebrow mb-3">{t("projects.label")}</div>
            <h1 className="font-serif text-5xl md:text-6xl text-text">{t("projects.title")}</h1>
          </Reveal>
        </div>
      </section>

      {/* Mentoring */}
      <section className="py-20 px-6 bg-bg border-t-hair border-border">
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


      {/* Hervest */}
      <section className="bg-dark text-bg py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="label-eyebrow text-accent-light mb-3">{t("projects.hervest.label")}</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{t("projects.hervest.title")}</h2>
            <span className="inline-block border-hair border-accent-light text-accent-light text-xs px-3 py-1.5 rounded-full mb-6">
              {t("projects.hervest.role")}
            </span>
            <div className="text-sm text-bg/70">
              <a href="mailto:dealflow@hervestclub.com" className="hover:text-accent-light">
                dealflow@hervestclub.com
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-bg/80 leading-relaxed">{t("projects.hervest.description")}</p>
          </Reveal>
        </div>
      </section>

      {/* Dynamic projects */}
      {projects && projects.length > 0 && (() => {
        const n = projects.length;
        const cols = getGridCols(n);
        const remainder = n % cols;
        const fullCount = remainder === 0 ? n : n - remainder;
        const gridColClass = cols === 1 ? "" : cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
        const lastCardClass = cols === 2 ? "w-full md:w-[calc(50%-12px)]" : "w-full md:w-[calc(33.333%-16px)]";

        const renderCard = (p: any, i: number) => (
          <article key={p.id} className="bg-card border-hair border-border rounded-lg overflow-hidden hover:border-accent transition-colors h-full">
            {p.image_url && (
              <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <h3 className="font-serif text-xl mb-1 text-text">{p.title}</h3>
              {p.subtitle && <div className="label-eyebrow mb-3">{p.subtitle}</div>}
              {p.description && <p className="text-sm text-text-muted mb-4">{p.description}</p>}
              {p.tags && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                  Visit <ExternalLink size={12} />
                </a>
              )}
            </div>
          </article>
        );

        return (
          <section className="py-24 px-6 bg-bg">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <div className="label-eyebrow mb-3">{t("projects.activeLabel")}</div>
              </Reveal>
              <div className="mt-8 space-y-6">
                {fullCount > 0 && (
                  <div className={`grid gap-6 ${gridColClass}`}>
                    {projects.slice(0, fullCount).map((p, i) => (
                      <Reveal key={p.id} delay={i * 0.08}>
                        {renderCard(p, i)}
                      </Reveal>
                    ))}
                  </div>
                )}
                {remainder > 0 && (
                  <div className="flex justify-center gap-6">
                    {projects.slice(fullCount).map((p, i) => (
                      <div key={p.id} className={lastCardClass}>
                        <Reveal delay={(fullCount + i) * 0.08}>
                          {renderCard(p, fullCount + i)}
                        </Reveal>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}
    </>
  );
}
