"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const t = useTranslations("footer");
  const links = t.raw("links") as Array<{ label: string; href: string }>;

  function getLocalizedHref(href: string) {
    if (href.startsWith("#")) {
      return `/${href}`;
    }

    if (href.startsWith("/")) {
      return href;
    }

    return href;
  }

  return (
    <footer ref={ref} className="border-t border-white/[0.06] bg-ink">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row"
      >
        <motion.a
          href="/"
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
          className="flex flex-wrap justify-center gap-6"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={getLocalizedHref(link.href)}
              className="text-sm text-white/30 transition-colors hover:text-white/60"
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          className="flex flex-col items-end gap-1 text-right"
        >
          <a
            href="mailto:contact@elintys.com"
            className="text-sm text-white/30 transition-colors hover:text-white/60"
          >
            contact@elintys.com
          </a>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Elintys. {t("rights")}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
