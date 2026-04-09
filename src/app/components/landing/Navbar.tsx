"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { locale, messages } = useI18n();
  const copy = messages.navbar;

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
          href="#"
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
          {copy.links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
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
                href={`/${option}`}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  locale === option ? "bg-ink text-white" : "text-brand-mid",
                )}
                aria-label={`${copy.languageLabel}: ${option.toUpperCase()}`}
              >
                {option.toUpperCase()}
              </Link>
            ))}
          </div>

          <motion.a
            href="#cta"
            whileHover={{ y: -2, scale: 1.03 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="hidden items-center gap-1.5 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-mid md:flex"
          >
            {copy.cta}
            <motion.span
              whileHover={{ x: 2, y: -2 }}
              className="inline-block rotate-45"
            >
              ↗
            </motion.span>
          </motion.a>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={locale === "fr" ? "/en" : "/fr"}
              className="rounded-xl border border-brand-border bg-white/80 px-3 py-2 text-xs font-medium text-brand-mid"
              aria-label={copy.languageLabel}
            >
              {locale.toUpperCase()}
            </Link>
            <motion.a
              href="#cta"
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex items-center gap-1 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
            >
              {copy.cta}
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
}
