import { Hero } from "@/components/hero/Hero";
import { LiveAt } from "@/components/live-at/LiveAt";
import { EventSection } from "@/components/event/EventSection";
import { ArtistSection } from "@/components/artist/ArtistSection";
import { SaveTheDate } from "@/components/save-the-date/SaveTheDate";
import { AnimatedPage } from "@/components/animations/AnimatedPage";
import { parseAnimationVariant } from "@/lib/animations/config";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant: variantParam } = await searchParams;
  const variant = parseAnimationVariant(variantParam);

  return (
    <AnimatedPage variant={variant}>
      <Hero />
      {variant !== 1 ? <LiveAt /> : null}
      <EventSection />
      <ArtistSection />
      <SaveTheDate />
    </AnimatedPage>
  );
}
