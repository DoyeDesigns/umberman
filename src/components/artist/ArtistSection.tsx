"use client";

import Link from "next/link";
import { RevealDivider } from "@/components/animations/RevealDivider";
import { Motion } from "@/components/animations/Motion";
import { RevealImage } from "@/components/animations/RevealImage";
import { RevealText } from "@/components/animations/RevealText";
import { SectionHeaderMotion } from "@/components/animations/SectionHeaderMotion";

export function ArtistSection() {
  return (
    <section className="section-screen w-full max-w-full border-y border-ink bg-paper">
      <div className="section-screen-inner section-split-grid">
        <div className="order-2 mt-[clamp(3rem,8vw,4.375rem)] flex min-h-0 min-w-0 flex-col items-center justify-start px-[clamp(1.125rem,5.5vw,4.5rem)] pb-[clamp(1.5rem,4vw,3rem)] md:order-0 md:col-start-1 md:row-start-2 md:mt-0 md:self-stretch md:py-0 md:pb-4 lg:pb-6">
          <RevealText
            className="text-section-body mb-6 w-full min-w-0 md:mb-4 md:max-w-[42ch] lg:mb-6 text-center font-body font-normal tracking-normal text-ink"
            text={`Babajide Olatunji (born October 8, 1989) is a self-taught Nigerian contemporary expressionist artist whose practice is deeply rooted in Yoruba culture and socio-cultural storytelling. Renowned for his mastery of hyperrealism and trompe-l'oeil techniques, his works often serve as visual commentaries on cultural identity, heritage, and the evolving narratives of African society. Through meticulous detail and compelling imagery, Babajide creates works that bridge tradition and contemporary artistic discourse.`}
          />

          <Motion preset="snap" beat={2} delay={0.08}>
            <Link
              href="https://www.babajideolatunji.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-section-link mt-[clamp(0.75rem,2svh,1.75rem)] w-full shrink-0 wrap-break-word text-center font-heading font-normal tracking-[-0.02em] text-ink/70 underline decoration-2 underline-offset-[0.25em] md:max-w-[42ch]"
            >
              www.babajideolatunji.com
            </Link>
          </Motion>
        </div>

        <RevealDivider id="artist-divider" />

        <SectionHeaderMotion beat={0} className="section-split-heading order-1 min-w-0 md:col-start-3 md:row-start-1">
          <h2 className="text-section-heading section-px break-words text-center font-heading font-normal uppercase tracking-[-0.01em] text-ink">
            THE ARTIST
          </h2>
        </SectionHeaderMotion>

        <div className="section-split-image-wrap relative order-3 mt-[clamp(1rem,3vw,2rem)] w-full min-w-0 md:col-start-3 md:row-start-2 md:mt-0 md:px-[clamp(1.125rem,5.5vw,4.5rem)] md:pb-4 lg:pb-6">
          <RevealImage
            beat={1}
            settleAtRest
            src="/the-artist.png"
            alt="Black and white portrait of Babajide Olatunji"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 43vw, 623px"
            className="section-split-image relative aspect-[3/3.312] w-full shrink-0 md:aspect-623/774 md:max-h-full md:max-w-full lg:max-w-155.75"
            imageClassName="object-cover object-top md:object-center"
          />
        </div>
      </div>
    </section>
  );
}
