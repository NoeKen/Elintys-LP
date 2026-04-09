"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
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
        {count > 10 && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center text-lg font-medium text-ink"
          >
            {displayCount} personnes — organisateurs, prestataires et
            gestionnaires de lieux — ont déjà rejoint la liste.
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
              &quot;J&apos;ai construit Elintys parce que l&apos;événementiel
              mérite mieux. Mieux que des outils déconnectés, mieux que des
              heures perdues à synchroniser ce qui devrait couler de source.
              Notre ambition est de devenir la plateforme de référence de toute
              une industrie — en commençant par Montréal.&quot;
            </p>
            <footer className="mt-4 text-sm text-brand-mid">
              — [Votre prénom], fondateur d&apos;Elintys · Montréal, Québec
            </footer>
          </div>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-brand-mid"
        >
          Déjà rejoint par des organisateurs de mariages, conférences, galas,
          festivals et soirées corporatives — ainsi que par des prestataires et
          gestionnaires d&apos;espaces.
        </motion.p>
      </div>
    </section>
  );
}
