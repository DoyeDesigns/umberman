"use client";

import { RevealDivider } from "@/components/animations/RevealDivider";
import { RevealImage } from "@/components/animations/RevealImage";
import { RevealText } from "@/components/animations/RevealText";
import { SectionHeaderMotion } from "@/components/animations/SectionHeaderMotion";

export function EventSection() {
  return (
    <section className="w-full max-w-full bg-paper lg:flex lg:min-h-screen lg:flex-col">
      <div className="mx-auto grid min-h-130 w-full min-w-0 max-w-360 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:grid-rows-[auto_auto] md:gap-y-[clamp(70px,4.86vw,100px)] lg:min-h-full lg:[--section-overhead:clamp(16rem,40svh,22.5rem)] lg:gap-y-[clamp(2.5rem,7svh,4.375rem)]">
        <SectionHeaderMotion beat={0} className="min-w-0 md:col-start-1 md:row-start-1">
          <h2 className="break-words px-[clamp(1.125rem,5.5vw,4.5rem)] pt-[clamp(121px,8.4vw,121px)] text-center font-heading text-[clamp(1.5rem,7.73vw,111.34px)] font-normal uppercase leading-[clamp(1.6rem,8.33vw,120px)] tracking-[-0.01em] text-ink lg:pt-[clamp(5rem,13svh,7.5625rem)] lg:text-[clamp(1.5rem,min(7.73vw,7.5svh),111.34px)] lg:leading-[clamp(1.6rem,min(8.33vw,8svh),120px)]">
            THE EVENT
          </h2>
        </SectionHeaderMotion>

        <div className="relative mt-[clamp(70px,4.86vw,100px)] flex w-full min-w-0 md:col-start-1 md:row-start-2 md:mt-0 md:items-start md:justify-center md:self-stretch md:px-[clamp(1.125rem,5.5vw,4.5rem)] md:pb-[clamp(1.5rem,4vw,3rem)] lg:mt-0">
          <RevealImage
            beat={0}
            src="/the-event.png"
            alt="Exterior of the Fitzrovia Chapel in London"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 43vw, 623px"
            priority
            className="relative aspect-[3/2] w-full shrink-0 md:aspect-[623/774] md:w-[clamp(10rem,43.26vw,623px)] md:max-w-full lg:max-w-155.75"
          />
        </div>

        <RevealDivider id="event-divider" />

        <div className="flex min-w-0 items-start justify-center px-[clamp(1.125rem,5.5vw,4.5rem)] py-[clamp(1.5rem,4vw,3rem)] md:col-start-3 md:row-start-2 md:self-stretch md:py-0 md:pb-[clamp(1.5rem,4vw,3rem)] md:pt-0">
          <RevealText
            className="w-full min-w-0 md:max-w-[42ch] text-center font-body text-[clamp(1rem,2.75vw,34.2px)] font-normal leading-[clamp(1.25rem,3.5vw,44.46px)] tracking-normal text-ink"
            text="Umberman is a solo art exhibition by Babajide Olatunji, set to take place at the historic Fitzrovia Chapel, one of London's distinguished contemporary art venues. Spanning four days, the exhibition will present a vibrant collection of the artist's works, offering visitors an immersive exploration of culture, identity, and heritage. The title &quot;Umberman&quot; combines the word umber — a rich, earthy brown tone — with man, serving as an ode to the Black man. Blending tradition with contemporary artistic practice, Umberman offers a compelling dialogue between the past and present, celebrating the enduring richness of African cultural identity."
          />
        </div>
      </div>
    </section>
  );
}
