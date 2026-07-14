"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { audienceRouteMap, audienceSolutionLinks } from "@/lib/audience-routes";
import { cn } from "@/lib/utils";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 10h9m-3.5-3.5L14 10l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
      ) : (
        <path d="M5 7h14M5 12h14M5 17h14" strokeLinecap="round" />
      )}
    </svg>
  );
}

const equivalentRoutes: Record<string, string> = {
  [audienceRouteMap.events.fr]: audienceRouteMap.events.en,
  [audienceRouteMap.events.en]: audienceRouteMap.events.fr,
  [audienceRouteMap.providers.fr]: audienceRouteMap.providers.en,
  [audienceRouteMap.providers.en]: audienceRouteMap.providers.fr,
  [audienceRouteMap.venues.fr]: audienceRouteMap.venues.en,
  [audienceRouteMap.venues.en]: audienceRouteMap.venues.fr,
};

const transparentUntilScrollRoutes = new Set<string>([
  audienceRouteMap.venues.fr,
  audienceRouteMap.venues.en,
]);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const currentLocale = locale === "en" ? "en" : "fr";
  const isTransparentHeroRoute = pathname ? transparentUntilScrollRoutes.has(pathname) : false;
  const t = useTranslations("navbar");
  const solutionLinks = audienceSolutionLinks[currentLocale];

  const labels = {
    home: currentLocale === "fr" ? "Accueil" : "Home",
  };

  function getLocaleSwitchHref(targetLocale: "fr" | "en") {
    if (!pathname) {
      return `/${targetLocale}`;
    }

    if (targetLocale === currentLocale) {
      return pathname;
    }

    const equivalent = equivalentRoutes[pathname];

    if (equivalent) {
      return equivalent;
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

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = `/${currentLocale}`;
  const betaHref = `/${currentLocale}#cta`;
  const targetLocale = currentLocale === "fr" ? "en" : "fr";

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-border bg-white/90 shadow-sm backdrop-blur-md"
          : isTransparentHeroRoute
            ? "bg-transparent"
            : "bg-white/70 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <motion.a
          href={homeHref}
          initial={{ opacity: 0, x: -18 }}
          whileHover={{ y: -2, scale: 1.03 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          onClick={() => setMobileOpen(false)}
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

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href={homeHref}
            className="text-sm font-medium text-brand-mid transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            {labels.home}
          </Link>

          {solutionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-mid transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center rounded-xl border border-brand-border bg-white/80 p-1">
            {(["fr", "en"] as const).map((option) => (
              <Link
                key={option}
                href={getLocaleSwitchHref(option)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                  currentLocale === option ? "bg-ink text-white" : "text-brand-mid"
                )}
                aria-label={`${t("languageLabel")}: ${option.toUpperCase()}`}
              >
                {option.toUpperCase()}
              </Link>
            ))}
          </div>

          <motion.a
            href={betaHref}
            whileHover={{ y: -2, scale: 1.03 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            {t("cta")}
            <ArrowIcon />
          </motion.a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={getLocaleSwitchHref(targetLocale)}
            className="rounded-xl border border-brand-border bg-white/80 px-3 py-2 text-xs font-medium text-brand-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            aria-label={t("languageLabel")}
          >
            {targetLocale.toUpperCase()}
          </Link>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-public-menu"
            aria-label={mobileOpen ? t("mobileClose") : t("mobileMenu")}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border bg-white/85 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-public-menu" className="border-t border-brand-border bg-white px-6 py-4 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-2">
            <Link
              href={homeHref}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {labels.home}
            </Link>
            {solutionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-brand-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={betaHref}
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {t("cta")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
