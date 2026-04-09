"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Est-ce gratuit pour rejoindre la liste d'attente ?",
    a: "Oui, totalement gratuit. L'inscription à la liste d'attente ne vous engage à rien. Vous serez parmi les premiers informés au lancement.",
  },
  {
    q: "Quand la plateforme sera-t-elle disponible ?",
    a: "Nous visons un lancement bêta privé d'ici la fin de l'année. Les membres de la liste d'attente auront un accès prioritaire dès l'ouverture.",
  },
  {
    q: "Puis-je choisir les modules que j'utilise ?",
    a: "Oui. Elintys est conçu de façon modulaire : vous pouvez activer uniquement la billetterie, la gestion invités, la marketplace ou le scan — selon vos besoins.",
  },
  {
    q: "La plateforme est-elle disponible en anglais ?",
    a: "Oui. Elintys est une plateforme bilingue (français / anglais) pensée pour le marché québécois et canadien.",
  },
  {
    q: "Je suis prestataire — comment ça fonctionne pour moi ?",
    a: "Créez votre profil prestataire sur Elintys et devenez visible au moment exact où un organisateur cherche à équiper son événement. Photographes, traiteurs, DJ, décorateurs, animateurs — tous les profils sont les bienvenus. L'inscription est gratuite pendant la bêta.",
  },
  {
    q: "Je gère un espace événementiel — puis-je le lister sur Elintys ?",
    a: "Oui. Elintys permet aux propriétaires et gestionnaires d'espaces de lister leur lieu directement sur la plateforme. Vous recevez des demandes qualifiées liées à des événements structurés — avec date, nombre d'invités et contexte. La visibilité est gratuite pendant la bêta.",
  },
  {
    q: "Y aura-t-il des frais sur la billetterie et les paiements ?",
    a: "Nous prévoyons une structure tarifaire transparente avec des frais faibles sur les transactions. Les détails seront communiqués aux membres de la liste d'attente en avant-première.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="faq" className="bg-brand-bg px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-2xl">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Questions fréquentes
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-10 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          Tout ce que vous voulez savoir.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          <Accordion.Root
            type="single"
            collapsible
            defaultValue="item-0"
            className="flex flex-col gap-3"
          >
            {FAQS.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-brand-border bg-white overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-[500] text-ink">
                    {faq.q}
                    <span
                      className={cn(
                        "ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-border text-base font-light text-ink transition-all duration-200",
                        "group-data-[state=open]:rotate-45 group-data-[state=open]:bg-ink group-data-[state=open]:text-white group-data-[state=open]:border-ink"
                      )}
                    >
                      +
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brand-mid">
                    {faq.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
