"use client";

import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";
import { ProseParagraph } from "@/components/alt/ProseParagraph";

const PARAGRAPHS = [
  `In this body of work, I bring together music and painting to tell a single story—the story of The Umberman. He's unsure and unmoored, but he's in love, too. He struggles with a hero complex while somewhat paranoid. And, like most other 30-somethings, he's overworked and still can't afford a mortgage. He feels betrayed by the generation before him and is mortified to have children for fear of not measuring up either. He's sometimes steeped in dread; at other times, he's an eternal optimist. He believes his destiny is tied to his choices and, at the same time, knows there are neural pathways threaded before his umbilical cord was snipped and buried. Or eaten. Or whatever.`,
  `His concerns are universal: love, doubt, grief, displacement, and a yearning to be rooted and to belong somewhere—lingering questions that remain unanswered, regardless of our origins or beliefs. Each song and painting records snapshots from different moments in life, but together they ask how we find meaning while living through uncertainty.`,
  `We spend much of our lives in search of ourselves, acceptance, or the next sure thing, yet we rarely pause to consider the shrines that guide those pursuits or the people we become on these dusty paths. For this reason, The Umberman asks more questions than gives answers. After all, the artist is on this same journey to find himself.`,
  `Consider The Umberman a building. Some rooms are empty, lit by a single 40-watt bulb, furnish them. Others are baroque and overstuffed; others shift like mirages through a kaleidoscope.`,
  `Come in, have a look, bring what you will and take all you can. I hope it's to your liking. If it isn't, I'll stick to painting portraits-after 77 times 7 more tries.`,
] as const;

export function AboutExhibitionSection() {
  return (
    <section
      id="about"
      className="w-full max-w-full scroll-mt-[100px] bg-[#F1F1F1]"
    >
      <div className="section-px mx-auto w-full max-w-[min(100%,80rem)] py-[clamp(3rem,8vw,5.5rem)]">
        <AltFadeUpReveal>
          <h2 className="text-alt-section-title mb-[clamp(2rem,5vw,3.5rem)] text-center font-heading font-normal text-[#1C1C1C]">
            About Exhibition
          </h2>
        </AltFadeUpReveal>

        <div className="flex flex-col gap-[clamp(1.25rem,3vw,1.75rem)] text-left font-prose text-[16px] font-normal leading-[1.45] tracking-normal text-[#1C1C1C] md:text-[clamp(1rem,2.5vw,1.375rem)]">
          {PARAGRAPHS.map((paragraph, index) => (
            <AltFadeUpReveal key={index} delay={0.08 + index * 0.07}>
              <ProseParagraph text={paragraph} />
            </AltFadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
