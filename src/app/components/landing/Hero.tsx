"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { homeHeroImages } from "./home-visuals";

const HomeHeroScene = dynamic(() => import("./HomeHeroScene"), {
  ssr: false,
  loading: () => null,
});

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const trust = t.raw("trust") as string[];
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.25], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-4%"]);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");

    function updateCanvasPreference() {
      setShowCanvas(query.matches && !prefersReducedMotion);
    }

    updateCanvasPreference();
    query.addEventListener("change", updateCanvasPreference);

    return () => query.removeEventListener("change", updateCanvasPreference);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-petrol-dark px-6 pb-20 pt-24 text-white md:min-h-[calc(100svh-76px)] md:pb-24">
      <motion.div
        aria-hidden
        style={{ y: prefersReducedMotion ? 0 : imageY }}
        className="absolute inset-0"
      >
        <Image
          src={homeHeroImages[0].src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,38,0.86),rgba(11,31,38,0.48)_45%,rgba(11,31,38,0.16)),linear-gradient(0deg,rgba(11,31,38,0.68),rgba(11,31,38,0.06)_46%,rgba(11,31,38,0.24))]" />
      </motion.div>

      {showCanvas && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52vw] opacity-95 [mask-image:linear-gradient(90deg,transparent,black_22%,black_88%,transparent)] lg:block"
          data-testid="home-hero-r3f"
        >
          <HomeHeroScene />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-petrol-dark via-petrol-dark/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(232,150,90,0.28),transparent_30%),radial-gradient(circle_at_88%_20%,rgba(47,122,126,0.24),transparent_32%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-180px)] max-w-6xl items-center">
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : textY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={containerVariants}
          className="max-w-[760px] pt-6"
        >
          <motion.span
            variants={itemVariants}
            className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md"
          >
            {t("badge")}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mb-6 max-w-[740px] text-hero-mobile text-white md:text-hero"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-[650px] text-body-lg text-white/78"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={`/${locale}#cta`}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-petrol-dark transition-colors hover:bg-[#FAFAF7]"
            >
              {t("primaryCta")}
            </motion.a>
            <motion.a
              href={`/${locale}#probleme`}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/22 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/14"
            >
              {t("secondaryCta")}
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex max-w-2xl flex-wrap gap-3">
            {trust.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/82 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto -mb-10 h-px max-w-6xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
}
