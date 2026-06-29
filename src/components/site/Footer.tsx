import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import logo from "@/assets/logo Desar Courbin_horizontal_v.png";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark text-bg">
      <div className="mx-auto max-w-7xl px-6 py-8 grid md:grid-cols-3 gap-12">
        <div>
          <img
            src={logo}
            alt="Desar Courbin"
            className="h-[60px] w-auto mb-6"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-sm text-bg/70 leading-relaxed">
            Justine Desardurats
            <br />
            {t("footer.role")}
            <br />
            {t("footer.location")}
          </p>
        </div>
        <div>
          <div className="label-eyebrow mb-4" style={{ color: "rgba(245,247,244,0.7)" }}>{t("footer.quickLinks")}</div>
          <ul className="space-y-2 text-sm">
            <li><a href={`${BASE}/#services`} className="hover:text-accent-light">{t("nav.services")}</a></li>
            <li><a href={`${BASE}/#experience`} className="hover:text-accent-light">{t("nav.experience")}</a></li>
            <li><Link to="/projects" className="hover:text-accent-light">{t("nav.projects")}</Link></li>
            <li><a href={`${BASE}/#contact`} className="hover:text-accent-light">{t("nav.contact")}</a></li>
          </ul>
        </div>
        <div>
          <div className="label-eyebrow mb-4" style={{ color: "rgba(245,247,244,0.7)" }}>{t("footer.contactInfo")}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:justine.desar@gmail.com" className="hover:text-accent-light">
                justine.desar@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+34606846541" className="hover:text-accent-light">+34 606 846 541</a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/justinedesardurats"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-accent-light"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-hair border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-3 flex flex-col md:flex-row justify-between gap-3 text-xs text-bg/60">
          <span>{t("footer.rights")}</span>
          <Link to="/legal" className="hover:text-accent-light">
            {t("footer.legal")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
