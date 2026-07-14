"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { audienceSolutionLinks } from "@/lib/audience-routes";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const locale = useLocale();
  const currentLocale = locale === "en" ? "en" : "fr";
  const t = useTranslations("footer");

  const labels =
    currentLocale === "fr"
      ? {
          home: "Accueil",
          faq: "FAQ",
          beta: "Accès bêta",
          privacy: "Confidentialité",
          terms: "Conditions",
        }
      : {
          home: "Home",
          faq: "FAQ",
          beta: "Beta access",
          privacy: "Privacy policy",
          terms: "Terms",
        };

  const links = [
    { label: labels.home, href: `/${currentLocale}` },
    ...audienceSolutionLinks[currentLocale],
    { label: labels.faq, href: `/${currentLocale}#faq` },
    { label: labels.beta, href: `/${currentLocale}#cta` },
    { label: labels.privacy, href: `/${currentLocale}/confidentialite` },
    { label: labels.terms, href: `/${currentLocale}/conditions` },
  ];

  return (
    <footer ref={ref} className="border-t border-white/[0.06] bg-ink">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[0.8fr_1.4fr_0.8fr] md:items-start"
      >
        <motion.a
          href={`/${currentLocale}`}
          initial={{ opacity: 0, x: -18 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="text-xl font-semibold tracking-tight text-white/80"
        >
          el<span className="text-teal">i</span>ntys
        </motion.a>

        <motion.nav
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="flex flex-wrap gap-x-6 gap-y-3 md:justify-center"
        >
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="text-sm text-white/35 transition-colors hover:text-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          className="flex flex-col gap-1 md:items-end md:text-right"
        >
          <a
            href="mailto:contact@elintys.com"
            className="text-sm text-white/35 transition-colors hover:text-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            contact@elintys.com
          </a>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Elintys. {t("rights")}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
