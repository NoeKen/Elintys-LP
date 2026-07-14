import type { ProvidersCopy } from "./providers.types";

export default function CategoryGrid({ copy }: { copy: ProvidersCopy }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-medium text-ink md:text-4xl">{copy.categoriesTitle}</h2>
      <p className="mt-3 text-brand-mid">{copy.categoriesSubtitle}</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {copy.categories.map((category) => (
          <li
            key={category}
            className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm text-ink"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
