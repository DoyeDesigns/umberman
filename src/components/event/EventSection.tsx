"use client";

import { RevealDivider } from "@/components/animations/RevealDivider";
import { RevealImage } from "@/components/animations/RevealImage";
import { RevealText } from "@/components/animations/RevealText";
import { SectionHeaderMotion } from "@/components/animations/SectionHeaderMotion";

export function EventSection() {
  return (
    <section className="section-screen w-full max-w-full bg-paper">
      <div className="section-screen-inner section-split-grid">
        <SectionHeaderMotion beat={0} className="section-split-heading min-w-0 md:col-start-1 md:row-start-1">
          <h2 className="text-section-heading section-px break-words text-center font-heading font-normal uppercase tracking-[-0.01em] text-ink">
            THE EVENT
          </h2>
        </SectionHeaderMotion>

        <div className="section-split-image-wrap relative mt-[clamp(3rem,8vw,4.375rem)] w-full min-w-0 md:col-start-1 md:row-start-2 md:mt-0 md:px-[clamp(1.125rem,5.5vw,4.5rem)] md:pb-4 lg:pb-6">
          <RevealImage
            beat={0}
            src="/the-event.png"
            alt="Exterior of the Fitzrovia Chapel in London"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 43vw, 623px"
            priority
            className="section-split-image relative aspect-[3/2] w-full shrink-0 md:aspect-[623/774] md:h-auto md:max-h-full md:max-w-full lg:max-w-155.75"
          />
        </div>

        <RevealDivider id="event-divider" />

        <div className="flex min-h-0 min-w-0 items-start justify-center px-[clamp(1.125rem,5.5vw,4.5rem)] py-[clamp(1.5rem,4vw,3rem)] md:col-start-3 md:row-start-2 md:self-stretch md:py-0 md:pb-4 md:pt-0 lg:pb-6">
          <RevealText
            className="text-section-body w-full min-w-0 md:max-w-[42ch] text-center font-body font-normal tracking-normal text-ink"
            text="Umberman is a solo art exhibition by Babajide Olatunji, set to take place at the historic Fitzrovia Chapel, one of London's distinguished contemporary art venues. Spanning four days, the exhibition will present a vibrant collection of the artist's works, offering visitors an immersive exploration of culture, identity, and heritage. The title &quot;Umberman&quot; combines the word umber — a rich, earthy brown tone — with man, serving as an ode to the Black man. Blending tradition with contemporary artistic practice, Umberman offers a compelling dialogue between the past and present, celebrating the enduring richness of African cultural identity."
          />
        </div>
      </div>
    </section>
  );
}
