import Link from "next/link";
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { Venue } from "./venues.types";

export default function VenueLocationCard({
  venue,
  ctaHref,
}: {
  venue: Venue;
  ctaHref: string;
}) {
  return (
    <div data-testid="venue-card">
      <FloatingCard className="flex h-full flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-mid">
          {venue.eventTypes.join(" · ")}
        </p>
        <h3 className="text-xl font-medium text-ink">{venue.name}</h3>
        <p className="text-sm text-brand-mid">{venue.location}</p>
        <p className="text-sm text-brand-mid">{venue.capacity}</p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {venue.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-mid"
            >
              {highlight}
            </li>
          ))}
        </ul>
        <Link
          href={ctaHref}
          className="mt-auto text-sm font-medium text-teal-dark underline-offset-4 hover:underline"
        >
          {venue.ctaLabel}
        </Link>
      </FloatingCard>
    </div>
  );
}
