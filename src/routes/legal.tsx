import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/legal")({
  component: Legal,
  head: () => ({
    meta: [{ title: "Legal · Desar Courbin" }, { name: "robots", content: "noindex" }],
  }),
});

function Legal() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6 bg-bg min-h-screen">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-10 text-text">{t("legal.title")}</h1>
        <pre className="whitespace-pre-wrap font-sans text-sm text-text-muted leading-relaxed">
          {t("legal.body")}
        </pre>
      </div>
    </section>
  );
}
