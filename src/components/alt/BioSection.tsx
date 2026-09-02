"use client";

import Image from "next/image";
import Link from "next/link";
import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";

const LEAD =
  "Babajide Olatunji (b. 1989) is a Nigerian-born, London-based, full-time studio artist, songwriter and singer working from studios in London and Ibadan, Nigeria.";

const PARAGRAPHS = [
  "His work explores his Yoruba history and philosophies with the perpetual goal of presenting these in a relatable global context. A self-taught painter with a background in Botany from Obafemi Awolowo University, Ile Ife, Nigeria. He has spent more than a decade developing a distinctive practice inspired by art and antiquities original to South Western Nigeria as well as the works of old masters from the early renaissance to the modern era. He combines careful observation with imagination, creating portraits and narrative paintings that draw on Yoruba culture and mythologies while speaking to universal human questions.",
  "His work has been exhibited internationally and is held in public and private collections in the United Kingdom, Europe, Africa, China and the United States, including the Bank of England Museum and the Mott-Warsh Collection. In 2017, he was selected for a curated section of the Royal Academy Summer Exhibition, and more recently his monumental History of the Yorubas painting was unveiled at the John Randle Centre for Yoruba Culture & History in Lagos. Throughout his career, Olatunji has approached painting as a way of preserving cultural memory while inviting conversations about the present.",
  "Across projects such as Tribal Marks, Aroko, The Book of Proverbs, History of the Yorubas and The Cowrie Project, Olatunji has returned to the lives, beliefs, and traditions that have shaped Yoruba society. Developing a multimedia practice, he executes these projects using Charcoal, Pastels, various types of paints as well as ground cowrie shells as tools. His mastery of the chalk pastel medium is evident in the outsized hyperrealistic portraits that are a staple of his studio in Ibadan and London. He uses precision and history as tools to ask enduring questions about the vagaries of human life. Moreso, his paintings are results of extensive research built upon imagined figures, allowing individual stories to emerge as relatable, shared human experiences.",
  "The Umberman marks a new chapter in Olatunji's practice. For the first time, he brings together painting and original music as equal parts of a single body of work, with each of the ten paintings paired with a corresponding composition. Together, they form the various stations on a certain umber-coloured man's journey in search of meaning in this ever changing world. The Umberman continues Olatunji's longstanding commitment to storytelling, inviting audiences not only to look at the work, but also to listen, reflect, and recognize something of themselves within it.",
] as const;

export function BioSection() {
  return (
    <section id="bio" className="w-full max-w-full scroll-mt-[100px] bg-[#E3E7FC]">
      <div className="mx-auto w-full max-w-[min(100%,80rem)] pb-[clamp(3rem,8vw,5.5rem)] md:pt-[clamp(3rem,8vw,5.5rem)]">
        <div className="section-px pt-25 md:pt-27 mb-[clamp(1.25rem,3vw,1.75rem)] flex flex-col items-center md:mb-[clamp(2rem,5vw,3.5rem)] md:flex-row md:items-center md:gap-12">
          <div className="mx-auto h-[170px] w-[255px] shrink-0 overflow-hidden rounded-[9.17px] border-[0.92px] border-[#1C1C1C] md:mx-0 md:mt-0 md:h-auto md:w-full md:max-w-[28rem]">
            <Image
              src="/jide-portrait.webp"
              alt="Portrait of Babajide Olatunji"
              width={1920}
              height={1280}
              sizes="(max-width: 768px) 255px, 28rem"
              quality={80}
              className="block h-full w-full object-cover object-center md:h-auto"
            />
          </div>

          <div className="mt-6 min-w-0 flex-1 md:mt-0 md:flex md:flex-col md:justify-center">
            <h1 className="text-bio-name text-center text-[#BD6942] font-heading font-normal text-[#1C1C1C] md:text-left">
              Babajide Olatunji
            </h1>
            <p className="text-bio-role mt-2 text-center font-body font-normal uppercase text-[#1C1C1C] md:mt-3 md:text-left">
              <span className="md:hidden">Artist</span>
              <span className="hidden md:inline">Contemporary Artist</span>
            </p>
            <p className="text-bio-lead mt-6 hidden text-left font-body font-normal text-[#1C1C1C] md:block">
              {LEAD}
            </p>
          </div>
        </div>

        <div className="section-px flex flex-col gap-[clamp(1.25rem,3vw,1.75rem)] text-left font-body text-[clamp(1rem,2.5vw,1.375rem)] font-normal leading-[1.45] tracking-normal text-[#1C1C1C]">
          <AltFadeUpReveal className="md:hidden" delay={0.08}>
            <p>{LEAD}</p>
          </AltFadeUpReveal>
          {PARAGRAPHS.map((paragraph, index) => (
            <AltFadeUpReveal key={index} delay={0.12 + index * 0.07}>
              <p>{paragraph}</p>
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
            www.babajideolatunji.com
          </Link>
        </AltFadeUpReveal>
      </div>
    </section>
  );
}
