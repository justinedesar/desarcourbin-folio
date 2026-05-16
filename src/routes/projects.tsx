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

const MENTORING = [
  { name: "eWorks / ESADE", url: "https://www.esade.edu/en/learning-innovation/rambla/eworks" },
  { name: "EDHEC Business School", url: "https://www.edhec.edu/en/news/edhec-entrepreneurs-incubator-accelerator" },
  { name: "AticcoLab", url: "https://aticcolab.com/" },
  { name: "Junior Achievement España", url: "https://fundacionjaes.org/programas-educativos/educacion-emprendedora/startup-programme/" },
  { name: "Start-up Turbo (ESADE)", url: "https://www.e3esade.com/startupturbo" },
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
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="font-serif text-3xl mb-4 text-text">{t("projects.mentoring.title")}</h2>
            <p className="text-text-muted leading-relaxed">{t("projects.mentoring.description")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {MENTORING.map((m) => (
                <a
                  key={m.name}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-hair border-border bg-card rounded-lg p-5 flex items-center justify-center text-center text-sm text-text-muted hover:border-accent hover:text-accent transition-colors min-h-[80px]"
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
      {projects && projects.length > 0 && (
        <section className="py-24 px-6 bg-bg">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="label-eyebrow mb-3">{t("projects.activeLabel")}</div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <article className="bg-card border-hair border-border rounded-lg overflow-hidden hover:border-accent transition-colors h-full">
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
