import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo Desar Courbin_horizontal_v.png";

const LANGS = ["en", "fr", "es"] as const;
const CALENDLY = "https://calendly.com/justine-desar/30min";
const BASE = import.meta.env.BASE_URL.replace(/\/$/, ""); // e.g. "" or "/desarcourbin-folio"

export function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = [
    { href: `${BASE}/#services`, label: t("nav.services"), type: "anchor" as const },
    { href: `${BASE}/#experience`, label: t("nav.experience"), type: "anchor" as const },
    { href: "/projects", label: t("nav.projects"), type: "route" as const },
    { href: "/about", label: t("nav.about"), type: "route" as const },
    { href: `${BASE}/#contact`, label: t("nav.contact"), type: "anchor" as const },
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
          <img src={logo} alt="Desar Courbin" className="h-[66px] w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-text hover:text-accent transition-colors">
            {t("nav.home")}
          </Link>
          {sections.map((s) =>
            s.type === "route" ? (
              <Link
                key={s.href}
                to={s.href}
                className="text-sm text-text hover:text-accent transition-colors"
              >
                {s.label}
              </Link>
            ) : (
              <a
                key={s.href}
                href={s.href}
                className="text-sm text-text hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            )
          )}
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
            href={`${import.meta.env.BASE_URL}CV_Justine_Desardurats_June_2026.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent border border-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-colors"
          >
            CV
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white text-sm px-5 py-2.5 rounded-md hover:bg-accent-light transition-colors"
          >
            {t("nav.book")}
          </a>
        </div>

        {/* Mobile: sélecteur langue compact + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-accent font-semibold px-2 py-1"
            >
              {i18n.language?.slice(0, 2).toUpperCase()}
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-bg border border-border rounded-md shadow-md overflow-hidden z-[200]">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => { i18n.changeLanguage(l); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${
                      i18n.language?.startsWith(l)
                        ? "text-accent font-semibold bg-accent/5"
                        : "text-text-muted hover:text-text hover:bg-border/20"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden fixed px-6 py-6 flex flex-col"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            height: "calc(100dvh - 64px)",
            background: "#2A3D35",
            zIndex: 100,
            overflowY: "auto",
          }}
        >
          <nav className="flex flex-col divide-y divide-white/10">
            <Link to="/" className="text-base py-4 text-white/90 hover:text-accent-light transition-colors" onClick={() => setOpen(false)}>
              {t("nav.home")}
            </Link>
            {sections.map((s) =>
              s.type === "route" ? (
                <Link
                  key={s.href}
                  to={s.href}
                  className="text-base py-4 text-white/90 hover:text-accent-light transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </Link>
              ) : (
                <a
                  key={s.href}
                  href={s.href}
                  className="text-base py-4 text-white/90 hover:text-accent-light transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </a>
              )
            )}
          </nav>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-light text-dark text-center py-3 rounded-md mt-6 text-sm font-medium"
          >
            {t("nav.book")}
          </a>
        </div>
      )}
    </header>
  );
}
