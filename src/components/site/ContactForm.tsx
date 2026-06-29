import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { submitContact } from "@/lib/contact.functions";

const CALENDLY = "https://calendly.com/justine-desar/30min";

const inputCls =
  "w-full border-hair border-border bg-card rounded-md px-3 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors";
const labelCls = "block text-xs font-medium text-text mb-1.5";

// ─── Modal ───────────────────────────────────────────────────────────────────

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
  headline: string;
  items?: string[];
}

function FeedbackModal({ open, onClose, type, headline, items }: FeedbackModalProps) {
  if (!open) return null;

  const isError = type === "error";
  const color = isError ? "#DC2626" : "#2E6B4F";

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-bg rounded-lg p-8 max-w-md w-full shadow-2xl"
        style={{ border: `2px solid ${color}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            style={{ color, fontSize: 22, lineHeight: 1, flexShrink: 0, fontWeight: 700 }}
          >
            {isError ? "!" : "✓"}
          </span>
          <div className="flex-1">
            <p className="text-sm text-text leading-relaxed">{headline}</p>
            {items && items.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                    <span style={{ color }}>–</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: color }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

// ─── Form ────────────────────────────────────────────────────────────────────

export function ContactForm() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [missionTypes, setMissionTypes] = useState<string[]>([]);
  const [modal, setModal] = useState<{
    open: boolean;
    type: "success" | "error";
    headline: string;
    items?: string[];
  }>({ open: false, type: "success", headline: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const f = t("contact.form", { returnObjects: true }) as any;

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const validate = (fd: FormData): string[] => {
    const errors: string[] = [];
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRe = /^https?:\/\/.+/;

    if (!String(fd.get("full_name") || "").trim()) errors.push(f.fullName);
    const email = String(fd.get("email") || "").trim();
    if (!email || !emailRe.test(email)) errors.push(f.email);
    const linkedin = String(fd.get("linkedin_url") || "").trim();
    if (!linkedin || !urlRe.test(linkedin)) errors.push(f.linkedin);
    const company = String(fd.get("company") || "").trim();
    if (!company || !urlRe.test(company)) errors.push(f.company);
    if (!String(fd.get("start_date") || "").trim()) errors.push(f.startDate);
    if (!String(fd.get("context") || "").trim()) errors.push(f.context);

    return errors;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current!;
    const fd = new FormData(form);

    const errors = validate(fd);
    if (errors.length > 0) {
      setModal({ open: true, type: "error", headline: f.validationTitle, items: errors });
      return;
    }

    setLoading(true);
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      linkedin_url: String(fd.get("linkedin_url") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      funding_stage: String(fd.get("funding_stage") || "") || null,
      team_size: String(fd.get("team_size") || "") || null,
      sector: String(fd.get("sector") || "") || null,
      target_market: String(fd.get("target_market") || "") || null,
      mission_type: missionTypes,
      engagement: String(fd.get("engagement") || "") || null,
      duration: String(fd.get("duration") || "") || null,
      start_date: String(fd.get("start_date") || "") || null,
      budget: String(fd.get("budget") || "") || null,
      context: String(fd.get("context") || "").trim(),
      objective: String(fd.get("objective") || "") || null,
      success_criteria: String(fd.get("success_criteria") || "") || null,
      language: (i18n.language?.slice(0, 2) || "en") as "en" | "fr" | "es",
    };

    try {
      await submitContact(payload);
      form.reset();
      setMissionTypes([]);
      setModal({ open: true, type: "success", headline: f.successMsg });
    } catch (err) {
      console.error(err);
      setModal({ open: true, type: "error", headline: f.error });
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
    <>
      <FeedbackModal
        open={modal.open}
        onClose={closeModal}
        type={modal.type}
        headline={modal.headline}
        items={modal.items}
      />

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="bg-card border-hair border-border rounded-lg p-6 md:p-8 space-y-8"
      >
        <Block title={f.block1}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{f.fullName} *</label>
              <input name="full_name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{f.email} *</label>
              <input name="email" type="email" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{f.linkedin} *</label>
              <input name="linkedin_url" type="url" placeholder="https://linkedin.com/in/…" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{f.company} *</label>
              <input name="company" type="url" placeholder="https://..." className={inputCls} />
            </div>
          </div>
        </Block>

        <Block title={f.block2}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{f.fundingStage}</label>
              <select name="funding_stage" className={inputCls}>
                <option value="">—</option>
                {f.fundingStages.map((o: string) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{f.teamSize}</label>
              <select name="team_size" className={inputCls}>
                <option value="">—</option>
                {f.teamSizes.map((o: string) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{f.sector}</label>
              <input name="sector" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{f.targetMarket}</label>
              <input name="target_market" className={inputCls} />
            </div>
          </div>
        </Block>

        <Block title={f.block3}>
          <div>
            <label className={labelCls}>{f.missionType}</label>
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
              <label className={labelCls}>{f.engagement}</label>
              <select name="engagement" className={inputCls}>
                <option value="">—</option>
                {f.engagements.map((o: string) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{f.duration}</label>
              <select name="duration" className={inputCls}>
                <option value="">—</option>
                {f.durations.map((o: string) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{f.startDate} *</label>
              <select name="start_date" className={inputCls}>
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
            <textarea name="context" rows={4} className={inputCls} />
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
          {t("contact.or")}{" "}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            {t("contact.bookCta")}
          </a>
        </p>
      </form>
    </>
  );
}
