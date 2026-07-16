import EmailForm from "@/app/components/ui/EmailForm";

interface AboutPageContentProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
}

export default function AboutPageContent({
  eyebrow,
  title,
  intro,
  sections,
  ctaTitle,
  ctaBody,
}: AboutPageContentProps) {
  return (
    <div className="bg-brand-bg">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-teal">
            {eyebrow}
          </p>
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <h1 className="text-[clamp(2.4rem,6vw,4.8rem)] font-medium leading-[1.02] tracking-tight text-ink">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-brand-mid">{intro}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-xl border border-brand-border bg-brand-bg p-6"
            >
              <h2 className="mb-3 text-xl font-medium text-ink">{section.title}</h2>
              <p className="leading-relaxed text-brand-mid">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="bg-ink px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-white md:text-4xl">
              {ctaTitle}
            </h2>
            <p className="text-white/55">{ctaBody}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5">
            <EmailForm
              source="cta"
              inputClassName="border-white/15 bg-white/[0.08] text-white placeholder:text-white/30 focus:border-teal"
              buttonClassName="bg-teal hover:bg-teal-dark"
              wrapperClassName="[&_.text-brand-mid]:text-white/60"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
