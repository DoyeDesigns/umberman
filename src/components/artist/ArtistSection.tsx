"use client";

import Link from "next/link";
import { RevealDivider } from "@/components/animations/RevealDivider";
import { Motion } from "@/components/animations/Motion";
import { RevealImage } from "@/components/animations/RevealImage";
import { RevealText } from "@/components/animations/RevealText";
import { SectionHeaderMotion } from "@/components/animations/SectionHeaderMotion";

export function ArtistSection() {
  return (
    <section className="w-full max-w-full overflow-x-clip border-y border-ink bg-paper lg:flex lg:min-h-screen lg:flex-col">
      <div className="mx-auto grid min-h-130 w-full min-w-0 max-w-360 flex-1 grid-cols-1 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:grid-rows-[auto_auto] md:gap-y-[clamp(70px,4.86vw,100px)] lg:min-h-full lg:[--section-overhead:clamp(16rem,40svh,22.5rem)] lg:gap-y-[clamp(2.5rem,7svh,4.375rem)]">
        <div className="order-2 mt-[clamp(70px,4.86vw,100px)] flex min-w-0 flex-col items-center justify-start px-[clamp(1.125rem,5.5vw,4.5rem)] pb-[clamp(1.5rem,4vw,3rem)] md:order-0 md:col-start-1 md:row-start-2 md:mt-0 md:self-stretch md:py-0 md:pb-[clamp(1.5rem,4vw,3rem)] lg:mt-0">
          <RevealText
            className="mb-10 w-full min-w-0 md:max-w-[42ch] text-center font-body text-[clamp(1rem,2.75vw,34.2px)] font-normal leading-[clamp(1.25rem,3.5vw,44.46px)] tracking-normal text-ink"
            text={`Babajide Olatunji (born October 8, 1989) is a self-taught Nigerian contemporary expressionist artist whose practice is deeply rooted in Yoruba culture and socio-cultural storytelling. Renowned for his mastery of hyperrealism and trompe-l'oeil techniques, his works often serve as visual commentaries on cultural identity, heritage, and the evolving narratives of African society. Through meticulous detail and compelling imagery, Babajide creates works that bridge tradition and contemporary artistic discourse.`}
          />

          <Motion preset="snap" beat={2} delay={0.08}>
            <Link
              href="https://www.babajideolatunji.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[clamp(1rem,2.5vw,1.75rem)] w-full shrink-0 md:max-w-[42ch] wrap-break-word text-center font-heading text-[clamp(1.125rem,3.5vw,40px)] font-normal leading-snug tracking-[-0.02em] text-ink/70 underline decoration-2 underline-offset-[0.25em]"
            >
              www.babajideolatunji.com
            </Link>
          </Motion>
        </div>

        <RevealDivider id="artist-divider" />

        <SectionHeaderMotion beat={0} className="order-1 min-w-0 md:col-start-3 md:row-start-1">
          <h2 className="break-words px-[clamp(1.125rem,5.5vw,4.5rem)] pt-[clamp(121px,8.4vw,121px)] text-center font-heading text-[clamp(1.5rem,7.73vw,111.34px)] font-normal uppercase leading-[clamp(1.6rem,8.33vw,120px)] tracking-[-0.01em] text-ink lg:pt-[clamp(5rem,13svh,7.5625rem)] lg:text-[clamp(1.5rem,min(7.73vw,7.5svh),111.34px)] lg:leading-[clamp(1.6rem,min(8.33vw,8svh),120px)]">
            THE ARTIST
          </h2>
        </SectionHeaderMotion>

        <div className="relative mb-20 order-3 mt-[clamp(1rem,3vw,2rem)] flex w-full min-w-0 md:col-start-3 md:row-start-2 md:mt-0 md:items-start md:justify-center md:self-stretch md:px-[clamp(1.125rem,5.5vw,4.5rem)] md:pb-[clamp(1.5rem,4vw,3rem)] lg:pb-[clamp(1rem,3svh,3rem)]">
          <RevealImage
            beat={1}
            settleAtRest
            src="/the-artist.png"
            alt="Black and white portrait of Babajide Olatunji"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 43vw, 623px"
            className="relative aspect-[3/3.312] w-full shrink-0 md:aspect-623/774 md:w-[clamp(10rem,43.26vw,623px)] md:max-w-full lg:max-w-155.75"
            imageClassName="object-cover object-top md:object-center"
          />
        </div>
      </div>
    </section>
  );
}
