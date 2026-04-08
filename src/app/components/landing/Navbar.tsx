"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Fonctionnalités", href: "#solution" },
  { label: "Marché", href: "#marche" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
          ? "border-b border-brand-border bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ y: -2, scale: 1.02 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="text-xl font-semibold tracking-tight text-ink"
        >
          el<span className="text-teal">i</span>ntys
        </motion.a>

        {/* <motion.a
          href="#"
          whileHover={{ y: -2, scale: 1.02 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex items-center"
        >
          <Image
            src="/elintys-logo.png"
            alt="Elintys"
            width={150}
            height={12}
            priority
            className="h-24 w-auto"
          />
        </motion.a> */}

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
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

        {/* CTA */}
        <motion.a
          href="#cta"
          whileHover={{ y: -2, scale: 1.03 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="hidden rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-mid md:flex items-center gap-1.5"
        >
          Accès prioritaire
          <motion.span whileHover={{ x: 2, y: -2 }} className="inline-block rotate-45">
            ↗
          </motion.span>
        </motion.a>

        {/* Mobile menu button (hamburger — links in CTA only for now) */}
        <motion.a
          href="#cta"
          whileHover={{ y: -2, scale: 1.03 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex items-center gap-1 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white md:hidden"
        >
          Accès prioritaire
        </motion.a>
      </div>
    </nav>
  );
}
