import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import HomeHeroEffects from "./HomeHeroEffects";
import { homeHeroImages } from "./home-visuals";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const trust = t.raw("trust") as string[];

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-petrol-dark px-6 pb-20 pt-24 text-white md:min-h-[calc(100svh-76px)] md:pb-24">
      <div
        aria-hidden
        className="absolute inset-0"
      >
        <Image
          src={homeHeroImages[0].src}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,38,0.86),rgba(11,31,38,0.48)_45%,rgba(11,31,38,0.16)),linear-gradient(0deg,rgba(11,31,38,0.68),rgba(11,31,38,0.06)_46%,rgba(11,31,38,0.24))]" />
      </div>

      <HomeHeroEffects />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-petrol-dark via-petrol-dark/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(232,150,90,0.28),transparent_30%),radial-gradient(circle_at_88%_20%,rgba(47,122,126,0.24),transparent_32%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-180px)] max-w-6xl items-center">
        <div className="max-w-[760px] pt-6">
          <span
            className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md"
          >
            {t("badge")}
          </span>

          <h1
            className="mb-6 max-w-[740px] text-hero-mobile text-white md:text-hero"
          >
            {t("title")}
          </h1>

          <p
            className="mb-8 max-w-[650px] text-body-lg text-white/78"
          >
            {t("subtitle")}
          </p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/${locale}#cta`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-petrol-dark transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#FAFAF7] active:scale-[0.98]"
            >
              {t("primaryCta")}
            </a>
            <a
              href={`/${locale}#probleme`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/22 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-[background-color,transform] duration-200 hover:translate-x-1.5 hover:bg-white/14"
            >
              {t("secondaryCta")}
            </a>
          </div>

          <div className="flex max-w-2xl flex-wrap gap-3">
            {trust.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/82 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mb-10 h-px max-w-6xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
}
