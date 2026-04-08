"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const links = [
  { label: "Fonctionnalités", href: "#solution" },
  { label: "Marché", href: "#marche" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#cta" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer ref={ref} className="border-t border-white/[0.06] bg-ink">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row"
      >
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -18 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="text-xl font-semibold tracking-tight text-white/80"
        >
          el<span className="text-teal">i</span>ntys
        </motion.a>

        {/* Links */}
        <motion.nav
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-6"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/30 transition-colors hover:text-white/60"
            >
              {l.label}
            </a>
          ))}
        </motion.nav>

        {/* Right */}
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
            © {new Date().getFullYear()} Elintys. Tous droits réservés.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
