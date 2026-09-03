"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OWithDot } from "@/components/alt/OWithDot";
import { ProseParagraph } from "@/components/alt/ProseParagraph";
import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";

const LEAD =
  "Babájídé Ọlátúnjí (b. 1989) is a Nigerian-born, London-based, full-time studio artist, songwriter and singer working from studios in London and Ìbàdàn, Nigeria.";

const PARAGRAPHS = [
  `His work explores his Yorùbá history and philosophies with the perpetual goal of presenting these in a relatable global context.
A self-taught painter with a background in Botany from Ọbáfẹ́mi Awólọ́wọ̀ University, Ilé-Ifẹ̀, Nigeria. He has spent more than a decade developing a distinctive practice inspired by art and antiquities original to South Western Nigeria as well as the works of old masters from the early renaissance to the modern era.
He combines careful observation with imagination, creating portraits and narrative paintings that draw on Yorùbá culture and mythologies while speaking to universal human questions.`,
  `His work has been exhibited internationally and is held in public and private collections in the United Kingdom, Europe, Africa, China and the United States, including the Bank of England Museum and the Mott-Warsh Collection.
In 2017, he was selected for a curated section of the Royal Academy Summer Exhibition, and more recently his monumental History of the Yorùbás painting was unveiled at the John Randle Centre for Yorùbá Culture & History in Lagos.
Throughout his career, Ọlátúnjí has approached painting as a way of preserving cultural memory while inviting conversations about the present.`,
  `Across projects such as Tribal Marks, Àrokò, The Book of Proverbs, History of the Yorùbás and The Cowrie Project, Ọlátúnjí has returned to the lives, beliefs, and traditions that have shaped Yorùbá society.
Developing a multimedia practice, he executes these projects using Charcoal, Pastels, various types of paints, as well as ground cowrie shells as tools.
His mastery of the chalk pastel medium is evident in the outsized hyperrealistic portraits that are a staple of his studio in Ìbàdàn and London.
He uses precision and history as tools to ask enduring questions about the vagaries of human life.
Moreso, his paintings are results of extensive research built upon imagined figures, allowing individual stories to emerge as relatable, shared human experiences.`,
  `The Umberman marks a new chapter in Ọlátúnjí's practice.
For the first time, he brings together painting and original music as equal parts of a single body of work, with each of the ten paintings paired with a corresponding composition.
Together, they form the various stations on a certain umber-coloured man's journey in search of meaning in this ever changing world.
The Umberman continues Ọlátúnjí's long-standing commitment to storytelling, inviting audiences not only to look at the work, but also to listen, reflect, and recognize something of themselves within it.`,
] as const;

export function BioSection() {
  const [portraitReady, setPortraitReady] = useState(false);

  return (
    <section id="bio" className="w-full max-w-full scroll-mt-[100px] bg-[#E3E7FC]">
      <div className="mx-auto w-full max-w-[min(100%,80rem)] pb-[clamp(3rem,8vw,5.5rem)] md:pt-[clamp(3rem,8vw,5.5rem)]">
        <div className="section-px pt-25 md:pt-27 mb-[clamp(1.25rem,3vw,1.75rem)] flex flex-col items-center md:mb-[clamp(2rem,5vw,3.5rem)] md:flex-row md:items-center md:gap-12">
          <div
            className={`mx-auto h-[170px] w-[255px] shrink-0 overflow-hidden rounded-[9.17px] border-[0.92px] border-solid border-[#18225E] bg-[#18225E] transition-opacity duration-300 md:mx-0 md:mt-0 md:h-auto md:w-full md:max-w-[28rem] md:border-[3px] ${portraitReady ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src="/jide-portrait.webp"
              alt="Portrait of Babájídé Ọlátúnjí"
              width={1920}
              height={1280}
              sizes="(max-width: 768px) 255px, 28rem"
              quality={80}
              onLoad={() => setPortraitReady(true)}
              onLoadingComplete={() => setPortraitReady(true)}
              className="block h-full w-full rounded-[9.17px] object-cover object-center md:h-auto"
            />
          </div>

          <div className="mt-6 min-w-0 flex-1 md:mt-0 md:flex md:flex-col md:justify-center">
            <AltFadeUpReveal delay={0.08}>
              <h1 className="text-bio-name text-center text-[#BD6942] font-heading font-normal text-[#1C1C1C] md:text-left">
                Babájídé <OWithDot />látúnjí
              </h1>
            </AltFadeUpReveal>
            <AltFadeUpReveal delay={0.15}>
              <p className="text-bio-role mt-2 text-center font-body font-normal uppercase text-[#1C1C1C] md:mt-3 md:text-left">
                Artist
              </p>
            </AltFadeUpReveal>
            <AltFadeUpReveal className="hidden md:block" delay={0.22}>
              <ProseParagraph
                className="text-bio-lead mt-6 text-left font-prose font-normal text-[#1C1C1C]"
                text={LEAD}
              />
            </AltFadeUpReveal>
          </div>
        </div>

        <div className="section-px flex flex-col gap-[clamp(1.25rem,3vw,1.75rem)] text-left font-prose text-[16px] font-normal leading-[1.45] tracking-normal text-[#1C1C1C] md:text-[clamp(1rem,2.5vw,1.375rem)]">
          <AltFadeUpReveal className="md:hidden" delay={0.22}>
            <ProseParagraph text={LEAD} />
          </AltFadeUpReveal>
          {PARAGRAPHS.map((paragraph, index) => (
            <AltFadeUpReveal key={index} delay={0.29 + index * 0.07}>
              <ProseParagraph text={paragraph} />
            </AltFadeUpReveal>
          ))}
        </div>

        <AltFadeUpReveal delay={0.1}>
          <Link
            href="https://www.babajideolatunji.com"
            target="_blank"
            rel="noopener noreferrer"
            className="section-px mt-[clamp(2rem,5vw,3.5rem)] block text-center font-heading text-[clamp(1.125rem,3vw,1.75rem)] font-normal tracking-[-0.02em] text-[#1C1C1C]/70 underline decoration-[#1C1C1C]/70 decoration-2 underline-offset-[0.25em] transition-colors hover:text-[#BD6942] hover:decoration-[#BD6942] active:text-[#BD6942] active:decoration-[#BD6942]"
          >
            www.Babájídé<OWithDot className="o-with-dot-link" />látúnjí.com
          </Link>
        </AltFadeUpReveal>
      </div>
    </section>
  );
}
