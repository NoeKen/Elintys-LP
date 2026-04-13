"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navbar");
  const links = t.raw("links") as Array<{ label: string; href: string }>;

  function getLocalizedHref(href: string) {
    if (href.startsWith("#")) {
      return `/${locale}${href}`;
    }

    if (href.startsWith("/")) {
      return `/${locale}${href}`;
    }

    return href;
  }

  function getLocaleSwitchHref(targetLocale: "fr" | "en") {
    if (!pathname) {
      return `/${targetLocale}`;
    }

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      return `/${targetLocale}`;
    }

    if (segments[0] === "fr" || segments[0] === "en") {
      segments[0] = targetLocale;
      return `/${segments.join("/")}`;
    }

    return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-border bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* <motion.a
          href="#"
          initial={{ opacity: 0, x: -18 }}
          whileHover={{ y: -2, scale: 1.02 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="text-xl font-semibold tracking-tight text-ink"
        >
          el<span className="text-teal">i</span>ntys
        </motion.a> */}
        <motion.a
          href={`/${locale}`}
          initial={{ opacity: 0, x: -18 }}
          whileHover={{ y: -2, scale: 1.03 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <Image
            src="/images/elintys_logo.webp"
            alt="Elintys logo"
            width={90}
            height={40}
            className="h-7 w-auto object-contain"
            loading="eager"
          />
        </motion.a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={getLocalizedHref(l.href)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="text-sm text-brand-mid transition-colors hover:text-ink"
            >
              {l.label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-xl border border-brand-border bg-white/80 p-1 md:flex">
            {(["fr", "en"] as const).map((option) => (
              <Link
                key={option}
                href={getLocaleSwitchHref(option)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  locale === option ? "bg-ink text-white" : "text-brand-mid",
                )}
                aria-label={`${t("languageLabel")}: ${option.toUpperCase()}`}
              >
                {option.toUpperCase()}
              </Link>
            ))}
          </div>

          <motion.a
            href={`/${locale}#cta`}
            whileHover={{ y: -2, scale: 1.03 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="hidden items-center gap-1.5 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-mid md:flex"
          >
            {t("cta")}
            <motion.span
              whileHover={{ x: 2, y: -2 }}
              className="inline-block rotate-45"
            >
              ↗
            </motion.span>
          </motion.a>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={getLocaleSwitchHref(locale === "fr" ? "en" : "fr")}
              className="rounded-xl border border-brand-border bg-white/80 px-3 py-2 text-xs font-medium text-brand-mid"
              aria-label={t("languageLabel")}
            >
              {locale.toUpperCase()}
            </Link>
            <motion.a
              href={`/${locale}#cta`}
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex items-center gap-1 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
            >
              {t("cta")}
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
}
