import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { toast } from "sonner";

const CALENDLY = "https://calendly.com/justine-desar/30min";

const inputCls =
  "w-full border-hair border-border bg-card rounded-md px-3 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors";
const labelCls = "block text-xs font-medium text-text mb-1.5";

export function ContactForm() {
  const { t, i18n } = useTranslation();
  const submit = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);
  const [missionTypes, setMissionTypes] = useState<string[]>([]);

  const f = t("contact.form", { returnObjects: true }) as any;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      full_name: String(fd.get("full_name") || ""),
      email: String(fd.get("email") || ""),
      linkedin_url: String(fd.get("linkedin_url") || ""),
      company: String(fd.get("company") || ""),
      funding_stage: String(fd.get("funding_stage") || "") || null,
      team_size: String(fd.get("team_size") || "") || null,
      sector: String(fd.get("sector") || "") || null,
      target_market: String(fd.get("target_market") || "") || null,
      mission_type: missionTypes,
      engagement: String(fd.get("engagement") || "") || null,
      duration: String(fd.get("duration") || "") || null,
      start_date: String(fd.get("start_date") || "") || null,
      budget: String(fd.get("budget") || "") || null,
      context: String(fd.get("context") || ""),
      objective: String(fd.get("objective") || "") || null,
      success_criteria: String(fd.get("success_criteria") || "") || null,
      language: (i18n.language?.slice(0, 2) || "en") as "en" | "fr" | "es",
    };
    try {
      await submit({ data: payload });
      toast.success(f.successMsg);
      form.reset();
      setMissionTypes([]);
    } catch (err) {
      console.error(err);
      toast.error(f.error);
    } finally {
      setLoading(false);
    }
  };

  const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <div className="label-eyebrow">{title}</div>
      {children}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="bg-card border-hair border-border rounded-lg p-6 md:p-8 space-y-8">
      <Block title={f.block1}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{f.fullName} *</label>
            <input name="full_name" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{f.email} *</label>
            <input name="email" type="email" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{f.linkedin} *</label>
            <input name="linkedin_url" type="url" required placeholder="https://linkedin.com/in/…" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{f.company} *</label>
            <input name="company" required className={inputCls} />
          </div>
        </div>
      </Block>

      <Block title={f.block2}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{f.fundingStage} *</label>
            <select name="funding_stage" required className={inputCls}>
              <option value="">—</option>
              {f.fundingStages.map((o: string) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>{f.teamSize} *</label>
            <select name="team_size" required className={inputCls}>
              <option value="">—</option>
              {f.teamSizes.map((o: string) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>{f.sector} *</label>
            <input name="sector" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{f.targetMarket} *</label>
            <input name="target_market" required className={inputCls} />
          </div>
        </div>
      </Block>

      <Block title={f.block3}>
        <div>
          <label className={labelCls}>{f.missionType} *</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {f.missionTypes.map((m: string) => {
              const active = missionTypes.includes(m);
              return (
                <button
                  type="button"
                  key={m}
                  onClick={() =>
                    setMissionTypes((prev) =>
                      prev.includes(m) ? prev.filter((p) => p !== m) : [...prev, m]
                    )
                  }
                  className={`text-xs px-3 py-2 rounded-md border-hair transition-colors ${
                    active
                      ? "bg-accent text-white border-accent"
                      : "bg-card border-border text-text hover:border-accent"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{f.engagement} *</label>
            <select name="engagement" required className={inputCls}>
              <option value="">—</option>
              {f.engagements.map((o: string) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>{f.duration} *</label>
            <select name="duration" required className={inputCls}>
              <option value="">—</option>
              {f.durations.map((o: string) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>{f.startDate} *</label>
            <select name="start_date" required className={inputCls}>
              <option value="">—</option>
              {f.startDates.map((o: string) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>{f.budget}</label>
            <input name="budget" className={inputCls} />
          </div>
        </div>
      </Block>

      <Block title={f.block4}>
        <div>
          <label className={labelCls}>{f.context} *</label>
          <textarea name="context" required rows={4} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{f.objective}</label>
          <textarea name="objective" rows={3} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{f.successField}</label>
          <textarea name="success_criteria" rows={3} className={inputCls} />
        </div>
      </Block>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-white py-3.5 rounded-md text-sm font-medium hover:bg-accent-light transition-colors disabled:opacity-60"
      >
        {loading ? f.sending : f.submit}
      </button>

      <p className="text-xs text-text-muted text-center">
        {t("contact.or")} <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-accent underline">{t("contact.bookCta")}</a>
      </p>
    </form>
  );
}
