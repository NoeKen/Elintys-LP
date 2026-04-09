"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { replaceToken } from "@/lib/i18n";

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { messages } = useI18n();
  const copy = messages.socialProof;
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadCount() {
      try {
        const response = await fetch("/api/waitlist/count");
        const data = await response.json();
        if (mounted) {
          setCount(typeof data.count === "number" ? data.count : 0);
        }
      } catch {
        if (mounted) {
          setCount(0);
        }
      }
    }

    loadCount();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isInView || count <= 0) {
      return;
    }

    const controls = animate(0, count, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayCount(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [count, isInView]);

  return (
    <section ref={ref} className="bg-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {count > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center text-lg font-medium text-ink"
          >
            {replaceToken(copy.count, "count", displayCount)}
          </motion.p>
        )}

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl border border-brand-border bg-brand-bg px-6 py-8 shadow-sm"
        >
          <div className="border-l-4 border-teal pl-5">
            <p className="text-lg leading-relaxed text-ink">
              &quot;{copy.quote}&quot;
            </p>
            <footer className="mt-4 text-sm text-brand-mid">{replaceToken(copy.signature, "nom", "Noe Kenfack")}</footer>
          </div>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-brand-mid"
        >
          {copy.coverage}
        </motion.p>
      </div>
    </section>
  );
}
