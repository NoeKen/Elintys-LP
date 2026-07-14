"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const QR_CELLS = Array.from({ length: 16 });
const MINI_GRID_CELLS = Array.from({ length: 9 });

type SlideKind = "create" | "equip" | "venue" | "sell" | "manage" | "diffuse" | "welcome";

type SolutionSlide = {
  kind: SlideKind;
  stepIndex: number;
  title: string;
  text: string;
};

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const t = useTranslations("solution");
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = (t.raw("steps") as string[]).map((label, index) => ({ n: String(index + 1), label }));
  const providers = t.raw("cards.providers") as [string, string][];
  const tickets = t.raw("cards.tickets") as [string, string][];
  const createFieldsA = t.raw("cards.createFieldsA") as string[];
  const createFieldsB = t.raw("cards.createFieldsB") as string[];
  const venueFields = t.raw("cards.venueFields") as string[];

  const slides = useMemo<SolutionSlide[]>(
    () => [
      {
        kind: "create",
        stepIndex: 0,
        title: t("cards.createTitle"),
        text: t("cards.createText"),
      },
      {
        kind: "equip",
        stepIndex: 1,
        title: t("cards.equipTitle"),
        text: t("cards.equipText"),
      },
      {
        kind: "venue",
        stepIndex: 2,
        title: steps[2].label,
        text: t("cards.venueText"),
      },
      {
        kind: "sell",
        stepIndex: 3,
        title: t("cards.sellTitle"),
        text: t("cards.sellText"),
      },
      {
        kind: "manage",
        stepIndex: 4,
        title: t("cards.manageTitle"),
        text: t("cards.manageText"),
      },
      {
        kind: "diffuse",
        stepIndex: 5,
        title: t("cards.diffuseTitle"),
        text: t("cards.diffuseText"),
      },
      {
        kind: "welcome",
        stepIndex: 6,
        title: t("cards.welcomeTitle"),
        text: t("cards.welcomeText"),
      },
    ],
    [steps, t]
  );

  const activeSlide = slides[activeIndex];
  const nextIndex = (activeIndex + 1) % slides.length;
  const nextSlide = slides[nextIndex];

  function goToSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  return (
    <section
      id="solution"
      className="relative scroll-mt-24 overflow-hidden border-y border-border-default bg-background-warm px-6 py-24"
      ref={ref}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.38] [background-image:linear-gradient(rgba(26,69,80,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(26,69,80,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-teal-brand/20 bg-white/75 px-4 py-1.5 text-xs font-medium text-teal-brand shadow-sm backdrop-blur"
        >
          {t("badge")}
        </motion.span>

        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-3 max-w-4xl text-[2.1rem] font-[500] leading-tight text-ink md:text-[2.6rem]"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="max-w-3xl text-base leading-relaxed text-brand-mid"
            >
              {t("intro")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex gap-2"
          >
            <CarouselButton label={t("carousel.previous")} onClick={() => goToSlide(activeIndex - 1)}>
              ‹
            </CarouselButton>
            <CarouselButton label={t("carousel.next")} onClick={() => goToSlide(activeIndex + 1)}>
              ›
            </CarouselButton>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: isInView ? 0.2 : 0 }}
          className="mb-12 -mx-6 overflow-x-auto px-6"
        >
          <div className="relative grid min-w-[680px] grid-cols-7 gap-4">
            <div className="pointer-events-none absolute left-[4%] right-[4%] top-5 z-0 h-px bg-gradient-to-r from-teal-brand/30 via-accent-gold/55 to-accent-orange/45" />
            {steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={step.n}
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  aria-label={t("carousel.goTo", { step: step.label })}
                  onClick={() => goToSlide(index)}
                  className="group relative z-10 flex flex-col items-center gap-2 text-center outline-none"
                  data-testid={`solution-step-${step.n}`}
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.12 : 1,
                      backgroundColor: isActive ? "#1A4550" : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : "#425466",
                      boxShadow: isActive
                        ? "0 20px 44px -22px rgba(26,69,80,0.8)"
                        : "0 10px 28px -22px rgba(13,17,23,0.35)",
                    }}
                    whileHover={{ y: -4, scale: 1.08 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-brand/20 text-sm font-semibold ring-offset-2 ring-offset-background-warm group-focus-visible:ring-2 group-focus-visible:ring-accent-orange"
                  >
                    {step.n}
                  </motion.span>
                  <span
                    className={`text-[11px] leading-tight transition-colors ${
                      isActive ? "font-semibold text-petrol-dark" : "text-brand-mid"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: isInView ? 0.28 : 0 }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]"
          data-testid="solution-carousel"
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={activeSlide.kind}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) {
                  goToSlide(activeIndex + 1);
                }

                if (info.offset.x > 80) {
                  goToSlide(activeIndex - 1);
                }
              }}
              initial={{ opacity: 0, x: 44, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -34, scale: 0.985 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="relative min-h-[520px] overflow-hidden rounded-xl border border-white/10 bg-petrol-dark p-6 text-white shadow-[0_34px_90px_-48px_rgba(26,69,80,0.95)] md:p-8 lg:min-h-[590px]"
              aria-live="polite"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-orange via-accent-gold to-teal-brand"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:36px_36px]"
              />
              <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent-orange/30 bg-accent-orange/14 px-2.5 py-0.5 text-[10px] font-semibold text-accent-orange">
                  {t("carousel.active")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-white/60">
                  {steps[activeSlide.stepIndex].n} · {steps[activeSlide.stepIndex].label}
                </span>
              </div>

              <div className="grid h-full gap-8 xl:grid-cols-[0.72fr_1fr] xl:items-start">
                <div>
                  <h3 className="mb-3 text-2xl font-medium leading-tight text-white md:text-3xl">
                    {activeSlide.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-white/64 md:text-base">
                    {activeSlide.text}
                  </p>
                </div>

                <div className="min-h-[310px] rounded-xl border border-white/10 bg-white/[0.055] p-4 shadow-inner md:p-5">
                  {renderStageVisual(activeSlide.kind, {
                    steps,
                    createFieldsA,
                    createFieldsB,
                    venueFields,
                    providers,
                    tickets,
                  })}
                </div>
              </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => goToSlide(nextIndex)}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="group relative min-h-[420px] overflow-hidden rounded-xl border border-accent-orange/30 bg-accent-orange p-6 text-left text-ink shadow-[0_30px_74px_-42px_rgba(232,150,90,0.85)] outline-none ring-offset-2 ring-offset-background-warm focus-visible:ring-2 focus-visible:ring-petrol-dark md:p-8 lg:min-h-[590px]"
            data-testid="solution-next"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(26,69,80,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(26,69,80,0.08)_1px,transparent_1px)] [background-size:32px_32px]"
            />
            <div className="relative">
            <span className="mb-4 inline-flex rounded-full bg-petrol-dark/12 px-2.5 py-0.5 text-[10px] font-semibold text-petrol-dark">
              {t("carousel.nextPreview")}
            </span>
            <h3 className="mb-3 text-2xl font-medium leading-tight">{nextSlide.title}</h3>
            <p className="mb-8 text-sm leading-relaxed text-ink/72">{nextSlide.text}</p>
            <div className="rounded-xl bg-petrol-dark/92 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 group-hover:translate-y-[-4px]">
              {renderPreviewVisual(nextSlide.kind, {
                steps,
                createFieldsA,
                createFieldsB,
                venueFields,
                providers,
                tickets,
              })}
            </div>
            </div>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 flex items-center gap-3 text-sm text-brand-mid"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-orange/20 text-base text-petrol-dark">
            →
          </span>
          <span>{t("tagline")}</span>
        </motion.p>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-white/90 text-2xl leading-none text-petrol-dark shadow-sm outline-none ring-offset-2 ring-offset-background-warm transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent-orange"
    >
      {children}
    </motion.button>
  );
}

function renderStageVisual(
  kind: SlideKind,
  data: {
    steps: { n: string; label: string }[];
    createFieldsA: string[];
    createFieldsB: string[];
    venueFields: string[];
    providers: [string, string][];
    tickets: [string, string][];
  }
) {
  switch (kind) {
    case "create":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <MiniForm title={data.steps[0].label} fields={data.createFieldsA} />
          <MiniForm title={data.steps[2].label} fields={data.createFieldsB} />
        </div>
      );
    case "equip":
      return <ProviderBoard providers={data.providers} title={data.steps[1].label} />;
    case "venue":
      return <VenueBoard fields={data.venueFields} title={data.steps[2].label} />;
    case "sell":
      return <TicketBoard tickets={data.tickets} title={data.steps[3].label} dark />;
    case "manage":
      return <OperationsBoard steps={data.steps} />;
    case "diffuse":
      return <PublishBoard steps={data.steps} />;
    case "welcome":
      return <WelcomeBoard steps={data.steps} />;
  }
}

function renderPreviewVisual(
  kind: SlideKind,
  data: {
    steps: { n: string; label: string }[];
    createFieldsA: string[];
    createFieldsB: string[];
    venueFields: string[];
    providers: [string, string][];
    tickets: [string, string][];
  }
) {
  if (kind === "sell") {
    return <TicketBoard tickets={data.tickets} title={data.steps[3].label} />;
  }

  if (kind === "equip") {
    return <ProviderBoard providers={data.providers} title={data.steps[1].label} compact />;
  }

  if (kind === "venue") {
    return <VenueBoard fields={data.venueFields} title={data.steps[2].label} compact />;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {MINI_GRID_CELLS.map((_, index) => (
        <span key={index} className="aspect-square rounded-md bg-white/24" />
      ))}
    </div>
  );
}

function MiniForm({ title, fields }: { title: string; fields: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.065] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <p className="mb-4 text-xs font-semibold text-white/72">{title}</p>
      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field} className="grid grid-cols-[72px_1fr] items-center gap-3">
            <span className="text-[10px] text-white/46">{field}</span>
            <span className="h-6 rounded-md bg-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProviderBoard({
  title,
  providers,
  compact = false,
}: {
  title: string;
  providers: [string, string][];
  compact?: boolean;
}) {
  return (
    <div>
      <div className="mb-3 rounded-lg border border-white/10 bg-white/14 px-3 py-2 text-[11px] font-semibold text-white">
        {title}
      </div>
      {providers.map(([type, status]) => (
        <div key={type} className="mb-2 flex items-center justify-between rounded-lg border border-white/8 bg-white/10 px-3 py-2">
          <span className="text-[11px] text-white">{type}</span>
          <span className="text-[11px] font-medium text-white/82">{status}</span>
        </div>
      ))}
      {!compact && (
        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {QR_CELLS.map((_, index) => (
            <span key={index} className="aspect-square rounded-sm bg-white/18" />
          ))}
        </div>
      )}
    </div>
  );
}

function VenueBoard({
  title,
  fields,
  compact = false,
}: {
  title: string;
  fields: string[];
  compact?: boolean;
}) {
  return (
    <div>
      <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.07] p-4">
        <p className="mb-3 text-xs font-semibold text-white/72">{title}</p>
        <div className="grid gap-2">
          {fields.map((field, index) => (
            <div key={field} className="grid grid-cols-[82px_1fr] items-center gap-3">
              <span className="text-[10px] text-white/48">{field}</span>
              <span
                className="h-5 rounded-md bg-white/14"
                style={{ width: `${compact ? 70 : 58 + index * 10}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MINI_GRID_CELLS.map((_, index) => (
          <span key={index} className="aspect-[1.35] rounded-md border border-white/8 bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function TicketBoard({
  title,
  tickets,
  dark = false,
}: {
  title: string;
  tickets: [string, string][];
  dark?: boolean;
}) {
  return (
    <div className={dark ? "rounded-xl border border-white/10 bg-white/[0.065] p-4" : ""}>
      <div className="mb-4 rounded-lg border border-white/10 bg-white/14 px-3 py-2 text-[11px] font-semibold text-white">
        {title}
      </div>
      <div className="space-y-4">
        {tickets.map(([label, pct], index) => (
          <div key={label}>
            <div className="mb-1.5 flex justify-between gap-4 text-xs">
              <span className="text-white/76">{label}</span>
              <span className="font-semibold text-white">{pct}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/18">
              <span
                className={`block h-full rounded-full ${
                  index === 0 ? "bg-white" : index === 1 ? "bg-accent-orange" : "bg-accent-gold"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationsBoard({ steps }: { steps: { n: string; label: string }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {[steps[3], steps[4], steps[5], steps[6]].map((step, index) => (
        <div key={step.n} className="rounded-xl border border-white/10 bg-white/[0.065] p-4">
          <span className="mb-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-orange/18 text-xs font-semibold text-accent-orange">
            {step.n}
          </span>
          <p className="mb-4 text-sm font-semibold text-white">{step.label}</p>
          <span className="block h-2 rounded-full bg-white/12">
            <span
              className="block h-full rounded-full bg-accent-gold"
              style={{ width: `${42 + index * 14}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

function PublishBoard({ steps }: { steps: { n: string; label: string }[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.065] p-4">
      <div className="mb-4 flex items-center gap-2">
        {[0, 1, 2].map((item) => (
          <span key={item} className="h-2 w-2 rounded-full bg-accent-orange/60" />
        ))}
      </div>
      <div className="mb-4 h-28 rounded-xl bg-white/12" />
      <p className="mb-3 text-sm font-semibold text-white">{steps[5].label}</p>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((item) => (
          <span key={item} className="h-16 rounded-lg border border-white/8 bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function WelcomeBoard({ steps }: { steps: { n: string; label: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-[0.8fr_1fr]">
      <div className="grid grid-cols-4 gap-1.5 rounded-xl border border-white/10 bg-white/[0.065] p-4">
        {QR_CELLS.map((_, index) => (
          <span key={index} className="aspect-square rounded-sm bg-white/18" />
        ))}
      </div>
      <div className="space-y-2">
        <p className="mb-3 text-sm font-semibold text-white">{steps[6].label}</p>
        {[0, 1, 2, 3].map((item) => (
          <span key={item} className="block h-9 rounded-lg border border-white/8 bg-white/10" />
        ))}
      </div>
    </div>
  );
}
