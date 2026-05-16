import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo_desar_courbin.svg";

const LANGS = ["en", "fr", "es"] as const;
const CALENDLY = "https://calendly.com/justine-desar/30min";

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = [
    { href: "/#services", label: t("nav.services") },
    { href: "/#experience", label: t("nav.experience") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-bg/95 backdrop-blur border-b-hair border-border transition-all ${
        scrolled ? "shadow-[0_1px_0_0_var(--border)]" : ""
      }`}
      style={{ height: 64 }}
    >
      <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Desar Courbin home">
          <img src={logo} alt="Desar Courbin" className="h-11 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-text hover:text-accent transition-colors">
            {t("nav.home")}
          </Link>
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-sm text-text hover:text-accent transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs">
            {LANGS.map((l, i) => (
              <button
                key={l}
                onClick={() => i18n.changeLanguage(l)}
                className={`uppercase tracking-wider transition-colors ${
                  i18n.language?.startsWith(l)
                    ? "text-accent font-semibold"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {l}
                {i < LANGS.length - 1 && <span className="ml-2 text-border">|</span>}
              </button>
            ))}
          </div>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white text-sm px-5 py-2.5 rounded-md hover:bg-accent-light transition-colors"
          >
            {t("nav.book")}
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-bg z-40 px-6 py-8 flex flex-col gap-6 border-t-hair border-border">
          <Link to="/" className="text-lg" onClick={() => setOpen(false)}>
            {t("nav.home")}
          </Link>
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-lg"
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
          <div className="flex gap-4 pt-4 border-t-hair border-border">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => i18n.changeLanguage(l)}
                className={`uppercase text-sm ${
                  i18n.language?.startsWith(l) ? "text-accent font-semibold" : "text-text-muted"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white text-center py-3 rounded-md mt-4"
          >
            {t("nav.book")}
          </a>
        </div>
      )}
    </header>
  );
}
