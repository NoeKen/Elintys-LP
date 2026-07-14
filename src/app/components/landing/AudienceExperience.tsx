"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import Section from "@/app/components/ui/premium/Section";
import { organizersContent } from "@/app/components/organizers/organizers.content";
import { providersContent } from "@/app/components/providers/providers.content";
import { venuesContent } from "@/app/components/venues/venues.content";
import { audienceRouteMap } from "@/lib/audience-routes";
import { cn } from "@/lib/utils";
import { audienceImages } from "./home-visuals";

const cards = [
  {
    key: "organizers",
    route: audienceRouteMap.events,
    imageSrc: audienceImages.organizers,
    accent: "bg-petrol-dark text-white",
  },
  {
    key: "providers",
    route: audienceRouteMap.providers,
    imageSrc: audienceImages.providers,
    accent: "bg-accent-orange text-ink",
  },
  {
    key: "venues",
    route: audienceRouteMap.venues,
    imageSrc: audienceImages.venues,
    accent: "bg-teal-brand text-white",
  },
] as const;

function getCardCopy(locale: "fr" | "en", key: (typeof cards)[number]["key"]) {
  if (key === "organizers") {
    return organizersContent[locale].copy;
  }

  if (key === "providers") {
    return providersContent[locale].copy;
  }

  return venuesContent[locale].copy;
}

export default function AudienceExperience() {
  const locale = useLocale() === "en" ? "en" : "fr";
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section background="white" className="overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-teal-brand">
              Elintys
            </p>
            <h2 className="max-w-xl text-h2 text-text-primary">
              {locale === "fr"
                ? "Trois univers, une même expérience connectée."
                : "Three worlds, one connected event experience."}
            </h2>
          </div>
          <p className="max-w-xl text-body-lg text-text-secondary md:justify-self-end">
            {locale === "fr"
              ? "Chaque page avance avec sa propre ambiance : maîtrise pour organiser, portfolio pour valoriser, immersion pour choisir le bon lieu."
              : "Each page moves with its own atmosphere: control for organizers, portfolio energy for providers, immersion for finding the right venue."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const copy = getCardCopy(locale, card.key);
            const href = card.route[locale];

            return (
              <motion.div
                key={card.key}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              >
                <Link
                  href={href}
                  className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                >
                  <FloatingCard className="group h-full overflow-hidden p-0">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={card.imageSrc}
                        alt={copy.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/16 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span
                          className={cn(
                            "mb-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold",
                            card.accent
                          )}
                        >
                          {copy.eyebrow}
                        </span>
                        <h3 className="text-xl font-medium leading-tight text-white">{copy.title}</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                        {copy.description}
                      </p>
                      <span className="text-sm font-semibold text-teal-brand">
                        {copy.secondaryCta}
                      </span>
                    </div>
                  </FloatingCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
